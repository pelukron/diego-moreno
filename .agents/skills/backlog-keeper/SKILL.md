---
name: backlog-keeper
description: Run this repo's GitHub backlog so it stays coherent. Roles, mirror labels, branches, PR bodies, close-out comments.
---

# Backlog keeper

GitHub issues are the backlog. Coherence is data and prose, not memory:
every state lives in the issue body **and** a mirror label, kept in sync
by whoever edits the issue (usually an agent following this skill; the
`backlog` workflow only writes close-out comments).

## Roles (body line + mirror label, always both)

| `Role:` line | Mirror label | Meaning |
|---|---|---|
| `ready-for-agent` | `ready-for-agent` | Problem, solution, acceptance complete. Pick up. |
| `ready-for-human` | `ready-for-human` | Blocked on a human step (Claim, photo, login, decision). Agents do not implement. |
| `needs-info` | `needs-info` | Blocked on numbers/answers owed in an issue comment. |

No mirror label: index/tracking issues (e.g. #19) and questions awaiting
triage. Never invent a new role; use the three above.

## Issue anatomy

Every actionable issue carries, in this order:

1. `Role: <one of the three>` as the first line.
2. `Blocked by:` line (`none`, or `#n` / "numbers in a comment of this issue").
3. `## Problem`, `## Solution` (one paragraph each, plain language).
4. `## Acceptance criteria` (checkboxes a human can verify).
5. `## Out of scope` (what this issue will not do).
6. `## Pointers` (CONTEXT.md terms, ADRs, plans, related issues).

When the state changes, edit the `Role:` line **and** swap the mirror
label in the same pass. Record load-bearing refinements as an issue
comment (e.g. why a blanket rule is wrong), never silently.

## Branches and PRs

- Branch `kind/<issue>-slug` from current `master` (`ci/`, `docs/`, `fix/`). Never push `master`.
- PR title ends with `(#n)`. Body: what changed + how it was verified + `Closes #n` (or `Refs #n` when the issue must stay open).
- The `gate` check must pass. Claims (C1, live L3, real portrait) stay human.

## Close-out (what the bot writes)

On merge, the `backlog` workflow comments on each linked issue and on
the PR: merged PR + branch + merge SHA, `gate` check conclusion, and
the issue's unchecked acceptance boxes as human-verification pending.
It then strips the mirror labels (`ready-for-agent`, `ready-for-human`,
`needs-info`) only when that issue is closed, so a `Refs` link does not
clear the role on an issue that stays open.
It never checks acceptance boxes. If the trail is missing (no
`Closes/Refs #n`), it stays silent.

## Troubleshooting (self-improving log)

Append every new incident as: date, symptom, cause, rule. The log is
the fix; a fix without a log entry will repeat.

- 2026-10-07 · Backlog job red with `fatal: not a git repository`.
  Cause: `gh` resolves the repo from the git remote and the job has no
  checkout step. Rule: every workflow `gh` call gets its repo from
  `GH_REPO: ${{ github.repository }}` (or `-R`); never assume checkout.
- 2026-10-07 · `gh pr checks --json` has no `conclusion` field (only
  `name`, `state`, ...). Cause: assumed GitHub API shape. Rule:
  dry-run new `gh` fields against a real PR before shipping a workflow.
- 2026-10-07 · Closed #33 and #40 kept `ready-for-agent` (stale tags).
  Cause: sync was one-directional (open only). Rule: close-out strips
  mirror labels; sync runs both directions.
- 2026-10-07 · Local PowerShell breaks `gh --jq` with spaces/braces
  and `python -c` quoting. Cause: shell quoting, not `gh`. Rule: keep
  inline commands quote-simple; anything complex goes in a `.worktrees/`
  script file run with `bash`.
- 2026-10-07 · Full `skills update -g` exceeded the 120s tool timeout
  with a partial update applied. Cause: too much work per call. Rule:
  rerun with a 600s timeout or update per package; verify via
  `updatedAt` in `.skill-lock.json`.
- 2026-10-08 · Open #16 lost `ready-for-human` after PR #58 (`Refs`, not
  `Closes`). Cause: close-out stripped mirror labels on every linked
  issue. Rule: strip only when the issue state is `CLOSED`.
