import { createBdd } from 'playwright-bdd';
const { When, Then } = createBdd();
import Integrations from '../../pages/IntegrationTest/integrations';
let integrations: Integrations;

Then("I click new opportunities in campaign page", async ({ page }) => {
    integrations = new Integrations(page);
    await integrations.clickOnNewOrderOpportunity();
});

Then("I click Add Leads in campaign page", async ({ page }) => {
    integrations = new Integrations(page);
    await integrations.clickOnAddNewLeads();
});

Then("I click Add Contacts in campaign page", async ({ page }) => {
    integrations = new Integrations(page);
    await integrations.clickOnAddNewContacts();
});
