# 2026-10-29: Generate UI makes 3 design options to pick from

Branch: `dev/Hieuthu3` (not committed).

### Done

- **Server** (`src/server/services/image-options.js`, used by `generateImage` and `editImage` in `src/server/index.js`): `payload.count` (1-4) options are requested at the same time, one call each (the Codex CLI and most providers return one image per call). Each prompt gets "Design option k of n: ... a distinct take on the layout, color palette and decoration". If some calls fail, the rest are returned with `failedCount`; only when all fail is the first error thrown.
- **UI** (`src/ui/app.js`): `currentCount` is 3. After Generate UI (text or image to image), the result area shows the options side by side ("Pick a design"). Clicking a preview shows it alone, larger; "Use this" keeps that option as the only result image and drops the others. `manifest.resultChoicePending` survives in the draft, so a reopened draft asks again. AI Slice and the import actions wait until a pick.
- `src/ui/styles.css`: `.result-choice*`. `dist/ui.html` rebuilt.

### Verification

- Sandbox: `tests/server/image-options.test.js` (3) pass. `ui-build.test.js`: 62 pass, 3 fail only because `src/plugin/main.js` and `fast-editable-html.js` were not copied to the sandbox.
- Layout checked in a Playwright screenshot with sample images.
- **Not run:** `npm test` on the device; a real Generate UI with Codex (3 Codex runs at once).

### Open issues

- 3 options cost 3 image calls of quota. The time is about the same as one, since they run at once.
