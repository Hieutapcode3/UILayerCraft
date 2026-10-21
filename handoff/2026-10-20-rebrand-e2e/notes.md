# 2026-10-20: Rebrand, real-image E2E runs, docs

Branch: `dev/Hieuthu3` (not merged into `main`).

### Done

- **Rebrand to UILayerCraft**: plugin name and id (`manifest.json`), package name/version `1.2.0` with author and repository, UI title, `.fig` default file name and plugin data id, simulator/build globals, server log line, deploy scripts.
- **Local data migration**: the history folder is now `.uilayercraft-history/`; on startup the server moves an existing `.image-to-slice-history/` there once, so saved drafts survive the rename.
- **Original author references removed** from README, docs, code defaults (an old third-party relay URL in the legacy config migration), and the README screenshots (replaced with screenshots of this build). `LICENSE` keeps the original MIT copyright line next to the new one, because the MIT license requires it.
- **README rewritten** for UILayerCraft, with a worked example and a vision-model comparison.
- **New docs**: `STANDARDS.md` and `HANDOFFS.md` (now split into [standards/](../../standards/README.md) and [handoff/](../README.md)).
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
4. When the above is accepted, merge `dev/Hieuthu3` into `main` (see [standards/git-flow.md](../../standards/git-flow.md)).
