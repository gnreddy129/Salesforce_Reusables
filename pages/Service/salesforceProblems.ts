import { Page, Locator, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage';
import { Helper } from '../../utils/helper';

/**
 * Page Object Model for Salesforce Problems creation and management
 * 
 * This class encapsulates all interactions with the Problems form in Salesforce Service Cloud.
 * It provides methods to create, update, and verify Problem records.
 * 
 * @class SalesforceProblemsPage
 * @extends BasePage
 */
export class SalesforceProblemsPage extends BasePage {
    // ========== Basic Details Section ==========

    /** Subject field (Problem Name) - Required */
    readonly subject: Locator;

    /** Description field - Optional */
    readonly description: Locator;

    /** Status dropdown - Required */
    readonly status: Locator;

    /** Urgency dropdown - Required */
    readonly urgency: Locator;

    /** Impact dropdown - Required */
    readonly impact: Locator;

    /** Priority dropdown - Required */
    readonly priority: Locator;

    /** Parent Problem dropdown - Optional */
    readonly parentProblem: Locator;

    /** Category dropdown - Optional */
    readonly category: Locator;

    /** Subcategory dropdown - Optional */
    readonly subcategory: Locator;

    /** Priority Override Reason field - Optional */
    readonly priorityOverrideReason: Locator;

    /** Problem Owner field - Read-only/Optional */
    readonly problemOwner: Locator;

    // ========== Problem Analysis Section ==========

    /** Root Cause Summary field - Optional */
    readonly rootCauseSummary: Locator;

    // ========== Resolution Details Section ==========

    /** Resolved By dropdown - Optional */
    readonly resolvedBy: Locator;

    /** Resolution Date - Date field - Optional */
    readonly resolutionDate: Locator;

    /** Resolution Date - Time dropdown - Optional */
    readonly resolutionTime: Locator;

    /** Resolution Summary field - Optional */
    readonly resolutionSummary: Locator;

    // ========== Form Action Buttons ==========

    /** Save button - Saves the problem and closes the form */
    readonly saveButton: Locator;

    /** Save & New button - Saves and opens a new form */
    readonly saveNewButton: Locator;

    /** Cancel button - Closes the form without saving */
    readonly cancelButton: Locator;

    // ========== Helper Reference ==========
    private testInfo: TestInfo;

    /**
     * Constructor - Initializes all locators using role-based selectors
     * 
     * @param {Page} page - Playwright page object
     * @param {TestInfo} testInfo - Playwright test info for screenshot artifacts
     */
    constructor(page: Page, testInfo: TestInfo) {
        super(page);

        this.testInfo = testInfo;

        // ========== Basic Details Section Locators ==========
        this.subject = page.getByRole('textbox', { name: /Subject/i });
        this.description = page.getByRole('textbox', { name: /Description/i });
        this.status = page.getByRole('combobox', { name: /^Status$/i });
        this.urgency = page.getByRole('combobox', { name: /^Urgency$/i });
        this.impact = page.getByRole('combobox', { name: /^Impact$/i });
        this.priority = page.getByRole('combobox', { name: /^Priority$/i });
        this.parentProblem = page.getByRole('combobox', { name: /Parent Problem/i });
        this.category = page.getByRole('combobox', { name: /^Category$/i });
        this.subcategory = page.getByRole('combobox', { name: /^Subcategory$/i });
        this.priorityOverrideReason = page.getByRole('textbox', { name: /Priority Override Reason/i });
        this.problemOwner = page.locator('[class*="bBody"]', { has: page.locator('text=Problem Owner') }).locator('..').locator('[class*="bBody"]');

        // ========== Problem Analysis Section Locators ==========
        this.rootCauseSummary = page.getByRole('textbox', { name: /Root Cause Summary/i });

        // ========== Resolution Details Section Locators ==========
        this.resolvedBy = page.getByRole('combobox', { name: /Resolved By/i });
        this.resolutionDate = page.getByRole('textbox', { name: /Date/i });
        this.resolutionTime = page.getByRole('combobox', { name: /Time/i });
        this.resolutionSummary = page.getByRole('textbox', { name: /Resolution Summary/i });

        // ========== Form Action Buttons ==========
        this.saveButton = page.getByRole('button', { name: /^Save$/i });
        this.saveNewButton = page.getByRole('button', { name: /Save & New/i });
        this.cancelButton = page.getByRole('button', { name: /Cancel/i });
    }

    /**
     * Creates a new Problem record with the provided details
     * 
     * This method fills in the Problem form with the provided data, captures
     * before and after screenshots, and saves the problem.
     * 
     * @param {object} problemDetails - Object containing problem details
     * @param {string} problemDetails.Subject - Subject/Name of the problem (required)
     * @param {string} problemDetails.Description - Description of the problem (optional)
     * @param {string} problemDetails.Status - Status value (Open, Closed, etc.) (optional)
     * @param {string} problemDetails.Urgency - Urgency level (High, Medium, Low) (optional)
     * @param {string} problemDetails.Impact - Impact level (High, Medium, Low) (optional)
     * @param {string} problemDetails.Priority - Priority level (Critical, High, Medium, Low) (optional)
     * @param {string} problemDetails.ParentProblem - Parent Problem number (optional)
     * @param {string} problemDetails.Category - Category name (optional)
     * @param {string} problemDetails.Subcategory - Subcategory name (optional)
     * @param {string} problemDetails.PriorityOverrideReason - Reason for priority override (optional)
     * @param {string} problemDetails.RootCauseSummary - Root cause analysis (optional)
     * @param {string} problemDetails.ResolvedBy - User who resolved the problem (optional)
     * @param {string} problemDetails.ResolutionDate - Resolution date (format: DD/MM/YYYY) (optional)
     * @param {string} problemDetails.ResolutionTime - Resolution time (optional)
     * @param {string} problemDetails.ResolutionSummary - Resolution details (optional)
     * 
     * @example
     * await problemsPage.createProblem({
     *   Subject: 'Critical Database Issue',
     *   Description: 'Database connectivity problem affecting all users',
     *   Status: 'Open',
     *   Urgency: 'High',
     *   Impact: 'High',
     *   Priority: 'Critical'
     * });
     * 
     * @throws {Error} If required fields are missing or form interactions fail
     */
    async createProblem(problemDetails: any): Promise<void> {
        try {
            // Take start screenshot for evidence
            await Helper.takeScreenshotToFile(this.page, '01-problem_creation_start', this.testInfo, 'Service/salesforce-problems');
            console.log('🎯 Starting Problem creation with details:', problemDetails);

            // Fill Subject (Problem Name) - Required field
            if (problemDetails.Subject) {
                await this.subject.fill(problemDetails.Subject);
                console.log('✅ Subject filled:', problemDetails.Subject);
            } else {
                throw new Error('Subject (Problem Name) is required');
            }

            // Fill Description - Optional field
            if (problemDetails.Description) {
                try {
                    await this.description.fill(problemDetails.Description);
                    console.log('✅ Description filled:', problemDetails.Description);
                } catch (error) {
                    console.warn('⚠️ Could not fill Description field:', error);
                }
            }

            // Set Status - Optional field (if provided)
            if (problemDetails.Status) {
                try {
                    await this.status.click();
                    await this.page.getByRole('option', { name: problemDetails.Status, exact: true }).click();
                    console.log('✅ Status set to:', problemDetails.Status);
                } catch (error) {
                    console.warn('⚠️ Could not set Status:', error);
                }
            }

            // Set Urgency - Optional field (if provided)
            if (problemDetails.Urgency) {
                try {
                    await this.urgency.click();
                    await this.page.getByRole('option', { name: problemDetails.Urgency, exact: true }).click();
                    console.log('✅ Urgency set to:', problemDetails.Urgency);
                } catch (error) {
                    console.warn('⚠️ Could not set Urgency:', error);
                }
            }

            // Set Impact - Optional field (if provided)
            if (problemDetails.Impact) {
                try {
                    await this.impact.click();
                    await this.page.getByRole('option', { name: problemDetails.Impact, exact: true }).click();
                    console.log('✅ Impact set to:', problemDetails.Impact);
                } catch (error) {
                    console.warn('⚠️ Could not set Impact:', error);
                }
            }

            // Set Priority - Optional field (if provided)
            if (problemDetails.Priority) {
                try {
                    await this.priority.click();
                    await this.page.getByRole('option', { name: problemDetails.Priority, exact: true }).click();
                    console.log('✅ Priority set to:', problemDetails.Priority);
                } catch (error) {
                    console.warn('⚠️ Could not set Priority:', error);
                }
            }

            // Set Parent Problem - Optional field (if provided)
            if (problemDetails.ParentProblem) {
                try {
                    await this.parentProblem.click();
                    await this.page.getByRole('option', { name: new RegExp(problemDetails.ParentProblem, 'i') }).click();
                    console.log('✅ Parent Problem set to:', problemDetails.ParentProblem);
                } catch (error) {
                    console.warn('⚠️ Could not set Parent Problem:', error);
                }
            }

            // Set Category - Optional field (if provided)
            if (problemDetails.Category) {
                try {
                    await this.category.click();
                    await this.page.getByRole('option', { name: problemDetails.Category, exact: true }).click();
                    console.log('✅ Category set to:', problemDetails.Category);
                } catch (error) {
                    console.warn('⚠️ Could not set Category:', error);
                }
            }

            // Set Subcategory - Optional field (if provided)
            if (problemDetails.Subcategory) {
                try {
                    await this.subcategory.click();
                    await this.page.getByRole('option', { name: problemDetails.Subcategory, exact: true }).click();
                    console.log('✅ Subcategory set to:', problemDetails.Subcategory);
                } catch (error) {
                    console.warn('⚠️ Could not set Subcategory:', error);
                }
            }

            // Fill Priority Override Reason - Optional field
            if (problemDetails.PriorityOverrideReason) {
                try {
                    await this.priorityOverrideReason.fill(problemDetails.PriorityOverrideReason);
                    console.log('✅ Priority Override Reason filled:', problemDetails.PriorityOverrideReason);
                } catch (error) {
                    console.warn('⚠️ Could not fill Priority Override Reason:', error);
                }
            }

            // Fill Root Cause Summary - Optional field
            if (problemDetails.RootCauseSummary) {
                try {
                    await this.rootCauseSummary.fill(problemDetails.RootCauseSummary);
                    console.log('✅ Root Cause Summary filled:', problemDetails.RootCauseSummary);
                } catch (error) {
                    console.warn('⚠️ Could not fill Root Cause Summary:', error);
                }
            }

            // Set Resolved By - Optional field (if provided)
            if (problemDetails.ResolvedBy) {
                try {
                    await this.resolvedBy.click();
                    await this.page.getByRole('option', { name: new RegExp(problemDetails.ResolvedBy, 'i') }).click();
                    console.log('✅ Resolved By set to:', problemDetails.ResolvedBy);
                } catch (error) {
                    console.warn('⚠️ Could not set Resolved By:', error);
                }
            }

            // Fill Resolution Date - Optional field
            if (problemDetails.ResolutionDate) {
                try {
                    await this.resolutionDate.fill(problemDetails.ResolutionDate);
                    console.log('✅ Resolution Date filled:', problemDetails.ResolutionDate);
                } catch (error) {
                    console.warn('⚠️ Could not fill Resolution Date:', error);
                }
            }

            // Set Resolution Time - Optional field (if provided)
            if (problemDetails.ResolutionTime) {
                try {
                    await this.resolutionTime.click();
                    await this.page.getByRole('option', { name: problemDetails.ResolutionTime }).click();
                    console.log('✅ Resolution Time set to:', problemDetails.ResolutionTime);
                } catch (error) {
                    console.warn('⚠️ Could not set Resolution Time:', error);
                }
            }

            // Fill Resolution Summary - Optional field
            if (problemDetails.ResolutionSummary) {
                try {
                    await this.resolutionSummary.fill(problemDetails.ResolutionSummary);
                    console.log('✅ Resolution Summary filled:', problemDetails.ResolutionSummary);
                } catch (error) {
                    console.warn('⚠️ Could not fill Resolution Summary:', error);
                }
            }

            // Take screenshot before saving
            await Helper.takeScreenshotToFile(this.page, '02-problem_form_filled', this.testInfo, 'Service/salesforce-problems');

            // Click Save button
            await this.saveButton.click();
            console.log('✅ Save button clicked');

            // Wait for form to close and problem to be created
            await this.page.waitForTimeout(2000);

            // Take final screenshot for verification
            await Helper.takeScreenshotToFile(this.page, '03-problem_creation_complete', this.testInfo, 'Service/salesforce-problems');
            console.log('✅ Problem created successfully');

        } catch (error) {
            console.error('❌ Error creating Problem:', error);
            await Helper.takeScreenshotToFile(this.page, 'problem_creation_error', this.testInfo, 'Service/salesforce-problems');
            throw error;
        }
    }

    /**
     * Verifies that a newly created Problem appears in the Problems list
     * 
     * This method navigates back to the Problems list and confirms that
     * the created problem appears with the correct Subject/Name.
     * 
     * @param {string} subject - The Problem Subject/Name to verify
     * 
     * @example
     * await problemsPage.verifyProblemCreation('Critical Database Issue');
     * 
     * @throws {Error} If the problem is not found in the list
     */
    async verifyProblemCreation(subject: string): Promise<void> {
        try {
            console.log('🔍 Verifying Problem creation for:', subject);

            // Wait for list to update
            await this.page.waitForTimeout(1000);

            // Check if the problem appears in the Problems list
            const problemInList = this.page.locator('text=' + subject);

            if (await problemInList.isVisible({ timeout: 5000 })) {
                console.log('✅ Problem found in list:', subject);
                await Helper.takeScreenshotToFile(this.page, '04-problem_verification_success', this.testInfo, 'Service/salesforce-problems');
            } else {
                throw new Error(`Problem '${subject}' not found in the list`);
            }

        } catch (error) {
            console.error('❌ Error verifying Problem creation:', error);
            await Helper.takeScreenshotToFile(this.page, 'problem_verification_error', this.testInfo, 'Service/salesforce-problems');
            throw error;
        }
    }
}
