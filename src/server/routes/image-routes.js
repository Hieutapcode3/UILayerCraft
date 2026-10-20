function createImageRoutes({
  getTaskRequestContext,
  readJson,
  runWithAiProgress,
  generateImage,
  editImage,
  sendJson
}) {
  return async function handleImageRoutes(request, response) {
    if (request.method === "POST" && request.url === "/api/images/generate") {
      const payload = await readJson(request);
      const context = getTaskRequestContext("generation");
      const result = await runWithAiProgress(payload, "Image generation request sent; waiting for the upstream response", () => generateImage(payload, context));
      sendJson(response, 200, result);
      return true;
    }

    if (request.method === "POST" && request.url === "/api/images/edit") {
      const payload = await readJson(request);
      const context = getTaskRequestContext("generation");
      const result = await runWithAiProgress(payload, "Image edit request sent; waiting for the upstream response", () => editImage(payload, context));
      sendJson(response, 200, result);
      return true;
    }

    return false;
  };
}

module.exports = {
  createImageRoutes
};
