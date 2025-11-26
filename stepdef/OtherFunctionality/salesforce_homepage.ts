import { createBdd } from "playwright-bdd";
import { SalesforceHomePage } from "../../pages/OtherFunctionality/salesforceHome";

const { Given, When, Then } = createBdd();

When("Search for {string} in app launcher", async ({ page, $testInfo }, appName) => {
  let salesforce = new SalesforceHomePage(page, $testInfo);
  
  await salesforce.searchApp(appName);
});
