/**
 * E2E test: Full flow from landing to report
 * Run: npx playwright test scripts/e2e-flow.spec.ts --project=chromium
 */
import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3001";

test("full flow: landing → interview → research → design → report", async ({
  page,
}) => {
  test.setTimeout(90000);

  // 1. Landing page → click Get Started
  await page.goto(BASE);
  await expect(page.getByText(/turn your raw idea/i)).toBeVisible({
    timeout: 10000,
  });
  await page.getByRole("link", { name: /get started/i }).first().click();

  // 2. On /get-started page, enter idea and submit
  await expect(page).toHaveURL(/\/get-started/, { timeout: 5000 });
  await page.getByLabel(/what are you building/i).fill("An AI habit tracker for daily routines");
  await page.getByRole("button", { name: /get started/i }).click();

  // 3. Should redirect to interview
  await expect(page).toHaveURL(/\/project\/[^/]+\/interview/, { timeout: 10000 });
  await expect(page.getByText(/question 1 of 8/i)).toBeVisible();

  // 4. Answer all 8 interview questions (MCQ: click first option A, or type in Other)
  for (let i = 0; i < 8; i++) {
    await expect(page.getByText(new RegExp(`question ${i + 1} of 8`, "i"))).toBeVisible({
      timeout: 15000,
    });
    const optionButtons = page.getByRole("button").filter({ hasText: /^[A-Z]\./ });
    if ((await optionButtons.count()) > 0) {
      await optionButtons.first().click();
    } else {
      await page.locator("input[type='text']").first().fill("Test answer");
    }
    await page.getByRole("button", { name: /next question|run research/i }).click();
    if (i < 7) {
      await expect(page.getByText(new RegExp(`question ${i + 2} of 8`, "i"))).toBeVisible({
        timeout: 15000,
      });
    }
  }

  // 5. Should redirect to research page
  await expect(page).toHaveURL(/\/project\/[^/]+\/research/, { timeout: 10000 });
  await expect(page.getByText(/researching your market/i)).toBeVisible();

  // 6. Wait for research to complete (SSE events)
  await expect(page.getByText("Validation Report")).toBeVisible({ timeout: 60000 });
  await expect(page.getByText("Pain Point Score").first()).toBeVisible();

  // 7. Click to design phase
  await page.getByRole("link", { name: /build design system/i }).click();

  // 8. Design page → skip to report
  await expect(page).toHaveURL(/\/project\/[^/]+\/design/, { timeout: 5000 });
  await page.getByRole("link", { name: /skip/i }).click();

  // 9. Report page
  await expect(page).toHaveURL(/\/project\/[^/]+\/report/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Foundation Doc" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Validation Report" }).first()).toBeVisible();
  await expect(page.getByText(/start new idea/i)).toBeVisible();
});
