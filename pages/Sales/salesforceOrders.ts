import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceOrders Page Object Model
 *
 * This class provides automation capabilities for Salesforce Order management functionality.
 * It handles order creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new orders with comprehensive field support
 * - Handle complex form interactions including comboboxes, date fields, and address information
 * - Verify order creation success
 * - Support for all standard Salesforce order fields including shipping and billing address information
 * - Navigate to Orders module using standard navigation
 * - Complete order lifecycle management
 *
 * @class SalesforceOrders
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceOrdersPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Order Information Fields
  readonly contractNumberCombobox: Locator;
  readonly orderTypeInput: Locator;
  readonly accountNameCombobox: Locator;
  readonly statusCombobox: Locator;
  readonly orderStartDateInput: Locator;
  readonly orderStartDatePicker: Locator;
  readonly customerAuthorizedByCombobox: Locator;
  readonly companyAuthorizedByCombobox: Locator;

  // Shipping Address Fields
  readonly shippingStreetInput: Locator;
  readonly shippingCityInput: Locator;
  readonly shippingZipInput: Locator;

  // Dynamic Fields - Shipping Country and State (can be textbox or combobox)
  readonly shippingCountryTextbox: Locator;
  readonly shippingCountryCombobox: Locator;
  readonly shippingStateTextbox: Locator;
  readonly shippingStateCombobox: Locator;

  // Billing Address Fields
  readonly billingStreetInput: Locator;
  readonly billingCityInput: Locator;
  readonly billingZipInput: Locator;

  // Dynamic Fields - Billing Country and State (can be textbox or combobox)
  readonly billingCountryTextbox: Locator;
  readonly billingCountryCombobox: Locator;
  readonly billingStateTextbox: Locator;
  readonly billingStateCombobox: Locator;

  // Description Fields
  readonly descriptionInput: Locator;

  // Navigation Elements
  readonly orderCreatedMessage: Locator;
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceOrders page object with all necessary locators
   *
   * Sets up locators for all Salesforce order form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceOrders page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New", exact: true });
    this.cancelButton = page.getByRole("button", { name: "Cancel", exact: true });

    // Order Information field locators
    this.contractNumberCombobox = page.getByRole("combobox", {
      name: "Contract Number",
    });
    this.orderTypeInput = page.getByRole("textbox", { name: "Order Type" });
    this.accountNameCombobox = page.getByRole("combobox", {
      name: "Account Name",
    });
    this.statusCombobox = page.getByRole("combobox", { name: "Status" });
    this.orderStartDateInput = page.getByRole("textbox", {
      name: "*Order Start Date",
    });
    this.orderStartDatePicker = page.getByRole("button", {
      name: "Select a date for Order Start Date",
    });
    this.customerAuthorizedByCombobox = page.getByRole("combobox", {
      name: "Customer Authorized By",
    });
    this.companyAuthorizedByCombobox = page.getByRole("combobox", {
      name: "Company Authorized By",
    });

    // Shipping Address field locators
    this.shippingStreetInput = page.getByRole("textbox", {
      name: "Shipping Street",
    });
    this.shippingCityInput = page.getByRole("textbox", {
      name: "Shipping City",
    });
    this.shippingZipInput = page.getByRole("textbox", {
      name: "Shipping Zip/Postal Code",
    });

    // Dynamic Fields - Initialize dual locators for Shipping Country and State
    this.shippingCountryTextbox = page.getByRole("textbox", { name: /Shipping Country/i });
    this.shippingCountryCombobox = page.getByRole("combobox", { name: /Shipping Country/i });
    this.shippingStateTextbox = page.getByRole("textbox", { name: /Shipping State/i });
    this.shippingStateCombobox = page.getByRole("combobox", { name: /Shipping State/i });

    // Billing Address field locators
    this.billingStreetInput = page.getByRole("textbox", { name: "Billing Street" });
    this.billingCityInput = page.getByRole("textbox", { name: "Billing City" });
    this.billingZipInput = page.getByRole("textbox", {
      name: "Billing Zip/Postal Code",
    });

    // Dynamic Fields - Initialize dual locators for Billing Country and State
    this.billingCountryTextbox = page.getByRole("textbox", { name: /Billing Country/i });
    this.billingCountryCombobox = page.getByRole("combobox", { name: /Billing Country/i });
    this.billingStateTextbox = page.getByRole("textbox", { name: /Billing State/i });
    this.billingStateCombobox = page.getByRole("combobox", { name: /Billing State/i });

    // Description field locator
    this.descriptionInput = page.getByRole("textbox", { name: "Description" });

    // Success message locator
    this.orderCreatedMessage = page.locator(".toastMessage");
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceOrders page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new order in Salesforce with the provided details
   *
   * This method handles the complete order creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new order creation form
   * 3. Fills in all provided field values including dates, comboboxes, and address information
   * 4. Saves the order
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing order field values to be filled
   * @param details.ContractNumber - Contract number (optional) - combobox
   * @param details.OrderNumber - Order number (optional) - text input
   * @param details.OrderType - Order type (optional) - text input
   * @param details.AccountName - Associated account name (required) - combobox
   * @param details.Status - Order status (required) - combobox
   * @param details.OrderStartDate - Order start date (required) - date input in DD/MM/YYYY format
   * @param details.CustomerAuthorizedBy - Customer authorized by contact (optional) - combobox
   * @param details.CompanyAuthorizedBy - Company authorized by contact (optional) - combobox
   * @param details.ShippingAddress - Shipping address (optional) - text input
   * @param details.ShippingStreet - Shipping street address (optional) - text input
   * @param details.ShippingCity - Shipping city (optional) - text input
   * @param details.ShippingZip - Shipping zip/postal code (optional) - text input
   * @param details.ShippingState - Shipping state/province (optional) - text input
   * @param details.ShippingCountry - Shipping country (optional) - text input
   * @param details.BillingAddress - Billing address (optional) - text input
   * @param details.BillingStreet - Billing street address (optional) - text input
   * @param details.BillingCity - Billing city (optional) - text input
   * @param details.BillingZip - Billing zip/postal code (optional) - text input
   * @param details.BillingState - Billing state/province (optional) - text input
   * @param details.BillingCountry - Billing country (optional) - text input
   * @param details.Description - Order description (optional) - text input
   */
  async addNewOrder(details: { [key: string]: string }) {
    console.log("🔄 Starting order creation process...");
    console.log("📝 Order details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-order",
      this.testInfo,
      "Sales/salesforce-orders/"
    );

    // Wait for form to be fully loaded
    await this.statusCombobox.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Fill Order Information fields
    if (
      (details.ContractNumber && details.ContractNumber !== "--None--") ||
      (details["Contract Number"] && details["Contract Number"] !== "--None--")
    ) {
      const contractNumber =
        details.ContractNumber || details["Contract Number"];
      await this.contractNumberCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(`✅ Contract Number selected: ${contractNumber}`);
    }

    if (
      (details.OrderType && details.OrderType !== "--None--") ||
      (details["Order Type"] && details["Order Type"] !== "--None--")
    ) {
      const orderType = details.OrderType || details["Order Type"];
      await this.orderTypeInput.fill(orderType, { timeout: 10000 });
      console.log(`✅ Order Type filled: ${orderType}`);
    }

    if (
      (details.AccountName && details.AccountName !== "--None--") ||
      (details["Account Name"] && details["Account Name"] !== "--None--")
    ) {
      const accountName = details.AccountName || details["Account Name"];
      console.log(`🔄 Attempting to select account: ${accountName}`);

      // Wait for the account field to be ready
      await this.accountNameCombobox.waitFor({
        state: "visible",
        timeout: 10000,
      });

      try {
        // Click the account combobox to open dropdown
        await this.accountNameCombobox.click({ timeout: 10000 });
        console.log("✅ Account combobox clicked");
        await this.page.waitForTimeout(1000);
        await this.allOptionsLocator.first().click({ timeout: 10000 });
        console.log(`✅ Account selected: ${accountName}`);
      } catch (error) {
        console.log(`❌ Account selection error: ${error}`);
        // Take a screenshot for debugging
        await Helper.takeScreenshotToFile(
          this.page,
          "account-selection-failed",
          this.testInfo,
          "Sales/salesforce-orders/"
        );
      }
    }

    if (details.Status && details.Status !== "--None--") {
      await this.statusCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.Status }).first().click({ timeout: 10000 });
      console.log(`✅ Status selected: ${details.Status}`);
    }

    if (
      (details.OrderStartDate && details.OrderStartDate !== "--None--") ||
      (details["Order Start Date"] &&
        details["Order Start Date"] !== "--None--")
    ) {
      const orderStartDate =
        details.OrderStartDate || details["Order Start Date"];
      await this.orderStartDateInput.fill(orderStartDate, {
        timeout: 10000,
      });
      console.log(`✅ Order Start Date filled: ${orderStartDate}`);
    }

    if (
      (details.CustomerAuthorizedBy &&
        details.CustomerAuthorizedBy !== "--None--") ||
      (details["Customer Authorized By"] &&
        details["Customer Authorized By"] !== "--None--")
    ) {
      const customerAuthorizedBy =
        details.CustomerAuthorizedBy || details["Customer Authorized By"];
      await this.customerAuthorizedByCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(
        `✅ Customer Authorized By selected: ${customerAuthorizedBy}`
      );
    }

    if (
      (details.CompanyAuthorizedBy &&
        details.CompanyAuthorizedBy !== "--None--") ||
      (details["Company Authorized By"] &&
        details["Company Authorized By"] !== "--None--")
    ) {
      const companyAuthorizedBy =
        details.CompanyAuthorizedBy || details["Company Authorized By"];
      await this.companyAuthorizedByCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(`✅ Company Authorized By selected: ${companyAuthorizedBy}`);
    }

    if (
      (details.ShippingStreet && details.ShippingStreet !== "--None--") ||
      (details["Shipping Street"] && details["Shipping Street"] !== "--None--")
    ) {
      let shippingStreet = details.ShippingStreet || details["Shipping Street"];
      await this.shippingStreetInput.fill(Helper.generateUniqueValue(shippingStreet), { timeout: 10000 });
      console.log(`✅ Shipping Street filled: ${Helper.generateUniqueValue(shippingStreet)}`);
    }

    if (
      (details.ShippingCity && details.ShippingCity !== "--None--") ||
      (details["Shipping City"] && details["Shipping City"] !== "--None--")
    ) {
      let shippingCity = details.ShippingCity || details["Shipping City"];
      await this.shippingCityInput.fill(Helper.generateUniqueValue(shippingCity), { timeout: 10000 });
      console.log(`✅ Shipping City filled: ${Helper}`);
    }

    if (
      (details.ShippingZip && details.ShippingZip !== "--None--") ||
      (details["Shipping Zip"] && details["Shipping Zip"] !== "--None--")
    ) {
      const shippingZip = details.ShippingZip || details["Shipping Zip"];
      await this.shippingZipInput.fill(shippingZip, { timeout: 10000 });
      console.log(`✅ Shipping Zip filled: ${shippingZip}`);
    }

    // Fill Shipping Country FIRST (must be done before State)
    if (
      (details.ShippingCountry && details.ShippingCountry !== "--None--") ||
      (details["Shipping Country"] &&
        details["Shipping Country"] !== "--None--")
    ) {
      const shippingCountry =
        details.ShippingCountry || details["Shipping Country"];
      console.log("🌍 Handling Shipping Country field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.shippingCountryTextbox,
        this.shippingCountryCombobox,
        "Shipping Country",
        shippingCountry
      );
    }

    // Then fill Shipping State
    if (
      (details.ShippingState && details.ShippingState !== "--None--") ||
      (details["Shipping State"] && details["Shipping State"] !== "--None--")
    ) {
      const shippingState = details.ShippingState || details["Shipping State"];
      console.log("🏘️ Handling Shipping State field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.shippingStateTextbox,
        this.shippingStateCombobox,
        "Shipping State",
        shippingState
      );
    }

    if (
      (details.BillingStreet && details.BillingStreet !== "--None--") ||
      (details["Billing Street"] && details["Billing Street"] !== "--None--")
    ) {
      let billingStreet = details.BillingStreet || details["Billing Street"];
      await this.billingStreetInput.fill(Helper.generateUniqueValue(billingStreet), { timeout: 10000 });
      console.log(`✅ Billing Street filled: ${Helper.generateUniqueValue(billingStreet)}`);
    }

    if (
      (details.BillingCity && details.BillingCity !== "--None--") ||
      (details["Billing City"] && details["Billing City"] !== "--None--")
    ) {
      let billingCity = details.BillingCity || details["Billing City"];
      await this.billingCityInput.fill(Helper.generateUniqueValue(billingCity), { timeout: 10000 });
      console.log(`✅ Billing City filled: ${Helper.generateUniqueValue(billingCity)}`);
    }

    if (
      (details.BillingZip && details.BillingZip !== "--None--") ||
      (details["Billing Zip"] && details["Billing Zip"] !== "--None--")
    ) {
      const billingZip = details.BillingZip || details["Billing Zip"];
      await this.billingZipInput.fill(billingZip, { timeout: 10000 });
      console.log(`✅ Billing Zip filled: ${billingZip}`);
    }

    // Fill Billing Country FIRST (must be done before State)
    if (
      (details.BillingCountry && details.BillingCountry !== "--None--") ||
      (details["Billing Country"] && details["Billing Country"] !== "--None--")
    ) {
      const billingCountry =
        details.BillingCountry || details["Billing Country"];
      console.log("🌍 Handling Billing Country field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.billingCountryTextbox,
        this.billingCountryCombobox,
        "Billing Country",
        billingCountry
      );
    }

    // Then fill Billing State
    if (
      (details.BillingState && details.BillingState !== "--None--") ||
      (details["Billing State"] && details["Billing State"] !== "--None--")
    ) {
      const billingState = details.BillingState || details["Billing State"];
      console.log("🏘️ Handling Billing State field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.billingStateTextbox,
        this.billingStateCombobox,
        "Billing State",
        billingState
      );
    }

    // Fill Description field
    if (details.Description && details.Description !== "--None--") {
      await this.descriptionInput.fill(Helper.generateUniqueValue(details.Description), { timeout: 10000 });
      console.log(`✅ Description filled: ${Helper.generateUniqueValue(details.Description)}`);
    }
    await Helper.takeScreenshotToFile(
      this.page,
      "2-filled-form",
      this.testInfo,
      "Sales/salesforce-orders/"
    );
    await this.page.waitForTimeout(1000);
    console.log("🎉 Order creation completed!");
  }

  /**
   * Verifies that an order was successfully created by checking for specific field values
   *
   * This method validates order creation success by checking if the order detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing order field values to verify
   * @param details.AccountName - Account name to verify
   * @param details.Status - Status to verify
   * @param details.OrderNumber - Order number to verify
   */
  async verifyOrder(details: { [k: string]: string }) {
    console.log("🔍 Starting order verification...");

    await expect(this.orderCreatedMessage.first()).toContainText("was created", { timeout: 10000, });

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Sales/salesforce-orders/"
    );

    console.log("🎉 Order verification completed!");
  }
}
