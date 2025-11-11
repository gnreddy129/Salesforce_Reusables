import { createBdd, DataTable } from 'playwright-bdd';
import SalesforceCampaignsPage from '../../pages/Marketing/salesforceCampaigns';

const { When, Then } = createBdd();

When('I create a new campaign with following details:', async ({ page }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceCampaignsPage(page);
    await pageObj.addNewCampaign(details);
});

Then('I should see the campaign created successfully', async ({ page }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceCampaignsPage(page);
    const success = await pageObj.verifyCampaign(details);
});

