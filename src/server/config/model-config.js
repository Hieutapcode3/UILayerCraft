const MODEL_TASKS = Object.freeze({
  VISION: "vision",
  GENERATION: "generation",
  INPAINT: "inpaint"
});

const TASK_LABELS = Object.freeze({
  [MODEL_TASKS.VISION]: "Vision Model",
  [MODEL_TASKS.GENERATION]: "Image generation",
  [MODEL_TASKS.INPAINT]: "Image inpainting"
});

const DEFAULT_TIMEOUT_MS = 300000;

function normalizeModelConfigState(raw = {}, options = {}) {
  if (raw?.version === 2 && Array.isArray(raw.modelConfigs)) {
    return normalizeVersion2State(raw);
  }
  return migrateLegacyProviderState(raw, options);
}

function normalizeVersion2State(raw) {
  const modelConfigs = [];
  for (const value of raw.modelConfigs) {
    try {
      modelConfigs.push(validateModelConfigInput({
        ...value,
        tasks: normalizeStoredTasks(value, raw.taskRouting)
      }));
    } catch {
      // Ignore corrupt entries while keeping the rest of the local configuration usable.
    }
  }
  const taskRouting = emptyTaskRouting();
  for (const task of Object.values(MODEL_TASKS)) {
    const configId = typeof raw.taskRouting?.[task] === "string"
      ? raw.taskRouting[task]
      : null;
    const config = modelConfigs.find((item) => item.id === configId);
    taskRouting[task] = config?.tasks.includes(task) ? config.id : null;
  }
  return {
    version: 2,
    modelConfigs,
    taskRouting,
    legacy: clonePlainObject(raw.legacy)
  };
}

function migrateLegacyProviderState(raw = {}, options = {}) {
  const createId = typeof options.createId === "function"
    ? options.createId
    : createModelConfigId;
  const activeProvider = normalizeLegacyProvider(raw.activeProvider);
  const providers = normalizeLegacyProviders(raw, activeProvider);
  const modelConfigs = [];
  const taskRouting = emptyTaskRouting();

  for (const provider of ["thirdParty", "openai"]) {
    const source = providers[provider];
    if (!source || (provider !== activeProvider && !source.apiKey)) continue;
    const providerLabel = provider === "openai" ? "Official OpenAI" : "Third-party";
    const visionConfig = validateModelConfigInput({
      id: createId(),
      name: `${providerLabel} · Image understanding`,
      baseUrl: source.baseUrl,
      apiKey: source.apiKey || "",
      model: source.visionModel || source.model,
      timeoutMs: source.timeoutMs,
      tasks: [MODEL_TASKS.VISION],
      testResults: {}
    });
    const imageConfig = validateModelConfigInput({
      id: createId(),
      name: `${providerLabel} · Image generation`,
      baseUrl: source.baseUrl,
      apiKey: source.apiKey || "",
      model: source.model,
      timeoutMs: source.timeoutMs,
      tasks: [MODEL_TASKS.GENERATION, MODEL_TASKS.INPAINT],
      testResults: {}
    });
    modelConfigs.push(visionConfig, imageConfig);
    if (provider === activeProvider) {
      taskRouting.vision = visionConfig.id;
      taskRouting.generation = imageConfig.id;
      taskRouting.inpaint = imageConfig.id;
    }
  }

  return {
    version: 2,
    modelConfigs,
    taskRouting,
    legacy: clonePlainObject(raw)
  };
}

function validateModelConfigInput(input = {}, options = {}) {
  const id = normalizeRequiredString(input.id || options.createId?.(), "Model config ID");
  const name = String(input.name || "").trim();
  const model = normalizeRequiredString(input.model, "Model");
  const tasks = [...new Set((Array.isArray(input.tasks) ? input.tasks : [])
    .filter((task) => Object.values(MODEL_TASKS).includes(task)))];
  if (tasks.length === 0) throw badRequest("Select at least one task to use for");
  if (
    tasks.includes(MODEL_TASKS.VISION)
    && (tasks.includes(MODEL_TASKS.GENERATION) || tasks.includes(MODEL_TASKS.INPAINT))
  ) {
    throw badRequest("Image understanding cannot be combined with image generation or image inpainting");
  }
  if (
    tasks.includes(MODEL_TASKS.GENERATION)
    !== tasks.includes(MODEL_TASKS.INPAINT)
  ) {
    throw badRequest("Image generation and image inpainting must use the same config");
  }

  const timeoutMs = normalizeTimeoutMs(
    input.timeoutMs !== undefined ? input.timeoutMs : secondsToMilliseconds(input.timeoutSeconds)
  );
  const baseUrl = normalizeBaseUrl(input.baseUrl);
  if (/^cli:\/\//i.test(baseUrl) && !tasks.includes(MODEL_TASKS.VISION)) {
    throw badRequest("CLI configs (cli://...) only support image understanding");
  }

  return {
    id,
    name,
    baseUrl,
    apiKey: String(input.apiKey || "").trim(),
    model,
    timeoutMs,
    tasks,
    testResults: normalizeTestResults(input.testResults, tasks)
  };
}

