# Quality is a PR Gate, not an agent and not Biome

This repo stays zero-build HTML. Implementation quality is a deterministic Gate: `scripts/check-i18n.mjs` and `scripts/check-domain.mjs` on every pull request (GitHub Actions) and the same commands locally. No package.json, no Husky, no Biome.

Domain lint runs only on public site files (`index.html`, `i18n.js`, `README.md`, `404.html`), not on `CONTEXT.md` or ADRs that name forbidden terms on purpose.

Claims (C1, live L3, real portrait) stay human. Issue #3 is not this PR.

Rejected: standing quality agent, Biome/ESLint as the canonical linter, hooks as the only control, mixing credentials/portrait into the first CI PR.

Branch names include the issue number (`ci/4-pr-gates`).
