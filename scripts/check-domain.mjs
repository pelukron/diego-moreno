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

function checkPlacement({ facts, regions, sources, lintSet }) {
  const found = [];
  if (!Array.isArray(facts)) return ["requiredFacts: missing from domain-rules.json"];
  const regionMap = regions && typeof regions === "object" && !Array.isArray(regions) ? regions : {};
  const sourceMap = sources && typeof sources === "object" && !Array.isArray(sources) ? sources : {};
  const lint = lintSet instanceof Set ? lintSet : new Set(Array.isArray(lintSet) ? lintSet : []);
  const seen = new Set();

  facts.forEach((fact, i) => {
    const label = `requiredFacts[${i}]`;
    if (!fact || typeof fact !== "object" || Array.isArray(fact)) {
      found.push(`${label}: must be an object`);
      return;
    }
    const id = typeof fact.id === "string" ? fact.id.trim() : "";
    const text = typeof fact.text === "string" ? fact.text : "";
    const tag = id ? ` (${id})` : "";
    if (!id) found.push(`${label}: missing id`);
    else if (seen.has(id)) found.push(`${label}: duplicate id "${id}"`);
    else seen.add(id);
    if (!text) {
      found.push(`${label}${tag}: missing text`);
      return;
    }
    const placements = Array.isArray(fact.placements) ? fact.placements : [];
    if (!placements.length) {
      found.push(`${label}${tag}: no placements`);
      return;
    }
    placements.forEach((placement, j) => {
      const plabel = `${label}.placements[${j}]`;
      if (!placement || typeof placement !== "object" || Array.isArray(placement)) {
        found.push(`${plabel}: must be an object`);
        return;
      }
      const artifact = typeof placement.artifact === "string" ? placement.artifact.trim() : "";
      const region = typeof placement.region === "string" ? placement.region.trim() : "";
      if (!artifact) {
        found.push(`${plabel}: missing artifact`);
        return;
      }
      if (!lint.has(artifact)) {
        found.push(`${plabel}: artifact is not in the lint set: ${artifact}`);
        return;
      }
      if (!region) {
        found.push(`${plabel}: missing region`);
        return;
      }
      const source = sourceMap[artifact];
      if (typeof source !== "string") {
        found.push(`${artifact}: source not read`);
        return;
      }
      if (region === "any") {
        if (!source.includes(text)) {
          found.push(`${artifact}: required public fact${id ? ` "${id}"` : ""} missing from anywhere`);
        }
        return;
      }
      const bounds = regionMap[artifact] && regionMap[artifact][region];
      if (!bounds || typeof bounds !== "object" || Array.isArray(bounds)) {
        found.push(`${artifact}: unknown region "${region}"`);
        return;
      }
      const start = typeof bounds.start === "string" ? bounds.start : "";
      const end = typeof bounds.end === "string" ? bounds.end : "";
      if (!start) {
        found.push(`${artifact}: region "${region}" missing start marker`);
        return;
      }
      if (!end) {
        found.push(`${artifact}: region "${region}" missing end marker`);
        return;
      }
      const startAt = source.indexOf(start);
      if (startAt < 0) {
        found.push(`${artifact}: region "${region}" start marker not found: ${JSON.stringify(start)}`);
        return;
      }
      const endAt = source.indexOf(end, startAt + start.length);
      if (endAt < 0) {
        found.push(`${artifact}: region "${region}" end marker not found: ${JSON.stringify(end)}`);
        return;
      }
      if (!source.slice(startAt, endAt).includes(text)) {
        found.push(`${artifact}: required public fact${id ? ` "${id}"` : ""} missing from ${region}`);
      }
    });
  });
  return found;
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

const placementExamples = [
  {
    name: "in region",
    facts: [{ id: "id", text: "X", placements: [{ artifact: "a.html", region: "r" }] }],
    regions: { "a.html": { r: { start: "START", end: "END" } } },
    sources: { "a.html": "START X END" },
    lintSet: new Set(["a.html"]),
    want: [],
  },
  {
    name: "outside region",
    facts: [{ id: "id", text: "X", placements: [{ artifact: "a.html", region: "r" }] }],
    regions: { "a.html": { r: { start: "START", end: "END" } } },
    sources: { "a.html": "X START END" },
    lintSet: new Set(["a.html"]),
    want: ['a.html: required public fact "id" missing from r'],
  },
  {
    name: "missing start",
    facts: [{ id: "id", text: "X", placements: [{ artifact: "a.html", region: "r" }] }],
    regions: { "a.html": { r: { start: "NOPE", end: "END" } } },
    sources: { "a.html": "START X END" },
    lintSet: new Set(["a.html"]),
    want: ['a.html: region "r" start marker not found: "NOPE"'],
  },
  {
    name: "missing end",
    facts: [{ id: "id", text: "X", placements: [{ artifact: "a.html", region: "r" }] }],
    regions: { "a.html": { r: { start: "START", end: "NOPE" } } },
    sources: { "a.html": "START X END" },
    lintSet: new Set(["a.html"]),
    want: ['a.html: region "r" end marker not found: "NOPE"'],
  },
  {
    name: "any",
    facts: [{ id: "id", text: "X", placements: [{ artifact: "a.html", region: "any" }] }],
    regions: {},
    sources: { "a.html": "X" },
    lintSet: new Set(["a.html"]),
    want: [],
  },
  {
    name: "multi artifact",
    facts: [
      {
        id: "id",
        text: "X",
        placements: [
          { artifact: "a.html", region: "r" },
          { artifact: "b.md", region: "r" },
        ],
      },
    ],
    regions: {
      "a.html": { r: { start: "S", end: "E" } },
      "b.md": { r: { start: "S", end: "E" } },
    },
    sources: { "a.html": "S X E", "b.md": "S X E" },
    lintSet: new Set(["a.html", "b.md"]),
    want: [],
  },
  {
    name: "unknown region",
    facts: [{ id: "id", text: "X", placements: [{ artifact: "a.html", region: "r" }] }],
    regions: { "a.html": {} },
    sources: { "a.html": "START X END" },
    lintSet: new Set(["a.html"]),
    want: ['a.html: unknown region "r"'],
  },
  {
    name: "artifact not in lint set",
    facts: [{ id: "id", text: "X", placements: [{ artifact: "a.html", region: "r" }] }],
    regions: { "a.html": { r: { start: "START", end: "END" } } },
    sources: { "a.html": "START X END" },
    lintSet: new Set(),
    want: ["requiredFacts[0].placements[0]: artifact is not in the lint set: a.html"],
  },
];

for (const ex of placementExamples) {
  const got = checkPlacement({
    facts: ex.facts,
    regions: ex.regions,
    sources: ex.sources,
    lintSet: ex.lintSet,
  });
  if (got.length !== ex.want.length || got.some((line, i) => line !== ex.want[i])) {
    errors.push(`required facts: example ${ex.name} got ${JSON.stringify(got)}, want ${JSON.stringify(ex.want)}`);
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
}

const factSources = new Set();
if (Array.isArray(rules.requiredFacts)) {
  for (const fact of rules.requiredFacts) {
    if (!fact || !Array.isArray(fact.placements)) continue;
    for (const placement of fact.placements) {
      if (placement && typeof placement.artifact === "string" && placement.artifact.trim()) {
        factSources.add(placement.artifact.trim());
      }
    }
  }
}

const factSourceText = {};
for (const rel of factSources) {
  if (!existsSync(join(root, rel))) {
    errors.push(`missing required fact file: ${rel}`);
    continue;
  }
  factSourceText[rel] = read(rel);
}

errors.push(
  ...checkPlacement({
    facts: rules.requiredFacts,
    regions: rules.regions,
    sources: factSourceText,
    lintSet: new Set(clean(lint)),
  }),
);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const factCount = Array.isArray(rules.requiredFacts) ? rules.requiredFacts.length : 0;
const placementCount = Array.isArray(rules.requiredFacts)
  ? rules.requiredFacts.reduce(
      (total, fact) => total + (fact && Array.isArray(fact.placements) ? fact.placements.length : 0),
      0,
    )
  : 0;

console.log(
  `ok: domain lint ${clean(lint).length} public files, ${rules.forbidden.length} forbidden rules, ${factCount} required facts, ${placementCount} placements`,
);
