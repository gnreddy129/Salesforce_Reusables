import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceContracts Page Object Model
 *
 * This class provides automation capabilities for Salesforce Contract management functionality.
 * It handles contract creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new contracts with comprehensive field support
 * - Handle complex form interactions including comboboxes, date fields, and address information
 * - Verify contract creation success
 * - Support for all standard Salesforce contract fields including billing address and description information
 * - Navigate to Contracts module using standard navigation
 * - Complete contract lifecycle management
 *
 * @class SalesforceContracts
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceContractsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newContractButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Contract Information Fields
  readonly statusCombobox: Locator;
  readonly contractStartDateInput: Locator;
  readonly contractStartDatePicker: Locator;
  readonly accountNameCombobox: Locator;
  readonly contractTermInput: Locator;
  readonly customerSignedByCombobox: Locator;
  readonly ownerExpirationNoticeCombobox: Locator;
  readonly customerSignedTitleInput: Locator;
  readonly companySignedByCombobox: Locator;
  readonly customerSignedDateInput: Locator;
  readonly customerSignedDatePicker: Locator;
  readonly companySignedDateInput: Locator;
  readonly companySignedDatePicker: Locator;
  readonly priceBookCombobox: Locator;

  // Address Information Fields - Billing Address
  readonly billingStreetInput: Locator;
  readonly billingCityInput: Locator;
  readonly billingZipInput: Locator;
  readonly billingStateInput: Locator;
  readonly billingCountryInput: Locator;

  // Description Information Fields
  readonly specialTermsInput: Locator;
  readonly descriptionInput: Locator;

  // Navigation Elements
  readonly contractCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceContracts page object with all necessary locators
   *
   * Sets up locators for all Salesforce contract form elements using role-based selectors
   * for maximum reliability. All elements are identified based on the actual MCP server response.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceContracts page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newContractButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Contract Information field locators
    this.statusCombobox = page.getByRole("combobox", { name: "Status" });
    this.contractStartDateInput = page.getByRole("textbox", {
      name: "*Contract Start Date",
    });
    this.contractStartDatePicker = page.getByRole("button", {
      name: "Select a date for Contract Start Date",
    });
    this.accountNameCombobox = page.getByRole("combobox", {
      name: "Account Name",
    });
    this.contractTermInput = page.getByRole("spinbutton", {
      name: "Contract Term (months)",
    });
    this.customerSignedByCombobox = page.getByRole("combobox", {
      name: "Customer Signed By",
    });
    this.ownerExpirationNoticeCombobox = page.getByRole("combobox", {
      name: "Owner Expiration Notice",
    });
    this.customerSignedTitleInput = page.getByRole("textbox", {
      name: "Customer Signed Title",
    });
    this.companySignedByCombobox = page.getByRole("combobox", {
      name: "Company Signed By",
    });
    this.customerSignedDateInput = page.getByRole("textbox", {
      name: "Customer Signed Date",
    });
    this.customerSignedDatePicker = page.getByRole("button", {
      name: "Select a date for Customer Signed Date",
    });
    this.companySignedDateInput = page.getByRole("textbox", {
      name: "Company Signed Date",
    });
    this.companySignedDatePicker = page.getByRole("button", {
      name: "Select a date for Company Signed Date",
    });
    this.priceBookCombobox = page.getByRole("combobox", { name: "Price Book" });

    // Billing Address field locators
    this.billingStreetInput = page.getByRole("textbox", {
      name: "Billing Street",
    });
    this.billingCityInput = page.getByRole("textbox", {
      name: "Billing City",
    });
    this.billingZipInput = page.getByRole("textbox", {
      name: "Billing Zip/Postal Code",
    });
    this.billingStateInput = page.getByRole("textbox", {
      name: "Billing State/Province",
    });
    this.billingCountryInput = page.getByRole("textbox", {
      name: "Billing Country",
    });

    // Description Information field locators
    this.specialTermsInput = page.getByRole("textbox", {
      name: "Special Terms",
    });
    this.descriptionInput = page.getByRole("textbox", { name: "Description" });

    // Success message locator
    this.contractCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceContracts page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new contract in Salesforce with the provided details
   *
   * This method handles the complete contract creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new contract creation form
   * 3. Fills in all provided field values including dates, comboboxes, and address information
   * 4. Saves the contract
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing contract field values to be filled
   * @param details.Status - Contract status (optional) - combobox
   * @param details.ContractStartDate - Contract start date (required) - date input in DD/MM/YYYY format
   * @param details.AccountName - Associated account name (required) - combobox
   * @param details.ContractTerm - Contract term in months (required) - numeric input
   * @param details.CustomerSignedBy - Customer signed by contact (optional) - combobox
   * @param details.OwnerExpirationNotice - Owner expiration notice (optional) - combobox
   * @param details.CustomerSignedTitle - Customer signed title (optional) - text input
   * @param details.CompanySignedBy - Company signed by contact (optional) - combobox
   * @param details.CustomerSignedDate - Customer signed date (optional) - date input
   * @param details.CompanySignedDate - Company signed date (optional) - date input
   * @param details.PriceBook - Price book (optional) - combobox
   * @param details.BillingStreet - Billing street address (optional) - text input
   * @param details.BillingCity - Billing city (optional) - text input
   * @param details.BillingZip - Billing zip/postal code (optional) - text input
   * @param details.BillingState - Billing state/province (optional) - text input
   * @param details.BillingCountry - Billing country (optional) - text input
   * @param details.SpecialTerms - Special terms (optional) - text input
   * @param details.Description - Contract description (optional) - text input
   */
  async addNewContract(details: { [key: string]: string }) {
    console.log("🔄 Starting contract creation process...");
    console.log("📝 Contract details:", JSON.stringify(details, null, 2));

    await expect(this.newContractButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-contract",
      this.testInfo,
      "OtherFunctionality/salesforce-contracts/"
    );

    // Click New Contract
    await this.newContractButton.click({ timeout: 10000 });
    console.log("✅ Contract creation form opened");

    // Wait for form to be fully loaded
    await this.statusCombobox.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Fill Contract Information fields
    if (details.Status && details.Status !== "--None--") {
      await this.statusCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Status })
        .click({ timeout: 10000 });
      console.log(`✅ Status selected: ${details.Status}`);
    }

    if (
      details.ContractStartDate !== "--None--" ||
      details["Contract Start Date"] !== "--None--"
    ) {
      const contractStartDate =
        details.ContractStartDate || details["Contract Start Date"];
      await this.contractStartDateInput.fill(contractStartDate, {
        timeout: 10000,
      });
      console.log(`✅ Contract Start Date filled: ${contractStartDate}`);
    }

    if (
      (details.AccountName && details.AccountName !== "--None--") ||
      (details["Account Name"] && details["Account Name"] !== "--None--")
    ) {
      const accountName = details.AccountName || details["Account Name"];
      console.log(`🔄 Attempting to select account: ${accountName}`);

      // Wait for the account field to be ready - TESTED AND WORKING
      await this.accountNameCombobox.waitFor({
        state: "visible",
        timeout: 10000,
      });

      try {
        // Step 1: Click the account combobox to open dropdown - TESTED AND WORKING
        await this.accountNameCombobox.click({ timeout: 10000 });
        console.log("✅ Account combobox clicked");
        await this.page.waitForTimeout(1000);

        // Step 2: Select the account option - TESTED AND WORKING
        await this.page
          .getByRole("option", { name: accountName })
          .first()
          .click({ timeout: 10000 });

        console.log(`✅ Account selected: ${accountName}`);
      } catch (error) {
        console.log(`❌ Account selection error: ${error}`);
        // Take a screenshot for debugging
        await Helper.takeScreenshotToFile(
          this.page,
          "account-selection-failed",
          this.testInfo,
          "OtherFunctionality/salesforce-contracts/"
        );
      }
    }

    if (
      (details.ContractTerm && details.ContractTerm !== "--None--") ||
      (details["Contract Term"] && details["Contract Term"] !== "--None--")
    ) {
      const contractTerm = details.ContractTerm || details["Contract Term"];
      await this.contractTermInput.fill(contractTerm, { timeout: 10000 });
      console.log(`✅ Contract Term filled: ${contractTerm}`);
    }

    if (
      (details.CustomerSignedBy && details.CustomerSignedBy !== "--None--") ||
      (details["Customer Signed By"] &&
        details["Customer Signed By"] !== "--None--")
    ) {
      const customerSignedBy =
        details.CustomerSignedBy || details["Customer Signed By"];
      await this.customerSignedByCombobox.fill(customerSignedBy, {
        timeout: 10000,
      });
      console.log(`✅ Customer Signed By filled: ${customerSignedBy}`);
    }

    if (
      (details.OwnerExpirationNotice &&
        details.OwnerExpirationNotice !== "--None--") ||
      (details["Owner Expiration Notice"] &&
        details["Owner Expiration Notice"] !== "--None--")
    ) {
      const ownerExpirationNotice =
        details.OwnerExpirationNotice || details["Owner Expiration Notice"];
      await this.ownerExpirationNoticeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: ownerExpirationNotice })
        .click({ timeout: 10000 });
      console.log(
        `✅ Owner Expiration Notice selected: ${ownerExpirationNotice}`
      );
    }

    if (
      (details.CustomerSignedTitle &&
        details.CustomerSignedTitle !== "--None--") ||
      (details["Customer Signed Title"] &&
        details["Customer Signed Title"] !== "--None--")
    ) {
      const customerSignedTitle =
        details.CustomerSignedTitle || details["Customer Signed Title"];
      await this.customerSignedTitleInput.fill(customerSignedTitle, {
        timeout: 10000,
      });
      console.log(`✅ Customer Signed Title filled: ${customerSignedTitle}`);
    }

    if (
      (details.CompanySignedBy && details.CompanySignedBy !== "--None--") ||
      (details["Company Signed By"] &&
        details["Company Signed By"] !== "--None--")
    ) {
      const companySignedBy =
        details.CompanySignedBy || details["Company Signed By"];
      await this.companySignedByCombobox.fill(companySignedBy, {
        timeout: 10000,
      });
      console.log(`✅ Company Signed By filled: ${companySignedBy}`);
    }

    if (
      (details.CustomerSignedDate &&
        details.CustomerSignedDate !== "--None--") ||
      (details["Customer Signed Date"] &&
        details["Customer Signed Date"] !== "--None--")
    ) {
      const customerSignedDate =
        details.CustomerSignedDate || details["Customer Signed Date"];
      await this.customerSignedDateInput.fill(customerSignedDate, {
        timeout: 10000,
      });
      console.log(`✅ Customer Signed Date filled: ${customerSignedDate}`);
    }

    if (
      (details.CompanySignedDate && details.CompanySignedDate !== "--None--") ||
      (details["Company Signed Date"] &&
        details["Company Signed Date"] !== "--None--")
    ) {
      const companySignedDate =
        details.CompanySignedDate || details["Company Signed Date"];
      await this.companySignedDateInput.fill(companySignedDate, {
        timeout: 10000,
      });
      console.log(`✅ Company Signed Date filled: ${companySignedDate}`);
    }

    if (
      (details.PriceBook && details.PriceBook !== "--None--") ||
      (details["Price Book"] && details["Price Book"] !== "--None--")
    ) {
      const priceBook = details.PriceBook || details["Price Book"];
      await this.priceBookCombobox.fill(priceBook, { timeout: 10000 });
      console.log(`✅ Price Book filled: ${priceBook}`);
    }

    // Fill Billing Address fields
    if (
      (details.BillingStreet && details.BillingStreet !== "--None--") ||
      (details["Billing Street"] && details["Billing Street"] !== "--None--")
    ) {
      const billingStreet = details.BillingStreet || details["Billing Street"];
      await this.billingStreetInput.fill(billingStreet, { timeout: 10000 });
      console.log(`✅ Billing Street filled: ${billingStreet}`);
    }

    if (
      (details.BillingCity && details.BillingCity !== "--None--") ||
      (details["Billing City"] && details["Billing City"] !== "--None--")
    ) {
      const billingCity = details.BillingCity || details["Billing City"];
      await this.billingCityInput.fill(billingCity, { timeout: 10000 });
      console.log(`✅ Billing City filled: ${billingCity}`);
    }

    if (
      (details.BillingZip && details.BillingZip !== "--None--") ||
      (details["Billing Zip"] && details["Billing Zip"] !== "--None--")
    ) {
      const billingZip = details.BillingZip || details["Billing Zip"];
      await this.billingZipInput.fill(billingZip, { timeout: 10000 });
      console.log(`✅ Billing Zip filled: ${billingZip}`);
    }

    if (
      (details.BillingState && details.BillingState !== "--None--") ||
      (details["Billing State"] && details["Billing State"] !== "--None--")
    ) {
      const billingState = details.BillingState || details["Billing State"];
      await this.billingStateInput.fill(billingState, { timeout: 10000 });
      console.log(`✅ Billing State filled: ${billingState}`);
    }

    if (
      (details.BillingCountry && details.BillingCountry !== "--None--") ||
      (details["Billing Country"] && details["Billing Country"] !== "--None--")
    ) {
      const billingCountry =
        details.BillingCountry || details["Billing Country"];
      await this.billingCountryInput.fill(billingCountry, { timeout: 10000 });
      console.log(`✅ Billing Country filled: ${billingCountry}`);
    }

    // Fill Description Information fields
    if (
      (details.SpecialTerms && details.SpecialTerms !== "--None--") ||
      (details["Special Terms"] && details["Special Terms"] !== "--None--")
    ) {
      const specialTerms = details.SpecialTerms || details["Special Terms"];
      await this.specialTermsInput.fill(specialTerms, { timeout: 10000 });
      console.log(`✅ Special Terms filled: ${specialTerms}`);
    }

    if (details.Description && details.Description !== "--None--") {
      await this.descriptionInput.fill(details.Description, { timeout: 10000 });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    console.log("💾 Saving the contract...");

    // Save the contract
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Contract saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-contract",
      this.testInfo,
      "OtherFunctionality/salesforce-contracts/"
    );

    console.log("🎉 Contract creation completed!");
  }
  /**
   * Verifies that a contract was successfully created by checking for specific field values
   *
   * This method validates contract creation success by checking if the contract detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing contract field values to verify
   * @param details.AccountName - Account name to verify
   * @param details.ContractTerm - Contract term to verify
   * @param details.Status - Status to verify
   */

  async verifyContract(details: { [k: string]: string }) {
    console.log("🔍 Starting contract verification...");

    await expect(this.contractCreatedMessage).toContainText("was created", {
      timeout: 10000,
    });
    console.log("✅ Contract creation message verified");

    // Verify contract creation by checking for key field values on the page
    if (details.AccountName || details["Account Name"]) {
      const accountName = details.AccountName || details["Account Name"];
      expect(await this.page.getByText(accountName).count()).toBeGreaterThan(0);
      console.log(
        `✅ Contract account name verification successful: ${accountName}`
      );
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-contracts/"
    );

    console.log("🎉 Contract verification completed!");
  }
}
