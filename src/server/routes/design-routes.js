function createDesignRoutes({
  getTaskRequestContext,
  readJson,
  runWithAiProgress,
  planBackgroundDecomposition,
  reconstructEditableDesignH5,
  captureHighFidelityFigma,
  exportFigManifest,
  sendBinary,
  sendJson
}) {
  return async function handleDesignRoutes(request, response) {
    if (request.method === "POST" && request.url === "/api/design/plan-background-decomposition") {
      const payload = await readJson(request, 150 * 1024 * 1024);
      const context = getTaskRequestContext("vision");
      const result = await runWithAiProgress(payload, "AI is splitting regular slices and restorable backgrounds", () => planBackgroundDecomposition(payload, context));
      sendJson(response, 200, result);
      return true;
    }

    if (request.method === "POST" && request.url === "/api/design/reconstruct-h5") {
      const payload = await readJson(request);
      const context = getTaskRequestContext("vision");
      const result = await runWithAiProgress(payload, "AI is recognizing text, layout and slice assets", () => reconstructEditableDesignH5(payload, context));
      sendJson(response, 200, result);
      return true;
    }

    if (request.method === "POST" && request.url === "/api/design/capture-figma") {
      const payload = await readJson(request, 150 * 1024 * 1024);
      const result = await captureHighFidelityFigma(payload);
      sendJson(response, 200, result);
      return true;
    }

    if (request.method === "POST" && request.url === "/api/design/export-fig") {
      const payload = await readJson(request, 150 * 1024 * 1024);
      const bytes = await exportFigManifest(payload);
      const filename = createFigFilename(payload?.manifest?.screen?.name);
      sendBinary(response, 200, bytes, {
        "content-type": "application/octet-stream",
        "content-disposition": createAttachmentDisposition(filename)
      });
      return true;
    }

    return false;
  };
}

function createFigFilename(value) {
  const stem = Array.from(String(value || "uilayercraft")
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}_-]+/gu, "-")
    .replace(/^-+|-+$/g, ""))
    .slice(0, 80)
    .join("");
  return `${stem || "uilayercraft"}.fig`;
}

function createAttachmentDisposition(filename) {
  const stem = String(filename || "uilayercraft.fig").replace(/\.fig$/i, "");
  const asciiStem = stem
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  const fallback = `${asciiStem || "uilayercraft"}.fig`;
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

module.exports = {
  createDesignRoutes,
  createFigFilename
};
