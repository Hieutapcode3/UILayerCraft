// Several design options for one Generate UI request. Image providers (and the Codex CLI) return one image per call,
// so each option is its own call, all at once; each gets a hint to be a distinct take on the same request.
const MAX_IMAGE_OPTIONS = 4;

function clampOptionCount(count) {
  return Math.max(1, Math.min(MAX_IMAGE_OPTIONS, Math.round(Number(count) || 1)));
}

function buildOptionPrompt(prompt, index, count) {
  if (count <= 1) return prompt;
  return [
    prompt,
    `Design option ${index + 1} of ${count}: keep every requirement above, but make this option a distinct take on the layout, color palette and decoration, so the options are easy to tell apart.`
  ].join("\n\n");
}

// requestOne(prompt) -> { images, provider, ... }. Returns the first result's fields with every option's images,
// and failedCount when some calls failed; throws the first error only when all of them failed.
async function requestImageOptions(prompt, count, requestOne) {
  const total = clampOptionCount(count);
  const settled = await Promise.allSettled(
    Array.from({ length: total }, (_, index) => requestOne(buildOptionPrompt(prompt, index, total)))
  );
  const results = settled.filter((item) => item.status === "fulfilled").map((item) => item.value);
  if (!results.length) throw settled[0].reason;
  const images = results.flatMap((result) => result.images || []).map((image, index) => ({ ...image, id: `image_${index + 1}` }));
  return { ...results[0], images, failedCount: total - results.length };
}

module.exports = {
  MAX_IMAGE_OPTIONS,
  buildOptionPrompt,
  clampOptionCount,
  requestImageOptions
};
