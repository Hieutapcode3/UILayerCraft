const test = require("node:test");
const assert = require("node:assert/strict");

const {
  ALLOWED_SLICE_ASSET_KINDS,
  buildSliceAssetDetectionPrompt,
  buildSliceAssetJsonRepairPrompt,
  parseSliceAssetDetectionText
} = require("../../src/core/slice-detection");

test("buildSliceAssetDetectionPrompt includes exact dimensions and allowed vocabulary", () => {
  const prompt = buildSliceAssetDetectionPrompt({
    width: 750,
    height: 1334,
    sourceImageName: "screen.png"
  });

  assert.match(prompt, /screen\.png/);
  assert.match(prompt, /750x1334/);
  assert.match(prompt, /icon, avatar, illustration, photo, product-image, complex-decoration, complex-chart, logo/);
  assert.match(prompt, /Return JSON only/);
});

test("buildSliceAssetJsonRepairPrompt asks for one valid JSON object", () => {
  const prompt = buildSliceAssetJsonRepairPrompt("```json\n{\"assets\":[]}\n```");

  assert.match(prompt, /Repair the following model output/);
  assert.match(prompt, /Return one valid JSON object only/);
  assert.match(prompt, /"assets"/);
});

test("parseSliceAssetDetectionText parses and clamps valid model assets", () => {
  const result = parseSliceAssetDetectionText(JSON.stringify({
    assets: [
      {
        name: "logo",
        kind: "logo",
        bbox: { x: -4, y: 10.2, width: 32.8, height: 24.1 },
        confidence: 1.5,
        containsEmbeddedText: true,
        reason: "brand mark"
      }
    ]
  }), { width: 100, height: 80 });

  assert.deepEqual(result, {
    assets: [
      {
        name: "logo",
        kind: "logo",
        shape: "free",
        bbox: { x: 0, y: 10, width: 29, height: 24 },
        confidence: 1,
        containsEmbeddedText: true,
        reason: "brand mark"
      }
    ]
  });
});

test("parseSliceAssetDetectionText normalizes AI names and falls back without Chinese guesses", () => {
  const result = parseSliceAssetDetectionText(JSON.stringify({
    assets: [
      { name: "Woodcarving Course Cover", kind: "photo", bbox: { x: 0, y: 0, width: 20, height: 20 } },
      { name: "Обложка курса резьбы по дереву", kind: "photo", bbox: { x: 30, y: 0, width: 20, height: 20 } }
    ]
  }), { width: 100, height: 100 });

  assert.deepEqual(result.assets.map((asset) => asset.name), [
    "woodcarving_course_cover",
    "slice_02"
  ]);
});

test("parseSliceAssetDetectionText filters unsupported kinds and tiny boxes", () => {
  const result = parseSliceAssetDetectionText(JSON.stringify({
    assets: [
      {
        name: "Table",
        kind: "table",
        bbox: { x: 10, y: 10, width: 80, height: 20 },
        confidence: 0.9
      },
      {
        name: "Tiny icon",
        kind: "icon",
        bbox: { x: 1, y: 1, width: 4, height: 4 },
        confidence: 0.9
      },
      {
        name: "",
        kind: "icon",
        bbox: { x: 20, y: 20, width: 12, height: 12 },
        confidence: 0.5
      }
    ]
  }), { width: 100, height: 80 });

  assert.equal(result.assets.length, 1);
  assert.equal(result.assets[0].name, "slice_03");
  assert.equal(result.assets[0].kind, "icon");
});

test("parseSliceAssetDetectionText throws a readable error for invalid JSON", () => {
  assert.throws(
    () => parseSliceAssetDetectionText("not json", { width: 100, height: 80 }),
    /The model returned no JSON object/
  );
});

test("ALLOWED_SLICE_ASSET_KINDS exposes the current allowed values", () => {
  assert.deepEqual([...ALLOWED_SLICE_ASSET_KINDS], [
    "icon",
    "avatar",
    "illustration",
    "photo",
    "product-image",
    "complex-decoration",
    "complex-chart",
    "logo",
    "button",
    "badge",
    "text",
    "panel",
    "progress-bar"
  ]);
});

