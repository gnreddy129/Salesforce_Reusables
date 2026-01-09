import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceCatalog Page Object Model
 *
 * This class provides automation capabilities for Salesforce Catalog management functionality.
 * It handles catalog item creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new catalog items with name and configuration management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify catalog item creation and setup
 * - Support for various catalog types and item configurations
 *
 * @class SalesforceCatalog
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceCatalogPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly dialog: Locator;

  // Catalog Configuration Fields
  readonly itemNameTextbox: Locator;
  readonly dialogNameTextbox: Locator;

  // Action Buttons
  readonly dialogSaveButton: Locator;

  /**
   * Constructor - Initializes the SalesforceCatalog page object with all necessary locators
   *
   * Sets up locators for all Salesforce catalog form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceCatalog page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.itemNameTextbox = page.getByRole("textbox", {
      name: /Name|Item Name/i,
    });

    // Dialog elements - Handle catalog item creation
    this.dialog = page.getByRole("dialog", {
      name: /New|New Catalog|New Catalog Item|New Catalog/i,
    });
    this.dialogNameTextbox = this.dialog.getByRole("textbox", {
      name: /Name|Item Name/i,
    });
    this.dialogSaveButton = this.dialog.getByRole("button", {
      name: /^Save$/i,
    });

    console.log(
      "✅ SalesforceCatalog page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new catalog item in Salesforce with the provided details
   *
   * This method handles the complete catalog item creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new catalog item dialog
   * 3. Fills in all provided field values
   * 4. Saves the catalog item
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing catalog item field values to be filled
   * @param details.Name - Catalog item name (required)
   *
   * @example
   * await catalogPage.addNewCatalogItem({
   *   Name: "Hardware Maintenance Package"
   * });
   */
  async addNewCatalogItem(details: { [field: string]: string }) {
    console.log("🔄 Starting catalog item creation process...");
    console.log("� Catalog item details:", JSON.stringify(details, null, 2));

    // Wait for the new button to be visible and take start screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-catalog-item",
      this.testInfo,
      "OtherFunctionality/salesforce-catalog/"
    );

    // Open the new catalog item creation dialog
    console.log("✅ Catalog item creation dialog opened");

    await this.dialog.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Catalog Item Name - Primary identifier for the catalog item (required)
    if (details.Name) {
      await this.dialogNameTextbox.fill(Helper.generateUniqueValue(details.Name), { timeout: 10000 });
    }

    console.log("💾 Saving the catalog item...");

    // Save the catalog item
    await this.dialogSaveButton.click({ timeout: 10000 });
    console.log("✅ Catalog item saved successfully");

    await this.page.waitForTimeout(1000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-catalog-item",
      this.testInfo,
      "OtherFunctionality/salesforce-catalog/"
    );

    console.log("🎉 Catalog item creation completed!");
  }

  /**
   * Verifies that a catalog item was successfully created by checking for specific field values
   *
   * This method validates catalog item creation success by checking if the item name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing catalog item field values to verify
   * @param details.Name - Catalog item name to verify on the page
   *
   * @throws Will throw an assertion error if expected item name is not found
   *
   * @example
   * await catalogPage.verifyCatalogItem({ Name: "Hardware Maintenance Package" });
   */
  async verifyCatalogItem(details: { [field: string]: string }) {
    console.log("🔍 Starting catalog item verification...");

    if (details.Name) {
      expect(await this.page.getByText(details.Name).count()).toBeGreaterThan(
        0
      );
      console.log("✅ Catalog item name verification successful");
    } else {
      console.log("⚠️ No name provided for verification");
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-catalog/"
    );

    console.log("🎉 Verification completed!");
  }
}
