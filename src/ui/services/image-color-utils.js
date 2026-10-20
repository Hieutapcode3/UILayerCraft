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

  // Alpha of a pixel blended between the background and the strongest nearby foreground color.
  function estimateFringeAlpha(pixel) {
    const x0 = pixel % width;
    const y0 = Math.floor(pixel / width);
    let best = null;
    let bestDistance = softThreshold;
    for (let y = Math.max(0, y0 - 2); y <= Math.min(height - 1, y0 + 2); y += 1) {
      for (let x = Math.max(0, x0 - 2); x <= Math.min(width - 1, x0 + 2); x += 1) {
        const other = y * width + x;
        if (state[other] === 1) continue;
        const distance = distanceAt(other);
        if (distance > bestDistance) {
          bestDistance = distance;
          best = other;
        }
      }
    }
    const own = distanceAt(pixel);
    if (best === null) {
      return Math.min(1, Math.max(0, (own - hardThreshold) / (softThreshold - hardThreshold)));
    }
    const index = pixel * 4;
    const fIndex = best * 4;
    const fr = original[fIndex] - background.r;
    const fg = original[fIndex + 1] - background.g;
    const fb = original[fIndex + 2] - background.b;
    const dot = (original[index] - background.r) * fr
      + (original[index + 1] - background.g) * fg
      + (original[index + 2] - background.b) * fb;
    return Math.min(1, Math.max(0, dot / (bestDistance * bestDistance)));
  }
}

if (typeof module !== "undefined") {
  module.exports = {
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
  };
}
