const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  onState: (callback) => ipcRenderer.on("state", (_event, state) => callback(state)),
  ready: () => ipcRenderer.send("ready"),
  action: (name) => ipcRenderer.send("action", name)
});
