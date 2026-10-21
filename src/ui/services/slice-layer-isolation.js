const {
  colorDistance: layerIsolationColorDistance,
  pickEdgeBackgroundColor: layerIsolationPickEdgeColor,
  removeEdgeBackgroundPixels: layerIsolationRemoveEdgeBackground
} = typeof require === "function" ? require("./image-color-utils") : {
  colorDistance,
  pickEdgeBackgroundColor,
  removeEdgeBackgroundPixels
};

// Color tolerance around a background color: dark colors (a dimmed scene behind a popup) differ by less,
// so the same distance that separates bright colors would swallow dark elements.
function backgroundTolerance(color, tolerance = 34) {
  const luma = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
  return tolerance * Math.min(1, Math.max(0.5, (luma + 20) / 110));
}

// Separates overlapping AI slices. `layers` are { placement, shape, kind } in paint order (back to front).
// Layers are processed front to back: what the layers in front cover is inpainted from the layer's own pixels,
// then the screen background and the layers behind it are cleared, and round shapes get a soft mask.

// Coverage (0..1) of a layer's shape at a source pixel; free shapes cover their whole box. `inset` shrinks the shape.
function sliceShapeCoverage(layer, x, y, inset = 0) {
  const left = layer.placement.x + inset;
  const top = layer.placement.y + inset;
  const width = layer.placement.width - inset * 2;
  const height = layer.placement.height - inset * 2;
  const px = x + 0.5 - left;
  const py = y + 0.5 - top;
  if (width <= 0 || height <= 0 || px < 0 || py < 0 || px > width || py > height) return 0;
  if (layer.shape === "ellipse") {
    const rx = width / 2;
    const ry = height / 2;
    const distance = Math.hypot((px - rx) / rx, (py - ry) / ry);
    // About one pixel of anti-aliasing on the edge.
    return Math.min(1, Math.max(0, (1 - distance) * Math.min(rx, ry) + 0.5));
  }
  if (layer.shape === "capsule") {
    const radius = Math.min(width, height) / 2;
    const cx = Math.min(Math.max(px, radius), width - radius);
    const cy = Math.min(Math.max(py, radius), height - radius);
    return Math.min(1, Math.max(0, radius - Math.hypot(px - cx, py - cy) + 0.5));
  }
  return 1;
}

function boxesIntersect(a, b) {
  return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
}

function cropSourcePixels(source, sourceWidth, { x: left, y: top, width, height }) {
  const pixels = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    const from = ((top + y) * sourceWidth + left) * 4;
    pixels.set(source.subarray(from, from + width * 4), y * width * 4);
  }
  return pixels;
}

// Fills pixels with state 1 from known pixels (state 0) in premultiplied RGBA, so a hidden part can also
// resolve to transparent background; state 2 is neither used nor filled. Holes spanned by known pixels on both
// sides of a row or column are interpolated (the shorter gap weighing more), so borders and bars continue
// straight through; the rest is filled from neighbors one ring at a time.
function inpaintUnknownPixels(pixels, width, height, state) {
  const premultiplied = (pixel, channel) => (
    channel === 3 ? pixels[pixel * 4 + 3] : pixels[pixel * 4 + channel] * pixels[pixel * 4 + 3] / 255
  );
  const write = (pixel, values, total) => {
    const alpha = values[3] / total;
    for (let channel = 0; channel < 3; channel += 1) {
      pixels[pixel * 4 + channel] = alpha > 0 ? (values[channel] / total) * 255 / alpha : 0;
    }
    // A hidden part is either the layer or background; half-transparent fill reads as a smudge.
    pixels[pixel * 4 + 3] = alpha >= 128 ? 255 : 0;
    state[pixel] = 0;
  };
  const sums = new Float32Array(width * height * 5);
  const addSpans = (count, length, indexAt) => {
    for (let line = 0; line < count; line += 1) {
      let from = -1;
      for (let to = 0; to < length; to += 1) {
        if (state[indexAt(line, to)] !== 0) continue;
        const gap = to - from - 1;
        if (from >= 0 && gap > 0) {
          for (let hole = from + 1; hole < to; hole += 1) {
            const target = indexAt(line, hole);
            if (state[target] !== 1) continue;
            const amount = (hole - from) / (to - from);
            for (let channel = 0; channel < 4; channel += 1) {
              const start = premultiplied(indexAt(line, from), channel);
              const value = start + (premultiplied(indexAt(line, to), channel) - start) * amount;
              sums[target * 5 + channel] += value / gap;
            }
            sums[target * 5 + 4] += 1 / gap;
          }
        }
        from = to;
      }
    }
  };
  addSpans(height, width, (y, x) => y * width + x);
  addSpans(width, height, (x, y) => y * width + x);
  for (let pixel = 0; pixel < state.length; pixel += 1) {
    if (state[pixel] === 1 && sums[pixel * 5 + 4]) write(pixel, sums.subarray(pixel * 5, pixel * 5 + 4), sums[pixel * 5 + 4]);
  }
  for (;;) {
    const filled = [];
    for (let pixel = 0; pixel < state.length; pixel += 1) {
      if (state[pixel] !== 1) continue;
      const x = pixel % width;
      const y = (pixel - x) / width;
      const values = [0, 0, 0, 0];
      let count = 0;
      for (let ny = Math.max(0, y - 1); ny <= Math.min(height - 1, y + 1); ny += 1) {
        for (let nx = Math.max(0, x - 1); nx <= Math.min(width - 1, x + 1); nx += 1) {
          const neighbor = ny * width + nx;
          if (state[neighbor] !== 0) continue;
          for (let channel = 0; channel < 4; channel += 1) values[channel] += premultiplied(neighbor, channel);
          count += 1;
        }
      }
      if (count) filled.push([pixel, values, count]);
    }
    if (filled.length === 0) return;
    for (const [pixel, values, count] of filled) write(pixel, values, count);
  }
}

