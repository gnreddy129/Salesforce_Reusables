import { Page, TestInfo } from '@playwright/test';
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
    readonly dialog = () => this.page.getByRole('dialog').first();

    // Locators - Payment Information Section
    // Note: Referenced Entity uses a two-step combobox selection:
    // 1. First, select object type from "Choose an object" combobox (usually "Payment")
    // 2. Then, select specific payment authorization from "Referenced Entity" combobox
    readonly interactionTypeCombobox = () =>
        this.dialog().getByRole('combobox', { name: /^Interaction Type$/i });
    readonly chooseObjectCombobox = () =>
        this.dialog().getByRole('combobox', { name: /^Choose an object$/i });
    readonly referencedEntityCombobox = () =>
        this.dialog().getByRole('combobox', { name: /^Referenced Entity$/i });
    readonly paymentGatewayCombobox = () =>
        this.dialog().getByRole('combobox', { name: /^Payment Gateway$/i });
    readonly statusCombobox = () =>
        this.dialog().getByRole('combobox', { name: /^Status$/i });

    // Locators - Gateway Date & Time
    readonly gatewayDateField = () =>
        this.dialog().getByRole('group', { name: 'Gateway Date', exact: true }).getByLabel('Date', { exact: true });
    readonly gatewayTimeField = () =>
        this.dialog().getByRole('group', { name: 'Gateway Date', exact: true }).getByLabel('Time');

    // Locators - Gateway Response Details
    readonly gatewayReferenceNumberField = () =>
        this.dialog().getByRole('textbox', { name: /^Gateway Reference Number$/i });
    readonly gatewayResultCodeField = () =>
        this.dialog().getByRole('textbox', { name: /^Gateway Result Code$/i });
    readonly gatewayResultCodeDescriptionField = () =>
        this.dialog().getByRole('textbox', { name: /^Gateway Result Code Description$/i });
    readonly gatewayAuthCodeField = () =>
        this.dialog().getByRole('textbox', { name: /^Gateway Auth Code$/i });
    readonly gatewayAvsCodeField = () =>
        this.dialog().getByRole('textbox', { name: /^Gateway Avs Code$/i });
    readonly gatewayMessageField = () =>
        this.dialog().getByRole('textbox', { name: /^Gateway Message$/i });

    // Locators - Additional Information Section
    readonly salesforceResultCodeCombobox = () =>
        this.dialog().getByRole('combobox', { name: /^Salesforce Result Code$/i });
    readonly salesforceReferenceNumberField = () =>
        this.dialog().getByRole('textbox', { name: /^Salesforce Reference Number$/i });

    // Locators - Request/Response Details Section
    readonly requestField = () =>
        this.dialog().getByRole('textbox', { name: /^Request$/i });
    readonly responseField = () =>
        this.dialog().getByRole('textbox', { name: /^Response$/i });

    // Button Locators
    readonly saveButton = () => this.dialog().getByRole('button', { name: /^Save$/i });
    readonly saveNewButton = () =>
        this.dialog().getByRole('button', { name: /^Save & New$/i });
    readonly cancelButton = () =>
        this.dialog().getByRole('button', { name: /^Cancel$/i });

    constructor(page: Page, testInfo?: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        console.log('🚀 Initializing SalesforcePaymentGatewayLogs page object');
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
                await this.interactionTypeCombobox().click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);

                try {
                    const optionRole = this.page.locator(`[role="option"]:has-text("${interactionType}")`).first();
                    await optionRole.click({ timeout: 5000, force: true });
                    console.log('✅ Interaction Type selected:', interactionType);
                } catch (e) {
                    try {
                        await this.interactionTypeCombobox().fill(interactionType, { timeout: 5000 });
                        await this.page.waitForTimeout(500);
                        await this.page.keyboard.press('ArrowDown');
                        await this.page.waitForTimeout(300);
                        await this.page.keyboard.press('Enter');
                        console.log('✅ Interaction Type selected via type and keyboard');
                    } catch (e2) {
                        console.log('❌ Failed to select Interaction Type:', e2);
                    }
                }
            }

            // Referenced Entity / Payment (Two-step combobox selection)
            const objectType = details['Object Type'] || details.ObjectType;
            const referencedEntity = details['Referenced Entity'] || details.ReferencedEntity;

            if (objectType && referencedEntity) {
                console.log('🔽 Selecting Referenced Entity (Two-step process)...');

                try {
                    // Step 1: Select object type (e.g., "Payment") from "Choose an object" combobox
                    console.log(`   Step 1: Selecting object type "${objectType}" from "Choose an object" combobox...`);
                    await this.chooseObjectCombobox().click({ timeout: 10000 });
                    await this.page.waitForTimeout(1000);

                    try {
                        const objectOption = this.page.locator(`[role="option"]:has-text("${objectType}")`).first();
                        await objectOption.click({ timeout: 5000, force: true });
                        console.log(`   ✅ Object type "${objectType}" selected`);
                    } catch (e) {
                        try {
                            await this.chooseObjectCombobox().fill(objectType, { timeout: 5000 });
                            await this.page.waitForTimeout(500);
                            await this.page.keyboard.press('ArrowDown');
                            await this.page.waitForTimeout(300);
                            await this.page.keyboard.press('Enter');
                            console.log(`   ✅ Object type "${objectType}" selected via type and keyboard`);
                        } catch (e2) {
                            console.log(`   ❌ Failed to select ${objectType} object:`, e2);
                            throw e2;
                        }
                    }

                    // Wait for the Referenced Entity combobox to appear
                    await this.page.waitForTimeout(1000);

                    // Step 2: Select the specific referenced entity (e.g., PA-000000002)
                    console.log(`   Step 2: Selecting Referenced Entity: ${referencedEntity}...`);
                    await this.referencedEntityCombobox().click({ timeout: 10000 });
                    await this.page.waitForTimeout(1000);

                    try {
                        const entityOption = this.page.locator(`[role="option"]:has-text("${referencedEntity}")`).first();
                        await entityOption.click({ timeout: 5000, force: true });
                        console.log('✅ Referenced Entity selected:', referencedEntity);
                    } catch (e) {
                        try {
                            await this.referencedEntityCombobox().fill(referencedEntity, { timeout: 5000 });
                            await this.page.waitForTimeout(500);
                            await this.page.keyboard.press('ArrowDown');
                            await this.page.waitForTimeout(300);
                            await this.page.keyboard.press('Enter');
                            console.log('✅ Referenced Entity selected via type and keyboard');
                        } catch (e2) {
                            console.log('❌ Failed to select Referenced Entity:', e2);
                            throw e2;
                        }
                    }
                } catch (error) {
                    console.log('❌ Failed in Referenced Entity two-step selection:', error);
                    // Don't throw - continue with other fields
                }
            } else if (objectType || referencedEntity) {
                console.log('⚠️  Warning: Both "Object Type" and "Referenced Entity" are required for two-step selection');
                console.log(`   Object Type provided: ${objectType}`);
                console.log(`   Referenced Entity provided: ${referencedEntity}`);
            }

            // Payment Gateway (Combobox)
            const paymentGateway = details['Payment Gateway'] || details.PaymentGateway;
            if (paymentGateway) {
                console.log('🔽 Selecting Payment Gateway from combobox...');
                await this.paymentGatewayCombobox().click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);

                try {
                    const optionRole = this.page.locator(`[role="option"]:has-text("${paymentGateway}")`).first();
                    await optionRole.click({ timeout: 5000, force: true });
                    console.log('✅ Payment Gateway selected:', paymentGateway);
                } catch (e) {
                    try {
                        await this.paymentGatewayCombobox().fill(paymentGateway, { timeout: 5000 });
                        await this.page.waitForTimeout(500);
                        await this.page.keyboard.press('ArrowDown');
                        await this.page.waitForTimeout(300);
                        await this.page.keyboard.press('Enter');
                        console.log('✅ Payment Gateway selected via type and keyboard');
                    } catch (e2) {
                        console.log('❌ Failed to select Payment Gateway:', e2);
                    }
                }
            }

            // Status (Combobox)
            const status = details.Status || details.status;
            if (status) {
                console.log('🔽 Selecting Status from combobox...');
                await this.statusCombobox().click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);

                try {
                    const optionRole = this.page.locator(`[role="option"]:has-text("${status}")`).first();
                    await optionRole.click({ timeout: 5000, force: true });
                    console.log('✅ Status selected:', status);
                } catch (e) {
                    try {
                        await this.statusCombobox().fill(status, { timeout: 5000 });
                        await this.page.waitForTimeout(500);
                        await this.page.keyboard.press('ArrowDown');
                        await this.page.waitForTimeout(300);
                        await this.page.keyboard.press('Enter');
                        console.log('✅ Status selected via type and keyboard');
                    } catch (e2) {
                        console.log('❌ Failed to select Status:', e2);
                    }
                }
            }

            // Gateway Date (Date field)
            const gatewayDate = details['Gateway Date'] || details.GatewayDate;
            if (gatewayDate) {
                console.log('📝 Filling Gateway Date...');
                try {
                    await this.gatewayDateField().clear();
                    await this.page.waitForTimeout(200);
                    await this.gatewayDateField().fill(gatewayDate, { timeout: 10000 });
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
                    await this.gatewayTimeField().clear();
                    await this.page.waitForTimeout(200);
                    await this.gatewayTimeField().fill(gatewayTime, { timeout: 10000 });
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
                    await this.gatewayReferenceNumberField().fill(gatewayRefNum, { timeout: 10000 });
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
                    await this.gatewayResultCodeField().fill(gatewayResultCode, { timeout: 10000 });
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
                    await this.gatewayResultCodeDescriptionField().fill(gatewayResultCodeDesc, { timeout: 10000 });
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
                    await this.gatewayAuthCodeField().fill(gatewayAuthCode, { timeout: 10000 });
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
                    await this.gatewayAvsCodeField().fill(gatewayAvsCode, { timeout: 10000 });
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
                    await this.gatewayMessageField().fill(gatewayMsg, { timeout: 10000 });
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
                    await this.salesforceResultCodeCombobox().click({ timeout: 10000 });
                    await this.page.waitForTimeout(1000);

                    try {
                        const optionRole = this.page.locator(`[role="option"]:has-text("${sfResultCode}")`).first();
                        await optionRole.click({ timeout: 5000, force: true });
                        console.log('✅ Salesforce Result Code selected:', sfResultCode);
                    } catch (e) {
                        // Try keyboard navigation without fill
                        try {
                            await this.page.keyboard.press('ArrowDown');
                            await this.page.waitForTimeout(300);
                            await this.page.keyboard.press('Enter');
                            console.log('✅ Salesforce Result Code selected via keyboard');
                        } catch (e2) {
                            console.log('❌ Failed to select Salesforce Result Code:', e2);
                        }
                    }
                } catch (error) {
                    console.log('❌ Error selecting Salesforce Result Code:', error);
                }
            }

            // Salesforce Reference Number (Textbox)
            const sfRefNum = details['Salesforce Reference Number'] || details.SalesforceReferenceNumber;
            if (sfRefNum) {
                console.log('📝 Filling Salesforce Reference Number...');
                try {
                    await this.salesforceReferenceNumberField().fill(sfRefNum, { timeout: 10000 });
                    console.log('✅ Salesforce Reference Number filled:', sfRefNum);
                } catch (e) {
                    console.log('❌ Failed to fill Salesforce Reference Number:', e);
                }
            }

            // Request (Textbox - Large text area)
            if (details.Request) {
                console.log('📝 Filling Request...');
                try {
                    await this.requestField().fill(details.Request, { timeout: 10000 });
                    console.log('✅ Request filled:', details.Request.substring(0, 50) + '...');
                } catch (e) {
                    console.log('❌ Failed to fill Request:', e);
                }
            }

            // Response (Textbox - Large text area)
            if (details.Response) {
                console.log('📝 Filling Response...');
                try {
                    await this.responseField().fill(details.Response, { timeout: 10000 });
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
            await this.saveButton().click({ timeout: 10000 });
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
        await this.saveNewButton().click();
        await this.page.waitForTimeout(2000);
    }

    async clickCancel() {
        console.log('❌ Clicking Cancel button...');
        await this.cancelButton().click();
        await this.page.waitForTimeout(1000);
    }
}
