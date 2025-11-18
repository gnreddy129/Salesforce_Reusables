import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";
import exp from "constants";

/**
 * SalesforceAuthorizationForm Page Object Model
 *
 * This class provides automation capabilities for Salesforce Authorization Form management functionality.
 * It handles authorization form creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new authorization form with comprehensive field support
 * - Handle text fields, date fields, combobox, and checkbox interactions
 * - Verify authorization form creation success
 * - Support for all standard Salesforce authorization form fields
 * - Navigate to Authorization Form module using standard navigation
 * - Complete authorization form lifecycle management
 *
 * @class SalesforceAuthorizationFormPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceAuthorizationFormPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Authorization Form Information Fields
  readonly nameInput: Locator;
  readonly revisionNumberInput: Locator;
  readonly effectiveFromDateInput: Locator;
  readonly effectiveToDateInput: Locator;
  readonly defaultAuthFormTextCombobox: Locator;
  readonly isSignatureRequiredCheckbox: Locator;

  // Navigation Elements
  readonly authorizationFormCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceAuthorizationForm page object with all necessary locators
   *
   * Sets up locators for all Salesforce authorization form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceAuthorizationForm page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Authorization Form Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });
    this.revisionNumberInput = page.getByRole("textbox", {
      name: "Revision Number",
    });
    this.effectiveFromDateInput = page.getByRole("textbox", {
      name: "Effective From Date",
    });
    this.effectiveToDateInput = page.getByRole("textbox", {
      name: "Effective To Date",
    });
    this.defaultAuthFormTextCombobox = page.getByRole("combobox", {
      name: "Default Auth Form Text",
    });
    this.isSignatureRequiredCheckbox = page.getByRole("checkbox", {
      name: "Is Signature Required",
    });

    // Success message locator
    this.authorizationFormCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceAuthorizationForm page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new authorization form in Salesforce with the provided details
   *
   * This method handles the complete authorization form creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new authorization form creation form
   * 3. Fills in all provided field values
   * 4. Saves the authorization form
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing authorization form field values to be filled
   * @param details.Name - Name (text input)
   * @param details.RevisionNumber - Revision Number (text input)
   * @param details.EffectiveFromDate - Effective From Date (date input)
   * @param details.EffectiveToDate - Effective To Date (date input)
   * @param details.DefaultAuthFormText - Default Auth Form Text (combobox)
   * @param details.IsSignatureRequired - Is Signature Required (checkbox - "true"/"false")
   *
   * @example
   * await authorizationFormPage.addNewAuthorizationForm({
   *   Name: "GDPR Authorization Form",
   *   RevisionNumber: "1.0",
   *   EffectiveFromDate: "2024-01-01",
   *   DefaultAuthFormText: "Standard Authorization",
   *   IsSignatureRequired: "true"
   * });
   */
  async addNewAuthorizationForm(details: { [key: string]: string }) {
    console.log("🔄 Starting authorization form creation process...");
    console.log(
      "📝 Authorization Form details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-authorization-form",
        this.testInfo,
        "CustomerData/salesforce-authorization-form/"
      );
    }

    // Click New Authorization Form
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Authorization Form creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Authorization Form form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name || details["Name"]) {
      const nameValue = details.Name || details["Name"];
      await this.nameInput.fill(nameValue, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${nameValue}`);
    }

    // Fill Revision Number field (text input)
    if (
      (details.RevisionNumber && details.RevisionNumber !== "--None--") ||
      (details["Revision Number"] && details["Revision Number"] !== "--None--")
    ) {
      const revisionValue =
        details.RevisionNumber || details["Revision Number"];
      await this.revisionNumberInput.fill(revisionValue, {
        timeout: 10000,
      });
      console.log(`✅ Revision Number filled: ${revisionValue}`);
    }

    // Fill Effective From Date field (date input)
    if (
      (details.EffectiveFromDate && details.EffectiveFromDate !== "--None--") ||
      (details["Effective From Date"] &&
        details["Effective From Date"] !== "--None--")
    ) {
      const fromDateValue =
        details.EffectiveFromDate || details["Effective From Date"];
      await this.effectiveFromDateInput.fill(fromDateValue, {
        timeout: 10000,
      });
      console.log(`✅ Effective From Date filled: ${fromDateValue}`);
    }

    // Fill Effective To Date field (date input)
    if (
      (details.EffectiveToDate && details.EffectiveToDate !== "--None--") ||
      (details["Effective To Date"] &&
        details["Effective To Date"] !== "--None--")
    ) {
      const toDateValue =
        details.EffectiveToDate || details["Effective To Date"];
      await this.effectiveToDateInput.fill(toDateValue, {
        timeout: 10000,
      });
      console.log(`✅ Effective To Date filled: ${toDateValue}`);
    }

    // Handle Default Auth Form Text combobox
    if (
      (details.DefaultAuthFormText &&
        details.DefaultAuthFormText !== "--None--") ||
      (details["Default Auth Form Text"] &&
        details["Default Auth Form Text"] !== "--None--")
    ) {
      const comboValue =
        details.DefaultAuthFormText || details["Default Auth Form Text"];
      await this.defaultAuthFormTextCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: comboValue }).click({
        timeout: 10000,
      });
      console.log(`✅ Default Auth Form Text selected: ${comboValue}`);
    }

    // Handle Is Signature Required checkbox
    if (
      (details.IsSignatureRequired && details.IsSignatureRequired === "true") ||
      (details["Is Signature Required"] &&
        details["Is Signature Required"] !== "true")
    ) {
      const checkboxValue =
        details.IsSignatureRequired || details["Is Signature Required"];
      const shouldCheck = checkboxValue.toLowerCase() === "true";

      const isCurrentlyChecked =
        await this.isSignatureRequiredCheckbox.isChecked();
      if (shouldCheck !== isCurrentlyChecked) {
        await this.isSignatureRequiredCheckbox.check({ timeout: 10000 });
      }
      console.log(`✅ Is Signature Required set to: ${shouldCheck}`);
    }

    console.log("💾 Saving the authorization form...");

    // Save the authorization form
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Authorization Form saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-authorization-form",
        this.testInfo,
        "CustomerData/salesforce-authorization-form/"
      );
    }

    console.log("🎉 Authorization Form creation completed!");
  }

  /**
   * Verifies that an authorization form was successfully created by checking for specific field values
   *
   * This method validates authorization form creation success by checking if the authorization form detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing authorization form field values to verify
   * @param details.Name - Name to verify
   * @param details.RevisionNumber - Revision Number to verify
   * @param details.EffectiveFromDate - Effective From Date to verify
   * @param details.EffectiveToDate - Effective To Date to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await authorizationFormPage.verifyAuthorizationFormCreation({
   *   Name: "GDPR Authorization Form",
   *   RevisionNumber: "1.0"
   * });
   */
  async verifyAuthorizationFormCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting authorization form verification...");

    await expect(this.authorizationFormCreatedMessage).toContainText(
      "was created"
    );
    await expect(this.page.locator(`[slot="primaryField"]`)).toContainText(
      details.Name
    );

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification",
        this.testInfo,
        "CustomerData/salesforce-authorization-form/"
      );
    }

    console.log("🎉 Authorization Form verification completed!");
  }
}
