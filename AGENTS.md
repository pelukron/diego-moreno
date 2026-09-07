# Agents

Read `CONTEXT.md` before changing public copy, domain terms, or Gate rules.

## Gate

Quality is `node scripts/gate.mjs` (i18n + domain lint). A new forbidden string or required public fact goes in `scripts/domain-rules.json`. A new live-site file goes in `scripts/pages-files.txt`. Claims (C1, live L3, real portrait) stay human.

## Ship

Branch `kind/<issue>-slug` from current `master`. Open a pull request. The `gate` check must pass. Plans live in `docs/plans/` — follow the one that matches the issue.

Never push `master`. Prefer a Gate data line over a new tool. No standing quality agent, Biome, Husky, or npm.
