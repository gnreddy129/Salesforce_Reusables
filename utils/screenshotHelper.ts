// Screenshot helper utility for consistent step-level screenshot handling
import { Helper } from "./helper";

/**
 * Takes a screenshot after each step for cucumber reporting
 * @param page - Playwright Page instance
 * @param testInfo - Playwright TestInfo
 * @param stepName
 * @param moduleName - Name of the module (price-books, contacts, etc.)
 */
export async function takeStepScreenshot(
  page: any,
  testInfo: any,
  stepName: string,
  moduleName: string
) {
  console.log(`📸 Taking ${stepName} screenshot...`);

  try {
    if (page && !page.isClosed()) {
      // Clean test name for file naming (remove special characters)
      const testName = testInfo.title.replace(/[^a-zA-Z0-9]/g, "_");
      const screenshotPath = `cucumber-reports/screenshots/${moduleName}/${moduleName}_${stepName}_${testName}.png`;

      // Take screenshot and save to cucumber reports
      await page.screenshot({
        fullPage: true,
        path: screenshotPath,
      });

      console.log(`✅ ${stepName} screenshot saved to: ${screenshotPath}`);
    } else {
      console.log(`⚠️ Page not available for ${stepName} screenshot`);
    }
  } catch (error) {
    console.log(`❌ Error taking ${stepName} screenshot:`, error.message);
  }
}

/**
 * Takes a screenshot for scenario completion
 * @param page - Playwright Page instance
 * @param testInfo - Playwright TestInfo
 * @param moduleName - Name of the module
 * @param status - Test status (PASSED, FAILED, etc.)
 */
export async function takeScenarioScreenshot(
  page: any,
  testInfo: any,
  moduleName: string,
  status: string
) {
  console.log(`📸 Taking scenario ${status} screenshot...`);

  try {
    if (page && !page.isClosed()) {
      const testName = testInfo.title.replace(/[^a-zA-Z0-9]/g, "_");
      const screenshotPath = `cucumber-reports/screenshots/${moduleName}/${moduleName}_SCENARIO_${status}_${testName}.png`;

      await page.screenshot({
        fullPage: true,
        path: screenshotPath,
      });

      console.log(
        `✅ Scenario ${status} screenshot saved to: ${screenshotPath}`
      );
    }
  } catch (error) {
    console.log(
      `❌ Error taking scenario ${status} screenshot:`,
      error.message
    );
  }
}
