const test = require("node:test");
const assert = require("node:assert/strict");

const {
  validateManifest,
  validateEditableDesignManifest
} = require("../../src/plugin/manifest-validation");

function createValidAssetManifest(overrides = {}) {
  return {
    screen: { width: 390, height: 844 },
    previewImage: { dataUrl: "data:image/png;base64,abc" },
    assets: [
      {
        name: "icon",
        placement: { x: 1, y: 2, width: 24, height: 24 },
        dataUrl: "data:image/png;base64,abc"
      }
    ],
    ...overrides
  };
}

test("validateManifest accepts a valid asset import manifest", () => {
  assert.doesNotThrow(() => validateManifest(createValidAssetManifest()));
});

test("validateManifest requires screen and preview image data", () => {
  assert.throws(() => validateManifest(null), /Missing screen or previewImage data/);
  assert.throws(() => validateManifest({ screen: { width: 1, height: 1 } }), /Missing screen or previewImage data/);
});

test("validateManifest requires numeric screen dimensions and assets array", () => {
  assert.throws(
    () => validateManifest(createValidAssetManifest({ screen: { width: "390", height: 844 } })),
    /screen\.width and screen\.height must be numbers/
  );
  assert.throws(() => validateManifest(createValidAssetManifest({ assets: null })), /assets must be an array/);
});

test("validateManifest requires each asset placement and image or SVG data", () => {
  assert.throws(
    () => validateManifest(createValidAssetManifest({ assets: [{ name: "bad", placement: { x: 0, y: 0, width: 1, height: 1 } }] })),
    /Each asset must include name, placement, dataUrl or svgData/
  );
  assert.throws(
    () => validateManifest(createValidAssetManifest({ assets: [{ name: "bad", placement: { x: 0, y: Number.NaN, width: 1, height: 1 }, dataUrl: "x" }] })),
    /Placement coordinates of asset bad must be numbers/
  );
});

test("validateEditableDesignManifest accepts a valid editable design manifest", () => {
  assert.doesNotThrow(() => validateEditableDesignManifest({
    screen: { width: 390, height: 844 },
    nodes: []
  }));
});

test("validateEditableDesignManifest validates required editable design shape", () => {
  assert.throws(() => validateEditableDesignManifest(null), /Missing editable design screen data/);
  assert.throws(
    () => validateEditableDesignManifest({ screen: { width: "390", height: 844 }, nodes: [] }),
    /editable design screen\.width and screen\.height must be numbers/
  );
  assert.throws(
    () => validateEditableDesignManifest({ screen: { width: 390, height: 844 }, nodes: null }),
    /editable design nodes must be an array/
  );
});