test("parseSliceAssetDetectionText keeps known crop shapes and defaults the rest to free", () => {
  const result = parseSliceAssetDetectionText(JSON.stringify({
    assets: [
      { name: "coin", kind: "icon", shape: "ellipse", bbox: { x: 0, y: 0, width: 20, height: 20 } },
      { name: "pill", kind: "panel", shape: "capsule", bbox: { x: 0, y: 30, width: 40, height: 20 } },
      { name: "star", kind: "icon", shape: "star", bbox: { x: 30, y: 0, width: 20, height: 20 } }
    ]
  }), { width: 100, height: 100 });

  assert.deepEqual(result.assets.map((asset) => asset.shape), ["ellipse", "capsule", "free"]);
});

test("parseSliceAssetDetectionText drops cut-out pieces and duplicates but keeps children and bar fills", () => {
  const result = parseSliceAssetDetectionText(JSON.stringify({
    assets: [
      { name: "house", kind: "icon", bbox: { x: 40, y: 0, width: 50, height: 60 } },
      { name: "house_overflow", kind: "complex-decoration", bbox: { x: 40, y: 0, width: 50, height: 15 } },
      { name: "house_copy", kind: "icon", bbox: { x: 41, y: 1, width: 49, height: 59 } },
      { name: "button", kind: "button", bbox: { x: 0, y: 70, width: 80, height: 30 } },
      { name: "label", kind: "text", bbox: { x: 20, y: 78, width: 40, height: 14 } },
      { name: "track", kind: "progress-bar", bbox: { x: 0, y: 110, width: 100, height: 10 } },
      { name: "fill", kind: "progress-bar", bbox: { x: 0, y: 110, width: 60, height: 10 } }
    ]
  }), { width: 100, height: 130 });

  assert.deepEqual(result.assets.map((asset) => asset.name), ["house", "button", "label", "track", "fill"]);
});

test("parseSliceAssetDetectionText drops elements marked as behind a dimming overlay", () => {
  const result = parseSliceAssetDetectionText(JSON.stringify({
    assets: [
      { name: "dimmed_tile", kind: "panel", behindOverlay: true, bbox: { x: 0, y: 0, width: 20, height: 20 } },
      { name: "retry_button", kind: "button", behindOverlay: false, bbox: { x: 30, y: 0, width: 40, height: 20 } }
    ]
  }), { width: 100, height: 100 });

  assert.deepEqual(result.assets.map((asset) => asset.name), ["retry_button"]);
});

test("parseSliceAssetDetectionText merges small pictures inside a larger illustration", () => {
  const result = parseSliceAssetDetectionText(JSON.stringify({
    assets: [
      { name: "truck", kind: "illustration", bbox: { x: 200, y: 700, width: 640, height: 440 } },
      { name: "apple_in_truck", kind: "illustration", bbox: { x: 780, y: 790, width: 60, height: 60 } },
      { name: "apple_on_floor", kind: "illustration", bbox: { x: 230, y: 1100, width: 80, height: 80 } },
      { name: "badge_text", kind: "text", bbox: { x: 400, y: 800, width: 80, height: 40 } }
    ]
  }), { width: 1080, height: 1920 });

  assert.deepEqual(result.assets.map((asset) => asset.name), ["truck", "apple_on_floor", "badge_text"]);
});

test("parseSliceAssetDetectionText merges a title tab sticking out of a popup into the popup", () => {
  const result = parseSliceAssetDetectionText(JSON.stringify({
    assets: [
      { name: "popup_frame", kind: "panel", bbox: { x: 190, y: 651, width: 862, height: 727 } },
      { name: "popup_title_tab", kind: "panel", bbox: { x: 315, y: 561, width: 607, height: 105 } },
      { name: "title_text", kind: "text", bbox: { x: 499, y: 582, width: 244, height: 69 } },
      { name: "selected_tab_highlight", kind: "panel", bbox: { x: 300, y: 700, width: 200, height: 100 } }
    ]
  }), { width: 1242, height: 2208 });

  assert.deepEqual(result.assets.map((asset) => asset.name), ["popup_frame", "title_text", "selected_tab_highlight"]);
  assert.deepEqual(result.assets[0].bbox, { x: 190, y: 561, width: 862, height: 817 });
});
