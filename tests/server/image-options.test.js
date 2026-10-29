const test = require("node:test");
const assert = require("node:assert/strict");

const { buildOptionPrompt, clampOptionCount, requestImageOptions } = require("../../src/server/services/image-options");

test("clampOptionCount keeps 1 to 4 options", () => {
  assert.equal(clampOptionCount(undefined), 1);
  assert.equal(clampOptionCount(3), 3);
  assert.equal(clampOptionCount(9), 4);
  assert.equal(clampOptionCount(0), 1);
});

test("buildOptionPrompt asks each option for a distinct take, and leaves a single image alone", () => {
  assert.equal(buildOptionPrompt("A shop screen", 0, 1), "A shop screen");
  assert.match(buildOptionPrompt("A shop screen", 1, 3), /^A shop screen\n\nDesign option 2 of 3: keep every requirement above/);
});

test("requestImageOptions runs every option at once and keeps what succeeded", async () => {
  let running = 0;
  let peak = 0;
  const prompts = [];
  const result = await requestImageOptions("A shop screen", 3, async (prompt) => {
    prompts.push(prompt);
    running += 1;
    peak = Math.max(peak, running);
    await new Promise((resolve) => setTimeout(resolve, 10));
    running -= 1;
    if (prompt.includes("option 2 of 3")) throw new Error("rate limit");
    return { images: [{ id: "image_1", dataUrl: `data:${prompt.slice(-10)}` }], provider: { model: "m" } };
  });
  assert.equal(peak, 3);
  assert.equal(prompts.length, 3);
  assert.deepEqual(result.images.map((image) => image.id), ["image_1", "image_2"]);
  assert.equal(result.failedCount, 1);
  assert.deepEqual(result.provider, { model: "m" });

  await assert.rejects(
    requestImageOptions("x", 2, async () => { throw new Error("no image tool"); }),
    /no image tool/
  );
});
