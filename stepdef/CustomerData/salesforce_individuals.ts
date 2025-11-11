import { createBdd, DataTable } from "playwright-bdd";
import SalesforceIndividualsPage from "../../pages/CustomerData/salesforceIndividuals";
const { Given, When, Then } = createBdd();

Then(
  "Add new individual with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const individuals = new SalesforceIndividualsPage(page, $testInfo);
    await individuals.addNewIndividual(dataTable.rowsHash());
  }
);

Then(
  "Verify individual is created successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const individuals = new SalesforceIndividualsPage(page, $testInfo);
    await individuals.verifyIndividual(dataTable.rowsHash());
  }
);
