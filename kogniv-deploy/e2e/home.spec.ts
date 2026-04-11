import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero headline and CTAs", async ({ page }) => {
    await expect(page).toHaveTitle(/Kogniv/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("We build AI that");
    await expect(page.getByRole("link", { name: /work with us/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /see how we work/i })).toBeVisible();
  });

  test("renders outcomes section with key metrics", async ({ page }) => {
    await page.getByText("70%").scrollIntoViewIfNeeded();
    await expect(page.getByText("70%")).toBeVisible();
    await expect(page.getByText("4×")).toBeVisible();
    await expect(page.getByText(/Up to \$1\.5M/)).toBeVisible();
  });

  test("renders What We Offer section with 3 cards", async ({ page }) => {
    await expect(page.getByText("What we offer")).toBeVisible();
    const cards = page.locator("text=About Kogniv, text=KAFE Platform, text=Capabilities");
    await expect(page.getByRole("heading", { name: "About Kogniv" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "KAFE Platform" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Capabilities" })).toBeVisible();
  });

  test("renders testimonial quote", async ({ page }) => {
    await page.getByText("Chief People Officer").scrollIntoViewIfNeeded();
    await expect(page.getByText("Chief People Officer")).toBeVisible();
  });

  test("footer contains copyright and links", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByText(/© 2026 Kogniv/)).toBeVisible();
    await expect(footer.getByRole("link", { name: "Privacy" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Terms" })).toBeVisible();
  });

  test("page has correct meta description", async ({ page }) => {
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute("content", /Kogniv/);
  });

  test("og:image meta tag is present", async ({ page }) => {
    const og = page.locator('meta[property="og:image"]');
    await expect(og).toHaveAttribute("content", /opengraph\.jpg/);
  });
});
