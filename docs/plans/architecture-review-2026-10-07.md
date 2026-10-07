# Architecture review: backlog, CI, release, content (2026-10-07)

**Status:** documented, not implemented. Visual report (local only,
git-ignored): `.worktrees/architecture-review-20261007.html`.
**Backlog vehicle:** issue #19 (architecture audit index).
**Domain:** `CONTEXT.md`. No ADR is re-litigated here; C7 carries an
explicit ADR-conflict callout.

Hot spots from `git log`: `gate.yml` churn (permissions, staging,
dependabot pins), `domain-rules.json` growing as Gate data, README/CV
evidence sync. That set the scope: backlog, CI, release, content.

## Candidates

1. **Deepen the Pages staging module — Strong** (#33, ready-for-agent)
   `gate.yml:38-44`, `pages-files.txt`, `check-domain.mjs:17-23`.
   Gate promises existence, deploy flattens subdirs. Move staging into
   one Artifact script (`mkdir -p` per line). Unblocks the Credential
   portrait. Acceptance: root files unchanged, nested path preserved,
   `node scripts/gate.mjs` green.

2. **Deepen the CV-body English invariant — Strong** (Gate data line)
   `domain-rules.json:cvBodyKeys[18]`, `check-i18n.mjs:87-98`.
   Rule lives twice (comment + 18-string list). Replace with one prefix
   rule (`cv.*`, `g*`, `ind.*`). New bullets need zero Gate edits.

3. **Deepen the landing↔README evidence seam — Worth exploring**
   `index.html`, `i18n.js`, `README.md`, `check-domain.mjs:50-59`.
   Only 3 `mustContain` strings bind 3 adapters; README table passes
   the Gate on deletion. Teach the same module the evidence rows.

4. **Deepen the Gate entry module — Worth exploring**
   `bin/gate.sh`, `gate.mjs`, `gate.yml:23`. Shell wrapper is
   zero-depth; checkers re-read the same files. One canonical entry.

5. **Deepen the i18n parity module — Worth exploring**
   `check-i18n.mjs:100-113`. EN first-paint is forced, ES has no paint
   to compare, unkeyed chrome is invisible. Key every visible string.

6. **Split the indexHtml rule module — Worth exploring**
   `domain-rules.json:indexHtml`, `check-domain.mjs:34-52`.
   Hiring order (`#cv` before `#mentoria`) via substring any comment
   can satisfy; landing-only strings inexpressible. Split order vs
   presence, per-adapter needs.

7. **Time-box the Credential Claim — Speculative**
   `CONTEXT.md:Claim vs Gate`, #16. Liveness has no Gate seam by
   design; expired copy stays green. *Contradicts CONTEXT.md Avoid
   ("putting Claims in the Gate") — reopen only as a valid-through
   date line, never as truth certification.*

8. **Leave the backlog prose machine alone — Speculative**
   #19/#17/#16/#33. Roles-as-prose delete cleanly; one human adapter,
   hypothetical seam. No automation. Keep `gh issue view` as pointer.

## Order

C1 (#33) first — smallest interface change, executable acceptance —
then C2 in the same wave. Both are Gate data lines, not new tools.
C3–C6 when a real drift incident justifies them. C7 only if the L3
renewal forces the question. C8: do nothing.

## Out of scope

New tools, standing quality agents, Biome/Husky/npm, PDF dumps,
invented metrics or employers (ADR-0006), translating the CV body
(ADR-0007), splitting `index.html` into partials (ADR-0012).
