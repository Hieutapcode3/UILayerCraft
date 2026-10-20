function createAssetRoutes({
  getTaskRequestContext,
  readJson,
  runWithAiProgress,
  generateTransparentAsset,
  redrawAsset,
  redrawAssetAsSvg,
  vectorizeAsset,
  sendJson
}) {
  return async function handleAssetRoutes(request, response) {
    if (request.method === "POST" && request.url === "/api/assets/generate-transparent") {
      const payload = await readJson(request);
      const context = getTaskRequestContext("generation");
      const result = await runWithAiProgress(payload, "Transparent image request sent; waiting for the upstream response", () => generateTransparentAsset(payload, context));
      sendJson(response, 200, result);
      return true;
    }

    if (request.method === "POST" && request.url === "/api/assets/ai-redraw") {
      const payload = await readJson(request);
      const task = payload.preserveBackground === true && payload.maskDataUrl
        ? "inpaint"
        : "generation";
      const context = getTaskRequestContext(task);
      const result = await runWithAiProgress(payload, "AI image processing request sent; waiting for the upstream response", () => redrawAsset(payload, context));
      sendJson(response, 200, result);
      return true;
    }

    if (request.method === "POST" && request.url === "/api/assets/redraw-svg") {
      const payload = await readJson(request);
      const context = getTaskRequestContext("vision");
      const result = await runWithAiProgress(payload, "Sending the AI redraw SVG request", () => redrawAssetAsSvg(payload, context));
      sendJson(response, 200, result);
      return true;
    }

    if (request.method === "POST" && request.url === "/api/assets/vectorize") {
      const payload = await readJson(request);
      const result = await vectorizeAsset(payload);
      sendJson(response, 200, result);
      return true;
    }

    return false;
  };
}

module.exports = {
  createAssetRoutes
};
