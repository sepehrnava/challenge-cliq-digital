/* eslint-disable playwright/no-wait-for-timeout */
import { expect, test } from "@playwright/test";

// Don't use the default user agent to avoid the requests to be blocked by Clerk middleware.
test.use({ userAgent: "" });

test.describe("Weather", () => {
  test.describe("Basic operations", () => {
    test("changing the unit should update the weather unit", async ({
      page,
    }) => {
      await page.goto("/?city=249758&unit=metric");
      await page.waitForTimeout(2000);
      const forecastWrapper = page.locator("div#futureForecast");
      expect(forecastWrapper).not.toBeNull();
      // get elemets with data-testid="maxTemp"
      const maxTemps = forecastWrapper.locator('[data-testid="maxTemp"]');
      // check if the elements are not null
      expect(maxTemps).not.toBeNull();
      // get the first element textContent
      const maxTemp = await maxTemps.first().textContent();
      // check if the textContent is not null
      expect(maxTemp).not.toBeNull();
      const unitToImperial = page.locator("button#unitToImperial");
      await unitToImperial.click();
      await page.waitForTimeout(2000);
      // check if the textContent is not null and not equal to the previous value
      expect(await maxTemps.first().textContent()).not.toBeNull();
      await expect(maxTemps.first()).not.toHaveText(maxTemp!);
    });
  });
});
