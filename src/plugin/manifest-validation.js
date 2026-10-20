function validateManifest(manifest) {
  if (!manifest || !manifest.screen || !manifest.previewImage) {
    throw new Error("Missing screen or previewImage data");
  }

  if (!Number.isFinite(manifest.screen.width) || !Number.isFinite(manifest.screen.height)) {
    throw new Error("screen.width and screen.height must be numbers");
  }

  if (!Array.isArray(manifest.assets)) {
    throw new Error("assets must be an array");
  }

  for (const asset of manifest.assets) {
    if (!asset.name || !asset.placement || (!asset.dataUrl && !asset.svgData)) {
      throw new Error("Each asset must include name, placement, dataUrl or svgData");
    }

    const placement = asset.placement;
    const fields = [placement.x, placement.y, placement.width, placement.height];
    if (fields.some((value) => !Number.isFinite(value))) {
      throw new Error(`Placement coordinates of asset ${asset.name} must be numbers`);
    }
  }
}

function validateEditableDesignManifest(manifest) {
  if (!manifest || !manifest.screen) {
    throw new Error("Missing editable design screen data");
  }
  if (!Number.isFinite(manifest.screen.width) || !Number.isFinite(manifest.screen.height)) {
    throw new Error("editable design screen.width and screen.height must be numbers");
  }
  if (!Array.isArray(manifest.nodes)) {
    throw new Error("editable design nodes must be an array");
  }
}

module.exports = {
  validateManifest,
  validateEditableDesignManifest
};
