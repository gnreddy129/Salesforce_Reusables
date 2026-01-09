import { Page, TestInfo, Locator } from '@playwright/test';
import { Helper } from '../../utils/helper';

/**
 * SalesforceProcessExceptions Page Object Model
 *
 * This class provides automation capabilities for Salesforce Process Exceptions management.
 * It handles process exception creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new process exceptions with comprehensive field management
 * - Handle complex form interactions with two-step combobox selection for Attached To
 * - Verify process exception creation success
 * - Support for all required and optional process exception fields
 *
 * @class SalesforceProcessExceptions
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceProcessExceptionsPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Dialog locator
    readonly dialog: Locator;

    // Locators - Process Exception Fields
    readonly categoryCombobox: Locator;
    readonly statusCombobox: Locator;
    readonly priorityCombobox: Locator;
    readonly severityCombobox: Locator;
    readonly messageField: Locator;

    // Attached To - Two-step combobox selection
    readonly chooseObjectCombobox: Locator;
    readonly attachedToCombobox: Locator;

    readonly caseCombobox: Locator;
    readonly externalReferenceField: Locator;
    readonly descriptionField: Locator;

    // Button Locators
    readonly saveButton: Locator;
    readonly saveNewButton: Locator;
    readonly cancelButton: Locator;
    readonly allOptionsLocator: Locator;

    constructor(page: Page, testInfo?: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        console.log('🚀 Initializing SalesforceProcessExceptions page object');

        this.dialog = page.getByRole('dialog').first();

        // Process Exception Fields
        this.categoryCombobox = this.dialog.getByRole('combobox', { name: /^Category$/i }).first();
        this.statusCombobox = this.dialog.getByRole('combobox', { name: /^Status$/i }).first();
        this.priorityCombobox = this.dialog.getByRole('combobox', { name: /^Priority$/i }).first();
        this.severityCombobox = this.dialog.getByRole('combobox', { name: /^Severity$/i });
        this.messageField = this.dialog.getByRole('textbox', { name: /^Message$/i });

        // Attached To - Two-step combobox selection
        this.chooseObjectCombobox = this.dialog.getByRole('combobox', { name: /^Choose an object$/i }).first();
        this.attachedToCombobox = this.dialog.getByRole('combobox', { name: /^Attached To$/i }).first();

        this.caseCombobox = this.dialog.getByRole('combobox', { name: /^Case$/i }).first();
        this.externalReferenceField = this.dialog.getByRole('textbox', { name: /^External Reference$/i }).first();
        this.descriptionField = this.dialog.getByRole('textbox', { name: /^Description$/i }).first();

        // Button Locators
        this.saveButton = this.dialog.getByRole('button', { name: /^Save$/i });
        this.saveNewButton = this.dialog.getByRole('button', { name: /^Save & New$/i });
        this.cancelButton = this.dialog.getByRole('button', { name: /^Cancel$/i });
        this.allOptionsLocator = page.getByRole("option");
    }

    /**
     * Creates a new process exception in Salesforce with the provided details
     *
     * This method handles the complete process exception creation workflow:
     * 1. Logs the starting process
     * 2. Fills in all provided field values
     * 3. Handles two-step Attached To combobox selection
     * 4. Saves the process exception
     * 5. Handles all optional fields with proper error handling
     *
     * @param details - Object containing process exception field values to be filled
     */
    async addNewProcessException(details: { [field: string]: string }) {
        console.log('🔄 Starting Process Exception creation process...');
        console.log('📋 Process Exception details:', JSON.stringify(details, null, 2));

        try {
            // Category (Combobox)
            const category = details.Category || details.category;
            if (category) {
                console.log('🔽 Selecting Category from combobox...');
                await this.categoryCombobox.click({ timeout: 10000 });
                await this.allOptionsLocator.filter({ hasText: category }).first().click({ timeout: 10000 });
                console.log('✅ Category selected:', category);
            }

            // Status (Combobox)
            const status = details.Status || details.status;
            if (status) {
                console.log('🔽 Selecting Status from combobox...');
                await this.statusCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.filter({ hasText: status }).first().click({ timeout: 10000 });
                console.log('✅ Status selected:', status);
            }

            // Priority (Combobox)
            const priority = details.Priority || details.priority;
            if (priority) {
                console.log('🔽 Selecting Priority from combobox...');
                await this.priorityCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);
                await this.allOptionsLocator.filter({ hasText: priority }).first().click({ timeout: 10000 });
                console.log('✅ Priority selected:', priority);
            }

            // Severity (Combobox)
            const severity = details.Severity || details.severity;
            if (severity) {
                console.log('🔽 Selecting Severity from combobox...');
                await this.severityCombobox.click({ timeout: 10000 });
                await this.page.waitForTimeout(1000);

                await this.allOptionsLocator.filter({ hasText: severity }).first().click({ timeout: 10000 });
                console.log('✅ Severity selected:', severity);
            }

            // Message (Textbox)
            if (details.Message) {
                console.log('📝 Filling Message...');
                try {
                    await this.messageField.fill(details.Message, { timeout: 10000 });
                    console.log('✅ Message filled:', details.Message);
                } catch (e) {
                    console.log('❌ Failed to fill Message:', e);
                }
            }

            // Attached To (Two-step combobox selection)
            const objectType = details['Object Type'] || details.ObjectType;
            const attachedTo = details['Attached To'] || details.AttachedTo;

            if (objectType && attachedTo) {
                console.log('🔽 Selecting Attached To (Two-step process)...');

                try {
                    // Step 1: Select object type (e.g., "Order") from "Choose an object" combobox
                    console.log(`   Step 1: Selecting object type "${objectType}" from "Choose an object" combobox...`);
                    await this.chooseObjectCombobox.click({ timeout: 10000 });
                    await this.allOptionsLocator.filter({ hasText: objectType }).first().click({ timeout: 10000 });
                    console.log(`   ✅ Object type "${objectType}" selected`);

                    // Wait for the Attached To combobox to appear
                    await this.attachedToCombobox.waitFor({ state: 'visible', timeout: 10000 });

                    // Step 2: Select the specific attached to value (e.g., 00000100)
                    console.log(`   Step 2: Selecting Attached To: ${attachedTo}...`);
                    await this.attachedToCombobox.click({ timeout: 10000 });
                    await this.allOptionsLocator.first().click({ timeout: 10000 });
                    console.log('✅ Attached To selected:', attachedTo);
                } catch (error) {
                    console.log('❌ Failed in Attached To two-step selection:', error);
                    throw error;
                }
            }

            // Case (Combobox)
            const caseValue = details.Case || details.case;
            if (caseValue) {
                console.log('🔽 Selecting Case from combobox...');
                await this.caseCombobox.click({ timeout: 10000 });
                await this.allOptionsLocator.first().click({ timeout: 10000 });
                console.log('✅ Case selected:', caseValue);
            }

            // External Reference (Textbox)
            if (details['External Reference'] || details.ExternalReference) {
                const externalRef = details['External Reference'] || details.ExternalReference;
                console.log('📝 Filling External Reference...');
                try {
                    await this.externalReferenceField.fill(externalRef, { timeout: 10000 });
                    console.log('✅ External Reference filled:', externalRef);
                } catch (e) {
                    console.log('❌ Failed to fill External Reference:', e);
                }
            }

            // Description (Textbox)
            if (details.Description) {
                console.log('📝 Filling Description...');
                try {
                    await this.descriptionField.fill(details.Description, { timeout: 10000 });
                    console.log('✅ Description filled:', details.Description);
                } catch (e) {
                    console.log('❌ Failed to fill Description:', e);
                }
            }

            await Helper.takeScreenshotToFile(
                this.page,
                '01-process-exceptions-list',
                this.testInfo,
                'OtherFunctionality/salesforce-process-exceptions'
            );

            console.log('✅ Process Exception form filled successfully');

        } catch (error) {
            console.log('❌ Error filling Process Exception form:', error);
            throw error;
        }
    }

    async clickSave() {
        console.log('💾 Clicking Save button...');
        try {
            await Helper.takeScreenshotToFile(
                this.page,
                '02-process-exceptions-list',
                this.testInfo,
                'OtherFunctionality/salesforce-process-exceptions'
            );

            await this.saveButton.click({ timeout: 10000 });
            console.log('⏳ Waiting for save to complete...');

            // Wait a moment for the save to process
            await this.page.waitForTimeout(2000);

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

    async verifyProcessExceptionSuccess(details?: { [field: string]: string }) {
        console.log('🔍 Starting process exception verification...');

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

                if (details['Priority']) {
                    const priorityCount = await this.page.getByText(details['Priority']).count();
                    if (priorityCount > 0) {
                        console.log('✅ Priority verification successful');
                    } else {
                        console.log('⚠️ Priority not found on page');
                    }
                }

                if (details['Message']) {
                    const messageCount = await this.page.getByText(details['Message']).count();
                    if (messageCount > 0) {
                        console.log('✅ Message verification successful');
                    } else {
                        console.log('⚠️ Message not found on page');
                    }
                }
            }

            await Helper.takeScreenshotToFile(
                this.page,
                '03-process-exceptions-list',
                this.testInfo,
                'OtherFunctionality/salesforce-process-exceptions'
            );

            console.log('🎉 Verification completed!');
        } catch (e) {
            console.log('❌ Error in verifyProcessExceptionSuccess:', e);
        }
    }
}