// Game UI elements are mostly left/right symmetric and round ones are built from rings, so a hidden pixel first
// copies its mirror image across the vertical axis, then (for ellipses) the nearest visible pixel on its ring.
function fillHiddenFromSymmetry(pixels, width, height, state, shape) {
  const copy = (pixel, from) => {
    pixels.set(pixels.subarray(from * 4, from * 4 + 4), pixel * 4);
    state[pixel] = 0;
  };
  const hidden = [];
  for (let pixel = 0; pixel < state.length; pixel += 1) if (state[pixel] === 1) hidden.push(pixel);
  const ringHidden = [];
  for (const pixel of hidden) {
    const x = pixel % width;
    const mirror = pixel - x + (width - 1 - x);
    if (state[mirror] === 0) copy(pixel, mirror);
    else if (shape === "ellipse") ringHidden.push(pixel);
  }
  const rx = width / 2;
  const ry = height / 2;
  const step = Math.PI / 180;
  for (const pixel of ringHidden) {
    if (state[pixel] !== 1) continue;
    const x = pixel % width;
    const u = (x + 0.5 - rx) / rx;
    const v = ((pixel - x) / width + 0.5 - ry) / ry;
    const radius = Math.hypot(u, v);
    const angle = Math.atan2(v, u);
    for (let turn = 1; turn <= 180; turn += 1) {
      const found = [angle + turn * step, angle - turn * step].map((candidate) => {
        const sx = Math.floor(rx + Math.cos(candidate) * radius * rx);
        const sy = Math.floor(ry + Math.sin(candidate) * radius * ry);
        return sx >= 0 && sy >= 0 && sx < width && sy < height && state[sy * width + sx] === 0 ? sy * width + sx : -1;
      }).find((from) => from >= 0);
      if (found !== undefined) {
        copy(pixel, found);
        break;
      }
    }
  }
}

// Colors seen just outside the box that are not covered by layers in front: the background and the layers behind.
function collectOutsideColors(source, sourceWidth, sourceHeight, placement, covered, ignored, band = 3, tolerance = 34) {
  const clusters = [];
  let total = 0;
  const add = (x, y) => {
    if (x < 0 || y < 0 || x >= sourceWidth || y >= sourceHeight) return;
    const pixel = y * sourceWidth + x;
    if (covered[pixel] || ignored(x, y)) return;
    const r = source[pixel * 4];
    const g = source[pixel * 4 + 1];
    const b = source[pixel * 4 + 2];
    total += 1;
    const cluster = clusters.find((item) => layerIsolationColorDistance(r, g, b, item.r, item.g, item.b) <= tolerance);
    if (!cluster) {
      clusters.push({ r, g, b, count: 1, sum: [r, g, b] });
      return;
    }
    // Keep the cluster at its mean color, not at the first pixel that started it.
    cluster.count += 1;
    cluster.sum[0] += r;
    cluster.sum[1] += g;
    cluster.sum[2] += b;
    cluster.r = cluster.sum[0] / cluster.count;
    cluster.g = cluster.sum[1] / cluster.count;
    cluster.b = cluster.sum[2] / cluster.count;
  };
  const { x: left, y: top, width, height } = placement;
  for (let offset = 1; offset <= band; offset += 1) {
    for (let x = left - offset; x < left + width + offset; x += 1) {
      add(x, top - offset);
      add(x, top + height - 1 + offset);
    }
    for (let y = top - offset + 1; y < top + height + offset - 1; y += 1) {
      add(left - offset, y);
      add(left + width - 1 + offset, y);
    }
  }
  return clusters.filter((cluster) => cluster.count >= total * 0.05);
}

