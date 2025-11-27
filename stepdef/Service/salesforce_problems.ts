import { createBdd, DataTable } from "playwright-bdd";
import { TestInfo } from '@playwright/test';
import { SalesforceProblemsPage } from '../../pages/Service/salesforceProblems';

const { Then, When, Given } = createBdd();

/**
 * BDD Step Definitions for Salesforce Problems automation
 * 
 * These steps define the interactions for creating and managing Problem records
 * in Salesforce Service Cloud using BDD Gherkin syntax.
 * 
 * Supported fields in DataTable:
 * - Subject (required): Problem name/title
 * - Description (optional): Problem details
 * - Status (optional): Open, Closed, etc.
 * - Urgency (optional): High, Medium, Low
 * - Impact (optional): High, Medium, Low
 * - Priority (optional): Critical, High, Medium, Low
 * - ParentProblem (optional): Parent problem reference
 * - Category (optional): Problem category
 * - Subcategory (optional): Problem subcategory
 * - PriorityOverrideReason (optional): Reason for priority override
 * - RootCauseSummary (optional): Root cause analysis
 * - ResolvedBy (optional): User who resolved the problem
 * - ResolutionDate (optional): Date in DD/MM/YYYY format
 * - ResolutionTime (optional): Resolution time
 * - ResolutionSummary (optional): Resolution details
 */

/**
 * Step: Add new problem with following details
 * 
 * Creates a new Problem record with the provided data table values.
 * Supports all Problem fields including Subject, Description, Status, Urgency, Impact, Priority, etc.
 * 
 * @example
 * Then Add new problem with following details
 *   | Field           | Value                                 |
 *   | Subject         | Critical Database Issue               |
 *   | Description     | Database connectivity problem         |
 *   | Status          | Open                                  |
 *   | Urgency         | High                                  |
 *   | Impact          | High                                  |
 *   | Priority        | Critical                              |
 *   | Category        | Hardware                              |
 *   | Subcategory     | MS SQL Server                         |
 *   | ResolutionDate  | 17/11/2025                            |
 */
Then("Add new problem with following details",
    async ({ page, $testInfo }, dataTable) => {
        const problemsPage = new SalesforceProblemsPage(page, $testInfo as TestInfo);
        const details = dataTable.rowsHash();

        // Click the New button to open the form
        const newButton = page.getByRole('button', { name: /^New$/ }).first();
        await newButton.click();
        await page.waitForTimeout(2000);

        console.log('📋 Step: Add new problem with details');
        console.log('   Details:', details);

        await problemsPage.createProblem(details);

        // Auto-verify if Subject was provided
        const subjectToVerify = details.Subject || "";
        if (subjectToVerify) {
            await problemsPage.verifyProblemCreation(subjectToVerify);
        }
    }
);

/**
 * Step: Verify problem is created successfully with details
 * 
 * Verifies that a Problem record appears in the Problems list with expected details.
 * 
 * @example
 * Then Verify problem is created successfully with details
 *   | Field   | Value                      |
 *   | Subject | Critical Database Issue    |
 */
Then("Verify problem is created successfully with details",
    async ({ page, $testInfo }, dataTable) => {
        const problemsPage = new SalesforceProblemsPage(page, $testInfo as TestInfo);
        const details = dataTable.rowsHash();
        const subject = details.Subject || "";

        console.log('✅ Step: Verify problem creation');
        console.log('   Expected Problem Subject:', subject);

        if (subject) {
            await problemsPage.verifyProblemCreation(subject);
        } else {
            throw new Error('Subject is required for verification');
        }
    }
);

/**
 * Step: Verify problem exists in the list
 * 
 * Simple step to verify a problem by its subject exists in the list
 * 
 * @example
 * Then Verify problem "Critical Database Issue" exists in the list
 */
Then("Verify problem {string} exists in the list",
    async ({ page, $testInfo }, subject: string) => {
        const problemsPage = new SalesforceProblemsPage(page, $testInfo as TestInfo);

        console.log('✅ Step: Verify problem exists in list');
        console.log('   Subject:', subject);

        await problemsPage.verifyProblemCreation(subject);
    }
);

/**
 * Step: Open Problems list in Salesforce
 * 
 * Navigates to the Problems list view in Salesforce Service Cloud.
 * This step is called before creating a new problem.
 * 
 * @example
 * When Open Problems list in Salesforce
 */
When("Open Problems list in Salesforce",
    async ({ page }) => {
        console.log('🔍 Step: Open Problems list');

        // Navigate to Problems list page
        await page.goto('/lightning/o/Problem/list');

        // Wait for list to load
        await page.waitForTimeout(2000);

        console.log('✅ Problems list opened');
    }
);

/**
 * Step: Click New button to create Problem
 * 
 * Clicks the "New" button to open the Problem creation form.
 * 
 * @example
 * When Click New button to create Problem
 */
When("Click New button to create Problem",
    async ({ page }) => {
        console.log('🔘 Step: Click New button');

        // Click the New button
        const newButton = page.getByRole('button', { name: 'New' });
        await newButton.click();

        // Wait for form to open
        await page.waitForTimeout(3000);

        console.log('✅ Problem creation form opened');
    }
);

/**
 * Step: Verify required fields are present on the form
 * 
 * Validates that all required fields (Problem Name, Status) are visible
 * on the Problem creation form.
 * 
 * @example
 * Then Verify required fields are present on the form
 */
Then("Verify required fields are present on the form",
    async ({ page }) => {
        console.log('🔍 Step: Verify form fields');

        const requiredFields = [
            { role: 'textbox', name: 'Subject' },
            { role: 'combobox', name: 'Status' }
        ];

        for (const field of requiredFields) {
            const locator = page.getByRole(field.role as any, { name: field.name });
            const isVisible = await locator.isVisible({ timeout: 5000 });

            if (!isVisible) {
                throw new Error(`Required field '${field.name}' is not visible on the form`);
            }
            console.log(`  ✅ Field '${field.name}' is visible`);
        }

        console.log('✅ All required fields are present');
    }
);
