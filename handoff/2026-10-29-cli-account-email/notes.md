# 2026-10-29: Show the account email in "Check CLI accounts"

Branch: `dev/Hieuthu3` (not committed). Request: `start.bat` option 3 should show which account (email) Claude Code, Codex CLI and Gemini CLI are using.

### Done

- `src/server/services/cli-setup.js`: each CLI gets `getAccount`; `detectCliTools({ withAccounts: true })` adds an `account` string for logged-in CLIs. Off by default, so the API server start is unchanged.
  - Claude Code: `email` and `subscriptionType` from `claude auth status`; fallback `oauthAccount.emailAddress` in `~/.claude.json` (or `$CLAUDE_CONFIG_DIR/.claude.json`).
  - Codex CLI: `codex login status` has no email, so the email and plan are read from the `id_token` claims in `~/.codex/auth.json` (or `$CODEX_HOME`). An API-key login shows `API key (no email)`.
  - Gemini CLI: only an API key counts as logged in, so it shows `API key (no email)`.
  - Tokens and keys are never returned or printed, only the email and plan. Every command runs once per check (the login test and the account lookup share `claude auth status`).
- `scripts/setup-clis.js`: prints `account: ...` under each logged-in CLI (`unknown (could not read the account)` if it cannot be read).
- `start.bat`: option 3 now only calls `node scripts\setup-clis.js --check`; the raw `claude auth status` / `codex login status` output it used to print is replaced by this summary. File kept CRLF.

### Verification

- `node --test tests/server/cli-setup.test.js`: 6 / 6 pass (3 new: email per CLI, fallbacks and `CODEX_HOME`, accounts off by default).
- Smoke run of `node scripts/setup-clis.js --check` with fake `claude` / `codex` executables and a fake `auth.json`: shows both emails.
- Not run: `npm run build`, full `npm test`, `git diff --check`, and the real CLIs on the user's machine (no shell there in this session). `dist/` is unaffected (server and script files only).

### Open issues

- Real output of `claude auth status` and the shape of the real `~/.codex/auth.json` were taken from the CLIs' documented formats, not from the user's machine. If an account shows `unknown`, check those two sources first.

### Next steps

1. Run `start.bat`, choose 3, and confirm both emails look right.
2. `npm test`, `npm run build`, `git diff --check` before committing.
