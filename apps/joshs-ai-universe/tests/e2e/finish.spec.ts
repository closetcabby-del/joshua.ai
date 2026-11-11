import { test, expect } from "@playwright/test";

const casePath = "/projects/service-business-workflows";

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
    name: "Contact Josh",
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
    .locator(".studio-hero")
    .getByRole("link", {
      name: "Explore Jeff Electric",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(new RegExp(`${casePath}$`));
  await expect(
    page.getByRole("heading", { name: "A customer’s first step." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open the source snapshot", exact: true }),
  ).toHaveAttribute(
    "href",
    /github\.com\/closetcabby-del\/joshua\.ai\/blob\/d70c684b6ae35263497cfe5eae43cf6c4fb966d0\/assets\/jeff-electric-live-preview\.jpg$/,
  );
  await page
    .getByRole("link", {
      name: "Review the website evidence record",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/evidence#jeff-public-artifact$/);
  await expect(
    page.locator("#jeff-public-artifact .evidence-badge"),
  ).toHaveText("Verified");
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${casePath}$`));
  await page
    .getByRole("link", { name: "← Back to selected work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("header.site-header")).toHaveClass(/is-compact/);
  await page.getByRole("link", { name: "Portfolio tools · Demo" }).click();
  await expect(page.getByRole("tab", { name: "Ask about Josh" })).toBeVisible();
  await page
    .getByRole("link", { name: "Back to the Jeff Electric story", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: /Turning messy work/ }),
  ).toBeVisible();
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
    .getByRole("link", { name: "Contact Josh", exact: true })
    .focus();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .locator("#main-navigation")
    .getByRole("link", { name: "Contact Josh", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  const homeContact = page
    .locator("#contact")
    .getByRole("link", { name: "Talk with Josh", exact: true });
  await expect(homeContact).toHaveAttribute(
    "href",
    "mailto:joshualy986@gmail.com",
  );
  await page.goto(casePath);
  await expect(
    page
      .locator(".case-end")
      .getByRole("link", { name: "Talk about the work ↗", exact: true }),
  ).toHaveAttribute("href", "mailto:joshualy986@gmail.com");
});

test("main routes reload directly and unknown routes retain 404", async ({
  page,
  request,
}) => {
  for (const path of [
    "/",
    casePath,
    "/projects/buildbrief",
    "/projects/sprint-backlog-planner",
    "/lab",
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
      "/projects/buildbrief",
      "/projects/sprint-backlog-planner",
      "/lab",
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
  const artifact = page.getByRole("img", {
    name: /Reviewed Jeff Electric homepage/,
  });
  await expect
    .poll(() =>
      artifact.evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBe(1348);
  await page
    .getByText("Read the artifact review transcript", { exact: true })
    .click();
  await expect(page.locator("#website-walkthrough details")).toContainText(
    "No form routing",
  );
});
