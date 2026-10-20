function createAiInpaintResultPair({
  compositeAsset,
  compositeDataUrl,
  rawFullDataUrl,
  groupId,
  rawFullId
}) {
  const baseName = String(compositeAsset?.name || "slice")
    .replace(/_(?:local_composite|ai_original)$/, "");
  const composite = {
    ...compositeAsset,
    name: `${baseName}_local_composite`,
    placement: compositeAsset?.placement ? { ...compositeAsset.placement } : compositeAsset?.placement,
    dataUrl: compositeDataUrl,
    aiCompletedDataUrl: compositeDataUrl,
    selected: true,
    aiInpaintResultGroupId: groupId,
    aiInpaintResultRole: "composite"
  };
  delete composite.transparencyRestoreState;
  delete composite.transparencyRestoreDataUrl;
  delete composite.svgRestoreState;
  const createFullAsset = ({ id, name, dataUrl, role }) => {
    const asset = {
      ...composite,
      id,
      name,
      placement: composite.placement ? { ...composite.placement } : composite.placement,
      dataUrl,
      aiCompletedDataUrl: dataUrl,
      selected: true,
      aiInpaintResultRole: role,
      aiProcessing: false,
      aiProcessingLabel: "",
      aiProgressLogs: []
    };
    delete asset.aiCompleteSourceAssetId;
    delete asset.transparencyRestoreState;
    delete asset.transparencyRestoreDataUrl;
    delete asset.svgRestoreState;
    return asset;
  };
  const rawFull = createFullAsset({
    id: rawFullId,
    name: `${baseName}_ai_original`,
    dataUrl: rawFullDataUrl,
    role: "raw-full"
  });
  return { composite, rawFull };
}

function createAiCompleteEditableCopy({ sourceAsset, id, name }) {
  const sourceDataUrl = sourceAsset.originalDataUrl || sourceAsset.dataUrl;
  const copy = {
    ...sourceAsset,
    id,
    name,
    placement: { ...sourceAsset.placement },
    selected: true,
    aiCompleteSourceAssetId: sourceAsset.id,
    isAiProcessedVariant: false,
    processedResetConfirmed: false,
    aiProcessing: false,
    aiProcessingLabel: "",
    aiProgressLogs: [],
    originalDataUrl: sourceDataUrl,
    dataUrl: sourceDataUrl,
    transparentDataUrl: null,
    aiTransparentDataUrl: null,
    aiTransparentPlacement: null,
    aiCompletedDataUrl: null,
    aiCompletedPlacement: null,
    aiRedrawnPlacement: null,
    lastAiOperation: null,
    transparent: false,
    aiTransparent: false,
    aiCompleted: false,
    aiRedrawn: false,
    svgData: null
  };
  delete copy.aiInpaintResultGroupId;
  delete copy.aiInpaintResultRole;
  delete copy.transparencyRestoreState;
  delete copy.transparencyRestoreDataUrl;
  delete copy.svgRestoreState;
  return copy;
}

function getAiInpaintTypeLabel(asset) {
  if (!asset?.aiCompleted) return "";
  if (asset.aiInpaintResultRole === "composite") return "AI completion · local composite";
  if (asset.aiInpaintResultRole === "raw-full") return "AI completion · original";
  return "AI Inpaint";
}

if (typeof module !== "undefined") {
  module.exports = {
    createAiCompleteEditableCopy,
    createAiInpaintResultPair,
    getAiInpaintTypeLabel
  };
}
