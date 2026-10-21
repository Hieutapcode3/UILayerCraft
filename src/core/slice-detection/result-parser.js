const {
  ALLOWED_SLICE_ASSET_KINDS,
  MIN_SLICE_ASSET_SIZE,
  SLICE_ASSET_SHAPES
} = require("./constants");
const { normalizeSliceAssetName } = require("../slice-asset-name");

function extractJsonObject(text) {
  const raw = String(text || "").trim();
  const withoutFence = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("The model returned no JSON object");
  try {
    return JSON.parse(withoutFence.slice(start, end + 1));
  } catch (error) {
    throw new Error(`JSON parse failed: ${error.message || String(error)}`);
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeBBox(bbox, width, height) {
  const values = [bbox?.x, bbox?.y, bbox?.width, bbox?.height];
  if (!values.every((value) => typeof value === "number" && Number.isFinite(value))) return null;
  const [x, y, boxWidth, boxHeight] = values;
  if (Math.abs(boxWidth) < MIN_SLICE_ASSET_SIZE || Math.abs(boxHeight) < MIN_SLICE_ASSET_SIZE) return null;
  const rawLeft = Math.min(x, x + boxWidth);
  const rawTop = Math.min(y, y + boxHeight);
  const rawRight = Math.max(x, x + boxWidth);
  const rawBottom = Math.max(y, y + boxHeight);
  const left = Math.round(clamp(rawLeft, 0, width));
  const top = Math.round(clamp(rawTop, 0, height));
  const right = Math.round(clamp(rawRight, 0, width));
  const bottom = Math.round(clamp(rawBottom, 0, height));
  if (right - left < MIN_SLICE_ASSET_SIZE || bottom - top < MIN_SLICE_ASSET_SIZE) return null;
  return { x: left, y: top, width: right - left, height: bottom - top };
}

function parseSliceAssetDetectionText(text, { width, height }) {
  const sourceWidth = Math.round(Number(width));
  const sourceHeight = Math.round(Number(height));
  if (!Number.isFinite(sourceWidth) || sourceWidth < 1 || !Number.isFinite(sourceHeight) || sourceHeight < 1) {
    throw new Error("Invalid source image size");
  }
  const value = extractJsonObject(text);
  const sourceAssets = Array.isArray(value?.assets) ? value.assets : [];
  const assets = [];
  sourceAssets.forEach((asset, index) => {
    const kind = String(asset?.kind || "").trim();
    if (!ALLOWED_SLICE_ASSET_KINDS.has(kind)) return;
    // Elements under a dimming overlay stay part of the background image.
    if (asset?.behindOverlay === true) return;
    const bbox = normalizeBBox(asset?.bbox, sourceWidth, sourceHeight);
    if (!bbox) return;
    const confidenceValue = Number(asset?.confidence);
    const defaultName = `slice_${String(index + 1).padStart(2, "0")}`;
    const modelName = normalizeSliceAssetName(String(asset?.name || "").trim().slice(0, 120));
    assets.push({
      name: modelName || defaultName,
      kind,
      shape: SLICE_ASSET_SHAPES.has(asset?.shape) ? asset.shape : "free",
      bbox,
      confidence: Number.isFinite(confidenceValue) ? clamp(confidenceValue, 0, 1) : null,
      containsEmbeddedText: asset?.containsEmbeddedText === true,
      reason: String(asset?.reason || "").trim().slice(0, 300)
    });
  });
  return { assets: assets.filter((asset, index) => !isPartOfIllustration(asset, assets) && (
    asset.kind === "progress-bar" || !assets.some((other, otherIndex) => (
      otherIndex !== index
      && other.kind !== "progress-bar"
      && isCutOutPiece(asset.bbox, other.bbox)
      && (!isCutOutPiece(other.bbox, asset.bbox) || otherIndex < index)
    ))
  )) };
}

// A small picture lying (almost) entirely inside a larger illustration, like fruit in a truck bed, is part of it:
// cutting it out would leave a hole that has to be painted over in the illustration.
function isPartOfIllustration(asset, assets) {
  if (!PICTURE_KINDS.has(asset.kind)) return false;
  const area = asset.bbox.width * asset.bbox.height;
  return assets.some((other) => {
    if (other === asset || other.kind !== "illustration" || other.bbox.width * other.bbox.height <= area * 2) return false;
    const width = Math.min(asset.bbox.x + asset.bbox.width, other.bbox.x + other.bbox.width) - Math.max(asset.bbox.x, other.bbox.x);
    const height = Math.min(asset.bbox.y + asset.bbox.height, other.bbox.y + other.bbox.height) - Math.max(asset.bbox.y, other.bbox.y);
    return width > 0 && height > 0 && width * height >= area * 0.9;
  });
}

const PICTURE_KINDS = new Set(["illustration", "icon", "complex-decoration", "photo", "product-image"]);

// A box inside another one that shares at least three of its edges is a piece of it (the part of an icon above a bar)
// or a duplicate, not a separate layer; a child icon or label sits inside its parent without touching three edges.
// Progress bars are exempt: a fill legitimately shares three edges with its track.
function isCutOutPiece(inner, outer, tolerance = 4) {
  const near = (a, b) => Math.abs(a - b) <= tolerance;
  const inside = inner.x >= outer.x - tolerance
    && inner.y >= outer.y - tolerance
    && inner.x + inner.width <= outer.x + outer.width + tolerance
    && inner.y + inner.height <= outer.y + outer.height + tolerance;
  const sharedEdges = [
    near(inner.x, outer.x),
    near(inner.y, outer.y),
    near(inner.x + inner.width, outer.x + outer.width),
    near(inner.y + inner.height, outer.y + outer.height)
  ].filter(Boolean).length;
  return inside && sharedEdges >= 3;
}

module.exports = {
  parseSliceAssetDetectionText
};
