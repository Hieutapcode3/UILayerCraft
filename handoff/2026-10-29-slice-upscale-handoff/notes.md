# 2026-10-29: AI 4x redraw of small slices, Unity hand-off check

Branch: `dev/Hieuthu3` (not committed).

### Why

On the "Out of moves" screen, small slices (`bonus_moves_label` 159 × 34, `rewarded_video_clapperboard` 72 × 69) were never sent to AI and looked rough:
- They are not blurry at their own size (sharpness ratio about 1.8); they are low resolution, so they blur when scaled up.
- Local transparency left cream dots on the text outline (same color as the panel) and a piece of the yellow button under the icon.
- Slices that did go through AI were scaled back from 1024 px to their on-screen size and got the old local mask again.

### Done

- **Server `mode: "upscale"`** on `/api/assets/ai-redraw` (`src/server/services/asset-upscale.js`):
  - The slice is sent at 4x (longest side up to 2048) on a key color, plus the original crop for detail.
  - The key color is magenta unless the slice uses similar colors (then green, blue, cyan).
  - The model is asked to redraw sharp with the same design on a flat key color.
  - The key is removed with un-mixing and despill. Stray specks and haze are dropped.
  - The content is fitted back into the slice's own content box, so the model's canvas or padding does not matter.
  - `cli://codex` gets no size; APIs get the nearest supported size.
- **UI** (`src/ui/app.js`):
  - After AI Slice (and the existing rebuilt-slice fix), every raster slice gets a hand-off check.
  - Slices with low resolution, specks, leftover background or blur are redrawn with `makeSliceAiUpscale`: smallest first, at most 8 (`AUTO_UPSCALE_LIMIT`). One failure or Cancel stops the batch.
  - The 4x image is kept and the placement is unchanged; the previous image is restorable.
  - Manual "AI redraw 4x" button in the Transparent menu.
- **Hand-off check** (`assessSliceHandoff` in `image-color-utils.js`):
  - Checks: resolution for small elements (short side under 160 px needs 2x), stray specks, haze, edges in the background color seen around the slice, light halo, cut off at the border, blur.
  - Shown as "Unity: ready / review / needs fixing" under each slice, with details on hover, and a summary in the status bar.
- Removed `buildAiSharpenPrompt` and the blur-only pass from the previous case.

### Update (15:45): recreate instead of clean up

- The user's run showed no change: `dist/ui.html` was still the 2026-10-22 build, so the new UI never loaded. `dist/ui.html` was rebuilt with `scripts/build-ui-html.js` (diff against the old build is only this work).
- The model now gets the **original crop first** and the local cut-out only as a guide. It is asked to draw a brand-new sprite of that element, restore covered parts, and leave out everything else, so the local cut-out's specks and holes never reach the result.
- Every raster slice that is not "Unity: ready" is recreated (smallest first, 8 per AI Slice). The status bar says how many were left over for the manual "AI redraw 4x".

### Update (16:30): one slice per element, progress list in the AI Slice popup

- **Duplicate slice:** the hidden-part fix (AI completion) left the raw model output as a second slice (`*_ai_original`), so a redrawn button showed twice. `dropAiRawSiblings` now removes it after the fix and after an AI redraw 4x. Slices queued for the redraw skip the hidden-part fix (the redraw restores covered parts itself): one Codex call less per slice.
- **Progress in the popup:** the AI Slice popup stays open while the slices are checked and redrawn. It lists every element with a thumbnail and its state: Detected, Checking, Waiting, AI redraw 4x · Ns (spinner), ✓ Redrawn 4x, Unity ready / review / needs fixing, skipped over the limit, failed, cancelled. A "n / total done" line is on top.
- "Run in background" closes the popup and the redraws go on; Cancel in that phase stops the redraws but keeps the slices.
- Files: `src/ui/app.js`, `src/ui/ui.template.html` (list + button), `src/ui/styles.css` (`.slice-progress-*`, the button is excluded from the loading lock), `dist/ui.html` rebuilt.

### Update (16:45): redraw every slice that needs it

