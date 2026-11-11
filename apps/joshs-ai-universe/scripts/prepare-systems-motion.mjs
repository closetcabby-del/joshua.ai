import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Give HyperFrames check/snapshot a normal index.html without altering the original film.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destination = path.join(root, "outputs", "systems-motion");
await mkdir(destination, { recursive: true });
await cp(
  path.join(root, "motion", "assets"),
  path.join(destination, "assets"),
  { recursive: true },
);
await mkdir(path.join(destination, "compositions"), { recursive: true });
for (let index = 0; index < 5; index++) {
  await cp(
    path.join(root, "motion", "compositions", `systems-${index}.html`),
    path.join(destination, "compositions", `systems-${index}.html`),
  );
}
await writeFile(
  path.join(destination, "index.html"),
  await readFile(path.join(root, "motion", "systems.html")),
);
await cp(
  path.join(root, "motion", "hyperframes.json"),
  path.join(destination, "hyperframes.json"),
);
console.log(destination);
