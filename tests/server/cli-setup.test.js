const test = require("node:test");
const assert = require("node:assert/strict");

const { detectCliTools, planCliTaskRouting } = require("../../src/server/services/cli-setup");

// Fake spawnSync: `answers` maps "command args" (as one line) to { status, stdout }.
function fakeSpawnSync(answers) {
  return (command, args) => {
    const line = Array.isArray(args) ? [command, ...args].join(" ") : command;
    const answer = answers[line];
    return answer ? { status: answer.status ?? 0, stdout: answer.stdout || "" } : { status: 1, stdout: "", error: new Error("not found") };
  };
}

test("detectCliTools reports installed and logged-in CLIs", () => {
  const tools = detectCliTools({
    spawnSyncImpl: fakeSpawnSync({
      "claude --version": { stdout: "2.1.302 (Claude Code)\n" },
      "claude auth status": { stdout: "{\"loggedIn\": true}" },
      "codex --version": { stdout: "codex-cli 0.163.0" },
      "codex login status": { status: 1, stdout: "Not logged in" },
      "gemini --version": { stdout: "0.64.0" }
    }),
    env: {},
    homedir: "/home/test",
    readText: () => ""
  });
  assert.deepEqual(tools.map(({ name, installed, loggedIn, version }) => ({ name, installed, loggedIn, version })), [
    { name: "claude", installed: true, loggedIn: true, version: "2.1.302 (Claude Code)" },
    { name: "codex", installed: true, loggedIn: false, version: "codex-cli 0.163.0" },
    { name: "gemini", installed: true, loggedIn: false, version: "0.64.0" }
  ]);
});

test("detectCliTools counts Gemini as ready only with an API key, not a Google account sign-in", () => {
  const spawnSyncImpl = fakeSpawnSync({ "gemini --version": { stdout: "0.65.0" } });
  const gemini = (options) => detectCliTools({ spawnSyncImpl, homedir: "/home/test", ...options }).find((tool) => tool.name === "gemini");
  // oauth_creds.json from a Google sign-in is no longer usable.
  assert.equal(gemini({ env: {}, readText: () => "" }).loggedIn, false);
  assert.equal(gemini({ env: { GEMINI_API_KEY: "key" }, readText: () => "" }).loggedIn, true);
  assert.equal(gemini({ env: {}, readText: (file) => (/\.gemini[\\/]\.env$/.test(file) ? "GEMINI_API_KEY=abc\n" : "") }).loggedIn, true);
  assert.equal(gemini({ env: {}, readText: () => "GEMINI_API_KEY=\n" }).loggedIn, false);
});

// A fake id_token: only the payload matters, the signature is never checked.
function fakeJwt(claims) {
  return ["header", Buffer.from(JSON.stringify(claims)).toString("base64url"), "signature"].join(".");
}

test("detectCliTools with accounts shows the email each logged-in CLI uses", () => {
  const calls = [];
  const answers = fakeSpawnSync({
    "claude --version": { stdout: "2.1.302 (Claude Code)" },
    "claude auth status": { stdout: "{\"loggedIn\": true, \"email\": \"claude.user@example.com\", \"subscriptionType\": \"max\"}" },
    "codex --version": { stdout: "codex-cli 0.163.0" },
    "codex login status": { stdout: "Logged in using ChatGPT" },
    "gemini --version": { stdout: "0.64.0" }
  });
  const codexAuth = JSON.stringify({
    OPENAI_API_KEY: null,
    tokens: { id_token: fakeJwt({ email: "codex.user@example.com", "https://api.openai.com/auth": { chatgpt_plan_type: "plus" } }), access_token: "secret-access-token" }
  });
  const tools = detectCliTools({
    withAccounts: true,
    spawnSyncImpl: (command, args) => {
      calls.push(Array.isArray(args) ? [command, ...args].join(" ") : command);
      return answers(command, args);
    },
    env: { GEMINI_API_KEY: "secret-key" },
    homedir: "/home/test",
    readText: (file) => (/[\\/]\.codex[\\/]auth\.json$/.test(file) ? codexAuth : "")
  });
  assert.deepEqual(tools.map(({ name, account }) => ({ name, account })), [
    { name: "claude", account: "claude.user@example.com (max)" },
    { name: "codex", account: "codex.user@example.com (plus)" },
    { name: "gemini", account: "API key (no email)" }
  ]);
  // The login check and the account lookup share one `claude auth status` call.
  assert.equal(calls.filter((line) => line === "claude auth status").length, 1);
  // Tokens and keys never reach the result.
  assert.ok(!JSON.stringify(tools).includes("secret"));
});