- The user's run (draft `draft_mvtc4ms1`, 25 slices): only 8 were redrawn. The limit was 8, and rebuilt slices went first, so the budget went to big panels and buttons while 17 small text and icon slices stayed at 1x.
- 6 of the 8 redrawn slices were still "needs fixing" for `leftover-background`: an element that fills its crop has its own color on the crop border. Recreated slices (`recreated: true`) now skip the leftover-background and edge-cut checks; on that draft, 7 of 8 pass.
- Limit raised to 40, smallest first. "Needs fixing" is always redrawn; "review" only for small elements, so big backgrounds are not.
- New **AI Redraw All** button in the slice list header: runs the check + 4x redraw on every slice of the current image with the popup progress list (no hidden-part fix).

### Update (16:55): faster redraws

- Each Codex image run took about 40-90 s, one after another (measured from `~/.codex/generated_images`).
- **3 redraws at once** (`AUTO_UPSCALE_CONCURRENCY` in `app.js`). A failure or Cancel stops new ones from starting.
- **Right image per run:** `codex exec` now runs with `--json`. Its `thread_id` names the run's own `generated_images/<thread id>` folder, so parallel runs cannot swap images. Without a thread id, the newest image not already handed out is used.
- **Less thinking:** `-c model_reasoning_effort=low`, since the run is one image tool call. `UILAYERCRAFT_CODEX_REASONING=medium` (or `default`) changes it.
- Tests: `tests/server/cli-image-client.test.js`.
- Not verified: `--json` and `-c model_reasoning_effort=low` on the real Codex 0.163; three parallel runs against the account's rate limit.

### Update (17:15): 5 at once, back off on rate limits

- Measured on the user's machine: 22 slices in about 7 minutes with 3 at once (about 40-60 s per Codex image).
- `AUTO_UPSCALE_CONCURRENCY` is now 5. Five is also the safe ceiling: the browser keeps 6 connections per host and progress polling needs one.
- A rate-limit style error (429, "rate limit", "usage limit", "too many", "capacity") puts the slice back in the queue (twice at most), runs one worker fewer and waits 5 s. Other errors still stop the batch. Simulated: 5 at once, two rate limits, down to 3, every slice redrawn.

### Update (17:45): containers drew slots for their buttons

- The Setting popup panel came back with sunken slots where the toggle and retry buttons sit: the prompt said "restore covered parts", and the model restored them as recesses.
- The UI now sends `covers` (slices painted after this one, at least 60% inside it) to the redraw. The prompt lists them in 4x coordinates and says not to draw them or any slot, hole, recess, frame or shadow shaped like them.
- A redo uses the slicing cut-out (`layerTransparentDataUrl`), not the earlier redraw.
- AI Slice prompt: a recessed tray or darker inner frame holding a group of controls is now its own panel asset. It used to be merged into the popup on purpose (2026-10-22 popup-containers case). The user asked for it as a separate layer.

### Update (18:05): pick what gets redrawn

- After the check, the AI Slice popup pauses and shows a tick box on every slice (thumbnail, name, check result; hover for the issues). Slices that are not ready are ticked. Buttons: Suggested / All / None; "AI redraw selected (n)" starts; "Skip redraw" keeps the slices as they are.
- Once the user picked, only ticked slices use AI: the hidden-part fix is skipped. Unattended runs ("Run in background" before the check ends, overlay slices) use the suggestion as before.
- Redrawn slices can be ticked again to redo them.
- Files: `app.js` (`chooseSliceUpscales`, `buildUpscaleQueue`, `renderSliceRedrawChoice`), `ui.template.html` (`#backgroundDecompositionStartRedraw`), `styles.css` (tick box styles; the new buttons are excluded from the loading lock).

### Verification

- Sandbox: `asset-upscale` (7), `ui-image-color-utils` (10), `ui-ai-helpers` (6), `cli-chat-client` (2) tests pass; `node --check` on `app.js` and `server/index.js`.
- The check on the real slices from the draft:
  - `+10 MOVES`: low-resolution, specks, halo.
  - Clapperboard: low-resolution, leftover-background.
  - Both pass after keying a 4x copy.
- **Not run:** `npm test`, `npm run build`, `git diff --check` on the device; sharp-based image ops (sharp is not installable in the sandbox); a real Codex redraw.

### Open issues

- Codex may change small details or lettering when redrawing; the previous image stays restorable.
- Large slices processed by the rebuilt-slice fix are still scaled back to 1x.
- The check thresholds (specks 0.4% of the largest part, halo +70 luma, background edges 20%) may need tuning on more screens.
