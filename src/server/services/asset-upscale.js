// AI upscale for small slices: the image model redraws the slice larger on a flat key color, and the key color is
// removed here. A key color gives clean edges where guessing the original background leaves specks and halos,
// and the model's canvas size or padding does not matter, because the result is fitted back into the slice's own
// content box. Pixel work is in plain functions so it can be tested without sharp.

const KEY_COLORS = [
  { name: "magenta", hex: "#FF00FF", r: 255, g: 0, b: 255 },
  { name: "green", hex: "#00FF00", r: 0, g: 255, b: 0 },
  { name: "blue", hex: "#0000FF", r: 0, g: 0, b: 255 },
  { name: "cyan", hex: "#00FFFF", r: 0, g: 255, b: 255 }
];

const MAX_UPSCALE_SIDE = 2048;

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

// How much a color looks like the key: the weakest of the key's full channels minus the strongest of its empty
// ones (255 for the key itself, 0 or less for colors unlike it). Works for the pure key colors above.
function keyness(r, g, b, key) {
  const channels = [r, g, b];
  const full = [key.r, key.g, key.b].map((value, index) => (value >= 128 ? channels[index] : 255));
  const empty = [key.r, key.g, key.b].map((value, index) => (value < 128 ? channels[index] : 0));
  return Math.min(...full) - Math.max(...empty);
}

// Highest keyness among visible pixels (ignoring the top 0.5% as noise).
function assetKeyness(pixels, key) {
  const values = [];
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] >= 128) values.push(keyness(pixels[i], pixels[i + 1], pixels[i + 2], key));
  }
  if (!values.length) return -255;
  values.sort((a, b) => a - b);
  return values[Math.min(values.length - 1, Math.floor(values.length * 0.995))];
}

// The first key color (magenta first) that no visible color of the slice resembles; otherwise the least similar.
// `limit` is the asset's own highest keyness, so keying never cuts into it.
function pickKeyColor(pixels) {
  let best = null;
  for (const key of KEY_COLORS) {
    const limit = assetKeyness(pixels, key);
    if (limit <= 0) return { ...key, limit };
    if (!best || limit < best.limit) best = { ...key, limit };
  }
  return best;
}

// Target size: the slice times `scale`, longest side capped.
function upscaleTargetSize(width, height, scale = 4) {
  const w = Math.max(1, Math.round(Number(width) || 1));
  const h = Math.max(1, Math.round(Number(height) || 1));
  const factor = Math.max(1, Math.min(Number(scale) || 4, MAX_UPSCALE_SIDE / Math.max(w, h)));
  return { width: Math.round(w * factor), height: Math.round(h * factor), scale: factor };
}

// Removes the key color: pixels that look like it (keyness) become transparent, a band in between is un-mixed
// (the key's tint is taken out of anti-aliased edges) and despilled, so no colored fringe is left.
function keyOutColor(pixels, key, { transparentAt = 200, opaqueAt = Math.min(170, Math.max(40, (key.limit ?? 0) + 25)) } = {}) {
  const out = new Uint8ClampedArray(pixels);
  const full = [key.r, key.g, key.b].map((value) => value >= 128);
  for (let i = 0; i < out.length; i += 4) {
    const k = keyness(out[i], out[i + 1], out[i + 2], key);
    if (k >= transparentAt) {
      out.fill(0, i, i + 4);
      continue;
    }
    if (k <= opaqueAt) continue;
    const alpha = (transparentAt - k) / (transparentAt - opaqueAt);
    const color = [0, 1, 2].map((c) => (out[i + c] - (1 - alpha) * [key.r, key.g, key.b][c]) / alpha);
    // Despill: what is left of the key tint is taken off the key's full channels.
    const spill = keyness(...color.map((value) => Math.max(0, Math.min(255, value))), key);
    for (let c = 0; c < 3; c += 1) out[i + c] = full[c] && spill > 0 ? color[c] - spill : color[c];
    out[i + 3] = Math.round(out[i + 3] * alpha);
  }
  return out;
}

