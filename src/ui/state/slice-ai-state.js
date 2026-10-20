function hasProcessedSliceResult(asset) {
  return Boolean(asset?.aiTransparent || asset?.aiRedrawn);
}

function isLockedAiCompleteAsset(asset) {
  return Boolean(
    asset?.aiCompleted
    && asset?.aiCompletedDataUrl
  );
}

function getSliceBaseAiOperation(asset, restoreState) {
  const candidates = [
    restoreState?.lastAiOperation,
    asset?.transparencyRestoreState?.lastAiOperation,
    asset?.svgRestoreState?.lastAiOperation,
    asset?.lastAiOperation
  ];
  const operation = candidates.find((value) => ["complete", "backgroundRestore"].includes(value));
  return operation || (asset?.aiCompleted ? "complete" : null);
}

function getSliceActiveImageDataUrl(asset) {
  const svgData = String(asset?.svgData || "").trim();
  if (svgData) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
  }
  return asset?.dataUrl || "";
}

function getSliceTransparencySourceDataUrl(asset) {
  return asset?.transparencyRestoreState?.dataUrl
    || asset?.transparencyRestoreDataUrl
    || asset?.dataUrl
    || asset?.originalDataUrl
    || "";
}

function getSliceTransparencyRestoreDataUrl(asset) {
  return asset?.transparencyRestoreState?.dataUrl
    || asset?.transparencyRestoreDataUrl
    || asset?.originalDataUrl
    || asset?.dataUrl
    || "";
}

function createSliceTransparencyRestoreState(asset) {
  if (asset?.transparencyRestoreState?.dataUrl) {
    return { ...asset.transparencyRestoreState };
  }
  return {
    dataUrl: getSliceTransparencySourceDataUrl(asset),
    aiCompleted: Boolean(asset?.aiCompleted),
    aiRedrawn: Boolean(asset?.aiRedrawn),
    svgData: asset?.svgData || null,
    aiRedrawnPlacement: asset?.aiRedrawnPlacement ? { ...asset.aiRedrawnPlacement } : null,
    lastAiOperation: asset?.lastAiOperation || null
  };
}

function restoreSliceTransparencyState(asset) {
  const restoreDataUrl = getSliceTransparencyRestoreDataUrl(asset);
  if (!asset || !restoreDataUrl) return false;
  const restoreState = asset.transparencyRestoreState;
  asset.dataUrl = restoreDataUrl;
  asset.transparentDataUrl = null;
  asset.aiTransparentDataUrl = null;
  asset.aiTransparentPlacement = null;
  asset.transparent = false;
  asset.aiTransparent = false;
  if (restoreState) {
    asset.aiCompleted = Boolean(restoreState.aiCompleted);
    asset.aiRedrawn = Boolean(restoreState.aiRedrawn);
    asset.svgData = restoreState.svgData || null;
    asset.aiRedrawnPlacement = restoreState.aiRedrawnPlacement
      ? { ...restoreState.aiRedrawnPlacement }
      : null;
    asset.lastAiOperation = restoreState.lastAiOperation || null;
  } else if (asset.lastAiOperation === "transparent") {
    asset.lastAiOperation = null;
  }
  delete asset.transparencyRestoreState;
  delete asset.transparencyRestoreDataUrl;
  return true;
}

function applySliceTransparencyResult(asset, { dataUrl, ai = false } = {}) {
  if (!asset || !dataUrl) return false;
  const restoreState = createSliceTransparencyRestoreState(asset);
  asset.transparencyRestoreState = restoreState;
  asset.dataUrl = dataUrl;
  asset.transparentDataUrl = ai ? null : dataUrl;
  asset.aiTransparentDataUrl = ai ? dataUrl : null;
  asset.aiTransparentPlacement = ai && asset.placement ? { ...asset.placement } : null;
  asset.transparent = true;
  asset.aiTransparent = Boolean(ai);
  asset.aiRedrawn = false;
  asset.svgData = null;
  asset.aiRedrawnPlacement = null;
  asset.lastAiOperation = ai ? "transparent" : getSliceBaseAiOperation(asset, restoreState);
  return true;
}

function createSliceSvgRestoreState(asset) {
  if (asset?.svgRestoreState) {
    return {
      ...asset.svgRestoreState,
      aiRedrawnPlacement: asset.svgRestoreState.aiRedrawnPlacement
        ? { ...asset.svgRestoreState.aiRedrawnPlacement }
        : null
    };
  }
  return {
    svgData: asset?.svgData || null,
    aiRedrawn: Boolean(asset?.aiRedrawn),
    aiRedrawnPlacement: asset?.aiRedrawnPlacement ? { ...asset.aiRedrawnPlacement } : null,
    lastAiOperation: asset?.lastAiOperation || null
  };
}

function applySliceSvgResult(asset, { svgData, ai = false } = {}) {
  if (!asset || !String(svgData || "").trim()) return false;
  const restoreState = createSliceSvgRestoreState(asset);
  asset.svgRestoreState = restoreState;
  asset.svgData = svgData;
  asset.aiRedrawn = Boolean(ai);
  asset.aiRedrawnPlacement = ai && asset.placement ? { ...asset.placement } : null;
  asset.lastAiOperation = ai ? "redrawSvg" : getSliceBaseAiOperation(asset, restoreState);
  return true;
}

function restoreSliceSvgState(asset) {
  if (!asset) return false;
  const restoreState = asset.svgRestoreState;
  asset.svgData = restoreState?.svgData || null;
  asset.aiRedrawn = Boolean(restoreState?.aiRedrawn);
  asset.aiRedrawnPlacement = restoreState?.aiRedrawnPlacement
    ? { ...restoreState.aiRedrawnPlacement }
    : null;
  asset.lastAiOperation = restoreState
    ? restoreState.lastAiOperation || getSliceBaseAiOperation(asset)
    : getSliceBaseAiOperation(asset);
  delete asset.svgRestoreState;
  return true;
}

function getProcessedSliceResetMessage(asset) {
  const _t = (typeof t === "function") ? t : (key, fb) => fb;
  const name = asset?.name || _t("slice_asset_default_name", "asset");
  const hasTransparent = Boolean(asset?.aiTransparent);
  const hasSvg = Boolean(asset?.aiRedrawn);
  if (hasTransparent && hasSvg) {
    return _t("slice_reset_transparent_svg", `Slice ${name} was made transparent and converted to SVG; adjusting the slice will cancel the transparency and SVG. Continue?`, { name });
  }
  if (hasTransparent) {
    return _t("slice_reset_transparent", `Slice ${name} was made transparent; adjusting the slice will cancel the transparency. Continue?`, { name });
  }
  if (hasSvg) {
    return _t("slice_reset_svg", `Slice ${name} was converted to SVG; adjusting the slice will cancel the SVG. Continue?`, { name });
  }
  return _t("slice_reset_processed", `Slice ${name} was processed; adjusting the slice will cancel the processed result. Continue?`, { name });
}

if (typeof module !== "undefined") {
  module.exports = {
    applySliceSvgResult,
    applySliceTransparencyResult,
    createSliceTransparencyRestoreState,
    getSliceActiveImageDataUrl,
    getSliceTransparencyRestoreDataUrl,
    getSliceTransparencySourceDataUrl,
    getProcessedSliceResetMessage,
    hasProcessedSliceResult,
    isLockedAiCompleteAsset,
    restoreSliceSvgState,
    restoreSliceTransparencyState
  };
}
