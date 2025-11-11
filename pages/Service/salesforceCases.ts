import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceCases Page Object Model
 *
 * This class provides automation capabilities for Salesforce Case management functionality.
 * It handles case creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new cases with various field types (dropdowns, text inputs)
 * - Handle complex form interactions with proper wait strategies
 * - Verify case creation success
 * - Support for all standard Salesforce case fields
 *
 * @class SalesforceCases
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceCasesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly dialog: Locator;
  readonly listbox: Locator;

  // Dropdown/Combobox Fields for Case Properties
  readonly statusCombo: Locator;
  readonly originCombo: Locator;
  readonly priorityCombo: Locator;
  readonly typeCombo: Locator;
  readonly reasonCombo: Locator;
  readonly prodCombo: Locator;
  readonly plCombo: Locator;
  readonly slaCombo: Locator;

  // Text Input Fields for Case Details
  readonly engineeringReqTextbox: Locator;
  readonly subjectTextbox: Locator;
  readonly descriptionTextbox: Locator;
  readonly internalCommentsTextbox: Locator;

  // Web-to-Case Information Fields
  readonly webEmailTextbox: Locator;
  readonly webCompanyTextbox: Locator;
  readonly webNameTextbox: Locator;
  readonly webPhoneTextbox: Locator;

  // Action Buttons
  readonly saveButton: Locator;

  /**
   * Constructor - Initializes the SalesforceCases page object with all necessary locators
   *
   * Sets up locators for all Salesforce case form elements using role-based selectors
   * for maximum reliability. All comboboxes and textboxes are scoped to the dialog
   * to avoid conflicts with other page elements.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceCases page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: /New/i }).first();
    this.dialog = page.getByRole("dialog").first();
    this.listbox = page.getByRole("listbox").first();

    // These handle dropdown selections for various case properties
    this.statusCombo = page.getByRole("combobox", { name: /Status/i }).first();
    this.originCombo = page
      .getByRole("combobox", { name: /Case Origin|CaseOrigin/i })
      .first();
    this.priorityCombo = page
      .getByRole("combobox", { name: /Priority/i })
      .first();
    this.typeCombo = page.getByRole("combobox", { name: /Type/i }).first();
    this.reasonCombo = page
      .getByRole("combobox", { name: /Case Reason|CaseReason/i })
      .first();
    this.prodCombo = page.getByRole("combobox", { name: /Product/i }).first();
    this.plCombo = page
      .getByRole("combobox", { name: /Potential Liability/i })
      .first();
    this.slaCombo = page
      .getByRole("combobox", { name: /SLA Violation|SLA/i })
      .first();

    // Text input fields - Handle various case detail inputs
    this.engineeringReqTextbox = page.getByRole("textbox", {
      name: /Engineering Req Number/i,
    });
    this.subjectTextbox = page.getByRole("textbox", {
      name: /Subject/i,
    });
    this.descriptionTextbox = page.getByRole("textbox", {
      name: /Description/i,
    });
    this.internalCommentsTextbox = page.getByRole("textbox", {
      name: /Internal Comments/i,
    });

    // Web-to-Case information textboxes - Handle web-generated case data
    this.webEmailTextbox = page.getByRole("textbox", {
      name: /Web Email/i,
    });
    this.webCompanyTextbox = page.getByRole("textbox", {
      name: /Web Company/i,
    });
    this.webNameTextbox = page.getByRole("textbox", {
      name: /Web Name/i,
    });
    this.webPhoneTextbox = page.getByRole("textbox", {
      name: /Web Phone/i,
    });

    // Action button - Save case form data
    this.saveButton = page.getByRole("button", { name: /^Save$/i }).first();

    console.log(
      "✅ SalesforceCases page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new case in Salesforce with the provided details
   *
   * This method handles the complete case creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new case dialog
   * 3. Fills in all provided field values (dropdowns and text inputs)
   * 4. Saves the case
   * 5. Takes an end screenshot for verification
   *
   * All actions include 10-second timeouts for reliable execution in various
   * network conditions. The method supports both required and optional fields,
   * only filling fields that have values provided in the details object.
   *
   * Screenshots are automatically saved to screenshots/salesforce-cases/
   * with start and end prefixes for verification purposes.
   *
   * @param details - Object containing case field values to be filled
   * @param details.Status - Case status (e.g., "New", "Working", "Escalated")
   * @param details.CaseOrigin - How the case originated (e.g., "Web", "Phone", "Email")
   * @param details.Priority - Case priority level (e.g., "High", "Medium", "Low")
   * @param details.Type - Type of case (e.g., "Question", "Problem", "Feature Request")
   * @param details.CaseReason - Reason for the case creation
   * @param details.Product - Related product name
   * @param details.PotentialLiability - Liability assessment (e.g., "Yes", "No")
   * @param details.SLA - SLA violation status
   * @param details.EngineeringReqNumber - Engineering requirement number
   * @param details.Subject - Case subject/title (typically required)
   * @param details.Description - Detailed description of the case
   * @param details.InternalComments - Internal comments for team use
   * @param details.WebEmail - Email from web-to-case
   * @param details.WebCompany - Company from web-to-case
   * @param details.WebName - Contact name from web-to-case
   * @param details.WebPhone - Phone number from web-to-case
   *
   * @example
   * await casePage.addNewCase({
   *   Subject: "Product Issue",
   *   Priority: "High",
   *   Status: "New",
   *   Description: "Customer experiencing login issues"
   * });
   */
  async addNewCase(details: { [field: string]: string }) {
    console.log("🔄 Starting case creation process...");
    console.log("📝 Case details:", JSON.stringify(details, null, 2));

    // Wait for the new case button to be visible and take start screenshot
    await expect(this.newButton).toBeVisible({ timeout: 10000 });
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-case",
      this.testInfo,
      "Service/salesforce-cases/"
    );

    // Open the new case creation dialog
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Case creation dialog opened");

    // Helper function to handle dropdown/combobox selections
    // Provides consistent interaction pattern for all dropdown fields
    const selectFromList = async (combo: Locator, value: string) => {
      // Click to open the dropdown
      await combo.click({ timeout: 10000 });
      // Select the specific option from the dropdown list
      await this.listbox
        .getByRole("option", { name: value, exact: true })
        .click({ timeout: 10000 });
    };

    console.log("📋 Filling form fields...");
    // Fill dropdown fields - Only fill if value is provided
    // Status dropdown - Sets the current status of the case
    if (details.Status) {
      await selectFromList(this.statusCombo, details.Status);
    }

    // Case Origin dropdown - Indicates how the case was created
    if (details.CaseOrigin) {
      await selectFromList(this.originCombo, details.CaseOrigin);
    }

    // Priority dropdown - Sets the urgency level of the case
    if (details.Priority) {
      await selectFromList(this.priorityCombo, details.Priority);
    }

    // Type dropdown - Categorizes the type of case
    if (details.Type) {
      await selectFromList(this.typeCombo, details.Type);
    }

    // Case Reason dropdown - Specific reason for case creation
    if (details.CaseReason) {
      await selectFromList(this.reasonCombo, details.CaseReason);
    }

    // Product dropdown - Associates case with a specific product
    if (details.Product) {
      await selectFromList(this.prodCombo, details.Product);
    }

    // Potential Liability dropdown - Legal/liability assessment
    if (details.PotentialLiability) {
      await selectFromList(this.plCombo, details.PotentialLiability);
    }

    // SLA Violation dropdown - Service level agreement status
    if (details.SLA) {
      await selectFromList(this.slaCombo, details.SLA);
    }

    // Fill text input fields - Only fill if value is provided
    // Engineering Requirement Number - Links case to specific engineering requirements
    if (details.EngineeringReqNumber) {
      await this.engineeringReqTextbox.fill(details.EngineeringReqNumber, {
        timeout: 10000,
      });
    }

    // Subject - Brief title/summary of the case (usually required)
    if (details.Subject) {
      await this.subjectTextbox.fill(details.Subject, { timeout: 10000 });
    }

    // Description - Detailed explanation of the case
    if (details.Description) {
      await this.descriptionTextbox.fill(details.Description, {
        timeout: 10000,
      });
    }

    // Internal Comments - Notes for internal team use
    if (details.InternalComments) {
      await this.internalCommentsTextbox.fill(details.InternalComments, {
        timeout: 10000,
      });
    }

    // Web-to-Case Information fields - Populated when case comes from web forms
    // Web Email - Email address from web form submission
    if (details.WebEmail) {
      await this.webEmailTextbox.fill(details.WebEmail, { timeout: 10000 });
    }
    // Web Company - Company name from web form submission
    if (details.WebCompany) {
      await this.webCompanyTextbox.fill(details.WebCompany, { timeout: 10000 });
    }
    // Web Name - Contact name from web form submission
    if (details.WebName) {
      await this.webNameTextbox.fill(details.WebName, { timeout: 10000 });
    }
    // Web Phone - Phone number from web form submission
    if (details.WebPhone) {
      await this.webPhoneTextbox.fill(details.WebPhone, { timeout: 10000 });
    }

    console.log("💾 Saving the case...");

    // Save the case - Submit all entered information
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Case saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-case",
      this.testInfo,
      "Service/salesforce-cases/"
    );

    console.log("🎉 Case creation completed!");
  }

  /**
   * Verifies that a case was successfully created by checking for specific field values
   *
   * This method validates case creation success by:
   * 1. Takes a start screenshot for verification
   * 2. Checking if the case detail page displays the expected field values
   * 3. Using element locators to verify the presence of specific data
   * 4. Confirming that the case was saved with correct information
   * 5. Takes an end screenshot for verification
   *
   * Currently focuses on Subject field verification, but can be extended
   * to validate additional fields as needed for comprehensive testing.
   *
   * Screenshots are automatically saved to screenshots/salesforce-cases/case-verification/
   * with start and end prefixes for verification purposes.
   *
   * @param details - Object containing case field values to verify
   * @param details.Subject - Case subject/title to verify on the detail page
   *
   * @throws Will throw an assertion error if:
   * - Expected field values are not found on the page
   * - Case creation failed and detail page shows incorrect data
   * - Network issues prevent proper page loading
   * @example
   * // Verify case creation with subject validation
   * const caseDetails = { Subject: "Customer Login Problem" };
   * await casePage.addNewCase(caseDetails);
   * await casePage.verifyCase(caseDetails);
   */
  async verifyCase(details: { [k: string]: string }) {
    console.log("🔍 Starting case verification...");

    // Verify Subject field if provided in the details
    // Checks that the case detail page displays the correct subject title
    if (details.Subject) {
      // Wait for the subject element to be visible with the expected title attribute
      // This confirms the case was saved with the correct subject
      await expect(
        this.page.locator(`[title="${details.Subject}"]`)
      ).toBeVisible({ timeout: 10000 });
      console.log("✅ Subject verification successful");
    } else {
      console.log("⚠️ No subject provided for verification");
    }

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Service/salesforce-cases/"
    );

    console.log("🎉 Verification completed!");
  }
}
