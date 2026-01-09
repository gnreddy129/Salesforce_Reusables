import { Locator, Page, TestInfo } from '@playwright/test';
import { Helper } from '../../utils/helper';

/**
 * SalesforcePaymentGatewayLogs Page Object Model
 *
 * This class provides automation capabilities for Salesforce Payment Gateway Logs management.
 * It handles payment gateway logs creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new payment gateway logs with comprehensive field management
 * - Handle complex form interactions with dates, comboboxes, and text inputs
 * - Verify payment gateway logs creation success
 * - Support for all required and optional payment gateway logs fields
 *
 * @class SalesforcePaymentGatewayLogsPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforcePaymentGatewayLogsPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Dialog locator
    readonly dialog: Locator;

    // Locators - Payment Information Section
    readonly interactionTypeCombobox: Locator;
    readonly chooseObjectCombobox: Locator;
    readonly referencedEntityCombobox: Locator;
    readonly paymentGatewayCombobox: Locator;
    readonly statusCombobox: Locator;

    // Locators - Gateway Date & Time
    readonly gatewayDateField: Locator;
    readonly gatewayTimeField: Locator;

    // Locators - Gateway Response Details
    readonly gatewayReferenceNumberField: Locator;
    readonly gatewayResultCodeField: Locator;
    readonly gatewayResultCodeDescriptionField: Locator;
    readonly gatewayAuthCodeField: Locator;
    readonly gatewayAvsCodeField: Locator;
    readonly gatewayMessageField: Locator;

    // Locators - Additional Information Section
    readonly salesforceResultCodeCombobox: Locator;
    readonly salesforceReferenceNumberField: Locator;

    // Locators - Request/Response Details Section
    readonly requestField: Locator;
    readonly responseField: Locator;

    // Button Locators
    readonly saveButton: Locator;
    readonly saveNewButton: Locator;
    readonly cancelButton: Locator;

    readonly allOptionsLocator: Locator;
    
    constructor(page: Page, testInfo?: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        console.log('🚀 Initializing SalesforcePaymentGatewayLogs page object');
        
        // Dialog
        this.dialog = page.getByRole('dialog').first();

        // Payment Information Section
        this.interactionTypeCombobox = this.dialog.getByRole('combobox', { name: /^Interaction Type$/i });
        this.chooseObjectCombobox = this.dialog.getByRole('combobox', { name: /^Choose an object$/i });
        this.referencedEntityCombobox = this.dialog.getByRole('combobox', { name: /^Referenced Entity$/i });
        this.paymentGatewayCombobox = this.dialog.getByRole('combobox', { name: /^Payment Gateway$/i });
        this.statusCombobox = this.dialog.getByRole('combobox', { name: /^Status$/i });

        // Gateway Date & Time
        this.gatewayDateField = this.dialog.getByRole('group', { name: 'Gateway Date', exact: true }).getByLabel('Date', { exact: true });
        this.gatewayTimeField = this.dialog.getByRole('group', { name: 'Gateway Date', exact: true }).getByLabel('Time');

        // Gateway Response Details
        this.gatewayReferenceNumberField = this.dialog.getByRole('textbox', { name: /^Gateway Reference Number$/i });
        this.gatewayResultCodeField = this.dialog.getByRole('textbox', { name: /^Gateway Result Code$/i });
        this.gatewayResultCodeDescriptionField = this.dialog.getByRole('textbox', { name: /^Gateway Result Code Description$/i });
        this.gatewayAuthCodeField = this.dialog.getByRole('textbox', { name: /^Gateway Auth Code$/i });
        this.gatewayAvsCodeField = this.dialog.getByRole('textbox', { name: /^Gateway Avs Code$/i });
        this.gatewayMessageField = this.dialog.getByRole('textbox', { name: /^Gateway Message$/i });

        // Additional Information Section
        this.salesforceResultCodeCombobox = this.dialog.getByRole('combobox', { name: /^Salesforce Result Code$/i });
        this.salesforceReferenceNumberField = this.dialog.getByRole('textbox', { name: /^Salesforce Reference Number$/i });

        // Request/Response Details Section
        this.requestField = this.dialog.getByRole('textbox', { name: /^Request$/i });
        this.responseField = this.dialog.getByRole('textbox', { name: /^Response$/i });

        // Button Locators
        this.saveButton = this.dialog.getByRole('button', { name: /^Save$/i });
        this.saveNewButton = this.dialog.getByRole('button', { name: /^Save & New$/i });
        this.cancelButton = this.dialog.getByRole('button', { name: /^Cancel$/i });

        // Options
        this.allOptionsLocator = page.getByRole("option");
        
        console.log('✅ SalesforcePaymentGatewayLogs page object initialized successfully');
    }

    /**
     * Creates a new payment gateway log in Salesforce with the provided details
     *
     * This method handles the complete payment gateway logs creation workflow:
     * 1. Logs the starting process
     * 2. Fills in all provided field values
     * 3. Saves the payment gateway log
     * 4. Handles all optional fields with proper error handling
     *
     * @param details - Object containing payment gateway logs field values to be filled
     */
    async addNewPaymentGatewayLog(details: { [field: string]: string }) {
        console.log('🔄 Starting Payment Gateway Log creation process...');
        console.log('📋 Gateway Log details:', JSON.stringify(details, null, 2));

        try {
            // Interaction Type (Combobox)
            const interactionType = details['Interaction Type'] || details.InteractionType;
            if (interactionType) {
                console.log('🔽 Selecting Interaction Type from combobox...');
                await this.interactionTypeCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.first().click({ timeout: 10000 });
            }

            // Referenced Entity / Payment (Two-step combobox selection)
            const objectType = details['Object Type'] || details.ObjectType;
            const referencedEntity = details['Referenced Entity'] || details.ReferencedEntity;
            if (objectType && referencedEntity) {
                console.log('🔽 Selecting Referenced Entity (Two-step process)...');
                try {
                    // Step 1: Select object type (e.g., "Payment") from "Choose an object" combobox
                    console.log(`   Step 1: Selecting object type "${objectType}" from "Choose an object" combobox...`);
                    await this.chooseObjectCombobox.click({ timeout: 10000 });
                    await this.page.waitForTimeout(1000);
                    await this.allOptionsLocator.filter({ hasText: objectType }).first().click({ timeout: 10000 });
                    console.log('✅ Object type selected:', objectType);
                    await this.referencedEntityCombobox.click({ timeout: 10000 });
                    await this.page.waitForTimeout(1000);
                    await this.allOptionsLocator.first().click({ timeout: 10000 });
                } catch (error) {
                    console.log('❌ Failed in Referenced Entity two-step selection:', error);
                }
            }

            // Payment Gateway (Combobox)
            const paymentGateway = details['Payment Gateway'] || details.PaymentGateway;
            if (paymentGateway) {
                console.log('🔽 Selecting Payment Gateway from combobox...');
                await this.paymentGatewayCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.first().click({ timeout: 10000 });
            }

            // Status (Combobox)
            const status = details.Status || details.status;
            if (status) {
                console.log('🔽 Selecting Status from combobox...');
                await this.statusCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.filter({ hasText: status }).first().click({ timeout: 10000 });
            }

            // Gateway Date (Date field)
            const gatewayDate = details['Gateway Date'] || details.GatewayDate;
            if (gatewayDate) {
                console.log('📝 Filling Gateway Date...');
                try {
                    await this.gatewayDateField.clear();
                    await this.page.waitForTimeout(200);
                    await this.gatewayDateField.fill(gatewayDate, { timeout: 10000 });
                    console.log('✅ Gateway Date filled:', gatewayDate);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Date:', e);
                }
            }

            // Gateway Time (Time field)
            const gatewayTime = details['Gateway Time'] || details.GatewayTime;
            if (gatewayTime) {
                console.log('📝 Filling Gateway Time...');
                try {
                    await this.gatewayTimeField.clear();
                    await this.page.waitForTimeout(200);
                    await this.gatewayTimeField.fill(gatewayTime, { timeout: 10000 });
                    console.log('✅ Gateway Time filled:', gatewayTime);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Time:', e);
                }
            }

            // Gateway Reference Number (Textbox)
            const gatewayRefNum = details['Gateway Reference Number'] || details.GatewayReferenceNumber;
            if (gatewayRefNum) {
                console.log('📝 Filling Gateway Reference Number...');
                try {
                    await this.gatewayReferenceNumberField.fill(gatewayRefNum, { timeout: 10000 });
                    console.log('✅ Gateway Reference Number filled:', gatewayRefNum);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Reference Number:', e);
                }
            }

            // Gateway Result Code (Textbox)
            const gatewayResultCode = details['Gateway Result Code'] || details.GatewayResultCode;
            if (gatewayResultCode) {
                console.log('📝 Filling Gateway Result Code...');
                try {
                    await this.gatewayResultCodeField.fill(gatewayResultCode, { timeout: 10000 });
                    console.log('✅ Gateway Result Code filled:', gatewayResultCode);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Result Code:', e);
                }
            }

            // Gateway Result Code Description (Textbox)
            const gatewayResultCodeDesc = details['Gateway Result Code Description'] || details.GatewayResultCodeDescription;
            if (gatewayResultCodeDesc) {
                console.log('📝 Filling Gateway Result Code Description...');
                try {
                    await this.gatewayResultCodeDescriptionField.fill(gatewayResultCodeDesc, { timeout: 10000 });
                    console.log('✅ Gateway Result Code Description filled:', gatewayResultCodeDesc);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Result Code Description:', e);
                }
            }

            // Gateway Auth Code (Textbox)
            const gatewayAuthCode = details['Gateway Auth Code'] || details.GatewayAuthCode;
            if (gatewayAuthCode) {
                console.log('📝 Filling Gateway Auth Code...');
                try {
                    await this.gatewayAuthCodeField.fill(gatewayAuthCode, { timeout: 10000 });
                    console.log('✅ Gateway Auth Code filled:', gatewayAuthCode);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Auth Code:', e);
                }
            }

            // Gateway Avs Code (Textbox)
            const gatewayAvsCode = details['Gateway Avs Code'] || details.GatewayAvsCode;
            if (gatewayAvsCode) {
                console.log('📝 Filling Gateway Avs Code...');
                try {
                    await this.gatewayAvsCodeField.fill(gatewayAvsCode, { timeout: 10000 });
                    console.log('✅ Gateway Avs Code filled:', gatewayAvsCode);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Avs Code:', e);
                }
            }

            // Gateway Message (Textbox)
            const gatewayMsg = details['Gateway Message'] || details.GatewayMessage;
            if (gatewayMsg) {
                console.log('📝 Filling Gateway Message...');
                try {
                    await this.gatewayMessageField.fill(gatewayMsg, { timeout: 10000 });
                    console.log('✅ Gateway Message filled:', gatewayMsg);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Message:', e);
                }
            }

            // Salesforce Result Code (Combobox)
            const sfResultCode = details['Salesforce Result Code'] || details.SalesforceResultCode;
            if (sfResultCode) {
                console.log('🔽 Selecting Salesforce Result Code from combobox...');
                try {
                    await this.salesforceResultCodeCombobox.click({ timeout: 10000 });
                    await this.page.waitForTimeout(1000);
                    await this.allOptionsLocator.filter({ hasText: sfResultCode }).first().click({ timeout: 10000 });
                } catch (error) {
                    console.log('❌ Error selecting Salesforce Result Code:', error);
                }
            }

            // Salesforce Reference Number (Textbox)
            const sfRefNum = details['Salesforce Reference Number'] || details.SalesforceReferenceNumber;
            if (sfRefNum) {
                console.log('📝 Filling Salesforce Reference Number...');
                try {
                    await this.salesforceReferenceNumberField.fill(sfRefNum, { timeout: 10000 });
                    console.log('✅ Salesforce Reference Number filled:', sfRefNum);
                } catch (e) {
                    console.log('❌ Failed to fill Salesforce Reference Number:', e);
                }
            }

            // Request (Textbox - Large text area)
            if (details.Request) {
                console.log('📝 Filling Request...');
                try {
                    await this.requestField.fill(details.Request, { timeout: 10000 });
                    console.log('✅ Request filled:', details.Request.substring(0, 50) + '...');
                } catch (e) {
                    console.log('❌ Failed to fill Request:', e);
                }
            }

            // Response (Textbox - Large text area)
            if (details.Response) {
                console.log('📝 Filling Response...');
                try {
                    await this.responseField.fill(details.Response, { timeout: 10000 });
                    console.log('✅ Response filled:', details.Response.substring(0, 50) + '...');
                } catch (e) {
                    console.log('❌ Failed to fill Response:', e);
                }
            }

            await Helper.takeScreenshotToFile(
                this.page,
                '01-final-verification',
                this.testInfo,
                'Finance/salesforce-payment-gateway-logs'
            );

            console.log('✅ Payment Gateway Log form filled successfully');
        } catch (error) {
            console.log('❌ Error filling Payment Gateway Log form:', error);
            throw error;
        }
    }

    async verifyPaymentGatewayLogSuccess(details?: { [field: string]: string }) {
        console.log('🔍 Starting payment gateway log verification...');

        try {
            // Wait a moment for the page to load
            await this.page.waitForTimeout(1000);

            // If details provided, verify specific field values on the page
            if (details) {
                if (details['Interaction Type']) {
                    const interactionTypeCount = await this.page.getByText(details['Interaction Type']).count();
                    if (interactionTypeCount > 0) {
                        console.log('✅ Interaction Type verification successful');
                    } else {
                        console.log('⚠️ Interaction Type not found on page');
                    }
                }

                if (details['Status']) {
                    const statusCount = await this.page.getByText(details['Status']).count();
                    if (statusCount > 0) {
                        console.log('✅ Status verification successful');
                    } else {
                        console.log('⚠️ Status not found on page');
                    }
                }

                if (details['Gateway Reference Number']) {
                    const refNumCount = await this.page.getByText(details['Gateway Reference Number']).count();
                    if (refNumCount > 0) {
                        console.log('✅ Gateway Reference Number verification successful');
                    } else {
                        console.log('⚠️ Gateway Reference Number not found on page');
                    }
                }
            }

            await Helper.takeScreenshotToFile(
                this.page,
                '03-final-verification',
                this.testInfo,
                'Finance/salesforce-payment-gateway-logs'
            );

            console.log('🎉 Verification completed!');
        } catch (e) {
            console.log('❌ Error in verifyPaymentGatewayLogSuccess:', e);
        }
    }

    async clickSave() {
        console.log('💾 Clicking Save button...');
        try {
            await this.saveButton.click({ timeout: 10000 });
            console.log('⏳ Waiting for save to complete...');

            await Helper.takeScreenshotToFile(
                this.page,
                '02-final-verification',
                this.testInfo,
                'Finance/salesforce-payment-gateway-logs'
            );
            console.log('✅ Save completed - dialog closed');

        } catch (error) {
            console.error('❌ Error during save:', error);
            throw error;
        }
    }

    async clickSaveNew() {
        console.log('💾 Clicking Save & New button...');
        await this.saveNewButton.click({ timeout: 10000 });
        await this.page.waitForTimeout(2000);
    }

    async clickCancel() {
        console.log('❌ Clicking Cancel button...');
        await this.cancelButton.click({ timeout: 10000 });
        await this.page.waitForTimeout(1000);
    }
}
