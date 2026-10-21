const ALLOWED_SLICE_ASSET_KINDS = new Set([
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

// Crop masks: ellipse for round elements, capsule for pills; free keeps the plain rectangle crop.
const SLICE_ASSET_SHAPES = new Set(["free", "ellipse", "capsule"]);

const MIN_SLICE_ASSET_SIZE = 8;

module.exports = {
  ALLOWED_SLICE_ASSET_KINDS,
  MIN_SLICE_ASSET_SIZE,
  SLICE_ASSET_SHAPES
};
