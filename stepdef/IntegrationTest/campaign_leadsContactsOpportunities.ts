import { createBdd } from 'playwright-bdd';
const { When, Then } = createBdd();
import Integrations from '../../pages/IntegrationTest/integrations';
let integrations: Integrations;

Then("I click new opportunities in campaign page", async ({ page }) => {
    integrations = new Integrations(page);
    await integrations.clickOnNewCampaignOpportunity();
});

Then("I click Add Leads in campaign page", async ({ page }) => {
    integrations = new Integrations(page);
    await integrations.clickOnAddNewLeads();
});

Then("Click on Next then Submit button", async ({ page }) => {
    integrations = new Integrations(page);
    await integrations.savingCreatedleadsOrContacts();
});

Then("I click Add Contacts in campaign page", async ({ page }) => {
    integrations = new Integrations(page);
    await integrations.clickOnAddNewContacts();
});