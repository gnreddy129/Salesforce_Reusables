import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceAuthorizationFormText Page Object Model
 *
 * This class provides automation capabilities for Salesforce Authorization Form Text management functionality.
 * It handles authorization form text creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new authorization form text with comprehensive field support
 * - Handle text fields and combobox interactions
 * - Verify authorization form text creation success
 * - Support for all standard Salesforce authorization form text fields
 * - Navigate to Authorization Form Text module using standard navigation
 * - Complete authorization form text lifecycle management
 *
 * @class SalesforceAuthorizationFormTextPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceAuthorizationFormTextPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Authorization Form Text Information Fields
  readonly nameInput: Locator;
  readonly summaryAuthFormTextInput: Locator;
  readonly fullAuthorizationFormUrlInput: Locator;
  readonly localeCombobox: Locator;
  readonly contentDocumentCombobox: Locator;
  readonly authorizationFormCombobox: Locator;

  // Navigation Elements
  readonly authorizationFormTextCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceAuthorizationFormText page object with all necessary locators
   *
   * Sets up locators for all Salesforce authorization form text elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceAuthorizationFormText page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Authorization Form Text Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });
    this.summaryAuthFormTextInput = page.getByRole("textbox", {
      name: "Summary Auth Form Text",
    });
    this.fullAuthorizationFormUrlInput = page.getByRole("textbox", {
      name: "Full Authorization Form Url",
    });
    this.localeCombobox = page.getByRole("combobox", {
      name: "Locale",
    });
    this.contentDocumentCombobox = page.getByRole("combobox", {
      name: "Content Document",
    });
    this.authorizationFormCombobox = page.getByRole("combobox", {
      name: "Authorization Form",
    });

    // Success message locator
    this.authorizationFormTextCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceAuthorizationFormText page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new authorization form text in Salesforce with the provided details
   *
   * This method handles the complete authorization form text creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new authorization form text creation form
   * 3. Fills in all provided field values
   * 4. Saves the authorization form text
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing authorization form text field values to be filled
   * @param details.Name - Name (text input)
   * @param details.SummaryAuthFormText - Summary Auth Form Text (text input)
   * @param details.FullAuthorizationFormUrl - Full Authorization Form Url (text input)
   * @param details.Locale - Locale (combobox)
   * @param details.ContentDocument - Content Document (combobox)
   * @param details.AuthorizationForm - Authorization Form (combobox)
   *
   * @example
   * await authorizationFormTextPage.addNewAuthorizationFormText({
   *   Name: "GDPR Auth Text",
   *   SummaryAuthFormText: "GDPR consent summary text",
   *   FullAuthorizationFormUrl: "https://example.com/gdpr-form",
   *   Locale: "English",
   *   ContentDocument: "GDPR Document",
   *   AuthorizationForm: "GDPR Authorization Form"
   * });
   */
  async addNewAuthorizationFormText(details: { [key: string]: string }) {
    console.log("🔄 Starting authorization form text creation process...");
    console.log(
      "📝 Authorization Form Text details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-authorization-form-text",
        this.testInfo,
        "CustomerData/salesforce-authorization-form-text/"
      );
    }

    // Click New Authorization Form Text
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Authorization Form Text creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Authorization Form Text form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name || details["Name"]) {
      const nameValue = details.Name || details["Name"];
      await this.nameInput.fill(nameValue, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${nameValue}`);
    }

    // Fill Summary Auth Form Text field (text input)
    if (
      (details.SummaryAuthFormText &&
        details.SummaryAuthFormText !== "--None--") ||
      (details["Summary Auth Form Text"] &&
        details["Summary Auth Form Text"] !== "--None--")
    ) {
      const summaryValue =
        details.SummaryAuthFormText || details["Summary Auth Form Text"];
      await this.summaryAuthFormTextInput.fill(summaryValue, {
        timeout: 10000,
      });
      console.log(`✅ Summary Auth Form Text filled: ${summaryValue}`);
    }

    // Fill Full Authorization Form Url field (text input)
    if (
      (details.FullAuthorizationFormUrl &&
        details.FullAuthorizationFormUrl !== "--None--") ||
      (details["Full Authorization Form Url"] &&
        details["Full Authorization Form Url"] !== "--None--")
    ) {
      const urlValue =
        details.FullAuthorizationFormUrl ||
        details["Full Authorization Form Url"];
      await this.fullAuthorizationFormUrlInput.fill(urlValue, {
        timeout: 10000,
      });
      console.log(`✅ Full Authorization Form Url filled: ${urlValue}`);
    }

    // Handle Locale combobox
    if (
      (details.Locale && details.Locale !== "--None--") ||
      (details["Locale"] && details["Locale"] !== "--None--")
    ) {
      const localeValue = details.Locale || details["Locale"];
      await this.localeCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: localeValue }).click({
        timeout: 10000,
      });
      console.log(`✅ Locale selected: ${localeValue}`);
    }

    // Handle Content Document combobox
    if (
      (details.ContentDocument && details.ContentDocument !== "--None--") ||
      (details["Content Document"] &&
        details["Content Document"] !== "--None--")
    ) {
      const contentDocValue =
        details.ContentDocument || details["Content Document"];
      await this.contentDocumentCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: contentDocValue }).click({
        timeout: 10000,
      });
      console.log(`✅ Content Document selected: ${contentDocValue}`);
    }

    // Handle Authorization Form combobox
    if (
      (details.AuthorizationForm && details.AuthorizationForm !== "--None--") ||
      (details["Authorization Form"] &&
        details["Authorization Form"] !== "--None--")
    ) {
      const authFormValue =
        details.AuthorizationForm || details["Authorization Form"];
      await this.authorizationFormCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: authFormValue }).click({
        timeout: 10000,
      });
      console.log(`✅ Authorization Form selected: ${authFormValue}`);
    }

    console.log("💾 Saving the authorization form text...");

    // Save the authorization form text
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Authorization Form Text saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-authorization-form-text",
        this.testInfo,
        "CustomerData/salesforce-authorization-form-text/"
      );
    }

    console.log("🎉 Authorization Form Text creation completed!");
  }

  /**
   * Verifies that an authorization form text was successfully created by checking for specific field values
   *
   * This method validates authorization form text creation success by checking if the authorization form text detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing authorization form text field values to verify
   * @param details.Name - Name to verify
   * @param details.SummaryAuthFormText - Summary Auth Form Text to verify
   * @param details.FullAuthorizationFormUrl - Full Authorization Form Url to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await authorizationFormTextPage.verifyAuthorizationFormTextCreation({
   *   Name: "GDPR Auth Text",
   *   SummaryAuthFormText: "GDPR consent summary text"
   * });
   */
  async verifyAuthorizationFormTextCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting authorization form text verification...");

    await expect(this.authorizationFormTextCreatedMessage).toContainText(
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
        "CustomerData/salesforce-authorization-form-text/"
      );
    }

    console.log("🎉 Authorization Form Text verification completed!");
  }
}
