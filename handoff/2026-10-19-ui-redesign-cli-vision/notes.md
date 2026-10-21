# 2026-10-19: UI redesign, CLI vision provider, English-only UI, CI

- Dark, Figma-style UI with a 3-step top bar (Load Image → AI Slice → Export), generation sidebar, canvas, and Slice Assets panel; colors are theme tokens that follow Figma's light/dark theme.
- `cli://claude` and `cli://gemini` vision providers: AI Slice and AI Layer Import without an API key.
- UI made English-only; the language switcher was removed (the Vietnamese dictionary is kept in `i18n.js` for a future switch).
- Removed an unused QR image, a manual Playwright probe and the old Chinese-named deploy scripts.
- Added GitHub Actions CI and GITFLOW.md (now [standards/git-flow.md](../../standards/git-flow.md)); pushed `main` and `dev/Hieuthu3` to `Hieutapcode3/UILayerCraft`. CI green on both.