// Color just outside the box at each row (left, right) and column (top, bottom), or null where covered or off-screen,
// so a gradient background is matched by the color it has at that height or column.
function collectLineOutsideColors(source, sourceWidth, sourceHeight, placement, covered, ignored, offset = 2) {
  const at = (x, y) => {
    if (x < 0 || y < 0 || x >= sourceWidth || y >= sourceHeight || covered[y * sourceWidth + x] || ignored(x, y)) return null;
    const index = (y * sourceWidth + x) * 4;
    return { r: source[index], g: source[index + 1], b: source[index + 2] };
  };
  const { x: left, y: top, width, height } = placement;
  return {
    rows: Array.from({ length: height }, (_, y) => [at(left - offset, top + y), at(left + width - 1 + offset, top + y)]),
    columns: Array.from({ length: width }, (_, x) => [at(left + x, top - offset), at(left + x, top + height - 1 + offset)])
  };
}

// Clears pixels connected to the crop edges whose original color (`crop`, before earlier passes un-mixed fringes)
// matches one of `colors` or the outside color on their own row or column (`lineColors`), except protected ones.
// Pixels hidden by layers in front (`state` 1) are rebuilt later, so the fill also starts from them and passes
// through them: background seen around a front layer is reached too. Elsewhere the fill only steps between similar
// colors, starting from an edge pixel only where its color goes on well outside the box (`farLineColors`): a text
// outline cut by the box edge, or one that shares the color of a ribbon border behind it, is not background.
function clearEdgeConnectedColors(pixels, crop, width, height, colors, lineColors, farLineColors, protect, state, tolerance = 34) {
  const total = width * height;
  const seen = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;
  const cropColor = (pixel) => ({ r: crop[pixel * 4], g: crop[pixel * 4 + 1], b: crop[pixel * 4 + 2] });
  // `previous` is the color the fill comes from; null (hidden pixels, edges off-screen or covered) allows any,
  // false allows only pixels that are already transparent or hidden.
  const visit = (pixel, previous) => {
    if (seen[pixel] || protect[pixel]) return;
    const index = pixel * 4;
    const x = pixel % width;
    const matches = (color) => color && layerIsolationColorDistance(
      crop[index], crop[index + 1], crop[index + 2], color.r, color.g, color.b
    ) <= backgroundTolerance(color, tolerance);
    const clear = pixels[index + 3] === 0
      || state[pixel] === 1
      || (previous !== false && (!previous || matches(previous)) && (
        colors.some(matches)
        || lineColors.rows[(pixel - x) / width].some(matches)
        || lineColors.columns[x].some(matches)
      ));
    // Not marked seen when blocked: a pixel of the same color, or another edge, may still reach it.
    if (!clear) return;
    seen[pixel] = 1;
    pixels[index + 3] = 0;
    queue[tail++] = pixel;
  };
  const edge = (near, far) => (
    !near || !far || layerIsolationColorDistance(near.r, near.g, near.b, far.r, far.g, far.b) <= backgroundTolerance(near, tolerance)
      ? near
      : false
  );
  for (let x = 0; x < width; x += 1) {
    visit(x, edge(lineColors.columns[x][0], farLineColors.columns[x][0]));
    visit(total - width + x, edge(lineColors.columns[x][1], farLineColors.columns[x][1]));
  }
  for (let y = 0; y < height; y += 1) {
    visit(y * width, edge(lineColors.rows[y][0], farLineColors.rows[y][0]));
    visit(y * width + width - 1, edge(lineColors.rows[y][1], farLineColors.rows[y][1]));
  }
  for (let pixel = 0; pixel < total; pixel += 1) if (state[pixel] === 1) visit(pixel, null);
  while (head < tail) {
    const pixel = queue[head++];
    const x = pixel % width;
    const previous = state[pixel] === 1 ? null : cropColor(pixel);
    if (x > 0) visit(pixel - 1, previous);
    if (x < width - 1) visit(pixel + 1, previous);
    if (pixel >= width) visit(pixel - width, previous);
    if (pixel < total - width) visit(pixel + width, previous);
  }
}

