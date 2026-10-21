const test = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const fs = require("node:fs");

const {
  callCliChatCompletion,
  flattenChatMessages,
  listCliModels
} = require("../../src/server/providers/cli-chat-client");
const { createModelRequestContext } = require("../../src/server/services/model-request-context");
const { validateModelConfigInput } = require("../../src/server/config/model-config");

const PNG_DATA_URL = "data:image/png;base64,iVBORw0KGgo=";

function fakeSpawn(stdout, calls, code = 0) {
  return (command, args, options) => {
    const child = new EventEmitter();
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    child.kill = () => {};
    child.stdin = {
      on() {},
      end(input) {
        // Windows passes one shell command line, other platforms an args array; compare as a single line.
        calls.push({ line: [command, ...args].join(" "), options, input, files: fs.readdirSync(options.cwd) });
        setImmediate(() => {
          child.stdout.emit("data", stdout);
          child.emit("close", code);
        });
      }
    };
    return child;
  };
}

const visionBody = {
  messages: [{
    role: "user",
    content: [
      { type: "text", text: "Find the slices" },
      { type: "image_url", image_url: { url: PNG_DATA_URL } }
    ]
  }]
};

test("flattenChatMessages extracts prompt text and data URL images", () => {
  const { prompt, images } = flattenChatMessages(visionBody.messages);
  assert.equal(prompt, "Find the slices");
  assert.equal(images.length, 1);
  assert.equal(images[0].extension, "png");
});

test("claude CLI receives the prompt on stdin with image files it may Read", async () => {
  const calls = [];
  const result = await callCliChatCompletion(visionBody, {
    baseUrl: "cli://claude",
    model: "sonnet",
    timeoutMs: 5000,
    spawnImpl: fakeSpawn(JSON.stringify({ result: "{\"assets\":[]}" }), calls)
  });

  assert.deepEqual(result, { choices: [{ message: { content: "{\"assets\":[]}" } }] });
  assert.equal(calls[0].line, "claude -p --output-format json --allowedTools Read --model sonnet");
  assert.deepEqual(calls[0].files, ["image-1.png"]);
  assert.match(calls[0].input, /image-1\.png[\s\S]*Find the slices/);
  assert.equal(fs.existsSync(calls[0].options.cwd), false, "temp image dir is removed");
});

test("gemini CLI references images with @file and reads the json response", async () => {
  const calls = [];
  const result = await callCliChatCompletion(visionBody, {
    baseUrl: "cli://gemini",
    model: "default",
    timeoutMs: 5000,
    spawnImpl: fakeSpawn("Loaded cached credentials.\n{\"response\":\"ok\"}", calls)
  });

  assert.equal(result.choices[0].message.content, "ok");
  assert.match(calls[0].line, /^gemini .*-p "?Attached images in order: @image-1\.png"?$/);
  assert.doesNotMatch(calls[0].line, / -m /);
});

test("CLI failures and unsupported CLIs surface readable errors", async () => {
  await assert.rejects(
    callCliChatCompletion(visionBody, { baseUrl: "cli://claude", timeoutMs: 5000, spawnImpl: fakeSpawn("boom", [], 1) }),
    /claude CLI exited with code 1: boom/
  );
  await assert.rejects(
    callCliChatCompletion(visionBody, { baseUrl: "cli://other", timeoutMs: 5000 }),
    /Unsupported CLI "other"/
  );
  await assert.rejects(
    callCliChatCompletion(visionBody, { baseUrl: "cli://claude", model: "a b", timeoutMs: 5000 }),
    /unsupported characters/
  );
});

test("CLI configs are vision-only and need no API key", async () => {
  const config = validateModelConfigInput({ id: "c1", baseUrl: "cli://claude", model: "default", tasks: ["vision"] });
  assert.equal(config.baseUrl, "cli://claude");
  assert.throws(
    () => validateModelConfigInput({ id: "c2", baseUrl: "cli://claude", model: "default", tasks: ["generation", "inpaint"] }),
    /only support image understanding/
  );
  assert.deepEqual(listCliModels("cli://claude").models, ["default", "sonnet", "opus", "haiku"]);

  const context = createModelRequestContext({ baseUrl: "cli://claude", model: "default", timeoutMs: 5000 });
  await assert.rejects(context.callJson("/v1/images/generations", {}), /only supports image understanding/);
});

