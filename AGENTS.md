# AGENTS.md — UILayerCraft

UILayerCraft is a Figma plugin with a local Node API: it slices a flat UI image into separate PNG layers (or editable layers / HTML) with a vision model, and imports them into Figma. This file is the entry point for every coding agent (Codex, Claude, others). Agent-specific files such as `CLAUDE.md` only add how that agent works; they do not fork these rules.

## 1. Read first, in this order

1. `AGENTS.md`: this file.
2. [docs/project-context.md](docs/project-context.md): what the product does, features, stack, workflow.
3. [standards/folder-structure.md](standards/folder-structure.md): where each kind of code goes.
4. [handoff/README.md](handoff/README.md), then the newest case's `notes.md`: current state, open issues, test screens.
5. The rest of [standards/](standards/README.md) when the task touches it (testing, security, Git).

Start from the files the task names; do not scan the whole repository.

## 2. Folders

| Folder | Holds | Changes when |
|---|---|---|
| `docs/` | What the product is and how it works | A feature or the architecture changes |
| `standards/` | Rules for every session: code style, folders, testing, security, Git | A rule changes |
| `handoff/` | One folder per session or case: `notes.md` + `evidence/` | Every session |

## 3. Always

- Reuse an existing helper, API wrapper, renderer or state module before adding code ([standards/folder-structure.md](standards/folder-structure.md)).
- Keep Figma API code in `src/plugin/`, backend calls behind `fetchBackend()`, third-party browser scripts in `src/vendor/`.
- Never hand-edit `dist/`; rebuild with `npm run build`.
- Verify before reporting done: `npm run build`, `npm test`, `git diff --check` ([standards/testing.md](standards/testing.md)). Slicing changes also get an E2E run on the test screens listed in [handoff/README.md](handoff/README.md).
- Keep the session's handoff case up to date while working: create `handoff/YYYY-MM-DD-topic/` from `handoff/_template/`, add it to the table in `handoff/README.md`, and put screenshots in its `evidence/`.

## 4. Never

- Commit `.local-provider-config.json` or `.uilayercraft-history/`, or print API keys ([standards/security-and-data.md](standards/security-and-data.md)).
- Change the user's model settings or drafts during tests; use a separate copy of the API.
- Commit to `main` directly or force-push it ([standards/git-flow.md](standards/git-flow.md)).
- Reintroduce the old `Image To Slice` name or non-English UI text ([standards/code-style.md](standards/code-style.md)).

## 5. Ask the user before

- Changing the slice manifest or `.fig` format that saved drafts and Figma imports depend on.
- Spending real model quota on long batch runs, or installing software globally.
- Deleting user data, history or Git history.
