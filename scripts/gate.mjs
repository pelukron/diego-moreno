import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const checks = ["check-i18n.mjs", "check-domain.mjs"];

for (const file of checks) {
  const result = spawnSync(process.execPath, [join(dir, file)], { stdio: "inherit" });
  const code = result.status ?? 1;
  if (code !== 0) process.exit(code);
}

console.log("ok: gate");