const { callCodexImageRequest } = require("../../src/server/providers/cli-image-client");

// Fake codex run that writes the PNG at the path named in the prompt, like the real image tool is asked to.
function fakeCodexImageSpawn(calls, writeImage = true) {
  return (command, args, options) => {
    const child = new EventEmitter();
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    child.kill = () => {};
    child.stdin = {
      on() {},
      end(input) {
        calls.push({ line: [command, ...args].join(" "), input, files: fs.readdirSync(options.cwd) });
        const target = /exactly this path: (.+)$/m.exec(input)[1].trim();
        if (writeImage) fs.writeFileSync(target, Buffer.from("png-bytes"));
        setImmediate(() => {
          child.stdout.emit("data", "DONE");
          child.emit("close", 0);
        });
      }
    };
    return child;
  };
}

test("codex CLI reads images with -i flags and the prompt on stdin", async () => {
  const calls = [];
  const result = await callCliChatCompletion(visionBody, {
    baseUrl: "cli://codex",
    model: "default",
    timeoutMs: 5000,
    spawnImpl: fakeSpawn("{\"assets\":[]}\n", calls)
  });
  assert.equal(result.choices[0].message.content, "{\"assets\":[]}");
  assert.match(calls[0].line, /^codex exec --skip-git-repo-check --ignore-user-config --ephemeral --color never -s read-only -i .*image-1\.png"?$/);
  assert.match(calls[0].input, /Find the slices/);
});

test("codex CLI generates and edits images through the OpenAI image endpoints", async () => {
  const calls = [];
  const options = {
    timeoutMs: 5000,
    spawnImpl: fakeCodexImageSpawn(calls),
    codexHome: fs.mkdtempSync(require("node:path").join(require("node:os").tmpdir(), "codex-home-")),
    resizeImage: async (bytes, width, height) => Buffer.from(`${bytes}@${width}x${height}`)
  };
  const generated = await callCodexImageRequest("/v1/images/generations", { prompt: "A coin icon", size: "512x256" }, options);
  assert.equal(Buffer.from(generated.data[0].b64_json, "base64").toString(), "png-bytes@512x256");
  assert.match(calls[0].input, /create a new image[\s\S]*512 × 256[\s\S]*A coin icon/);

  const form = new FormData();
  form.set("prompt", "Restore the background");
  form.set("size", "1024x1024");
  form.append("image[]", new File([Buffer.from("source")], "source.png", { type: "image/png" }));
  form.set("mask", new File([Buffer.from("mask")], "mask.png", { type: "image/png" }));
  await callCodexImageRequest("/v1/images/edits", form, options);
  assert.match(calls[1].line, /-i \S*input-1\.png"? -i \S*mask\.png"?$/);
  assert.deepEqual(calls[1].files.sort(), ["input-1.png", "mask.png"]);
  assert.match(calls[1].input, /repaint only where the mask is transparent/);

  await assert.rejects(
    callCodexImageRequest("/v1/images/generations", { prompt: "x" }, { ...options, spawnImpl: fakeCodexImageSpawn([], false) }),
    /without producing an image: DONE/
  );
});

test("cli://codex configs may generate images and route image endpoints to the CLI", async () => {
  const config = validateModelConfigInput({ id: "x1", baseUrl: "cli://codex", model: "default", tasks: ["generation", "inpaint"] });
  assert.deepEqual(config.tasks, ["generation", "inpaint"]);
  const context = createModelRequestContext({ baseUrl: "cli://codex", model: "default", timeoutMs: 5000 });
  await assert.rejects(context.callJson("/v1/images/generations", {}), /Image prompt is empty/);
});

test("gemini CLI's Google-account error is replaced with how to switch to an API key", async () => {
  await assert.rejects(
    callCliChatCompletion(visionBody, {
      baseUrl: "cli://gemini",
      timeoutMs: 5000,
      spawnImpl: fakeSpawn("Error authenticating: IneligibleTierError: This client is no longer supported for Gemini Code Assist for individuals.", [], 55)
    }),
    /no longer allows for Gemini CLI[\s\S]*aistudio\.google\.com\/apikey[\s\S]*GEMINI_API_KEY/
  );
});
