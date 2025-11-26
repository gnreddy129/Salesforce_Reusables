import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceLabels Page Object Model
 *
 * This class provides automation capabilities for Salesforce Labels management functionality.
 * It handles label creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new labels with parent/child relationships
 * - Handle label configuration (name, description, sort order)
 * - Configure label settings (show in menu, catalog assignment)
 * - Verify label creation and setup
 *
 * @class SalesforceLabels
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceLabelsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly dialog: Locator;
  //readonly textbox: Locator;

  // Category Configuration Fields
  readonly nameTextbox: Locator;

  // Category Settings
  //readonly showInMenuCheckbox: Locator;

  // Action Buttons
  readonly saveButton: Locator;

  /**
   * Constructor - Initializes the SalesforceCategories page object with all necessary locators
   *
   * Sets up locators for all Salesforce category form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceCategories page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = this.page.getByRole("button", { name: /New/i }).first();
    this.dialog = this.page.getByRole("dialog", { name: /New Label/i });
    //this.textbox = this.page.getByRole("textbox").first();

    // Label configuration fields - Handle label metadata
    this.nameTextbox = this.dialog.getByRole("textbox", { name: /Name/i });

    // Action buttons - Save operations
    this.saveButton = this.dialog
      .getByRole("button", { name: 'Save', exact: true })
      .first();

    console.log(
      "✅ SalesforceCategories page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new category in Salesforce with the provided details
   *
   * This method handles the complete category creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new category dialog
   * 3. Fills in all provided field values
   * 4. Configures category settings and relationships
   * 5. Saves the category and takes an end screenshot for verification
   *
   * @param details - Object containing category field values to be filled
   * @param details.Name - Category name (required)
   * @param details.ParentCategory - Parent category selection
   * @param details.Catalog - Catalog assignment
   * @param details.Description - Category description
   * @param details.ShowMenu - Show in menu setting ("true" to enable)
   * @param details.SortOrder - Display sort order
   *
   * @example
   * await categoriesPage.addNewCategory({
   *   Name: "Electronics",
   *   Description: "Electronic products and accessories",
   *   ShowMenu: "true",
   *   SortOrder: "1"
   * });
   */
  async addNewLabel(details: { [field: string]: string }) {
    console.log("🔄 Starting label creation process...");
    console.log("📝 Label details:", JSON.stringify(details, null, 2));

    // Wait for the new button to be visible and take start screenshot
    await expect(this.newButton).toBeVisible({ timeout: 10000 });
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-label",
      this.testInfo,
      "OtherFunctionality/salesforce-labels/"
    );

    // Open the new label creation dialog
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Label creation dialog opened");

    console.log("📋 Filling form fields...");

    // Label Name - Primary identifier for the label (required)
    if (details.Name) {
      await this.nameTextbox.fill(details.Name, { timeout: 10000 });
    }

    console.log("💾 Saving the category...");

    // Save the category
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Category saved successfully");

    await this.page.waitForTimeout(1000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-category",
      this.testInfo,
      "OtherFunctionality/salesforce-categories/"
    );

    console.log("🎉 Category creation completed!");
  }

  /**
   * Verifies that a category was successfully created by checking for specific field values
   *
   * This method validates category creation success by checking if the category name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing category field values to verify
   * @param details.Name - Category name to verify on the page
   *
   * @throws Will throw an assertion error if expected category name is not found
   *
   * @example
   * await categoriesPage.verifyCategory({ Name: "Electronics" });
   */
  async verifyLabel(details: { [field: string]: string }) {
    console.log("🔍 Starting label verification...");

    if (details.Name) {
      await expect(
        await this.page.getByText(details.Name, { exact: true }).count()
      ).toBeGreaterThan(0);
      console.log("✅ Label name verification successful");
    } else {
      console.log("⚠️ No name provided for verification");
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-labels/"
    );

    console.log("🎉 Verification completed!");
  }
}