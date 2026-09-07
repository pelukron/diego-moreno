import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const i18n = readFileSync(join(root, "i18n.js"), "utf8");

function dictKeys(src, lang) {
  const marker = `${lang}: {`;
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`missing dict: ${lang}`);
  let depth = 1;
  let end = start + marker.length;
  for (; end < src.length; end++) {
    const ch = src[end];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  const block = src.slice(start + marker.length, end);
  return new Set([...block.matchAll(/"([^"]+)":/g)].map((m) => m[1]));
}

const htmlKeys = [...new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]))];
const es = dictKeys(i18n, "es");
const en = dictKeys(i18n, "en");
const errors = [];

for (const key of htmlKeys) {
  if (!es.has(key)) errors.push(`es missing HTML key: ${key}`);
  if (!en.has(key)) errors.push(`en missing HTML key: ${key}`);
}
for (const key of es) {
  if (!en.has(key)) errors.push(`en missing es key: ${key}`);
}
for (const key of en) {
  if (!es.has(key)) errors.push(`es missing en key: ${key}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`ok: ${htmlKeys.length} HTML keys, ${es.size} dict keys (es=en)`);
