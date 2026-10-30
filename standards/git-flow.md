# Git Flow

This repository uses two long-lived branches and nothing else.

| Branch | Purpose | Who writes to it |
|---|---|---|
| `dev/Hieuthu3` | Day-to-day development. Every change lands here first. | Direct commits and pushes |
| `main` | Released, working code only. | Merges from `dev/Hieuthu3` when a feature is declared done |

CI (`.github/workflows/ci.yml`) runs on every push to either branch and on every pull request into `main`: install, build, check that the committed `dist/` matches the sources, then `npm test`.

## Daily work on `dev/Hieuthu3`

```bash
git switch dev/Hieuthu3
git pull --rebase origin dev/Hieuthu3

# ...edit...
npm run build          # dist/ is committed, so rebuild after source changes
npm test
git add -A
git commit -m "feat(ui): short description"
git push origin dev/Hieuthu3
```

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `ci`, with an optional scope such as `ui`, `server`, `plugin`.

## Releasing a finished feature to `main`

Only when the feature is declared done, and only when CI on `dev/Hieuthu3` is green:

```bash
git switch main
git pull --ff-only origin main
git merge --no-ff dev/Hieuthu3 -m "merge: <feature name> from dev/Hieuthu3"
npm test
git push origin main
git switch dev/Hieuthu3
```

`--no-ff` keeps one merge commit per released feature, so `git log --first-parent main` reads as a release history. Alternatively open a pull request `dev/Hieuthu3 → main` on GitHub and merge it there; CI runs on the pull request.

To tag a release, bump `version` in `package.json` on `dev/Hieuthu3` first, then after the merge:

```bash
git tag -a v1.2.0 -m "v1.2.0"
git push origin v1.2.0
```

## Rules

- Never commit directly to `main`; it only receives merges from `dev/Hieuthu3`.
- Never force-push `main`.
- Never commit `.local-provider-config.json` (API keys) or `.uilayercraft-history/`; both are in `.gitignore`.

## Recommended GitHub settings

In **Settings → Branches → Add branch ruleset** for `main`: require a pull request (or restrict pushes to yourself), require the `CI / test` status check, and block force pushes.
