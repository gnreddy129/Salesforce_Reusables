import { createBdd } from 'playwright-bdd';
import  SalesforceAccountsPage  from '../../pages/Sales/salesforceAccounts';
const { When, Then } = createBdd();

When('I create a new account with following details:', async ({ page }, table) => {
    const details = table.rowsHash();
    const pageObj = new SalesforceAccountsPage(page);
    await pageObj.addNewAccount(details);
});

Then('I should see the account created successfully', async ({ page }, table) => {
    const details = table.rowsHash();
    const pageObj = new SalesforceAccountsPage(page);
    const success = await pageObj.verifyAccount(details);
});
