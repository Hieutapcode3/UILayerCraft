# 2026-10-21: Codex CLI for images, CLI setup script, automatic task routing

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

### Evidence

- [home-auto-fix-compare.webp](evidence/home-auto-fix-compare.webp)
