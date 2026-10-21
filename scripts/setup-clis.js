// Checks that the Claude, Codex and Gemini CLIs are installed and logged in. Missing CLIs are installed with npm,
// and a terminal window is opened for each login that is still needed. Run by menu.bat (option 1) and deploy-environment.command.
// Usage: node scripts/setup-clis.js [--check]   (--check only reports, it installs and opens nothing)
const { spawn, spawnSync } = require("node:child_process");
const { CLI_TOOLS, detectCliTools } = require("../src/server/services/cli-setup");

const checkOnly = process.argv.includes("--check");

function printStatus(tools) {
  for (const tool of tools) {
    const state = !tool.installed ? "not installed" : tool.loggedIn ? "ready" : "installed, not logged in";
    console.log(`  ${tool.label.padEnd(12)} ${state}${tool.version ? `  (${tool.version})` : ""}`);
  }
}

function install(tool) {
  console.log(`\nInstalling ${tool.label} (npm install -g ${tool.npmPackage})...`);
  const result = spawnSync(`npm install -g ${tool.npmPackage}`, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    console.log(`Could not install ${tool.label}.${process.platform === "win32" ? "" : " Try again with: sudo npm install -g " + tool.npmPackage}`);
  }
}

// Opens a new terminal window that runs the CLI's login, so the user can finish it in the browser.
function openLoginTerminal(tool) {
  if (tool.loginHint) console.log(`  ${tool.label}: ${tool.loginHint}`);
  const command = tool.loginCommand;
  if (process.platform === "win32") {
    spawn("cmd", ["/c", "start", `${tool.label} login`, "cmd", "/k", command], { detached: true, stdio: "ignore" }).unref();
  } else if (process.platform === "darwin") {
    spawn("osascript", ["-e", `tell application "Terminal" to do script "${command}"`], { detached: true, stdio: "ignore" }).unref();
  } else {
    const child = spawn("x-terminal-emulator", ["-e", command], { detached: true, stdio: "ignore" });
    child.on("error", () => console.log(`  Open a terminal and run: ${command}`));
    child.unref();
  }
  console.log(`  Opened a terminal for ${tool.label} login (${command}). Finish the login there.`);
}

console.log("Checking AI CLIs (Claude reads images, Codex generates and edits images, Gemini is a fallback)...");
let tools = detectCliTools();
printStatus(tools);

if (!checkOnly) {
  const missing = tools.filter((tool) => !tool.installed);
  for (const tool of missing) install(CLI_TOOLS.find((item) => item.name === tool.name));
  if (missing.length) {
    tools = detectCliTools();
    console.log("\nAfter installing:");
    printStatus(tools);
  }
  const needLogin = tools.filter((tool) => tool.installed && !tool.loggedIn);
  if (needLogin.length) console.log("\nSome CLIs still need a login:");
  for (const tool of needLogin) openLoginTerminal(CLI_TOOLS.find((item) => item.name === tool.name));
  if (needLogin.length) console.log("Restart this window after logging in so the API picks them up.");
}
console.log("");
