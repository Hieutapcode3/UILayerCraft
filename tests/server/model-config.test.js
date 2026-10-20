const test = require("node:test");
const assert = require("node:assert/strict");

const {
  MODEL_TASKS,
  createTaskConfigSnapshot,
  normalizeModelConfigState,
  resolveTaskConfig,
  summarizeModelConfig,
  validateModelConfigInput
} = require("../../src/server/config/model-config");

function sequenceIds(prefix = "config") {
  let index = 0;
  return () => `${prefix}_${++index}`;
}

function validConfig(overrides = {}) {
  return {
    id: "config_1",
    name: "Vision Model",
    baseUrl: "https://api.example.com",
    apiKey: "sk-secret",
    model: "vision-model",
    timeoutMs: 300000,
    tasks: [MODEL_TASKS.VISION],
    testResults: {},
    ...overrides
  };
}

test("migrates an active OpenAI provider into separate vision and image configs", () => {
  const state = normalizeModelConfigState({
    activeProvider: "openai",
    providers: {
      openai: {
        baseUrl: "https://api.openai.com",
        apiKey: "sk-test",
        model: "gpt-image-2",
        visionModel: "gpt-5.6-sol",
        timeoutMs: 500000
      }
    }
  }, { createId: sequenceIds() });

  assert.deepEqual(state.modelConfigs.map((item) => ({
    id: item.id,
    model: item.model,
    tasks: item.tasks
  })), [
    { id: "config_1", model: "gpt-5.6-sol", tasks: ["vision"] },
    { id: "config_2", model: "gpt-image-2", tasks: ["generation", "inpaint"] }
  ]);
  assert.deepEqual(state.taskRouting, {
    vision: "config_1",
    generation: "config_2",
    inpaint: "config_2"
  });
  assert.equal(state.legacy.activeProvider, "openai");
});

test("does not migrate an active Codex CLI provider", () => {
  const state = normalizeModelConfigState({
    activeProvider: "codexCli",
    providers: {
      codexCli: {
        model: "Image Gen plugin (1k)",
        visionModel: "gpt-5.6-sol",
        timeoutMs: 420000
      }
    }
  }, { createId: sequenceIds() });

  assert.deepEqual(state.modelConfigs, []);
  assert.deepEqual(state.taskRouting, {
    vision: null,
    generation: null,
    inpaint: null
  });
});

test("leaves routes empty when the legacy active provider is OpenRouter", () => {
  const state = normalizeModelConfigState({
    activeProvider: "openrouter",
    providers: {
      openrouter: {
        baseUrl: "https://openrouter.ai/api/v1",
        apiKey: "or-test",
        model: "image-model",
        visionModel: "vision-model",
        timeoutMs: 300000
      }
    }
  }, { createId: sequenceIds() });

  assert.deepEqual(state.modelConfigs, []);
  assert.deepEqual(state.taskRouting, {
    vision: null,
    generation: null,
    inpaint: null
  });
  assert.equal(state.legacy.providers.openrouter.apiKey, "or-test");
});

test("normalizes version 2 state without exposing invalid task routes", () => {
  const state = normalizeModelConfigState({
    version: 2,
    modelConfigs: [validConfig()],
    taskRouting: {
      vision: "config_1",
      generation: "config_1",
      inpaint: "missing"
    },
    legacy: { activeProvider: "openai" }
  });

  assert.equal(state.taskRouting.vision, "config_1");
  assert.equal(state.taskRouting.generation, null);
  assert.equal(state.taskRouting.inpaint, null);
  assert.deepEqual(state.legacy, { activeProvider: "openai" });
});

test("normalizes a legacy mixed-task config to its currently routed purpose", () => {
  const state = normalizeModelConfigState({
    version: 2,
    modelConfigs: [validConfig({
      tasks: [MODEL_TASKS.VISION, MODEL_TASKS.GENERATION, MODEL_TASKS.INPAINT]
    })],
    taskRouting: {
      vision: "config_1",
      generation: null,
      inpaint: null
    }
  });

  assert.deepEqual(state.modelConfigs[0].tasks, ["vision"]);
  assert.equal(state.taskRouting.vision, "config_1");
});

test("validates OpenAI-compatible input and trims connection fields", () => {
  const config = validateModelConfigInput({
    id: " config-a ",
    name: " Fast vision ",
    baseUrl: "https://api.example.com/",
    apiKey: " sk-test ",
    model: " vision-model ",
    timeoutSeconds: 45,
    tasks: ["vision", "vision"],
    testResults: {}
  });

  assert.deepEqual(config, {
    id: "config-a",
    name: "Fast vision",
    baseUrl: "https://api.example.com",
    apiKey: "sk-test",
    model: "vision-model",
    timeoutMs: 45000,
    tasks: ["vision"],
    testResults: {}
  });
});

test("accepts an empty optional remark without writing a display fallback", () => {
  const config = validateModelConfigInput(validConfig({ name: "   " }));

  assert.equal(config.name, "");
  assert.equal(summarizeModelConfig(config).name, "");
});

test("rejects a config without a declared task", () => {
  assert.throws(
    () => validateModelConfigInput(validConfig({ tasks: [] })),
    (error) => error.statusCode === 400 && error.message === "Select at least one task to use for"
  );
});

test("rejects combining image understanding with image generation tasks", () => {
  assert.throws(
    () => validateModelConfigInput(validConfig({
      tasks: [MODEL_TASKS.VISION, MODEL_TASKS.GENERATION, MODEL_TASKS.INPAINT]
    })),
    (error) => error.statusCode === 400
      && error.message === "Image understanding cannot be combined with image generation or image inpainting"
  );
});

test("rejects a single image task because generation and repair share one configuration", () => {
  for (const task of [MODEL_TASKS.GENERATION, MODEL_TASKS.INPAINT]) {
    assert.throws(
      () => validateModelConfigInput(validConfig({ tasks: [task] })),
      (error) => error.statusCode === 400
        && error.message === "Image generation and image inpainting must use the same config"
    );
  }
});

test("resolveTaskConfig rejects assigning a config to an undeclared task", () => {
  const state = {
    modelConfigs: [validConfig()],
    taskRouting: {
      vision: "config_1",
      generation: "config_1",
      inpaint: null
    }
  };

  assert.throws(
    () => resolveTaskConfig(state, "generation"),
    (error) => error.statusCode === 400 && /does not declare the Image generation purpose/.test(error.message)
  );
});

test("summary redacts API key while request snapshot is immutable and complete", () => {
  const config = validConfig();
  assert.deepEqual(summarizeModelConfig(config), {
    id: "config_1",
    name: "Vision Model",
    baseUrl: "https://api.example.com",
    model: "vision-model",
    timeoutSeconds: 300,
    tasks: ["vision"],
    testResults: {},
    hasApiKey: true,
    apiKeyLength: 9
  });

  const snapshot = createTaskConfigSnapshot(config);
  assert.deepEqual(snapshot, {
    configId: "config_1",
    name: "Vision Model",
    baseUrl: "https://api.example.com",
    apiKey: "sk-secret",
    model: "vision-model",
    timeoutMs: 300000
  });
  assert.equal(Object.isFrozen(snapshot), true);
});
