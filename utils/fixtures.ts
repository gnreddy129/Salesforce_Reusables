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

  // Force auto-execution fixture - this will definitely run
  afterCucumberScenario: [
    async ({ page }, use, testInfo) => {
      console.log(`🚀🚀🚀 FIXTURE START: ${testInfo.title} 🚀🚀🚀`);

      let testError: Error | undefined;

      try {
        // Execute the test
        await use();
        console.log(`✅ FIXTURE: Test execution completed: ${testInfo.title}`);
      } catch (error) {
        console.log(`❌ FIXTURE: Test execution failed: ${testInfo.title}`);
        testError = error as Error;
        throw error;
      } finally {
        // This finally block WILL execute regardless of test outcome
        console.log(
          `🏁🏁🏁 FIXTURE FINALLY: ${testInfo.title} - Status: ${testInfo.status} 🏁🏁🏁`
        );

        try {
          // Always take a final screenshot if page is available
          if (page && !page.isClosed()) {
            console.log("📸 FIXTURE_FINALLY: Taking screenshot...");

            const screenshot = await page.screenshot({ fullPage: true });

            // Save to file system
            await Helper.takeScreenshotToFile(
              page,
              `fixture-finally-${
                testError ? "failed" : "passed"
              }-${Date.now()}`,
              testInfo,
              testError ? "scenario-errors/" : "scenario-finals/"
            );

            // Attach to cucumber report
            await testInfo.attach(
              testError
                ? "Fixture Error Screenshot"
                : "Fixture Final Screenshot",
              {
                body: screenshot,
                contentType: "image/png",
              }
            );

            console.log(
              `✅ FIXTURE_FINALLY: Screenshot captured for ${
                testError ? "FAILED" : "PASSED"
              } test`
            );
          } else {
            console.log(
              "⚠️ FIXTURE_FINALLY: Page not available for screenshot"
            );
          }

          console.log(
            `📊 FIXTURE_FINALLY: Test ${testError ? "FAILED" : "PASSED"}: ${
              testInfo.title
            }`
          );
        } catch (finallyError) {
          console.log(
            "❌ FIXTURE_FINALLY: Error in finally block:",
            finallyError
          );
        }

        console.log(
          `🏁 FIXTURE_FINALLY: Cleanup completed for ${testInfo.title} 🏁`
        );
      }
    },
    { auto: true },
  ],
});

// Force after hook using base test - this should definitely work
const baseTest = base;

baseTest.afterEach(async ({ page }, testInfo) => {
  console.log(`�🎯🎯 AFTER HOOK TRIGGERED 🎯🎯🎯`);
  console.log(`🎯 Test: ${testInfo.title}`);
  console.log(`🎯 Status: ${testInfo.status}`);
  console.log(`🎯 Duration: ${testInfo.duration}ms`);
  console.log(`🎯🎯🎯 AFTER HOOK TRIGGERED 🎯🎯🎯`);

  try {
    // Always try to take screenshot regardless of page state
    if (page) {
      console.log("📸 AFTER_HOOK: Attempting screenshot...");

      try {
        if (!page.isClosed()) {
          const screenshot = await page.screenshot({ fullPage: true });

          // Save to file system
          await Helper.takeScreenshotToFile(
            page,
            `after-hook-${testInfo.status}-${Date.now()}`,
            testInfo,
            "scenario-finals/"
          );

          // Attach to cucumber report
          await testInfo.attach(`After Hook Screenshot (${testInfo.status})`, {
            body: screenshot,
            contentType: "image/png",
          });

          console.log(
            `✅ AFTER_HOOK: Screenshot captured for ${testInfo.status} test`
          );
        } else {
          console.log("⚠️ AFTER_HOOK: Page is closed, cannot take screenshot");
        }
      } catch (screenshotError) {
        console.log("❌ AFTER_HOOK: Screenshot failed:", screenshotError);
      }
    } else {
      console.log("⚠️ AFTER_HOOK: No page object available");
    }

    // Log detailed test information
    console.log(`📊 AFTER_HOOK: Test Details:`);
    console.log(`   - Title: ${testInfo.title}`);
    console.log(`   - Status: ${testInfo.status}`);
    console.log(`   - Duration: ${testInfo.duration}ms`);
    console.log(`   - File: ${testInfo.file}`);

    if (testInfo.error) {
      console.log(`   - Error: ${testInfo.error.message}`);
    }
  } catch (error) {
    console.log("❌ AFTER_HOOK: Critical error in after hook:", error);
  }

  console.log(`🎯 AFTER_HOOK: Completed for ${testInfo.title} 🎯`);
});

// Also add it to the extended test
test.afterEach(async ({ page }, testInfo) => {
  console.log(`🔥🔥🔥 EXTENDED TEST AFTER HOOK 🔥🔥🔥`);
  console.log(`🔥 Test: ${testInfo.title} - Status: ${testInfo.status}`);

  try {
    if (page && !page.isClosed()) {
      console.log("📸 EXTENDED_AFTER: Taking screenshot...");

      const screenshot = await page.screenshot({ fullPage: true });

      await testInfo.attach(`Extended After Screenshot`, {
        body: screenshot,
        contentType: "image/png",
      });

      console.log("✅ EXTENDED_AFTER: Screenshot attached");
    }
  } catch (error) {
    console.log("❌ EXTENDED_AFTER: Error:", error);
  }

  console.log(`🔥 EXTENDED_AFTER: Hook completed 🔥`);
});

export { expect } from "@playwright/test";
