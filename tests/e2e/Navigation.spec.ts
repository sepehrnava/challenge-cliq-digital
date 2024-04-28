import percySnapshot from "@percy/playwright";
import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test.describe("Static pages", () => {
    test("should have svg#chart if navigate to searchParams", async ({
      page,
    }) => {
      await page.goto("?city=26216");
      const svg = page.locator("svg#chart");
      expect(svg).not.toBeNull();
      await percySnapshot(page, "Homepage");
    });
  });
});
