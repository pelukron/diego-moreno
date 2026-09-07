# Pages deploy needs Gate; public files only

GitHub Pages no longer deploys from the `master` branch in parallel with the Gate. One workflow runs `node scripts/gate.mjs`; the `deploy` job `needs: [gate]` and runs only on push to `master`.

The Pages artifact is the list in `scripts/pages-files.txt` (the landing), not the repo (no CONTEXT, docs, or scripts on the public site).

Rejected: legacy “deploy from branch” next to a decorative Gate, uploading the whole checkout.

Human: Settings → Pages → Source = GitHub Actions. Optional: require the `gate` check on `master`.
