const {
  normalizeImageScaleMode,
  dataUrlToBytes
} = require("./image-data");
const { applyCornerRadius } = require("./paint");

async function createImageRectangle({ figmaApi, name, imageDataUrl, width, height, scaleMode, atob }) {
  const bytes = dataUrlToBytes(imageDataUrl, {
    base64Decode: figmaApi.base64Decode,
    atob
  });
  const image = figmaApi.createImage(bytes);
  const rectangle = figmaApi.createRectangle();
  rectangle.name = name;
  rectangle.resize(width, height);
  rectangle.fills = [
    {
      type: "IMAGE",
      scaleMode: normalizeImageScaleMode(scaleMode),
      imageHash: image.hash
    }
  ];
  return rectangle;
}

async function createAssetNode({ figmaApi, notifyRecoverableError, asset, atob }) {
  if (asset.svgData) {
    try {
      const svgNode = createSvgAssetNode({
        figmaApi,
        name: asset.name,
        svgData: asset.svgData,
        width: asset.placement.width,
        height: asset.placement.height
      });
      applyAssetCornerRadius(svgNode, asset, notifyRecoverableError);
      return svgNode;
    } catch (error) {
      notifyRecoverableError("SVG backfill failed; fell back to PNG", error);
    }
  }

  const imageNode = await createImageRectangle({
    figmaApi,
    atob,
    name: asset.name,
    imageDataUrl: asset.dataUrl,
    width: asset.placement.width,
    height: asset.placement.height
  });
  applyAssetCornerRadius(imageNode, asset, notifyRecoverableError);
  return imageNode;
}

function applyAssetCornerRadius(node, asset, notifyRecoverableError) {
  const hasRadii = asset.radii && typeof asset.radii === "object";
  if (!node || (!hasRadii && (asset.radius === undefined || asset.radius === null))) {
    return;
  }
  try {
    applyCornerRadius(node, hasRadii ? { radii: asset.radii } : { radius: asset.radius });
  } catch (error) {
    notifyRecoverableError(`Failed to apply slice corner radius: ${asset.name || "asset"}`, error);
  }
}

function createSvgAssetNode({ figmaApi, name, svgData, width, height }) {
  if (typeof figmaApi.createNodeFromSvg !== "function") {
    throw new Error("This Figma environment does not support creating SVG nodes");
  }
  const node = figmaApi.createNodeFromSvg(svgData);
  node.name = name;
  node.resize(width, height);
  return node;
}

module.exports = {
  createImageRectangle,
  createAssetNode,
  applyAssetCornerRadius,
  createSvgAssetNode
};
