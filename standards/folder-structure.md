# Folder Structure

Keep changes practical and avoid splitting files only to reduce line count.

## Repository

| Path | Contents |
|---|---|
| `AGENTS.md`, `CLAUDE.md` | Rules for coding agents |
| `docs/` | What the product is and how it works (`project-context.md`), README images |
| `standards/` | How changes are made: code style, folders, testing, security, Git flow |
| `handoff/` | One folder per work session or case: notes and evidence |
| `src/`, `scripts/`, `tests/` | Source (local API entry: `src/server/index.js`), build/setup scripts and the Vite config, tests |
| `dist/` | Build output, committed because Figma loads it |
| `examples/` | Example inputs and exported results |
| `menu.bat`, `deploy-environment.command` | Set up and start on Windows / macOS |

## Source map

- `src/core/`: Prompt builders and model-output parsers shared by server and UI (`slice-detection/`, `background-decomposition/`).
- `src/plugin/`: Figma main-thread code. Put Figma API calls, node creation, import validation, and import positioning here.
- `src/ui/app.js`: UI bootstrap and workflow orchestration. It may stay large when a flow is only used once.
- `src/ui/api/`: Browser-side API wrappers, provider config helpers, storage, and workspace draft calls.
- `src/ui/state/`: Reusable UI state rules and state transitions.
- `src/ui/services/`: Reusable business logic that does not belong to a single DOM view (for example `slice-layer-isolation.js`, which separates overlapping slices).
- `src/ui/renderers/`: Reusable DOM rendering helpers for panels, dialogs, lists, menus, and controls.
- `src/ui/ui.template.html`: Source UI shell. Keep script placeholders here.
- `src/ui/styles.css`: UI styles.
- `src/vendor/`: Third-party or Figma-provided browser scripts. Keep them local and build-time inlined.
- `src/server/index.js`: Local API entry (`npm run api`): config, workspace drafts, AI proxy requests, progress, and image processing. It keeps `.local-provider-config.json` and `.uilayercraft-history/` at the repository root.
- `src/server/`: Local API pieces: config, providers (HTTP and `cli://` CLIs), routes, services, storage.
- `src/fig-export/`, `src/simulator/`: `.fig` export and the simulated Figma used by `figma-sim.html`.
- `dist/ui.html`: Generated Figma UI artifact. Do not edit it directly.

## How to add features

1. Search for an existing helper, API wrapper, renderer, or state helper before adding new code.
2. If code is used once, it can stay near the workflow in `src/ui/app.js`.
3. If request, state, rendering, or service logic is reused or likely to be reused, put it in the matching module folder.
4. Do not duplicate backend request logic inside event handlers. Use `fetchBackend()` and existing API helpers.
5. Do not put Figma API code in UI files.
6. Do not dynamically load third-party scripts from remote URLs in the plugin UI. Put them in `src/vendor/`.
7. Do not hand-edit `dist/ui.html`; run `npm run build:ui` after UI source changes. A new file under `src/ui/services/` must also be listed in `scripts/build-ui-html.js`.
