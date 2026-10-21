# Testing and Verification

## Unit tests

- Every bug fix gets a regression test in `tests/` (`*.test.js`, Node's built-in runner).
- New logic with branches, parsing or external calls gets a unit test; inject fakes (`fetchImpl`, `spawnImpl`) instead of calling real services in unit tests.
- The high-fidelity capture tests need Chromium once: `npx playwright install chromium`.

## Before pushing

```bash
npm run build
npm test
git diff --check
```

For small UI-only edits, at minimum:

```bash
npm run build:ui
node --check scripts/build-ui-html.js
git diff --check
```

## End-to-end checks

- Checks against real models are manual (they cost quota). Record what was run and the results in the case folder under [handoff/](../handoff/README.md), with screenshots in its `evidence/` folder.
- Slicing changes are checked on real screens, not only unit tests: run AI Slice through the plugin UI (`figma-sim.html` drives the real UI and a simulated Figma), import the slices, and compare the composite with the original image.
- Run E2E against a separate copy of the API (another port and folder), so the user's history and settings are not touched.
- A change to slicing must be re-checked on the earlier test screens too (listed in the latest handoff), because fixes for one screen often regress another.
