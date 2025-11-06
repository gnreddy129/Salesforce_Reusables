import { createBdd, DataTable } from "playwright-bdd";
const testData = require("../../testdata/userDetails.json");
let page: any;
const { Given, When, Then } = createBdd();

import { SalesforceOpportunitiesPage } from "../../pages/Sales/salesforceOpportunities";

Then(
  "Add new opportunity with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    let salesforce = new SalesforceOpportunitiesPage(page, $testInfo);
    await salesforce.addNewOpportunity(dataTable.rowsHash());
  }
);

Then(
  "Verify opportunity is created successfully",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    let salesforce = new SalesforceOpportunitiesPage(page, $testInfo);
    await salesforce.verifyOpportunityCreated(dataTable.rowsHash());
  }
);
