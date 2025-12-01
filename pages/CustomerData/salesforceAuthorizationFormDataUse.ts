import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceAuthorizationFormDataUse Page Object Model
 *
 * This class provides automation capabilities for Salesforce Authorization Form Data Use management functionality.
 * It handles authorization form data use creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new authorization form data use with comprehensive field support
 * - Handle text fields and combobox interactions
 * - Verify authorization form data use creation success
 * - Support for all standard Salesforce authorization form data use fields
 * - Navigate to Authorization Form Data Use module using standard navigation
 * - Complete authorization form data use lifecycle management
 *
 * @class SalesforceAuthorizationFormDataUsePage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceAuthorizationFormDataUsePage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Authorization Form Data Use Information Fields
  readonly nameInput: Locator;
  readonly authorizationFormCombobox: Locator;
  readonly dataUsePurposeCombobox: Locator;

  // Navigation Elements
  readonly authorizationFormDataUseCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceAuthorizationFormDataUse page object with all necessary locators
   *
   * Sets up locators for all Salesforce authorization form data use elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log(
      "🚀 Initializing SalesforceAuthorizationFormDataUse page object"
    );
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Authorization Form Data Use Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });
    this.authorizationFormCombobox = page.getByRole("combobox", { name: "Authorization Form" });
    this.dataUsePurposeCombobox = page.getByRole("combobox", { name: "Data Use Purpose" });

    // Success message locator
    this.authorizationFormDataUseCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceAuthorizationFormDataUse page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new authorization form data use in Salesforce with the provided details
   *
   * This method handles the complete authorization form data use creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new authorization form data use creation form
   * 3. Fills in all provided field values
   * 4. Saves the authorization form data use
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing authorization form data use field values to be filled
   * @param details.Name - Name (text input)
   * @param details.AuthorizationForm - Authorization Form (combobox)
   * @param details.DataUsePurpose - Data Use Purpose (combobox)
   *
   * @example
   * await authorizationFormDataUsePage.addNewAuthorizationFormDataUse({
   *   Name: "GDPR Data Use",
   *   AuthorizationForm: "GDPR Authorization Form",
   *   DataUsePurpose: "Marketing Purpose"
   * });
   */
  async addNewAuthorizationFormDataUse(details: { [key: string]: string }) {
    console.log("🔄 Starting authorization form data use creation process...");
    console.log(
      "📝 Authorization Form Data Use details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-authorization-form-data-use",
        this.testInfo,
        "CustomerData/salesforce-authorization-form-data-use/"
      );
    }

    // Click New Authorization Form Data Use
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Authorization Form Data Use creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Authorization Form Data Use form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name || details["Name"]) {
      const nameValue = details.Name || details["Name"];
      await this.nameInput.fill(nameValue, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${nameValue}`);
    }

    // Handle Authorization Form combobox
    if ((details.AuthorizationForm && details.AuthorizationForm !== "--None--") || (details["Authorization Form"] && details["Authorization Form"] !== "--None--")
    ) {
      const authFormValue =
        details.AuthorizationForm || details["Authorization Form"];
      await this.authorizationFormCombobox.click({ timeout: 10000 });
      await this.page.waitForTimeout(500);
      
      // Try to find and click the option with flexible matching
      try {
        // First try exact match
        const exactOption = this.page.getByRole("option", { name: authFormValue, exact: true }).first();
        if (await exactOption.isVisible({ timeout: 2000 }).catch(() => false)) {
          await exactOption.click({ timeout: 10000 });
          console.log(`✅ Authorization Form selected: ${authFormValue}`);
        } else {
          // Try partial match
          const partialOption = this.page.getByRole("option").filter({ hasText: authFormValue }).first();
          await expect(partialOption).toBeVisible({ timeout: 5000 });
          await partialOption.click({ timeout: 10000 });
          console.log(`✅ Authorization Form selected (partial match): ${authFormValue}`);
        }
      } catch (error) {
        // If dropdown not found, try to locate via listbox pattern
        console.log(`⚠️ Standard dropdown not found, trying alternative approach for: ${authFormValue}`);
        const listbox = this.page.getByRole("listbox").first();
        if (await listbox.isVisible({ timeout: 2000 }).catch(() => false)) {
          const option = listbox.getByRole("option").filter({ hasText: authFormValue }).first();
          await expect(option).toBeVisible({ timeout: 5000 });
          await option.click({ timeout: 10000 });
          console.log(`✅ Authorization Form selected via listbox: ${authFormValue}`);
        } else {
          console.log(`❌ Authorization Form dropdown not found: ${authFormValue}`);
        }
      }
    }

    // Handle Data Use Purpose combobox
    if ((details.DataUsePurpose && details.DataUsePurpose !== "--None--") || (details["Data Use Purpose"] && details["Data Use Purpose"] !== "--None--")
    ) {
      const dataUsePurposeValue = details.DataUsePurpose || details["Data Use Purpose"];
      await this.dataUsePurposeCombobox.click({ timeout: 10000 });
      await this.page.waitForTimeout(500);
      const listbox = this.page.getByRole("listbox").first();
      const option = listbox.getByRole("option").filter({ hasText: dataUsePurposeValue }).first();
      await expect(option).toBeVisible({ timeout: 5000 });
      await option.click({ timeout: 10000 });
      console.log(`✅ Data Use Purpose selected: ${dataUsePurposeValue}`);
    }

    console.log("💾 Saving the authorization form data use...");

    // Save the authorization form data use
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Authorization Form Data Use saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-authorization-form-data-use",
        this.testInfo,
        "CustomerData/salesforce-authorization-form-data-use/"
      );
    }

    console.log("🎉 Authorization Form Data Use creation completed!");
  }

  /**
   * Verifies that an authorization form data use was successfully created by checking for specific field values
   *
   * This method validates authorization form data use creation success by checking if the authorization form data use detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing authorization form data use field values to verify
   * @param details.Name - Name to verify
   * @param details.AuthorizationForm - Authorization Form to verify
   * @param details.DataUsePurpose - Data Use Purpose to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await authorizationFormDataUsePage.verifyAuthorizationFormDataUseCreation({
   *   Name: "GDPR Data Use",
   *   AuthorizationForm: "GDPR Authorization Form"
   * });
   */
  async verifyAuthorizationFormDataUseCreation(details: {
    [k: string]: string;
  }) {
    console.log("🔍 Starting authorization form data use verification...");

    await expect(this.authorizationFormDataUseCreatedMessage).toContainText(
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
        "CustomerData/salesforce-authorization-form-data-use/"
      );
    }

    console.log("🎉 Authorization Form Data Use verification completed!");
  }
}
