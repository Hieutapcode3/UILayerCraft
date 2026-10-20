# Standards

Rules for changing UILayerCraft. [AGENTS.md](AGENTS.md) has the source map and where each kind of code belongs; this file covers how changes are made, tested and shipped.

## Product rules

- **Name**: the product is `UILayerCraft` (package `uilayercraft`, plugin id `uilayercraft`). Do not reintroduce the old `Image To Slice` / `image-to-slice` names, except where code migrates old local data (`.image-to-slice-history/`).
- **Language**: the UI ships in English only. Every visible string, `title`, `placeholder` and `aria-label` is English. New template strings get a `data-i18n` key in the `en-US` block of `src/ui/services/i18n.js`.
- **No Chinese text in source files.** Tests that need CJK input use `\uXXXX` escapes. `tests/ui-i18n.test.js` guards the translation tables.
- **Slice names** returned by models must be English `snake_case`; the prompts in `src/core/*/prompt-builder.js` enforce this.

## Code

- Follow the placement rules in AGENTS.md: Figma API only in `src/plugin/`, backend calls only through `fetchBackend()` and `src/ui/api/`, third-party browser scripts only in `src/vendor/`.
- Reuse an existing helper, renderer or state module before adding one. Code used once may stay in `src/ui/app.js`.
- Colors come from the theme tokens at the top of `src/ui/styles.css` (`--surface`, `--ink`, `--brand`, `--danger-soft`…). Do not add hard-coded hex colors; the tokens follow Figma's light/dark theme.
- Keep every element `id` that `app.js` looks up when you move markup in `ui.template.html`.
- Model providers: HTTP providers go through `src/server/providers/provider-http-client.js`; local CLIs through `src/server/providers/cli-chat-client.js` (`cli://<name>`, vision only).
- Comments explain *why*, not what. One line is usually enough.

## Generated files

- `dist/ui.html`, `dist/code.js`, `dist/figma-sim.js` are build output but committed, because Figma loads them from the repo. Never edit them by hand; run `npm run build` and commit the result. CI fails when `dist/` does not match the sources.
- Line endings are LF in the repository (`.gitattributes`); `.bat` files are CRLF.

## Tests

- Every bug fix gets a regression test in `tests/` (`*.test.js`, Node's built-in runner).
- New logic with branches, parsing or external calls gets a unit test; inject fakes (`fetchImpl`, `spawnImpl`) instead of calling real services in unit tests.
- Before pushing:

  ```bash
  npm run build
  npm test
  git diff --check
  ```

- The high-fidelity capture tests need Chromium once: `npx playwright install chromium`.
- End-to-end checks against real models are manual (they cost quota); record what was run and the results in [HANDOFFS.md](HANDOFFS.md).

## Security and data

- Never commit `.local-provider-config.json` (API keys) or `.uilayercraft-history/` (user images and drafts); both are git-ignored.
- Never print API keys in logs, tests, screenshots or docs.
- E2E runs must not change the user's model settings permanently: create a temporary config, route to it, and restore the original routing afterwards.

## Git

Branches, commit messages and releases follow [GITFLOW.md](GITFLOW.md): work on `dev/Hieuthu3`, merge into `main` only when a feature is declared done.

## Handoffs

At the end of a work session, update [HANDOFFS.md](HANDOFFS.md): what changed, what was verified and how, known issues, and the next steps. Newest session first.
