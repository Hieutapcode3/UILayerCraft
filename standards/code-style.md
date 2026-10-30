# Code Style

Rules for writing code in UILayerCraft. Where each kind of code belongs is in [folder-structure.md](folder-structure.md).

## Product rules

- **Name**: the product is `UILayerCraft` (package `uilayercraft`, plugin id `uilayercraft`). Do not reintroduce the old `Image To Slice` / `image-to-slice` names, except where code migrates old local data (`.image-to-slice-history/`).
- **Language**: the UI ships in English only. Every visible string, `title`, `placeholder` and `aria-label` is English. New template strings get a `data-i18n` key in the `en-US` block of `src/ui/services/i18n.js`.
- **No Chinese text in source files.** Tests that need CJK input use `\uXXXX` escapes. `tests/ui-i18n.test.js` guards the translation tables.
- **Slice names** returned by models must be English `snake_case`; the prompts in `src/core/*/prompt-builder.js` enforce this.

## Code

- Reuse an existing helper, renderer or state module before adding one. Code used once may stay in `src/ui/app.js`.
- Colors come from the theme tokens at the top of `src/ui/styles.css` (`--surface`, `--ink`, `--brand`, `--danger-soft`…). Do not add hard-coded hex colors; the tokens follow Figma's light/dark theme.
- Keep every element `id` that `app.js` looks up when you move markup in `ui.template.html`.
- Model providers: HTTP providers go through `src/server/providers/provider-http-client.js`; local CLIs through `src/server/providers/cli-chat-client.js` (`cli://<name>`). Claude and Gemini CLIs only read images; Codex CLI also generates and edits them (`cli-image-client.js`).
- Comments explain *why*, not what. One line is usually enough.

## Generated files

- `dist/ui.html`, `dist/code.js`, `dist/figma-sim.js` are build output but committed, because Figma loads them from the repo. Never edit them by hand; run `npm run build` and commit the result. CI fails when `dist/` does not match the sources.
- Line endings are LF in the repository (`.gitattributes`); `.bat` files are CRLF.
