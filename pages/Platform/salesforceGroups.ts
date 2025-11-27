import { Page, TestInfo } from '@playwright/test';
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
    readonly dialog = () => this.page.getByRole('dialog').first();

    // Locators - Group Fields
    readonly nameField = () =>
        this.page.getByRole('textbox', { name: 'Name *' });

    readonly descriptionField = () =>
        this.page.getByRole('textbox', { name: /^Description$/i }).first();

    readonly informationField = () =>
        this.page.getByRole('textbox', { name: 'Information - Compose text' }).first();


    readonly disableAutomaticArchivingCheckbox = () =>
        this.page.getByRole('checkbox', { name: /^Disable automatic archiving$/i }).first();

    readonly accessTypeCombobox = () =>
        this.page.getByRole('combobox', { name: /^Access Type$/i }).first();

    readonly allowCustomersCheckbox = () =>
        this.page.getByRole('checkbox', { name: /^Allow customers$/i }).first();

    readonly broadcastOnlyCheckbox = () =>
        this.page.getByRole('checkbox', { name: /^Broadcast Only$/i }).first();

    // Button Locators
    readonly saveNewButton = () =>
        this.page.getByRole('button', { name: /^Save & Next$/i });
    readonly cancelButton = () =>
        this.page.getByRole('button', { name: /^Cancel$/i });

    constructor(page: Page, testInfo?: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        console.log('🚀 Initializing SalesforceGroups page object');
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
                    await this.nameField().fill(name, { timeout: 10000 });
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
                    await this.descriptionField().fill(description, { timeout: 10000 });
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
                    await this.informationField().fill(information, { timeout: 10000 });
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
                    const archCheckbox = this.disableAutomaticArchivingCheckbox();
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
                try {
                    await this.accessTypeCombobox().click({ timeout: 10000 });
                    await this.page.waitForTimeout(1000);

                    const optionRole = this.page.getByRole('option', { name: accessType }).first();
                    await optionRole.waitFor({ state: 'visible', timeout: 5000 });
                    await optionRole.click({ timeout: 5000 });
                    console.log('✅ Access Type selected:', accessType);
                } catch (e) {
                    console.log('❌ Failed to select Access Type:', e);
                    throw e;
                }
            }

            // Allow customers (Checkbox)
            const allowCustomers = details['Allow customers'] || details.allowCustomers;
            if (allowCustomers && allowCustomers.toLowerCase() === 'true') {
                console.log('☑️ Checking Allow customers checkbox...');
                try {
                    const acCheckbox = this.allowCustomersCheckbox();
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
                    const boCheckbox = this.broadcastOnlyCheckbox();
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
                'OtherFunctionality/salesforce-groups'
            );

            console.log('✅ Group form filled successfully');
        } catch (error) {
            console.log('❌ Error filling Group form:', error);
            throw error;
        }
    }

    async clickSave() {
        console.log('💾 Clicking Save & Next button...');
        try {
            // Click Save & Next button
            const saveNextBtn = this.page.getByRole('button', { name: /^Save & Next$/i });
            await saveNextBtn.click({ timeout: 10000 });
            console.log('✅ Save & Next clicked, waiting for image upload dialog...');

            // Wait for the image upload dialog to appear
            await this.page.waitForTimeout(5000);

            // Click on Upload button to select image
            console.log('📸 Clicking Upload button to select image...');
            const uploadButton = this.page.getByRole('button', { name: 'Choose File Upload Image' }).first();
            console.log('📁 Uploading image file: img1.jpg');
            const imgPath = 'C:\\Users\\pradhkum\\Documents\\Pk Salesforce\\testdata\\img1.jpg';
            await this.page.locator('input[type="file"]').setInputFiles(imgPath);
            console.log('✅ Image file uploaded');

            // Wait for upload to process
            await this.page.waitForTimeout(2000);

            await Helper.takeScreenshotToFile(
                this.page,
                '02-groups-list',
                this.testInfo,
                'OtherFunctionality/salesforce-groups'
            );

            // Click Next button
            console.log('⏭️ Clicking Next button...');
            const nextButton = this.page.getByRole('button', { name: /^Next$/i }).first();
            await nextButton.click({ timeout: 10000 });
            console.log('✅ Next button clicked');

            // Wait for next step to load
            await this.page.waitForTimeout(2000);

            // Click Done button
            console.log('✅ Clicking Done button...');
            const doneButton = this.page.getByRole('button', { name: /^Done$/i }).first();
            await doneButton.click({ timeout: 10000 });
            console.log('✅ Done button clicked');

        } catch (error) {
            console.error('❌ Error during group creation workflow:', error);
            throw error;
        }
    }

    async clickCancel() {
        console.log('❌ Clicking Cancel button...');
        await this.cancelButton().click();
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
                'OtherFunctionality/salesforce-groups'
            );

            console.log('🎉 Verification completed!');
        } catch (e) {
            console.log('❌ Error in verifyGroupSuccess:', e);
        }
    }
}
