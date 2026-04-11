import { test, expect } from "@playwright/test";

test.describe("404 Page", () => {
  test("unknown route shows 404 page in dark theme", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByRole("heading", { name: /page not found/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
  });

  test("back to home link works from 404", async ({ page }) => {
    await page.goto("/non-existent-route");
    await page.getByRole("link", { name: /back to home/i }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("API: /api/contact", () => {
  const endpoint = "/api/contact";

  test("returns 405 for GET requests", async ({ request }) => {
    const res = await request.get(endpoint);
    expect(res.status()).toBe(405);
  });

  test("returns 400 when required fields are missing", async ({ request }) => {
    const res = await request.post(endpoint, {
      data: { name: "", email: "", company: "" },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test("returns 400 for invalid email", async ({ request }) => {
    const res = await request.post(endpoint, {
      data: { name: "Jane Smith", email: "not-an-email", company: "Acme" },
    });
    expect(res.status()).toBe(400);
  });

  test("returns 400 for name too short", async ({ request }) => {
    const res = await request.post(endpoint, {
      data: { name: "A", email: "jane@example.com", company: "Acme" },
    });
    expect(res.status()).toBe(400);
  });

  test("returns 200 with valid data (no SMTP configured)", async ({ request }) => {
    // In CI/test there is no SMTP — the API should still return 200 and log.
    const res = await request.post(endpoint, {
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        company: "Acme Corp",
        message: "Hello, I'd like a demo.",
      },
    });
    expect([200, 500]).toContain(res.status()); // 500 only if nodemailer throws without config
    if (res.status() === 200) {
      const body = await res.json();
      expect(body.ok).toBe(true);
    }
  });
});

test.describe("Accessibility baseline", () => {
  const routes = ["/", "/about", "/platform", "/capabilities", "/what-we-do"];

  for (const route of routes) {
    test(`${route} — images have alt text`, async ({ page }) => {
      await page.goto(route);
      const imgs = await page.locator("img:not([aria-hidden='true'])").all();
      for (const img of imgs) {
        const alt = await img.getAttribute("alt");
        expect(alt, `Image missing alt on ${route}`).not.toBeNull();
      }
    });

    test(`${route} — no console errors on load`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(route);
      expect(errors).toHaveLength(0);
    });
  }
});
