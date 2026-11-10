import { test, expect, type Page } from "@playwright/test";

declare global {
  interface Window {
    __heldRecruiter: {
      payload: { tool: string; input: string; history: unknown[] };
      signal: AbortSignal | null | undefined;
      resolve: (response: Response) => void;
    }[];
    __releaseRecruiter: (index: number, title: string) => void;
  }
}
async function installHeldApi(page: Page) {
  await page.addInitScript(() => {
    const original = window.fetch.bind(window);
    window.__heldRecruiter = [];
    window.__releaseRecruiter = (index, title) =>
      window.__heldRecruiter[index].resolve(
        new Response(
          JSON.stringify({
            mode: "demo",
            title,
            summary: "Controlled test response.",
            items: [
              {
                title,
                status: "Not established",
                text: title,
                evidenceIds: [],
              },
            ],
            questions: [],
            sources: [],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );
    // Deliberately ignore transport cancellation: even a late/non-cooperative
    // response must be fenced off by the component after Clear or a tab switch.
    window.fetch = (input, init) =>
      String(input).endsWith("/api/recruiter")
        ? new Promise((resolve) =>
            window.__heldRecruiter.push({
              payload: JSON.parse(String(init?.body)),
              signal: init?.signal,
              resolve,
            }),
          )
        : original(input, init);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => {} },
    });
  });
  await page.goto("/#workspace");
  await page.getByRole("tab", { name: "Ask about Josh" }).click();
}
async function release(page: Page, index: number, title: string) {
  await page.evaluate(
    async ({ index, title }) => {
      window.__releaseRecruiter(index, title);
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    },
    { index, title },
  );
}
async function ask(page: Page, text: string, count: number) {
  await page
    .getByRole("textbox", { name: "Your question", exact: true })
    .fill(text);
  await page
    .getByRole("button", { name: "Ask a question", exact: true })
    .click();
  await expect
    .poll(() => page.evaluate(() => window.__heldRecruiter.length))
    .toBe(count);
}

test("Clear prevents a delayed reply from restoring results or conversation", async ({
  page,
}) => {
  await installHeldApi(page);
  await ask(page, "Old question held while pending", 1);
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await release(page, 0, "Stale reply");
  await expect(page.locator(".results")).toHaveCount(0);
  await expect(page.locator(".conversation-history")).toHaveCount(0);
  await expect(
    page.getByRole("textbox", { name: "Your question", exact: true }),
  ).toHaveValue("");
  expect(
    await page.evaluate(() => window.__heldRecruiter[0].signal?.aborted),
  ).toBe(true);
  await expect(
    page.getByRole("button", { name: "Ask a question", exact: true }),
  ).toBeEnabled();
  await ask(page, "Fresh question after clearing", 2);
  expect(
    await page.evaluate(() => window.__heldRecruiter[1].payload.history),
  ).toEqual([]);
  await release(page, 1, "Fresh reply");
  await expect(
    page.getByRole("heading", { name: "Fresh reply", exact: true }).first(),
  ).toBeVisible();
  await expect(page.locator(".conversation-history")).not.toContainText(
    "Old question",
  );
  await page.getByRole("button", { name: "Copy results" }).click();
  await expect(
    page.getByRole("button", { name: "Copied", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await ask(page, "Another fresh question after copy", 3);
  await release(page, 2, "Another reply");
  await expect(
    page.getByRole("button", { name: "Copy results" }),
  ).toBeVisible();
  await expect(page.locator("#workspace").getByRole("alert")).toHaveCount(0);
});

test("an old completion cannot stop or overwrite a fresh request after Clear", async ({
  page,
}) => {
  await installHeldApi(page);
  await ask(page, "Old question held for overlap", 1);
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Ask a question", exact: true }),
  ).toBeEnabled();
  await ask(page, "Fresh request while old reply remains held", 2);
  await release(page, 0, "Stale overlapping reply");
  await expect(
    page.getByRole("button", { name: "Reviewing…", exact: true }),
  ).toBeDisabled();
  await expect(page.locator(".results")).toHaveCount(0);
  await expect(page.locator(".conversation-history")).toHaveCount(0);
  await release(page, 1, "Current reply");
  await expect(
    page.getByRole("heading", { name: "Current reply", exact: true }).first(),
  ).toBeVisible();
  await expect(page.locator(".results")).not.toContainText("Stale overlapping");
  await expect(page.locator(".conversation-history")).not.toContainText(
    "Old question",
  );
});

test("switching tabs while pending cancels the old request and preserves the new tool", async ({
  page,
}) => {
  await installHeldApi(page);
  await ask(page, "Old assistant question before switching", 1);
  await page.getByRole("tab", { name: "Prepare an interview" }).click();
  expect(
    await page.evaluate(() => window.__heldRecruiter[0].signal?.aborted),
  ).toBe(true);
  await expect(
    page.getByRole("button", {
      name: "Build interview questions",
      exact: true,
    }),
  ).toBeEnabled();
  await page
    .getByRole("textbox", { name: "Target role and priorities", exact: true })
    .fill("AI consultant with workflow discovery");
  await page
    .getByRole("button", { name: "Build interview questions", exact: true })
    .click();
  await expect
    .poll(() => page.evaluate(() => window.__heldRecruiter.length))
    .toBe(2);
  await release(page, 0, "Stale assistant reply");
  await expect(page.locator(".results")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Reviewing…", exact: true }),
  ).toBeDisabled();
  await release(page, 1, "Fresh interview reply");
  await expect(
    page
      .getByRole("heading", { name: "Fresh interview reply", exact: true })
      .first(),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Ask about Josh" }).click();
  await expect(page.locator(".results")).toHaveCount(0);
  await expect(page.locator(".conversation-history")).toHaveCount(0);
  await expect(
    page.getByRole("textbox", { name: "Your question", exact: true }),
  ).toHaveValue("");
});
