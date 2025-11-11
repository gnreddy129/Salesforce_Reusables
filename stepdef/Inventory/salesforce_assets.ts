import { createBdd } from 'playwright-bdd';
import  SalesforceAssetsPage  from '../../pages/Inventory/salesforceAssets';
const { When, Then } = createBdd();

When('I create a new asset with following details:', async ({ page }, dataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceAssetsPage(page);
    await pageObj.addNewAsset(details);
});

Then('I should see the asset created successfully', async ({ page }, dataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceAssetsPage(page);
    const success = await pageObj.verifyAsset(details);
});


