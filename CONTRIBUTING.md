# Contributing

Thanks for your interest. Bug reports and pull requests are welcome.

- Never paste a real feed URL into an issue, log or test. Use the fake secret in `tests/conftest.py`.
- This project only shows what PiyoLog records and simple summaries of it. Predictions and estimates are out of scope.
- Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:` ...).
- Work on a branch and open a pull request. CI must pass.

## Setup

```bash
python3.13 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/ruff check . && .venv/bin/ruff format --check .
.venv/bin/pytest

cd frontend && npm ci
npm run typecheck && npm test
npm run build   # rewrites the committed bundle; commit it with your change
```

CI fails if the committed bundle in `custom_components/piyolog/frontend/` does not match the sources.
