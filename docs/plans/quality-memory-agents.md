# Parked: quality Gate, memory, agents

**Status:** parked — not this PR (`ci/8-pages-needs-gate`).  
**Domain:** `CONTEXT.md`. Prefer a new line in `scripts/domain-rules.json` or `scripts/pages-files.txt` over a new tool.

## Do later

1. **Branch protection (human, Settings)**  
   `master`: require a pull request and required status check `gate`. Without this, a red PR can still merge.

2. **Grow the Gate as data**  
   New forbidden copy or required public string → `scripts/domain-rules.json`. New file on the live site (e.g. `portrait.webp` in issue #3) → `scripts/pages-files.txt` and required-files. No Biome, no Playwright, no extra npm.

3. **Thin `AGENTS.md` (own small PR)**  
   ~20 lines of pointers only: read `CONTEXT.md`; run `node scripts/gate.mjs`; follow `docs/plans/*`; branch `kind/<issue>-slug`; never push `master`. That is session memory, not a standing bot. Makes the public “AI-pod” claim true for this repo.

4. **Issue #3** — `feat/3-credentials-and-portrait`  
   Follow `docs/plans/credentials-and-portrait.md`. Human steps first (LinkedIn C1, live L3, real photo).

## Do not

Standing quality agent, Grok Bot on the page, graphify, Husky-as-source-of-truth, formatter-as-quality. **Claim** (C1, L3 still live, real portrait) stays human; the Gate does not certify the CV is true.
