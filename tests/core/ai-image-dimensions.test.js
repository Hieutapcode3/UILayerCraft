const test = require("node:test");
const assert = require("node:assert/strict");

const {
  MAX_AI_IMAGE_DIMENSION,
  validateAiImageDimensions,
  validateSupportedAiImageType
} = require("../../src/core/ai-image-dimensions");

test("AI image dimensions accept the exact 4096 boundary", () => {
  assert.equal(MAX_AI_IMAGE_DIMENSION, 4096);
  assert.deepEqual(validateAiImageDimensions(4096, 4096), {
    width: 4096,
    height: 4096
  });
});

test("AI image dimensions reject either oversized edge without resizing", () => {
  assert.throws(
    () => validateAiImageDimensions(4097, 750),
    /Image size is 4097 × 750; the current maximum supported size is 4096 × 4096/
  );
  assert.throws(
    () => validateAiImageDimensions(750, 4097),
    /Image size is 750 × 4097; the current maximum supported size is 4096 × 4096/
  );
});

test("AI image dimensions reject invalid values", () => {
  assert.throws(() => validateAiImageDimensions(0, 750), /Invalid image size/);
  assert.throws(() => validateAiImageDimensions(750, Number.NaN), /Invalid image size/);
});

test("AI image dimension errors are classified as bad requests", () => {
  assert.throws(
    () => validateAiImageDimensions(4097, 750),
    (error) => error.statusCode === 400
  );
});

test("AI image type accepts only the formats named by the upload UI", () => {
  assert.equal(validateSupportedAiImageType("image/png"), "image/png");
  assert.equal(validateSupportedAiImageType("image/jpeg"), "image/jpeg");
  assert.equal(validateSupportedAiImageType("image/jpg"), "image/jpg");
  assert.equal(validateSupportedAiImageType("image/webp"), "image/webp");
  assert.equal(validateSupportedAiImageType(" IMAGE/PNG "), "image/png");
});

test("AI image type rejects other image formats and missing MIME types", () => {
  assert.throws(() => validateSupportedAiImageType("image/gif"), /Please select a PNG, JPG, or WebP image/);
  assert.throws(() => validateSupportedAiImageType("image/svg+xml"), /Please select a PNG, JPG, or WebP image/);
  assert.throws(() => validateSupportedAiImageType(""), /Please select a PNG, JPG, or WebP image/);
});
