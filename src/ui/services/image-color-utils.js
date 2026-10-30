const imageColorClampNumber = typeof require === "function" ? require("./app-utils").clampNumber : clampNumber;

function toRgb(color) {
  return `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}`;
}

function mixColors(a, b, weight = 0.5) {
  const amount = imageColorClampNumber(weight, 0, 1, 0.5);
  const inverse = 1 - amount;
  const color = {
    r: a.r * inverse + b.r * amount,
    g: a.g * inverse + b.g * amount,
    b: a.b * inverse + b.b * amount,
    luma: 0
  };
  color.luma = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
  return color;
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((value) => imageColorClampNumber(value, 0, 255, 0).toString(16).padStart(2, "0")).join("")}`;
}

function sampleEdgeStats(pixels, width, height) {
  const sideSamples = {
    top: [],
    right: [],
    bottom: [],
    left: []
  };
  const step = Math.max(1, Math.floor(Math.min(width, height) / 18));
  for (let x = 0; x < width; x += step) {
    sideSamples.top.push(getPixelColor(pixels, width, x, 0));
    sideSamples.bottom.push(getPixelColor(pixels, width, x, height - 1));
  }
  for (let y = 0; y < height; y += step) {
    sideSamples.left.push(getPixelColor(pixels, width, 0, y));
    sideSamples.right.push(getPixelColor(pixels, width, width - 1, y));
  }
  const samples = [
    ...sideSamples.top,
    ...sideSamples.right,
    ...sideSamples.bottom,
    ...sideSamples.left
  ].sort((a, b) => a.luma - b.luma);
  const start = Math.floor(samples.length * 0.2);
  const end = Math.max(start + 1, Math.ceil(samples.length * 0.8));
  const middleSamples = samples.slice(start, end);
  const color = averageColors(middleSamples);
  const variance = middleSamples.reduce((sum, sample) => {
    const distance = colorDistance(sample.r, sample.g, sample.b, color.r, color.g, color.b);
    return sum + distance * distance;
  }, 0) / middleSamples.length;
  return {
    color,
    variance,
    sides: {
      top: averageColors(sideSamples.top, color),
      right: averageColors(sideSamples.right, color),
      bottom: averageColors(sideSamples.bottom, color),
      left: averageColors(sideSamples.left, color)
    }
  };
}

function averageColors(samples, fallback = { r: 244, g: 246, b: 250, luma: 246 }) {
  if (!samples.length) {
    return fallback;
  }
  const total = samples.reduce(
    (sum, color) => ({
      r: sum.r + color.r,
      g: sum.g + color.g,
      b: sum.b + color.b
    }),
    { r: 0, g: 0, b: 0 }
  );
  const color = {
    r: total.r / samples.length,
    g: total.g / samples.length,
    b: total.b / samples.length,
    luma: 0
  };
  color.luma = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
  return color;
}

function averageBackgroundColors(samples, fallback = { r: 244, g: 246, b: 250, luma: 246 }) {
  if (!samples.length) {
    return fallback;
  }
  const bySaturation = [...samples].sort((a, b) => a.saturation - b.saturation);
  const lowSaturationCount = Math.max(6, Math.ceil(bySaturation.length * 0.68));
  const backgroundCandidates = bySaturation.slice(0, lowSaturationCount).sort((a, b) => a.luma - b.luma);
  const start = Math.floor(backgroundCandidates.length * 0.12);
  const end = Math.max(start + 1, Math.ceil(backgroundCandidates.length * 0.88));
  return averageColors(backgroundCandidates.slice(start, end), fallback);
}

function sampleEdgeColor(pixels, width, height) {
  return sampleEdgeStats(pixels, width, height).color;
}

function getPixelColor(pixels, width, x, y) {
  const index = (y * width + x) * 4;
  const r = pixels[index];
  const g = pixels[index + 1];
  const b = pixels[index + 2];
  return {
    r,
    g,
    b,
    luma: 0.2126 * r + 0.7152 * g + 0.0722 * b,
    saturation: Math.max(r, g, b) - Math.min(r, g, b)
  };
}

function colorDistance(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

// Averaging edge pixels gives a muddy color when the subject touches the slice edge,
// so group edge pixels by color and prefer the group that owns the corners.
function pickEdgeBackgroundColor(pixels, width, height, tolerance = 34) {
  const clusters = [];
  const corners = new Set([0, width - 1, (height - 1) * width, height * width - 1]);
  const addPixel = (pixel) => {
    const r = pixels[pixel * 4];
    const g = pixels[pixel * 4 + 1];
    const b = pixels[pixel * 4 + 2];
    let cluster = clusters.find((item) => colorDistance(r, g, b, item.r, item.g, item.b) <= tolerance);
    if (!cluster) {
      cluster = { r, g, b, count: 0, corners: 0, sum: { r: 0, g: 0, b: 0 } };
      clusters.push(cluster);
    }
    cluster.count += 1;
    if (corners.has(pixel)) cluster.corners += 1;
    cluster.sum.r += r;
    cluster.sum.g += g;
    cluster.sum.b += b;
  };
  for (let x = 0; x < width; x += 1) {
    addPixel(x);
    if (height > 1) addPixel((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    addPixel(y * width);
    if (width > 1) addPixel(y * width + width - 1);
  }
  const best = clusters.reduce((winner, item) => (
    !winner || item.corners > winner.corners || (item.corners === winner.corners && item.count > winner.count)
      ? item
      : winner
  ), null);
  return {
    r: best.sum.r / best.count,
    g: best.sum.g / best.count,
    b: best.sum.b / best.count
  };
}

// Clears the background connected to the slice edges (in place) and un-mixes the anti-aliased fringe
// so no halo of the old background color is left around the subject.
function removeEdgeBackgroundPixels(pixels, width, height, { hardThreshold = 34, softThreshold = 82, fringeRings = 3 } = {}) {
  const background = pickEdgeBackgroundColor(pixels, width, height, hardThreshold);
  const original = Uint8ClampedArray.from(pixels);
  const total = width * height;
  const distanceAt = (pixel) => colorDistance(
    original[pixel * 4], original[pixel * 4 + 1], original[pixel * 4 + 2],
    background.r, background.g, background.b
  );
  const neighbors = (pixel, visit) => {
    const x = pixel % width;
    if (x > 0) visit(pixel - 1);
    if (x < width - 1) visit(pixel + 1);
    if (pixel >= width) visit(pixel - width);
    if (pixel < total - width) visit(pixel + width);
  };

  // 1 = cleared background, 2 = fringe already processed.
  const state = new Uint8Array(total);
  const queued = new Uint8Array(total);
  const queue = new Int32Array(total);
  let ring = [];
  let head = 0;
  let tail = 0;
  const seed = (pixel) => {
    if (queued[pixel]) return;
    const distance = distanceAt(pixel);
    if (distance >= softThreshold) return;
    queued[pixel] = 1;
    if (distance <= hardThreshold) queue[tail++] = pixel;
    else ring.push(pixel);
  };
  for (let x = 0; x < width; x += 1) {
    seed(x);
    seed(total - width + x);
  }
  for (let y = 0; y < height; y += 1) {
    seed(y * width);
    seed(y * width + width - 1);
  }
  while (head < tail) {
    const pixel = queue[head++];
    state[pixel] = 1;
    pixels[pixel * 4 + 3] = 0;
    neighbors(pixel, seed);
  }
  // Opaque pixels touching the cleared area are the first fringe ring too.
  for (let pixel = 0; pixel < total; pixel += 1) {
    if (state[pixel] !== 1) continue;
    neighbors(pixel, (next) => {
      if (!state[next] && !queued[next]) {
        queued[next] = 1;
        ring.push(next);
      }
    });
  }

  for (let step = 0; step < fringeRings && ring.length; step += 1) {
    const nextRing = [];
    for (const pixel of ring) {
      if (state[pixel]) continue;
      state[pixel] = 2;
      const alpha = estimateFringeAlpha(pixel);
      const index = pixel * 4;
      if (alpha <= 0.02) {
        pixels[index + 3] = 0;
      } else if (alpha < 0.98) {
        for (let channel = 0; channel < 3; channel += 1) {
          const base = [background.r, background.g, background.b][channel];
          pixels[index + channel] = base + (original[index + channel] - base) / alpha;
        }
        pixels[index + 3] = Math.round(original[index + 3] * alpha);
      }
      if (alpha < 0.95) {
        neighbors(pixel, (next) => {
          if (!state[next] && !queued[next]) {
            queued[next] = 1;
            nextRing.push(next);
          }
        });
      }
    }
    ring = nextRing;
  }
  return background;

  // Alpha of a pixel blended between the background and the nearby foreground color that explains it best.
  // A pixel no blend explains (e.g. a dark outline between a green ribbon and cream text) is its own color.
  function estimateFringeAlpha(pixel) {
    const x0 = pixel % width;
    const y0 = Math.floor(pixel / width);
    const index = pixel * 4;
    const pr = original[index] - background.r;
    const pg = original[index + 1] - background.g;
    const pb = original[index + 2] - background.b;
    const own = Math.sqrt(pr * pr + pg * pg + pb * pb);
    let bestAlpha = null;
    let bestResidual = hardThreshold;
    for (let y = Math.max(0, y0 - 2); y <= Math.min(height - 1, y0 + 2); y += 1) {
      for (let x = Math.max(0, x0 - 2); x <= Math.min(width - 1, x0 + 2); x += 1) {
        const other = y * width + x;
        if (state[other] === 1) continue;
        const distance = distanceAt(other);
        if (distance < softThreshold || distance <= own) continue;
        const fIndex = other * 4;
        const fr = original[fIndex] - background.r;
        const fg = original[fIndex + 1] - background.g;
        const fb = original[fIndex + 2] - background.b;
        const alpha = Math.min(1, Math.max(0, (pr * fr + pg * fg + pb * fb) / (distance * distance)));
        const residual = colorDistance(pr, pg, pb, fr * alpha, fg * alpha, fb * alpha);
        if (residual <= bestResidual) {
          bestResidual = residual;
          bestAlpha = alpha;
        }
      }
    }
    if (bestAlpha !== null) return bestAlpha;
    return Math.min(1, Math.max(0, (own - hardThreshold) / (softThreshold - hardThreshold)));
  }
}

// Heuristic blur check for a (small) RGBA slice: soft edges have a gradient but a weak Laplacian next to it,
// while crisp edges and smooth gradient fills do not. Callers shrink big slices to about 160 px first.
function measureSharpness(pixels, width, height, { minPixels = 64, minEdgeGradient = 12, blurRatio = 0.35 } = {}) {
  const luma = new Float32Array(width * height);
  const opaque = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i += 1) {
    const o = i * 4;
    opaque[i] = pixels[o + 3] >= 200 ? 1 : 0;
    luma[i] = 0.299 * pixels[o] + 0.587 * pixels[o + 1] + 0.114 * pixels[o + 2];
  }
  const lapHist = new Uint32Array(256);
  const gradHist = new Uint32Array(256);
  let count = 0;
  let sum = 0;
  let sumSquares = 0;
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const i = y * width + x;
      if (!opaque[i] || !opaque[i - 1] || !opaque[i + 1] || !opaque[i - width] || !opaque[i + width]) continue;
      const lap = Math.abs(4 * luma[i] - luma[i - 1] - luma[i + 1] - luma[i - width] - luma[i + width]);
      const gx = (luma[i + 1] - luma[i - 1]) / 2;
      const gy = (luma[i + width] - luma[i - width]) / 2;
      lapHist[Math.min(255, Math.round(lap))] += 1;
      gradHist[Math.min(255, Math.round(Math.hypot(gx, gy)))] += 1;
      count += 1;
      sum += luma[i];
      sumSquares += luma[i] * luma[i];
    }
  }
  if (count < minPixels) return { count, detail: 0, edgeGradient: 0, edgeLaplacian: 0, blurry: false };
  const percentile = (hist, share) => {
    let seen = 0;
    for (let value = 0; value < 256; value += 1) {
      seen += hist[value];
      if (seen >= count * share) return value;
    }
    return 255;
  };
  const mean = sum / count;
  const detail = Math.sqrt(Math.max(0, sumSquares / count - mean * mean));
  const edgeGradient = percentile(gradHist, 0.995);
  const edgeLaplacian = percentile(lapHist, 0.995);
  return {
    count,
    detail,
    edgeGradient,
    edgeLaplacian,
    blurry: edgeGradient >= minEdgeGradient && edgeLaplacian / edgeGradient < blurRatio
  };
}

// Hand-off check an artist would do before giving a slice to a developer (Figma, then Unity): enough resolution,
// no stray specks or haze, no halo of the old background, not cut off by the slice box. `scale` is the slice's pixel
// width divided by its on-screen width (4 after an AI upscale). Returns { status: "ready" | "check" | "fix", issues }.
// `outsideColors` ([r, g, b] seen around the slice in the original image) find edges made of leftover background.
// Small elements (short side under `smallSide` on screen) need `minScale` times their size in pixels to stay crisp.
// `recreated` (drawn by the model on a key color and fitted to the box): no old background can be left and the
// content touches the box by design, so those two checks are skipped.
function assessSliceHandoff(pixels, width, height, { scale = 1, minScale = 2, smallSide = 160, screenShortSide = Infinity, blurry = false, outsideColors = [], recreated = false } = {}) {
  const issues = [];
  const add = (code, severity, message) => issues.push({ code, severity, message });
  const total = width * height;
  const label = new Int32Array(total).fill(-1);
  const sizes = [];
  const stack = [];
  let partial = 0;
  let visible = 0;
  for (let start = 0; start < total; start += 1) {
    const alpha = pixels[start * 4 + 3];
    if (alpha > 0) visible += 1;
    if (alpha > 16 && alpha < 240) partial += 1;
    if (label[start] !== -1 || alpha < 32) continue;
    const id = sizes.length;
    let size = 0;
    label[start] = id;
    stack.push(start);
    while (stack.length) {
      const index = stack.pop();
      size += 1;
      const x = index % width;
      const y = (index - x) / width;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const next = ny * width + nx;
          if (label[next] !== -1 || pixels[next * 4 + 3] < 32) continue;
          label[next] = id;
          stack.push(next);
        }
      }
    }
    sizes.push(size);
  }
  if (!sizes.length) {
    add("empty", "fix", "Nothing visible in the slice");
    return { status: "fix", issues };
  }
  if (scale < minScale && screenShortSide < smallSide) {
    add("low-resolution", "fix", `Only ${Math.round(scale * 10) / 10}x resolution; a small element this size looks rough in Unity (needs ${minScale}x or more)`);
  }
  if (blurry) add("blurry", "fix", "Soft or blurry edges");
  const largest = Math.max(...sizes);
  const specks = sizes.filter((size) => size < Math.max(6, largest * 0.004)).length;
  if (specks > 0) add("specks", "fix", `${specks} stray speck${specks > 1 ? "s" : ""} around the asset`);
  if (visible > 0 && partial / visible > 0.3) add("haze", "check", "Many semi-transparent pixels: edges look dirty or hazy");

  // Halo: outer edge pixels much lighter than the pixel two steps inside (a rim of the old light background).
  let edgePixels = 0;
  let lightEdges = 0;
  let backgroundEdges = 0;
  const looksLikeOutside = (index) => outsideColors.some(([r, g, b]) => colorDistance(pixels[index * 4], pixels[index * 4 + 1], pixels[index * 4 + 2], r, g, b) < 36);
  const luma = (index) => 0.299 * pixels[index * 4] + 0.587 * pixels[index * 4 + 1] + 0.114 * pixels[index * 4 + 2];
  const opaque = (x, y) => x >= 0 && y >= 0 && x < width && y < height && pixels[(y * width + x) * 4 + 3] >= 128;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!opaque(x, y)) continue;
      const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => !opaque(x + dx, y + dy));
      if (!directions.length) continue;
      edgePixels += 1;
      if (outsideColors.length && looksLikeOutside(y * width + x)) backgroundEdges += 1;
      const [dx, dy] = directions[0];
      const ix = x - dx * 2;
      const iy = y - dy * 2;
      if (opaque(ix, iy) && luma(y * width + x) - luma(iy * width + ix) > 70) lightEdges += 1;
    }
  }
  if (!recreated && edgePixels >= 20 && backgroundEdges / edgePixels > 0.2) add("leftover-background", "fix", "Edges still carry the background color from around the slice");
  if (edgePixels >= 20 && lightEdges / edgePixels > 0.25) add("halo", "check", "Light halo around the edges (may be leftover background, or a real light outline)");

  // Cut off: long runs of opaque pixels on the slice border.
  const sides = [
    [width, (i) => [i, 0]], [width, (i) => [i, height - 1]], [height, (i) => [0, i]], [height, (i) => [width - 1, i]]
  ].filter(([length, at]) => {
    let run = 0;
    for (let i = 0; i < length; i += 1) if (opaque(...at(i))) run += 1;
    return run / length > 0.35;
  }).length;
  if (!recreated && sides >= 2) add("edge-cut", "check", "Touches the slice border on several sides; it may be cut off");

  const status = issues.some((issue) => issue.severity === "fix") ? "fix" : issues.length ? "check" : "ready";
  return { status, issues };
}

if (typeof module !== "undefined") {
  module.exports = {
    assessSliceHandoff,
    averageBackgroundColors,
    averageColors,
    colorDistance,
    getPixelColor,
    measureSharpness,
    mixColors,
    pickEdgeBackgroundColor,
    removeEdgeBackgroundPixels,
    rgbToHex,
    sampleEdgeColor,
    sampleEdgeStats,
    toRgb
  };
}