test("detectCliTools account falls back to ~/.claude.json, honours CODEX_HOME and handles API-key or unreadable logins", () => {
  const spawnSyncImpl = fakeSpawnSync({
    "claude --version": { stdout: "2.1.302" },
    "claude auth status": { stdout: "{\"loggedIn\": true}" },
    "codex --version": { stdout: "codex-cli 0.163.0" },
    "codex login status": { stdout: "Logged in using an API key" },
    "gemini --version": { stdout: "0.64.0" }
  });
  const read = (files) => (file) => files[file.replace(/\\/g, "/")] || "";
  const detect = (options) => Object.fromEntries(detectCliTools({ withAccounts: true, spawnSyncImpl, homedir: "/home/test", env: {}, ...options }).map((tool) => [tool.name, tool.account]));

  const saved = detect({
    readText: read({
      "/home/test/.claude.json": JSON.stringify({ oauthAccount: { emailAddress: "saved@example.com" } }),
      "/home/test/.codex/auth.json": JSON.stringify({ OPENAI_API_KEY: "sk-secret" })
    })
  });
  assert.equal(saved.claude, "saved@example.com");
  assert.equal(saved.codex, "API key (no email)");
  assert.equal(saved.gemini, "");

  const custom = detect({
    env: { CLAUDE_CONFIG_DIR: "/cfg/claude", CODEX_HOME: "/cfg/codex" },
    readText: read({
      "/cfg/claude/.claude.json": JSON.stringify({ oauthAccount: { emailAddress: "custom@example.com" } }),
      "/cfg/codex/auth.json": JSON.stringify({ tokens: { id_token: fakeJwt({ email: "codex.custom@example.com" }) } })
    })
  });
  assert.equal(custom.claude, "custom@example.com");
  assert.equal(custom.codex, "codex.custom@example.com");

  // Broken files do not throw; the account is just empty.
  const broken = detect({ readText: () => "not json" });
  assert.equal(broken.claude, "");
  assert.equal(broken.codex, "");
});

test("detectCliTools leaves out accounts unless asked, so the API server start stays cheap", () => {
  const tools = detectCliTools({ spawnSyncImpl: fakeSpawnSync({ "claude --version": { stdout: "2.1.302" }, "claude auth status": { stdout: "{\"loggedIn\": true}" } }), env: {}, homedir: "/home/test", readText: () => "" });
  assert.ok(tools.every((tool) => !("account" in tool)));
});

test("planCliTaskRouting gives unrouted tasks to Claude for reading and Codex for images", () => {
  let next = 0;
  const createId = () => `cfg_${++next}`;
  const ready = [
    { name: "claude", loggedIn: true },
    { name: "codex", loggedIn: true },
    { name: "gemini", loggedIn: true }
  ];
  const plan = planCliTaskRouting({ modelConfigs: [], taskRouting: { vision: null, generation: null, inpaint: null } }, ready, createId);
  assert.deepEqual(plan.assigned, [
    { cli: "claude", tasks: ["vision"] },
    { cli: "codex", tasks: ["generation", "inpaint"] }
  ]);
  assert.deepEqual(plan.state.taskRouting, { vision: "cfg_1", generation: "cfg_2", inpaint: "cfg_2" });
  assert.equal(plan.state.modelConfigs[1].baseUrl, "cli://codex");

  // Tasks the user already routed stay as they are; nothing to do returns null.
  assert.equal(planCliTaskRouting(plan.state, ready, createId), null);
  const userRouted = { modelConfigs: [{ id: "api", baseUrl: "https://api.openai.com", tasks: ["generation", "inpaint"] }], taskRouting: { vision: null, generation: "api", inpaint: "api" } };
  assert.deepEqual(planCliTaskRouting(userRouted, ready, createId).assigned, [{ cli: "claude", tasks: ["vision"] }]);

  // Without Claude, Gemini reads images; without Codex, image tasks stay unrouted.
  const onlyGemini = planCliTaskRouting({ modelConfigs: [], taskRouting: {} }, [{ name: "gemini", loggedIn: true }, { name: "claude", loggedIn: false }], createId);
  assert.deepEqual(onlyGemini.assigned, [{ cli: "gemini", tasks: ["vision"] }]);
});
