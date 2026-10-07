import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const i18n = readFileSync(join(root, "i18n.js"), "utf8");
const rules = JSON.parse(readFileSync(join(root, "scripts/domain-rules.json"), "utf8"));

function dictBlock(src, lang) {
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
  return src.slice(start + marker.length, end);
}

function dictMap(src, lang) {
  const block = dictBlock(src, lang);
  const map = new Map();
  for (const match of block.matchAll(/"([^"]+)":\s*"((?:\\.|[^"\\])*)"/g)) {
    map.set(match[1], match[2].replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
  }
  return map;
}

function i18nElements(src) {
  const found = [];
  const openRe = /<([a-zA-Z][\w-]*)(\s[^>]*?)?>/g;
  let match;
  while ((match = openRe.exec(src))) {
    const tag = match[1];
    const attrs = match[2] || "";
    if (match[0].endsWith("/>")) continue;
    const keyMatch = attrs.match(/\bdata-i18n="([^"]+)"/);
    if (!keyMatch) continue;
    const contentStart = openRe.lastIndex;
    const rest = src.slice(contentStart);
    const tokenRe = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi");
    let depth = 1;
    let innerEnd = -1;
    let token;
    while ((token = tokenRe.exec(rest))) {
      if (token[1] === "/") {
        depth--;
        if (depth === 0) {
          innerEnd = token.index;
          break;
        }
      } else if (!token[0].endsWith("/>")) {
        depth++;
      }
    }
    found.push({
      key: keyMatch[1],
      inner: innerEnd < 0 ? null : rest.slice(0, innerEnd),
    });
  }
  return found;
}

const htmlKeys = [...new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]))];
const es = dictMap(i18n, "es");
const en = dictMap(i18n, "en");
const errors = [];

for (const key of htmlKeys) {
  if (!es.has(key)) errors.push(`es missing HTML key: ${key}`);
  if (!en.has(key)) errors.push(`en missing HTML key: ${key}`);
}
for (const key of es.keys()) {
  if (!en.has(key)) errors.push(`en missing es key: ${key}`);
}
for (const key of en.keys()) {
  if (!es.has(key)) errors.push(`es missing en key: ${key}`);
}

const cvBodyPrefixes = rules.cvBodyPrefixes;
if (!Array.isArray(cvBodyPrefixes) || cvBodyPrefixes.length === 0) {
  errors.push("cvBodyPrefixes: missing from domain-rules.json");
} else {
  const covered = (key) =>
    cvBodyPrefixes.some((p) => {
      if (key === p) return true;
      if (!key.startsWith(p)) return false;
      if (p.endsWith(".")) return true;
      const next = key[p.length];
      return next >= "0" && next <= "9";
    });
  const prefixExamples = [
    ["g", true],
    ["g1", true],
    ["g10", true],
    ["goals", false],
    ["cv.p", true],
    ["cv.p1", true],
    ["cv.public", false],
    ["cv.intro", true],
    ["cv.introExtra", false],
    ["ind.", true],
    ["ind.h", true],
    ["ind.1", true],
    ["acc", true],
    ["acc1", true],
    ["accenture", false],
  ];
  for (const [key, want] of prefixExamples) {
    if (covered(key) !== want) {
      errors.push(`cvBodyPrefixes: example ${key} covered=${covered(key)}, want ${want}`);
    }
  }
  for (const key of new Set([...es.keys(), ...en.keys()])) {
    if (!covered(key)) continue;
    if (!es.has(key)) errors.push(`cvBodyPrefixes: missing es key ${key}`);
    else if (!en.has(key)) errors.push(`cvBodyPrefixes: missing en key ${key}`);
    else if (es.get(key) !== en.get(key)) {
      errors.push(`cvBodyPrefixes: es !== en for ${key}`);
    }
  }
}

for (const node of i18nElements(html)) {
  if (node.inner === null) {
    errors.push(`html-en parity: unclosed ${node.key}`);
    continue;
  }
  if (/<[a-zA-Z/!]/.test(node.inner)) {
    errors.push(`html-en parity: ${node.key} has element children`);
    continue;
  }
  if (!en.has(node.key)) continue;
  if (node.inner.trim() !== en.get(node.key)) {
    errors.push(`html-en parity: ${node.key} text !== en dict`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`ok: ${htmlKeys.length} HTML keys, ${es.size} dict keys (es=en)`);
