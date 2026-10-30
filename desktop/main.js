const { app, BrowserWindow, Tray, Menu, shell, nativeImage, ipcMain } = require("electron");
const { spawn } = require("child_process");
const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = Number(process.env.PORT || 18787);
const MAX_RESTARTS = 5;

if (!app.requestSingleInstanceLock()) {
  app.quit();
  return;
}

const packaged = app.isPackaged;
const serverRoot = packaged ? path.join(process.resourcesPath, "server") : path.resolve(__dirname, "..");
const nodeBin = packaged ? path.join(process.resourcesPath, "node.exe") : process.env.NODE_BIN || "node";
// Packaged installs keep settings and drafts in %APPDATA%, so updates and reinstalls never wipe them.
const dataDir = packaged ? path.join(app.getPath("userData"), "data") : serverRoot;
const logFile = path.join(app.getPath("userData"), "server.log");

// Figma imports the plugin from a manifest, so we keep a copy in an easy-to-find folder
// and refresh it on every launch (updates reach Figma without re-importing).
const pluginDir = path.join(app.getPath("documents"), "UILayerCraft-Plugin");

function syncPlugin() {
  try {
    const manifest = packaged ? path.join(process.resourcesPath, "plugin", "manifest.json") : path.join(serverRoot, "manifest.json");
    const dist = packaged ? path.join(process.resourcesPath, "plugin", "dist") : path.join(serverRoot, "dist");
    fs.mkdirSync(path.join(pluginDir, "dist"), { recursive: true });
    fs.copyFileSync(manifest, path.join(pluginDir, "manifest.json"));
    for (const name of ["code.js", "ui.html"]) {
      fs.copyFileSync(path.join(dist, name), path.join(pluginDir, "dist", name));
    }
  } catch (error) {
    fs.appendFileSync(logFile, `Plugin copy failed: ${error.message}\n`);
  }
}

let tray = null;
let win = null;
let child = null;
let status = "starting"; // starting | running | external | stopped | failed
let restarts = 0;
let quitting = false;

function checkHealth() {
  return new Promise((resolve) => {
    const req = http.get({ host: "127.0.0.1", port: PORT, path: "/health", timeout: 1500 }, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
  });
}

function setStatus(next) {
  status = next;
  refreshTray();
}

async function startServer() {
  if (child) return;
  // A dev server (npm run api) may already own the port; reuse it instead of fighting over it.
  if (await checkHealth()) {
    setStatus("external");
    return;
  }
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
  fs.mkdirSync(dataDir, { recursive: true });
  const log = fs.openSync(logFile, "a");
  setStatus("starting");
  child = spawn(nodeBin, [path.join(serverRoot, "src", "server", "index.js")], {
    cwd: serverRoot,
    env: { ...process.env, PORT: String(PORT), UILAYERCRAFT_DATA_DIR: dataDir },
    windowsHide: true,
    stdio: ["ignore", log, log]
  });
  child.on("error", () => {
    child = null;
    setStatus("failed");
  });
  child.on("exit", () => {
    child = null;
    if (quitting) return;
    if (restarts < MAX_RESTARTS) {
      restarts += 1;
      setStatus("starting");
      setTimeout(startServer, 2000);
    } else {
      setStatus("failed");
    }
  });
  waitUntilReady();
}

async function waitUntilReady() {
  for (let i = 0; i < 40 && child; i += 1) {
    if (await checkHealth()) {
      restarts = 0;
      setStatus("running");
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

function stopServer() {
  if (!child) return;
  const proc = child;
  child = null;
  proc.removeAllListeners("exit");
  proc.kill();
}

function restartServer() {
  stopServer();
  restarts = 0;
  setTimeout(startServer, 500);
}

const LABELS = {
  starting: "Starting…",
  running: "Running",
  external: "Running (started elsewhere)",
  stopped: "Stopped",
  failed: "Failed to start – open the log"
};

function pushState() {
  if (win && !win.isDestroyed()) win.webContents.send("state", { status, label: LABELS[status], port: PORT });
}

function showWindow() {
  if (win && !win.isDestroyed()) {
    if (win.isMinimized()) win.restore();
    win.show();
    win.focus();
    return;
  }
  win = new BrowserWindow({
    width: 520,
    height: 420,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    title: "UILayerCraft",
    icon: path.join(__dirname, "build", "icon.png"),
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, sandbox: true }
  });
  win.loadFile(path.join(__dirname, "status.html"));
  win.on("closed", () => {
    win = null;
  });
}

ipcMain.on("ready", pushState);
ipcMain.on("action", (_event, name) => {
  if (name === "restart") restartServer();
  else if (name === "log") shell.openPath(logFile);
  else if (name === "plugin") shell.openPath(pluginDir);
  else if (name === "data") shell.openPath(dataDir);
  else if (name === "hide" && win) win.close();
  else if (name === "quit") app.quit();
});

function refreshTray() {
  pushState();
  if (!tray) return;
  tray.setToolTip(`UILayerCraft API: ${LABELS[status]}`);
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: `UILayerCraft API – ${LABELS[status]}`, enabled: false },
      { label: "Show window", click: showWindow },
      { label: `http://127.0.0.1:${PORT}`, enabled: false },
      { type: "separator" },
      { label: "Restart server", click: restartServer },
      { label: "Open plugin folder", click: () => shell.openPath(pluginDir) },
      { label: "Open log", click: () => shell.openPath(logFile) },
      { label: "Open data folder", click: () => shell.openPath(dataDir) },
      {
        label: "Start with Windows",
        type: "checkbox",
        checked: app.getLoginItemSettings().openAtLogin,
        click: (item) => app.setLoginItemSettings({ openAtLogin: item.checked })
      },
      { type: "separator" },
      { label: "Quit (stops the API)", click: () => app.quit() }
    ])
  );
}

app.on("window-all-closed", (event) => event.preventDefault());
app.on("second-instance", showWindow);
app.on("before-quit", () => {
  quitting = true;
  stopServer();
});

app.whenReady().then(() => {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
  syncPlugin();
  const icon = nativeImage.createFromPath(path.join(__dirname, "build", "icon.png")).resize({ width: 16, height: 16 });
  tray = new Tray(icon);
  // First run: register auto-start once; the tray checkbox lets the user turn it off afterwards.
  if (packaged && !fs.existsSync(path.join(app.getPath("userData"), ".autostart-set"))) {
    app.setLoginItemSettings({ openAtLogin: true });
    fs.mkdirSync(app.getPath("userData"), { recursive: true });
    fs.writeFileSync(path.join(app.getPath("userData"), ".autostart-set"), "1");
  }
  tray.on("click", showWindow);
  refreshTray();
  showWindow();
  startServer();
});
