const {
  createEditableDesignScreen,
  createUiAssetScreen
} = require("../plugin/screen-importer");
const {
  createFigExportApi,
  exportApiDocument
} = require("./figma-api-adapter");

async function exportFigManifest({ kind, manifest }) {
  const api = createFigExportApi();
  if (kind === "slice") {
    await createUiAssetScreen({
      figmaApi: api,
      notifyRecoverableError() {},
      manifest
    });
  } else if (kind === "editable") {
    await createEditableDesignScreen({
      figmaApi: api,
      manifest
    });
  } else {
    throw new Error(`Unsupported .fig export type: ${kind || "empty"}`);
  }
  return exportApiDocument(api, {
    name: manifest?.screen?.name || "UILayerCraft"
  });
}

module.exports = {
  exportFigManifest
};

