# CLAUDE.md — Claude adapter

@AGENTS.md

`AGENTS.md` holds the project rules. This file only adds how Claude works in this repository.

## Working style

- Talk to the user in Vietnamese; keep technical terms in English (slice, inpaint, flood fill, manifest…).
- When the task is clear, implement it without re-planning or waiting for confirmation; ask only for the cases in `AGENTS.md §5`.
- Report outcome first, with evidence (test counts, screenshots), and say plainly what was not checked.

## Tools and environment

- Windows with Git Bash and PowerShell. `.bat` files need CRLF; edit them with care.
- Temporary files (test servers, E2E output, comparison sheets) go in the session scratchpad, never in the repository.
- For E2E, copy `src/`, `dist/`, `package.json` and `figma-sim.html` into a scratchpad folder and run `node src/server/index.js` there on another port (for example `PORT=18788`), so `.uilayercraft-history/` and the user's settings are untouched (the server keeps them next to `package.json`). Drive `figma-sim.html` with Playwright (`node_modules/playwright`).
- To check slicing quality, look at the slices yourself: render them on a checkerboard and compare a composite of the imported slices with the original image.
- Local AI CLIs: `cli://claude` reads images, `cli://codex` generates and edits them; `node scripts/setup-clis.js --check` shows what is installed and logged in.

## Handoff

At the start of a session read the newest case in `handoff/`. During the session keep its `notes.md` current, and copy the key screenshots into its `evidence/` (WebP, about 1600 px wide).
