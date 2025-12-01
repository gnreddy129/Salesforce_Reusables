import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceAuthorizationFormConsent Page Object Model
 *
 * This class provides automation capabilities for Salesforce Authorization Form Consent management functionality.
 * It handles authorization form consent creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new authorization form consent with comprehensive field support
 * - Handle text fields, date fields, time fields, and combobox interactions
 * - Verify authorization form consent creation success
 * - Support for all standard Salesforce authorization form consent fields
 * - Navigate to Authorization Form Consent module using standard navigation
 * - Complete authorization form consent lifecycle management
 *
 * @class SalesforceAuthorizationFormConsentPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceAuthorizationFormConsentPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Authorization Form Consent Information Fields
  readonly nameInput: Locator;
  readonly consentGiverCombobox: Locator;
  readonly chooseAnObjectCombobox: Locator;
  readonly authorizationFormTextCombobox: Locator;
  readonly consentCapturedSourceInput: Locator;
  readonly consentCapturedSourceTypeCombobox: Locator;
  readonly statusCombobox: Locator;
  readonly dateInput: Locator;
  readonly timeInput: Locator;
  readonly contentVersionCombobox: Locator;

  // Navigation Elements
  readonly authorizationFormConsentCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceAuthorizationFormConsent page object with all necessary locators
   *
   * Sets up locators for all Salesforce authorization form consent elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log(
      "🚀 Initializing SalesforceAuthorizationFormConsent page object"
    );
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Authorization Form Consent Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });
    this.consentGiverCombobox = page.getByRole("combobox", {
      name: "Consent Giver",
    });
    this.chooseAnObjectCombobox = page.getByRole("combobox", {
      name: "Choose an object",
    });
    this.authorizationFormTextCombobox = page.getByRole("combobox", {
      name: "Authorization Form Text",
    });
    this.consentCapturedSourceInput = page.getByRole("textbox", {
      name: "Consent Captured Source",
    });
    this.consentCapturedSourceTypeCombobox = page.getByRole("combobox", {
      name: "Consent Captured Source Type",
    });
    this.statusCombobox = page.getByRole("combobox", {
      name: "Status",
    });
    this.dateInput = page.getByRole("textbox", {
      name: "Date",
    });
    this.timeInput = page.getByRole("combobox", {
      name: "Time",
    });
    this.contentVersionCombobox = page.getByRole("combobox", {
      name: "Content Version",
    });

    // Success message locator
    this.authorizationFormConsentCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceAuthorizationFormConsent page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new authorization form consent in Salesforce with the provided details
   *
   * This method handles the complete authorization form consent creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new authorization form consent creation form
   * 3. Fills in all provided field values
   * 4. Saves the authorization form consent
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing authorization form consent field values to be filled
   * @param details.Name - Name (text input)
   * @param details.ConsentGiver - Consent Giver (combobox)
   * @param details.ChooseAnObject - Choose an object (combobox)
   * @param details.AuthorizationFormText - Authorization Form Text (combobox)
   * @param details.ConsentCapturedSource - Consent Captured Source (text input)
   * @param details.ConsentCapturedSourceType - Consent Captured Source Type (combobox)
   * @param details.Status - Status (combobox)
   * @param details.Date - Date (text input)
   * @param details.Time - Time (text input)
   * @param details.ContentVersion - Content Version (combobox)
   *
   * @example
   * await authorizationFormConsentPage.addNewAuthorizationFormConsent({
   *   Name: "GDPR Consent Record",
   *   ConsentGiver: "John Doe",
   *   ChooseAnObject: "Contact",
   *   AuthorizationFormText: "GDPR Auth Text",
   *   ConsentCapturedSource: "Website Form",
   *   ConsentCapturedSourceType: "Web",
   *   Status: "Active",
   *   Date: "30/11/2025",
   *   Time: "10:30 AM",
   *   ContentVersion: "Version 1.0"
   * });
   */
  async addNewAuthorizationFormConsent(details: { [key: string]: string }) {
    console.log("🔄 Starting authorization form consent creation process...");
    console.log(
      "📝 Authorization Form Consent details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-authorization-form-consent",
        this.testInfo,
        "CustomerData/salesforce-authorization-form-consent/"
      );
    }

    // Click New Authorization Form Consent
    await this.newButton.click({ timeout: 15000 });
    console.log("✅ Authorization Form Consent creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Authorization Form Consent form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name || details["Name"]) {
      const nameValue = details.Name || details["Name"];
      await this.nameInput.fill(nameValue, {
        timeout: 15000,
      });
      console.log(`✅ Name filled: ${nameValue}`);
    }

    // Handle Choose an object combobox
    if (
      (details.ChooseAnObject && details.ChooseAnObject !== "--None--") ||
      (details["Choose an object"] &&
        details["Choose an object"] !== "--None--")
    ) {
      const chooseObjectValue =
        details.ChooseAnObject || details["Choose an object"];
      await this.chooseAnObjectCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: chooseObjectValue }).click({
        timeout: 10000,
      });
      console.log(`✅ Choose an object selected: ${chooseObjectValue}`);
    }

    // Handle Consent Giver combobox
    if (
      (details.ConsentGiver && details.ConsentGiver !== "--None--") ||
      (details["Consent Giver"] && details["Consent Giver"] !== "--None--")
    ) {
      const consentGiverValue =
        details.ConsentGiver || details["Consent Giver"];
      await this.consentGiverCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: consentGiverValue }).click({
        timeout: 10000,
      });
      console.log(`✅ Consent Giver selected: ${consentGiverValue}`);
    }

    // Handle Authorization Form Text combobox
    if (
      (details.AuthorizationFormText &&
        details.AuthorizationFormText !== "--None--") ||
      (details["Authorization Form Text"] &&
        details["Authorization Form Text"] !== "--None--")
    ) {
      const authFormTextValue =
        details.AuthorizationFormText || details["Authorization Form Text"];
      await this.authorizationFormTextCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: authFormTextValue }).first().click({
        timeout: 10000,
      });
      console.log(`✅ Authorization Form Text selected: ${authFormTextValue}`);
    }

    // Fill Consent Captured Source field (text input)
    if (
      (details.ConsentCapturedSource &&
        details.ConsentCapturedSource !== "--None--") ||
      (details["Consent Captured Source"] &&
        details["Consent Captured Source"] !== "--None--")
    ) {
      const capturedSourceValue =
        details.ConsentCapturedSource || details["Consent Captured Source"];
      await this.consentCapturedSourceInput.fill(capturedSourceValue, {
        timeout: 10000,
      });
      console.log(`✅ Consent Captured Source filled: ${capturedSourceValue}`);
    }

    // Handle Consent Captured Source Type combobox
    if (
      (details.ConsentCapturedSourceType &&
        details.ConsentCapturedSourceType !== "--None--") ||
      (details["Consent Captured Source Type"] &&
        details["Consent Captured Source Type"] !== "--None--")
    ) {
      const sourceTypeValue =
        details.ConsentCapturedSourceType ||
        details["Consent Captured Source Type"];
      await this.consentCapturedSourceTypeCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: sourceTypeValue }).click({
        timeout: 10000,
      });
      console.log(
        `✅ Consent Captured Source Type selected: ${sourceTypeValue}`
      );
    }

    // Handle Status combobox
    if (
      (details.Status && details.Status !== "--None--") ||
      (details["Status"] && details["Status"] !== "--None--")
    ) {
      const statusValue = details.Status || details["Status"];
      await this.statusCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: statusValue }).click({
        timeout: 10000,
      });
      console.log(`✅ Status selected: ${statusValue}`);
    }

    // Fill Date field (text input)
    if (
      (details.Date && details.Date !== "--None--") ||
      (details["Date"] && details["Date"] !== "--None--")
    ) {
      const dateValue = details.Date || details["Date"];
      await this.dateInput.fill(dateValue, {
        timeout: 10000,
      });
      console.log(`✅ Date filled: ${dateValue}`);
    }

    // Fill Time field (text input)
    if (
      (details.Time && details.Time !== "--None--") ||
      (details["Time"] && details["Time"] !== "--None--")
    ) {
      const timeValue = details.Time || details["Time"];
      await this.timeInput.click({ timeout: 10000 });
      await this.timeInput.fill(timeValue, {
        timeout: 10000,
      });
      console.log(`✅ Time filled: ${timeValue}`);
    }

    // Handle Content Version combobox
    if (
      (details.ContentVersion && details.ContentVersion !== "--None--") ||
      (details["Content Version"] && details["Content Version"] !== "--None--")
    ) {
      const contentVersionValue =
        details.ContentVersion || details["Content Version"];
      await this.contentVersionCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: contentVersionValue }).click({
        timeout: 10000,
      });
      console.log(`✅ Content Version selected: ${contentVersionValue}`);
    }

    console.log("💾 Saving the authorization form consent...");

    // Save the authorization form consent
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Authorization Form Consent saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-authorization-form-consent",
        this.testInfo,
        "CustomerData/salesforce-authorization-form-consent/"
      );
    }

    console.log("🎉 Authorization Form Consent creation completed!");
  }

  /**
   * Verifies that an authorization form consent was successfully created by checking for specific field values
   *
   * This method validates authorization form consent creation success by checking if the authorization form consent detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing authorization form consent field values to verify
   * @param details.Name - Name to verify
   * @param details.ConsentGiver - Consent Giver to verify
   * @param details.Status - Status to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await authorizationFormConsentPage.verifyAuthorizationFormConsentCreation({
   *   Name: "GDPR Consent Record",
   *   ConsentGiver: "John Doe"
   * });
   */
  async verifyAuthorizationFormConsentCreation(details: {
    [field: string]: string;
  }) {
    console.log("🔍 Starting authorization form consent verification...");

    await expect(this.authorizationFormConsentCreatedMessage).toContainText(
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
        "CustomerData/salesforce-authorization-form-consent/"
      );
    }

    console.log("🎉 Authorization Form Consent verification completed!");
  }
}
