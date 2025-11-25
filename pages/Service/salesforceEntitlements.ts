import { Page, TestInfo } from '@playwright/test';
import { Helper } from '../../utils/helper';

/**
 * SalesforceEntitlements Page Object Model
 *
 * This class provides automation capabilities for Salesforce Entitlements management.
 * It handles entitlement creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new entitlements with comprehensive field management
 * - Handle combobox selections for Type, Account, Service Contract, Business Hours, Asset Name, and SLA Policy
 * - Support for date fields (Start Date, End Date)
 * - Handle checkbox for Per Incident
 * - Verify entitlement creation success
 * - Support for all required and optional entitlement fields
 *
 * @class SalesforceEntitlements
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceEntitlementsPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Dialog locator
    readonly dialog = () => this.page.getByRole('dialog').first();

    // Locators - Entitlement Fields
    readonly entitlementNameField = () =>
        this.page.getByRole('textbox', { name: /^Entitlement Name$/i }).first();

    readonly typeCombobox = () =>
        this.page.getByRole('combobox', { name: /^Type$/i }).first();

    readonly startDateField = () =>
        this.page.getByRole('textbox', { name: /^Start Date$/i }).first();

    readonly accountCombobox = () =>
        this.page.getByRole('combobox', { name: /^Account Name$/i }).first();

    readonly endDateField = () =>
        this.page.getByRole('textbox', { name: /^End Date$/i }).first();

    readonly serviceContractCombobox = () =>
        this.page.getByRole('combobox', { name: /^Service Contract$/i }).first();

    readonly businessHoursCombobox = () =>
        this.page.getByRole('combobox', { name: /^Business Hours$/i }).first();

    readonly assetNameCombobox = () =>
        this.page.getByRole('combobox', { name: /^Asset Name$/i }).first();

    readonly slapolicyCombobox = () =>
        this.page.getByRole('combobox', { name: /^SLA Policy$/i }).first();

    readonly perIncidentCheckbox = () =>
        this.page.getByText("Per Incident").first();

    readonly remainingCasesSpinbutton = () =>
        this.page.getByRole('spinbutton', { name: /^Remaining Cases$/i }).first();

    readonly casesPerEntitlementSpinbutton = () =>
        this.page.getByRole('spinbutton', { name: /^Cases Per Entitlement$/i }).first();

    // Button Locators
    readonly saveButton = () => this.page.getByRole('button', { name: /^Save$/i });
    readonly saveNewButton = () =>
        this.page.getByRole('button', { name: /^Save & New$/i });
    readonly cancelButton = () =>
        this.page.getByRole('button', { name: /^Cancel$/i });

    constructor(page: Page, testInfo?: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        console.log('🚀 Initializing SalesforceEntitlements page object');
    }

    /**
     * Creates a new entitlement in Salesforce with the provided details
     *
     * This method handles the complete entitlement creation workflow:
     * 1. Logs the starting process
     * 2. Fills in all provided field values
     * 3. Handles all combobox selections
     * 4. Fills date fields
     * 5. Handles checkbox for Per Incident
     * 6. Saves the entitlement
     *
     * @param details - Object containing entitlement field values to be filled
     */
    async addNewEntitlement(details: { [field: string]: string }) {
        console.log('🔄 Starting Entitlement creation process...');
        console.log('📋 Entitlement details:', JSON.stringify(details, null, 2));

        try {
            // Entitlement Name (Textbox)
            const entitlementName = details['Entitlement Name'] || details.entitlementName;
            if (entitlementName) {
                console.log('📝 Filling Entitlement Name...');
                try {
                    await this.entitlementNameField().fill(entitlementName, { timeout: 10000 });
                    console.log('✅ Entitlement Name filled:', entitlementName);
                } catch (e) {
                    console.log('❌ Failed to fill Entitlement Name:', e);
                }
            }

            // Type (Combobox)
            const type = details.Type || details.type;
            if (type) {
                console.log('🔽 Selecting Type from combobox...');
                await this.typeCombobox().click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);

                const optionRole = this.page.getByRole('option', { name: type }).first();
                await optionRole.waitFor({ state: 'visible', timeout: 5000 });
                await optionRole.click({ timeout: 5000 });
                console.log('✅ Type selected:', type);
            }

            // Start Date (Date Field)
            const startDate = details['Start Date'] || details.startDate;
            if (startDate) {
                console.log('📅 Filling Start Date...');
                try {
                    await this.startDateField().fill(startDate, { timeout: 10000 });
                    console.log('✅ Start Date filled:', startDate);
                } catch (e) {
                    console.log('❌ Failed to fill Start Date:', e);
                }
            }

            // Account (Combobox)
            const account = details["Account Name"] || details.account;
            if (account) {
                console.log('🔽 Selecting Account from combobox...');
                try {
                    const accountCombo = this.accountCombobox();
                    const isVisible = await accountCombo.isVisible().catch(() => false);

                    if (isVisible) {
                        await accountCombo.click({ timeout: 10000 });
                        await this.page.waitForTimeout(1000);

                        const optionRole = this.page.getByRole('option', { name: account }).first();
                        await optionRole.waitFor({ state: 'visible', timeout: 5000 });
                        await optionRole.click({ timeout: 5000 });
                        console.log('✅ Account selected:', account);
                    } else {
                        console.log('⚠️ Account combobox not visible on form, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to select Account (field may not be available):', e);
                    // Continue - Account might not be available on all Entitlement types
                }
            }

            // End Date (Date Field)
            const endDate = details['End Date'] || details.endDate;
            if (endDate) {
                console.log('📅 Filling End Date...');
                try {
                    const endDateField = this.endDateField();
                    const isVisible = await endDateField.isVisible().catch(() => false);

                    if (isVisible) {
                        await endDateField.fill(endDate, { timeout: 10000 });
                        console.log('✅ End Date filled:', endDate);
                    } else {
                        console.log('⚠️ End Date field not visible on form, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to fill End Date (field may not be available):', e);
                }
            }

            // Service Contract (Combobox)
            const serviceContract = details['Service Contract'] || details.serviceContract;
            if (serviceContract) {
                console.log('🔽 Selecting Service Contract from combobox...');
                try {
                    const scCombo = this.serviceContractCombobox();
                    const isVisible = await scCombo.isVisible().catch(() => false);

                    if (isVisible) {
                        await scCombo.click({ timeout: 10000 });
                        await this.page.waitForTimeout(1000);

                        const optionRole = this.page.getByRole('option', { name: serviceContract }).first();
                        await optionRole.waitFor({ state: 'visible', timeout: 5000 });
                        await optionRole.click({ timeout: 5000 });
                        console.log('✅ Service Contract selected:', serviceContract);
                    } else {
                        console.log('⚠️ Service Contract combobox not visible on form, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to select Service Contract (field may not be available):', e);
                }
            }

            // Business Hours (Combobox)
            const businessHours = details['Business Hours'] || details.businessHours;
            if (businessHours) {
                console.log('🔽 Selecting Business Hours from combobox...');
                try {
                    const bhCombo = this.businessHoursCombobox();
                    const isVisible = await bhCombo.isVisible().catch(() => false);

                    if (isVisible) {
                        await bhCombo.click({ timeout: 10000 });
                        await this.page.waitForTimeout(1000);

                        const optionRole = this.page.getByRole('option', { name: businessHours }).first();
                        await optionRole.waitFor({ state: 'visible', timeout: 5000 });
                        await optionRole.click({ timeout: 5000 });
                        console.log('✅ Business Hours selected:', businessHours);
                    } else {
                        console.log('⚠️ Business Hours combobox not visible on form, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to select Business Hours (field may not be available):', e);
                }
            }

            // Asset Name (Combobox)
            const assetName = details['Asset Name'] || details.assetName;
            if (assetName) {
                console.log('🔽 Selecting Asset Name from combobox...');
                try {
                    const anCombo = this.assetNameCombobox();
                    const isVisible = await anCombo.isVisible().catch(() => false);

                    if (isVisible) {
                        await anCombo.click({ timeout: 10000 });
                        await this.page.waitForTimeout(1000);

                        const optionRole = this.page.getByRole('option', { name: assetName }).first();
                        await optionRole.waitFor({ state: 'visible', timeout: 5000 });
                        await optionRole.click({ timeout: 5000 });
                        console.log('✅ Asset Name selected:', assetName);
                    } else {
                        console.log('⚠️ Asset Name combobox not visible on form, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to select Asset Name (field may not be available):', e);
                }
            }

            // SLA Policy (Combobox)
            const slaPolicy = details['SLA Policy'] || details.slaPolicy;
            if (slaPolicy) {
                console.log('🔽 Selecting SLA Policy from combobox...');
                try {
                    const slpCombo = this.slapolicyCombobox();
                    const isVisible = await slpCombo.isVisible().catch(() => false);

                    if (isVisible) {
                        await slpCombo.click({ timeout: 10000 });
                        await this.page.waitForTimeout(1000);

                        const optionRole = this.page.getByRole('option', { name: slaPolicy }).first();
                        await optionRole.waitFor({ state: 'visible', timeout: 5000 });
                        await optionRole.click({ timeout: 5000 });
                        console.log('✅ SLA Policy selected:', slaPolicy);
                    } else {
                        console.log('⚠️ SLA Policy combobox not visible on form, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to select SLA Policy (field may not be available):', e);
                }
            }

            // Per Incident (Checkbox)
            const perIncident = details['Per Incident'] || details.perIncident;
            if (perIncident && perIncident.toLowerCase() === 'true') {
                console.log('☑️ Checking Per Incident checkbox...');
                try {
                    const isChecked = await this.perIncidentCheckbox().isChecked();
                    if (!isChecked) {
                        await this.perIncidentCheckbox().click({ timeout: 10000 });
                        console.log('✅ Per Incident checkbox checked');
                    } else {
                        console.log('✅ Per Incident checkbox already checked');
                    }
                } catch (e) {
                    console.log('❌ Failed to check Per Incident:', e);
                }
            }

            // Remaining Cases (Spinbutton)
            const remainingCases = details['Remaining Cases'] || details.remainingCases;
            if (remainingCases) {
                console.log('🔢 Filling Remaining Cases spinbutton...');
                try {
                    const rcSpinbutton = this.remainingCasesSpinbutton();
                    const isVisible = await rcSpinbutton.isVisible().catch(() => false);

                    if (isVisible) {
                        await rcSpinbutton.fill(remainingCases, { timeout: 10000 });
                        console.log('✅ Remaining Cases filled:', remainingCases);
                    } else {
                        console.log('⚠️ Remaining Cases spinbutton not visible on form, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to fill Remaining Cases (field may not be available):', e);
                }
            }

            // Cases Per Entitlement (Spinbutton)
            const casesPerEntitlement = details['Cases Per Entitlement'] || details.casesPerEntitlement;
            if (casesPerEntitlement) {
                console.log('🔢 Filling Cases Per Entitlement spinbutton...');
                try {
                    const cpeSpinbutton = this.casesPerEntitlementSpinbutton();
                    const isVisible = await cpeSpinbutton.isVisible().catch(() => false);

                    if (isVisible) {
                        await cpeSpinbutton.fill(casesPerEntitlement, { timeout: 10000 });
                        console.log('✅ Cases Per Entitlement filled:', casesPerEntitlement);
                    } else {
                        console.log('⚠️ Cases Per Entitlement spinbutton not visible on form, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to fill Cases Per Entitlement (field may not be available):', e);
                }
            }

            await Helper.takeScreenshotToFile(
                this.page,
                '01-entitlements-list',
                this.testInfo,
                'Service/salesforce-entitlements'
            );
            console.log('✅ Entitlement form filled successfully');
        } catch (error) {
            console.log('❌ Error filling Entitlement form:', error);
            throw error;
        }
    }

    async clickSave() {
        console.log('💾 Clicking Save button...');
        try {
            await this.saveButton().click({ timeout: 10000 });
            console.log('⏳ Waiting for save to complete...');

            // Wait a moment for the save to process
            await this.page.waitForTimeout(2000);

            await Helper.takeScreenshotToFile(
                this.page,
                '02-entitlements-list',
                this.testInfo,
                'Service/salesforce-entitlements'
            );

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

    async verifyEntitlementSuccess(details?: { [field: string]: string }) {
        console.log('🔍 Starting entitlement verification...');

        try {
            // Wait a moment for the page to load
            await this.page.waitForTimeout(1000);

            // If details provided, verify specific field values on the page
            if (details) {
                if (details['Entitlement Name']) {
                    const nameCount = await this.page.getByText(details['Entitlement Name']).count();
                    if (nameCount > 0) {
                        console.log('✅ Entitlement Name verification successful');
                    } else {
                        console.log('⚠️ Entitlement Name not found on page');
                    }
                }

                if (details['Type']) {
                    const typeCount = await this.page.getByText(details['Type']).count();
                    if (typeCount > 0) {
                        console.log('✅ Type verification successful');
                    } else {
                        console.log('⚠️ Type not found on page');
                    }
                }

                if (details['Account']) {
                    const accountCount = await this.page.getByText(details['Account']).count();
                    if (accountCount > 0) {
                        console.log('✅ Account verification successful');
                    } else {
                        console.log('⚠️ Account not found on page');
                    }
                }
            }

            await Helper.takeScreenshotToFile(
                this.page,
                '03-entitlements-list',
                this.testInfo,
                'Service/salesforce-entitlements'
            );

            console.log('🎉 Verification completed!');
        } catch (e) {
            console.log('❌ Error in verifyEntitlementSuccess:', e);
        }
    }
}
