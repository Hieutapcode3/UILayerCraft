# Handoffs

Progress log for UILayerCraft. Newest session first. Each entry records what changed, how it was verified, open issues and next steps (see [STANDARDS.md](STANDARDS.md)).

---

## 2026-10-21: Codex CLI for images, CLI setup script, automatic task routing

Branch: `dev/Hieuthu3` (not committed).

### Done

- **`cli://codex`** (`src/server/providers/cli-image-client.js`): answers `/v1/images/generations` and `/v1/images/edits` through `codex exec` with its built-in image tool, so every image feature (generate, edit, inpaint, AI Complete) can use it without an API key. Also reads images like the Claude and Gemini CLIs. Runs with `--ignore-user-config` so a coding model or MCP server set in `~/.codex/config.toml` cannot break it. Settings → Connection has a Codex CLI option that allows image tasks.
- **Auto fix after AI Slice**: slices with at least 10% of their visible pixels rebuilt under other slices are sent to the inpaint model (when one is routed); the result keeps the layer's shape and name, the raw model output stays in the list unselected.
- **`scripts/setup-clis.js`**, run by `deploy-environment.bat/.command`: checks Claude, Codex and Gemini CLIs, installs missing ones with `npm install -g`, opens a terminal for each login still needed. `--check` only reports.
- **Automatic routing** (`src/server/services/cli-setup.js`): at server start, unrouted tasks go to logged-in CLIs: vision to Claude (then Gemini, then Codex), generation + inpaint to Codex. Routed tasks are left alone.
- AI Slice prompt: skip elements under a dimming overlay (`behindOverlay` flag dropped by the parser), keep fruit/cargo inside an illustration as one asset, leave cast shadows in the background; one overlay per element.
- Layer isolation: background fill passes through hidden pixels, mean outside colors, small leftover islands removed.

### Verification

- `npm test`: 634 / 634 pass; `npm run build` ok; `git diff --check` clean.
- `node scripts/setup-clis.js --check` on this machine: Claude ready, Codex not on PATH, Gemini installed but not logged in.
- Server start with empty routing and a fake `codex` on PATH: logs "Routed vision to cli://claude" and "Routed generation + inpaint to cli://codex".
- E2E (home screen) with the fake Codex: 17 slices auto-fixed through the real UI → server → CLI path; Figma composite still matches the original, 35 layers imported.

### Open issues

- **Real Codex image generation was not produced on this machine.** Codex 0.163.0 is logged in with ChatGPT, but `codex exec` reports that its built-in image tool is not available for this account (tried default model, `--enable image_generation`, `$imagegen`). The plugin surfaces Codex's reason. An image API config works as before.
- `setup-clis.js` was not run in install mode here (it would install Codex globally and open a Gemini login window).
- Restart the API on port 18787 to pick up all server changes.

---

## 2026-10-20 (2): AI Slice splits every layer and separates overlaps

Branch: `dev/Hieuthu3` (not committed).

### Done

- **Prompt** (`src/core/slice-detection/prompt-builder.js`, shared with the background plan): return every visual layer (buttons, counter pills, level nodes, tags, connectors, nav bar, text) in back-to-front order, with a `shape` (ellipse / capsule / free), full boxes for partly covered elements, no group boxes or cut-out pieces. New kinds: button, badge, text, panel, progress-bar.
- **Parser** drops cut-out pieces and duplicates (inner box sharing 3+ edges; progress bars exempt).
- **Layer isolation** (`src/ui/services/slice-layer-isolation.js`): front to back, hidden parts are rebuilt (mirror, ring, row/column fill), background and layers behind are cleared (outside colors per row/column, tolerance scaled for dark scenes), round shapes get a soft mask; boxes left with only background are dropped.
- **Reference background** for import is filled from the slices' real alpha instead of rectangle patches.
- **Overlay candidates** inside one slice or around several slices are skipped.
- **Simulator and .fig export** honor `group(nodes, parent, index)`; groups used to land on top and broke paint order.

### Verification

