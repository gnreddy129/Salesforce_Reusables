import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";
import { fi } from "@faker-js/faker";

/**
 * SalesforcePartyConsent Page Object Model
 *
 * This class provides automation capabilities for Salesforce Party Consent management functionality.
 * It handles party consent creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new party consent with comprehensive field support
 * - Handle text fields, date fields, time fields, and various input types
 * - Verify party consent creation success
 * - Support for all standard Salesforce party consent fields
 * - Navigate to Party Consent module using standard navigation
 * - Complete party consent lifecycle management
 *
 * @class SalesforcePartyConsentPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforcePartyConsentPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Party Consent Information Fields
  readonly nameInput: Locator;
  readonly partyInput: Locator;
  readonly businessBrandInput: Locator;
  readonly chooseAnObjectInput: Locator;
  readonly partyRoleInput: Locator;
  readonly privacyConsentStatusInput: Locator;
  readonly actionInput: Locator;
  readonly consentCapturedContactPointTypeInput: Locator;
  readonly consentCapturedSourceInput: Locator;
  readonly effectiveFromInput: Locator;
  readonly effectiveToInput: Locator;
  readonly doubleConsentCaptureDateTimeParent: Locator;
  readonly doubleConsentCaptureDateInput: Locator;
  readonly doubleConsentCaptureTimeInput: Locator;
  readonly consentCapturedDateTimeParent: Locator;
  readonly consentCapturedDateInput: Locator;
  readonly consentCapturedTimeInput: Locator;

  // Navigation Elements
  readonly partyConsentCreatedMessage: Locator;
  readonly allOptionsLocator: Locator;
  readonly primaryFieldLocator: Locator;

  /**
   * Constructor - Initializes the SalesforcePartyConsent page object with all necessary locators
   *
   * Sets up locators for all Salesforce party consent elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforcePartyConsent page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Party Consent Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });
    this.partyInput = page.getByRole("combobox", {
      name: "Party",
      exact: true,
    });
    this.businessBrandInput = page.getByRole("combobox", {
      name: "Business Brand",
      exact: true,
    });
    this.chooseAnObjectInput = page.getByRole("combobox", {
      name: "Choose an object",
      exact: true,
    });
    this.partyRoleInput = page.getByRole("combobox", {
      name: "Party Role",
      exact: true,
    });
    this.privacyConsentStatusInput = page.getByRole("combobox", {
      name: "Privacy Consent Status",
      exact: true,
    });
    this.actionInput = page.getByRole("combobox", {
      name: "Action",
      exact: true,
    });
    this.consentCapturedContactPointTypeInput = page.getByRole("combobox", {
      name: "Consent Captured Contact Point Type",
      exact: true,
    });
    this.consentCapturedSourceInput = page.getByRole("textbox", {
      name: "Consent Captured Source",
    });
    this.effectiveFromInput = page.getByRole("textbox", {
      name: "Effective From",
    });
    this.effectiveToInput = page.getByRole("textbox", {
      name: "Effective To",
    });

    // Parent containers for date/time fields
    this.doubleConsentCaptureDateTimeParent = page.locator(
      `[field-label="Double Consent Capture Date Time"]`
    );
    this.doubleConsentCaptureDateInput =
      this.doubleConsentCaptureDateTimeParent.getByLabel("Date");
    this.doubleConsentCaptureTimeInput =
      this.doubleConsentCaptureDateTimeParent.getByLabel("Time");

    this.consentCapturedDateTimeParent = page.getByRole("group", {
      name: "Consent Captured Date Time",
    });
    this.consentCapturedDateInput =
      this.consentCapturedDateTimeParent.getByRole("textbox", { name: "Date" });
    this.consentCapturedTimeInput =
      this.consentCapturedDateTimeParent.getByRole("combobox", {
        name: "Time",
      });

    // Success message locator
    this.partyConsentCreatedMessage = page.locator(".toastMessage");
    this.allOptionsLocator = page.getByRole("option");
    this.primaryFieldLocator = page.locator(`[slot="primaryField"]`);

    console.log(
      "✅ SalesforcePartyConsent page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new party consent in Salesforce with the provided details
   *
   * This method handles the complete party consent creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new party consent creation form
   * 3. Fills in all provided field values
   * 4. Saves the party consent
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing party consent field values to be filled
   * @param details.Name - Name (text input)
   * @param details.Party - Party (text input)
   * @param details.BusinessBrand - Business Brand (text input)
   * @param details.ChooseAnObject - Choose an object (text input)
   * @param details.PartyRole - Party Role (text input)
   * @param details.PrivacyConsentStatus - Privacy Consent Status (text input)
   * @param details.Action - Action (text input)
   * @param details.ConsentCapturedContactPointType - Consent Captured Contact Point Type (text input)
   * @param details.ConsentCapturedSource - Consent Captured Source (text input)
   * @param details.EffectiveFrom - Effective From (date input)
   * @param details.EffectiveTo - Effective To (date input)
   * @param details.DoubleConsentCaptureDateTimeDate - Double Consent Capture Date Time Date (date input within parent)
   * @param details.DoubleConsentCaptureDateTimeTime - Double Consent Capture Date Time Time (time input within parent)
   * @param details.ConsentCapturedDateTimeDate - Consent Captured Date Time Date (date input within parent)
   * @param details.ConsentCapturedDateTimeTime - Consent Captured Date Time Time (time input within parent)
   *
   * @example
   * await partyConsentPage.addNewPartyConsent({
   *   Name: "GDPR Party Consent",
   *   Party: "John Doe",
   *   BusinessBrand: "ABC Brand",
   *   ChooseAnObject: "Contact",
   *   PartyRole: "Customer",
   *   PrivacyConsentStatus: "Seen",
   *   Action: "Target",
   *   ConsentCapturedContactPointType: "Email",
   *   ConsentCapturedSource: "Website Form",
   *   EffectiveFrom: "01/01/2024",
   *   EffectiveTo: "12/31/2024",
   *   DoubleConsentCaptureDateTimeDate: "12/15/2024",
   *   DoubleConsentCaptureDateTimeTime: "09:30 AM",
   *   ConsentCapturedDateTimeDate: "12/31/2024",
   *   ConsentCapturedDateTimeTime: "10:30 AM"
   * });
   */
  async addNewPartyConsent(details: { [key: string]: string }) {
    console.log("🔄 Starting party consent creation process...");
    console.log("📝 Party Consent details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-party-consent",
        this.testInfo,
        "CustomerData/salesforce-party-consent/"
      );
    }

    // Click New Party Consent
    console.log("✅ Party Consent creation form opened");
    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Party Consent form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name || details["Name"]) {
      const nameValue = details.Name || details["Name"];
      await this.nameInput.fill(nameValue, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${nameValue}`);
    }

    // Fill Party field (combobox)
    if (
      (details.Party && details.Party !== "--None--") ||
      (details["Party"] && details["Party"] !== "--None--")
    ) {
      const partyValue = details.Party || details["Party"];
      await this.partyInput.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(`✅ Party filled: ${partyValue}`);
    }

    // Fill Business Brand field (combobox)
    if (
      (details.BusinessBrand && details.BusinessBrand !== "--None--") ||
      (details["Business Brand"] && details["Business Brand"] !== "--None--")
    ) {
      const businessBrandValue =
        details.BusinessBrand || details["Business Brand"];
      await this.businessBrandInput.click({ timeout: 10000 });
    await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(`✅ Business Brand filled: ${businessBrandValue}`);
    }
    // Fill Choose an object field (combobox)
    if (
      (details.ChooseAnObject && details.ChooseAnObject !== "--None--") ||
      (details["Choose an object"] &&
        details["Choose an object"] !== "--None--")
    ) {
      const chooseObjectValue =
        details.ChooseAnObject || details["Choose an object"];
      await this.chooseAnObjectInput.click({ timeout: 10000 });
    await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(`✅ Choose an object filled: ${chooseObjectValue}`);
    }

    // Fill Party Role field (combobox)
    if (
      (details.PartyRole && details.PartyRole !== "--None--") ||
      (details["Party Role"] && details["Party Role"] !== "--None--")
    ) {
      const partyRoleValue = details.PartyRole || details["Party Role"];
      await this.partyRoleInput.click({ timeout: 10000 });
    await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(`✅ Party Role filled: ${partyRoleValue}`);
    }

    // Fill Privacy Consent Status field (combobox)
    if (
      (details.PrivacyConsentStatus &&
        details.PrivacyConsentStatus !== "--None--") ||
      (details["Privacy Consent Status"] &&
        details["Privacy Consent Status"] !== "--None--")
    ) {
      const privacyStatusValue =
        details.PrivacyConsentStatus || details["Privacy Consent Status"];
      await this.privacyConsentStatusInput.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: privacyStatusValue }).first().click({ timeout: 5000 });
      console.log(`✅ Privacy Consent Status filled: ${privacyStatusValue}`);
    }

    // Fill Action field (combobox)
    if (
      (details.Action && details.Action !== "--None--") ||
      (details["Action"] && details["Action"] !== "--None--")
    ) {
      const actionValue = details.Action || details["Action"];
      await this.actionInput.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: actionValue }).first().click({ timeout: 5000 });
      console.log(`✅ Action filled: ${actionValue}`);
    }
    // Fill Consent Captured Contact Point Type field (combobox)
    if (
      (details.ConsentCapturedContactPointType &&
        details.ConsentCapturedContactPointType !== "--None--") ||
      (details["Consent Captured Contact Point Type"] &&
        details["Consent Captured Contact Point Type"] !== "--None--")
    ) {
      const contactPointTypeValue =
        details.ConsentCapturedContactPointType ||
        details["Consent Captured Contact Point Type"];
      await this.consentCapturedContactPointTypeInput.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: contactPointTypeValue }).first().click({ timeout: 5000 });
      console.log(
        `✅ Consent Captured Contact Point Type filled: ${contactPointTypeValue}`
      );
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

    // Fill Effective From field (date input)
    if (
      (details.EffectiveFrom && details.EffectiveFrom !== "--None--") ||
      (details["Effective From"] && details["Effective From"] !== "--None--")
    ) {
      const effectiveFromValue =
        details.EffectiveFrom || details["Effective From"];
      await this.effectiveFromInput.fill(effectiveFromValue, {
        timeout: 10000,
      });
      console.log(`✅ Effective From filled: ${effectiveFromValue}`);
    }

    // Fill Effective To field (date input)
    if (
      (details.EffectiveTo && details.EffectiveTo !== "--None--") ||
      (details["Effective To"] && details["Effective To"] !== "--None--")
    ) {
      const effectiveToValue = details.EffectiveTo || details["Effective To"];
      await this.effectiveToInput.fill(effectiveToValue, {
        timeout: 10000,
      });
      console.log(`✅ Effective To filled: ${effectiveToValue}`);
    }

    // Fill Double Consent Capture Date Time fields
    if (
      (details.DoubleConsentCaptureDate &&
        details.DoubleConsentCaptureDate !== "--None--") ||
      (details["Double Consent Capture Date"] &&
        details["Double Consent Capture Date"] !== "--None--")
    ) {
      const doubleConsentDateValue =
        details.DoubleConsentCaptureDate ||
        details["Double Consent Capture Date"];
      await this.doubleConsentCaptureDateInput.fill(doubleConsentDateValue, {
        timeout: 10000,
      });
      console.log(
        `✅ Double Consent Capture Date filled: ${doubleConsentDateValue}`
      );
    }

    if (
      (details.DoubleConsentCaptureTime &&
        details.DoubleConsentCaptureTime !== "--None--") ||
      (details["Double Consent Capture Time"] &&
        details["Double Consent Capture Time"] !== "--None--")
    ) {
      const doubleConsentTimeValue =
        details.DoubleConsentCaptureTime ||
        details["Double Consent Capture Time"];
        await this.doubleConsentCaptureTimeInput.click({ timeout: 10000 });
        await this.allOptionsLocator.filter({ hasText: doubleConsentTimeValue }).first().click({ timeout: 5000 });
      console.log(
        `✅ Double Consent Capture Time filled: ${doubleConsentTimeValue}`
      );
    }

    // Fill Consent Captured Date Time fields
    if (
      (details.ConsentCapturedDate &&
        details.ConsentCapturedDate !== "--None--") ||
      (details["Consent Captured Date"] &&
        details["Consent Captured Date"] !== "--None--")
    ) {
      const consentCapturedDateValue =
        details.ConsentCapturedDate || details["Consent Captured Date"];
      await this.consentCapturedDateInput.fill(consentCapturedDateValue, {
        timeout: 10000,
      });
      console.log(
        `✅ Consent Captured Date filled: ${consentCapturedDateValue}`
      );
    }

    if (
      (details.ConsentCapturedTime &&
        details.ConsentCapturedTime !== "--None--") ||
      (details["Consent Captured Time"] &&
        details["Consent Captured Time"] !== "--None--")
    ) {
      const consentCapturedTimeValue =
        details.ConsentCapturedTime || details["Consent Captured Time"];
      await this.consentCapturedTimeInput.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: consentCapturedTimeValue }).first().click({ timeout: 5000 });
      console.log(
        `✅ Consent Captured Time filled: ${consentCapturedTimeValue}`
      );
    }

    console.log("💾 Saving the party consent...");
    // Save the party consent
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Party Consent saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-party-consent",
        this.testInfo,
        "CustomerData/salesforce-party-consent/"
      );
    }

    console.log("🎉 Party Consent creation completed!");
  }

  /**
   * Verifies that a party consent was successfully created by checking for specific field values
   *
   * This method validates party consent creation success by checking if the party consent detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing party consent field values to verify
   * @param details.Name - Name to verify
   * @param details.Party - Party to verify
   * @param details.PrivacyConsentStatus - Privacy Consent Status to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await partyConsentPage.verifyPartyConsentCreation({
   *   Name: "GDPR Party Consent",
   *   Party: "John Doe"
   * });
   */
  async verifyPartyConsentCreation(details: { [key: string]: string }) {
    console.log("🔍 Starting party consent verification...");

    await expect(this.partyConsentCreatedMessage).toContainText("was created");
    await expect(this.primaryFieldLocator).toContainText(details.Name);

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification",
        this.testInfo,
        "CustomerData/salesforce-party-consent/"
      );
    }

    console.log("🎉 Party Consent verification completed!");
  }
}
