import { createBdd } from 'playwright-bdd';
import SalesforceEntitlementsPage from '../../pages/Service/salesforceEntitlements';

const { Then } = createBdd();

Then(
    'Add new entitlement with following details',
    async ({ page, $testInfo }, dataTable) => {
        console.log('📝 Step: Add new entitlement with following details');

        const entitlementsPage = new SalesforceEntitlementsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        console.log('📦 Received entitlement details:', JSON.stringify(details, null, 2));
        await entitlementsPage.addNewEntitlement(details);
        await entitlementsPage.clickSave();
        console.log('✅ Step completed: Entitlement added');
    }
);

Then(
    'Verify entitlement is created successfully',
    async ({ page, $testInfo }, dataTable) => {
        console.log('📝 Step: Verify entitlement is created successfully');

        const entitlementsPage = new SalesforceEntitlementsPage(page, $testInfo);
        const details = dataTable?.rowsHash();
        console.log('📦 Received verification details:', JSON.stringify(details, null, 2));

        await entitlementsPage.verifyEntitlementSuccess(details);

        console.log('✅ Step completed: Entitlement verification successful');
    }
);
