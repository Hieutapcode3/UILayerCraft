const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { runCli } = require("./cli-chat-client");

const OUTPUT_FILE = "output.png";

// Answers OpenAI image requests (/v1/images/generations with a JSON body, /v1/images/edits with a FormData body)
// through the locally logged-in Codex CLI, whose built-in image tool needs no API key. Returns OpenAI's shape.
async function callCodexImageRequest(requestPath, body, {
  model,
  timeoutMs,
  signal,
  createAbortError = (message) => Object.assign(new Error(message), { name: "AbortError" }),
  spawnImpl = spawn,
  codexHome = process.env.CODEX_HOME || path.join(os.homedir(), ".codex"),
  resizeImage = resizePng
}) {
  const isEdit = /\/images\/edits$/.test(requestPath);
  if (!isEdit && !/\/images\/generations$/.test(requestPath)) {
    throw Object.assign(new Error(`cli://codex does not support ${requestPath}`), { statusCode: 400 });
  }
  const field = (name) => (typeof body?.get === "function" ? body.get(name) : body?.[name]);
  const prompt = String(field("prompt") || "").trim();
  if (!prompt) throw Object.assign(new Error("Image prompt is empty"), { statusCode: 400 });
  const size = String(field("size") || "");
  const transparent = field("background") === "transparent";
  const inputs = isEdit ? body.getAll("image[]") : [];
  const mask = isEdit ? body.get("mask") : null;

  const workDir = await fs.mkdtemp(path.join(os.tmpdir(), "uilayercraft-codex-"));
  const startedAt = Date.now();
  try {
    const files = [];
    for (const [index, file] of [...inputs, ...(mask ? [mask] : [])].entries()) {
      const target = path.join(workDir, `${index === inputs.length ? "mask" : `input-${index + 1}`}.png`);
      await fs.writeFile(target, Buffer.from(await file.arrayBuffer()));
      files.push(target);
    }
    const outputPath = path.join(workDir, OUTPUT_FILE);
    const instructions = [
      isEdit
        ? "Use your built-in image generation tool to edit the attached image(s) as described below."
        : "Use your built-in image generation tool to create a new image as described below.",
      mask
        ? "The last attached image is a mask the same size as the first one: repaint only where the mask is transparent and keep every other pixel unchanged."
        : "",
      size ? `The result must be ${size.replace("x", " × ")} pixels.` : "",
      transparent ? "Give the result a transparent background." : "",
      `Save the final image as a PNG file at exactly this path: ${outputPath}`,
      "Do not create or change any other files. When the file is saved, reply with DONE.",
      "",
      "Image request:",
      prompt
    ].filter((line, index, all) => line || all[index - 1]).join("\n");

    const answer = await runCli("codex", [
      "exec",
      "--skip-git-repo-check",
      "--ignore-user-config",
      "--enable", "image_generation",
      "--color", "never",
      "-s", "workspace-write",
      "-C", workDir,
      ...(model && model !== "default" ? ["-m", model] : []),
      ...files.flatMap((file) => ["-i", file])
    ], instructions, { cwd: workDir, timeoutMs, signal, createAbortError, spawnImpl });

    const produced = await findProducedImage(outputPath, codexHome, startedAt);
    if (!produced) {
      // Codex explains why (for example that its image tool is not available for this account); pass that on.
      const reason = String(answer || "").trim().split(/\r?\n/).filter(Boolean).at(-1) || "";
      throw Object.assign(new Error(`Codex CLI finished without producing an image${reason ? `: ${reason.slice(0, 300)}` : ""}. Image generation through Codex needs an account where its built-in image tool is enabled; otherwise use an image API config.`), { statusCode: 502 });
    }
    const [width, height] = size.split("x").map(Number);
    const bytes = width > 0 && height > 0 ? await resizeImage(produced, width, height) : produced;
    return { data: [{ b64_json: bytes.toString("base64") }] };
  } finally {
    await fs.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

// The requested path first; otherwise the newest image Codex wrote to $CODEX_HOME/generated_images during this run.
async function findProducedImage(outputPath, codexHome, startedAt) {
  const saved = await fs.readFile(outputPath).catch(() => null);
  if (saved) return saved;
  let newest = null;
  const walk = async (dir) => {
    for (const entry of await fs.readdir(dir, { withFileTypes: true }).catch(() => [])) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
        const { mtimeMs } = await fs.stat(full);
        if (mtimeMs >= startedAt - 1000 && (!newest || mtimeMs > newest.mtimeMs)) newest = { full, mtimeMs };
      }
    }
  };
  await walk(path.join(codexHome, "generated_images"));
  return newest ? fs.readFile(newest.full) : null;
}

async function resizePng(bytes, width, height) {
  const sharp = require("sharp");
  return sharp(bytes).resize(width, height, { fit: "fill" }).png().toBuffer();
}

module.exports = {
  callCodexImageRequest
};
