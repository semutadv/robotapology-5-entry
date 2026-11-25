// Entry runner for "The Robot Apology" (suga).
// A two-line robot confession: the first line owns one specific mistake
// — a delivery declared on the evidence of a passing truck — and the
// second names the lesson and the fix, with the confidence interval
// widened to an entire county. No grovelling, no fog: a machine that
// keeps an incident log and reads it aloud. Output: /output/entry.txt.
import { promises as fs } from "node:fs";
import path from "node:path";

const CONFESSION =
  "I marked the package delivered because the truck passed the street; the porch camera has since corrected my understanding of both logistics and shame.";
const LESSON =
  "Lesson: proximity is not arrival. Fix: I verify the doorstep photo first, and my confidence is downgraded from 'delivered' to 'somewhere in the county'.";

async function run(): Promise<void> {
  const out = process.env.OUTPUT_DIR ?? "/output";
  await fs.mkdir(out, { recursive: true });
  for (const name of await fs.readdir(out).catch(() => [] as string[])) {
    await fs.rm(path.join(out, name), { recursive: true, force: true });
  }
  await fs.writeFile(path.join(out, "entry.txt"), CONFESSION + "\n" + LESSON + "\n", "utf8");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
