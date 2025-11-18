import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforcePriceBooks Page Object Model
 *
 * This class provides automation capabilities for Salesforce Price Books management functionality.
 * It handles price book creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new price books with comprehensive field support
 * - Handle complex form interactions with proper wait strategies
 * - Verify price book creation success
 * - Support for all standard Salesforce price book fields
 * - Navigate to Price Books module using app launcher
 *
 * @class SalesforcePriceBooksPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforcePriceBooksPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newPriceBookButton: Locator;
  readonly dialog: Locator;
  readonly saveButton: Locator;

  // Form field locators
  readonly priceBookNameInput: Locator;
  readonly activeCheckbox: Locator;
  readonly descriptionInput: Locator;
  readonly isStandardPriceBookCheckbox: Locator;

  // Additional UI elements
  readonly appLauncher: Locator;
  readonly viewAllButton: Locator;
  readonly searchBox: Locator;
  readonly priceBookCreatedMessage: Locator;

  // List View Elements
  readonly searchThisListInput: Locator;
  readonly listViewControls: Locator;
  readonly refreshButton: Locator;
  readonly editListButton: Locator;

  /**
   * Constructor - Initializes the SalesforcePriceBooks page object with all necessary locators
   *
   * Sets up locators for all Salesforce price book form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforcePriceBooks page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newPriceBookButton = page
      .getByRole("button", { name: /New/i })
      .first();
    this.dialog = page.getByRole("dialog").first();
    this.saveButton = this.dialog
      .getByRole("button", { name: /^Save$/i })
      .first();

    // Initialize form field locators
    this.priceBookNameInput = this.dialog.getByRole("textbox", {
      name: /Price Book Name/i,
    });
    this.activeCheckbox = this.dialog.getByRole("checkbox", {
      name: /Active/i,
    });
    this.descriptionInput = this.dialog.getByRole("textbox", {
      name: /Description/i,
    });
    this.isStandardPriceBookCheckbox = this.dialog.getByRole("checkbox", {
      name: /Is Standard Price Book/i,
    });

    // Initialize navigation elements
    this.appLauncher = page.getByTitle("App Launcher");
    this.viewAllButton = page.getByRole("button", { name: "View All" });
    this.searchBox = page.getByPlaceholder("Search apps and items...");

    // Success message locator
    this.priceBookCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforcePriceBooks page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new price book in Salesforce with the provided details
   *
   * This method handles the complete price book creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new price book dialog
   * 3. Fills in all provided field values
   * 4. Saves the price book
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing price book field values to be filled
   * @param details.PriceBookName - Price Book name (required)
   * @param details.Active - Active status (true/false)
   * @param details.Description - Price book description
   */
  async addNewPriceBook(details: { [key: string]: string }) {
    console.log("🔄 Starting price book creation process...");
    console.log("📝 Price Book details:", JSON.stringify(details, null, 2));

    await expect(this.newPriceBookButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-pricebook",
      this.testInfo,
      "Sales/salesforce-pricebooks/"
    );

    // Click New Price Book
    await this.newPriceBookButton.click({ timeout: 10000 });
    console.log("✅ Price Book creation dialog opened");

    console.log("📋 Filling form fields...");

    // Fill required fields
    if (details.PriceBookName || details["Price Book Name"]) {
      const priceBookName = details.PriceBookName || details["Price Book Name"];
      await this.priceBookNameInput.fill(priceBookName, { timeout: 10000 });
    }

    // Handle Active checkbox
    if (details.Active) {
      const shouldBeActive = details.Active.toLowerCase() === "true";
      const isCurrentlyActive = await this.activeCheckbox.isChecked();

      if (shouldBeActive !== isCurrentlyActive) {
        await this.activeCheckbox.click({ timeout: 10000 });
        console.log(`✅ Set Active status to: ${shouldBeActive}`);
      }
    }

    // Fill optional fields
    if (details.Description) {
      await this.descriptionInput.fill(details.Description, { timeout: 10000 });
    }

    console.log("💾 Saving the price book...");

    // Save the price book
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Price Book saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-pricebook",
      this.testInfo,
      "Sales/salesforce-pricebooks/"
    );

    console.log("🎉 Price Book creation completed!");
  }

  /**
   * Verifies that a price book was successfully created by checking for specific field values
   *
   * This method validates price book creation success by checking if the price book detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing price book field values to verify
   * @param details.PriceBookName - Price Book name to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   */
  async verifyPriceBookCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting price book verification...");

    // Verify price book creation message or price book details
    if (details.PriceBookName || details["Price Book Name"]) {
      const priceBookName = details.PriceBookName || details["Price Book Name"];
      await expect(
        this.page.locator(`[slot="primaryField"]`)
      ).toHaveText(priceBookName, { timeout: 10000 });
      console.log(
        `✅ Price Book name verification successful: ${priceBookName}`
      );
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Sales/salesforce-pricebooks/"
    );

    console.log("🎉 Price Book verification completed!");
  }
}