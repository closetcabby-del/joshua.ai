import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { chapters, systemNodes } from "../../lib/systems-case";

test("native homepage entry, chapter deep links and case return", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore how I build", exact: true })
    .click();
  await expect(page).toHaveURL(/\/explore$/);
  const navigation = page.getByRole("navigation", { name: "Explore chapters" });
  for (const chapter of chapters) {
    await navigation
      .getByRole("link", { name: chapter.label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`#${chapter.id}$`));
    await expect(page.locator(`#${chapter.id} h2`)).toBeInViewport();
  }
  await page.reload();
  await expect(page.locator("#adopt h2")).toBeInViewport();
  await page
    .getByRole("link", { name: "Inspect the Jeff Electric case and sources" })
    .click();
  await expect(page).toHaveURL(/\/projects\/service-business-workflows$/);
  expect(errors).toEqual([]);
});

test("every diagram component reveals the full business and evidence explanation", async ({
  page,
}) => {
  await page.goto("/explore#design");
  const map = page.getByRole("group", { name: "Workflow components" });
  const inspector = page.locator("#node-inspector");
  for (const node of systemNodes) {
    const button = map.getByRole("button", { name: new RegExp(node.label) });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(
      inspector.getByRole("heading", { name: node.label, exact: true }),
    ).toBeVisible();
    for (const field of [
      "Business need",
      "Input",
      "Output",
      "Josh’s contribution / design choice",
      "Where AI helps",
      "Human review",
      "Status and source",
      "Still to verify",
    ]) {
      await expect(
        inspector.locator("dt").filter({ hasText: new RegExp(`^${field}$`) }),
      ).toBeVisible();
    }
    await expect(inspector.getByRole("link")).toHaveAttribute(
      "href",
      node.source,
    );
  }
  await page.getByText("Read every component as text", { exact: true }).click();
  await expect(page.locator(".all-component-details h3")).toHaveCount(5);
});

test("diagram keyboard navigation wraps, selects and preserves focus", async ({
  page,
}) => {
  await page.goto("/explore#design");
  const buttons = page
    .getByRole("group", { name: "Workflow components" })
    .getByRole("button");
  await buttons.first().focus();
  await page.keyboard.press("ArrowLeft");
  await expect(buttons.last()).toBeFocused();
  await expect(buttons.last()).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("ArrowRight");
  await expect(buttons.first()).toBeFocused();
  await page.keyboard.press("End");
  await expect(buttons.last()).toBeFocused();
  await page.keyboard.press("Home");
  await expect(buttons.first()).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await expect(buttons.nth(1)).toHaveAttribute("aria-pressed", "true");
  await expect(buttons.nth(1)).toBeFocused();
});

test("process labels, practical choices and reset restore all exploration controls", async ({
  page,
}) => {
  await page.goto("/explore");
  await page
    .getByRole("radio", { name: "Reported current state", exact: true })
    .check();
  await expect(page.locator(".process-view")).toContainText(
    "observed baseline is still needed",
  );
  await page.getByRole("radio", { name: "Custom code", exact: true }).check();
  await expect(page.locator(".option-detail")).toContainText(
    "hosting, security review",
  );
  await page
    .getByRole("group", { name: "Workflow components" })
    .getByRole("button")
    .last()
    .click();
  await page
    .getByRole("button", { name: "Reset exploration", exact: true })
    .click();
  await expect(
    page.getByRole("radio", { name: "Proposed design", exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole("radio", { name: "Native features", exact: true }),
  ).toBeChecked();
  await expect(
    page
      .getByRole("group", { name: "Workflow components" })
      .getByRole("button")
      .first(),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByText(
      "Exploration reset: Customer inquiry, Proposed design, Native features.",
      { exact: true },
    ),
  ).toBeVisible();
});

test("reduced motion exposes complete content and ordinary navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/explore#design");
  await expect(page.locator(".systems-experience")).not.toHaveClass(
    /motion-ready/,
  );
  await expect(page.locator("#design h2")).toBeVisible();
  await page
    .getByRole("group", { name: "Workflow components" })
    .getByRole("button")
    .nth(3)
    .click();
  await expect(page.locator("#node-inspector")).toContainText(
    "cannot approve itself",
  );
  await page
    .getByRole("navigation", { name: "Explore chapters" })
    .getByRole("link", { name: "Help people adopt it", exact: true })
    .click();
  await expect(page.locator("#adopt h2")).toBeInViewport();
});

