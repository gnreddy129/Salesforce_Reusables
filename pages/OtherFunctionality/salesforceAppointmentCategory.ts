import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceAppointmentCategory Page Object Model
 *
 * This class provides automation capabilities for Salesforce Appointment Category management functionality.
 * It handles category creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new appointment categories with various types
 * - Handle category configuration (Regular, Drop In, Group)
 * - Verify category creation and setup
 * - Support for category metadata management
 *
 * @class SalesforceAppointmentCategory
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceAppointmentCategoryPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly dialog: Locator;

  // Category Configuration Fields
  readonly nameTextbox: Locator;
  readonly descriptionTextbox: Locator;

  // Category Type Checkboxes
  readonly regularCheckbox: Locator;
  readonly dropInCheckbox: Locator;
  readonly groupCheckbox: Locator;

  // Action Buttons
  readonly saveButton: Locator;

  /**
   * Constructor - Initializes the SalesforceAppointmentCategory page object with all necessary locators
   *
   * Sets up locators for all Salesforce appointment category form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceAppointmentCategory page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: /New|New Category/i });
    this.dialog = page.getByRole("dialog").first();

    // Category configuration fields - Handle category metadata
    this.nameTextbox = page.getByRole("textbox", {
      name: /Name|Category Name/i,
    });
    this.descriptionTextbox = page.getByRole("textbox", {
      name: /Description/i,
    });

    // Category type checkboxes - Handle category types
    this.regularCheckbox = page.getByRole("checkbox", { name: /Regular/i });
    this.dropInCheckbox = page.getByRole("checkbox", { name: /Drop In/i });
    this.groupCheckbox = page.getByRole("checkbox", { name: /Group/i });

    // Action buttons - Save operations
    this.saveButton = page.getByRole("button", { name: /^Save$/i });

    console.log(
      "✅ SalesforceAppointmentCategory page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new appointment category in Salesforce with the provided details
   *
   * This method handles the complete appointment category creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new category dialog
   * 3. Fills in all provided field values
   * 4. Configures category types (Regular, Drop In, Group)
   * 5. Saves the category and takes an end screenshot for verification
   *
   * @param details - Object containing category field values to be filled
   * @param details.Name - Category name (required)
   * @param details.Description - Category description
   * @param details.Regular - Enable Regular type ("yes" to enable)
   * @param details.DropIn - Enable Drop In type ("yes" to enable)
   * @param details.Group - Enable Group type ("yes" to enable)
   *
   * @example
   * await categoryPage.addNewAppointmentCategory({
   *   Name: "Medical Consultation",
   *   Description: "General medical consultation appointments",
   *   Regular: "yes",
   *   DropIn: "no"
   * });
   */
  async addNewAppointmentCategory(details: { [field: string]: string }) {
    console.log("🔄 Starting appointment category creation process...");
    console.log("📝 Category details:", JSON.stringify(details, null, 2));

    // Wait for the new button to be visible and take start screenshot
    await expect(this.newButton).toBeVisible({ timeout: 10000 });
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-category",
      this.testInfo,
      "OtherFunctionality/salesforce-appointment-categories/"
    );

    // Open the new category creation dialog
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Category creation dialog opened");

    const dialog = this.page.getByRole("dialog", {
      name: /New|New Appointment Category|New Category/i,
    });

    await dialog.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Category Name - Primary identifier for the category (required)
    if (details.Name) {
      await dialog
        .getByRole("textbox", { name: /Name|Category Name/i })
        .fill(details.Name, { timeout: 10000 });
    }

    // Category Description - Detailed explanation of category purpose
    if (details.Description) {
      await dialog
        .getByRole("textbox", { name: /Description/i })
        .fill(details.Description, { timeout: 10000 });
    }

    // Category types configuration
    if (details.Regular?.toLowerCase() === "yes") {
      await this.regularCheckbox.check({ timeout: 10000 });
    }

    if (details.DropIn?.toLowerCase() === "yes") {
      await this.dropInCheckbox.check({ timeout: 10000 });
    }

    if (details.Group?.toLowerCase() === "yes") {
      await this.groupCheckbox.check({ timeout: 10000 });
    }

    console.log("💾 Saving the category...");

    // Save the category
    const dialogSave = dialog.getByRole("button", { name: /^Save$/i });
    if ((await dialogSave.count()) > 0) {
      await dialogSave.click({ timeout: 10000 });
    } else {
      await this.saveButton.click({ timeout: 10000 });
    }
    console.log("✅ Category saved successfully");

    await this.page.waitForTimeout(1000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-category",
      this.testInfo,
      "OtherFunctionality/salesforce-appointment-categories/"
    );

    console.log("🎉 Category creation completed!");
  }

  /**
   * Verifies that an appointment category was successfully created by checking for specific field values
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
   * await categoryPage.verifyAppointmentCategory({ Name: "Medical Consultation" });
   */
  async verifyAppointmentCategory(details: { [field: string]: string }) {
    console.log("🔍 Starting category verification...");

    if (details.Name) {
      expect(await this.page.getByText(details.Name).count()).toBeGreaterThan(
        0
      );
      console.log("✅ Category name verification successful");
    } else {
      console.log("⚠️ No name provided for verification");
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-appointment-categories/"
    );

    console.log("🎉 Verification completed!");
  }
}
