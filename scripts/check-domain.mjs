import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rules = JSON.parse(readFileSync(join(root, "scripts/domain-rules.json"), "utf8"));
const errors = [];

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

for (const rel of rules.requiredFiles) {
  if (!existsSync(join(root, rel))) errors.push(`missing required file: ${rel}`);
}

const pagesList = join(root, "scripts/pages-files.txt");
if (!existsSync(pagesList)) errors.push("missing required file: scripts/pages-files.txt");
else {
  for (const rel of read("scripts/pages-files.txt").split(/\r?\n/).filter(Boolean)) {
    if (!existsSync(join(root, rel))) errors.push(`pages artifact missing file: ${rel}`);
  }
}

for (const rel of rules.publicFiles) {
  const src = read(rel);
  for (const rule of rules.forbidden) {
    const re = new RegExp(rule.pattern, rule.flags || "");
    if (re.test(src)) errors.push(`${rel}: ${rule.message} (${rule.id})`);
  }
}

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

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`ok: domain lint ${rules.publicFiles.length} public files, ${rules.forbidden.length} forbidden rules`);
