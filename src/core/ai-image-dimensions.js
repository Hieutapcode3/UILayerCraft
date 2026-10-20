const MAX_AI_IMAGE_DIMENSION = 4096;
const SUPPORTED_AI_IMAGE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp"
]);

function validateSupportedAiImageType(type) {
  const normalizedType = typeof type === "string" ? type.trim().toLowerCase() : "";
  if (!SUPPORTED_AI_IMAGE_TYPES.has(normalizedType)) {
    throw createAiImageDimensionError("Please select a PNG, JPG, or WebP image.");
  }
  return normalizedType;
}

function validateAiImageDimensions(width, height) {
  const normalizedWidth = Math.round(Number(width));
  const normalizedHeight = Math.round(Number(height));
  if (
    !Number.isFinite(normalizedWidth)
    || normalizedWidth <= 0
    || !Number.isFinite(normalizedHeight)
    || normalizedHeight <= 0
  ) {
    throw createAiImageDimensionError("Invalid image size. Please choose the image again.");
  }
  if (
    normalizedWidth > MAX_AI_IMAGE_DIMENSION
    || normalizedHeight > MAX_AI_IMAGE_DIMENSION
  ) {
    throw createAiImageDimensionError(
      `Image size is ${normalizedWidth} × ${normalizedHeight}; the current maximum supported size is `
      + `${MAX_AI_IMAGE_DIMENSION} × ${MAX_AI_IMAGE_DIMENSION}. Please downscale it and upload again.`
    );
  }
  return {
    width: normalizedWidth,
    height: normalizedHeight
  };
}

function createAiImageDimensionError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

if (typeof module !== "undefined") {
  module.exports = {
    MAX_AI_IMAGE_DIMENSION,
    validateAiImageDimensions,
    validateSupportedAiImageType
  };
}
