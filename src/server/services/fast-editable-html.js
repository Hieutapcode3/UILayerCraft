const {
  validateAiImageDimensions
} = require("../../core/ai-image-dimensions");

async function reconstructFastEditableHtml(payload, dependencies, requestContext) {
  const {
    assertString,
    normalizeEditableReferenceAssets,
    buildFallbackH5PreviewHtml,
    updateAiProgress,
    buildEditableDesignH5Prompt,
    buildVisionMessageContent,
    requestVisionChatCompletion,
    extractChatCompletionText,
    extractHtmlDocument,
    sanitizeFastGeneratedHtml,
    isAiAbortError,
    maxTokens
  } = dependencies;
  const prompt = assertString(payload.prompt || "", "prompt");
  const { width, height } = validateAiImageDimensions(payload.width, payload.height);
  const imageDataUrl = typeof payload.imageDataUrl === "string" ? payload.imageDataUrl : "";
  const referenceAssets = normalizeEditableReferenceAssets(payload.referenceAssets, width, height);
  const previewWidth = Math.round(width);
  const previewHeight = Math.max(1, Math.round(height * (previewWidth / width)));
  const config = requestContext?.config || {};
  const fallbackHtml = buildFallbackH5PreviewHtml({
    width,
    height,
    previewWidth,
    previewHeight,
    imageDataUrl,
    referenceAssets
  });

  if (!imageDataUrl) {
    return {
      ok: true,
      mode: "h5-template",
      warning: "Source image missing; a basic template was generated.",
      html: fallbackHtml,
      metadata: {
        width,
        height,
        previewWidth,
        previewHeight,
        referenceAssetCount: referenceAssets.length
      },
      provider: {
        baseUrl: config.baseUrl,
        model: config.model
      }
    };
  }

  try {
    updateAiProgress(payload.progressId, "Asking the image understanding model to generate the HTML/CSS preview directly…");
    const promptText = buildEditableDesignH5Prompt({
      prompt,
      width,
      height,
      previewWidth,
      previewHeight,
      referenceAssets
    });
    const data = await requestVisionChatCompletion({
      model: config.model,
      messages: [{
        role: "user",
        content: buildVisionMessageContent(promptText, [{
          dataUrl: imageDataUrl,
          name: payload.sourceImageName || "full-ui-screenshot.png"
        }])
      }],
      stream: true,
      max_tokens: maxTokens
    }, requestContext);
    const rawHtml = extractHtmlDocument(extractChatCompletionText(data));
    const sanitized = sanitizeFastGeneratedHtml(rawHtml, referenceAssets, {
      previewWidth,
      previewHeight,
      sourceWidth: width,
      sourceHeight: height
    });
    const qualityWarnings = Array.isArray(sanitized.qualityWarnings)
      ? sanitized.qualityWarnings
      : (sanitized.missingReferenceAnchorCount > 0
          ? [`The model missed ${sanitized.missingReferenceAnchorCount} slice anchors; added them from the manual coordinates.`]
          : []);
    return {
      ok: true,
      mode: "h5-fast-direct",
      warning: qualityWarnings.join(" "),
      html: sanitized.html,
      metadata: {
        width,
        height,
        previewWidth,
        previewHeight,
        referenceAssetCount: referenceAssets.length,
        referenceAnchorCount: sanitized.referenceAnchorCount,
        missingReferenceAnchorCount: sanitized.missingReferenceAnchorCount
      },
      provider: {
        baseUrl: config.baseUrl,
        model: config.model
      }
    };
  } catch (error) {
    if (isAiAbortError(error)) throw error;
    throw error;
  }
}

module.exports = {
  reconstructFastEditableHtml
};
