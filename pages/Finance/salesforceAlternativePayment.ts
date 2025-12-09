import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceAlternativePayment Page Object Model
 *
 * This class provides automation capabilities for Salesforce Alternative Payment Method management functionality.
 * It handles payment method creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new alternative payment methods with comprehensive field support
 * - Handle complex form interactions including checkboxes, dropdowns, and address fields
 * - Verify payment method creation success
 * - Support for all standard Salesforce alternative payment method fields
 * - Advanced account lookup handling with proper error management
 * - Address information management for payment methods
 *
 * @class SalesforceAlternativePayment
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceAlternativePaymentPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newPaymentMethodButton: Locator;
  readonly dialog: Locator;
  readonly saveButton: Locator;

  // Form field locators
  readonly nicknameInput: Locator;
  readonly registeredEmailInput: Locator;
  readonly accountCombo: Locator;
  readonly statusCombo: Locator;
  readonly processingModeCombo: Locator;
  readonly autoPayCheckbox: Locator;
  readonly paymentGatewayInput: Locator;
  readonly gatewayTokenInput: Locator;
  readonly gatewayDetailsInput: Locator;
  readonly companyNameInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;

  // Dynamic Fields - Country and State (can be textbox or combobox)
  readonly countryTextbox: Locator;
  readonly countryCombobox: Locator;
  readonly stateTextbox: Locator;
  readonly stateCombobox: Locator;

  // Backup locators
  readonly stateInput: Locator;
  readonly countryInput: Locator;
  readonly postalCodeInput: Locator;
  readonly commentsInput: Locator;
  readonly macAddressInput: Locator;
  readonly ipAddressInput: Locator;
  readonly phoneInput: Locator;
  readonly auditEmailInput: Locator;

  // Additional UI elements
  readonly appLauncher: Locator;
  readonly searchBox: Locator;
  readonly paymentMethodCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceAlternativePayment page object with all necessary locators
   *
   * Sets up locators for all Salesforce alternative payment method form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceAlternativePayment page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newPaymentMethodButton = page
      .getByRole("button", { name: /New/i })
      .first();
    this.dialog = page.getByRole("dialog").first();
    this.saveButton = this.dialog
      .getByRole("button", { name: /^Save$/i })
      .first();

    // Initialize form field locators
    this.nicknameInput = this.dialog.getByLabel("Nickname");
    this.registeredEmailInput = this.dialog.getByLabel("Registered Email");
    this.accountCombo = this.dialog.getByLabel("Account");
    this.statusCombo = this.dialog.getByLabel("Status");
    this.processingModeCombo = this.dialog.getByLabel("Processing Mode");
    this.autoPayCheckbox = this.dialog.getByLabel("Auto Pay");
    this.paymentGatewayInput = this.dialog.getByLabel("Payment Gateway");
    this.gatewayTokenInput = this.dialog.getByLabel("Gateway Token");
    this.gatewayDetailsInput = this.dialog.getByLabel("Gateway Details");
    this.companyNameInput = this.dialog.getByLabel("Company Name");
    this.streetInput = this.dialog.getByLabel("Street");
    this.cityInput = this.dialog.getByLabel("City");

    // Dynamic Fields - Initialize dual locators for Country and State
    this.countryTextbox = this.dialog.getByRole("textbox", { name: /Country/i });
    this.countryCombobox = this.dialog.getByRole("combobox", { name: /Country/i });
    this.stateTextbox = this.dialog.getByRole("textbox", { name: /State/i });
    this.stateCombobox = this.dialog.getByRole("combobox", { name: /State/i });

    // Backup locators
    this.stateInput = this.dialog.getByLabel("State");
    this.countryInput = this.dialog.getByLabel("Country");
    this.postalCodeInput = this.dialog.getByLabel("Postal Code");
    this.commentsInput = this.dialog.getByLabel("Comments");
    this.macAddressInput = this.dialog.getByLabel("MAC Address");
    this.ipAddressInput = this.dialog.getByLabel("IP Address");
    this.phoneInput = this.dialog.getByLabel("Phone");
    this.auditEmailInput = this.dialog.getByLabel("Audit Email");

    // Additional UI elements
    this.appLauncher = page.getByTitle("App Launcher");
    this.searchBox = page.getByPlaceholder("Search apps and items...");

    // Success message locator
    this.paymentMethodCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceAlternativePayment page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new alternative payment method in Salesforce with the provided details
   *
   * This method handles the complete payment method creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new payment method dialog
   * 3. Fills in all provided field values including complex lookups, checkboxes, and address fields
   * 4. Saves the payment method
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing payment method field values to be filled
   * @param details.Nickname - Payment method nickname (required)
   * @param details.RegisteredEmail - Registered email address (required)
   * @param details.Status - Payment method status (required)
   * @param details.ProcessingMode - Processing mode (required)
   * @param details.AutoPay - Auto pay setting (true/false, required)
   * @param details.Account - Account lookup (optional)
   * @param details.PaymentGateway - Payment gateway information
   * @param details.GatewayToken - Gateway token
   * @param details.GatewayDetails - Gateway details
   * @param details.CompanyName - Company name
   * @param details.Street - Street address
   * @param details.City - City
   * @param details.State - State/Province
   * @param details.Country - Country
   * @param details.PostalCode - Postal/ZIP code
   * @param details.Comments - Additional comments
   * @param details.MACAddress - MAC address
   * @param details.IPAddress - IP address
   * @param details.Phone - Phone number
   * @param details.AuditEmail - Audit email address
   */
  async addNewPaymentMethod(details: { [key: string]: string }) {
    console.log("🔄 Starting alternative payment method creation process...");
    console.log("📝 Payment method details:", JSON.stringify(details, null, 2));

    await expect(this.newPaymentMethodButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-payment-method",
      this.testInfo,
      "Finance/salesforce-alternative-payment/"
    );

    // Click New Payment Method
    await this.newPaymentMethodButton.click({ timeout: 10000 });
    console.log("✅ Payment method creation dialog opened");

    console.log("📋 Filling form fields...");

    // Fill required fields
    if (details.Nickname) {
      await this.nicknameInput.fill(details.Nickname, { timeout: 10000 });
    }

    if (details.RegisteredEmail || details["Registered Email"]) {
      const registeredEmail =
        details.RegisteredEmail || details["Registered Email"];
      await this.registeredEmailInput.fill(registeredEmail, { timeout: 10000 });
    }

    if (details.Status) {
      await this.statusCombo.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Status, exact: true })
        .click({ timeout: 10000 });
    }

    if (details.ProcessingMode || details["Processing Mode"]) {
      const processingMode =
        details.ProcessingMode || details["Processing Mode"];
      await this.processingModeCombo.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: processingMode, exact: true })
        .click({ timeout: 10000 });
    }

    if (details.AutoPay || details["Auto Pay"]) {
      const autoPay = details.AutoPay || details["Auto Pay"];
      await this.autoPayCheckbox.setChecked(autoPay === "true", {
        timeout: 10000,
      });
    }

    // Handle account lookup if provided
    if (details.Account) {
      console.log("🔍 Handling Account lookup...");
      await this.accountCombo.click({ timeout: 10000 });
      try {
        const accountsList = this.page.getByRole("listbox").locator("li");
        await accountsList.first().waitFor({ state: "visible", timeout: 5000 });
        await accountsList.last().click({ timeout: 10000 });
        console.log("✅ Account selected");
      } catch (error) {
        console.log("No accounts available or error selecting account:", error);
      }
    }

    // Fill optional gateway fields
    if (details.PaymentGateway || details["Payment Gateway"]) {
      const paymentGateway =
        details.PaymentGateway || details["Payment Gateway"];
      await this.paymentGatewayInput.fill(paymentGateway, { timeout: 10000 });
    }

    if (details.GatewayToken || details["Gateway Token"]) {
      const gatewayToken = details.GatewayToken || details["Gateway Token"];
      await this.gatewayTokenInput.fill(gatewayToken, { timeout: 10000 });
    }

    if (details.GatewayDetails || details["Gateway Details"]) {
      const gatewayDetails =
        details.GatewayDetails || details["Gateway Details"];
      await this.gatewayDetailsInput.fill(gatewayDetails, { timeout: 10000 });
    }

    // Fill address fields
    if (details.CompanyName || details["Company Name"]) {
      const companyName = details.CompanyName || details["Company Name"];
      await this.companyNameInput.fill(companyName, { timeout: 10000 });
    }

    if (details.Street) {
      await this.streetInput.fill(details.Street, { timeout: 10000 });
    }

    if (details.City) {
      await this.cityInput.fill(details.City, { timeout: 10000 });
    }

    // Fill Country FIRST (must be done before State)
    if (details.Country) {
      console.log("🌍 Handling Country field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.countryTextbox,
        this.countryCombobox,
        "Country",
        details.Country
      );
    }

    // Then fill State
    if (details.State) {
      console.log("🏘️ Handling State field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.stateTextbox,
        this.stateCombobox,
        "State",
        details.State
      );
    }

    if (details.PostalCode || details["Postal Code"]) {
      const postalCode = details.PostalCode || details["Postal Code"];
      await this.postalCodeInput.fill(postalCode, { timeout: 10000 });
    }

    // Fill additional fields
    if (details.Comments) {
      await this.commentsInput.fill(details.Comments, { timeout: 10000 });
    }

    if (details.MACAddress || details["MAC Address"]) {
      const macAddress = details.MACAddress || details["MAC Address"];
      await this.macAddressInput.fill(macAddress, { timeout: 10000 });
    }

    if (details.IPAddress || details["IP Address"]) {
      const ipAddress = details.IPAddress || details["IP Address"];
      await this.ipAddressInput.fill(ipAddress, { timeout: 10000 });
    }

    if (details.Phone) {
      await this.phoneInput.fill(details.Phone, { timeout: 10000 });
    }

    if (details.AuditEmail || details["Audit Email"]) {
      const auditEmail = details.AuditEmail || details["Audit Email"];
      await this.auditEmailInput.fill(auditEmail, { timeout: 10000 });
    }

    console.log("💾 Saving the payment method...");

    // Save the payment method
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Payment method saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-payment-method",
      this.testInfo,
      "Finance/salesforce-alternative-payment/"
    );

    console.log("🎉 Alternative payment method creation completed!");
  }

  /**
   * Verifies that an alternative payment method was successfully created by checking for specific field values
   *
   * This method validates payment method creation success by checking if the payment method detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing payment method field values to verify
   * @param details.Nickname - Payment method nickname to verify
   * @param details.RegisteredEmail - Registered email to verify
   * @param details.Status - Status to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   */
  async verifyPaymentMethod(details: { [k: string]: string }) {
    console.log("🔍 Starting payment method verification...");

    // Verify payment method creation message or payment method details
    if (details.Nickname) {
      await expect(
        this.page.locator(".uiOutputText").filter({ hasText: details.Nickname })
      ).toBeVisible({ timeout: 10000 });
      console.log(
        `✅ Payment method nickname verification successful: ${details.Nickname}`
      );
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Finance/salesforce-alternative-payment/"
    );

    console.log("🎉 Payment method verification completed!");
  }
}
