const {
  createProviderHttpClient
} = require("../providers/provider-http-client");
const {
  callCliChatCompletion,
  isCliBaseUrl
} = require("../providers/cli-chat-client");

function createModelRequestContext(snapshot, dependencies = {}) {
  const config = Object.freeze({ ...snapshot });
  if (isCliBaseUrl(config.baseUrl)) return createCliRequestContext(config, dependencies);
  const client = createProviderHttpClient({
    fetchImpl: dependencies.fetchImpl,
    createAbortError: dependencies.createAbortError,
    getRequestSignal: dependencies.getRequestSignal,
    config
  });
  return {
    config,
    callJson: client.callOpenAIJson,
    callForm: client.callOpenAIForm,
    callStream: client.callOpenAIStream
  };
}

function createCliRequestContext(config, dependencies) {
  const callChat = (requestPath, body) => {
    if (!/\/chat\/completions$/.test(requestPath)) {
      return Promise.reject(Object.assign(
        new Error(`${config.baseUrl} only supports image understanding; use an HTTP API for image generation`),
        { statusCode: 400 }
      ));
    }
    return callCliChatCompletion(body, {
      baseUrl: config.baseUrl,
      model: config.model,
      timeoutMs: config.timeoutMs,
      signal: dependencies.getRequestSignal?.(),
      createAbortError: dependencies.createAbortError,
      spawnImpl: dependencies.spawnImpl
    });
  };
  return {
    config,
    callJson: callChat,
    callForm: callChat,
    callStream: callChat
  };
}

module.exports = {
  createModelRequestContext
};
