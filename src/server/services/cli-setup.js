const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

// The AI CLIs this tool can drive without API keys, in order of preference for reading images.
// Claude reads images best; Codex also has a built-in image generation tool.
const CLI_TOOLS = [
  {
    name: "claude",
    label: "Claude Code",
    npmPackage: "@anthropic-ai/claude-code",
    loginCommand: "claude",
    isLoggedIn: ({ run }) => {
      const result = run("claude", ["auth", "status"]);
      return result.ok && /"loggedIn"\s*:\s*true/.test(result.stdout);
    }
  },
  {
    name: "codex",
    label: "Codex CLI",
    npmPackage: "@openai/codex",
    loginCommand: "codex login",
    isLoggedIn: ({ run }) => {
      const result = run("codex", ["login", "status"]);
      return result.ok && /logged in/i.test(`${result.stdout}${result.stderr}`);
    }
  },
  {
    name: "gemini",
    label: "Gemini CLI",
    npmPackage: "@google/gemini-cli",
    loginCommand: "gemini",
    isLoggedIn: ({ env, homedir, existsSync }) => Boolean(env.GEMINI_API_KEY || env.GOOGLE_API_KEY)
      || existsSync(path.join(homedir, ".gemini", "oauth_creds.json"))
  }
];

function runCommand(command, args, { spawnSyncImpl = spawnSync } = {}) {
  // npm-installed CLIs are .cmd shims on Windows, which only start through the shell; args are fixed flags.
  const options = { encoding: "utf8", windowsHide: true, timeout: 30000 };
  const result = process.platform === "win32"
    ? spawnSyncImpl([command, ...args].join(" "), { ...options, shell: true })
    : spawnSyncImpl(command, args, options);
  return {
    ok: !result.error && result.status === 0,
    stdout: String(result.stdout || ""),
    stderr: String(result.stderr || "")
  };
}

// Which CLIs are installed and logged in on this machine.
function detectCliTools({
  spawnSyncImpl = spawnSync,
  env = process.env,
  homedir = os.homedir(),
  existsSync = fs.existsSync
} = {}) {
  const run = (command, args) => runCommand(command, args, { spawnSyncImpl });
  return CLI_TOOLS.map((tool) => {
    const version = run(tool.name, ["--version"]);
    const installed = version.ok;
    return {
      name: tool.name,
      label: tool.label,
      installed,
      version: installed ? version.stdout.trim().split(/\r?\n/)[0] : "",
      loggedIn: installed && tool.isLoggedIn({ run, env, homedir, existsSync })
    };
  });
}

// Gives tasks that have no model yet to a logged-in CLI: reading images to Claude (then Gemini, then Codex),
// image generation and inpainting to Codex. Tasks the user already routed are left alone. Returns the new state
// and what was assigned, or null when nothing changes.
function planCliTaskRouting(state, tools, createId) {
  const ready = new Set(tools.filter((tool) => tool.loggedIn).map((tool) => tool.name));
  const configs = [...(state.modelConfigs || [])];
  const taskRouting = { ...(state.taskRouting || {}) };
  const assigned = [];
  const useCli = (name, tasks) => {
    const baseUrl = `cli://${name}`;
    let config = configs.find((item) => item.baseUrl === baseUrl && tasks.every((task) => item.tasks.includes(task)));
    if (!config) {
      config = { id: createId(), name: "", baseUrl, apiKey: "", model: "default", timeoutMs: 500000, tasks, testResults: {} };
      configs.push(config);
    }
    tasks.forEach((task) => { taskRouting[task] = config.id; });
    assigned.push({ cli: name, tasks });
  };
  if (!taskRouting.vision) {
    const reader = ["claude", "gemini", "codex"].find((name) => ready.has(name));
    if (reader) useCli(reader, ["vision"]);
  }
  if (!taskRouting.generation && !taskRouting.inpaint && ready.has("codex")) {
    useCli("codex", ["generation", "inpaint"]);
  }
  if (assigned.length === 0) return null;
  return { state: { ...state, modelConfigs: configs, taskRouting }, assigned };
}

module.exports = {
  CLI_TOOLS,
  detectCliTools,
  planCliTaskRouting
};