// Clears visible islands smaller than 1% of the largest one: leftovers of the background (a dim tile number,
// specks of a shadow) rather than parts of the layer. Text is skipped because its glyphs are islands.
function clearSmallIslands(pixels, width, height) {
  const total = width * height;
  const label = new Int32Array(total).fill(-1);
  const sizes = [];
  const queue = new Int32Array(total);
  for (let start = 0; start < total; start += 1) {
    if (label[start] >= 0 || pixels[start * 4 + 3] === 0) continue;
    const id = sizes.length;
    let head = 0;
    let tail = 0;
    label[start] = id;
    queue[tail++] = start;
    while (head < tail) {
      const pixel = queue[head++];
      const x = pixel % width;
      for (const next of [x > 0 ? pixel - 1 : -1, x < width - 1 ? pixel + 1 : -1, pixel - width, pixel + width]) {
        if (next < 0 || next >= total || label[next] >= 0 || pixels[next * 4 + 3] === 0) continue;
        label[next] = id;
        queue[tail++] = next;
      }
    }
    sizes.push(tail);
  }
  const minimum = Math.max(...sizes, 0) * 0.01;
  for (let pixel = 0; pixel < total; pixel += 1) {
    if (label[pixel] >= 0 && sizes[label[pixel]] < minimum) pixels[pixel * 4 + 3] = 0;
  }
}

