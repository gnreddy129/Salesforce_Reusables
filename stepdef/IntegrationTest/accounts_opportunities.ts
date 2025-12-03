import { createBdd } from 'playwright-bdd';
const { Then } = createBdd();
import Integrations from '../../pages/IntegrationTest/integrations';

let integrations: Integrations;
Then("I click new opportunities on Accounts page", async ({ page }) => {
  integrations = new Integrations(page);
  await integrations.clickOnNewOpportunity();
});