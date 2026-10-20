const test = require("node:test");
const assert = require("node:assert/strict");

const {
  bindFigmaFrameExportSelectionState,
  createFigmaFrameExportSelectionState
} = require("../../src/plugin/figma-frame-export-selection");

test("createFigmaFrameExportSelectionState reuses complete-frame validation", () => {
  assert.deepEqual(createFigmaFrameExportSelectionState({
    currentPage: { selection: [{ type: "FRAME" }] }
  }), {
    type: "figma-frame-export-selection-state",
    eligible: true,
    reason: ""
  });

  assert.deepEqual(createFigmaFrameExportSelectionState({
    currentPage: { selection: [{ type: "TEXT" }] }
  }), {
    type: "figma-frame-export-selection-state",
    eligible: false,
    reason: "Select a complete Figma frame, not a child layer inside it"
  });
});

test("bindFigmaFrameExportSelectionState publishes initially and on selection changes", () => {
  const posted = [];
  let selectionChange = null;
  const figmaApi = {
    currentPage: { selection: [] },
    on(event, listener) {
      assert.equal(event, "selectionchange");
      selectionChange = listener;
    }
  };

  const publish = bindFigmaFrameExportSelectionState({
    figmaApi,
    postMessage: (message) => posted.push(message)
  });

  assert.equal(posted[0].eligible, false);
  figmaApi.currentPage.selection = [{ type: "FRAME" }];
  selectionChange();
  assert.equal(posted[1].eligible, true);

  publish();
  assert.equal(posted[2].eligible, true);
});
