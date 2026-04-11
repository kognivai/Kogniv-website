import { test, expect } from "@playwright/test";

test.describe("Request Demo Modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("opens when 'Get in Touch' nav button is clicked", async ({ page }) => {
    await page.locator('[data-testid="main-nav"]').getByRole("button", { name: /get in touch/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Start a conversation")).toBeVisible();
  });

  test("opens when 'Work with us' hero CTA is clicked", async ({ page }) => {
    await page.getByRole("link", { name: /work with us/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("closes when clicking outside the dialog", async ({ page }) => {
    await page.locator('[data-testid="main-nav"]').getByRole("button", { name: /get in touch/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("shows validation errors when submitting empty form", async ({ page }) => {
    await page.locator('[data-testid="main-nav"]').getByRole("button", { name: /get in touch/i }).click();
    await page.getByRole("button", { name: /submit request/i }).click();
    await expect(page.getByText(/at least 2 characters/i).first()).toBeVisible();
    await expect(page.getByText(/invalid email/i)).toBeVisible();
  });

  test("shows error for single-character name", async ({ page }) => {
    await page.locator('[data-testid="main-nav"]').getByRole("button", { name: /get in touch/i }).click();
    await page.getByLabel("Full Name").fill("A");
    await page.getByLabel("Work Email").fill("test@example.com");
    await page.getByLabel("Company").fill("Acme");
    await page.getByRole("button", { name: /submit request/i }).click();
    await expect(page.getByText(/at least 2 characters/i)).toBeVisible();
  });

  test("shows error for invalid email", async ({ page }) => {
    await page.locator('[data-testid="main-nav"]').getByRole("button", { name: /get in touch/i }).click();
    await page.getByLabel("Full Name").fill("Jane Smith");
    await page.getByLabel("Work Email").fill("not-an-email");
    await page.getByLabel("Company").fill("Acme");
    await page.getByRole("button", { name: /submit request/i }).click();
    await expect(page.getByText(/invalid email/i)).toBeVisible();
  });

  test("all form fields are present and labelled", async ({ page }) => {
    await page.locator('[data-testid="main-nav"]').getByRole("button", { name: /get in touch/i }).click();
    await expect(page.getByLabel("Full Name")).toBeVisible();
    await expect(page.getByLabel("Work Email")).toBeVisible();
    await expect(page.getByLabel("Company")).toBeVisible();
    await expect(page.getByLabel(/how can we help/i)).toBeVisible();
  });

  test("submit button shows loading state", async ({ page }) => {
    // Mock the API to be slow so we can see the loading state
    await page.route("/api/contact", async (route) => {
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });

    await page.locator('[data-testid="main-nav"]').getByRole("button", { name: /get in touch/i }).click();
    await page.getByLabel("Full Name").fill("Jane Smith");
    await page.getByLabel("Work Email").fill("jane@example.com");
    await page.getByLabel("Company").fill("Acme Corp");
    await page.getByRole("button", { name: /submit request/i }).click();
    await expect(page.getByRole("button", { name: /submitting/i })).toBeVisible();
  });

  test("shows success state after successful submission", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    );

    await page.locator('[data-testid="main-nav"]').getByRole("button", { name: /get in touch/i }).click();
    await page.getByLabel("Full Name").fill("Jane Smith");
    await page.getByLabel("Work Email").fill("jane@example.com");
    await page.getByLabel("Company").fill("Acme Corp");
    await page.getByLabel(/how can we help/i).fill("We need AI automation for our workflows.");
    await page.getByRole("button", { name: /submit request/i }).click();
    await expect(page.getByText("Request Received")).toBeVisible({ timeout: 5000 });
  });

  test("shows error message on API failure", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 500, body: JSON.stringify({ error: "Server error" }) })
    );

    await page.locator('[data-testid="main-nav"]').getByRole("button", { name: /get in touch/i }).click();
    await page.getByLabel("Full Name").fill("Jane Smith");
    await page.getByLabel("Work Email").fill("jane@example.com");
    await page.getByLabel("Company").fill("Acme Corp");
    await page.getByRole("button", { name: /submit request/i }).click();
    await expect(page.getByText(/server error/i)).toBeVisible({ timeout: 5000 });
  });
});
