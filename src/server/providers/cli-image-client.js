const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { runCli } = require("./cli-chat-client");

const OUTPUT_FILE = "output.png";

// Answers OpenAI image requests (/v1/images/generations with a JSON body, /v1/images/edits with a FormData body)
// through the locally logged-in Codex CLI, whose built-in image tool needs no API key. Returns OpenAI's shape.
async function callCodexImageRequest(requestPath, body, {
  model,
  timeoutMs,
  signal,
  createAbortError = (message) => Object.assign(new Error(message), { name: "AbortError" }),
  spawnImpl = spawn,
  codexHome = process.env.CODEX_HOME || path.join(os.homedir(), ".codex"),
  resizeImage = resizePng,
  reasoningEffort = process.env.UILAYERCRAFT_CODEX_REASONING || "low"
}) {
  const isEdit = /\/images\/edits$/.test(requestPath);
  if (!isEdit && !/\/images\/generations$/.test(requestPath)) {
    throw Object.assign(new Error(`cli://codex does not support ${requestPath}`), { statusCode: 400 });
  }
  const field = (name) => (typeof body?.get === "function" ? body.get(name) : body?.[name]);
  const prompt = String(field("prompt") || "").trim();
  if (!prompt) throw Object.assign(new Error("Image prompt is empty"), { statusCode: 400 });
  const size = String(field("size") || "");
  const transparent = field("background") === "transparent";
  const inputs = isEdit ? body.getAll("image[]") : [];
  const mask = isEdit ? body.get("mask") : null;

  const workDir = await fs.mkdtemp(path.join(os.tmpdir(), "uilayercraft-codex-"));
  const startedAt = Date.now();
  try {
    const files = [];
    for (const [index, file] of [...inputs, ...(mask ? [mask] : [])].entries()) {
      const target = path.join(workDir, `${index === inputs.length ? "mask" : `input-${index + 1}`}.png`);
      await fs.writeFile(target, Buffer.from(await file.arrayBuffer()));
      files.push(target);
    }
    const outputPath = path.join(workDir, OUTPUT_FILE);
    const instructions = [
      isEdit
        ? "Use your built-in image generation tool to edit the attached image(s) as described below."
        : "Use your built-in image generation tool to create a new image as described below.",
      mask
        ? "The last attached image is a mask the same size as the first one: repaint only where the mask is transparent and keep every other pixel unchanged."
        : "",
      size ? `The result must be ${size.replace("x", " × ")} pixels.` : "",
      transparent ? "Give the result a transparent background." : "",
      `Save the final image as a PNG file at exactly this path: ${outputPath}`,
      "Do not create or change any other files. When the file is saved, reply with DONE.",
      "",
      "Image request:",
      prompt
    ].filter((line, index, all) => line || all[index - 1]).join("\n");

    // --json prints events, so the run's own thread id says which generated_images folder is ours (several
    // slices can run at once). Low reasoning effort: the work is one image tool call, not planning.
    const output = await runCli("codex", [
      "exec",
      "--skip-git-repo-check",
      "--ignore-user-config",
      "--enable", "image_generation",
      "--json",
      // UILAYERCRAFT_CODEX_REASONING=default keeps Codex's own setting.
      ...(/^(minimal|low|medium|high)$/.test(reasoningEffort) ? ["-c", `model_reasoning_effort=${reasoningEffort}`] : []),
      "--color", "never",
      "-s", "workspace-write",
      "-C", workDir,
      ...(model && model !== "default" ? ["-m", model] : []),
      ...files.flatMap((file) => ["-i", file])
    ], instructions, { cwd: workDir, timeoutMs, signal, createAbortError, spawnImpl });

    const { threadId, answer } = readCodexEvents(output);
    const produced = await findProducedImage(outputPath, codexHome, startedAt, threadId);
    if (!produced) {
      // Codex explains why (for example that its image tool is not available for this account); pass that on.
      const reason = String(answer || "").trim().split(/\r?\n/).filter(Boolean).at(-1) || "";
      throw Object.assign(new Error(`Codex CLI finished without producing an image${reason ? `: ${reason.slice(0, 300)}` : ""}. Image generation through Codex needs an account where its built-in image tool is enabled; otherwise use an image API config.`), { statusCode: 502 });
    }
    const [width, height] = size.split("x").map(Number);
    const bytes = width > 0 && height > 0 ? await resizeImage(produced, width, height) : produced;
    return { data: [{ b64_json: bytes.toString("base64") }] };
  } finally {
    await fs.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

// `codex exec --json` prints one JSON event per line: the thread id comes first, the agent's messages later.
// Plain text (an older Codex without --json events) is taken as the answer.
function readCodexEvents(stdout) {
  let threadId = "";
  const messages = [];
  const plain = [];
  for (const line of String(stdout || "").split(/\r?\n/)) {
    if (!line.trim()) continue;
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      plain.push(line);
      continue;
    }
    threadId ||= event?.thread_id || event?.session_id || event?.msg?.session_id || "";
    const item = event?.item;
    if (item && (item.type === "agent_message" || item.item_type === "assistant_message") && item.text) messages.push(item.text);
    if (event?.type === "error" && event.message) messages.push(event.message);
  }
  return { threadId: /^[\w-]+$/.test(threadId) ? threadId : "", answer: messages.at(-1) || plain.join("\n") };
}

// Images already handed to a request, so two runs at the same time never take the same file.
const claimedImages = new Set();

// The requested path first; then the newest image in this run's own $CODEX_HOME/generated_images/<thread id>;
// without a thread id, the newest unclaimed image written during this run.
async function findProducedImage(outputPath, codexHome, startedAt, threadId = "") {
  const saved = await fs.readFile(outputPath).catch(() => null);
  if (saved) return saved;
  let newest = null;
  const walk = async (dir) => {
    for (const entry of await fs.readdir(dir, { withFileTypes: true }).catch(() => [])) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (/\.(png|jpe?g|webp)$/i.test(entry.name) && !claimedImages.has(full)) {
        const { mtimeMs } = await fs.stat(full);
        if (mtimeMs >= startedAt - 1000 && (!newest || mtimeMs > newest.mtimeMs)) newest = { full, mtimeMs };
      }
    }
  };
  const root = path.join(codexHome, "generated_images");
  if (threadId) await walk(path.join(root, threadId));
  if (!newest) await walk(root);
  if (!newest) return null;
  claimedImages.add(newest.full);
  return fs.readFile(newest.full);
}

async function resizePng(bytes, width, height) {
  const sharp = require("sharp");
  return sharp(bytes).resize(width, height, { fit: "fill" }).png().toBuffer();
}

module.exports = {
  callCodexImageRequest,
  findProducedImage,
  readCodexEvents
};
