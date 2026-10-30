# UILayerCraft desktop (tray app)

Runs the local API in the background with a tray icon, so nobody needs a terminal.

## Build the installer (Windows only, once per release)

```
npm install                # project root
cd desktop
npm install
npm run dist               # builds dist/, bundles this machine's node.exe, writes release/UILayerCraft Setup x.y.z.exe
```

Send that `.exe` to teammates. It installs per user (no admin), starts with Windows and lives in the tray.
Settings and drafts are kept in `%APPDATA%\uilayercraft-desktop\data`, so reinstalling never wipes them.

## Run without installing

```
cd desktop && npm install && npm start
```

## Still needed on each machine

Claude Code / Codex CLI logged in (or an OpenAI-compatible API key set in the plugin), and Playwright Chromium only for high-fidelity capture.

## Figma plugin on each machine (once)

The app copies the plugin to `Documents\UILayerCraft-Plugin` on every launch (menu: Open plugin folder).
In Figma Desktop: Plugins > Development > Import plugin from manifest... > select `manifest.json` there.
Later app updates refresh those files automatically; no re-import needed.
