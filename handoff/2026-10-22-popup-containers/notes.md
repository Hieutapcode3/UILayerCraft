# 2026-10-22: Popup containers, text holes, icon rims, flat-UI tolerance

Branch: `dev/Hieuthu3` (not committed). Tested on the Setting popup (`aDemo.png`, 1242 × 2208), and re-checked on the Home and Level Failed screens.

| Problem | Cause | Fix |
|---|---|---|
| Popup frame and its "Setting" tab came out as two slices | AI split the container | Prompt: a popup is one panel with its tab and plain insets; parser merges a panel that sticks out above or below a wider panel into it (`mergeContainerTabs`) |
| Inner light-blue panel came out empty | Its color is ~31 from the frame, under the fixed 34 tolerance | Tolerance per layer from the noise around it: 20 on flat/smooth backgrounds, up to 34 on textured ones |
| Green showing inside the "o" of Continue and between letters | Holes are not connected to the box edge | Text: pixels matching the row's outside color are cleared anywhere (`clearTextHoles`) |
| Speaker icon kept arcs of the button rim | Icon box reaches the rim of the round button behind | Icons centred on a round layer: rim band cleared from the box edges (`clearRoundRimFromEdges`) |
| Dark yarn bits beside the tab | Textured background has many shades | Edge fill also clears colors nearer the background palette (sampled 6–10 px out) than the layer's core (`clearTexturedBackground`) |
| Grey blocks in the popup under the buttons | Hole fill pulled in the buttons' shadow | Spans whose two ends differ in color weigh much less |

Verified: `npm test` 640/640, build ok; E2E through the plugin UI and simulated Figma on the Setting popup (12 layers, composite matches the original). Open: the inner panel still shows faint circles where the toggle buttons cover it (guessed area; the Codex fix step redoes it). The AI sometimes keeps a toggle's icon inside the button.

### Docs reorganized

`HANDOFFS.md` became `handoff/` (one folder per case with `notes.md` and `evidence/`), `STANDARDS.md` and `GITFLOW.md` became `standards/` (split by topic), `PROJECT_OVERVIEW.md` became `docs/project-context.md`, `AGENTS.md` is now the entry point with the reading order, and `CLAUDE.md` was added. Layout modelled on the ls004-block-home project.

### Evidence

- [setting-compare.webp](evidence/setting-compare.webp)
- [setting-layers-before.webp](evidence/setting-layers-before.webp)
- [setting-layers-after.webp](evidence/setting-layers-after.webp)
