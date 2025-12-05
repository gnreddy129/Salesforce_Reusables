import { createBdd } from "playwright-bdd";
import { SalesforceLoginPage } from "../../pages/OtherFunctionality/salesforceLogin";
const testData = require("../../testdata/userDetails.json");

const { Given, When, Then } = createBdd();

Given(
  "Open a browser and login to the sales force site",
  async ({ page, $testInfo }) => {
    const salesforce = new SalesforceLoginPage(page, $testInfo);
    await salesforce.Login(
      testData.login.username,
      testData.login.password,
      true
    );
  }
);

Then("verify error message", async ({ page }) => {
  let salesforce = new SalesforceLoginPage(page);
  await salesforce.verifyError();
});
