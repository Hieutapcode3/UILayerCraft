const test = require("node:test");
const assert = require("node:assert/strict");

const {
  readAttachmentFilename,
  requestFigExport
} = require("../src/ui/api/fig-export-client");

test("requestFigExport returns fig blob and server filename", async () => {
  const calls = [];
  const result = await requestFigExport({
    kind: "slice",
    manifest: { screen: { name: "Slice" } }
  }, {
    fetchBackend: async (path, options) => {
      calls.push({ path, options });
      return new Response(Uint8Array.from([80, 75, 3, 4]), {
        status: 200,
        headers: {
          "content-type": "application/octet-stream",
          "content-disposition": 'attachment; filename="slice.fig"'
        }
      });
    }
  });

  assert.equal(calls[0].path, "/api/design/export-fig");
  assert.equal(calls[0].options.method, "POST");
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    kind: "slice",
    manifest: { screen: { name: "Slice" } }
  });
  assert.equal(result.filename, "slice.fig");
  assert.equal(result.blob.size, 4);
});

test("requestFigExport reports backend JSON errors", async () => {
  await assert.rejects(
    requestFigExport({ kind: "editable", manifest: {} }, {
      fetchBackend: async () => new Response(JSON.stringify({ error: "Invalid manifest" }), {
        status: 400,
        headers: { "content-type": "application/json" }
      })
    }),
    /Invalid manifest/
  );
});

test("fig export client prefers the UTF-8 attachment filename", () => {
  assert.equal(
    readAttachmentFilename(
      "attachment; filename=\"uilayercraft.fig\"; filename*=UTF-8''%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0-%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F.fig"
    ),
    "Страница-события.fig"
  );
});
