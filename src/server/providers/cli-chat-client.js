const { spawn } = require("node:child_process");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");

// Base URL "cli://<name>" routes image understanding through a locally logged-in AI CLI instead of an HTTP API.
const CLI_BASE_URL_PATTERN = /^cli:\/\/([a-z]+)$/i;

const CLI_PRESETS = {
  claude: {
    models: ["default", "sonnet", "opus", "haiku"],
    buildArgs: ({ model }) => [
      "-p",
      "--output-format", "json",
      "--allowedTools", "Read",
      ...(model && model !== "default" ? ["--model", model] : [])
    ],
    imageInstruction: (files) => `Use the Read tool to view these image files first (in this order), then answer:\n${files.map((file) => `- ${file}`).join("\n")}`,
    readOutput: (stdout) => JSON.parse(stdout).result
  },
  gemini: {
    // Model names change often; "default" lets the CLI pick, and any other name can be typed by hand.
    models: ["default"],
    // stdin carries the long prompt; -p is appended after it and pulls the images in via @file references.
    buildArgs: ({ model, files }) => [
      "--output-format", "json",
      "--approval-mode", "plan",
      ...(model && model !== "default" ? ["-m", model] : []),
      "-p", files.length ? `Attached images in order: ${files.map((file) => `@${path.basename(file)}`).join(" ")}` : "Answer the request above."
    ],
    imageInstruction: () => "",
    readOutput: (stdout) => JSON.parse(stdout.slice(stdout.indexOf("{"))).response
  },
  codex: {
    models: ["default"],
    // The prompt comes on stdin (no positional argument, so the repeatable -i flag cannot swallow it);
    // codex exec prints only the final answer on stdout. The user's config.toml is ignored (login is still used)
    // so a model or MCP server set there for coding cannot break these requests.
    buildArgs: ({ model, files }) => [
      "exec",
      "--skip-git-repo-check",
      "--ignore-user-config",
      "--ephemeral",
      "--color", "never",
      "-s", "read-only",
      ...(model && model !== "default" ? ["-m", model] : []),
      ...files.flatMap((file) => ["-i", file])
    ],
    imageInstruction: () => "",
    readOutput: (stdout) => stdout.trim()
  }
};

function parseCliBaseUrl(baseUrl) {
  const match = String(baseUrl || "").trim().match(CLI_BASE_URL_PATTERN);
  return match ? match[1].toLowerCase() : null;
}

function isCliBaseUrl(baseUrl) {
  return parseCliBaseUrl(baseUrl) !== null;
}

