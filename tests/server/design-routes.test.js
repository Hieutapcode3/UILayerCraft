const test = require("node:test");
const assert = require("node:assert/strict");

const {
  createDesignRoutes,
  createFigFilename
} = require("../../src/server/routes/design-routes");

function createHarness({ payload = {} } = {}) {
  const sent = [];
  const progressCalls = [];
  const operations = [];
  const readLimits = [];
  const taskCalls = [];
  const binaryResponses = [];
  const context = { config: { type: "openaiCompatible", model: "vision-a" } };
  const handle = createDesignRoutes({
    getTaskRequestContext: (task) => {
      taskCalls.push(task);
      return context;
    },
    readJson: async (request, limit) => {
      readLimits.push(limit);
      return payload;
    },
    runWithAiProgress: async (nextPayload, message, operation) => {
      progressCalls.push({ payload: nextPayload, message });
      return operation();
    },
    planBackgroundDecomposition: async (nextPayload, nextContext) => {
      operations.push({ name: "planBackgroundDecomposition", payload: nextPayload, context: nextContext });
      return { ok: true, assets: [], backgrounds: [] };
    },
    reconstructEditableDesignH5: async (nextPayload, nextContext) => {
      operations.push({ name: "reconstructEditableDesignH5", payload: nextPayload, context: nextContext });
      return { ok: true, kind: "h5" };
    },
    captureHighFidelityFigma: async (nextPayload) => {
      operations.push({
        name: "captureHighFidelityFigma",
        payload: nextPayload
      });
      return {
        capture: { root: { rect: { width: 750, height: 1334 } } },
        diagnostics: { cdpPseudoNodeCount: 2 }
      };
    },
    exportFigManifest: async (nextPayload) => {
      operations.push({ name: "exportFigManifest", payload: nextPayload });
      return Uint8Array.from([80, 75, 3, 4]);
    },
    sendBinary: (response, status, bytes, headers) => binaryResponses.push({ response, status, bytes, headers }),
    sendJson: (response, status, body) => sent.push({ response, status, body })
  });
  return {
    handle,
    sent,
    progressCalls,
    operations,
    readLimits,
    taskCalls,
    binaryResponses,
    context
  };
}

test("design routes ignore unrelated requests", async () => {
  const { handle, sent } = createHarness();

  assert.equal(await handle({ method: "GET", url: "/api/design/analyze-ui" }, {}), false);
  assert.deepEqual(sent, []);
});

test("POST /api/design/export-fig returns a downloadable fig file", async () => {
  const payload = {
    kind: "editable",
    manifest: { screen: { name: "Страница события", width: 750, height: 1334 }, nodes: [] }
  };
  const harness = createHarness({ payload });

  assert.equal(
    await harness.handle({ method: "POST", url: "/api/design/export-fig" }, {}),
    true
  );
  assert.equal(harness.readLimits[0], 150 * 1024 * 1024);
  assert.deepEqual(harness.operations[0], { name: "exportFigManifest", payload });
  assert.equal(harness.binaryResponses[0].status, 200);
  assert.deepEqual(harness.binaryResponses[0].bytes, Uint8Array.from([80, 75, 3, 4]));
  assert.equal(harness.binaryResponses[0].headers["content-type"], "application/octet-stream");
  assert.equal(
    harness.binaryResponses[0].headers["content-disposition"],
    "attachment; filename=\"uilayercraft.fig\"; filename*=UTF-8''%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0-%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F.fig"
  );
});

test("fig export keeps a safe non-ASCII design name in the download filename", () => {
  assert.equal(createFigFilename("Страница события"), "Страница-события.fig");
});

test("removed standalone AI slice route is not handled", async () => {
  const harness = createHarness();

  assert.equal(await harness.handle({ method: "POST", url: "/api/design/detect-slice-assets" }, {}), false);
  assert.deepEqual(harness.operations, []);
});

test("POST /api/design/plan-background-decomposition plans covered backgrounds", async () => {
  const payload = { imageDataUrl: "data:image/png;base64,abc", width: 750, height: 1334 };
  const harness = createHarness({ payload });

  assert.equal(
    await harness.handle({ method: "POST", url: "/api/design/plan-background-decomposition" }, {}),
    true
  );
  assert.deepEqual(harness.taskCalls, ["vision"]);
  assert.equal(harness.readLimits[0], 150 * 1024 * 1024);
  assert.deepEqual(harness.operations[0], {
    name: "planBackgroundDecomposition",
    payload,
    context: harness.context
  });
  assert.equal(harness.progressCalls[0].message, "AI is splitting regular slices and restorable backgrounds");
  assert.deepEqual(harness.sent[0].body, { ok: true, assets: [], backgrounds: [] });
});

test("POST /api/design/reconstruct-h5 runs with progress", async () => {
  const harness = createHarness({ payload: { html: true } });

  assert.equal(await harness.handle({ method: "POST", url: "/api/design/reconstruct-h5" }, {}), true);
  assert.deepEqual(harness.taskCalls, ["vision"]);
  assert.equal(harness.operations.length, 1);
  assert.equal(harness.operations[0].name, "reconstructEditableDesignH5");
  assert.equal(harness.progressCalls[0].message, "AI is recognizing text, layout and slice assets");
  assert.deepEqual(harness.sent[0].body, { ok: true, kind: "h5" });
});

test("POST /api/design/capture-figma runs Playwright capture without resolving an AI model", async () => {
  const payload = {
    html: "<div class=\"screen\"></div>",
    width: 750,
    height: 1334
  };
  const harness = createHarness({ payload });

  assert.equal(
    await harness.handle({
      method: "POST",
      url: "/api/design/capture-figma"
    }, {}),
    true
  );
  assert.deepEqual(harness.taskCalls, []);
  assert.equal(harness.readLimits[0], 150 * 1024 * 1024);
  assert.deepEqual(harness.operations[0], {
    name: "captureHighFidelityFigma",
    payload
  });
  assert.deepEqual(harness.sent[0].body, {
    capture: { root: { rect: { width: 750, height: 1334 } } },
    diagnostics: { cdpPseudoNodeCount: 2 }
  });
});

test("removed local alias is not handled", async () => {
  const harness = createHarness({ payload: { html: true } });

  assert.equal(await harness.handle({ method: "POST", url: "/api/design/reconstruct-h5-local" }, {}), false);
  assert.deepEqual(harness.operations, []);
});

test("removed visual-analysis route is not handled", async () => {
  const harness = createHarness();

  assert.equal(await harness.handle({ method: "POST", url: "/api/design/analyze-ui" }, {}), false);
  assert.deepEqual(harness.operations, []);
});
