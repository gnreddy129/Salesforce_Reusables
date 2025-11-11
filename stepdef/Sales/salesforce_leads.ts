import { createBdd } from 'playwright-bdd';
import SalesforceLeadsPage  from '../../pages/Sales/salesforceLeads';
const { When, Then } = createBdd();

When('I create a new lead with following details:', async ({ page }, dataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceLeadsPage(page);
    await pageObj.addNewLead(details);
});

Then('I should see the lead created successfully', async ({ page }, dataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceLeadsPage(page);
    await pageObj.verifyLead(details);
});
