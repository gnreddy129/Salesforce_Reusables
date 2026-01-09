import { createBdd } from "playwright-bdd";
import { SalesforceHomePage } from "../../pages/OtherFunctionality/salesforceHome";

const { When, Then } = createBdd();

When("Search for {string} in app launcher", async ({ page, $testInfo }, appName) => {
  let salesforce = new SalesforceHomePage(page, $testInfo);
  await salesforce.searchApp(appName);
});

Then("Click on {string} button of {string}", async ({ page, $testInfo }, buttonName, appName) => {
  let salesforce = new SalesforceHomePage(page, $testInfo);
  await salesforce.clickNewButton(buttonName, appName);
});

Then("Click on Hidden {string} button of {string}", async ({ page, $testInfo }, buttonName, appName) => {
  let salesforce = new SalesforceHomePage(page, $testInfo);
  await salesforce.clickHiddenNewButton(buttonName, appName);
});

Then("Click on {string} Files button of {string}", async ({ page, $testInfo }, buttonName, appName) => {
  let salesforce = new SalesforceHomePage(page, $testInfo);
  await salesforce.clickFileUploadButton(buttonName, appName);
});

Then("Click on {string} Event button of {string}", async ({ page, $testInfo }, buttonName, appName) => {
  let salesforce = new SalesforceHomePage(page, $testInfo);
  await salesforce.clickNewEventButton(buttonName, appName);
});

Then("Click on Save button of {string}", async ({ page, $testInfo }, appName) => {
  let salesforce = new SalesforceHomePage(page, $testInfo);
  await salesforce.clickSaveButton(appName);
});