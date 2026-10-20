const test = require("node:test");
const assert = require("node:assert/strict");

const {
  getModelConfigTestButtonState,
  renderModelConfigListView,
  renderTaskRoutingView
} = require("../src/ui/renderers/model-settings");

function fixture(overrides = {}) {
  return {
    id: "config-a",
    name: "Official OpenAI · Precise inpainting",
    baseUrl: "https://api.example.com",
    model: "gpt-image-2",
    timeoutSeconds: 300,
    tasks: ["generation", "inpaint"],
    testResults: {},
    hasApiKey: true,
    ...overrides
  };
}

test("test button distinguishes success, failure, and native Mask support", () => {
  assert.deepEqual(getModelConfigTestButtonState(fixture({
    tasks: ["vision"],
    testResults: { vision: { status: "success" } }
  })), { text: "Test Passed", tone: "success" });
  assert.deepEqual(getModelConfigTestButtonState(fixture({
    tasks: ["generation", "inpaint"],
    testResults: {
      generation: { status: "failed" },
      inpaint: { status: "success" }
    }
  })), { text: "Test Failed", tone: "failure" });
  assert.deepEqual(getModelConfigTestButtonState(fixture({
    testResults: {
      generation: { status: "success" },
      inpaint: { status: "success", nativeMaskSupported: true }
    }
  })), { text: "Mask Supported", tone: "success" });
});

test("pending or unknown model test results never render as success", () => {
  assert.deepEqual(getModelConfigTestButtonState(fixture({
    tasks: ["vision"],
    testResults: { vision: { status: "pending" } }
  })), { text: "Test", tone: "neutral" });
  assert.deepEqual(getModelConfigTestButtonState(fixture({
    tasks: ["generation", "inpaint"],
    testResults: {
      generation: { status: "success" },
      inpaint: { status: "running", nativeMaskSupported: true }
    }
  })), { text: "Test", tone: "neutral" });
});

test("config cards escape dynamic values and expose one unified test action", () => {
  const html = renderModelConfigListView({
    modelConfigs: [fixture({
      name: "<script>alert(1)</script>",
      baseUrl: "https://example.test/?x=<bad>",
      model: "model<&"
    })]
  });

  assert.doesNotMatch(html, /<script>alert/);
  assert.match(html, /&lt;script&gt;/);
  assert.equal((html.match(/data-model-config-test=/g) || []).length, 1);
  assert.match(html, /data-model-config-test="config-a"[^>]*>Test<\/button>/);
  assert.doesNotMatch(html, /data-model-config-duplicate|>Copy</);
  assert.doesNotMatch(html, /model-config-tag|model-config-tags/);
  assert.match(html, />Edit</);
});

test("empty API remarks use a display-only fallback", () => {
  const html = renderModelConfigListView({
    modelConfigs: [fixture({ name: "" })]
  });

  assert.match(html, />Unnamed API</);
});

test("config cards group understanding separately from generation and repair", () => {
  const html = renderModelConfigListView({
    modelConfigs: [
      fixture({ id: "vision", name: "Vision A", tasks: ["vision"] }),
      fixture({ id: "image", name: "Image A", tasks: ["generation", "inpaint"] })
    ]
  });

  assert.match(html, /Vision Model[\s\S]*Vision A/);
  assert.match(html, /Image generation \/ inpainting[\s\S]*Image A/);
  assert.ok(html.indexOf("Vision A") < html.indexOf("Image A"));
});

test("task routing renders only eligible configs", () => {
  const html = renderTaskRoutingView({
    modelConfigs: [
      fixture({ id: "vision", name: "Vision A", tasks: ["vision"] }),
      fixture({ id: "image", name: "Generation A", tasks: ["generation", "inpaint"] })
    ],
    taskRouting: { vision: "vision", generation: "image", inpaint: null }
  });

  assert.match(html, /data-route-picker="vision"[\s\S]*Vision A/);
  assert.doesNotMatch(
    html.match(/data-route-picker="vision"[\s\S]*?<\/div>\s*<\/div>/)?.[0] || "",
    /Generation A/
  );
  assert.match(html, /Vision Model[\s\S]*data-route-picker="vision"/);
  assert.match(html, /Image Generation \/ Inpaint[\s\S]*data-route-picker="image"/);
  assert.equal((html.match(/data-route-picker-trigger=/g) || []).length, 2);
  assert.match(
    html,
    /class="model-route-picker-trigger"[^>]*data-route-picker-trigger="vision"/
  );
  assert.match(
    html,
    /class="model-route-picker-trigger"[^>]*data-route-picker-trigger="image"/
  );
  assert.doesNotMatch(html, /model-route-picker-trigger selected/);
  assert.match(
    html,
    /class="selected"[^>]*aria-selected="true"[^>]*data-route-picker-option="vision"/
  );
  assert.equal((html.match(/data-import-help-placement="right"/g) || []).length, 2);
  assert.match(html, /role="listbox"[\s\S]*data-route-picker-option="vision"/);
  assert.match(html, /Vision A[\s\S]*https:\/\/api\.example\.com/);
  assert.match(html, /\/v1\/chat\/completions/);
  assert.match(html, /\/v1\/images\/generations/);
  assert.match(html, /\/v1\/images\/edits/);
  assert.match(html, /fallback to semantic reference images/);
});

test("routed configs are highlighted and identify their active purpose", () => {
  const html = renderModelConfigListView({
    modelConfigs: [
      fixture({ id: "vision", name: "Vision A", tasks: ["vision"] }),
      fixture({ id: "image", name: "Image A", tasks: ["generation", "inpaint"] })
    ],
    taskRouting: { vision: "vision", generation: "image", inpaint: "image" }
  });

  assert.match(html, /model-config-card active[\s\S]*Vision A[\s\S]*Active for Vision Model/);
  assert.match(html, /model-config-card active[\s\S]*Image A[\s\S]*Active for Image Generation \/ Inpaint/);
});