function getCliPreset(baseUrl) {
  const name = parseCliBaseUrl(baseUrl);
  const preset = name && CLI_PRESETS[name];
  if (!preset) {
    throw badRequest(`Unsupported CLI "${name}". Use one of: ${Object.keys(CLI_PRESETS).map((key) => `cli://${key}`).join(", ")}`);
  }
  return { name, preset };
}

function listCliModels(baseUrl) {
  const { preset } = getCliPreset(baseUrl);
  return { ok: true, baseUrl, models: [...preset.models], modelCount: preset.models.length };
}

const IMAGE_EXTENSIONS = { "image/png": "png", "image/jpeg": "jpg", "image/jpg": "jpg", "image/webp": "webp" };

// Flattens OpenAI chat messages into one prompt plus decoded image buffers.
function flattenChatMessages(messages = []) {
  const texts = [];
  const images = [];
  for (const message of Array.isArray(messages) ? messages : []) {
    const parts = typeof message?.content === "string" ? [{ type: "text", text: message.content }] : message?.content;
    for (const part of Array.isArray(parts) ? parts : []) {
      if (part?.type === "text" && part.text) texts.push(part.text);
      const url = part?.type === "image_url" ? part.image_url?.url : null;
      const match = typeof url === "string" && url.match(/^data:(image\/[a-z]+);base64,(.+)$/i);
      if (match && IMAGE_EXTENSIONS[match[1].toLowerCase()]) {
        images.push({ extension: IMAGE_EXTENSIONS[match[1].toLowerCase()], buffer: Buffer.from(match[2], "base64") });
      }
    }
  }
  return { prompt: texts.join("\n\n"), images };
}

async function callCliChatCompletion(body, {
  baseUrl,
  model,
  timeoutMs,
  signal,
  createAbortError = (message) => Object.assign(new Error(message), { name: "AbortError" }),
  spawnImpl = spawn
}) {
  const { name, preset } = getCliPreset(baseUrl);
  if (model && !/^[\w.:/-]+$/.test(model)) throw badRequest("CLI model name contains unsupported characters");
  const { prompt, images } = flattenChatMessages(body?.messages);
  const workDir = await fs.mkdtemp(path.join(os.tmpdir(), "uilayercraft-cli-"));
  try {
    const files = [];
    for (const [index, image] of images.entries()) {
      const file = path.join(workDir, `image-${index + 1}.${image.extension}`);
      await fs.writeFile(file, image.buffer);
      files.push(file);
    }
    const instruction = files.length ? preset.imageInstruction(files) : "";
    const stdin = [instruction, prompt].filter(Boolean).join("\n\n");
    const stdout = await runCli(name, preset.buildArgs({ model, files }), stdin, {
      cwd: workDir, timeoutMs, signal, createAbortError, spawnImpl
    }).catch((error) => {
      if (name === "gemini" && /IneligibleTierError|no longer supported for Gemini Code Assist/i.test(error.message)) {
        throw Object.assign(new Error(
          "Gemini CLI is signed in with a Google account, which Google no longer allows for Gemini CLI. "
          + "Create an API key at https://aistudio.google.com/apikey, save it as GEMINI_API_KEY=<key> in ~/.gemini/.env, "
          + "run gemini once and choose \"Use Gemini API key\" under /auth, then restart the local API. Or use Claude CLI."
        ), { statusCode: 502 });
      }
      throw error;
    });
    let content;
    try {
      content = preset.readOutput(stdout);
    } catch {
      throw Object.assign(new Error(`${name} CLI returned unreadable output: ${stdout.slice(0, 300)}`), { statusCode: 502 });
    }
    if (typeof content !== "string" || !content.trim()) {
      throw Object.assign(new Error(`${name} CLI returned no text content`), { statusCode: 502 });
    }
    return { choices: [{ message: { content } }] };
  } finally {
    await fs.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

function runCli(command, args, stdin, { cwd, timeoutMs, signal, createAbortError, spawnImpl }) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(createAbortError("AI request cancelled"));
      return;
    }
    // npm-installed CLIs are .cmd shims on Windows, so run one quoted command line through the shell there;
    // args are fixed flags, a validated model name and generated temp file names.
    const child = process.platform === "win32"
      ? spawnImpl([command, ...args.map((arg) => (/[\s&|<>^]/.test(arg) ? `"${arg}"` : arg))].join(" "), [], { cwd, shell: true, windowsHide: true })
      : spawnImpl(command, args, { cwd, windowsHide: true });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const finish = (error, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
      if (error) reject(error);
      else resolve(value);
    };
    const onAbort = () => {
      child.kill();
      finish(createAbortError("AI request cancelled"));
    };
    const timer = setTimeout(() => {
      child.kill();
      finish(Object.assign(new Error(`${command} CLI timed out after ${Math.round(timeoutMs / 1000)} seconds`), { statusCode: 504 }));
    }, timeoutMs);
    signal?.addEventListener("abort", onAbort, { once: true });
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", (error) => {
      finish(Object.assign(new Error(`Could not start ${command} CLI (${error.message}). Install it and log in first.`), { statusCode: 502 }));
    });
    child.on("close", (code) => {
      if (code === 0) finish(null, stdout);
      else finish(Object.assign(new Error(`${command} CLI exited with code ${code}: ${(stderr || stdout).trim().slice(0, 400)}`), { statusCode: 502 }));
    });
    child.stdin.on("error", () => {});
    child.stdin.end(stdin);
  });
}

function badRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

module.exports = {
  CLI_PRESETS,
  callCliChatCompletion,
  flattenChatMessages,
  isCliBaseUrl,
  listCliModels,
  parseCliBaseUrl,
  runCli
};
