// Snooze Button Roast
// Deterministically writes one alarm-clock roast to /output/entry.txt.
// Node 22+, stdlib only, no network, no randomness, no secrets, no model calls.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My alarm went off at 6 AM on a Saturday like it had a job interview — I threw it across the room and it kept ringing, because apparently even my alarm has a better work ethic than me.";

function main(): void {
  if (LINE.length === 0 || LINE.trim().length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (LINE.length > 200) {
    throw new Error(`entry line is ${LINE.length} chars, over the 200 limit`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
