import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceDataUsePurpose Page Object Model
 *
 * This class provides automation capabilities for Salesforce Data Use Purpose management functionality.
 * It handles data use purpose creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new data use purpose with comprehensive field support
 * - Handle text field interactions
 * - Verify data use purpose creation success
 * - Support for all standard Salesforce data use purpose fields
 * - Navigate to Data Use Purpose module using standard navigation
 * - Complete data use purpose lifecycle management
 *
 * @class SalesforceDataUsePurposePage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceDataUsePurposePage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Data Use Legal Basis Information Fields
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;
  readonly legalBasisComboBox: Locator;
  readonly canDataSubjectOptOutCheckbox: Locator;

  // Navigation Elements
  readonly dataUsePurposeCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceDataUsePurpose page object with all necessary locators
   *
   * Sets up locators for all Salesforce data use legal basis form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceDataUsePurpose page object");
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
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
    });
    this.legalBasisComboBox = page.getByRole("combobox", {
      name: "Legal Basis",
    });
    this.canDataSubjectOptOutCheckbox = page.getByRole("checkbox", {
      name: "Can Data Subject Opt Out",
    });

    // Success message locator
    this.dataUsePurposeCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceDataUsePurpose page object initialized successfully with all locators"
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
   * @param details.Description - Description (text input)
   * @param details.LegalBasis - Legal Basis (combobox)
   * @param details.CanDataSubjectOptOut - Can Data Subject Opt Out (boolean as string "true"/"false")
   *
   * @example
   * await dataUsePurposePage.addNewDataUsePurpose({
   *   Name: "GDPR Consent",
   *   Description: "Legal basis for GDPR compliance",
   *   LegalBasis: "Consent",
   *   CanDataSubjectOptOut: "true"
   * });
   */
  async addNewDataUsePurpose(details: { [key: string]: string }) {
    console.log("🔄 Starting data use purpose creation process...");
    console.log(
      "📝 Data Use Purpose details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-data-use-purpose",
      this.testInfo,
      "CustomerData/salesforce-data-use-purpose/"
    );

    // Click New Data Use Purpose
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Data Use Purpose creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Data Use Purpose form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name) {
      await this.nameInput.fill(details.Name, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Fill Description field (text input)
    if (details.Description && details.Description !=="--None--") {
      await this.descriptionInput.fill(details.Description, {
        timeout: 10000,
      });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    if (details["Legal Basis"] && details["Legal Basis"] !== "--None--") {
      await this.legalBasisComboBox.click();
      const legalBasisOption = details.LegalBasis || details["Legal Basis"];
      await this.page
        .getByRole("option", { name: legalBasisOption }).first()
        .click({ timeout: 10000 });
      console.log(`✅ Legal Basis selected: ${legalBasisOption}`);
    }

    if (details["Can Data Subject Opt Out"] === "true"
      || details.CanDataSubjectOptOut === "true") {
      await this.canDataSubjectOptOutCheckbox.check({ timeout: 10000 });
      console.log("✅ Can Data Subject Opt Out checked");
    }

    // Save the data use legal basis
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Data Use Legal Basis saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-data-use-purpose",
      this.testInfo,
      "CustomerData/salesforce-data-use-purpose/"
    );

    console.log("🎉 Data Use Purpose creation completed!");
  }

  /**
   * Verifies that a data use purpose was successfully created by checking for specific field values
   *
   * This method validates data use purpose creation success by checking if the data use purpose detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing data use purpose field values to verify
   * @param details.Name - Name to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await dataUsePurposePage.verifyDataUsePurposeCreation({
   *   Name: "GDPR Consent",
   *   Description: "Legal basis for GDPR compliance"
   * });
   */
  async verifyDataUsePurposeCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting data use legal basis verification...");

    await expect(this.dataUsePurposeCreatedMessage).toContainText(
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
      "CustomerData/salesforce-data-use-purpose/"
    );

    console.log("🎉 Data Use Legal Basis verification completed!");
  }
}
