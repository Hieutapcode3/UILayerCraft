const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { EventEmitter } = require("node:events");

const { callCodexImageRequest, findProducedImage, readCodexEvents } = require("../../src/server/providers/cli-image-client");

test("readCodexEvents takes the thread id and the last agent message from --json output", () => {
  const stdout = [
    JSON.stringify({ type: "thread.started", thread_id: "01a18700-a9c2-7d03-827d-848a314567e0" }),
    JSON.stringify({ type: "item.completed", item: { type: "agent_message", text: "Working on it" } }),
    JSON.stringify({ type: "item.completed", item: { type: "agent_message", text: "DONE" } })
  ].join("\n");
  assert.deepEqual(readCodexEvents(stdout), { threadId: "01a18700-a9c2-7d03-827d-848a314567e0", answer: "DONE" });
  // Older Codex without events: the text is the answer.
  assert.deepEqual(readCodexEvents("The image tool is not available.\n"), { threadId: "", answer: "The image tool is not available." });
  // A thread id that is not a plain id never becomes a path.
  assert.equal(readCodexEvents(JSON.stringify({ thread_id: "../../etc" })).threadId, "");
});

test("findProducedImage reads this run's own folder, so runs at the same time do not swap images", async () => {
  const home = await fs.mkdtemp(path.join(os.tmpdir(), "codex-home-"));
  const startedAt = Date.now() - 500;
  const write = async (thread, name, text) => {
    await fs.mkdir(path.join(home, "generated_images", thread), { recursive: true });
    await fs.writeFile(path.join(home, "generated_images", thread, name), text);
  };
  await write("thread-a", "exec-a.png", "image of A");
  await new Promise((resolve) => setTimeout(resolve, 20));
  await write("thread-b", "exec-b.png", "image of B");
  const missing = path.join(home, "none.png");
  assert.equal(String(await findProducedImage(missing, home, startedAt, "thread-a")), "image of A");
  assert.equal(String(await findProducedImage(missing, home, startedAt, "thread-b")), "image of B");

  // Without a thread id: newest unclaimed image, never one already handed out.
  await write("thread-c", "exec-c.png", "image of C");
  assert.equal(String(await findProducedImage(missing, home, startedAt)), "image of C");
  assert.equal(await findProducedImage(missing, home, startedAt), null);
  await fs.rm(home, { recursive: true, force: true });
});

test("callCodexImageRequest runs codex exec with --json and low reasoning effort", async () => {
  const home = await fs.mkdtemp(path.join(os.tmpdir(), "codex-home-"));
  let command = "";
  const spawnImpl = (line, args) => {
    command = Array.isArray(args) && args.length ? [line, ...args].join(" ") : line;
    const child = new EventEmitter();
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    child.stdin = { on() {}, end() {} };
    child.kill = () => {};
    setImmediate(async () => {
      await fs.mkdir(path.join(home, "generated_images", "thread-x"), { recursive: true });
      await fs.writeFile(path.join(home, "generated_images", "thread-x", "exec-x.png"), "png bytes");
      child.stdout.emit("data", `${JSON.stringify({ type: "thread.started", thread_id: "thread-x" })}\n`);
      child.emit("close", 0);
    });
    return child;
  };
  const result = await callCodexImageRequest("/v1/images/generations", { prompt: "a coin" }, {
    timeoutMs: 5000,
    spawnImpl,
    codexHome: home,
    resizeImage: async (bytes) => bytes
  });
  assert.match(command, /codex exec .*--json/);
  assert.match(command, /-c model_reasoning_effort=low/);
  assert.equal(Buffer.from(result.data[0].b64_json, "base64").toString(), "png bytes");
  await fs.rm(home, { recursive: true, force: true });
});
