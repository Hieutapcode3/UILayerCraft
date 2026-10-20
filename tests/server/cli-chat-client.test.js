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
