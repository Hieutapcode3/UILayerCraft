# 2026-10-29: Codex image call hang, automatic sharpening after AI Slice

Branch: `dev/Hieuthu3` (not committed).

### Done

- **Hang fix** (`src/server/providers/cli-chat-client.js`): on Windows a timeout or Cancel only ended the `cmd.exe` shell and left `codex` running. `killCliProcess` now runs `taskkill /pid <pid> /T /F` there, so the slot is freed.
- **Automatic sharpening after AI Slice** (replaced the same day by [2026-10-29-slice-upscale-handoff](../2026-10-29-slice-upscale-handoff/notes.md): blur was the wrong test, small slices are sharp but low resolution) (`src/ui/app.js`): `runAutoSliceAiPasses` first runs the existing rebuilt-slice fix, then `sharpenBlurrySlicesWithAi`. It measures every raster slice with `measureSharpness` (`image-color-utils.js`, downscaled to 160 px), and redraws up to 8 blurry slices (softest first) through `/api/assets/ai-redraw` with `buildAiSharpenPrompt` (`ai-helpers.js`), keeping the original slice restorable. Needs a generation model routed. One failure or Cancel stops the batch. No full-screen modal: each slice shows its own progress and Cancel.
- Local transparency after AI Slice was already automatic (`applyLocalTransparency`); AI transparency stays manual and is only used as part of the sharpen pass.

### Verification

- Sandbox: `cli-chat-client`, `ui-image-color-utils` and `ui-ai-helpers` tests pass; `node --check src/ui/app.js` ok.
- **Not run on the device:** `npm test`, `npm run build` (dist/ is stale until then), `git diff --check`, and a real AI Slice with Codex.

### Open issues

- Blur detection is a heuristic (soft-edge ratio of Laplacian to gradient on a 160 px copy); thresholds in `measureSharpness` may need tuning on real slices.
- Each Codex call takes about 30-100 s, so 8 slices can take 5-13 minutes. The limit is `AUTO_SHARPEN_LIMIT` in `app.js`.