// Clears visible islands (8-connected, alpha >= 32) smaller than `minShare` of the largest one: stray specks
// left around an asset. Letters and other real parts are far bigger than that.
function removeSmallIslands(pixels, width, height, { minShare = 0.004, minPixels = 6 } = {}) {
  const out = new Uint8ClampedArray(pixels);
  const label = new Int32Array(width * height).fill(-1);
  const sizes = [];
  const stack = [];
  for (let start = 0; start < width * height; start += 1) {
    if (label[start] !== -1 || out[start * 4 + 3] < 32) continue;
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
          if (label[next] !== -1 || out[next * 4 + 3] < 32) continue;
          label[next] = id;
          stack.push(next);
        }
      }
    }
    sizes.push(size);
  }
  const largest = Math.max(0, ...sizes);
  const limit = Math.max(minPixels, largest * minShare);
  const kept = (index) => label[index] >= 0 && sizes[label[index]] >= limit;
  for (let index = 0; index < width * height; index += 1) {
    if (label[index] >= 0 && !kept(index)) out.fill(0, index * 4, index * 4 + 4);
  }
  // Faint pixels (alpha < 32) stay only next to a kept island (anti-aliasing); elsewhere they are haze.
  for (let index = 0; index < width * height; index += 1) {
    if (label[index] !== -1 || out[index * 4 + 3] === 0) continue;
    const x = index % width;
    const y = (index - x) / width;
    let near = false;
    for (let dy = -2; dy <= 2 && !near; dy += 1) {
      for (let dx = -2; dx <= 2 && !near; dx += 1) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < width && ny < height && kept(ny * width + nx)) near = true;
      }
    }
    if (!near) out.fill(0, index * 4, index * 4 + 4);
  }
  return out;
}

// Box of pixels with alpha >= threshold, or null when nothing is visible.
function alphaBounds(pixels, width, height, threshold = 32) {
  let left = width; let top = height; let right = -1; let bottom = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (pixels[(y * width + x) * 4 + 3] < threshold) continue;
      if (x < left) left = x;
      if (x > right) right = x;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
    }
  }
  return right < 0 ? null : { x: left, y: top, width: right - left + 1, height: bottom - top + 1 };
}

// Where the redrawn content goes inside the target canvas: the slice's own content box scaled up, with the
// content's aspect ratio kept (centered on the free axis).
function fitBox(contentSize, frame) {
  const scale = Math.min(frame.width / contentSize.width, frame.height / contentSize.height);
  const width = Math.max(1, Math.round(contentSize.width * scale));
  const height = Math.max(1, Math.round(contentSize.height * scale));
  return {
    x: Math.round(frame.x + (frame.width - width) / 2),
    y: Math.round(frame.y + (frame.height - height) / 2),
    width,
    height
  };
}

// The model recreates the element from the original crop instead of cleaning the local cut-out: the cut-out
// (second image) only says which element is meant, so its specks and holes never reach the result.
// `covers`: other slices drawn on top of this one, in target-canvas pixels. They are exported as their own layers,
// so the model must not draw them, nor slots or holes where they sit (a panel under buttons stays a plain surface).
function buildUpscalePrompt({ name, width, height, key, covers = [] }) {
  const coverLines = covers.length
    ? [
      "Other layers sit on top of this element and are exported separately, so they must NOT appear in your drawing:",
      ...covers.slice(0, 30).map((cover) => `- ${cover.name} at x ${cover.x}, y ${cover.y}, ${cover.width} × ${cover.height}`),
      "Where they sit, do not draw them, and do not draw any slot, hole, recess, socket, frame, outline or shadow shaped like them. Continue this element's own plain surface underneath as if they were never there."
    ]
    : [];
  return [
    `Create a brand-new, clean, crisp, high-resolution ${width} × ${height} game UI sprite of the element "${name || "ui_asset"}".`,
    "The first image is a crop of the original game screen around that element; use it as the source of truth for the design.",
    `The second image is a rough cut-out of the same element on ${key.hex}; it only shows which element to draw and where. Ignore its specks, holes and ragged edges.`,
    "Draw only that element, complete: restore any part covered by other elements, and leave out the screen background, panels, buttons or icons behind or next to it.",
    ...coverLines,
    "Keep the same design: shape, silhouette, proportions, angle, colors, outlines, text and its exact spelling, highlights and shading. Do not redesign, restyle or add anything.",
    "Make it look like a professional game asset: sharp clean edges and outlines, no blur, no compression noise, no stray pixels.",
    `Fill everything around the element with one flat, solid ${key.hex} color: no gradient, no shadow, no glow or texture on it. Do not use ${key.hex} anywhere inside the element.`,
    "Place the element where the cut-out shows it, at the same size."
  ].join("\n");
}

