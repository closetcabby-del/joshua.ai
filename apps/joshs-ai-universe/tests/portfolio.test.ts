import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ArchitectureExplorer } from "../components/architecture-explorer";
import { portfolioProjects } from "../lib/portfolio";

describe("interactive portfolio evidence", () => {
  for (const project of portfolioProjects) {
    it(`${project.shortName} has no dangling connections and preserves readable scope without scripts`, () => {
      const ids = project.nodes.map((node) => node.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const [from, to] of project.edges) {
        expect(ids).toContain(from);
        expect(ids).toContain(to);
      }
      const markup = renderToStaticMarkup(
        createElement(ArchitectureExplorer, { project }),
      );
      expect(markup).toContain("Business View");
      expect(markup).toContain("Technical View");
      expect(markup).toContain("Read the architecture as text");
      for (const node of project.nodes) {
        const escapedBoundary = renderToStaticMarkup(
          createElement("span", null, node.boundary),
        ).replace(/^<span>|<\/span>$/g, "");
        expect(markup).toContain(escapedBoundary);
        expect(node.why.trim()).not.toBe("");
      }
      expect(markup).not.toContain("autoplay");
    });
  }
  it.each([
    [
      "buildbrief",
      "7934ffd3a3d17ee36cddf4ae14a59b4f52f24da755450d453d4134d223cdf20c",
    ],
    [
      "planner",
      "bd80c30d9eed4ea507a7e80d81719777a6c0951049103d829638d8d5cbae260e",
    ],
  ])("%s is the unchanged original public work sample", (name, sha) => {
    const bytes = readFileSync(
      new URL(`../public/demos/${name}.html`, import.meta.url),
    );
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(sha);
    expect(bytes.toString()).not.toMatch(/\bfetch\s*\(/);
  });
});