function summarizeModelConfig(config) {
  return {
    id: config.id,
    name: config.name,
    baseUrl: config.baseUrl,
    model: config.model,
    timeoutSeconds: Math.round(config.timeoutMs / 1000),
    tasks: [...config.tasks],
    testResults: clonePlainObject(config.testResults),
    hasApiKey: Boolean(config.apiKey),
    apiKeyLength: config.apiKey ? config.apiKey.length : 0
  };
}

function resolveTaskConfig(state, task) {
  const label = TASK_LABELS[task];
  if (!label) throw badRequest("Invalid model task type");
  const configId = state?.taskRouting?.[task];
  if (!configId) throw badRequest(`Select a ${label} config in Model Settings first`);
  const config = state.modelConfigs?.find((item) => item.id === configId);
  if (!config) throw badRequest(`${label} model config does not exist: ${configId}`);
  if (!config.tasks.includes(task)) {
    throw badRequest(`Model config ${config.name} does not declare the ${label} purpose`);
  }
  return config;
}

function createTaskConfigSnapshot(config) {
  return Object.freeze({
    configId: config.id,
    name: config.name,
    baseUrl: config.baseUrl,
    apiKey: config.apiKey,
    model: config.model,
    timeoutMs: config.timeoutMs
  });
}

function normalizeLegacyProviders(raw, activeProvider) {
  if (raw.providers && typeof raw.providers === "object") {
    return raw.providers;
  }
  if (!raw.baseUrl && !raw.model && !raw.apiKey) return {};
  const provider = activeProvider === "thirdParty" ? "thirdParty" : "openai";
  return {
    [provider]: {
      baseUrl: raw.baseUrl || (provider === "openai" ? "https://api.openai.com" : "https://api.openai.com"),
      apiKey: raw.apiKey || "",
      model: raw.model || "gpt-image-2",
      visionModel: raw.visionModel || "",
      timeoutMs: raw.timeoutMs || DEFAULT_TIMEOUT_MS
    }
  };
}

function normalizeLegacyProvider(value) {
  return ["thirdParty", "openai", "openrouter"].includes(value)
    ? value
    : "thirdParty";
}

function normalizeStoredTasks(config, taskRouting) {
  const tasks = Array.isArray(config?.tasks) ? config.tasks : [];
  const hasVision = tasks.includes(MODEL_TASKS.VISION);
  const hasImage = tasks.includes(MODEL_TASKS.GENERATION) || tasks.includes(MODEL_TASKS.INPAINT);
  if (!hasVision || !hasImage) return tasks;

  const routedToVision = taskRouting?.vision === config.id;
  const routedToImage = (
    taskRouting?.generation === config.id
    || taskRouting?.inpaint === config.id
  );
  return routedToImage && !routedToVision
    ? [MODEL_TASKS.GENERATION, MODEL_TASKS.INPAINT]
    : [MODEL_TASKS.VISION];
}

function normalizeTestResults(value, tasks) {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(tasks
    .filter((task) => value[task] && typeof value[task] === "object")
    .map((task) => [task, clonePlainObject(value[task])]));
}

function normalizeBaseUrl(value) {
  const normalized = String(value || "").trim().replace(/\/+$/, "");
  if (!/^https?:\/\//.test(normalized) && !/^cli:\/\/[a-z]+$/i.test(normalized)) {
    throw badRequest("Base URL must start with http:// or https://, or be a local CLI such as cli://claude");
  }
  return normalized;
}

function normalizeTimeoutMs(value) {
  const numeric = Number(value);
  const milliseconds = Number.isFinite(numeric) && numeric > 0 ? numeric : DEFAULT_TIMEOUT_MS;
  return Math.round(Math.min(1800000, Math.max(30000, milliseconds)));
}

function secondsToMilliseconds(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric * 1000 : DEFAULT_TIMEOUT_MS;
}

function normalizeRequiredString(value, label) {
  const normalized = String(value || "").trim();
  if (!normalized) throw badRequest(`${label} cannot be empty`);
  return normalized;
}

function emptyTaskRouting() {
  return {
    [MODEL_TASKS.VISION]: null,
    [MODEL_TASKS.GENERATION]: null,
    [MODEL_TASKS.INPAINT]: null
  };
}

function createModelConfigId() {
  return `config_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function clonePlainObject(value) {
  if (!value || typeof value !== "object") return {};
  return JSON.parse(JSON.stringify(value));
}

function badRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

module.exports = {
  MODEL_TASKS,
  TASK_LABELS,
  createModelConfigId,
  createTaskConfigSnapshot,
  normalizeModelConfigState,
  resolveTaskConfig,
  summarizeModelConfig,
  validateModelConfigInput
};