- `npm test`: 626 / 626 pass; `npm run build` ok; `git diff --check` clean.
- E2E (Playwright on `figma-sim.html`, `cli://claude`, separate API copy on port 18788 so the user's history was not touched):
  - FruitFlow home screen (1080 × 1920): 35 layers; the simulated Figma composite matches the original.
  - FruitFlow "aDemo lose.png": 84 to 92 layers; the composite matches, popup layers clean.

### Open issues

- Lose screen: the dimmed background behind the popup (grid tiles behind the truck's shadow) still comes out patchy, and from run to run the AI sometimes splits the truck illustration into pieces.
- Not tested in Figma Desktop itself; checked with the simulator and `.fig` export.
- The running API on port 18787 must be restarted to use the new prompt.

---

## 2026-10-20: Rebrand, real-image E2E runs, docs

Branch: `dev/Hieuthu3` (not merged into `main`).

### Done

- **Rebrand to UILayerCraft**: plugin name and id (`manifest.json`), package name/version `1.2.0` with author and repository, UI title, `.fig` default file name and plugin data id, simulator/build globals, server log line, deploy scripts.
- **Local data migration**: the history folder is now `.uilayercraft-history/`; on startup the server moves an existing `.image-to-slice-history/` there once, so saved drafts survive the rename.
- **Original author references removed** from README, docs, code defaults (an old third-party relay URL in the legacy config migration), and the README screenshots (replaced with screenshots of this build). `LICENSE` keeps the original MIT copyright line next to the new one, because the MIT license requires it.
- **README rewritten** for UILayerCraft, with a worked example and a vision-model comparison.
- **New docs**: `STANDARDS.md`, this file.
- **Example outputs** in `examples/out-of-moves/` from the real runs below.

### Bugs found by testing and fixed

| # | Bug | Cause | Fix | Regression test |
|---|---|---|---|---|
| 1 | **Download Slices .fig** (web mode) did nothing when clicked | `figExportUiMode` had been removed during an earlier i18n refactor, so the click handler threw a `ReferenceError` | Declare it again once at startup; `refreshDynamicUiLabels` reuses it | `tests/ui-build.test.js`: "fig export UI mode is declared…" |
| 2 | AI Slice with a retired model showed "The local service is outdated" | UI treated every HTTP 404 as a missing route; the 404 came from the model provider | Only show "outdated" when the 404 has no error body | covered by #3 and the UI change |
| 3 | Provider error text was lost: "OpenAI request failed: 404" | Gemini wraps errors as `[{ "error": … }]`; the parser only read `{ error }` | Read the first element of array-wrapped errors | `tests/server/provider-http-client.test.js`: "…Gemini's array-wrapped error message" |
| 4 | Slice Assets panel clipped the "Transparent" button and slice sizes | Column too narrow after the 3-column layout | Columns now 260–300 / canvas / 340–380 px | visual check (screenshots) |
| 5 | Font test for Chinese text failed | Its Han sample string had been translated to English | Use `\u` escapes so the test still exercises the CJK font path | the test itself |
| 6 | Config file-mode test failed on Windows | POSIX permission bits do not exist on Windows | Assert the mode only off Windows | the test itself |

### Verification

- `npm run build`: ok. `npm test`: **612 / 612 pass** (Chromium installed locally, so the high-fidelity capture tests run). `git diff --check`: clean.
- E2E in the real UI (Playwright driving `dist/ui.html` against the local API), input `examples/out-of-moves/source.jpg` (1480 × 1920). Each run used a temporary vision config and restored the original routing afterwards; the user's `.local-provider-config.json` was compared with a backup and is unchanged.

| Case | Model / path | Result |
|---|---|---|
| 1. AI Slice | `cli://claude` | 15 slices, 1 full-background candidate with 7 removal areas; slice ZIP and `.fig` exported; `.fig` decodes to 1 frame + reference + 15 slice layers |
| 2. AI Slice | Gemini `models/gemini-3.8-flash` (API) | 8 slices in 52 s; missed the small hint/move icons, title lettering and tile illustrations |
| 3. AI Slice, error path | user's routed `gemini-2.0-flash` | provider 404 "model no longer available"; message now surfaced (needs a restarted API service, see Open issues) |
| 4. AI Layer Import | `cli://claude` | HTML/CSS preview in 82 s, inspector tree `main.screen > hud / slots / board / boosters / popup`; HTML ZIP and editable `.fig` (72 layers, 12 text layers) exported |
| 5. Settings → Test / Fetch Models | `cli://claude`, `cli://gemini` | Test: success. Fetch Models: preset list. CLI config for image generation rejected with a clear message |
| 6. AI Slice via Gemini CLI | `cli://gemini` | not runnable here: the Gemini CLI on this machine is not logged in; the error message names the missing auth setting |

### Open issues

- **Restart the API service.** The service on port 18787 was started before this session's server changes (rename, error parsing). Stop it and run `npm run api` again. The automated session was not allowed to stop that process.
- **Retired Gemini vision models in the local settings.** Both vision configs (`gemini-2.0-flash`, `gemini-2.5-flash`) now return 404 from Google. Route Vision to `cli://claude` or create a config with a current model such as `models/gemini-3.8-flash`.
- **Gemini CLI** needs `gemini` login (or `GEMINI_API_KEY`) before `cli://gemini` works.
- **Not run**: "Generate Full Background" (image model inpaint) and transparency/SVG redraw on the example, to avoid spending image-model quota; Figma Desktop plugin import (needs a person at Figma).
- **Branch protection** for `main` still has to be set in GitHub Settings (no `gh` CLI on this machine).

### Next steps

1. Restart `npm run api`, re-run case 3 and confirm the UI shows "…no longer available".
2. Run "Generate Full Background" on the example and check both inpaint versions.
3. Import `examples/out-of-moves/*.fig` into Figma and check names, positions and text layers.
4. When the above is accepted, merge `dev/Hieuthu3` into `main` (see GITFLOW.md).

---

## 2026-10-19: UI redesign, CLI vision provider, English-only UI, CI

- Dark, Figma-style UI with a 3-step top bar (Load Image → AI Slice → Export), generation sidebar, canvas, and Slice Assets panel; colors are theme tokens that follow Figma's light/dark theme.
- `cli://claude` and `cli://gemini` vision providers: AI Slice and AI Layer Import without an API key.
- UI made English-only; the language switcher was removed (the Vietnamese dictionary is kept in `i18n.js` for a future switch).
- Removed an unused QR image, a manual Playwright probe and the old Chinese-named deploy scripts.
- Added GitHub Actions CI and GITFLOW.md; pushed `main` and `dev/Hieuthu3` to `Hieutapcode3/UILayerCraft`. CI green on both.