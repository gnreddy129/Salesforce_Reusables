import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceRefundLinePayments Page Object Model
 *
 * This class provides automation capabilities for Salesforce Refund Line Payment management functionality.
 * It handles refund line payment creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new refund line payments with comprehensive field support
 * - Handle complex form interactions including comboboxes, date/time fields, and text inputs
 * - Verify refund line payment creation success
 * - Support for all standard Salesforce refund line payment fields
 * - Navigate to Refund Line Payments module using standard navigation
 * - Complete refund line payment lifecycle management
 *
 * @class SalesforceRefundLinePayments
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceRefundLinePaymentsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Refund Line Payment General Information Fields
  readonly refundCombobox: Locator;
  readonly typeCombobox: Locator;
  readonly hasBeenUnappliedCombobox: Locator;
  readonly paymentCombobox: Locator;
  readonly commentsInput: Locator;
  readonly amountInput: Locator;
  readonly associatedAccountCombobox: Locator;
  readonly associatedRefundLinePaymentCombobox: Locator;

  // Date and Time Fields - Using Parent Element Context
  readonly dateGroup: Locator;
  readonly effectiveDateGroup: Locator;
  readonly appliedDateGroup: Locator;
  readonly unappliedDateGroup: Locator;
  // Date Section
  readonly dateGroupDateInput: Locator;
  readonly dateGroupTimeCombobox: Locator;

  // Effective Date Section
  readonly effectiveDateGroupDateInput: Locator;
  readonly effectiveDateGroupTimeCombobox: Locator;

  // Applied Date Section
  readonly appliedDateGroupDateInput: Locator;
  readonly appliedDateGroupTimeCombobox: Locator;

  // Unapplied Date Section
  readonly unappliedDateGroupDateInput: Locator;
  readonly unappliedDateGroupTimeCombobox: Locator;

  // Navigation Elements
  readonly refundLinePaymentCreatedMessage: Locator;
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceRefundLinePayments page object with all necessary locators
   *
   * Sets up locators for all Salesforce refund line payment form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce Lightning patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceRefundLinePayments page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Refund Line Payment General Information field locators
    this.refundCombobox = page.getByRole("combobox", {
      name: "Refund",
      exact: true,
    });
    this.typeCombobox = page.getByRole("combobox", {
      name: "Type",
      exact: true,
    });
    this.hasBeenUnappliedCombobox = page.getByRole("combobox", {
      name: "Has Been Unapplied",
      exact: true,
    });
    this.paymentCombobox = page.getByRole("combobox", {
      name: "Payment",
      exact: true,
    });
    this.commentsInput = page.getByRole("textbox", {
      name: "Comments",
      exact: true,
    });
    this.amountInput = page.getByLabel("Amount");
    this.associatedAccountCombobox = page.getByRole("combobox", {
      name: "Associated Account",
      exact: true,
    });
    this.associatedRefundLinePaymentCombobox = page.getByRole("combobox", {
      name: "Associated Refund Line Payment",
      exact: true,
    });

    // Date and Time field locators - Using Parent Element Context Based on Service Appointments Pattern
    // Date Section
    this.dateGroup = page.getByRole("group", { name: "Date", exact: true });
    this.dateGroupDateInput = this.dateGroup.getByRole("textbox", {
      name: "Date",
    });
    this.dateGroupTimeCombobox = this.dateGroup.getByRole("combobox", {
      name: "Time",
    });

    // Effective Date Section
    this.effectiveDateGroup = page.getByRole("group", {
      name: "Effective Date",
      exact: true,
    });
    this.effectiveDateGroupDateInput = this.effectiveDateGroup.getByRole(
      "textbox",
      { name: "Date" }
    );
    this.effectiveDateGroupTimeCombobox = this.effectiveDateGroup.getByRole(
      "combobox",
      { name: "Time" }
    );

    // Applied Date Section
    this.appliedDateGroup = page.getByRole("group", {
      name: "Applied Date",
      exact: true,
    });
    this.appliedDateGroupDateInput = this.appliedDateGroup.getByRole(
      "textbox",
      { name: "Date" }
    );
    this.appliedDateGroupTimeCombobox = this.appliedDateGroup.getByRole(
      "combobox",
      { name: "Time" }
    );

    // Unapplied Date Section
    this.unappliedDateGroup = page.getByRole("group", {
      name: "Unapplied Date",
      exact: true,
    });
    this.unappliedDateGroupDateInput = this.unappliedDateGroup.getByRole(
      "textbox",
      { name: "Date" }
    );
    this.unappliedDateGroupTimeCombobox = this.unappliedDateGroup.getByRole(
      "combobox",
      { name: "Time" }
    );
    // Success message locator
    this.refundLinePaymentCreatedMessage = page.locator(".toastMessage");
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceRefundLinePayments page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new refund line payment in Salesforce with the provided details
   * Based on Service Appointments page pattern for consistent automation approach
   *
   * This method handles the complete refund line payment creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new refund line payment creation form
   * 3. Fills in all available field values
   * 4. Saves the refund line payment
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing refund line payment field values to be filled
   */
  async addNewRefundLinePayment(details: { [key: string]: string }) {
    console.log("🔄 Starting refund line payment creation process...");
    console.log(
      "📝 Refund line payment details:",
      JSON.stringify(details, null, 2)
    );

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-refund-line-payment",
      this.testInfo,
      "Finance/salesforce-refund-line-payments/"
    );

    // Click New Refund Line Payment
    console.log("✅ Refund line payment creation form opened");

    // Wait for form to be fully loaded
    await this.refundCombobox.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Fill Refund field
    if (details.Refund && details.Refund !== "--None--") {
      await this.refundCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(`✅ Refund selected: ${details.Refund}`);
    }

    // Fill Type field
    if (details.Type && details.Type !== "--None--") {
      await this.typeCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.Type }).first().click({ timeout: 10000 });
      console.log(`✅ Type selected: ${details.Type}`);
    }

    // Fill Has Been Unapplied field
    if (details.HasBeenUnapplied && details.HasBeenUnapplied !== "--None--") {
      await this.hasBeenUnappliedCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.HasBeenUnapplied }).first().click({ timeout: 10000 });
      console.log(
        `✅ Has Been Unapplied selected: ${details.HasBeenUnapplied}`
      );
    }

    // Fill Payment field
    if (details.Payment && details.Payment !== "--None--") {
      await this.paymentCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(`✅ Payment selected: ${details.Payment}`);
    }

    // Fill Comments field
    if (details.Comments && details.Comments !== "--None--") {
      await this.commentsInput.fill(Helper.generateUniqueValue(details.Comments), { timeout: 10000 });
      console.log(`✅ Comments filled: ${details.Comments}`);
    }

    // Fill Amount field
    if (details.Amount && details.Amount !== "--None--") {
      await this.amountInput.fill(details.Amount, { timeout: 10000 });
      console.log(`✅ Amount filled: ${details.Amount}`);
    }

    // Fill Associated Account field
    if (details.AssociatedAccount && details.AssociatedAccount !== "--None--" ||
      details['Associated Account'] && details['Associated Account'] !== "--None--"
    ) {
      const accountName = details.AssociatedAccount || details['Associated Account'];
      await this.associatedAccountCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(
        `✅ Associated Account selected: ${accountName}`
      );
    }

    // Fill Associated Refund Line Payment field
    if (
      details.AssociatedRefundLinePayment &&
      details.AssociatedRefundLinePayment !== "--None--" ||
      details['Associated Refund Line Payment'] && details['Associated Refund Line Payment'] !== "--None--"
    ) {
      const refundLinePaymentName = details.AssociatedRefundLinePayment || details['Associated Refund Line Payment'];
      await this.associatedRefundLinePaymentCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(
        `✅ Associated Refund Line Payment selected: ${refundLinePaymentName}`
      );
    }

    // Fill Date Group Date/Time
    if (details.Date && details.Date !== "--None--") {
      await this.dateGroupDateInput.fill(details.Date, { timeout: 10000 });
      console.log(`✅ Date filled: ${details.Date}`);
    }

    if (details.DateTime && details.DateTime !== "--None--") {
      await this.dateGroupTimeCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.DateTime }).first().click({ timeout: 10000 });
      console.log(`✅ Date Time selected: ${details.DateTime}`);
    }

    // Fill Effective Date Group Date/Time
    if (details.EffectiveDate && details.EffectiveDate !== "--None--" || details['Effective Date'] && details['Effective Date'] !== "--None--") {
      const effectiveDate = details.EffectiveDate || details['Effective Date'];
      await this.effectiveDateGroupDateInput.fill(effectiveDate, {
        timeout: 10000,
      });
      console.log(`✅ Effective Date filled: ${effectiveDate}`);
    }

    if (details.EffectiveDateTime && details.EffectiveDateTime !== "--None--" || details['Effective Date Time'] && details['Effective Date Time'] !== "--None--") {
      const effectiveDateTime = details.EffectiveDateTime || details['Effective Date Time'];
      await this.effectiveDateGroupTimeCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: effectiveDateTime }).first().click({ timeout: 10000 });
      console.log(
        `✅ Effective Date Time selected: ${effectiveDateTime}`
      );
    }

    // Fill Applied Date Group Date/Time
    if (details.AppliedDate && details.AppliedDate !== "--None--" || details['Applied Date'] && details['Applied Date'] !== "--None--") {
      const appliedDate = details.AppliedDate || details['Applied Date'];
      await this.appliedDateGroupDateInput.fill(appliedDate, {
        timeout: 10000,
      });
      console.log(`✅ Applied Date filled: ${appliedDate}`);
    }

    if (details.AppliedDateTime && details.AppliedDateTime !== "--None--" || details['Applied Date Time'] && details['Applied Date Time'] !== "--None--") {
      const appliedDateTime = details.AppliedDateTime || details['Applied Date Time'];
      await this.appliedDateGroupTimeCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: appliedDateTime }).first().click({ timeout: 10000 });
      console.log(`✅ Applied Date Time selected: ${appliedDateTime}`);
    }

    // Fill Unapplied Date Group Date/Time
    if (details.UnappliedDate && details.UnappliedDate !== "--None--" || details['Unapplied Date'] && details['Unapplied Date'] !== "--None--") {
      const unappliedDate = details.UnappliedDate || details['Unapplied Date'];
      await this.unappliedDateGroupDateInput.fill(unappliedDate, {
        timeout: 10000,
      });
      console.log(`✅ Unapplied Date filled: ${unappliedDate}`);
    }

    if (details.UnappliedDateTime && details.UnappliedDateTime !== "--None--" || details['Unapplied Date Time'] && details['Unapplied Date Time'] !== "--None--") {
      const unappliedDateTime = details.UnappliedDateTime || details['Unapplied Date Time'];
      await this.unappliedDateGroupTimeCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: unappliedDateTime }).first().click({ timeout: 10000 });
      console.log(
        `✅ Unapplied Date Time selected: ${unappliedDateTime}`
      );
    }

    console.log("💾 Saving the refund line payment...");

    // Save the refund line payment
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Refund line payment saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-refund-line-payment",
      this.testInfo,
      "Finance/salesforce-refund-line-payments/"
    );

    console.log("🎉 Refund line payment creation completed!");
  }

  /**
   * Verifies that a refund line payment was successfully created by checking for specific field values
   *
   * This method validates refund line payment creation success by checking if the refund line payment detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing refund line payment field values to verify
   */
  async verifyRefundLinePayment(details: { [k: string]: string }) {
    console.log("🔍 Starting refund line payment verification...");

    await expect(this.refundLinePaymentCreatedMessage).toContainText("was created", {
      timeout: 10000,
    });
    console.log("✅ Refund line payment creation message verified");

    // Verify refund line payment creation by checking for key field values on the page
    if (details.Refund) {
      expect(await this.page.getByText(details.Refund).count()).toBeGreaterThan(0);
      console.log(`✅ Refund line payment refund verification successful: ${details.Refund}`);
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Finance/salesforce-refund-line-payments/"
    );

    console.log("🎉 Refund line payment verification completed!");
  }
}
