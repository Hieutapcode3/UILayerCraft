# Handoff

Progress log for UILayerCraft. One folder per work session or case, named `YYYY-MM-DD-short-topic`. Each folder holds:

- `notes.md`: what changed, how it was verified, open issues, next steps. Start from [_template/notes.md](_template/notes.md).
- `evidence/` (optional): screenshots, comparison sheets, test output that back up the notes.

Update the case's notes while working, not only at the end. Rules that apply to every session belong in [standards/](../standards/README.md), not here.

## Cases (newest first)

| Case | Topic | Status |
|---|---|---|
| [2026-10-22-popup-containers](2026-10-22-popup-containers/notes.md) | Popup containers, text holes, icon rims, flat-UI tolerance | Done, not committed |
| [2026-10-21-codex-cli-setup](2026-10-21-codex-cli-setup/notes.md) | Codex CLI for images, CLI setup script, automatic task routing | Done; real Codex image generation blocked by the account |
| [2026-10-20-layer-split](2026-10-20-layer-split/notes.md) | AI Slice splits every layer and separates overlaps | Done |
| [2026-10-20-rebrand-e2e](2026-10-20-rebrand-e2e/notes.md) | Rebrand, real-image E2E runs, docs | Done |
| [2026-10-19-ui-redesign-cli-vision](2026-10-19-ui-redesign-cli-vision/notes.md) | UI redesign, CLI vision provider, English-only UI, CI | Done |

## Test screens

Slicing changes are re-checked on these screens (see [standards/testing.md](../standards/testing.md)):

| Screen | What it exercises | Last result |
|---|---|---|
| FruitFlow Home (1080 × 1920) | Many overlapping small layers: coin + plus badge, counter pills, level nodes, tags | 35 layers, composite matches |
| FruitFlow "aDemo lose" | Popup over a dimmed game board; illustration with cargo | 16 layers, dimmed board stays background |
| Yarn puzzle "Setting" popup (1242 × 2208) | Container with title tab and inset, round toggles, text on gradient buttons | 12 layers, composite matches |
