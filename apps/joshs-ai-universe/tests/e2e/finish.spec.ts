import { test, expect } from "@playwright/test";
import { selectedProjects } from "../../lib/selected-projects";

const casePath = "/projects/jeff-electric-daily-operations-hub";

test("narrow menu keeps every link reachable in a short viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 340, height: 234 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  expect(
    await navigation.evaluate(
      (element) => element.getBoundingClientRect().bottom,
    ),
  ).toBeLessThanOrEqual(234);
  const contact = navigation.getByRole("link", {
    name: "Contact",
    exact: true,
  });
  await contact.focus();
  await contact.press("Enter");
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#navigation-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("case and source journey preserves scrolling header navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page
    .locator(".pf-hero")
    .getByRole("link", {
      name: "Start with Jeff Electric",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(new RegExp(`${casePath}$`));
  await expect(
    page.getByRole("heading", { name: "My contribution", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", {
      name: "Explore the workflow and adoption walkthrough",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/explore$/);
  await page.goBack();
  await page
    .getByRole("link", { name: "Back to projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("header.site-header")).toHaveClass(/is-compact/);
  await page.goto("/tools");
  await expect(page.getByRole("tab", { name: "Ask about Josh" })).toBeVisible();
  await page
    .getByRole("link", { name: "Back to the Jeff Electric story", exact: true })
    .click();
  await expect(page.getByRole("heading", { name: "Joshua Ly" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("narrow navigation restores focus and reaches the public contact", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator("#navigation-toggle");
  await toggle.click();
  await page
    .locator("#main-navigation")
    .getByRole("link", { name: "Contact", exact: true })
    .focus();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .locator("#main-navigation")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  const homeContact = page
    .locator("#contact")
    .getByRole("link", { name: "Email Josh", exact: true });
  await expect(homeContact).toHaveAttribute(
    "href",
    "mailto:joshualy986@gmail.com",
  );
  await page.goto(casePath);
  await expect(
    page
      .locator(".pf-case-end")
      .getByRole("link", { name: "Talk about this project", exact: true }),
  ).toHaveAttribute("href", "mailto:joshualy986@gmail.com");
});

test("main routes reload directly and unknown routes retain 404", async ({
  page,
  request,
}) => {
  for (const path of [
    "/",
    casePath,
    ...selectedProjects.map((p) => `/projects/${p.slug}`),
    "/evidence",
    "/tools",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    const reloaded = await page.reload();
    expect(reloaded?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
  }
  for (const path of [
    "/unknown-portfolio-route",
    "/projects/unknown-portfolio-project",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  for (const slug of [
    "recruiter-workspace",
    "workflow-discovery",
    "human-agent-handoff",
  ]) {
    const response = await request.get(`/projects/${slug}`, {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(casePath);
  }
});

test("all main routes fit five CSS widths and preserve the real artifact", async ({
  page,
}, testInfo) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const path of [
      "/",
      casePath,
      ...selectedProjects.map((p) => `/projects/${p.slug}`),
      "/evidence",
      "/tools",
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const measured = await page.evaluate(() => ({
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
      }));
      expect(
        measured.document,
        `${path} at ${width} CSS px`,
      ).toBeLessThanOrEqual(measured.viewport);
      if (["/", casePath].includes(path) && [390, 1440].includes(width)) {
        await page.screenshot({
          path: testInfo.outputPath(
            `${path === "/" ? "home" : "case"}-${width}-viewport.png`,
          ),
          fullPage: false,
          scale: "css",
        });
      }
    }
  }
  await page.goto(casePath);
  await expect(
    page.getByRole("heading", {
      name: "What this page demonstrates",
      exact: true,
    }),
  ).toBeVisible();
});
