const test = require("node:test");
const assert = require("node:assert/strict");

const { isolateSliceLayers, sliceShapeCoverage } = require("../src/ui/services/slice-layer-isolation");

const WIDTH = 120;
const HEIGHT = 100;
const BLUE = [90, 120, 230];
const DARK = [25, 30, 45];
const YELLOW = [250, 200, 30];
const GREEN = [40, 190, 60];
const NAV = [80, 30, 190];

function insideEllipse(x, y, box) {
  const rx = box.width / 2;
  const ry = box.height / 2;
  return Math.hypot((x + 0.5 - box.x - rx) / rx, (y + 0.5 - box.y - ry) / ry) <= 1;
}

// Blue screen; a dark pill behind a yellow coin; a green "+" badge over the coin; a full-width bar at the bottom.
function createScene() {
  const coin = { x: 10, y: 10, width: 40, height: 40 };
  const pill = { x: 30, y: 15, width: 70, height: 30 };
  const badge = { x: 36, y: 36, width: 20, height: 20 };
  const bar = { x: 0, y: 80, width: WIDTH, height: 20 };
  const source = new Uint8ClampedArray(WIDTH * HEIGHT * 4);
  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      let color = BLUE;
      if (sliceShapeCoverage({ placement: pill, shape: "capsule" }, x, y) >= 0.5) color = DARK;
      if (insideEllipse(x, y, coin)) color = YELLOW;
      if (insideEllipse(x, y, badge)) color = GREEN;
      if (y >= bar.y) color = NAV;
      source.set([...color, 255], (y * WIDTH + x) * 4);
    }
  }
  const layers = [
    { placement: pill, shape: "capsule", kind: "panel" },
    { placement: coin, shape: "ellipse", kind: "icon" },
    { placement: badge, shape: "ellipse", kind: "badge" },
    { placement: bar, shape: "free", kind: "panel" }
  ];
  return { source, layers };
}

function pixelAt(result, layer, x, y) {
  const index = ((y - layer.placement.y) * layer.placement.width + (x - layer.placement.x)) * 4;
  return Array.from(result.pixels.subarray(index, index + 4));
}

function near(actual, expected, tolerance = 40) {
  return expected.every((value, channel) => Math.abs(actual[channel] - value) <= tolerance);
}

test("isolateSliceLayers separates a badge from the coin it overlaps", () => {
  const { source, layers } = createScene();
  const [pillResult, coinResult, badgeResult, barResult] = isolateSliceLayers(source, WIDTH, HEIGHT, layers);
  const [pill, coin, badge, bar] = layers;

  // The badge keeps its own pixels; the coin and pill around it are gone.
  assert.ok(near(pixelAt(badgeResult, badge, 46, 46), GREEN));
  assert.equal(pixelAt(badgeResult, badge, 36, 36)[3], 0);

  // The coin is rebuilt under the badge, without green, and its corners are transparent.
  const hidden = pixelAt(coinResult, coin, 42, 42);
  assert.equal(hidden[3], 255);
  assert.ok(near(hidden, YELLOW), `expected yellow under the badge, got ${hidden}`);
  assert.equal(pixelAt(coinResult, coin, 10, 10)[3], 0);
  // Where the pill shows inside the coin box but outside the coin, it is cleared.
  assert.equal(pixelAt(coinResult, coin, 49, 16)[3], 0);

  // The pill is rebuilt dark where the coin covered it.
  assert.ok(near(pixelAt(pillResult, pill, 40, 30), DARK));
  assert.equal(pixelAt(pillResult, pill, 40, 30)[3], 255);

  // A full-width bar looks like background to an edge flood fill but must stay opaque.
  assert.equal(pixelAt(barResult, bar, 60, 90)[3], 255);
  assert.equal(pixelAt(barResult, bar, 0, 99)[3], 255);
});

test("sliceShapeCoverage follows ellipse and capsule outlines", () => {
  const ellipse = { placement: { x: 0, y: 0, width: 20, height: 10 }, shape: "ellipse" };
  assert.equal(sliceShapeCoverage(ellipse, 10, 5), 1);
  assert.equal(sliceShapeCoverage(ellipse, 0, 0), 0);
  const capsule = { placement: { x: 0, y: 0, width: 40, height: 10 }, shape: "capsule" };
  assert.equal(sliceShapeCoverage(capsule, 20, 0), 1);
  assert.equal(sliceShapeCoverage(capsule, 0, 0), 0);
  assert.equal(sliceShapeCoverage({ placement: capsule.placement, shape: "free" }, 0, 0), 1);
});

test("isolateSliceLayers flags a box that only grouped other layers as background", () => {
  const { source, layers } = createScene();
  const group = { placement: { x: 5, y: 5, width: 100, height: 55 }, shape: "free", kind: "complex-decoration" };
  const results = isolateSliceLayers(source, WIDTH, HEIGHT, [group, ...layers]);
  assert.equal(results[0].backgroundOnly, true);
  assert.deepEqual(results.slice(1).map((result) => result.backgroundOnly), [false, false, false, false]);
});