// image ops: { decode(buffer) -> { pixels, width, height }, encode(pixels, width, height) -> buffer,
// resize(pixels, width, height, newWidth, newHeight) -> pixels }. Defaults to sharp.
function createSharpImageOps(sharp) {
  return {
    async decode(buffer) {
      const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      return { pixels: new Uint8ClampedArray(data.buffer, data.byteOffset, data.length), width: info.width, height: info.height };
    },
    async encode(pixels, width, height) {
      return sharp(Buffer.from(pixels.buffer, pixels.byteOffset, pixels.length), { raw: { width, height, channels: 4 } }).png().toBuffer();
    },
    async resize(pixels, width, height, newWidth, newHeight) {
      const { data } = await sharp(Buffer.from(pixels.buffer, pixels.byteOffset, pixels.length), { raw: { width, height, channels: 4 } })
        .resize(newWidth, newHeight, { fit: "fill", kernel: "lanczos3" })
        .raw()
        .toBuffer({ resolveWithObject: true });
      return new Uint8ClampedArray(data.buffer, data.byteOffset, data.length);
    }
  };
}

function dataUrlToBuffer(dataUrl) {
  const match = /^data:[^;]+;base64,(.+)$/.exec(String(dataUrl || ""));
  if (!match) throw Object.assign(new Error("image dataUrl must be a base64 data URL"), { statusCode: 400 });
  return Buffer.from(match[1], "base64");
}

