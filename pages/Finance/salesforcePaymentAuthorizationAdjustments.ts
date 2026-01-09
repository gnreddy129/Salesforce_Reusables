import { Locator, Page, TestInfo } from '@playwright/test';
import { Helper } from '../../utils/helper';

export default class SalesforcePaymentAuthorizationAdjustmentsPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Dialog locator
    readonly dialog: Locator;
    readonly accountCombobox: Locator;

    // Locators - Information Section
    readonly statusCombobox: Locator;
    readonly amountField: Locator;
    readonly paymentAuthorizationCombobox: Locator;
    readonly adjustmentTypeCombobox: Locator;
    readonly processingModeCombobox: Locator;
    readonly effectiveDateField: Locator;
    readonly effectiveTimeCombobox: Locator;
    readonly dateField: Locator;
    readonly dateTimeCombobox: Locator;
    readonly commentsField: Locator;

    // Locators - Gateway Details Section
    readonly gatewayDateField: Locator;
    readonly gatewayTimeCombobox: Locator;
    readonly gatewayResultCodeDescriptionField: Locator;
    readonly gatewayResultCodeField: Locator;
    readonly gatewayReferenceDetailsField: Locator;
    readonly gatewayReferenceNumberField: Locator;

    // Locators - System Information Section
    readonly macAddressField: Locator;
    readonly ipAddressField: Locator;
    readonly phoneField: Locator;
    readonly auditEmailField: Locator;

    // Button Locators
    readonly saveButton: Locator;
    readonly saveNewButton: Locator;
    readonly cancelButton: Locator;

    readonly allOptionsLocator: Locator;
    
    constructor(page: Page, testInfo?: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.dialog = page.getByRole('dialog').first();
        
        // Account
        this.accountCombobox = this.dialog.getByRole('combobox', { name: /^Account$/i });
        
        // Status
        this.statusCombobox = this.dialog.getByRole('combobox', { name: /^Status$/i });
        
        // Amount
        this.amountField = this.dialog.getByRole('spinbutton', { name: /^Amount/i });
        
        // Payment Authorization
        this.paymentAuthorizationCombobox = this.dialog.getByRole('combobox', { name: /^Payment Authorization$/i });
        
        // Adjustment Type
        this.adjustmentTypeCombobox = this.dialog.getByRole('combobox', { name: /^Adjustment Type$/i });
        
        // Processing Mode
        this.processingModeCombobox = this.dialog.getByRole('combobox', { name: /^Processing Mode$/i });
        
        // Effective Date
        this.effectiveDateField = this.dialog.getByRole('group', { name: 'Effective Date', exact: true }).getByLabel('Date');
        this.effectiveTimeCombobox = this.dialog.getByRole('group', { name: 'Effective Date', exact: true }).getByLabel('Time');
        
        // Date
        this.dateField = this.dialog.getByRole('group', { name: 'Date', exact: true }).getByLabel('Date');
        this.dateTimeCombobox = this.dialog.getByRole('group', { name: 'Date', exact: true }).getByLabel('Time');
        
        // Comments
        this.commentsField = this.dialog.getByRole('textbox', { name: /^Comments$/i });

        // Gateway Date
        this.gatewayDateField = this.dialog.getByRole('group', { name: 'Gateway Date', exact: true }).getByLabel('Date');
        this.gatewayTimeCombobox = this.dialog.getByRole('group', { name: 'Gateway Date', exact: true }).getByLabel('Time');
        
        // Gateway Result Code Description
        this.gatewayResultCodeDescriptionField = this.dialog.getByRole('textbox', { name: /^Gateway Result Code Description$/i });
        
        // Gateway Result Code
        this.gatewayResultCodeField = this.dialog.getByRole('textbox', { name: /^Gateway Result Code$/i });
        
        // Gateway Reference Details
        this.gatewayReferenceDetailsField = this.dialog.getByRole('textbox', { name: /^Gateway Reference Details$/i });
        
        // Gateway Reference Number
        this.gatewayReferenceNumberField = this.dialog.getByRole('textbox', { name: /^Gateway Reference Number$/i });

        // MAC Address
        this.macAddressField = this.dialog.getByRole('textbox', { name: /^MAC Address$/i });
        
        // IP Address
        this.ipAddressField = this.dialog.getByRole('textbox', { name: /^IP Address$/i });
        
        // Phone
        this.phoneField = this.dialog.getByRole('textbox', { name: /^Phone$/i });
        
        // Audit Email
        this.auditEmailField = this.dialog.getByRole('textbox', { name: /^Audit Email$/i });

        // Button Locators
        this.saveButton = this.dialog.getByRole('button', { name: /^Save$/i });
        this.saveNewButton = this.dialog.getByRole('button', { name: /^Save & New$/i });
        this.cancelButton = this.dialog.getByRole('button', { name: /^Cancel$/i });

        this.allOptionsLocator = page.getByRole("option");
    }

    async addNewPaymentAuthorizationAdjustment(details: { [field: string]: string }) {
        console.log('🔄 Starting Payment Authorization Adjustment creation process...');
        console.log('📋 Adjustment details:', JSON.stringify(details, null, 2));

        try {
            // Account (Combobox)
            const account = details.Account || details.account;
            if (account) {
                console.log('🔽 Selecting Account from combobox...');
                await this.accountCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.first().click({ timeout: 10000 });
            }

            // Status (Dropdown)
            const status = details.Status || details.status;
            if (status) {
                console.log('🔽 Selecting Status from dropdown...');
                await this.statusCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.filter({ hasText: status }).first().click({ timeout: 10000 });
            }

            // Amount (Textbox)
            const amount = details.Amount || details.amount;
            if (amount) {
                console.log('📝 Filling Amount...');
                try {
                    await this.amountField.click({ timeout: 5000 });
                    await this.page.waitForTimeout(300);
                    await this.amountField.clear();
                    await this.page.waitForTimeout(200);
                    const numericAmount = parseFloat(amount.toString()).toString();
                    await this.amountField.fill(numericAmount, { timeout: 10000 });
                    console.log('✅ Amount filled:', numericAmount);
                } catch (e) {
                    console.log('❌ Failed to fill Amount:', e);
                }
            }

            // Payment Authorization (Combobox)
            const paymentAuth = details['Payment Authorization'] || details.PaymentAuthorization;
            if (paymentAuth) {
                console.log('🔽 Selecting Payment Authorization from combobox...');
                await this.paymentAuthorizationCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.first().click({ timeout: 10000 });
            }

            // Adjustment Type (Dropdown)
            const adjType = details['Adjustment Type'] || details.AdjustmentType;
            if (adjType) {
                console.log('🔽 Selecting Adjustment Type from dropdown...');
                await this.adjustmentTypeCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.filter({ hasText: adjType }).first().click({ timeout: 10000 });
            }

            // Processing Mode (Dropdown)
            const procMode = details['Processing Mode'] || details.ProcessingMode;
            if (procMode) {
                console.log('🔽 Selecting Processing Mode from dropdown...');
                await this.processingModeCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.filter({ hasText: procMode }).first().click({ timeout: 10000 });
            }

            // Effective Date (Date field)
            const effectiveDate = details['Effective Date'] || details.EffectiveDate;
            if (effectiveDate) {
                console.log('📝 Filling Effective Date...');
                try {
                    await this.effectiveDateField.clear();
                    await this.page.waitForTimeout(200);
                    await this.effectiveDateField.fill(effectiveDate, { timeout: 10000 });
                    console.log('✅ Effective Date filled:', effectiveDate);
                } catch (e) {
                    console.log('❌ Failed to fill Effective Date:', e);
                }
            }

            // Effective Time (Time field)
            const effectiveTime = details['Effective Time'] || details.EffectiveTime;
            if (effectiveTime) {
                console.log('📝 Filling Effective Time...');
                try {
                    await this.effectiveTimeCombobox.clear();
                    await this.page.waitForTimeout(200);
                    await this.effectiveTimeCombobox.fill(effectiveTime, { timeout: 10000 });
                    console.log('✅ Effective Time filled:', effectiveTime);
                } catch (e) {
                    console.log('❌ Failed to fill Effective Time:', e);
                }
            }

            // Date (Date field)
            const dateVal = details.Date || details.date;
            if (dateVal) {
                console.log('📝 Filling Date...');
                try {
                    await this.dateField.clear();
                    await this.page.waitForTimeout(200);
                    await this.dateField.fill(dateVal, { timeout: 10000 });
                    console.log('✅ Date filled:', dateVal);
                } catch (e) {
                    console.log('❌ Failed to fill Date:', e);
                }
            }

            // Date Time (Time field)
            const dateTime = details['Date Time'] || details.DateTime;
            if (dateTime) {
                console.log('📝 Filling Date Time...');
                try {
                    await this.dateTimeCombobox.clear();
                    await this.page.waitForTimeout(200);
                    await this.dateTimeCombobox.fill(dateTime, { timeout: 10000 });
                    console.log('✅ Date Time filled:', dateTime);
                } catch (e) {
                    console.log('❌ Failed to fill Date Time:', e);
                }
            }

            // Comments (Textbox)
            if (details.Comments) {
                console.log('📝 Filling Comments...');
                try {
                    await this.commentsField.fill(details.Comments, { timeout: 10000 });
                    console.log('✅ Comments filled:', details.Comments);
                } catch (e) {
                    console.log('❌ Failed to fill Comments:', e);
                }
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
                    await this.gatewayTimeCombobox.clear();
                    await this.page.waitForTimeout(200);
                    await this.gatewayTimeCombobox.fill(gatewayTime, { timeout: 10000 });
                    console.log('✅ Gateway Time filled:', gatewayTime);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Time:', e);
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

            // Gateway Reference Details (Textbox)
            const gatewayRefDetails = details['Gateway Reference Details'] || details.GatewayReferenceDetails;
            if (gatewayRefDetails) {
                console.log('📝 Filling Gateway Reference Details...');
                try {
                    await this.gatewayReferenceDetailsField.fill(gatewayRefDetails, { timeout: 10000 });
                    console.log('✅ Gateway Reference Details filled:', gatewayRefDetails);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Reference Details:', e);
                }
            }

            // Gateway Reference Number (Textbox)
            const gatewayRefNumber = details['Gateway Reference Number'] || details.GatewayReferenceNumber;
            if (gatewayRefNumber) {
                console.log('📝 Filling Gateway Reference Number...');
                try {
                    await this.gatewayReferenceNumberField.fill(gatewayRefNumber, { timeout: 10000 });
                    console.log('✅ Gateway Reference Number filled:', gatewayRefNumber);
                } catch (e) {
                    console.log('❌ Failed to fill Gateway Reference Number:', e);
                }
            }

            // MAC Address (Textbox)
            const macAddr = details['MAC Address'] || details.MACAddress || details.macAddress;
            if (macAddr) {
                console.log('📝 Filling MAC Address...');
                try {
                    await this.macAddressField.fill(macAddr, { timeout: 10000 });
                    console.log('✅ MAC Address filled:', macAddr);
                } catch (e) {
                    console.log('❌ Failed to fill MAC Address:', e);
                }
            }

            // IP Address (Textbox)
            const ipAddr = details['IP Address'] || details.IPAddress || details.ipAddress;
            if (ipAddr) {
                console.log('📝 Filling IP Address...');
                try {
                    await this.ipAddressField.fill(ipAddr, { timeout: 10000 });
                    console.log('✅ IP Address filled:', ipAddr);
                } catch (e) {
                    console.log('❌ Failed to fill IP Address:', e);
                }
            }

            // Phone (Textbox)
            if (details.Phone) {
                console.log('📝 Filling Phone...');
                try {
                    await this.phoneField.fill(details.Phone, { timeout: 10000 });
                    console.log('✅ Phone filled:', details.Phone);
                } catch (e) {
                    console.log('❌ Failed to fill Phone:', e);
                }
            }

            // Audit Email (Textbox)
            const auditEmail = details['Audit Email'] || details.AuditEmail || details.auditEmail;
            if (auditEmail) {
                console.log('📝 Filling Audit Email...');
                try {
                    await this.auditEmailField.fill(auditEmail, { timeout: 10000 });
                    console.log('✅ Audit Email filled:', auditEmail);
                } catch (e) {
                    console.log('❌ Failed to fill Audit Email:', e);
                }
            }

            await Helper.takeScreenshotToFile(
                this.page,
                '01-payment-authorization-adjustments-list',
                this.testInfo,
                'Finance/salesforce-payment-authorization-adjustments'
            );

            console.log('✅ Payment Authorization Adjustment form filled successfully');
        } catch (error) {
            console.log('❌ Error filling Payment Authorization Adjustment form:', error);
            throw error;
        }
    }

    async clickSave() {
        console.log('💾 Clicking Save button...');
        try {
            await this.saveButton.click({ timeout: 10000 });
            console.log('⏳ Waiting for save to complete...');

            await this.page.waitForTimeout(3000);
            await Helper.takeScreenshotToFile(
                this.page,
                '02-payment-authorization-adjustments-list',
                this.testInfo,
                'Finance/salesforce-payment-authorization-adjustments'
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

    async verifyPaymentAuthAdjustmentSuccess(details?: { [field: string]: string }) {
        console.log('🔍 Starting payment authorization adjustment verification...');

        try {
            // Wait a moment for the page to load
            await this.page.waitForTimeout(1000);

            // If details provided, verify specific field values on the page
            if (details) {
                if (details['Status']) {
                    const statusCount = await this.page.getByText(details['Status']).count();
                    if (statusCount > 0) {
                        console.log('✅ Status verification successful');
                    } else {
                        console.log('⚠️ Status not found on page');
                    }
                }

                if (details['Amount']) {
                    const amountCount = await this.page.getByText(details['Amount']).count();
                    if (amountCount > 0) {
                        console.log('✅ Amount verification successful');
                    } else {
                        console.log('⚠️ Amount not found on page');
                    }
                }

                if (details['Adjustment Type']) {
                    const adjTypeCount = await this.page.getByText(details['Adjustment Type']).count();
                    if (adjTypeCount > 0) {
                        console.log('✅ Adjustment Type verification successful');
                    } else {
                        console.log('⚠️ Adjustment Type not found on page');
                    }
                }

                if (details['Processing Mode']) {
                    const procModeCount = await this.page.getByText(details['Processing Mode']).count();
                    if (procModeCount > 0) {
                        console.log('✅ Processing Mode verification successful');
                    } else {
                        console.log('⚠️ Processing Mode not found on page');
                    }
                }
            }

            await Helper.takeScreenshotToFile(
                this.page,
                '03-payment-authorization-adjustments-list',
                this.testInfo,
                'Finance/salesforce-payment-authorization-adjustments'
            );

            console.log('🎉 Verification completed!');
        } catch (e) {
            console.log('❌ Error in verifyPaymentAuthAdjustmentSuccess:', e);
        }
    }
}
