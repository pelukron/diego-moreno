# Quality is a PR Gate, not an agent and not Biome

This repo stays zero-build HTML. Implementation quality is a deterministic Gate: `node scripts/gate.mjs` locally and on every pull request. That runner calls `check-i18n.mjs` and `check-domain.mjs`. Forbidden public strings and required facts (L3 id, verify URL, LinkedIn) live in `scripts/domain-rules.json` so a human can extend the Gate without rewriting the checker. No package.json, no Husky, no Biome.

Domain lint runs only on public site files listed in that JSON, not on `CONTEXT.md` or ADRs that name forbidden terms on purpose.

Claims (C1, live L3, real portrait) stay human. Issue #3 is not this PR.

Rejected: standing quality agent, Biome/ESLint as the canonical linter, hooks as the only control, mixing credentials/portrait into the first CI PR.

Branch names include the issue number (`ci/4-pr-gates`).
