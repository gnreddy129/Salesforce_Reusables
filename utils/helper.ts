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
   * Takes a screenshot and saves it to the screenshots folder with organized structure
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
    const baseDir = path.join(process.cwd(), "screenshots");
    const screenshotDir = subfolder ? path.join(baseDir, subfolder) : baseDir;

    // Ensure directory exists
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const screenshotPath = path.join(
      screenshotDir,
      `${screenshotName}.png`
    );
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Also attach to test report if testInfo is provided
    if (testInfo) {
      await this.attachScreenshotToReport(page, screenshotName, testInfo);
    }

    console.log(`Screenshot saved`);
    return screenshotPath;
  }
}
