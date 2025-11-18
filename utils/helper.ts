import { type Page, TestInfo } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export class Helper {
  /**
   * Attaches a screenshot to the Playwright test report
   *
   * @param page - Playwright Page instance
   * @param screenshotName - Name for the screenshot in the report
   * @param testInfo - Playwright TestInfo for attaching to report
   */
  static async attachScreenshotToReport(
    page: Page,
    screenshotName: string,
    testInfo: TestInfo
  ) {
    const screenshot = await page.screenshot();
    await testInfo.attach(screenshotName, {
      body: screenshot,
      contentType: "image/png",
    });
  }

  /**
   *
   * @param page - Playwright Page instance
   * @param screenshotName - Name for the screenshot file (without extension)
   * @param testInfo - Optional TestInfo to also attach to report
   * @param subfolder - Optional subfolder within screenshots directory
   * @returns Promise<string> - Path to the saved screenshot
   */
  static async takeScreenshotToFile(
    page: Page,
    screenshotName: string,
    testInfo?: TestInfo,
    subfolder?: string
  ): Promise<string> {
    const screenshotsBaseDir = path.join(process.cwd(), "screenshots");
    const screenshotsDir = subfolder
      ? path.join(screenshotsBaseDir, subfolder)
      : screenshotsBaseDir;

    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const screenshotPath = path.join(screenshotsDir, `${screenshotName}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Also attach to test report if testInfo is provided
    if (testInfo) {
      const screenshot = fs.readFileSync(screenshotPath);
      await testInfo.attach(screenshotName, {
        body: screenshot,
        contentType: "image/png",
      });
    }

    console.log(`Screenshot saved: ${screenshotName}`);
    return screenshotPath;
  }
}
