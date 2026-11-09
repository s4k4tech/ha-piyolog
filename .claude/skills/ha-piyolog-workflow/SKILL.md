---
name: ha-piyolog-workflow
description: Work on the ha-piyolog repository (a Home Assistant integration plus Lit dashboard cards for PiyoLog). Use it when changing the cards, taking the README screenshots with the mock harness, preparing or cutting a release (version bump, CHANGELOG, bundle, GitHub release), handling Dependabot PRs, or touching the GitHub repository settings (rulesets, security). Use it for requests such as "make a release", "update the screenshots", "merge the Dependabot PRs", "add an option to a card".
---

# ha-piyolog workflow

Project-specific procedures. The user's own rules still apply: work on `feature/*` branches, open PRs with `gh pr create`, commit and push only when asked, and merge or release only when the user says to. This skill never grants that permission by itself.

Never put a real PiyoLog feed URL, the child's real name or the user's email in a commit, a PR, a screenshot or a test. Sample names in docs and screenshots are 太郎 (Japanese) and John (English).

## Layout

- `custom_components/piyolog/`: the integration (Python). `manifest.json` carries the version.
- `frontend/`: the cards (TypeScript, Lit, esbuild, vitest). The built bundle is **committed** at `custom_components/piyolog/frontend/piyolog-card.js` so HACS users need no build.
- `frontend/harness/`: a mock `hass` for looking at the cards without Home Assistant.
- `docs/images/`: README screenshots, `<card>-<light|dark>-<en|ja>.png`.
- `README.md` and `README.ja.md` are kept in step. `CHANGELOG.md` is written by hand.

## Checks before a PR

```bash
.venv/bin/ruff check . && .venv/bin/ruff format --check .
.venv/bin/pytest
cd frontend && npm run typecheck && npm test && npm run build
git status --short custom_components   # a changed bundle must be committed
```

CI has two jobs, `python` and `frontend`. The frontend job fails when the committed bundle differs from a fresh build, so rebuild after every source change in `frontend/src`. These two job names are required status checks in the `main` ruleset: if you rename a job, change the ruleset too.

## Looking at a card

```bash
python3 -m http.server 8765      # from the repository root
# open http://localhost:8765/frontend/harness/index.html with these query parameters:
#   ?theme=dark  ?lang=en
#   ?card=summary|list|timeline|compact-formula|compact-sleep   (one card on its own)
#   ?list=1 (list card at its sections size)   ?custom=1 (customised items)
```

The harness fixes the clock at 14:30 JST on 2026-11-09, so screenshots are repeatable. Its `ha-icon` draws real Material Design Icons from a CDN, so it needs network.

## Screenshots for the README

```bash
.venv/bin/python .claude/skills/ha-piyolog-workflow/scripts/screenshots.py                 # all cards -> docs/images
.venv/bin/python .claude/skills/ha-piyolog-workflow/scripts/screenshots.py /tmp/out list   # one card, elsewhere
```

The script starts the server, takes headless Chrome shots at 2x (light and dark, English and Japanese) and crops them. It needs Pillow (`pip install pillow`) and Chrome (set `CHROME` if it is not at the macOS default path). Re-run it whenever a card's look changes, then check a few images by eye. README images are `<picture>` elements: the dark image is used under a dark theme.

When a PR changes how a card looks, attach screenshots with `gh pr create --body-file <file> --attach <image>`. The body refers to them as `![text](./image.png)`.

## README rules

- One section per card, each with an image, an options table and a YAML example.
- Use absolute URLs for images (`https://raw.githubusercontent.com/s4k4tech/ha-piyolog/main/docs/images/...`) and for links to other files in the repository (`https://github.com/s4k4tech/ha-piyolog/blob/main/...`). HACS shows the README outside GitHub and does not resolve relative paths, so relative images did not appear there. In-page `#anchor` links stay as they are.
- Sensor names in the README must match `custom_components/piyolog/translations/{en,ja}.json`. Check them, do not write them from memory.
- State only what was verified. The minimum Home Assistant version in `hacs.json` and the README is the oldest version the automated tests run on (currently 2025.4). The integration has been run on 2026.10.
- Anything the cards show must be something PiyoLog records or a plain summary of it. No predictions, and never "asleep": sleep is shown as the last Sleep/WakeUp record.

## Adding an option to a card

1. Add the item names to `frontend/src/items.ts` and validate them with `pickItems` in the card's `setConfig`. An unknown name must throw, which shows a configuration error on the card.
2. Render in the order given. An unset option shows the previous default, `[]` hides the part.
3. Add the option to the visual editor (`frontend/src/editor.ts`) and its labels to `frontend/src/i18n.ts` (both languages). `ha-form` returns the whole data object, so keep only this card's own keys when emitting `config-changed`.
4. Add a vitest case, update both READMEs, rebuild the bundle, retake the screenshots.

## Release

Releases are cut from `main` after the PR is merged. The version appears in three places, so bump them in the same PR:

- `custom_components/piyolog/manifest.json` (`version`)
- `pyproject.toml` (`version`)
- `CHANGELOG.md` (a new `## X.Y.Z` section on top)

`frontend/package.json` stays at `0.0.0`.

1. Branch `feature/...`, make the change, bump the version, push, open the PR.
2. Wait for CI on the **latest commit**. A bump commit starts a new run; a run may take a minute to appear, so wait until the PR's head SHA has finished checks instead of trusting an earlier green run.
3. Merge with `gh pr merge <n> --merge`, then `git checkout main && git pull --ff-only`.
4. `gh release create vX.Y.Z --target main --title "vX.Y.Z" --notes "..."`. HACS shows the new version after this.
5. Docs-only changes need no release.

Tags matching `v*` are protected by a ruleset: they cannot be moved or deleted, so double-check the version before creating one.

## Dependabot

Version updates run weekly for GitHub Actions, npm and pip. Actions are pinned by commit SHA with a version comment (the repository requires SHA pinning), and Dependabot keeps that form.

1. Look at each PR: `gh pr view <n> --json mergeable,statusCheckRollup,files`.
2. For an npm bump that could change the bundle, rebuild in a scratch copy with the PR's `package.json` and lockfile and compare it with the committed bundle (`cmp`). If it is identical, no release is needed.
3. Merge them one at a time. When one reports `CONFLICTING` after another merged, comment `@dependabot rebase` on it, wait for CI, then merge.
4. In zsh, write refs as `"${BRANCH}:path"`. `$BRANCH:path` is parsed as a modifier.

## Repository settings (already applied)

- Ruleset `protect-main`: no deletion or force push, PR required with 0 approvals (the owner works alone), required checks `python` and `frontend`. It applies to administrators too, so nothing reaches `main` without CI.
- Ruleset `protect-release-tags`: `v*` tags cannot be updated or deleted.
- Secret scanning with push protection, Dependabot alerts and security updates, private vulnerability reporting, SHA pinning required for Actions, branches deleted after merge.
- Actions: read-only default token, no PR approval by Actions, approval required for fork PRs from outside contributors.
- If someone else gets write access, raise the required approvals above 0.

Inspect the current state with `gh api repos/s4k4tech/ha-piyolog/rulesets` and `gh api repos/s4k4tech/ha-piyolog --jq .security_and_analysis`.
