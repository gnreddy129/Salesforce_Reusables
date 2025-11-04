import { createBdd, DataTable } from "playwright-bdd";
const testData = require("../testdata/userDetails.json");
let page: any;
const { Given, When, Then } = createBdd();

import { salesforceOpportunitiesLocators } from "../pages/salesforceOpportunities";

Then(
  "Add new opportunity with following details",
  async ({ page }, dataTable: DataTable) => {
    let salesforce = new salesforceOpportunitiesLocators(page);
    await salesforce.addNewOpportunity(dataTable.rowsHash());
  }
);

Then("Verify opportunity is created successfully", async ({ page }, dataTable: DataTable) => {
  let salesforce = new salesforceOpportunitiesLocators(page);
  await salesforce.verifyOpportunityCreated(dataTable.rowsHash());
});