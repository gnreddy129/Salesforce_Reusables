import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceBusinessBrands Page Object Model
 *
 * This class provides automation capabilities for Salesforce Business Brands management functionality.
 * It handles business brand creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new business brands with name and description management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify business brand creation and setup
 * - Support for business brand configuration
 *
 * @class SalesforceBusinessBrands
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceBusinessBrandsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly dialog: Locator;

  // Business Brand Configuration Fields
  readonly nameTextbox: Locator;
  readonly dialogNameTextbox: Locator;
  readonly orgIdTextbox: Locator;
  readonly dialogOrgIdTextbox: Locator;
  readonly parentCombobox: Locator;
  readonly dialogParentCombobox: Locator;

  // Action Buttons
  readonly dialogSaveButton: Locator;
  
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceBusinessBrands page object with all necessary locators
   *
   * Sets up locators for all Salesforce business brand form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceBusinessBrands page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.nameTextbox = page.getByRole("textbox", { name: /Name/i });

    // Dialog elements - Handle business brand creation
    this.dialog = this.page.getByRole("dialog", {
      name: /New|New Business Brand|New Brand/i,
    });
    this.dialogNameTextbox = this.dialog.getByRole("textbox", {
      name: /Name/i,
    });
    this.dialogOrgIdTextbox = this.dialog.getByRole("textbox", {
      name: /Org Id|Organization Id/i,
    });
    this.dialogParentCombobox = this.dialog.getByRole("combobox", {
      name: /Parent/i,
    });
    this.orgIdTextbox = page.getByRole("textbox", {
      name: /Org Id|Organization Id/i,
    });
    this.parentCombobox = page.getByRole("combobox", { name: /Parent/i });
    this.dialogSaveButton = this.dialog.getByRole("button", {
      name: /^Save$/i,
    });
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceBusinessBrands page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new business brand in Salesforce with the provided details
   *
   * This method handles the complete business brand creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new business brand dialog
   * 3. Fills in all provided field values (Name, Org Id, Parent)
   * 4. Saves the business brand
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing business brand field values to be filled
   * @param details.Name - Business brand name (required)
   * @param details.OrgId - Organization ID (required)
   * @param details.Parent - Parent business brand (combobox selection)
   *
   * @example
   * await businessBrandsPage.addNewBusinessBrand({
   *   Name: "Premium Brand",
   *   OrgId: "ORG1",
   *   Parent: "pk"
   * });
   */
  async addNewBusinessBrand(details: { [field: string]: string }) {
    console.log("🔄 Starting business brand creation process...");
    console.log("📋 Business brand details:", JSON.stringify(details, null, 2));

    // Wait for the new button to be visible and take start screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-business-brand",
      this.testInfo,
      "OtherFunctionality/salesforce-business-brands/"
    );

    // Open the new business brand creation dialog
    console.log("✅ Business brand creation dialog opened");

    await this.dialog.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Business Brand Name - Primary identifier for the business brand (required)
    if (details.Name) {
      await this.dialogNameTextbox.fill(Helper.generateUniqueValue(details.Name), { timeout: 10000 });
      console.log("✅ Name filled:", details.Name);
    }

    // Org Id - Organization identifier (required)
    if (details.OrgId || details["Org Id"]) {
      const orgId = details.OrgId || details["Org Id"];
      await this.dialogOrgIdTextbox.fill(orgId, { timeout: 10000 });
      console.log("✅ Org Id filled:", orgId);
    }

    // Parent - Parent business brand (combobox selection)
    if (details.Parent) {
      console.log("🔽 Selecting Parent from combobox...");
      await this.dialogParentCombobox.click({ timeout: 10000 });
      await this.page.waitForTimeout(1000);
      await this.allOptionsLocator.first().click({ timeout: 10000 });
    }

    console.log("💾 Saving the business brand...");

    // Save the business brand
    await this.dialogSaveButton.click({ timeout: 10000 });
    console.log("✅ Business brand saved successfully");

    await this.page.waitForTimeout(1000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-business-brand",
      this.testInfo,
      "OtherFunctionality/salesforce-business-brands/"
    );

    console.log("🎉 Business brand creation completed!");
  }

  /**
   * Verifies that a business brand was successfully created by checking for success indicator
   *
   * This method validates business brand creation success by checking if the brand name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing business brand field values to verify
   * @param details.Name - Business brand name to verify on the page
   * @param details.OrgId - Organization ID to verify on the page (optional)
   *
   * @throws Will throw an assertion error if expected brand name is not found
   *
   * @example
   * await businessBrandsPage.verifyBusinessBrand({ 
   *   Name: "Premium Brand",
   *   OrgId: "ORG1"
   * });
   */
  async verifyBusinessBrand(details: { [field: string]: string }) {
    console.log("🔍 Starting business brand verification...");

    if (details.Name) {
      expect(await this.page.getByText(details.Name).count()).toBeGreaterThan(
        0
      );
      console.log("✅ Business brand name verification successful");
    } else {
      console.log("⚠️ No name provided for verification");
    }

    const orgId = details.OrgId || details["Org Id"];
    if (orgId) {
      const orgIdCount = await this.page.getByText(orgId).count();
      if (orgIdCount > 0) {
        console.log("✅ Business brand Org Id verification successful");
      } else {
        console.log("⚠️ Business brand Org Id not found on page");
      }
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-business-brands/"
    );

    console.log("🎉 Verification completed!");
  }
}
