import { test, expect } from "@playwright/test";
import { selectedProjects } from "../../lib/selected-projects";

test("motion can be paused without hiding any project or breaking links", async ({
  page,
}) => {
  await page.goto("/");
  const home = page.locator(".pf-home");
  const toggle = page.locator(".air-motion-toggle");
  await expect(toggle).toBeEnabled();
  await expect(home).toHaveAttribute("data-air-motion", "on");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(home).toHaveAttribute("data-air-motion", "off");
  expect(
    await page
      .locator(".air-orbit-outer")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  await expect(page.locator('[data-air-entered="false"]')).toHaveCount(0);
  await toggle.click();
  await expect(home).toHaveAttribute("data-air-motion", "on");
  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .click();
  for (const project of selectedProjects)
    await expect(
      page.getByRole("link", { name: project.name, exact: true }),
    ).toHaveAttribute("href", `/projects/${project.slug}`);
});

test("reduced motion suppresses ambient and hover movement while retaining all content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".pf-home")).toHaveAttribute(
    "data-air-motion",
    "off",
  );
  await expect(page.locator(".air-motion-toggle")).toBeHidden();
  expect(
    await page
      .locator(".air-orbit-outer")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  const card = page.locator(".pf-project-card").first();
  await card.hover();
  expect(await card.evaluate((e) => getComputedStyle(e).transform)).toBe(
    "none",
  );
  await expect(page.locator("#projects h3")).toHaveCount(7);
});

test("all selected project journeys work without the motion script", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto(`${baseURL}/#projects`);
    await expect(page.locator("#projects h3")).toHaveText(
      selectedProjects.map((p) => p.name),
    );
    expect(
      await page
        .locator(".pf-project-card")
        .last()
        .evaluate((e) => getComputedStyle(e).opacity),
    ).toBe("1");
    await page
      .getByRole("link", { name: "Explore Pilates with Moni", exact: true })
      .click();
    await expect(page.locator("main h1")).toHaveText("Pilates with Moni");
  } finally {
    await context.close();
  }
});
