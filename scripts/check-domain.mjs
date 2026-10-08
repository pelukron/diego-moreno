import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rules = JSON.parse(readFileSync(join(root, "scripts/domain-rules.json"), "utf8"));
const errors = [];

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function clean(list) {
  return [...new Set(list.map((item) => String(item).trim()).filter(Boolean))];
}

function comparePublished(live, lint, deployOnly, lintOnly) {
  const liveSet = new Set(clean(live));
  const lintSet = new Set(clean(lint));
  const deployList = clean(deployOnly);
  const lintOnlyList = clean(lintOnly);
  const deploySet = new Set(deployList);
  const lintOnlySet = new Set(lintOnlyList);
  const found = [];
  for (const rel of deployList) {
    if (!liveSet.has(rel)) found.push(`deploy-only not on live site: ${rel}`);
    if (lintSet.has(rel)) found.push(`deploy-only also in lint set: ${rel}`);
  }
  for (const rel of lintOnlyList) {
    if (!lintSet.has(rel)) found.push(`lint-only not in lint set: ${rel}`);
    if (liveSet.has(rel)) found.push(`lint-only also on live site: ${rel}`);
  }
  for (const rel of liveSet) {
    if (!lintSet.has(rel) && !deploySet.has(rel)) found.push(`live site not in lint set: ${rel}`);
  }
  for (const rel of lintSet) {
    if (!liveSet.has(rel) && !lintOnlySet.has(rel)) found.push(`lint set not on live site: ${rel}`);
  }
  return found;
}

function roster(value, key) {
  if (!Array.isArray(value)) return { paths: [], error: `${key}: missing from domain-rules.json` };
  return { paths: value, error: null };
}

const publishedExamples = [
  {
    name: "legal",
    live: [".nojekyll", "index.html"],
    lint: ["index.html", "README.md"],
    deployOnly: [".nojekyll"],
    lintOnly: ["README.md"],
    want: [],
  },
  {
    name: "empty rosters when lists match",
    live: ["index.html"],
    lint: ["index.html"],
    deployOnly: [],
    lintOnly: [],
    want: [],
  },
  {
    name: "trim",
    live: [" .nojekyll "],
    lint: [],
    deployOnly: [".nojekyll"],
    lintOnly: [],
    want: [],
  },
  {
    name: "extra live",
    live: ["portrait.webp"],
    lint: [],
    deployOnly: [],
    lintOnly: [],
    want: ["live site not in lint set: portrait.webp"],
  },
  {
    name: "extra lint",
    live: [],
    lint: ["NOTES.md"],
    deployOnly: [],
    lintOnly: [],
    want: ["lint set not on live site: NOTES.md"],
  },
  {
    name: "stale deploy-only",
    live: [],
    lint: [],
    deployOnly: ["gone.txt"],
    lintOnly: [],
    want: ["deploy-only not on live site: gone.txt"],
  },
  {
    name: "stale lint-only",
    live: [],
    lint: [],
    deployOnly: [],
    lintOnly: ["gone.md"],
    want: ["lint-only not in lint set: gone.md"],
  },
  {
    name: "deploy-only also linted",
    live: [".nojekyll"],
    lint: [".nojekyll"],
    deployOnly: [".nojekyll"],
    lintOnly: [],
    want: ["deploy-only also in lint set: .nojekyll"],
  },
  {
    name: "lint-only also deployed",
    live: ["README.md"],
    lint: ["README.md"],
    deployOnly: [],
    lintOnly: ["README.md"],
    want: ["lint-only also on live site: README.md"],
  },
];

for (const ex of publishedExamples) {
  const got = comparePublished(ex.live, ex.lint, ex.deployOnly, ex.lintOnly);
  if (got.length !== ex.want.length || got.some((line, i) => line !== ex.want[i])) {
    errors.push(`published lists: example ${ex.name} got ${JSON.stringify(got)}, want ${JSON.stringify(ex.want)}`);
  }
}

const rosterExamples = [
  ["missing", undefined, "deployOnly", "deployOnly: missing from domain-rules.json"],
  ["not array", ".nojekyll", "lintOnly", "lintOnly: missing from domain-rules.json"],
  ["empty", [], "deployOnly", null],
];
for (const [name, value, key, want] of rosterExamples) {
  const got = roster(value, key);
  const gotError = got.error;
  if (gotError !== want) {
    errors.push(`published lists: roster ${name} got ${JSON.stringify(gotError)}, want ${JSON.stringify(want)}`);
  }
}

for (const rel of rules.requiredFiles) {
  if (!existsSync(join(root, rel))) errors.push(`missing required file: ${rel}`);
}

const pagesList = join(root, "scripts/pages-files.txt");
const live = existsSync(pagesList) ? clean(read("scripts/pages-files.txt").split(/\r?\n/)) : [];
if (!existsSync(pagesList)) errors.push("missing required file: scripts/pages-files.txt");
else {
  for (const rel of live) {
    if (!existsSync(join(root, rel))) errors.push(`pages artifact missing file: ${rel}`);
  }
}

const deployRoster = roster(rules.deployOnly, "deployOnly");
const lintOnlyRoster = roster(rules.lintOnly, "lintOnly");
if (deployRoster.error) errors.push(deployRoster.error);
if (lintOnlyRoster.error) errors.push(lintOnlyRoster.error);
const lint = Array.isArray(rules.publicFiles) ? rules.publicFiles : [];
errors.push(...comparePublished(live, lint, deployRoster.paths, lintOnlyRoster.paths));

for (const rel of clean(lint)) {
  if (!existsSync(join(root, rel))) {
    errors.push(`missing lint file: ${rel}`);
    continue;
  }
  const src = read(rel);
  for (const rule of rules.forbidden) {
    const re = new RegExp(rule.pattern, rule.flags || "");
    if (re.test(src)) errors.push(`${rel}: ${rule.message} (${rule.id})`);
  }
}

if (existsSync(join(root, "index.html"))) {
  const html = read("index.html");
  const order = rules.indexHtml.sectionOrder;
  for (let i = 1; i < order.length; i++) {
    const prev = html.indexOf(`id="${order[i - 1]}"`);
    const next = html.indexOf(`id="${order[i]}"`);
    if (prev < 0) errors.push(`index.html: missing id=${order[i - 1]}`);
    if (next < 0) errors.push(`index.html: missing id=${order[i]}`);
    if (prev >= 0 && next >= 0 && prev > next) {
      errors.push(`index.html: #${order[i - 1]} must come before #${order[i]}`);
    }
  }

  const lang = rules.indexHtml.lang;
  if (!new RegExp(`<html\\s+lang="${lang}"`, "i").test(html)) {
    errors.push(`index.html: first paint must be lang="${lang}"`);
  }

  for (const needle of rules.indexHtml.mustContain) {
    if (!html.includes(needle)) errors.push(`index.html: missing required string: ${needle}`);
  }
}

if (existsSync(join(root, "README.md"))) {
  const readme = read("README.md");
  for (const needle of rules.indexHtml.mustContain) {
    if (!readme.includes(needle)) {
      errors.push(`readme mustContain: README.md missing required string: ${needle}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`ok: domain lint ${clean(lint).length} public files, ${rules.forbidden.length} forbidden rules`);
