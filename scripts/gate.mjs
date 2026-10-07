import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const checks = ["check-i18n.mjs", "check-domain.mjs"];

let firstCode = 0;
for (const file of checks) {
  const result = spawnSync(process.execPath, [join(dir, file)], { stdio: "inherit" });
  const code = result.status ?? 1;
  if (firstCode === 0 && code !== 0) firstCode = code;
}

if (firstCode !== 0) process.exit(firstCode);

console.log("ok: gate");
