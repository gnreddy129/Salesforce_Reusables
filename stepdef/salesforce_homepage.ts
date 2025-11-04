import { createBdd } from "playwright-bdd";
import { salesforceHomeLocators } from "../pages/salesforceHome";
const testData = require("../testdata/userDetails.json");
let page: any;

const { Given, When, Then } = createBdd();

When("Search for {string} in app launcher", async ({ page }, appName) => {
  let salesforce = new salesforceHomeLocators(page);
  await salesforce.searchApp(appName);
});