test("isolateSliceLayers keeps a text outline that shares its color with the ribbon border behind it", () => {
  // Green ribbon with a brown border on a dark page; the title box overlaps the top border, and the cream
  // lettering has a brown outline of the same color.
  const BROWN = [64, 26, 1];
  const CREAM = [248, 244, 233];
  const ribbon = { x: 10, y: 20, width: 100, height: 60 };
  const title = { x: 30, y: 21, width: 60, height: 30 };
  const source = new Uint8ClampedArray(WIDTH * HEIGHT * 4);
  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      let color = DARK;
      const inRibbon = x >= ribbon.x && x < ribbon.x + ribbon.width && y >= ribbon.y && y < ribbon.y + ribbon.height;
      if (inRibbon) {
        const border = x < ribbon.x + 3 || x >= ribbon.x + ribbon.width - 3 || y < ribbon.y + 3 || y >= ribbon.y + ribbon.height - 3;
        color = border ? BROWN : GREEN;
      }
      if (x >= 40 && x < 80 && y >= 30 && y < 45) {
        color = x < 42 || x >= 78 || y < 32 || y >= 43 ? BROWN : CREAM;
      }
      source.set([...color, 255], (y * WIDTH + x) * 4);
    }
  }
  const layers = [
    { placement: ribbon, shape: "free", kind: "illustration" },
    { placement: title, shape: "free", kind: "text" }
  ];
  const [, titleResult] = isolateSliceLayers(source, WIDTH, HEIGHT, layers);
  const layer = layers[1];
  assert.equal(pixelAt(titleResult, layer, 40, 37)[3], 255, "left outline");
  assert.equal(pixelAt(titleResult, layer, 60, 31)[3], 255, "top outline");
  assert.equal(pixelAt(titleResult, layer, 60, 37)[3], 255, "fill");
  assert.equal(pixelAt(titleResult, layer, 35, 37)[3], 0, "green ribbon");
  assert.equal(pixelAt(titleResult, layer, 50, 21)[3], 0, "ribbon border at the box edge");
});

test("isolateSliceLayers reports how much of each layer was rebuilt under layers in front", () => {
  const { source, layers } = createScene();
  const [pill, coin, badge] = isolateSliceLayers(source, WIDTH, HEIGHT, layers);
  assert.ok(coin.rebuiltRatio > 0.05 && coin.rebuiltRatio < 0.3, `coin rebuilt ${coin.rebuiltRatio}`);
  // The rebuilt part of the coin lies where the badge covers it.
  assert.ok(coin.rebuiltRegion.x >= 34 && coin.rebuiltRegion.y >= 34);
  assert.ok(pill.rebuiltRatio > coin.rebuiltRatio);
  assert.equal(badge.rebuiltRatio, 0);
  assert.equal(badge.rebuiltRegion, null);
});

function paintScene(paint) {
  const source = new Uint8ClampedArray(WIDTH * HEIGHT * 4);
  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) source.set([...paint(x, y), 255], (y * WIDTH + x) * 4);
  }
  return source;
}

test("isolateSliceLayers clears the button color inside a letter hole of a label", () => {
  const WHITE = [255, 255, 255];
  const button = { x: 10, y: 20, width: 100, height: 60 };
  const label = { x: 40, y: 35, width: 40, height: 30 };
  // A white "O" with a dark outline whose hole shows the green button.
  const source = paintScene((x, y) => {
    if (x < button.x || x >= button.x + button.width || y < button.y || y >= button.y + button.height) return DARK;
    const r = Math.hypot(x + 0.5 - 60, y + 0.5 - 50);
    if (r < 5) return GREEN;
    if (r < 10) return WHITE;
    if (r < 12) return DARK;
    return GREEN;
  });
  const layers = [
    { placement: button, shape: "free", kind: "button" },
    { placement: label, shape: "free", kind: "text" }
  ];
  const [, result] = isolateSliceLayers(source, WIDTH, HEIGHT, layers);
  assert.equal(pixelAt(result, layers[1], 60, 50)[3], 0, "hole");
  assert.equal(pixelAt(result, layers[1], 67, 50)[3], 255, "letter");
  assert.equal(pixelAt(result, layers[1], 71, 50)[3], 255, "outline");
});

test("isolateSliceLayers keeps a panel's inset that is only slightly darker than the panel behind it", () => {
  const FRAME = [206, 227, 254];
  const INSET = [182, 208, 250];
  const frame = { x: 5, y: 5, width: 110, height: 90 };
  const inset = { x: 20, y: 20, width: 80, height: 50 };
  const source = paintScene((x, y) => {
    const inFrame = x >= frame.x && x < frame.x + frame.width && y >= frame.y && y < frame.y + frame.height;
    const inInset = x >= inset.x && x < inset.x + inset.width && y >= inset.y && y < inset.y + inset.height;
    return inInset ? INSET : inFrame ? FRAME : DARK;
  });
  const layers = [
    { placement: frame, shape: "free", kind: "panel" },
    { placement: inset, shape: "free", kind: "panel" }
  ];
  const [, result] = isolateSliceLayers(source, WIDTH, HEIGHT, layers);
  assert.equal(pixelAt(result, layers[1], 22, 22)[3], 255, "inset corner");
  assert.equal(pixelAt(result, layers[1], 60, 45)[3], 255, "inset center");
});

test("isolateSliceLayers clears a round button's rim from an icon box centred on it", () => {
  const WHITE = [255, 255, 255];
  const RIM = [200, 220, 255];
  const button = { x: 20, y: 10, width: 80, height: 80 };
  const icon = { x: 30, y: 12, width: 60, height: 60 };
  const source = paintScene((x, y) => {
    const r = Math.hypot((x + 0.5 - 60) / 40, (y + 0.5 - 50) / 40);
    if (r > 1) return DARK;
    if (r > 0.88) return RIM;
    if (Math.abs(x + 0.5 - 60) < 10 && Math.abs(y + 0.5 - 45) < 15) return WHITE;
    return BLUE;
  });
  const layers = [
    { placement: button, shape: "ellipse", kind: "button" },
    { placement: icon, shape: "free", kind: "icon" }
  ];
  const [, result] = isolateSliceLayers(source, WIDTH, HEIGHT, layers);
  assert.equal(pixelAt(result, layers[1], 60, 13)[3], 0, "rim at the top of the icon box");
  assert.equal(pixelAt(result, layers[1], 60, 45)[3], 255, "icon");
});
