const test = require("node:test");
const assert = require("node:assert/strict");

const {
  alphaBounds,
  buildUpscalePrompt,
  fitBox,
  keyOutColor,
  pickKeyColor,
  removeSmallIslands,
  upscaleSliceAsset,
  upscaleTargetSize
} = require("../../src/server/services/asset-upscale");

function image(width, height, paint) {
  const pixels = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) pixels.set(paint(x, y), (y * width + x) * 4);
  }
  return pixels;
}

// Raw pixels stand in for PNG files: "encode" stores them, "decode" looks them up, resize is nearest neighbor.
function fakeImageOps() {
  const store = new Map();
  return {
    store,
    async encode(pixels, width, height) {
      const id = `img${store.size}`;
      store.set(id, { pixels: new Uint8ClampedArray(pixels), width, height });
      return Buffer.from(id);
    },
    async decode(buffer) {
      return store.get(buffer.toString());
    },
    async resize(pixels, width, height, newWidth, newHeight) {
      return image(newWidth, newHeight, (x, y) => {
        const from = (Math.floor(y * height / newHeight) * width + Math.floor(x * width / newWidth)) * 4;
        return pixels.subarray(from, from + 4);
      });
    }
  };
}

test("pickKeyColor avoids colors used by the asset", () => {
  const red = image(8, 8, () => [255, 20, 200, 255]);
  assert.notEqual(pickKeyColor(red).name, "magenta");
  const navy = image(8, 8, () => [20, 30, 90, 255]);
  assert.equal(pickKeyColor(navy).name, "magenta");
});

test("upscaleTargetSize scales by 4 and caps the longest side", () => {
  assert.deepEqual(upscaleTargetSize(72, 69, 4), { width: 288, height: 276, scale: 4 });
  assert.deepEqual(upscaleTargetSize(1000, 250, 4), { width: 2048, height: 512, scale: 2.048 });
  assert.equal(upscaleTargetSize(3000, 100, 4).scale, 1);
});

test("keyOutColor clears the key, un-mixes the edge tint and keeps the asset", () => {
  const key = { r: 255, g: 0, b: 255 };
  // key | 50/50 mix of key and orange | orange
  const pixels = Uint8ClampedArray.from([255, 0, 255, 255, 255, 60, 128, 255, 255, 120, 0, 255]);
  const out = keyOutColor(pixels, { ...key, limit: -120 });
  assert.equal(out[3], 0);
  assert.ok(out[7] > 0 && out[7] < 255);
  assert.ok(Math.min(out[4], out[6]) <= out[5], `edge pixel keeps no magenta tint: ${[...out.subarray(4, 8)]}`);
  assert.deepEqual([...out.subarray(8)], [255, 120, 0, 255]);
});

test("removeSmallIslands drops stray specks and haze but keeps the asset and its anti-aliasing", () => {
  const pixels = image(40, 40, (x, y) => {
    if (x >= 10 && x < 30 && y >= 10 && y < 30) return [200, 50, 30, 255];
    if (x === 9 && y === 15) return [200, 50, 30, 20]; // faint anti-aliasing next to the asset
    if (x === 2 && y === 2) return [250, 220, 150, 255]; // speck
    if (x === 35 && y === 35) return [250, 220, 150, 20]; // haze far away
    return [0, 0, 0, 0];
  });
  const out = removeSmallIslands(pixels, 40, 40);
  const alphaAt = (x, y) => out[(y * 40 + x) * 4 + 3];
  assert.equal(alphaAt(20, 20), 255);
  assert.equal(alphaAt(9, 15), 20);
  assert.equal(alphaAt(2, 2), 0);
  assert.equal(alphaAt(35, 35), 0);
});

test("alphaBounds and fitBox place content by its aspect ratio", () => {
  const pixels = image(10, 10, (x, y) => (x >= 2 && x < 8 && y >= 4 && y < 6 ? [0, 0, 0, 255] : [0, 0, 0, 0]));
  assert.deepEqual(alphaBounds(pixels, 10, 10), { x: 2, y: 4, width: 6, height: 2 });
  assert.deepEqual(fitBox({ width: 100, height: 50 }, { x: 0, y: 0, width: 40, height: 40 }), { x: 0, y: 10, width: 40, height: 20 });
});

