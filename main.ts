// One Line, Big Laugh — writes a single funny line to /output/entry.txt.
// Node 22, stdlib only. No network, no eval, no fetch.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My therapist said to stop talking to the toaster, so now I just nod at it in the morning and pretend the silence is mutual.";

// Guard: the gate requires 1–200 chars, non-whitespace. Fail loudly if the
// line ever drifts out of range, instead of shipping an invalid entry.
const trimmed = LINE.replace(/\s+$/, "");
const chars = [...trimmed].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry line must be 1–200 chars, got ${chars}`);
}
if (trimmed.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, trimmed, "utf8");
