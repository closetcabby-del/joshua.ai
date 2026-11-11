import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SystemsExplorer } from "../components/systems-explorer";
import { systemNodes } from "../lib/systems-case";

describe("static systems guide", () => {
  it("server-renders all evidence details, both process views and all choices before hydration", () => {
    const markup = renderToStaticMarkup(createElement(SystemsExplorer));
    for (const node of systemNodes) {
      expect(markup).toContain(node.source);
      expect(markup).toContain(
        renderToStaticMarkup(createElement("span", null, node.gap)).replace(
          /^<span>|<\/span>$/g,
          "",
        ),
      );
    }
    expect(markup).toContain("observed baseline is still needed");
    expect(markup).toContain("not a live integration");
    expect(markup).toContain("Read every component as text");
    expect(markup).toContain("Read both process views as text");
    expect(markup).toContain("Read all three options as text");
    expect(markup).toContain("credential expiry");
    expect(markup).toContain("dependencies, operations and future changes");
  });
  it("ships a captioned manual film, transcript and native source/contact navigation", () => {
    const markup = renderToStaticMarkup(createElement(SystemsExplorer));
    expect(markup).toContain('src="/systems-flow.mp4"');
    expect(markup).toContain('src="/systems-flow.vtt"');
    expect(markup).toContain('poster="/systems-flow-poster.jpg"');
    expect(markup).not.toMatch(
      /autoPlay|autoplay|dangerouslySetInnerHTML|<iframe/,
    );
    expect(markup).toContain("Read the animation transcript");
    expect(markup).toContain("Conceptual design");
    expect(markup).toContain('href="/#contact"');
    expect(markup).toContain('href="/projects/service-business-workflows"');
  });
});
