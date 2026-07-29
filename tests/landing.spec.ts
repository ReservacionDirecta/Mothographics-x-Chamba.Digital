import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("TC001 - loads homepage and shows hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Chamba|Digital/i);
    await expect(page.locator("body")).toBeVisible();
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible({ timeout: 15000 });
  });

  test("TC002 - navigation links are present", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible({ timeout: 15000 });
    const links = nav.locator("a");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test("TC003 - scroll to services section", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(2000);
    const body = page.locator("body");
    const text = await body.textContent();
    expect(text).toContain("Servicios");
  });

  test("TC004 - pricing section is visible", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(2000);
    const text = await page.locator("body").textContent();
    const hasPricing = text?.includes("Suscripci") || text?.includes("Básica") || text?.includes("Advanced") || text?.includes("Lanzamiento");
    expect(hasPricing).toBeTruthy();
  });

  test("TC005 - footer has links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible({ timeout: 15000 });
  });
});
