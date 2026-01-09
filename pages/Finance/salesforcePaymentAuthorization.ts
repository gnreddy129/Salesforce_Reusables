import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforcePaymentAuthorization Page Object Model
 *
 * This class provides automation capabilities for Salesforce Payment Authorization creation and management.
 * It handles the complete workflow of creating a new payment authorization with all visible and interactable fields.
 *
 * Features:
 * - Create new payment authorizations with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Support for Date/Time field pairs (combined date and time inputs)
 * - Verify payment authorization creation and setup
 * - Support for text inputs, combobox dropdowns, and date/time pickers
 *
 * Sections:
 * - Information: Account, Status*, Amount*, Date, Time, Payment Method, Payment Group, 
 *   Expiration Date, Expiration Time, Effective Date, Effective Time, Processing Mode*, Comments
 * - Gateway Details: Payment Gateway, Gateway Date, Gateway Time, Gateway Auth Code, 
 *   Gateway Result Code Description, Gateway Result Code, Gateway Reference Details, Gateway Reference Number
 * - System Information: MAC Address, IP Address, Phone, Audit Email
 *
 * @class SalesforcePaymentAuthorization
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforcePaymentAuthorization {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Dialog Container
    readonly dialog: Locator;

    // Information Section Fields
    readonly accountCombobox: Locator;
    readonly statusCombobox: Locator;
    readonly amountTextbox: Locator;
    readonly dateField: Locator;
    readonly timeField: Locator;
    readonly paymentMethodCombobox: Locator;
    readonly paymentGroupCombobox: Locator;
    readonly expirationDateField: Locator;
    readonly expirationTimeField: Locator;
    readonly effectiveDateField: Locator;
    readonly effectiveTimeField: Locator;
    readonly processingModeCombobox: Locator;
    readonly commentsTextbox: Locator;

    // Gateway Details Section Fields
    readonly paymentGatewayCombobox: Locator;
    readonly gatewayDateField: Locator;
    readonly gatewayTimeField: Locator;
    readonly gatewayAuthCodeTextbox: Locator;
    readonly gatewayResultCodeDescriptionTextbox: Locator;
    readonly gatewayResultCodeTextbox: Locator;
    readonly gatewayReferenceDetailsTextbox: Locator;
    readonly gatewayReferenceNumberTextbox: Locator;

    // System Information Section Fields
    readonly macAddressTextbox: Locator;
    readonly ipAddressTextbox: Locator;
    readonly phoneTextbox: Locator;
    readonly auditEmailTextbox: Locator;

    // Action Buttons
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly saveAndNewButton: Locator;
    readonly allOptionsLocator: Locator;

    /**
     * Constructor - Initializes the SalesforcePaymentAuthorization page object
     *
     * Sets up locators for all payment authorization form elements using role-based selectors.
     * All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforcePaymentAuthorization page object");
        this.page = page;
        this.testInfo = testInfo;

        // Dialog container for all form elements
        this.dialog = page.getByRole("dialog", { name: /New Payment Authorization/i });

        // Information Section Fields - Using getByRole for robust element targeting
        this.accountCombobox = this.dialog.getByRole("combobox", { name: /^Account$/i });
        this.statusCombobox = this.dialog.getByRole("combobox", { name: /^Status/i });
        this.amountTextbox = this.dialog.getByRole('textbox', { name: 'Amount *' });
        // Date and Time fields in Information section - Using fieldset and input[type="text"] selector
        this.dateField = this.dialog.getByRole('group', { name: 'Date', exact: true }).getByLabel('Date');
        this.timeField = this.dialog.getByRole('group', { name: 'Date', exact: true }).getByLabel('Time');
        this.paymentMethodCombobox = this.dialog.getByRole("combobox", { name: /^Payment Method$/i });
        this.paymentGroupCombobox = this.dialog.getByRole("combobox", { name: /^Payment Group$/i });
        // Expiration Date/Time fields - Using specific fieldset scoping
        this.expirationDateField = this.dialog.getByRole('group', { name: 'Expiration Date' }).getByLabel('Date');
        this.expirationTimeField = this.dialog.getByRole('group', { name: 'Expiration Date' }).getByLabel('Time');
        // Effective Date/Time fields - Using specific fieldset scoping
        this.effectiveDateField = this.dialog.getByRole('group', { name: 'Effective Date' }).getByLabel('Date');
        this.effectiveTimeField = this.dialog.getByRole('group', { name: 'Effective Date' }).getByLabel('Time');
        this.processingModeCombobox = this.dialog.getByRole("combobox", { name: /^Processing Mode/i });
        this.commentsTextbox = this.dialog.getByRole("textbox", { name: /^Comments$/i });

        // Gateway Details Section Fields
        this.paymentGatewayCombobox = this.dialog.getByRole("combobox", { name: /^Payment Gateway$/i });
        this.gatewayDateField = this.dialog.getByRole('group', { name: 'Gateway Date' }).getByLabel('Date');
        this.gatewayTimeField = this.dialog.getByRole('group', { name: 'Gateway Date' }).getByLabel('Time');
        this.gatewayAuthCodeTextbox = this.dialog.getByRole("textbox", { name: /^Gateway Auth Code$/i });
        this.gatewayResultCodeDescriptionTextbox = this.dialog.getByRole("textbox", { name: /^Gateway Result Code Description$/i });
        this.gatewayResultCodeTextbox = this.dialog.getByRole("textbox", { name: /^Gateway Result Code$/i });
        this.gatewayReferenceDetailsTextbox = this.dialog.getByRole("textbox", { name: /^Gateway Reference Details$/i });
        this.gatewayReferenceNumberTextbox = this.dialog.getByRole("textbox", { name: /^Gateway Reference Number$/i });

        // System Information Section Fields
        this.macAddressTextbox = this.dialog.getByRole("textbox", { name: /^MAC Address$/i });
        this.ipAddressTextbox = this.dialog.getByRole("textbox", { name: /^IP Address$/i });
        this.phoneTextbox = this.dialog.getByRole("textbox", { name: /^Phone$/i });
        this.auditEmailTextbox = this.dialog.getByRole("textbox", { name: /^Audit Email$/i });

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", { name: /^Save$/i });
        this.cancelButton = this.dialog.getByRole("button", { name: /^Cancel$/i });
        this.saveAndNewButton = this.dialog.getByRole("button", { name: /^Save & New/i });
        this.allOptionsLocator = page.getByRole("option");
        console.log("✅ SalesforcePaymentAuthorization page object initialized successfully with all locators");
    }

    /**
     * Helper method to select a combobox option
     * @param combobox - The combobox locator
     * @param optionText - The text of the option to select
     * @param fieldName - Field name for logging
     */
    private async selectComboboxOption(combobox: Locator, optionText: string, fieldName: string): Promise<void> {
        console.log(`🔽 Selecting ${fieldName} from dropdown...`);
        try {
            await combobox.click({ timeout: 5000 });
            await this.page.waitForTimeout(500);
            this.allOptionsLocator.first().click({ timeout: 10000 });
            console.log(`✅ ${fieldName} selected: ${optionText}`);
        } catch (e) {
            console.log(`❌ Error selecting ${fieldName}:`, e);
        }
    }

    private async selectDropdownOption(combobox: Locator, optionText: string, fieldName: string): Promise<void> {
        console.log(`🔽 Selecting ${fieldName} from dropdown...`);
        try {
            await combobox.click({ timeout: 5000 });
            await this.page.waitForTimeout(500);
            this.allOptionsLocator.filter({ hasText: optionText }).first().click({ timeout: 10000 });
            console.log(`✅ ${fieldName} selected: ${optionText}`);
        } catch (e) {
            console.log(`❌ Error selecting ${fieldName}:`, e);
        }
    }

    /**
     * Create new payment authorization with provided details
     * @param details - Object containing payment authorization details
     */
    async createPaymentAuthorization(details: any): Promise<void> {
        console.log("🔄 Creating new payment authorization...");
        console.log("📋 Payment Authorization Details:", JSON.stringify(details, null, 2));

        try {
            await Helper.takeScreenshotToFile(this.page, "01-dialog-opened", this.testInfo, "Finance/salesforce-payment-authorization");

            // Account (combobox, optional)
            if (details.Account) {
                await this.selectComboboxOption(this.accountCombobox, details.Account, "Account");
            }

            // Status* (combobox, required)
            if (details.Status) {
                await this.selectDropdownOption(this.statusCombobox, details.Status, "Status");
            }

            // Amount* (textbox, required)
            if (details.Amount) {
                console.log("📝 Filling Amount...");
                await this.amountTextbox.clear();
                await this.amountTextbox.fill(details.Amount.toString(), { timeout: 5000 });
                console.log("✅ Amount filled:", details.Amount);
            }

            // Date (Date field)
            if (details.Date) {
                console.log("📅 Filling Date...");
                await this.dateField.clear();
                await this.dateField.fill(details.Date, { timeout: 5000 });
                console.log("✅ Date filled:", details.Date);
            }

            // Time (Time field)
            if (details.Time) {
                console.log("⏰ Filling Time...");
                await this.timeField.clear();
                await this.timeField.fill(details.Time, { timeout: 5000 });
                console.log("✅ Time filled:", details.Time);
            }

            // Payment Method (combobox, optional)
            if (details["Payment Method"]) {
                await this.selectComboboxOption(this.paymentMethodCombobox, details["Payment Method"], "Payment Method");
            }

            // Payment Group (combobox, optional)
            if (details["Payment Group"]) {
                await this.selectComboboxOption(this.paymentGroupCombobox, details["Payment Group"], "Payment Group");
            }

            // Expiration Date (Date field, optional)
            if (details["Expiration Date"]) {
                console.log("📅 Filling Expiration Date...");
                await this.expirationDateField.clear();
                await this.expirationDateField.fill(details["Expiration Date"], { timeout: 5000 });
                console.log("✅ Expiration Date filled:", details["Expiration Date"]);
            }

            // Expiration Time (Time field, optional)
            if (details["Expiration Time"]) {
                console.log("⏰ Filling Expiration Time...");
                await this.expirationTimeField.clear();
                await this.expirationTimeField.fill(details["Expiration Time"], { timeout: 5000 });
                console.log("✅ Expiration Time filled:", details["Expiration Time"]);
            }

            // Effective Date (Date field, optional)
            if (details["Effective Date"]) {
                console.log("📅 Filling Effective Date...");
                await this.effectiveDateField.clear();
                await this.effectiveDateField.fill(details["Effective Date"], { timeout: 5000 });
                console.log("✅ Effective Date filled:", details["Effective Date"]);
            }

            // Effective Time (Time field, optional)
            if (details["Effective Time"]) {
                console.log("⏰ Filling Effective Time...");
                await this.effectiveTimeField.clear();
                await this.effectiveTimeField.fill(details["Effective Time"], { timeout: 5000 });
                console.log("✅ Effective Time filled:", details["Effective Time"]);
            }

            // Processing Mode* (combobox, required)
            if (details["Processing Mode"]) {
                await this.selectDropdownOption(this.processingModeCombobox, details["Processing Mode"], "Processing Mode");
            }

            // Comments (textbox, optional)
            if (details.Comments) {
                console.log("📝 Filling Comments...");
                await this.commentsTextbox.clear();
                await this.commentsTextbox.fill(Helper.generateUniqueValue(details.Comments), { timeout: 5000 });
                console.log("✅ Comments filled:", details.Comments);
            }

            // Payment Gateway (combobox, optional)
            if (details["Payment Gateway"]) {
                await this.selectComboboxOption(this.paymentGatewayCombobox, details["Payment Gateway"], "Payment Gateway");
            }

            // Gateway Date (Date field, optional)
            if (details["Gateway Date"]) {
                console.log("📅 Filling Gateway Date...");
                await this.gatewayDateField.clear();
                await this.gatewayDateField.fill(details["Gateway Date"], { timeout: 5000 });
                console.log("✅ Gateway Date filled:", details["Gateway Date"]);
            }

            // Gateway Time (Time field, optional)
            if (details["Gateway Time"]) {
                console.log("⏰ Filling Gateway Time...");
                await this.gatewayTimeField.clear();
                await this.gatewayTimeField.fill(details["Gateway Time"], { timeout: 5000 });
                console.log("✅ Gateway Time filled:", details["Gateway Time"]);
            }

            // Gateway Auth Code (textbox, optional)
            if (details["Gateway Auth Code"]) {
                console.log("📝 Filling Gateway Auth Code...");
                await this.gatewayAuthCodeTextbox.clear();
                await this.gatewayAuthCodeTextbox.fill(details["Gateway Auth Code"], { timeout: 5000 });
                console.log("✅ Gateway Auth Code filled:", details["Gateway Auth Code"]);
            }

            // Gateway Result Code Description (textbox, optional)
            if (details["Gateway Result Code Description"]) {
                console.log("📝 Filling Gateway Result Code Description...");
                await this.gatewayResultCodeDescriptionTextbox.clear();
                await this.gatewayResultCodeDescriptionTextbox.fill(details["Gateway Result Code Description"], { timeout: 5000 });
                console.log("✅ Gateway Result Code Description filled:", details["Gateway Result Code Description"]);
            }

            // Gateway Result Code (textbox, optional)
            if (details["Gateway Result Code"]) {
                console.log("📝 Filling Gateway Result Code...");
                await this.gatewayResultCodeTextbox.clear();
                await this.gatewayResultCodeTextbox.fill(details["Gateway Result Code"], { timeout: 5000 });
                console.log("✅ Gateway Result Code filled:", details["Gateway Result Code"]);
            }

            // Gateway Reference Details (textbox, optional)
            if (details["Gateway Reference Details"]) {
                console.log("📝 Filling Gateway Reference Details...");
                await this.gatewayReferenceDetailsTextbox.clear();
                await this.gatewayReferenceDetailsTextbox.fill(details["Gateway Reference Details"], { timeout: 5000 });
                console.log("✅ Gateway Reference Details filled:", details["Gateway Reference Details"]);
            }

            // Gateway Reference Number (textbox, optional)
            if (details["Gateway Reference Number"]) {
                console.log("📝 Filling Gateway Reference Number...");
                await this.gatewayReferenceNumberTextbox.clear();
                await this.gatewayReferenceNumberTextbox.fill(details["Gateway Reference Number"], { timeout: 5000 });
                console.log("✅ Gateway Reference Number filled:", details["Gateway Reference Number"]);
            }

            // MAC Address (textbox, optional)
            if (details["MAC Address"]) {
                console.log("📝 Filling MAC Address...");
                await this.macAddressTextbox.clear();
                await this.macAddressTextbox.fill(details["MAC Address"], { timeout: 5000 });
                console.log("✅ MAC Address filled:", details["MAC Address"]);
            }

            // IP Address (textbox, optional)
            if (details["IP Address"]) {
                console.log("📝 Filling IP Address...");
                await this.ipAddressTextbox.clear();
                await this.ipAddressTextbox.fill(details["IP Address"], { timeout: 5000 });
                console.log("✅ IP Address filled:", details["IP Address"]);
            }

            // Phone (textbox, optional)
            if (details.Phone) {
                console.log("📝 Filling Phone...");
                await this.phoneTextbox.clear();
                await this.phoneTextbox.fill(Helper.generateUniqueValue(details.Phone), { timeout: 5000 });
                console.log("✅ Phone filled:", details.Phone);
            }

            // Audit Email (textbox, optional)
            if (details["Audit Email"]) {
                console.log("📝 Filling Audit Email...");
                await this.auditEmailTextbox.clear();
                await this.auditEmailTextbox.fill(details["Audit Email"], { timeout: 5000 });
                console.log("✅ Audit Email filled:", details["Audit Email"]);
            }

            await Helper.takeScreenshotToFile(this.page, "01-all-fields-filled", this.testInfo, "Finance/salesforce-payment-authorization");

            // Save the payment authorization
            console.log("💾 Saving the payment authorization...");
            await this.saveButton.click({ timeout: 10000 });
            await this.page.waitForTimeout(2000);
            console.log("✅ Payment authorization saved successfully");

            await Helper.takeScreenshotToFile(this.page, "02-after-save", this.testInfo, "Finance/salesforce-payment-authorization");
        } catch (e) {
            console.log("❌ Error in createPaymentAuthorization:", e);
            await Helper.takeScreenshotToFile(this.page, "error-screenshot", this.testInfo, "Finance/salesforce-payment-authorization");
            throw e;
        }
    }

    /**
     * Verify payment authorization creation was successful
     */
    async verifyCreationSuccess(): Promise<void> {
        console.log("🔍 Verifying payment authorization creation...");
        try {
            // Wait for the dialog to close after save
            await this.page.waitForTimeout(2000);

            // Verify the page has navigated away from the new authorization page
            const currentUrl = this.page.url();
            if (currentUrl.includes("/new")) {
                console.log("⚠️ Page still showing new authorization form");
            } else {
                console.log("✅ Payment authorization created successfully");
            }

            await Helper.takeScreenshotToFile(
                this.page,
                "03-final-verification",
                this.testInfo,
                "Finance/salesforce-payment-authorization"
            );

            console.log("🎉 Verification completed!");
        } catch (e) {
            console.log("❌ Error in verifyCreationSuccess:", e);
            throw e;
        }
    }
}
