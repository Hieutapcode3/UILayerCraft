const test = require("node:test");
const assert = require("node:assert/strict");

const { getFigExportUiMode } = require("../src/ui/state/fig-export-mode");

test("embedded mode keeps direct Figma import labels", () => {
  assert.deepEqual(getFigExportUiMode(true), {
    sliceLabel: "Import Slices",
    editableLabel: "Import Design to Figma",
    editableTitle: "Capture current preview as Figma editable layers",
    downloadsFig: false
  });
});

test("standalone mode exposes fig download labels", () => {
  assert.deepEqual(getFigExportUiMode(false), {
    sliceLabel: "Download Slices .fig",
    editableLabel: "Download Design .fig",
    editableTitle: "Capture the current preview and download a .fig file that can be imported into Figma",
    downloadsFig: true
  });
});

