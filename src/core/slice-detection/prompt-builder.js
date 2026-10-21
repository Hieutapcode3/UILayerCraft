const SLICE_ASSET_KIND_LIST = "icon, avatar, illustration, photo, product-image, complex-decoration, complex-chart, logo, button, badge, text, panel, progress-bar";

// Shared by AI Slice and the background decomposition plan: every layer a UI artist would export separately.
const SLICE_ASSET_RULES = [
  "Split the screen into every visually distinct layer a UI artist would export separately, like a layered PSD. Missing a visible element is worse than returning an extra one.",
  "Return separate assets for: icons and currency or lives symbols; small badges such as plus buttons and notification dots; whole buttons (kind button); counter and label plates such as the dark pill behind a number (kind panel); level or map nodes, difficulty tags and ribbons; progress bars, tracks and the path or connector segments between nodes (kind progress-bar); bottom navigation bars, tab backgrounds and the selected-tab highlight (kind panel); cards, popups and decorations.",
  "Return every visible piece of text or digits (numbers, button labels, tab labels, tag labels) as its own asset with kind text and a box tight around the glyphs only.",
  "A parent and the children drawn on top of it are separate assets: a coin icon, the plus badge over the coin and the pill behind its number are three assets; a button and its label are two assets.",
  "Never split an illustration into parts: anything drawn inside or touching a large illustration (cargo and fruit in a truck bed, items a character holds, decorations stuck to it) belongs to that one asset. Only objects separated from it by background, such as fruit lying apart on the floor, are separate assets.",
  "An object standing on the ground ends at the object itself: its cast shadow on the floor stays in the background, not in its bbox.",
  "Each bbox must tightly enclose the full visible extent of that one element, including its outline and drop shadow, and nothing else. Overlapping boxes are expected.",
  "When an element is partly covered by another one (a level node behind its difficulty tag, a pill behind a coin), its bbox still covers its whole shape, including the covered part.",
  "List assets from back to front in paint order: elements drawn behind come first, elements drawn on top (badges, labels, text) come after the element they cover.",
  "Give each asset a shape: ellipse for round elements (coins, round badges, circular level nodes), capsule for pills and fully rounded bars, free for everything else.",
  "Each element appears exactly once. Do not return group or section boxes that only enclose other assets (such as a whole top bar row or the whole level path), and do not return a cut-out piece of another asset (such as the part of an icon that sticks out above a bar).",
  "When a popup or result screen sits on top of a dark, dimmed or blurred overlay, everything under that overlay is background: return only the bright foreground elements drawn above the overlay, never the darkened elements behind it. If you still list an element that is under the overlay, set behindOverlay to true.",
  "Do not return the full-screen background itself as an asset."
];

function buildSliceAssetDetectionPrompt({ width, height, sourceImageName }) {
  return [
    "Analyze the attached UI image and return every visual layer that should be exported as a PNG crop.",
    `Source image: ${sourceImageName || "source-ui.png"}.`,
    `All bbox values must use original ${width}x${height} image pixel coordinates. Do not normalize to 750px or percentages.`,
    `Allowed kind values, in this exact vocabulary: ${SLICE_ASSET_KIND_LIST}.`,
    ...SLICE_ASSET_RULES,
    "Every asset name must be a concise, specific English snake_case identifier describing its content or purpose, for example woodcarving_course_cover or gradient_flag_icon. Never use Chinese, spaces, hyphens, generic candidate labels, or file extensions. Use slice_01 only when the content truly cannot be identified.",
    "Return one JSON object with this shape:",
    '{"assets":[{"name":"specific_english_asset_name","kind":"icon","shape":"free","bbox":{"x":0,"y":0,"width":8,"height":8},"confidence":0.0,"containsEmbeddedText":false,"behindOverlay":false,"reason":"what this layer is"}]}',
    "Return JSON only. Do not include Markdown or explanations outside the JSON object."
  ].join("\n");
}

function buildSliceAssetJsonRepairPrompt(rawText) {
  return [
    "Repair the following model output without adding, deleting, merging, or deduplicating asset entries.",
    "Return one valid JSON object only with an assets array and the original values whenever recoverable.",
    String(rawText || "")
  ].join("\n\n");
}

module.exports = {
  SLICE_ASSET_KIND_LIST,
  SLICE_ASSET_RULES,
  buildSliceAssetDetectionPrompt,
  buildSliceAssetJsonRepairPrompt
};