test("buildUpscalePrompt recreates the element from the crop on a key color without redesign", () => {
  const prompt = buildUpscalePrompt({ name: "bonus_moves_label", width: 636, height: 136, key: { name: "green", hex: "#00FF00" } });
  assert.match(prompt, /bonus_moves_label/);
  assert.match(prompt, /636 × 136/);
  assert.match(prompt, /#00FF00/);
  assert.match(prompt, /Do not redesign/);
  assert.match(prompt, /brand-new/);
  assert.match(prompt, /restore any part covered/);
});

test("upscaleSliceAsset sends the slice on a key color and returns a clean, aligned 4x transparent PNG", async () => {
  const ops = fakeImageOps();
  const toDataUrl = async (pixels, width, height) => `data:image/png;base64,${(await ops.encode(pixels, width, height)).toString("base64")}`;
  // 20 x 10 slice: a 10 x 6 navy block in the middle, plus a cream speck the local transparency left behind.
  const layer = image(20, 10, (x, y) => {
    if (x >= 5 && x < 15 && y >= 2 && y < 8) return [20, 30, 90, 255];
    if (x === 1 && y === 1) return [250, 230, 180, 255];
    return [0, 0, 0, 0];
  });
  const crop = image(20, 10, (x, y) => (x >= 5 && x < 15 && y >= 2 && y < 8 ? [20, 30, 90, 255] : [250, 230, 180, 255]));
  let sent = null;
  // The "model" answers on its own square canvas with lots of key-color padding and a block of a different size.
  const modelAnswer = await toDataUrl(image(100, 100, (x, y) => (x >= 20 && x < 80 && y >= 35 && y < 71 ? [20, 30, 90, 255] : [255, 0, 255, 255])), 100, 100);
  const result = await upscaleSliceAsset({
    layerDataUrl: await toDataUrl(layer, 20, 10),
    dataUrl: await toDataUrl(crop, 20, 10),
    width: 20,
    height: 10,
    scale: 4,
    name: "navy_block",
    covers: [{ name: "label on/top", x: 5, y: 2, width: 10, height: 6 }]
  }, {
    config: { model: "default", baseUrl: "cli://codex" },
    callForm: async (requestPath, form) => {
      sent = { requestPath, form };
      return { data: [{ b64_json: modelAnswer.split(",")[1] }] };
    }
  }, {
    imageOps: ops,
    toImageSize: () => "",
    dataUrlToFile: (dataUrl, name) => new File([dataUrl], name),
    normalizeImageResponse: async (data) => ({ images: data.data.map((item) => ({ dataUrl: `data:image/png;base64,${item.b64_json}` })) })
  });

  assert.equal(sent.requestPath, "/v1/images/edits");
  assert.equal(sent.form.get("size"), null);
  assert.match(sent.form.get("prompt"), /#FF00FF/);
  // Covering layers are given in the 4x canvas, with names cleaned up.
  assert.match(sent.form.get("prompt"), /label_on_top at x 20, y 8, 40 × 24/);
  const [source, reference] = sent.form.getAll("image[]");
  assert.equal(source.name, "slice-original-crop.png");
  assert.equal(reference.name, "slice-cutout-guide.png");
  const referencePixels = ops.store.get(Buffer.from((await reference.text()).split(",")[1], "base64").toString()).pixels;
  assert.deepEqual([...referencePixels.subarray(0, 4)], [255, 0, 255, 255], "transparent parts are sent as the key color");

  assert.equal(result.requiresLocalTransparency, false);
  assert.deepEqual(result.upscale, { scale: 4, width: 80, height: 40, keyColor: "#FF00FF" });
  const output = ops.store.get(Buffer.from(result.images[0].dataUrl.split(",")[1], "base64").toString());
  assert.equal(output.width, 80);
  assert.equal(output.height, 40);
  // The block lands where it was in the slice (x 20-59, y 8-31 at 4x), with the 60:36 aspect kept, and no speck.
  const bounds = alphaBounds(output.pixels, 80, 40);
  assert.ok(Math.abs(bounds.x - 20) <= 1 && Math.abs(bounds.width - 40) <= 1, JSON.stringify(bounds));
  assert.ok(bounds.y >= 8 && bounds.y + bounds.height <= 32, JSON.stringify(bounds));
  assert.equal(output.pixels[(4 * 80 + 4) * 4 + 3], 0);
  assert.deepEqual([...output.pixels.subarray((20 * 80 + 40) * 4, (20 * 80 + 40) * 4 + 4)], [20, 30, 90, 255]);
});

test("buildUpscalePrompt keeps layers drawn on top out of a container instead of drawing slots for them", () => {
  const plain = buildUpscalePrompt({ name: "setting_popup_panel", width: 400, height: 400, key: { name: "magenta", hex: "#FF00FF" } });
  assert.doesNotMatch(plain, /must NOT appear/);
  const prompt = buildUpscalePrompt({
    name: "setting_popup_panel",
    width: 400,
    height: 400,
    key: { name: "magenta", hex: "#FF00FF" },
    covers: [{ name: "music_toggle_button", x: 40, y: 120, width: 96, height: 96 }]
  });
  assert.match(prompt, /music_toggle_button at x 40, y 120, 96 × 96/);
  assert.match(prompt, /do not draw any slot, hole, recess/);
});
