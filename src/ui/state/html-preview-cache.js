function createEmptyHtmlPreviewCache() {
  return null;
}

function isSupportedHtmlPreviewResult(result) {
  if (!result?.html && !result?.canonicalHtml) return false;
  return result.mode === "h5-fast-direct"
    || result.mode === "h5-template";
}

function normalizeHtmlPreviewCache(source = {}) {
  const entry = source?.htmlPreviewSchemaVersion === 2
    ? source.htmlPreview
    : source;
  if (
    entry?.schemaVersion !== 2
    || !isSupportedHtmlPreviewResult(entry)
    || !String(entry.contextSignature || "")
  ) {
    return null;
  }
  return {
    schemaVersion: 2,
    mode: entry.mode,
    canonicalHtml: String(entry.canonicalHtml),
    contextSignature: String(entry.contextSignature),
    metadata: entry.metadata && typeof entry.metadata === "object"
      ? { ...entry.metadata }
      : {}
  };
}

function getCachedHtmlPreview(cache) {
  return normalizeHtmlPreviewCache(cache);
}

function createHtmlPreviewCacheEntry(result, contextSignature) {
  if (!isSupportedHtmlPreviewResult(result) || !String(contextSignature || "")) {
    return null;
  }
  return {
    schemaVersion: 2,
    mode: result.mode,
    canonicalHtml: String(result.canonicalHtml || result.html),
    contextSignature: String(contextSignature),
    metadata: result.metadata && typeof result.metadata === "object"
      ? { ...result.metadata }
      : {}
  };
}

function getHtmlPreviewCacheReuseState(cache, contextSignature, forceRecognition = false) {
  const entry = normalizeHtmlPreviewCache(cache);
  if (!entry) {
    return {
      entry: null,
      shouldReuse: false,
      stale: false,
      warning: ""
    };
  }
  const stale = entry.contextSignature !== String(contextSignature || "");
  return {
    entry,
    shouldReuse: !forceRecognition,
    stale,
    warning: stale && !forceRecognition
      ? (typeof t === "function" ? t("cache_stale_warning", "Slice assets have changed; click Re-run AI Recognition to update the preview.") : "Slice assets have changed; click Re-run AI Recognition to update the preview.")
      : ""
  };
}

function getHtmlPreviewCacheOpenRecovery(error) {
  if (error?.name === "EditableAssetHydrationError") {
    return {
      regenerate: true,
      message: (typeof t === "function" ? t("cache_missing_slices", "Cached slices no longer exist, re-analyzing with AI.") : "Cached slices no longer exist, re-analyzing with AI.")
    };
  }
  return {
    regenerate: false,
    message: error?.message || String(error || (typeof t === "function" ? t("cache_open_failed", "AI layer import cache could not be opened") : "AI layer import cache could not be opened"))
  };
}

function isActiveHtmlPreviewRequest(requestId, {
  activeRequestId = 0,
  aborted = false
} = {}) {
  return !aborted && Number(requestId) > 0 && Number(requestId) === Number(activeRequestId);
}

if (typeof module !== "undefined") {
  module.exports = {
    createHtmlPreviewCacheEntry,
    createEmptyHtmlPreviewCache,
    getCachedHtmlPreview,
    getHtmlPreviewCacheOpenRecovery,
    getHtmlPreviewCacheReuseState,
    isActiveHtmlPreviewRequest,
    isSupportedHtmlPreviewResult,
    normalizeHtmlPreviewCache
  };
}
