import { createBdd } from 'playwright-bdd';
import SalesforceProcessExceptionsPage from '../../pages/OtherFunctionality/salesforceProcessExceptions';

const { Then } = createBdd();

Then(
    'Add new process exception with following details',
    async ({ page, $testInfo }, dataTable) => {
        console.log('📝 Step: Add new process exception with following details');

        const processExceptionsPage = new SalesforceProcessExceptionsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        console.log('📦 Received process exception details:', JSON.stringify(details, null, 2));

        // Click the New button to open the form
        const newButton = page.getByRole('button', { name: /^New$/ }).first();
        await newButton.click();
        await page.waitForTimeout(2000);

        // Fill the form
        await processExceptionsPage.addNewProcessException(details);

        // Save the form
        await processExceptionsPage.clickSave();

        console.log('✅ Step completed: Process Exception added');
    }
);

Then(
    'Verify process exception is created successfully',
    async ({ page, $testInfo }, dataTable) => {
        console.log('📝 Step: Verify process exception is created successfully');

        const processExceptionsPage = new SalesforceProcessExceptionsPage(page, $testInfo);

        // Get details from dataTable if provided, otherwise pass undefined
        const details = dataTable ? dataTable.rowsHash() : undefined;

        // Verify the process exception creation with optional details for field verification
        await processExceptionsPage.verifyProcessExceptionSuccess(details);

        console.log('✅ Step completed: Process Exception verification successful');
    }
);
