import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { selectedProjects, getSelectedProject } from "../lib/selected-projects";
import { PortfolioGallery } from "../components/portfolio-gallery";
const names = [
  "Jeff Electric Daily Operations Hub",
  "EV Guided Site Survey Suite",
  "Jeff Electric Homework Hub",
  "Facebook Lead Discovery Agent",
  "Jeff Electric Service Academy",
  "Pilates with Moni",
  "Jeff Electric AI Agents & Skills",
];
describe("Josh's approved project selection", () => {
  it("contains exactly his seven projects in order, with unique resolving routes", () => {
    expect(selectedProjects.map((p) => p.name)).toEqual(names);
    expect(new Set(selectedProjects.map((p) => p.slug)).size).toBe(7);
    for (const project of selectedProjects)
      expect(getSelectedProject(project.slug)).toBe(project);
    expect(getSelectedProject("buildbrief")).toBeUndefined();
    expect(getSelectedProject("unknown-project")).toBeUndefined();
  });
  it("renders only the approved seven cards with usable native case links", () => {
    const markup = renderToStaticMarkup(createElement(PortfolioGallery));
    expect((markup.match(/<article/g) ?? []).length).toBe(7);
    for (const project of selectedProjects) {
      expect(markup).toContain(`href="/projects/${project.slug}"`);
      const escaped = renderToStaticMarkup(
        createElement("span", null, project.name),
      ).replace(/^<span>|<\/span>$/g, "");
      expect(markup).toContain(escaped);
    }
    expect(markup).not.toMatch(
      /BuildBrief|Backlog Planner|Business Discovery AI|Agent Factory/,
    );
  });
});
