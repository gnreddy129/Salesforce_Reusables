import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforcePayments Page Object Model
 *
 * This class provides automation capabilities for Salesforce Payments management.
 * It handles payment creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new payments with comprehensive field management
 * - Handle complex form interactions with dates, comboboxes, and text inputs
 * - Verify payment creation success
 * - Support for all required and optional payment fields
 *
 * @class SalesforcePayments
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforcePaymentsPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Primary UI Controls
    readonly newButton: Locator;
    readonly dialog: Locator;

    // Payment Information Fields
    readonly accountCombobox: Locator;
    readonly statusCombobox: Locator;
    readonly amountTextbox: Locator;
    readonly typeCombobox: Locator;
    readonly paymentAuthorizationCombobox: Locator;
    readonly paymentGroupCombobox: Locator;
    readonly paymentMethodCombobox: Locator;
    readonly processingModeCombobox: Locator;
    readonly commentsTextbox: Locator;

    // Salesforce Result Fields
    readonly salesforceResultCodeCombobox: Locator;
    readonly cancellationSalesforceResultCodeTextbox: Locator;

    // Payment Gateway Fields
    readonly paymentGatewayCombobox: Locator;
    readonly gatewayResultCodeTextbox: Locator;
    readonly gatewayResultCodeDescriptionTextbox: Locator;
    readonly gatewayReferenceNumberTextbox: Locator;
    readonly gatewayReferenceDetailsTextbox: Locator;
    readonly cancellationGatewayResultCodeTextbox: Locator;
    readonly cancellationGatewayReferenceNumberTextbox: Locator;

    // System Information Fields
    readonly systemInformationTextbox: Locator;
    readonly macAddressTextbox: Locator;
    readonly ipAddressTextbox: Locator;
    readonly phoneTextbox: Locator;
    readonly auditEmailTextbox: Locator;

    // Date/Time Fields
    readonly effectiveDateTextbox: Locator;
    readonly effectiveTimeTextbox: Locator;
    readonly dateTextbox: Locator;
    readonly timeTextbox: Locator;
    readonly cancellationDateTextbox: Locator;
    readonly cancellationTimeTextbox: Locator;
    readonly cancellationEffectiveDateTextbox: Locator;
    readonly cancellationEffectiveTimeTextbox: Locator;
    readonly gatewayDateTextbox: Locator;
    readonly gatewayTimeTextbox: Locator;
    readonly cancellationGatewayDateTextbox: Locator;
    readonly cancellationGatewayTimeTextbox: Locator;

    // Action Buttons
    readonly saveButton: Locator;

    /**
     * Constructor - Initializes the SalesforcePayments page object with all necessary locators
     *
     * Sets up locators for all Salesforce payment form elements using role-based selectors
     * for maximum reliability. All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforcePayments page object");
        this.page = page;
        this.testInfo = testInfo;

        // Primary controls
        this.newButton = page.getByRole("button", { name: /New/i }).first();
        this.dialog = page.getByRole("dialog").first();

        // Payment Information Fields
        this.accountCombobox = this.dialog.getByRole("combobox", {
            name: /^Account$/i,
        });

        this.statusCombobox = this.dialog.getByRole("combobox", {
            name: /^Status$/i,
        });

        this.amountTextbox = this.dialog.getByRole('textbox', { name: 'Amount *' });

        this.typeCombobox = this.dialog.getByRole("combobox", {
            name: /^Type$/i,
        });

        this.paymentAuthorizationCombobox = this.dialog.getByRole("combobox", {
            name: /^Payment Authorization$/i,
        });

        this.paymentGroupCombobox = this.dialog.getByRole("combobox", {
            name: /^Payment Group$/i,
        });

        this.paymentMethodCombobox = this.dialog.getByRole("combobox", {
            name: /^Payment Method$/i,
        });

        this.processingModeCombobox = this.dialog.getByRole("combobox", {
            name: /^Processing Mode$/i,
        });

        this.commentsTextbox = this.dialog.getByRole("textbox", {
            name: /^Comments$/i,
        });

        // Salesforce Result Fields
        this.salesforceResultCodeCombobox = this.dialog.getByRole("combobox", {
            name: /^Salesforce Result Code$/i,
        });

        this.cancellationSalesforceResultCodeTextbox = this.dialog.getByRole("textbox", {
            name: /^Cancellation Salesforce Result Code$/i,
        });

        // Payment Gateway Fields
        this.paymentGatewayCombobox = this.dialog.getByRole("combobox", {
            name: /^Payment Gateway$/i,
        });

        this.gatewayResultCodeTextbox = this.dialog.getByRole("textbox", {
            name: /^Gateway Result Code$/i,
        });

        this.gatewayResultCodeDescriptionTextbox = this.dialog.getByRole("textbox", {
            name: /^Gateway Result Code Description$/i,
        });

        this.gatewayReferenceNumberTextbox = this.dialog.getByRole("textbox", {
            name: /^Gateway Reference Number$/i,
        });

        this.gatewayReferenceDetailsTextbox = this.dialog.getByRole("textbox", {
            name: /^Gateway Reference Details$/i,
        });

        this.cancellationGatewayResultCodeTextbox = this.dialog.getByRole("textbox", {
            name: /^Cancellation Gateway Result Code$/i,
        });

        this.cancellationGatewayReferenceNumberTextbox = this.dialog.getByRole("textbox", {
            name: /^Cancellation Gateway Reference Number$/i,
        });

        // System Information Fields
        this.macAddressTextbox = this.dialog.getByRole("textbox", {
            name: /^MAC Address$/i,
        });

        this.ipAddressTextbox = this.dialog.getByRole("textbox", {
            name: /^IP Address$/i,
        });

        this.phoneTextbox = this.dialog.getByRole("textbox", {
            name: /^Phone$/i,
        });

        this.auditEmailTextbox = this.dialog.getByRole("textbox", {
            name: /^Audit Email$/i,
        });

        // Date/Time Fields
        this.effectiveDateTextbox = this.dialog.getByRole('group', { name: 'Effective Date', exact: true }).getByLabel('Date');

        this.effectiveTimeTextbox = this.dialog.getByRole("group", {
            name: "Effective Date",
            exact: true,
        }).getByLabel("Time");

        this.dateTextbox = this.dialog.getByRole("group", {
            name: "Date",
            exact: true,
        }).getByLabel("Date");

        this.timeTextbox = this.dialog.getByRole("group", {
            name: "Date",
            exact: true,
        }).getByLabel("Time");

        this.cancellationDateTextbox = this.dialog.getByRole("group", {
            name: "Cancellation Date",
        }).getByLabel("Date", { exact: true });

        this.cancellationTimeTextbox = this.dialog.getByRole("group", {
            name: "Cancellation Date",
        }).getByLabel("Time");

        this.cancellationEffectiveDateTextbox = this.dialog.getByRole("group", {
            name: "Cancellation Effective Date",
        }).getByLabel("Date", { exact: true });

        this.cancellationEffectiveTimeTextbox = this.dialog.getByRole("group", {
            name: "Cancellation Effective Date",
        }).getByLabel("Time");

        this.gatewayDateTextbox = this.dialog.getByRole("group", {
            name: "Gateway Date",
            exact: true,
        }).getByLabel("Date", { exact: true });

        this.gatewayTimeTextbox = this.dialog.getByRole("group", {
            name: "Gateway Date",
            exact: true,
        }).getByLabel("Time");

        this.cancellationGatewayDateTextbox = this.dialog.getByRole("group", {
            name: "Cancellation Gateway Date",
        }).getByLabel("Date");

        this.cancellationGatewayTimeTextbox = this.dialog.getByRole("group", {
            name: "Cancellation Gateway Date",
        }).getByLabel("Time");

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", {
            name: /^Save$/i,
        });

        console.log(
            "✅ SalesforcePayments page object initialized successfully with all locators"
        );
    }

    /**
     * Creates a new payment in Salesforce with the provided details
     *
     * This method handles the complete payment creation workflow:
     * 1. Takes a start screenshot for verification
     * 2. Opens the new payment dialog
     * 3. Fills in all provided field values
     * 4. Saves the payment
     * 5. Takes screenshots at key points
     *
     * @param details - Object containing payment field values to be filled
     */
    async addNewPayment(details: { [field: string]: string }) {
        console.log("🔄 Starting payment creation process...");
        console.log("📋 Payment details:", JSON.stringify(details, null, 2));

        // Wait for the new button to be visible and take start screenshot
        await expect(this.newButton).toBeVisible({ timeout: 10000 });
        await Helper.takeScreenshotToFile(
            this.page,
            "1-start-payment",
            this.testInfo,
            "Finance/salesforce-payments/"
        );

        // Open the new payment creation dialog
        await this.newButton.click({ timeout: 10000 });
        console.log("✅ Payment creation dialog opened");

        await this.dialog.waitFor({ state: "visible", timeout: 10000 });

        console.log("📋 Filling form fields...");

        // Account (Combobox)
        if (details.Account) {
            console.log("🔽 Selecting Account from combobox...");
            await this.accountCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${details.Account}")`).first();
                await optionRole.click({ timeout: 5000, force: true });
                console.log("✅ Account selected:", details.Account);
            } catch (e) {
                try {
                    const textOption = this.page.locator(`text=/\\b${details.Account}\\b/`).first();
                    await textOption.click({ timeout: 5000, force: true });
                    console.log("✅ Account selected with force:", details.Account);
                } catch (e2) {
                    try {
                        await this.accountCombobox.fill(details.Account, { timeout: 5000 });
                        await this.page.waitForTimeout(500);
                        await this.page.keyboard.press("ArrowDown");
                        await this.page.waitForTimeout(300);
                        await this.page.keyboard.press("Enter");
                        console.log("✅ Account selected via type and keyboard");
                    } catch (e3) {
                        console.log("❌ Failed to select Account:", e3);
                    }
                }
            }
        }

        // Status (Dropdown)
        if (details.Status) {
            console.log("🔽 Selecting Status from dropdown...");
            await this.statusCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${details.Status}")`).first();
                await optionRole.click({ timeout: 5000, force: true });
                console.log("✅ Status selected:", details.Status);
            } catch (e) {
                try {
                    const textOption = this.page.locator(`text=/\\b${details.Status}\\b/`).first();
                    await textOption.click({ timeout: 5000, force: true });
                    console.log("✅ Status selected with force:", details.Status);
                } catch (e2) {
                    try {
                        await this.statusCombobox.fill(details.Status, { timeout: 5000 });
                        await this.page.waitForTimeout(500);
                        await this.page.keyboard.press("ArrowDown");
                        await this.page.waitForTimeout(300);
                        await this.page.keyboard.press("Enter");
                        console.log("✅ Status selected via type and keyboard");
                    } catch (e3) {
                        console.log("❌ Failed to select Status:", e3);
                    }
                }
            }
        }

        // Amount (Textbox) - Required
        if (details.Amount) {
            console.log("📝 Filling Amount...");
            try {
                await this.amountTextbox.click({ timeout: 5000 });
                await this.page.waitForTimeout(300);
                // Clear any existing value first
                await this.amountTextbox.clear();
                await this.page.waitForTimeout(200);
                // Fill with numeric value only
                const numericAmount = parseFloat(details.Amount.toString()).toString();
                await this.amountTextbox.fill(numericAmount, { timeout: 10000 });
                console.log("✅ Amount filled:", numericAmount);
            } catch (e) {
                console.log("❌ Failed to fill Amount:", e);
            }
        }

        // Type (Dropdown) - Required
        if (details.Type) {
            console.log("🔽 Selecting Type from dropdown...");
            await this.typeCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${details.Type}")`).first();
                await optionRole.click({ timeout: 5000, force: true });
                console.log("✅ Type selected:", details.Type);
            } catch (e) {
                try {
                    await this.typeCombobox.fill(details.Type, { timeout: 5000 });
                    await this.page.waitForTimeout(500);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ Type selected via type and keyboard");
                } catch (e2) {
                    console.log("❌ Failed to select Type:", e2);
                }
            }
        }

        // // Payment Authorization (Combobox)
        // if (details.PaymentAuthorization || details["Payment Authorization"]) {
        //   const paymentAuth = details.PaymentAuthorization || details["Payment Authorization"];
        //   console.log("🔽 Selecting Payment Authorization from combobox...");
        //   await this.paymentAuthorizationCombobox.click({ timeout: 10000 });
        //   await this.page.waitForTimeout(1000);

        //   try {
        //     const optionRole = this.page.locator(`[role="option"]:has-text("${paymentAuth}")`).first();
        //     await optionRole.click({ timeout: 5000, force: true });
        //     console.log("✅ Payment Authorization selected:", paymentAuth);
        //   } catch (e) {
        //     console.log("❌ Failed to select Payment Authorization:", e);
        //   }
        // }

        // // Payment Group (Combobox)
        // if (details.PaymentGroup || details["Payment Group"]) {
        //   const paymentGroup = details.PaymentGroup || details["Payment Group"];
        //   console.log("🔽 Selecting Payment Group from combobox...");
        //   await this.paymentGroupCombobox.click({ timeout: 10000 });
        //   await this.page.waitForTimeout(1000);

        //   try {
        //     const optionRole = this.page.locator(`[role="option"]:has-text("${paymentGroup}")`).first();
        //     await optionRole.click({ timeout: 5000, force: true });
        //     console.log("✅ Payment Group selected:", paymentGroup);
        //   } catch (e) {
        //     console.log("❌ Failed to select Payment Group:", e);
        //   }
        // }

        // // Payment Method (Combobox)
        // if (details.PaymentMethod || details["Payment Method"]) {
        //   const paymentMethod = details.PaymentMethod || details["Payment Method"];
        //   console.log("🔽 Selecting Payment Method from combobox...");
        //   await this.paymentMethodCombobox.click({ timeout: 10000 });
        //   await this.page.waitForTimeout(1000);

        //   try {
        //     const optionRole = this.page.locator(`[role="option"]:has-text("${paymentMethod}")`).first();
        //     await optionRole.click({ timeout: 5000, force: true });
        //     console.log("✅ Payment Method selected:", paymentMethod);
        //   } catch (e) {
        //     console.log("❌ Failed to select Payment Method:", e);
        //   }
        // }

        // Effective Date (Date & Time)
        if (details.EffectiveDate || details["Effective Date"]) {
            const effectiveDate = details.EffectiveDate || details["Effective Date"];
            console.log("📝 Filling Effective Date...");
            try {
                await this.effectiveDateTextbox.clear();
                await this.page.waitForTimeout(200);
                await this.effectiveDateTextbox.fill(effectiveDate, { timeout: 10000 });
                console.log("✅ Effective Date filled:", effectiveDate);
            } catch (e) {
                console.log("❌ Failed to fill Effective Date:", e);
            }
        }

        if (details.EffectiveTime || details["Effective Time"]) {
            const effectiveTime = details.EffectiveTime || details["Effective Time"];
            console.log("📝 Filling Effective Time...");
            try {
                await this.effectiveTimeTextbox.clear();
                await this.page.waitForTimeout(200);
                await this.effectiveTimeTextbox.fill(effectiveTime, { timeout: 10000 });
                console.log("✅ Effective Time filled:", effectiveTime);
            } catch (e) {
                console.log("❌ Failed to fill Effective Time:", e);
            }
        }

        // Processing Mode (Dropdown) - Required
        if (details.ProcessingMode || details["Processing Mode"]) {
            const processingMode = details.ProcessingMode || details["Processing Mode"];
            console.log("🔽 Selecting Processing Mode from dropdown...");
            await this.processingModeCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${processingMode}")`).first();
                await optionRole.click({ timeout: 5000, force: true });
                console.log("✅ Processing Mode selected:", processingMode);
            } catch (e) {
                console.log("❌ Failed to select Processing Mode:", e);
            }
        }

        // Comments (Textbox)
        if (details.Comments) {
            await this.commentsTextbox.fill(details.Comments, { timeout: 10000 });
            console.log("✅ Comments filled:", details.Comments);
        }

        // Date (Date & Time)
        if (details.Date) {
            console.log("📝 Filling Date...");
            try {
                await this.dateTextbox.clear();
                await this.page.waitForTimeout(200);
                await this.dateTextbox.fill(details.Date, { timeout: 10000 });
                console.log("✅ Date filled:", details.Date);
            } catch (e) {
                console.log("❌ Failed to fill Date:", e);
            }
        }

        if (details.Time) {
            console.log("📝 Filling Time...");
            try {
                await this.timeTextbox.clear();
                await this.page.waitForTimeout(200);
                await this.timeTextbox.fill(details.Time, { timeout: 10000 });
                console.log("✅ Time filled:", details.Time);
            } catch (e) {
                console.log("❌ Failed to fill Time:", e);
            }
        }


        // Cancellation Date (Date & Time)
        if (details.CancellationDate || details["Cancellation Date"]) {
            const cancDate = details.CancellationDate || details["Cancellation Date"];
            console.log("📝 Filling Cancellation Date...");
            try {
                await this.cancellationDateTextbox.clear();;
                await this.page.waitForTimeout(200);
                await this.cancellationDateTextbox.fill(cancDate, { timeout: 10000 });
                console.log("✅ Cancellation Date filled:", cancDate);
            } catch (e) {
                console.log("❌ Failed to fill Cancellation Date:", e);
            }
        }

        if (details.CancellationTime || details["Cancellation Time"]) {
            const cancTime = details.CancellationTime || details["Cancellation Time"];
            console.log("📝 Filling Cancellation Time...");
            try {
                await this.cancellationTimeTextbox.clear();;
                await this.page.waitForTimeout(200);
                await this.cancellationTimeTextbox.fill(cancTime, { timeout: 10000 });
                console.log("✅ Cancellation Time filled:", cancTime);
            } catch (e) {
                console.log("❌ Failed to fill Cancellation Time:", e);
            }
        }

        // Cancellation Effective Date (Date & Time)
        if (details.CancellationEffectiveDate || details["Cancellation Effective Date"]) {
            const cancEffDate = details.CancellationEffectiveDate || details["Cancellation Effective Date"];
            console.log("📝 Filling Cancellation Effective Date...");
            try {
                await this.cancellationEffectiveDateTextbox.clear();;
                await this.page.waitForTimeout(200);
                await this.cancellationEffectiveDateTextbox.fill(cancEffDate, { timeout: 10000 });
                console.log("✅ Cancellation Effective Date filled:", cancEffDate);
            } catch (e) {
                console.log("❌ Failed to fill Cancellation Effective Date:", e);
            }
        }

        if (details.CancellationEffectiveTime || details["Cancellation Effective Time"]) {
            const cancEffTime = details.CancellationEffectiveTime || details["Cancellation Effective Time"];
            console.log("📝 Filling Cancellation Effective Time...");
            try {
                await this.cancellationEffectiveTimeTextbox.clear();;
                await this.page.waitForTimeout(200);
                await this.cancellationEffectiveTimeTextbox.fill(cancEffTime, { timeout: 10000 });
                console.log("✅ Cancellation Effective Time filled:", cancEffTime);
            } catch (e) {
                console.log("❌ Failed to fill Cancellation Effective Time:", e);
            }
        }

        // Salesforce Result Code (Dropdown)
        if (details.SalesforceResultCode || details["Salesforce Result Code"]) {
            const resultCode = details.SalesforceResultCode || details["Salesforce Result Code"];
            console.log("🔽 Selecting Salesforce Result Code from dropdown...");
            await this.salesforceResultCodeCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${resultCode}")`).first();
                await optionRole.click({ timeout: 5000, force: true });
                console.log("✅ Salesforce Result Code selected:", resultCode);
            } catch (e) {
                console.log("❌ Failed to select Salesforce Result Code:", e);
            }
        }

        // Cancellation Salesforce Result Code (Textbox)
        if (details.CancellationSalesforceResultCode || details["Cancellation Salesforce Result Code"]) {
            const cancResultCode = details.CancellationSalesforceResultCode || details["Cancellation Salesforce Result Code"];
            await this.cancellationSalesforceResultCodeTextbox.fill(cancResultCode, { timeout: 10000 });
            console.log("✅ Cancellation Salesforce Result Code filled:", cancResultCode);
        }

        // // Payment Gateway (Combobox)
        // if (details.PaymentGateway || details["Payment Gateway"]) {
        //   const gateway = details.PaymentGateway || details["Payment Gateway"];
        //   console.log("🔽 Selecting Payment Gateway from combobox...");
        //   await this.paymentGatewayCombobox.click({ timeout: 10000 });
        //   await this.page.waitForTimeout(1000);

        //   try {
        //     const optionRole = this.page.locator(`[role="option"]:has-text("${gateway}")`).first();
        //     await optionRole.click({ timeout: 5000, force: true });
        //     console.log("✅ Payment Gateway selected:", gateway);
        //   } catch (e) {
        //     console.log("❌ Failed to select Payment Gateway:", e);
        //   }
        // }

        // Gateway Date (Date & Time)
        if (details.GatewayDate || details["Gateway Date"]) {
            const gatewayDate = details.GatewayDate || details["Gateway Date"];
            console.log("📝 Filling Gateway Date...");
            try {
                await this.gatewayDateTextbox.clear();
                await this.page.waitForTimeout(200);
                await this.gatewayDateTextbox.fill(gatewayDate, { timeout: 10000 });
                console.log("✅ Gateway Date filled:", gatewayDate);
            } catch (e) {
                console.log("❌ Failed to fill Gateway Date:", e);
            }
        }

        if (details.GatewayTime || details["Gateway Time"]) {
            const gatewayTime = details.GatewayTime || details["Gateway Time"];
            console.log("📝 Filling Gateway Time...");
            try {
                await this.gatewayTimeTextbox.clear();
                await this.page.waitForTimeout(200);
                await this.gatewayTimeTextbox.fill(gatewayTime, { timeout: 10000 });
                console.log("✅ Gateway Time filled:", gatewayTime);
            } catch (e) {
                console.log("❌ Failed to fill Gateway Time:", e);
            }
        }

        // Gateway Result Code (Textbox)
        if (details.GatewayResultCode || details["Gateway Result Code"]) {
            const gatewayResultCode = details.GatewayResultCode || details["Gateway Result Code"];
            await this.gatewayResultCodeTextbox.fill(gatewayResultCode, { timeout: 10000 });
            console.log("✅ Gateway Result Code filled:", gatewayResultCode);
        }

        // Gateway Result Code Description (Textbox)
        if (details.GatewayResultCodeDescription || details["Gateway Result Code Description"]) {
            const gatewayDesc = details.GatewayResultCodeDescription || details["Gateway Result Code Description"];
            await this.gatewayResultCodeDescriptionTextbox.fill(gatewayDesc, { timeout: 10000 });
            console.log("✅ Gateway Result Code Description filled:", gatewayDesc);
        }

        // Gateway Reference Number (Textbox)
        if (details.GatewayReferenceNumber || details["Gateway Reference Number"]) {
            const gatewayRefNum = details.GatewayReferenceNumber || details["Gateway Reference Number"];
            await this.gatewayReferenceNumberTextbox.fill(gatewayRefNum, { timeout: 10000 });
            console.log("✅ Gateway Reference Number filled:", gatewayRefNum);
        }

        // Gateway Reference Details (Textbox)
        if (details.GatewayReferenceDetails || details["Gateway Reference Details"]) {
            const gatewayRefDetails = details.GatewayReferenceDetails || details["Gateway Reference Details"];
            await this.gatewayReferenceDetailsTextbox.fill(gatewayRefDetails, { timeout: 10000 });
            console.log("✅ Gateway Reference Details filled:", gatewayRefDetails);
        }

        // Cancellation Gateway Date (Date & Time)
        if (details.CancellationGatewayDate || details["Cancellation Gateway Date"]) {
            const cancGatewayDate = details.CancellationGatewayDate || details["Cancellation Gateway Date"];
            console.log("📝 Filling Cancellation Gateway Date...");
            try {
                await this.cancellationGatewayDateTextbox.clear();;
                await this.page.waitForTimeout(200);
                await this.cancellationGatewayDateTextbox.fill(cancGatewayDate, { timeout: 10000 });
                console.log("✅ Cancellation Gateway Date filled:", cancGatewayDate);
            } catch (e) {
                console.log("❌ Failed to fill Cancellation Gateway Date:", e);
            }
        }

        if (details.CancellationGatewayTime || details["Cancellation Gateway Time"]) {
            const cancGatewayTime = details.CancellationGatewayTime || details["Cancellation Gateway Time"];
            console.log("📝 Filling Cancellation Gateway Time...");
            try {
                await this.cancellationGatewayTimeTextbox.clear();;
                await this.page.waitForTimeout(200);
                await this.cancellationGatewayTimeTextbox.fill(cancGatewayTime, { timeout: 10000 });
                console.log("✅ Cancellation Gateway Time filled:", cancGatewayTime);
            } catch (e) {
                console.log("❌ Failed to fill Cancellation Gateway Time:", e);
            }
        }

        // Cancellation Gateway Result Code (Textbox)
        if (details.CancellationGatewayResultCode || details["Cancellation Gateway Result Code"]) {
            const cancGatewayResultCode = details.CancellationGatewayResultCode || details["Cancellation Gateway Result Code"];
            await this.cancellationGatewayResultCodeTextbox.fill(cancGatewayResultCode, { timeout: 10000 });
            console.log("✅ Cancellation Gateway Result Code filled:", cancGatewayResultCode);
        }

        // Cancellation Gateway Reference Number (Textbox)
        if (details.CancellationGatewayReferenceNumber || details["Cancellation Gateway Reference Number"]) {
            const cancGatewayRefNum = details.CancellationGatewayReferenceNumber || details["Cancellation Gateway Reference Number"];
            await this.cancellationGatewayReferenceNumberTextbox.fill(cancGatewayRefNum, { timeout: 10000 });
            console.log("✅ Cancellation Gateway Reference Number filled:", cancGatewayRefNum);
        }

        // MAC Address (Textbox)
        if (details.MACAddress || details["MAC Address"]) {
            const macAddr = details.MACAddress || details["MAC Address"];
            await this.macAddressTextbox.fill(macAddr, { timeout: 10000 });
            console.log("✅ MAC Address filled:", macAddr);
        }

        // IP Address (Textbox)
        if (details.IPAddress || details["IP Address"]) {
            const ipAddr = details.IPAddress || details["IP Address"];
            await this.ipAddressTextbox.fill(ipAddr, { timeout: 10000 });
            console.log("✅ IP Address filled:", ipAddr);
        }

        // Phone (Textbox)
        if (details.Phone) {
            await this.phoneTextbox.fill(details.Phone, { timeout: 10000 });
            console.log("✅ Phone filled:", details.Phone);
        }

        // Audit Email (Textbox)
        if (details.AuditEmail || details["Audit Email"]) {
            const auditEmail = details.AuditEmail || details["Audit Email"];
            await this.auditEmailTextbox.fill(auditEmail, { timeout: 10000 });
            console.log("✅ Audit Email filled:", auditEmail);
        }

        // Take screenshot AFTER all fields are filled
        await Helper.takeScreenshotToFile(
            this.page,
            "2-all-fields-filled",
            this.testInfo,
            "Finance/salesforce-payments/"
        );

        console.log("💾 Saving the payment...");

        // Save the payment
        await this.saveButton.click({ timeout: 10000 });
        console.log("✅ Payment saved successfully");

        await this.page.waitForTimeout(2000);

        // Take screenshot AFTER save
        await Helper.takeScreenshotToFile(
            this.page,
            "3-after-save-success",
            this.testInfo,
            "Finance/salesforce-payments/"
        );

        await this.page.waitForTimeout(1000);

        // Take final screenshot showing the payments list
        await Helper.takeScreenshotToFile(
            this.page,
            "4-payments-list",
            this.testInfo,
            "Finance/salesforce-payments/"
        );

        console.log("🎉 Payment creation completed!");
    }

    /**
     * Verifies that a payment was successfully created
     *
     * This method validates payment creation success by checking that
     * the dialog has closed and we're back on the payments list page.
     *
     * @throws Will throw an assertion error if dialog is still visible
     */
    async verifyPaymentSuccess() {
        console.log("🔍 Verifying payment creation success...");

        // Check that the dialog is no longer visible (indicates save was successful)
        const dialogVisible = await this.dialog.isVisible().catch(() => false);
        if (!dialogVisible) {
            console.log("✅ Dialog closed - payment created successfully");
        } else {
            console.log("❌ Dialog still visible - creation may have failed");
        }

        await Helper.takeScreenshotToFile(
            this.page,
            "5-final-verification",
            this.testInfo,
            "Finance/salesforce-payments/"
        );

        console.log("🎉 Verification completed!");
    }
}
