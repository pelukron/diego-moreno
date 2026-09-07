# Quality Gate, memory, agents

**Status:** Gate, Pages-after-gate, and the `master Gate` ruleset are live. Leftovers below.  
**Domain:** `CONTEXT.md`. Prefer a new line in `scripts/domain-rules.json` or `scripts/pages-files.txt` over a new tool.

## Done

1. **Branch protection** — repository ruleset `master Gate`: require a pull request and required status check `gate`.
3. **Thin `AGENTS.md`** — pointers only; session memory, not a standing bot.

## Standing

2. **Grow the Gate as data**  
   New forbidden copy or required public string → `scripts/domain-rules.json`. New file on the live site (e.g. `portrait.webp` in issue #3) → `scripts/pages-files.txt`. No Biome, no Playwright, no extra npm.

## Do later

4. **Issue #3** — `feat/3-credentials-and-portrait`  
   Follow `docs/plans/credentials-and-portrait.md`. Human steps first (LinkedIn C1, live L3, real photo).

## Do not

Standing quality agent, Grok Bot on the page, graphify, Husky-as-source-of-truth, formatter-as-quality, public semver on the landing. **Claim** (C1, L3 still live, real portrait) stays human; the Gate does not certify the CV is true.

If the live HTML must be proven to match a merge SHA (Pages debug, not marketing), stamp `$GITHUB_SHA` in the deploy job. Until that pain exists, skip.
