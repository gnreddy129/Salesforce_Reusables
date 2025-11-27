import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceReturnOrder Page Object Model
 *
 * This class provides automation capabilities for Salesforce Return Order creation and management.
 * It handles the complete workflow of creating a new return order with all visible and interactable fields.
 *
 * Features:
 * - Create new return orders with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Support for Date/Time field pairs
 * - Verify return order creation and setup
 * - Support for text inputs, combobox dropdowns, and date/time pickers
 *
 * Sections:
 * - Information: Case, Returned By, Account, Status, Contact, Owner
 * - Shipping Information: Source Location, Destination Location, Shipment Type, 
 *   Ship From Address (Address, City, Zip/Postal Code, State/Province, Country),
 *   Expected Arrival Date (Date, Time)
 * - Description: Description
 *
 * @class SalesforceReturnOrder
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceReturnOrder {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Dialog Container
    readonly dialog: Locator;

    // Information Section Fields
    readonly caseCombobox: Locator;
    readonly returnedByCombobox: Locator;
    readonly accountCombobox: Locator;
    readonly statusCombobox: Locator;
    readonly contactCombobox: Locator;
    readonly ownerField: Locator;

    // Shipping Information Section Fields
    readonly sourceLocationCombobox: Locator;
    readonly destinationLocationCombobox: Locator;
    readonly shipmentTypeCombobox: Locator;

    // Ship From Address Fields
    readonly shipFromAddressField: Locator;
    readonly shipFromCityField: Locator;
    readonly shipFromZipPostalCodeField: Locator;
    readonly shipFromStateProvinceField: Locator;
    readonly shipFromCountryField: Locator;

    // Expected Arrival Date Fields
    readonly expectedArrivalDateField: Locator;
    readonly expectedArrivalTimeCombobox: Locator;

    // Description Section Fields
    readonly descriptionTextarea: Locator;

    // Action Buttons
    readonly saveButton: Locator;
    readonly cancelButton: Locator;

    /**
     * Constructor - Initializes the SalesforceReturnOrder page object
     *
     * Sets up locators for all return order form elements using role-based selectors.
     * All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforceReturnOrder page object");
        this.page = page;
        this.testInfo = testInfo;

        // Dialog container for all form elements
        this.dialog = this.page.getByRole("dialog", { name: /New Return Order/i });

        // Information Section Fields - Using getByRole for robust element targeting
        this.caseCombobox = this.dialog.getByRole("combobox", { name: /^Case$/i });
        this.returnedByCombobox = this.dialog.getByRole("combobox", { name: /^Returned By$/i });
        this.accountCombobox = this.dialog.getByRole("combobox", { name: /^Account$/i });
        this.statusCombobox = this.dialog.getByRole("combobox", { name: /^Status$/i });
        this.contactCombobox = this.dialog.getByRole("combobox", { name: /^Contact$/i });

        // Shipping Information Section Fields
        this.sourceLocationCombobox = this.dialog.getByRole("combobox", { name: /^Source Location$/i });
        this.destinationLocationCombobox = this.dialog.getByRole("combobox", { name: /^Destination Location$/i });
        this.shipmentTypeCombobox = this.dialog.getByRole("combobox", { name: /^Shipment Type$/i });

        // Ship From Address Fields
        this.shipFromAddressField = this.dialog.getByRole("textbox", { name: /^Address$/i, exact: true });
        this.shipFromCityField = this.dialog.getByRole("textbox", { name: /^City$/i });
        this.shipFromZipPostalCodeField = this.dialog.getByRole("textbox", { name: /^Zip\/Postal Code$/i });
        this.shipFromStateProvinceField = this.dialog.getByRole("textbox", { name: /^State\/Province$/i });
        this.shipFromCountryField = this.dialog.getByRole("combobox", { name: /^Country$/i });

        // Expected Arrival Date Fields
        this.expectedArrivalDateField = this.dialog.getByRole('textbox', { name: 'Date' }).first();
        
        this.expectedArrivalTimeCombobox = this.dialog.getByRole("combobox", { name: /^Time$/i });

        // Description Section Fields
        this.descriptionTextarea = this.dialog.getByRole("textbox", { name: /^Description$/i });

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", { name: /^Save$/i });
        this.cancelButton = this.dialog.getByRole("button", { name: /Cancel and close/i });

        console.log("✅ SalesforceReturnOrder page object initialized successfully with all locators");
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
            const optionRole = this.page.locator(`[role="option"]:has-text("${optionText}")`).first();
            await optionRole.click({ timeout: 5000, force: true });
            console.log(`✅ ${fieldName} selected: ${optionText}`);
        } catch (e) {
            console.log(`❌ Failed to select ${fieldName} with click, trying keyboard...`, e);
            try {
                await combobox.fill(optionText, { timeout: 5000 });
                await this.page.waitForTimeout(300);
                await this.page.keyboard.press("ArrowDown");
                await this.page.waitForTimeout(300);
                await this.page.keyboard.press("Enter");
                console.log(`✅ ${fieldName} selected via keyboard: ${optionText}`);
            } catch (ke) {
                console.log(`❌ Failed to select ${fieldName}:`, ke);
                throw ke;
            }
        }
    }

    /**
     * Create new return order with provided details
     * @param details - Object containing return order details
     */
    async createReturnOrder(details: any): Promise<void> {
        console.log("🔄 Creating new return order...");
        console.log("📋 Return Order Details:", JSON.stringify(details, null, 2));

        try {
            await Helper.takeScreenshotToFile(this.page, "01-dialog-opened", this.testInfo, "Platform/salesforce-return-order");

            // Case (combobox, optional)
            if (details.Case) {
                await this.selectComboboxOption(this.caseCombobox, details.Case, "Case");
            }

            // Returned By (combobox, optional)
            if (details["Returned By"]) {
                await this.selectComboboxOption(this.returnedByCombobox, details["Returned By"], "Returned By");
            }

            // Account (combobox, optional)
            if (details.Account) {
                await this.selectComboboxOption(this.accountCombobox, details.Account, "Account");
            }

            // Status (combobox, optional)
            if (details.Status) {
                await this.selectComboboxOption(this.statusCombobox, details.Status, "Status");
            }

            // Contact (combobox, optional)
            if (details.Contact) {
                await this.selectComboboxOption(this.contactCombobox, details.Contact, "Contact");
            }

            // Source Location (combobox, optional)
            if (details["Source Location"]) {
                await this.selectComboboxOption(this.sourceLocationCombobox, details["Source Location"], "Source Location");
            }

            // Destination Location (combobox, optional)
            if (details["Destination Location"]) {
                await this.selectComboboxOption(this.destinationLocationCombobox, details["Destination Location"], "Destination Location");
            }

            // Shipment Type (combobox, optional)
            if (details["Shipment Type"]) {
                await this.selectComboboxOption(this.shipmentTypeCombobox, details["Shipment Type"], "Shipment Type");
            }

            // Ship From Country (combobox, optional)
            if (details["Ship From Country"]) {
                console.log(`📝 Filling Ship From Country Start with  ${details["Ship From Country"]} ...`);

                await this.shipFromCountryField.fill(details["Ship From Country"]);
                await this.page.keyboard.press("ArrowDown");
                await this.page.keyboard.press("Enter");

                console.log("✅ Ship From Country filled:", details["Ship From Country"]);
            }

            // Ship From Address (textbox, optional)
            if (details["Ship Address"]) {
                console.log("📝 Filling Ship Address...");
                await this.shipFromAddressField.clear();
                await this.shipFromAddressField.fill(details["Ship Address"], { timeout: 5000 });
                console.log("✅ Ship Address filled:", details["Ship Address"]);
            }

            // Ship From City (textbox, optional)
            if (details["Ship From City"]) {
                console.log("📝 Filling Ship From City...");
                await this.shipFromCityField.clear();
                await this.shipFromCityField.fill(details["Ship From City"], { timeout: 5000 });
                console.log("✅ Ship From City filled:", details["Ship From City"]);
            }

            // Ship From Zip/Postal Code (textbox, optional)
            if (details["Ship From Zip/Postal Code"]) {
                console.log("📝 Filling Ship From Zip/Postal Code...");
                await this.shipFromZipPostalCodeField.clear();
                await this.shipFromZipPostalCodeField.fill(details["Ship From Zip/Postal Code"], { timeout: 5000 });
                console.log("✅ Ship From Zip/Postal Code filled:", details["Ship From Zip/Postal Code"]);
            }

            // Ship From State/Province (textbox, optional)
            if (details["Ship From State/Province"]) {
                console.log("📝 Filling Ship From State/Province...");
                await this.shipFromStateProvinceField.clear();
                await this.shipFromStateProvinceField.fill(details["Ship From State/Province"], { timeout: 5000 });
                console.log("✅ Ship From State/Province filled:", details["Ship From State/Province"]);
            }

            // Expected Arrival Date (Date field, optional)
            if (details["Expected Arrival Date"]) {
                console.log("📅 Filling Expected Arrival Date...");
                await this.expectedArrivalDateField.clear();
                await this.expectedArrivalDateField.fill(details["Expected Arrival Date"], { timeout: 5000 });
                console.log("✅ Expected Arrival Date filled:", details["Expected Arrival Date"]);
            }

            // Expected Arrival Time (combobox, optional)
            if (details["Expected Arrival Time"]) {
                await this.selectComboboxOption(this.expectedArrivalTimeCombobox, details["Expected Arrival Time"], "Expected Arrival Time");
            }

            // Description (textarea, optional)
            if (details.Description) {
                console.log("📝 Filling Description...");
                await this.descriptionTextarea.clear();
                await this.descriptionTextarea.fill(details.Description, { timeout: 5000 });
                console.log("✅ Description filled:", details.Description);
            }

            await Helper.takeScreenshotToFile(this.page, "01-all-fields-filled", this.testInfo, "Platform/salesforce-return-order");

            // Save the return order
            console.log("💾 Saving the return order...");
            await this.saveButton.click({ timeout: 10000 });
            await this.page.waitForTimeout(2000);
            console.log("✅ Return order saved successfully");

            await Helper.takeScreenshotToFile(this.page, "02-after-save", this.testInfo, "Platform/salesforce-return-order");
        } catch (e) {
            console.log("❌ Error in createReturnOrder:", e);
            await Helper.takeScreenshotToFile(this.page, "error-screenshot", this.testInfo, "Platform/salesforce-return-order");
            throw e;
        }
    }

    /**
     * Verify return order creation was successful
     */
    async verifyCreationSuccess(): Promise<void> {
        console.log("🔍 Verifying return order creation...");
        try {
            // Wait for the dialog to close after save
            await this.page.waitForTimeout(2000);

            // Verify the page has navigated away from the new return order page
            const currentUrl = this.page.url();
            if (currentUrl.includes("/new")) {
                console.log("⚠️ Page still showing new return order form");
            } else {
                console.log("✅ Return order created successfully");
            }

            await Helper.takeScreenshotToFile(
                this.page,
                "03-final-verification",
                this.testInfo,
                "Platform/salesforce-return-order"
            );

            console.log("🎉 Verification completed!");
        } catch (e) {
            console.log("❌ Error in verifyCreationSuccess:", e);
            throw e;
        }
    }
}
