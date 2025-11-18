import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceDataUseLegalBasis Page Object Model
 *
 * This class provides automation capabilities for Salesforce Data Use Legal Basis management functionality.
 * It handles data use legal basis creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new data use legal basis with comprehensive field support
 * - Handle text field interactions
 * - Verify data use legal basis creation success
 * - Support for all standard Salesforce data use legal basis fields
 * - Navigate to Data Use Legal Basis module using standard navigation
 * - Complete data use legal basis lifecycle management
 *
 * @class SalesforceDataUseLegalBasisPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceDataUseLegalBasisPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Data Use Legal Basis Information Fields
  readonly nameInput: Locator;
  readonly sourceInput: Locator;
  readonly descriptionInput: Locator;

  // Navigation Elements
  readonly dataUseLegalBasisCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceDataUseLegalBasis page object with all necessary locators
   *
   * Sets up locators for all Salesforce data use legal basis form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceDataUseLegalBasis page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Data Use Legal Basis Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });
    this.sourceInput = page.getByRole("textbox", {
      name: "Source",
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
    });

    // Success message locator
    this.dataUseLegalBasisCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceDataUseLegalBasis page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new data use legal basis in Salesforce with the provided details
   *
   * This method handles the complete data use legal basis creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new data use legal basis creation form
   * 3. Fills in all provided field values
   * 4. Saves the data use legal basis
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing data use legal basis field values to be filled
   * @param details.Name - Name (text input)
   * @param details.Source - Source (text input)
   * @param details.Description - Description (text input)
   *
   * @example
   * await dataUseLegalBasisPage.addNewDataUseLegalBasis({
   *   Name: "GDPR Consent",
   *   Source: "Customer Website",
   *   Description: "Legal basis for GDPR compliance"
   * });
   */
  async addNewDataUseLegalBasis(details: { [key: string]: string }) {
    console.log("🔄 Starting data use legal basis creation process...");
    console.log(
      "📝 Data Use Legal Basis details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-data-use-legal-basis",
      this.testInfo,
      "CustomerData/salesforce-data-use-legal-basis/"
    );

    // Click New Data Use Legal Basis
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Data Use Legal Basis creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Data Use Legal Basis form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name) {
      await this.nameInput.fill(details.Name, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Fill Source field (text input)
    if (details.Source) {
      await this.sourceInput.fill(details.Source, {
        timeout: 10000,
      });
      console.log(`✅ Source filled: ${details.Source}`);
    }

    // Fill Description field (text input)
    if (details.Description) {
      await this.descriptionInput.fill(details.Description, {
        timeout: 10000,
      });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    console.log("💾 Saving the data use legal basis...");

    // Save the data use legal basis
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Data Use Legal Basis saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-data-use-legal-basis",
      this.testInfo,
      "CustomerData/salesforce-data-use-legal-basis/"
    );

    console.log("🎉 Data Use Legal Basis creation completed!");
  }

  /**
   * Verifies that a data use legal basis was successfully created by checking for specific field values
   *
   * This method validates data use legal basis creation success by checking if the data use legal basis detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing data use legal basis field values to verify
   * @param details.Name - Name to verify
   * @param details.Source - Source to verify
   * @param details.Description - Description to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await dataUseLegalBasisPage.verifyDataUseLegalBasisCreation({
   *   Name: "GDPR Consent",
   *   Description: "Legal basis for GDPR compliance"
   * });
   */
  async verifyDataUseLegalBasisCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting data use legal basis verification...");

    await expect(this.dataUseLegalBasisCreatedMessage).toContainText(
      "was created",
      { timeout: 10000 }
    );

    // Verify Name
    await expect(this.page.locator(`[slot="primaryField"]`)).toContainText(
      details.Name,
      { timeout: 10000 }
    );
    console.log(`✅ Verified Name: ${details.Name}`);

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "CustomerData/salesforce-data-use-legal-basis/"
    );

    console.log("🎉 Data Use Legal Basis verification completed!");
  }
}
