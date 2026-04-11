import { test, expect } from "@playwright/test";

const pages = [
  { path: "/about",        heading: /Join the Future/,           eyebrow: "About Kogniv" },
  { path: "/platform",     heading: /continuous AI delivery/,    eyebrow: "KAFE" },
  { path: "/capabilities", heading: /Platform expertise/,        eyebrow: "Capabilities" },
  { path: "/what-we-do",   heading: /Enterprise Operations/,     eyebrow: "What We Do" },
  { path: "/privacy",      heading: null,                        eyebrow: null },
  { path: "/terms",        heading: null,                        eyebrow: null },
];

for (const pg of pages) {
  test.describe(`Page: ${pg.path}`, () => {
    test("loads without error", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(pg.path);
      await expect(page.locator("#root")).not.toBeEmpty();
      expect(errors).toHaveLength(0);
    });

    if (pg.heading) {
      test("renders main headline", async ({ page }) => {
        await page.goto(pg.path);
        await expect(page.getByRole("heading", { level: 1 })).toContainText(pg.heading!);
      });
    }

    test("renders nav and footer", async ({ page }) => {
      await page.goto(pg.path);
      await expect(page.locator('[data-testid="main-nav"]')).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    });

    test("Get in Touch button opens modal", async ({ page }) => {
      await page.goto(pg.path);
      const btn = page.locator('[data-testid="main-nav"]').getByRole("button", { name: /get in touch/i });
      // Only check on viewport that shows the button
      if (await btn.isVisible()) {
        await btn.click();
        await expect(page.getByRole("dialog")).toBeVisible();
      }
    });
  });
}

test.describe("About Page — Content", () => {
  test.beforeEach(async ({ page }) => { await page.goto("/about"); });

  test("shows 4 strategic advantage cards", async ({ page }) => {
    await expect(page.getByText("Deep Industry Expertise")).toBeVisible();
    await expect(page.getByText("Agentic Platform & Architecture")).toBeVisible();
    await expect(page.getByText("AI-Native End-to-End")).toBeVisible();
    await expect(page.getByText("Ecosystem Veterans. Startup Energy.")).toBeVisible();
  });

  test("shows founder card for Praveen Challa", async ({ page }) => {
    await page.getByText("Praveen Challa").scrollIntoViewIfNeeded();
    await expect(page.getByText("Praveen Challa")).toBeVisible();
    await expect(page.getByText("CEO & Founder, Kogniv")).toBeVisible();
  });
});

test.describe("Platform Page — Content", () => {
  test.beforeEach(async ({ page }) => { await page.goto("/platform"); });

  test("shows three KAFE pillars", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "AI to Build AI" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Iterative or Radical" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Forward Deployment" })).toBeVisible();
  });

  test("shows 6 platform component cards", async ({ page }) => {
    await expect(page.getByText("AI Use Case Assessment")).toBeVisible();
    await expect(page.getByText("Agent Studio")).toBeVisible();
    await expect(page.getByText("AI Agents Orchestrator")).toBeVisible();
    await expect(page.getByText("AI Control Tower")).toBeVisible();
    await expect(page.getByText("Continuous Improvement Loop")).toBeVisible();
    await expect(page.getByText("Enterprise Security & Governance")).toBeVisible();
  });

  test("shows 5-step KAFE workflow", async ({ page }) => {
    await page.getByText("How KAFE Works").scrollIntoViewIfNeeded();
    await expect(page.getByText("Intake")).toBeVisible();
    await expect(page.getByText("Assess")).toBeVisible();
    await expect(page.getByText("Deploy")).toBeVisible();
  });
});

test.describe("Capabilities Page — Content", () => {
  test.beforeEach(async ({ page }) => { await page.goto("/capabilities"); });

  test("shows 4 capability pillars", async ({ page }) => {
    await expect(page.getByText("Autonomous IT")).toBeVisible();
    await expect(page.getByText("Future of Work")).toBeVisible();
    await expect(page.getByText("Enterprise Service Management")).toBeVisible();
    await expect(page.getByText("Industry Verticals")).toBeVisible();
  });

  test("shows integration chips", async ({ page }) => {
    await page.getByText("Integrations").scrollIntoViewIfNeeded();
    await expect(page.getByText("Slack")).toBeVisible();
    await expect(page.getByText("Microsoft Teams")).toBeVisible();
    await expect(page.getByText("ServiceNow")).toBeVisible();
  });
});

test.describe("What We Do Page — Content", () => {
  test.beforeEach(async ({ page }) => { await page.goto("/what-we-do"); });

  test("shows 4 practice area cards", async ({ page }) => {
    await expect(page.getByText("AI Platform Architecture & Governance")).toBeVisible();
    await expect(page.getByText("KAFE — Agentic AI Factory on NOW")).toBeVisible();
    await expect(page.getByText("ITSM · ITOM · ITAM · SPM")).toBeVisible();
    await expect(page.getByText("Employee & Customer Workflows")).toBeVisible();
  });

  test("shows 2 industry cards", async ({ page }) => {
    await expect(page.getByText("Healthcare & Life Sciences")).toBeVisible();
    await expect(page.getByText("Banking & Financial Services")).toBeVisible();
  });

  test("shows 3-phase delivery model", async ({ page }) => {
    await page.getByText("How We Deliver").scrollIntoViewIfNeeded();
    await expect(page.getByText("Strategy & Architecture")).toBeVisible();
    await expect(page.getByText("Build & Deploy (KAFE)")).toBeVisible();
    await expect(page.getByText("Run & Improve")).toBeVisible();
  });
});
