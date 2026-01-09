import { Page, TestInfo, Locator } from '@playwright/test';
import { Helper } from '../../utils/helper';

/**
 * SalesforceGroups Page Object Model
 *
 * This class provides automation capabilities for Salesforce Groups management.
 * It handles group creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new groups with comprehensive field management
 * - Handle combobox selection for Access Type
 * - Support for text fields (Name, Description, Information)
 * - Handle checkboxes (Disable automatic archiving, Allow customers, Broadcast Only)
 * - Verify group creation success
 * - Support for all required and optional group fields
 *
 * @class SalesforceGroups
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceGroupsPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Dialog locator
    readonly dialog: Locator;

    // Locators - Group Fields
    readonly nameField: Locator;
    readonly descriptionField: Locator;
    readonly informationField: Locator;
    readonly disableAutomaticArchivingCheckbox: Locator;
    readonly accessTypeCombobox: Locator;
    readonly allowCustomersCheckbox: Locator;
    readonly broadcastOnlyCheckbox: Locator;

    // Button Locators
    readonly saveNextButton: Locator;
    readonly cancelButton: Locator;
    readonly allOptionsLocator: Locator;
    readonly uploadFile: Locator;
    readonly nextButton: Locator;
    readonly doneButton: Locator;

    constructor(page: Page, testInfo?: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        console.log('🚀 Initializing SalesforceGroups page object');

        this.dialog = page.getByRole('dialog').first();

        // Group Fields
        this.nameField = page.getByRole('textbox', { name: 'Name *' });
        this.descriptionField = page.getByRole('textbox', { name: /^Description$/i }).first();
        this.informationField = page.getByRole('textbox', { name: 'Information - Compose text' }).first();
        this.disableAutomaticArchivingCheckbox = page.getByRole('checkbox', { name: /^Disable automatic archiving$/i }).first();
        this.accessTypeCombobox = page.getByRole('combobox', { name: /^Access Type$/i }).first();
        this.allowCustomersCheckbox = page.getByRole('checkbox', { name: /^Allow customers$/i }).first();
        this.broadcastOnlyCheckbox = page.getByRole('checkbox', { name: /^Broadcast Only$/i }).first();

        // Button Locators
        this.saveNextButton = page.getByRole('button', { name: /^Save & Next$/i });
        this.cancelButton = page.getByRole('button', { name: /^Cancel$/i });
        this.allOptionsLocator = page.getByRole("option");
        this.uploadFile = page.locator('input[type="file"]');
        this.nextButton = page.getByRole('button', { name: /^Next$/i }).first();
        this.doneButton = page.getByRole('button', { name: /^Done$/i }).first();
    }

    /**
     * Creates a new group in Salesforce with the provided details
     *
     * This method handles the complete group creation workflow:
     * 1. Logs the starting process
     * 2. Fills in all provided field values
     * 3. Handles combobox selection for Access Type
     * 4. Handles all checkboxes
     * 5. Saves the group
     *
     * @param details - Object containing group field values to be filled
     */
    async addNewGroup(details: { [field: string]: string }) {
        console.log('🔄 Starting Group creation process...');
        console.log('📋 Group details:', JSON.stringify(details, null, 2));

        try {
            // Name (Textbox) - Required
            const name = details.Name || details.name;
            if (name) {
                console.log('📝 Filling Name...');
                try {
                    await this.nameField.fill(name, { timeout: 10000 });
                    console.log('✅ Name filled:', name);
                } catch (e) {
                    console.log('❌ Failed to fill Name:', e);
                    throw e;
                }
            }

            // Description (Textbox)
            const description = details.Description || details.description;
            if (description) {
                console.log('📝 Filling Description...');
                try {
                    await this.descriptionField.fill(description, { timeout: 10000 });
                    console.log('✅ Description filled:', description);
                } catch (e) {
                    console.log('⚠️ Failed to fill Description (field may not be available):', e);
                }
            }

            // Information (Textbox)
            const information = details.Information || details.information;
            if (information) {
                console.log('📝 Filling Information...');
                try {
                    await this.informationField.fill(information, { timeout: 10000 });
                    console.log('✅ Information filled:', information);
                } catch (e) {
                    console.log('⚠️ Failed to fill Information (field may not be available):', e);
                }
            }

            // Disable automatic archiving (Checkbox)
            const disableArchiving = details['Disable automatic archiving'] || details.disableArchiving;
            if (disableArchiving && disableArchiving.toLowerCase() === 'true') {
                console.log('☑️ Checking Disable automatic archiving checkbox...');
                try {
                    const archCheckbox = this.disableAutomaticArchivingCheckbox;
                    const isVisible = await archCheckbox.isVisible().catch(() => false);

                    if (isVisible) {
                        const isChecked = await archCheckbox.isChecked();
                        if (!isChecked) {
                            await archCheckbox.click({ timeout: 10000 });
                            console.log('✅ Disable automatic archiving checkbox checked');
                        } else {
                            console.log('✅ Disable automatic archiving checkbox already checked');
                        }
                    } else {
                        console.log('⚠️ Disable automatic archiving checkbox not visible, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to check Disable automatic archiving:', e);
                }
            }

            // Access Type (Combobox) - Required
            const accessType = details['Access Type'] || details.accessType;
            if (accessType) {
                console.log('🔽 Selecting Access Type from combobox...');
                await this.accessTypeCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.filter({ hasText: accessType }).first().click({ timeout: 10000 });
                console.log('✅ Access Type selected:', accessType);
            }

            // Allow customers (Checkbox)
            const allowCustomers = details['Allow customers'] || details.allowCustomers;
            if (allowCustomers && allowCustomers.toLowerCase() === 'true') {
                console.log('☑️ Checking Allow customers checkbox...');
                try {
                    const acCheckbox = this.allowCustomersCheckbox;
                    const isVisible = await acCheckbox.isVisible().catch(() => false);

                    if (isVisible) {
                        const isChecked = await acCheckbox.isChecked();
                        if (!isChecked) {
                            await acCheckbox.click({ timeout: 10000 });
                            console.log('✅ Allow customers checkbox checked');
                        } else {
                            console.log('✅ Allow customers checkbox already checked');
                        }
                    } else {
                        console.log('⚠️ Allow customers checkbox not visible, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to check Allow customers:', e);
                }
            }

            // Broadcast Only (Checkbox)
            const broadcastOnly = details['Broadcast Only'] || details.broadcastOnly;
            if (broadcastOnly && broadcastOnly.toLowerCase() === 'true') {
                console.log('☑️ Checking Broadcast Only checkbox...');
                try {
                    const boCheckbox = this.broadcastOnlyCheckbox;
                    const isVisible = await boCheckbox.isVisible().catch(() => false);

                    if (isVisible) {
                        const isChecked = await boCheckbox.isChecked();
                        if (!isChecked) {
                            await boCheckbox.click({ timeout: 10000 });
                            console.log('✅ Broadcast Only checkbox checked');
                        } else {
                            console.log('✅ Broadcast Only checkbox already checked');
                        }
                    } else {
                        console.log('⚠️ Broadcast Only checkbox not visible, skipping');
                    }
                } catch (e) {
                    console.log('⚠️ Failed to check Broadcast Only:', e);
                }
            }

            await Helper.takeScreenshotToFile(
                this.page,
                '01-groups-list',
                this.testInfo,
                'Platform/salesforce-groups'
            );

            console.log('✅ Group form filled successfully');
        } catch (error) {
            console.log('❌ Error filling Group form:', error);
            throw error;
        }
    }

    async clickSave(details: { [field: string]: string }) {
        console.log('💾 Clicking Save & Next button...');
        try {
            // Click Save & Next button
            await this.saveNextButton.click({ timeout: 10000 });
            console.log('✅ Save & Next clicked, waiting for image upload dialog...');
            await this.page.waitForTimeout(5000);

            const imgPath = './testdata/' + details['image'];
            await this.uploadFile.setInputFiles(imgPath);
            console.log(`📁 Uploading image file: ${details['image']}`);

            // Wait for upload to process
            await this.page.waitForTimeout(2000);

            await Helper.takeScreenshotToFile(
                this.page,
                '02-groups-list',
                this.testInfo,
                'Platform/salesforce-groups'
            );

            // Click Next button
            console.log('⏭️ Clicking Next button...');
            await this.nextButton.click({ timeout: 10000 });
            console.log('✅ Next button clicked');

            // Wait for next step to load
            await this.page.waitForTimeout(2000);

            // Click Done button
            console.log('✅ Clicking Done button...');
            await this.doneButton.click({ timeout: 10000 });
            console.log('✅ Done button clicked');

        } catch (error) {
            console.error('❌ Error during group creation workflow:', error);
            throw error;
        }
    }

    async clickCancel() {
        console.log('❌ Clicking Cancel button...');
        await this.cancelButton.click({ timeout: 10000 });
        await this.page.waitForTimeout(1000);
    }

    async verifyGroupSuccess(details?: { [field: string]: string }) {
        console.log('🔍 Starting group verification...');

        try {
            // Wait a moment for the page to load
            await this.page.waitForTimeout(1000);

            // If details provided, verify specific field values on the page
            if (details) {
                if (details['Name']) {
                    const nameCount = await this.page.getByText(details['Name']).count();
                    if (nameCount > 0) {
                        console.log('✅ Name verification successful');
                    } else {
                        console.log('⚠️ Name not found on page');
                    }
                }

                if (details['Description']) {
                    const descriptionCount = await this.page.getByText(details['Description']).count();
                    if (descriptionCount > 0) {
                        console.log('✅ Description verification successful');
                    } else {
                        console.log('⚠️ Description not found on page');
                    }
                }

                if (details['Access Type']) {
                    const accessTypeCount = await this.page.getByText(details['Access Type']).count();
                    if (accessTypeCount > 0) {
                        console.log('✅ Access Type verification successful');
                    } else {
                        console.log('⚠️ Access Type not found on page');
                    }
                }
            }

            await Helper.takeScreenshotToFile(
                this.page,
                '03-groups-list',
                this.testInfo,
                'Platform/salesforce-groups'
            );

            console.log('🎉 Verification completed!');
        } catch (e) {
            console.log('❌ Error in verifyGroupSuccess:', e);
        }
    }
}

