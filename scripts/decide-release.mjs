import { execFileSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Decide the release plan behind one interface so release.yml stays thin.
// Usage: node scripts/decide-release.mjs --event <push|workflow_dispatch> [--tag-name <v*>] [--skip <true|false>]
// Emits plan (tag|retry|none) plus tag to $GITHUB_OUTPUT, or stdout locally.
// The next tag is max(numeric suffix) + 1, not tag count + 1, so holes
// (v2026.11.1, v2026.11.10) cannot make the version go backwards.

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  if (i < 0 || i + 1 >= process.argv.length) return "";
  const value = process.argv[i + 1];
  return value.startsWith("-") ? "" : value;
}

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
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
    const prefix = `v${ym}.`;
    const highest = git(["tag", "-l", `${prefix}*`])
      .split("\n")
      .filter(Boolean)
      .reduce((max, name) => {
        const suffix = name.slice(prefix.length);
        return /^\d+$/.test(suffix) ? Math.max(max, Number(suffix)) : max;
      }, 0);
    let n = highest + 1;
    let candidate = `${prefix}${n}`;
    while (true) {
      try {
        git(["rev-parse", "--verify", candidate]);
        n += 1;
        candidate = `${prefix}${n}`;
      } catch {
        break;
      }
    }
    const headTagged = git(["tag", "--points-at", "HEAD", "-l", "v*"]) !== "";
    if (!headTagged) {
      plan = "tag";
      tag = candidate;
    }
  }
}

const out = `plan=${plan}\ntag=${tag}\n`;
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, out);
else process.stdout.write(out);
