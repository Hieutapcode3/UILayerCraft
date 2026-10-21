# 2026-10-20 (2): AI Slice splits every layer and separates overlaps

Branch: `dev/Hieuthu3` (not committed).

### Done

- **Prompt** (`src/core/slice-detection/prompt-builder.js`, shared with the background plan): return every visual layer (buttons, counter pills, level nodes, tags, connectors, nav bar, text) in back-to-front order, with a `shape` (ellipse / capsule / free), full boxes for partly covered elements, no group boxes or cut-out pieces. New kinds: button, badge, text, panel, progress-bar.
- **Parser** drops cut-out pieces and duplicates (inner box sharing 3+ edges; progress bars exempt).
- **Layer isolation** (`src/ui/services/slice-layer-isolation.js`): front to back, hidden parts are rebuilt (mirror, ring, row/column fill), background and layers behind are cleared (outside colors per row/column, tolerance scaled for dark scenes), round shapes get a soft mask; boxes left with only background are dropped.
- **Reference background** for import is filled from the slices' real alpha instead of rectangle patches.
- **Overlay candidates** inside one slice or around several slices are skipped.
- **Simulator and .fig export** honor `group(nodes, parent, index)`; groups used to land on top and broke paint order.

### Verification

- `npm test`: 626 / 626 pass; `npm run build` ok; `git diff --check` clean.
- E2E (Playwright on `figma-sim.html`, `cli://claude`, separate API copy on port 18788 so the user's history was not touched):
  - FruitFlow home screen (1080 × 1920): 35 layers; the simulated Figma composite matches the original.
  - FruitFlow "aDemo lose.png": 84 to 92 layers; the composite matches, popup layers clean.

### Open issues

- Lose screen: the dimmed background behind the popup (grid tiles behind the truck's shadow) still comes out patchy, and from run to run the AI sometimes splits the truck illustration into pieces.
- Not tested in Figma Desktop itself; checked with the simulator and `.fig` export.
- The running API on port 18787 must be restarted to use the new prompt.

### Evidence

- [home-compare.webp](evidence/home-compare.webp)
- [home-ai-boxes.webp](evidence/home-ai-boxes.webp)
- [lose-compare.webp](evidence/lose-compare.webp)
