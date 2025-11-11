import { expect, type Locator, type Page, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceHome Page Object Model
 *
 * This class provides automation capabilities for Salesforce Home page functionality.
 * It handles app navigation, search functionality, and home page interactions with
 * robust locator strategies for reliable test execution.
 *
 * Features:
 * - App launcher navigation
 * - Application search and selection
 * - Home page component verification
 * - Robust wait strategies for dynamic loading
 *
 * @class salesforceHomeLocators
 * @author Automation Team
 * @version 1.0
 */
export class SalesforceHomePage {
  readonly page: Page;
  private testInfo?: TestInfo;
  // Navigation Elements
  readonly app_launcher: Locator;
  readonly viewAll_link: Locator;

  // Search Elements
  readonly allApps: Locator;
  readonly closeIcon: Locator;
  readonly search_text_box: Locator;
  readonly searchedresult_campagin: Locator;

  // Verification Elements
  readonly home_component: Locator;

  /**
   * Constructor - Initializes the SalesforceHome page object with all necessary locators
   *
   * Sets up locators for Salesforce home page elements including app launcher,
   * search functionality, and navigation components using XPath and role-based selectors.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceHome page object");
    this.page = page;
    this.testInfo = testInfo;
    // Home page verification elements
    this.home_component = page.locator("//div[@id='setupComponent']");

    // Navigation elements for app launcher
    this.app_launcher = page.locator("//button[@title='App Launcher']");
    this.viewAll_link = page.getByRole("button", { name: "View All" });

    // Search functionality elements
    this.allApps = page.locator('[title="All Apps"]');
    this.closeIcon = page.locator(".closeIcon");
    this.search_text_box = page.locator(
      "//input[@placeholder='Search apps and items...']"
    );
    this.searchedresult_campagin = page.locator(
      " //b[contains(text(),'Campaigns')]"
    );

    console.log(
      "✅ SalesforceHome page object initialized successfully with all locators"
    );
  }
  /**
   * Searches for and navigates to a specific Salesforce application
   *
   * This method handles the complete app navigation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the app launcher
   * 3. Accesses the full app directory
   * 4. Locates and clicks the specified application
   * 5. Takes an end screenshot for verification
   *
   * Includes proper wait strategies for dynamic loading and robust error handling.
   *
   * @param appName - Name of the Salesforce application to search for and open
   *
   * @throws Will throw an error if:
   * - App launcher is not accessible
   * - Specified application is not found
   * - Navigation timeout occurs
   *
   * @example
   * await homePage.searchApp("Sales");
   * await homePage.searchApp("Service");
   * await homePage.searchApp("Marketing");
   */
  async searchApp(appName: string) {
    console.log("🔄 Starting app search and navigation...");
    console.log(`📱 Searching for app: ${appName}`);

    // Wait for app launcher to be visible and click it
    await expect(this.app_launcher).toBeVisible({ timeout: 20000 });
    console.log("✅ App launcher is visible");

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-app-search",
      this.testInfo,
      "OtherFunctionality/salesforce-home/"
    );

    // Click App Launcher
    await this.app_launcher.click({ timeout: 30000 });
    console.log("✅ App launcher opened");

    // Click View All to access full app directory
    await this.viewAll_link.click({ timeout: 10000 });
    await this.page.waitForTimeout(2000);
    console.log("✅ Opened full app directory");
    console.log(`🔍 Locating app: ${appName}`);
    // const spinnerVisible = await this.page
    //   .locator('[part="spinner"]')
    //   .first()
    //   .isVisible();

    if (
      await this.page
        .getByRole("link", { name: appName, exact: true })
        .isVisible()
    ) {
      console.log("❌ All Apps section not visible, retrying navigation...");
      await this.closeIcon.click({ timeout: 10000 });

      // Click App Launcher Again
      await this.app_launcher.click({ timeout: 30000 });
      console.log("✅ App launcher opened again");

      // Click View All to access full app directory
      await this.viewAll_link.click({ timeout: 10000 });
      console.log("✅ Opened full app directory");

      console.log(`🔍 Locating app: ${appName}`);
    }
    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-app-navigation",
      this.testInfo,
      "OtherFunctionality/salesforce-home/"
    );

    // Search for the app and click it
    await this.page
      .getByRole("link", { name: appName, exact: true })
      .click({ timeout: 10000 });
    console.log(`✅ Successfully navigated to ${appName} app`);

    console.log("🎉 App navigation completed!");
  }
}
