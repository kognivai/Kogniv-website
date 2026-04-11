import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("desktop nav links navigate to correct pages", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator('[data-testid="main-nav"]');

    // About
    await nav.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Join the Future");

    // What we do
    await nav.getByRole("link", { name: "What we do" }).click();
    await expect(page).toHaveURL("/what-we-do");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Enterprise Operations");

    // Platform
    await nav.getByRole("link", { name: "Platform" }).click();
    await expect(page).toHaveURL("/platform");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("continuous AI delivery");

    // Capabilities
    await nav.getByRole("link", { name: "Capabilities" }).click();
    await expect(page).toHaveURL("/capabilities");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Platform expertise");
  });

  test("logo click returns to home", async ({ page }) => {
    await page.goto("/about");
    await page.locator('[data-testid="main-nav"]').getByRole("link", { name: /kogniv/i }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("nav becomes opaque on scroll", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator('[data-testid="main-nav"]');
    // Initially transparent
    await expect(nav).not.toHaveClass(/bg-background/);
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 200));
    await expect(nav).toHaveClass(/bg-background/, { timeout: 2000 });
  });

  test("footer Privacy link navigates correctly", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name: "Privacy" }).click();
    await expect(page).toHaveURL("/privacy");
  });

  test("footer Terms link navigates correctly", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name: "Terms" }).click();
    await expect(page).toHaveURL("/terms");
  });
});

test.describe("Mobile Navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger menu opens and shows links", async ({ page }) => {
    await page.goto("/");
    const burger = page.getByRole("button", { name: /open menu/i });
    await expect(burger).toBeVisible();
    await burger.click();
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu.getByRole("link", { name: "About" })).toBeVisible();
    await expect(mobileMenu.getByRole("link", { name: "Platform" })).toBeVisible();
  });

  test("mobile menu closes on navigation", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.locator('[data-testid="mobile-menu"]').getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();
  });

  test("hamburger toggles to X when open", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.getByRole("button", { name: /close menu/i })).toBeVisible();
  });
});
