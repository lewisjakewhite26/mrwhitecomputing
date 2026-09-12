#!/bin/bash
# Extract all text from every .pptx/.docx in a lesson source folder into one .txt file.
# Usage: dump-lesson.sh "<lesson source dir>" "<output txt file>"
set -e
SRC="$1"
OUT="$2"
TOOLS_DIR="$(cd "$(dirname "$0")" && pwd)"
TMP=$(mktemp -d)
: > "$OUT"

find "$SRC" \( -iname "*.pptx" -o -iname "*.docx" \) | sort | while read -r f; do
  base=$(basename "$f")
  ext="${base##*.}"
  work="$TMP/$(echo "$base" | tr -cd '[:alnum:]')"
  mkdir -p "$work"
  unzip -oq "$f" -d "$work"
  echo "" >> "$OUT"
  echo "############################################################" >> "$OUT"
  echo "FILE: $f" >> "$OUT"
  echo "############################################################" >> "$OUT"
  node "$TOOLS_DIR/extract-office-text.js" "$work" "$ext" >> "$OUT" 2>>"$OUT"
done

rm -rf "$TMP"
echo "Wrote $OUT"
