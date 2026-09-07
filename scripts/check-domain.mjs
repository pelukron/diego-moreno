import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicFiles = ["index.html", "i18n.js", "README.md", "404.html"];
const errors = [];

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

for (const rel of publicFiles) {
  const src = read(rel);
  if (/\bACC\b/.test(src)) errors.push(`${rel}: forbidden employer abbreviation ACC`);
  if (/Interview\s*\/\s*Lead/i.test(src)) errors.push(`${rel}: Interview/Lead is not a product on this URL`);
}

const html = read("index.html");
const cv = html.indexOf('id="cv"');
const mentoria = html.indexOf('id="mentoria"');
if (cv < 0 || mentoria < 0) errors.push("index.html: missing id=cv or id=mentoria");
else if (cv > mentoria) errors.push("index.html: #cv must come before #mentoria (Hiring owns the URL)");

if (!/<html\s+lang="en"/i.test(html)) errors.push('index.html: first paint must be lang="en"');

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`ok: domain lint ${publicFiles.length} public files`);
