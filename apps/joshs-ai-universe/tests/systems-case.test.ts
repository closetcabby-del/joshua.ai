import { describe, expect, it } from "vitest";
import {
  chapters,
  nodeIndexForKey,
  practicalOptions,
  processViews,
  systemNodes,
} from "../lib/systems-case";

describe("interactive systems explanation", () => {
  it("keeps six deep-link chapters and valid focus components", () => {
    expect(chapters.map((chapter) => chapter.id)).toEqual([
      "discover",
      "map",
      "design",
      "build",
      "choose",
      "adopt",
    ]);
    for (const chapter of chapters)
      expect(systemNodes.some((node) => node.id === chapter.focus)).toBe(true);
  });
  it("wraps arrow navigation in both directions without selecting outside the model", () => {
    expect(nodeIndexForKey(4, "ArrowRight")).toBe(0);
    expect(nodeIndexForKey(0, "ArrowLeft")).toBe(4);
    expect(nodeIndexForKey(4, "ArrowDown")).toBe(0);
    expect(nodeIndexForKey(0, "ArrowUp")).toBe(4);
  });
  it("supports first/last keys and leaves activation keys to native buttons", () => {
    expect(nodeIndexForKey(3, "Home")).toBe(0);
    expect(nodeIndexForKey(1, "End")).toBe(4);
    expect(nodeIndexForKey(2, "Enter")).toBe(2);
    expect(nodeIndexForKey(2, " ")).toBe(2);
    expect(nodeIndexForKey(2, "Tab")).toBe(2);
  });
  it("handles empty or bounded navigation defensively", () => {
    expect(nodeIndexForKey(3, "End", 0)).toBe(0);
    expect(nodeIndexForKey(-2, "Tab")).toBe(0);
    expect(nodeIndexForKey(10, "Tab")).toBe(4);
    expect(nodeIndexForKey(0, "ArrowLeft", 1)).toBe(0);
  });
  it("labels the process comparison as reported versus proposed, with owners", () => {
    expect(processViews.reported.label).toBe("Reported current state");
    expect(processViews.proposed.label).toBe("Proposed design");
    expect(processViews.reported.summary).toMatch(
      /observed baseline is still needed/,
    );
    expect(processViews.proposed.summary).toMatch(/not a live integration/);
    for (const view of Object.values(processViews))
      expect(view.owners).toHaveLength(view.steps.length);
  });
  it("keeps evidence gaps and human review at every component", () => {
    const allowedSources = [
      "jeff-public-artifact",
      "jeff-workflow-building",
      "jeff-ai-direction",
      "jeff-human-judgment",
      "jeff-problem-framing",
    ];
    for (const node of systemNodes) {
      expect(allowedSources).toContain(node.source.split("#")[1]);
      for (const field of [
        "need",
        "input",
        "output",
        "contribution",
        "ai",
        "review",
        "status",
        "gap",
      ] as const)
        expect(node[field].length).toBeGreaterThan(30);
    }
    expect(systemNodes[3].contribution).toMatch(/cannot approve itself/);
    expect(systemNodes[4].status).toMatch(/outcome unverified/);
  });
  it("compares continuing responsibility without fabricating numeric prices or savings", () => {
    expect(practicalOptions.map((option) => option.id)).toEqual([
      "native",
      "automation",
      "custom",
    ]);
    for (const option of practicalOptions) {
      expect(
        `${option.cost} ${option.effort} ${option.reliability} ${option.maintenance}`,
      ).not.toMatch(/[$£€]|\d+%/);
      expect(option.boundary.length).toBeGreaterThan(50);
    }
    expect(practicalOptions[1].reliability).toMatch(/manual recovery/);
    expect(practicalOptions[2].maintenance).toMatch(/dependencies/);
  });
});