// Returns, per layer, the opaque crop with front layers inpainted out (`opaque`), the transparent result (`pixels`)
// and whether nothing but background is left (`backgroundOnly`).
function isolateSliceLayers(source, sourceWidth, sourceHeight, layers) {
  const covered = new Uint8Array(sourceWidth * sourceHeight);
  const results = new Array(layers.length);
  for (let index = layers.length - 1; index >= 0; index -= 1) {
    const layer = layers[index];
    const { x: left, y: top, width, height } = layer.placement;
    const crop = cropSourcePixels(source, sourceWidth, layer.placement);
    const round = layer.shape === "ellipse" || layer.shape === "capsule";
    // 0 = known, 1 = covered by a layer in front (dilated by 2px), 2 = outside the shape.
    const state = new Uint8Array(width * height);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (round && sliceShapeCoverage(layer, left + x, top + y) < 0.5) {
          state[y * width + x] = 2;
          continue;
        }
        search: for (let sy = Math.max(0, top + y - 2); sy <= Math.min(sourceHeight - 1, top + y + 2); sy += 1) {
          for (let sx = Math.max(0, left + x - 2); sx <= Math.min(sourceWidth - 1, left + x + 2); sx += 1) {
            if (covered[sy * sourceWidth + sx]) {
              state[y * width + x] = 1;
              break search;
            }
          }
        }
      }
    }
    // The opaque version (used when transparency is turned off) has the hidden parts filled with color only.
    const opaque = Uint8ClampedArray.from(crop);
    const opaqueState = Uint8Array.from(state);
    fillHiddenFromSymmetry(opaque, width, height, opaqueState, layer.shape);
    inpaintUnknownPixels(opaque, width, height, opaqueState);

    const pixels = Uint8ClampedArray.from(crop);
    // The core of a round shape is never background, even when its colors are close to it.
    const protect = new Uint8Array(width * height);
    if (round) {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          if (sliceShapeCoverage(layer, left + x, top + y, 4) >= 1) protect[y * width + x] = 1;
        }
      }
    }
    // A layer behind that only sits next to this one (a neighbouring tile of the same color) is not its background.
    const neighbours = layers.slice(0, index)
      .map((other) => other.placement)
      .filter((box) => !boxesIntersect(box, layer.placement));
    const ignored = (x, y) => neighbours.some((box) => (
      x >= box.x && y >= box.y && x < box.x + box.width && y < box.y + box.height
    ));
    const outsideColors = collectOutsideColors(source, sourceWidth, sourceHeight, layer.placement, covered, ignored);
    const scale = backgroundTolerance(layerIsolationPickEdgeColor(pixels, width, height)) / 34;
    const edgeColor = layerIsolationRemoveEdgeBackground(pixels, width, height, {
      hardThreshold: 34 * scale,
      softThreshold: 82 * scale
    });
    // The corner color is only background when it also shows outside the box; a panel's corners are the panel.
    const edgeColorIsOutside = outsideColors.some((color) => (
      layerIsolationColorDistance(edgeColor.r, edgeColor.g, edgeColor.b, color.r, color.g, color.b) <= backgroundTolerance(color)
    ));
    for (let pixel = 0; pixel < protect.length; pixel += 1) {
      if (protect[pixel] || !edgeColorIsOutside) pixels.set(crop.subarray(pixel * 4, pixel * 4 + 4), pixel * 4);
    }
    clearEdgeConnectedColors(
      pixels, crop, width, height, outsideColors,
      collectLineOutsideColors(source, sourceWidth, sourceHeight, layer.placement, covered, ignored),
      collectLineOutsideColors(source, sourceWidth, sourceHeight, layer.placement, covered, ignored, 12),
      protect,
      state
    );
    // A panel that fills its whole box looks like background to the flood fill; keep it opaque instead.
    // Only visible pixels count: hidden ones are always cleared before they are rebuilt.
    let cleared = 0;
    let shown = 0;
    for (let pixel = 0; pixel < protect.length; pixel += 1) {
      if (state[pixel] === 1) continue;
      shown += 1;
      if (pixels[pixel * 4 + 3] === 0) cleared += 1;
    }
    // A box around several other layers that comes out empty is a group box and is dropped later; any other layer
    // the AI saw but that looks like the background (a faded bar) keeps its plain crop.
    const enclosed = layers.slice(index + 1).filter((other) => (
      other.placement.x >= left && other.placement.y >= top
      && other.placement.x + other.placement.width <= left + width
      && other.placement.y + other.placement.height <= top + height
    )).length;
    if (layer.kind !== "text" && (
      (!edgeColorIsOutside && cleared > shown * 0.8) || (enclosed < 2 && cleared > shown * 0.97)
    )) pixels.set(crop);
    // Hidden parts are filled after the background is gone, so they can turn out transparent too.
    const hidden = state.map((value) => (value === 1 ? 1 : 0));
    fillHiddenFromSymmetry(pixels, width, height, state, layer.shape);
    inpaintUnknownPixels(pixels, width, height, state);
    if (layer.kind !== "text") clearSmallIslands(pixels, width, height);
    if (round) {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const alphaIndex = (y * width + x) * 4 + 3;
          pixels[alphaIndex] = Math.round(pixels[alphaIndex] * sliceShapeCoverage(layer, left + x, top + y));
        }
      }
    }
    let visible = 0;
    let rebuilt = 0;
    const rebuiltBox = { left: width, top: height, right: -1, bottom: -1 };
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const alpha = pixels[(y * width + x) * 4 + 3];
        if (alpha === 0) continue;
        covered[(top + y) * sourceWidth + left + x] = 1;
        if (alpha < 128) continue;
        visible += 1;
        if (!hidden[y * width + x]) continue;
        rebuilt += 1;
        rebuiltBox.left = Math.min(rebuiltBox.left, x);
        rebuiltBox.top = Math.min(rebuiltBox.top, y);
        rebuiltBox.right = Math.max(rebuiltBox.right, x);
        rebuiltBox.bottom = Math.max(rebuiltBox.bottom, y);
      }
    }
    results[index] = {
      opaque,
      pixels,
      // A box that only grouped other layers is plain background once they are taken out.
      backgroundOnly: visible < width * height * 0.02,
      // Share of the visible layer that was guessed under layers in front, and where (source coordinates),
      // so an image model can redo that part.
      rebuiltRatio: visible ? rebuilt / visible : 0,
      rebuiltRegion: rebuilt ? {
        x: left + rebuiltBox.left,
        y: top + rebuiltBox.top,
        width: rebuiltBox.right - rebuiltBox.left + 1,
        height: rebuiltBox.bottom - rebuiltBox.top + 1
      } : null
    };
  }
  return results;
}

// Screen background without the slices: `mask` (1 where a slice has visible pixels) is grown by 2px to cover
// anti-aliased edges and filled from the surrounding background, in place.
function inpaintMaskedImage(pixels, width, height, mask) {
  const state = new Uint8Array(width * height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!mask[y * width + x]) continue;
      for (let sy = Math.max(0, y - 2); sy <= Math.min(height - 1, y + 2); sy += 1) {
        state.fill(1, sy * width + Math.max(0, x - 2), sy * width + Math.min(width - 1, x + 2) + 1);
      }
    }
  }
  inpaintUnknownPixels(pixels, width, height, state);
  return pixels;
}

if (typeof module !== "undefined") {
  module.exports = {
    inpaintMaskedImage,
    isolateSliceLayers,
    sliceShapeCoverage
  };
}
