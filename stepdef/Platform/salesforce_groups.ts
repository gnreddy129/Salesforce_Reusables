import { createBdd } from 'playwright-bdd';
import SalesforceGroupsPage from '../../pages/Platform/salesforceGroups';

const { Then } = createBdd();

Then(
    'Add new group with following details',
    async ({ page, $testInfo }, dataTable) => {
        console.log('📝 Step: Add new group with following details');

        const groupsPage = new SalesforceGroupsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        console.log('📦 Received group details:', JSON.stringify(details, null, 2));

        // Click the New button to open the form
        const newButton = page.getByRole('button', { name: /^New$/ }).first();
        await newButton.click();
        await page.waitForTimeout(2000);

        // Fill the form
        await groupsPage.addNewGroup(details);

        // Save the form
        await groupsPage.clickSave();

        console.log('✅ Step completed: Group added');
    }
);

Then(
    'Verify group is created successfully',
    async ({ page, $testInfo }, dataTable) => {
        console.log('📝 Step: Verify group is created successfully');

        const groupsPage = new SalesforceGroupsPage(page, $testInfo);
        const details = dataTable?.rowsHash();
        console.log('📦 Received verification details:', JSON.stringify(details, null, 2));

        await groupsPage.verifyGroupSuccess(details);

        console.log('✅ Step completed: Group verification successful');
    }
);
