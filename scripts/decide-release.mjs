import { execSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Decide the release plan behind one interface so release.yml stays thin.
// Usage: node scripts/decide-release.mjs --event <push|workflow_dispatch> [--tag-name <v*>] [--skip <true|false>]
// Emits plan (tag|retry|none) plus tag to $GITHUB_OUTPUT, or stdout locally.

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  if (i < 0 || i + 1 >= process.argv.length) return "";
  const value = process.argv[i + 1];
  return value.startsWith("-") ? "" : value;
}

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

const event = arg("event");
const tagName = arg("tag-name");
const skip = arg("skip");

let plan = "none";
let tag = "";

if (event === "workflow_dispatch" && tagName !== "") {
  plan = "retry";
  tag = tagName;
} else if (event === "push" || event === "workflow_dispatch") {
  if (skip !== "true") {
    const ym = new Date().toISOString().slice(0, 7).replace("-", ".");
    const count = git(`tag -l "v${ym}.*"`)
      .split("\n")
      .filter(Boolean).length;
    let n = count + 1;
    let candidate = `v${ym}.${n}`;
    while (true) {
      try {
        git(`rev-parse "${candidate}"`);
        n += 1;
        candidate = `v${ym}.${n}`;
      } catch {
        break;
      }
    }
    const headTagged = git("tag --points-at HEAD -l 'v*'") !== "";
    if (!headTagged) {
      plan = "tag";
      tag = candidate;
    }
  }
}

const out = `plan=${plan}\ntag=${tag}\n`;
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, out);
else process.stdout.write(out);
