import { test as base } from "@playwright/test";
import { CommonPage } from "../pages/commonPage";
import { Helper } from "./helper";

// Declare the types of your fixtures.
type MyFixtures = {
  commonPage: CommonPage;
  afterCucumberScenario: void;
};

export const test = base.extend<MyFixtures>({
  commonPage: async ({ page }, use) => {
    const commonPage = new CommonPage(page);
    await use(commonPage);
  },

  // After Cucumber Scenario fixture - runs after each scenario
  afterCucumberScenario: [
    async ({ page }, use, testInfo) => {
      await use();

      // Post-scenario cleanup and documentation
      try {
        console.log(`🏁 Scenario completed: ${testInfo.title}`);

        // Take final scenario screenshot for documentation
        if (page && !page.isClosed()) {
          const screenshot = await page.screenshot({ fullPage: true });

          // Save to file system
          await Helper.takeScreenshotToFile(
            page,
            `final-scenario-${Date.now()}`,
            testInfo,
            "scenario-finals/"
          );

          // Attach to cucumber report
          await testInfo.attach("Final Scenario Screenshot", {
            body: screenshot,
            contentType: "image/png",
          });

          console.log(
            "📸 Final scenario screenshot captured and attached to cucumber report"
          );
        }

        // Log scenario status
        if (testInfo.status === "passed") {
          console.log(`✅ Scenario PASSED: ${testInfo.title}`);
        } else if (testInfo.status === "failed") {
          console.log(`❌ Scenario FAILED: ${testInfo.title}`);

          // Take error screenshot on failure
          if (page && !page.isClosed()) {
            const errorScreenshot = await page.screenshot({ fullPage: true });

            // Save to file system
            await Helper.takeScreenshotToFile(
              page,
              `error-scenario-${Date.now()}`,
              testInfo,
              "scenario-errors/"
            );

            // Attach to cucumber report
            await testInfo.attach("Error Screenshot", {
              body: errorScreenshot,
              contentType: "image/png",
            });

            console.log(
              "📸 Error screenshot captured and attached to cucumber report"
            );
          }
        }

        // Additional cleanup operations can be added here
        // Example: Clear browser storage, reset test data, etc.
      } catch (error) {
        console.log(
          "⚠️ Warning: Error in afterCucumberScenario fixture:",
          error
        );
        // Don't throw the error to avoid masking the original test failure
      }
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
