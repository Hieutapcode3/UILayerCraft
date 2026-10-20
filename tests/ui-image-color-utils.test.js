const test = require("node:test");
const assert = require("node:assert/strict");

const {
  averageBackgroundColors,
  averageColors,
  colorDistance,
  getPixelColor,
  mixColors,
  pickEdgeBackgroundColor,
  removeEdgeBackgroundPixels,
  rgbToHex,
  sampleEdgeColor,
  sampleEdgeStats,
  toRgb
} = require("../src/ui/services/image-color-utils");

test("color format helpers clamp and mix values", () => {
  assert.equal(toRgb({ r: 12.2, g: 34.6, b: 56.5 }), "12, 35, 57");
  assert.equal(rgbToHex(15, 256, -3), "#0fff00");
  assert.equal(colorDistance(0, 0, 0, 3, 4, 12), 13);
  const mixed = mixColors(
    { r: 0, g: 20, b: 40 },
    { r: 100, g: 120, b: 140 },
    0.25
  );
  assert.equal(mixed.r, 25);
  assert.equal(mixed.g, 45);
  assert.equal(mixed.b, 65);
  assert.ok(Math.abs(mixed.luma - 42.192) < 0.000001);
});

test("pixel sampling computes luma and saturation", () => {
  const pixels = Uint8ClampedArray.from([
    10, 20, 30, 255,
    80, 90, 100, 255,
    120, 130, 140, 255,
    200, 210, 220, 255
  ]);

  assert.deepEqual(getPixelColor(pixels, 2, 1, 0), {
    r: 80,
    g: 90,
    b: 100,
    luma: 88.596,
    saturation: 20
  });
});

test("average helpers preserve fallback and background selection rules", () => {
  const fallback = { r: 1, g: 2, b: 3, luma: 2 };
  assert.equal(averageColors([], fallback), fallback);
  const average = averageColors([
    { r: 10, g: 20, b: 30 },
    { r: 30, g: 40, b: 50 }
  ]);
  assert.equal(average.r, 20);
  assert.equal(average.g, 30);
  assert.equal(average.b, 40);
  assert.ok(Math.abs(average.luma - 28.596) < 0.000001);

  const samples = [
    { r: 10, g: 10, b: 10, luma: 10, saturation: 0 },
    { r: 20, g: 20, b: 20, luma: 20, saturation: 0 },
    { r: 30, g: 30, b: 30, luma: 30, saturation: 0 },
    { r: 40, g: 40, b: 40, luma: 40, saturation: 0 },
    { r: 50, g: 50, b: 50, luma: 50, saturation: 0 },
    { r: 200, g: 20, b: 20, luma: 58.28, saturation: 180 }
  ];
  const background = averageBackgroundColors(samples);
  assert.ok(Math.abs(background.r - 58.333333333333336) < 0.000001);
  assert.ok(Math.abs(background.g - 28.333333333333332) < 0.000001);
  assert.ok(Math.abs(background.b - 28.333333333333332) < 0.000001);
  assert.ok(Math.abs(background.luma - 34.711333333333336) < 0.000001);
});

test("edge sampling summarizes border colors", () => {
  const pixels = Uint8ClampedArray.from([
    10, 10, 10, 255,
    20, 20, 20, 255,
    30, 30, 30, 255,
    40, 40, 40, 255
  ]);

  assert.deepEqual(sampleEdgeColor(pixels, 2, 2), {
    r: 25,
    g: 25,
    b: 25,
    luma: 25
  });
  assert.deepEqual(sampleEdgeStats(pixels, 2, 2).sides.top, {
    r: 15,
    g: 15,
    b: 15,
    luma: 15
  });
});

function makeImage(width, height, colorAt) {
  const pixels = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const [r, g, b] = colorAt(x, y);
      pixels.set([r, g, b, 255], (y * width + x) * 4);
    }
  }
  return pixels;
}

const CREAM = [250, 240, 225];
const BROWN = [60, 25, 15];
const YELLOW = [245, 200, 60];

test("edge background removal keeps interior colors close to the background", () => {
  // Cream background, brown outline ring, cream-ish yellow fill inside.
  const pixels = makeImage(20, 20, (x, y) => {
    const inside = x >= 5 && x <= 14 && y >= 5 && y <= 14;
    const ring = inside && (x === 5 || x === 14 || y === 5 || y === 14);
    if (ring) return BROWN;
    return inside ? [245, 235, 215] : CREAM;
  });
  removeEdgeBackgroundPixels(pixels, 20, 20);
  assert.equal(pixels[3], 0);
  assert.equal(pixels[(10 * 20 + 10) * 4 + 3], 255);
  assert.equal(pixels[(5 * 20 + 10) * 4 + 3], 255);
});

test("edge background color prefers the corners when the subject touches the edges", () => {
  // Brown outline covers most of every edge; only the corners show the cream background.
  const pixels = makeImage(20, 20, (x, y) => {
    const corner = (x < 2 || x > 17) && (y < 2 || y > 17);
    if (corner) return CREAM;
    const outline = x < 2 || x > 17 || y < 2 || y > 17;
    return outline ? BROWN : YELLOW;
  });
  const background = pickEdgeBackgroundColor(pixels, 20, 20);
  assert.deepEqual([background.r, background.g, background.b], CREAM);
  removeEdgeBackgroundPixels(pixels, 20, 20);
  assert.equal(pixels[3], 0);
  assert.equal(pixels[(10 * 20 + 10) * 4 + 3], 255);
});

test("edge background removal un-mixes the anti-aliased fringe", () => {
  // A brown block with a one-pixel 50/50 cream/brown blend around it, on a cream background.
  const pixels = makeImage(12, 12, (x, y) => {
    const ring = Math.max(Math.abs(x - 6), Math.abs(y - 6));
    if (ring > 2) return CREAM;
    if (ring === 2) return CREAM.map((value, index) => (value + BROWN[index]) / 2);
    return BROWN;
  });
  removeEdgeBackgroundPixels(pixels, 12, 12);
  const index = (6 * 12 + 4) * 4;
  assert.ok(Math.abs(pixels[index + 3] - 128) <= 3, `alpha ${pixels[index + 3]}`);
  assert.ok(colorDistance(pixels[index], pixels[index + 1], pixels[index + 2], ...BROWN) < 6);
  assert.equal(pixels[(6 * 12 + 6) * 4 + 3], 255);
});
