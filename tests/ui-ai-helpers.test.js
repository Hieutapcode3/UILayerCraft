const test = require("node:test");
const assert = require("node:assert/strict");

const {
  buildAiCompletePrompt,
  buildAiRedrawPrompt,
  buildAiTransparentPrompt,
  buildBackgroundRestorePrompt,
  createAiProgressId,
  formatAiRedrawError
} = require("../src/ui/services/ai-helpers");

test("createAiProgressId builds prefixed ids with timestamp and random segments", () => {
  const id = createAiProgressId("detect_bbox");

  assert.match(id, /^detect_bbox_[a-z0-9]+_[a-z0-9]{7}$/);
});

test("formatAiRedrawError preserves legacy fallback messages", () => {
  assert.equal(formatAiRedrawError(404, "missing"), "The backend has no AI redraw SVG endpoint; stop the old npm run api and start it again");
  assert.equal(formatAiRedrawError(500, "boom"), "boom");
  assert.equal(formatAiRedrawError(502, ""), "AI redraw endpoint failed: 502");
});

test("buildAiRedrawPrompt includes asset name and viewBox size", () => {
  const prompt = buildAiRedrawPrompt({
    name: "tab icon",
    placement: { width: 128, height: 96 }
  });

  assert.equal(prompt.includes('named "tab icon"'), true);
  assert.equal(prompt.includes("viewBox: 0 0 128 96"), true);
  assert.equal(prompt.includes("Return raw SVG only"), true);
});

test("buildAiTransparentPrompt preserves exact transparent PNG instruction", () => {
  assert.equal(buildAiTransparentPrompt().includes("Only remove the background and make it transparent."), true);
  assert.equal(buildAiTransparentPrompt().includes("Output one transparent PNG"), true);
});

test("buildAiCompletePrompt converts regions to slice-local rectangles", () => {
  const prompt = buildAiCompletePrompt({
    name: "hero card",
    placement: { x: 10.2, y: 20.6 }
  }, [
    { x: 14.7, y: 29.2, width: 30.5, height: 40.4 }
  ]);

  assert.equal(prompt.includes('named "hero card"'), true);
  assert.equal(prompt.includes('[{"x":5,"y":9,"width":31,"height":40}]'), true);
  assert.match(prompt, /white balance, color temperature, tint, exposure, gamma, contrast, saturation, black point, and white point/);
  assert.match(prompt, /Do not apply global relighting, HDR, auto-enhancement/);
});

test("buildBackgroundRestorePrompt preserves baked visuals and limits edits to confirmed regions", () => {
  const prompt = buildBackgroundRestorePrompt({
    name: "Festival full background",
    bbox: { width: 750, height: 700 },
    bakedVisuals: ["Festival greeting calligraphy", "Rice dumplings and dragon boat"],
    regions: [{ x: 20, y: 24, width: 56, height: 56 }]
  });

  assert.match(prompt, /Festival full background/);
  assert.match(prompt, /Festival greeting calligraphy/);
  assert.match(prompt, /Rice dumplings and dragon boat/);
  assert.match(prompt, /Only reconstruct these slice-local rectangles: \[\{"x":20,"y":24,"width":56,"height":56\}\]\./);
  assert.match(prompt, /Outside those rectangles, reproduce the input pixels unchanged/);
  assert.match(prompt, /white balance, color temperature, tint, exposure, gamma, contrast, saturation, black point, and white point/);
  assert.match(prompt, /same 750x700 canvas size/);
});
