import { createBdd } from 'playwright-bdd';
const { Then } = createBdd();
import Integrations from '../../pages/IntegrationTest/integrations';
let integrations: Integrations;

Then("Click on Add new Contracts in order page", async ({ page }) => {
    integrations = new Integrations(page);
    await integrations.clickOnCreateNewContracts();
});

Then("Click on Add new Account in order page", async ({ page }) => {
    integrations = new Integrations(page);
    await integrations.clickOnCreateNewAccounts();
});