// payload: { layerDataUrl (the slice with its local transparency), dataUrl (the opaque crop), width, height
// (slice size on screen), scale, name }. requestContext: { config, callForm }. Returns the redraw route's shape.
async function upscaleSliceAsset(payload, requestContext, { imageOps, toImageSize, dataUrlToFile, normalizeImageResponse }) {
  const layer = await imageOps.decode(dataUrlToBuffer(payload.layerDataUrl || payload.dataUrl));
  const crop = payload.dataUrl ? await imageOps.decode(dataUrlToBuffer(payload.dataUrl)) : layer;
  const target = upscaleTargetSize(payload.width || layer.width, payload.height || layer.height, payload.scale);
  const key = pickKeyColor(layer.pixels);

  // Reference: the slice on the key color, enlarged.
  const layerLarge = await imageOps.resize(layer.pixels, layer.width, layer.height, target.width, target.height);
  const reference = new Uint8ClampedArray(layerLarge.length);
  for (let i = 0; i < reference.length; i += 4) {
    const alpha = layerLarge[i + 3] / 255;
    reference[i] = layerLarge[i] * alpha + key.r * (1 - alpha);
    reference[i + 1] = layerLarge[i + 1] * alpha + key.g * (1 - alpha);
    reference[i + 2] = layerLarge[i + 2] * alpha + key.b * (1 - alpha);
    reference[i + 3] = 255;
  }
  const cropLarge = await imageOps.resize(crop.pixels, crop.width, crop.height, target.width, target.height);
  const toDataUrl = async (pixels) => `data:image/png;base64,${(await imageOps.encode(pixels, target.width, target.height)).toString("base64")}`;

  const { config } = requestContext;
  const form = new FormData();
  form.set("model", config.model);
  const covers = (Array.isArray(payload.covers) ? payload.covers : [])
    .filter((cover) => cover && Number(cover.width) > 0 && Number(cover.height) > 0)
    .map((cover) => ({
      name: String(cover.name || "layer").replace(/[^\w-]/g, "_").slice(0, 60),
      x: Math.round(Number(cover.x) * target.scale),
      y: Math.round(Number(cover.y) * target.scale),
      width: Math.round(Number(cover.width) * target.scale),
      height: Math.round(Number(cover.height) * target.scale)
    }));
  form.set("prompt", buildUpscalePrompt({ name: payload.name, width: target.width, height: target.height, key, covers }));
  // CLI image tools pick their own canvas; an empty size keeps it (the result is fitted back below anyway).
  const size = toImageSize(target.width, target.height, config);
  if (size) form.set("size", size);
  form.set("quality", payload.quality || "high");
  form.set("output_format", "png");
  form.set("n", "1");
  form.append("image[]", dataUrlToFile(await toDataUrl(cropLarge), "slice-original-crop.png"));
  form.append("image[]", dataUrlToFile(await toDataUrl(reference), "slice-cutout-guide.png"));
  const data = await requestContext.callForm("/v1/images/edits", form);
  const produced = (await normalizeImageResponse(data)).images?.[0]?.dataUrl;
  if (!produced) throw Object.assign(new Error("AI upscale returned no image"), { statusCode: 502 });

  // Key out at the model's own resolution, then fit the content into the slice's content box.
  const drawn = await imageOps.decode(dataUrlToBuffer(produced));
  const keyed = removeSmallIslands(keyOutColor(drawn.pixels, key), drawn.width, drawn.height);
  const drawnBox = alphaBounds(keyed, drawn.width, drawn.height);
  // Fringe pieces the local transparency left (a few percent of the asset) must not stretch the box.
  const layerBox = alphaBounds(removeSmallIslands(layerLarge, target.width, target.height, { minShare: 0.05 }), target.width, target.height, 64);
  if (!drawnBox || !layerBox) throw Object.assign(new Error("AI upscale result has no visible asset after removing the key color"), { statusCode: 502 });
  const content = new Uint8ClampedArray(drawnBox.width * drawnBox.height * 4);
  for (let y = 0; y < drawnBox.height; y += 1) {
    const from = ((drawnBox.y + y) * drawn.width + drawnBox.x) * 4;
    content.set(keyed.subarray(from, from + drawnBox.width * 4), y * drawnBox.width * 4);
  }
  const place = fitBox(drawnBox, layerBox);
  const resized = await imageOps.resize(content, drawnBox.width, drawnBox.height, place.width, place.height);
  const output = new Uint8ClampedArray(target.width * target.height * 4);
  for (let y = 0; y < place.height; y += 1) {
    const ty = place.y + y;
    if (ty < 0 || ty >= target.height) continue;
    for (let x = 0; x < place.width; x += 1) {
      const tx = place.x + x;
      if (tx < 0 || tx >= target.width) continue;
      const from = (y * place.width + x) * 4;
      output.set(resized.subarray(from, from + 4), (ty * target.width + tx) * 4);
    }
  }
  return {
    images: [{ id: "image_1", dataUrl: await toDataUrl(output) }],
    provider: { baseUrl: config.baseUrl, model: config.model, size: `${target.width}x${target.height}` },
    transparent: true,
    requiresLocalTransparency: false,
    upscale: { scale: target.scale, width: target.width, height: target.height, keyColor: key.hex }
  };
}

module.exports = {
  KEY_COLORS,
  alphaBounds,
  buildUpscalePrompt,
  createSharpImageOps,
  fitBox,
  keyOutColor,
  keyness,
  pickKeyColor,
  removeSmallIslands,
  upscaleSliceAsset,
  upscaleTargetSize
};