test("static guide retains all components and options with JavaScript disabled", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto(`${baseURL}/explore#design`);
    await page
      .getByText("Read every component as text", { exact: true })
      .click();
    await expect(page.locator(".all-component-details h3")).toHaveCount(5);
    await page
      .getByText("Read all three options as text", { exact: true })
      .click();
    await expect(page.locator(".option-text h3")).toHaveCount(3);
    await expect(page.locator("#adopt h2")).toBeVisible();
  } finally {
    await context.close();
  }
});

test("blocked motion script keeps content and controls usable", async ({
  page,
}) => {
  await page.route("**/vendor/scrollcraft/scrollcraft.js", (route) =>
    route.abort(),
  );
  await page.goto("/explore#design");
  await expect(page.locator(".systems-experience")).not.toHaveClass(
    /motion-ready/,
  );
  await page
    .getByRole("group", { name: "Workflow components" })
    .getByRole("button")
    .last()
    .click();
  await expect(page.locator("#node-inspector")).toContainText(
    "outcome unverified",
  );
  await expect(page.locator("#discover h2")).toBeVisible();
});

test("interactive guide has no detected WCAG AA accessibility violations", async ({
  page,
}) => {
  await page.goto("/explore#design");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("new conceptual film loads captions, plays, pauses and replays manually", async ({
  page,
}) => {
  await page.goto("/explore#build");
  const player = page.locator(".systems-film video");
  await expect(player).not.toHaveAttribute("autoplay");
  await expect(player).toHaveAttribute("poster", "/systems-flow-poster.jpg");
  await expect(player.locator("track")).toHaveAttribute(
    "src",
    "/systems-flow.vtt",
  );
  await expect
    .poll(() =>
      player.evaluate((element: HTMLVideoElement) => element.readyState),
    )
    .toBeGreaterThanOrEqual(1);
  expect(
    await player.evaluate((element: HTMLVideoElement) => element.duration),
  ).toBeCloseTo(25, 0);
  await page
    .getByRole("button", { name: "Play explanation", exact: true })
    .click();
  await expect
    .poll(() =>
      player.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.2);
  await page
    .getByRole("button", { name: "Pause explanation", exact: true })
    .click();
  expect(
    await player.evaluate((element: HTMLVideoElement) => element.paused),
  ).toBe(true);
  await player.evaluate((element: HTMLVideoElement) => {
    element.currentTime = 15;
  });
  await page
    .getByRole("button", { name: "Replay from start", exact: true })
    .click();
  expect(
    await player.evaluate((element: HTMLVideoElement) => element.currentTime),
  ).toBeLessThan(5);
  await page
    .getByText("Read the animation transcript", { exact: true })
    .click();
  await expect(page.locator(".systems-film details")).toContainText(
    "Conceptual design",
  );
});

test("video failure exposes the transcript and original introduction remains reachable", async ({
  page,
}) => {
  await page.route("**/systems-flow.mp4", (route) => route.abort());
  await page.goto("/explore#build");
  await page
    .locator(".systems-film video")
    .evaluate((element: HTMLVideoElement) => element.load());
  await page
    .getByRole("button", { name: "Play explanation", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText(
    "Video playback is unavailable",
  );
  await page
    .getByText("Read the animation transcript", { exact: true })
    .click();
  await expect(page.locator(".systems-film details")).toContainText(
    "No customer records",
  );
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Watch the idea", exact: true }),
  ).toBeVisible();
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`exploration has no horizontal overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/explore");
    for (const chapter of chapters) {
      await page.locator(`#${chapter.id}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      ).toBeLessThanOrEqual(1);
    }
  });
}
