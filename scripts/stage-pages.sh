#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
dest="${1:-_site}"
list="${2:-scripts/pages-files.txt}"
mkdir -p "$dest"
while IFS= read -r f || [ -n "$f" ]; do
  f="${f%$'\r'}"
  [ -z "$f" ] && continue
  mkdir -p "$dest/$(dirname "$f")"
  cp "$f" "$dest/$f"
done < "$list"
