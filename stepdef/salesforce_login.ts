import { createBdd } from "playwright-bdd";
import { salesforceLoginLocators } from "../pages/salesforceLogin";
const testData = require("../testdata/userDetails.json");

const { Given, When, Then } = createBdd();

Given(
  "Open a browser and login to the sales force site",
  async ({ page, context }) => {
    const salesforce = new salesforceLoginLocators(page);

    await salesforce.Login(testData.user2.username, testData.user2.password);
  }
);

Given(
  "Open a browser and login to the sales force site with invalid credentials",
  async ({ page }) => {
    let salesforce = new salesforceLoginLocators(page);
    await salesforce.Login("jnoqjw", "kmcconq");
  }
);

Then("verify error message", async ({ page }) => {
  let salesforce = new salesforceLoginLocators(page);
  await salesforce.verifyError();
});


