const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// Reads the claims of a JWT without verifying it; only used to show which account a CLI is signed in to.
function decodeJwtPayload(token) {
  const part = typeof token === "string" ? token.split(".")[1] : "";
  return part ? parseJson(Buffer.from(part, "base64url").toString("utf8")) : null;
}

const joinAccount = (email, extra) => (email ? `${email}${extra ? ` (${extra})` : ""}` : "");

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
    },
    // `claude auth status` prints the email for a claude.ai login; ~/.claude.json (written at login) is the fallback.
    getAccount: ({ run, env, homedir, readText }) => {
      const status = parseJson(run("claude", ["auth", "status"]).stdout) || {};
      const configFile = env.CLAUDE_CONFIG_DIR ? path.join(env.CLAUDE_CONFIG_DIR, ".claude.json") : path.join(homedir, ".claude.json");
      const saved = (parseJson(readText(configFile)) || {}).oauthAccount || {};
      const email = status.email || saved.emailAddress || "";
      const plan = status.subscriptionType || "";
      return email ? joinAccount(email, plan) : (status.authMethod ? `${status.authMethod} (no email available)` : "");
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
    },
    // A ChatGPT login keeps its id_token in auth.json (CODEX_HOME or ~/.codex); the email is a claim inside it.
    // An API-key login has no email. Tokens and keys are never returned or printed, only the email and plan.
    getAccount: ({ env, homedir, readText }) => {
      const auth = parseJson(readText(path.join(env.CODEX_HOME || path.join(homedir, ".codex"), "auth.json"))) || {};
      const claims = decodeJwtPayload(auth.tokens && auth.tokens.id_token) || {};
      const plan = (claims["https://api.openai.com/auth"] || {}).chatgpt_plan_type || "";
      if (claims.email) return joinAccount(claims.email, plan);
      return auth.OPENAI_API_KEY ? "API key (no email)" : "";
    }
  },
  {
    name: "gemini",
    label: "Gemini CLI",
    npmPackage: "@google/gemini-cli",
    loginCommand: "gemini",
    // Google no longer lets Gemini CLI run on a personal Google account sign-in (IneligibleTierError), so only an
    // API key counts: in the environment or in ~/.gemini/.env, which the CLI loads itself.
    loginHint: "Gemini CLI now needs an API key: create one at https://aistudio.google.com/apikey, save it as GEMINI_API_KEY=<key> in ~/.gemini/.env, then run gemini once and choose \"Use Gemini API key\" under /auth.",
    isLoggedIn: ({ env, homedir, readText }) => Boolean(env.GEMINI_API_KEY || env.GOOGLE_API_KEY)
      || /^\s*(GEMINI_API_KEY|GOOGLE_API_KEY)\s*=\s*\S/m.test(readText(path.join(homedir, ".gemini", ".env"))),
    // Only an API key counts as logged in (see above), and a key has no email.
    getAccount: () => "API key (no email)"
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

// An unreadable account must never break the status check.
function safeAccount(tool, context) {
  try {
    return tool.getAccount ? tool.getAccount(context) || "" : "";
  } catch {
    return "";
  }
}

// Which CLIs are installed and logged in on this machine. With withAccounts, each logged-in CLI also reports the
// account it uses (`account`, e.g. "me@example.com (max)"); the API server does not need that, so it is opt-in.
function detectCliTools({
  withAccounts = false,
  spawnSyncImpl = spawnSync,
  env = process.env,
  homedir = os.homedir(),
  readText = (file) => (fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "")
} = {}) {
  // Each command runs once per call: the login check and the account lookup share `claude auth status`.
  const cache = new Map();
  const run = (command, args) => {
    const key = [command, ...args].join(" ");
    if (!cache.has(key)) cache.set(key, runCommand(command, args, { spawnSyncImpl }));
    return cache.get(key);
  };
  return CLI_TOOLS.map((tool) => {
    const version = run(tool.name, ["--version"]);
    const installed = version.ok;
    const loggedIn = installed && tool.isLoggedIn({ run, env, homedir, readText });
    return {
      name: tool.name,
      label: tool.label,
      installed,
      version: installed ? version.stdout.trim().split(/\r?\n/)[0] : "",
      loggedIn,
      ...(withAccounts ? { account: loggedIn ? safeAccount(tool, { run, env, homedir, readText }) : "" } : {})
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
