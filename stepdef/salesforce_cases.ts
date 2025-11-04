import { createBdd, DataTable } from "playwright-bdd";
import SalesforceCases from "../pages/salesforceCases";
const { Then } = createBdd();

Then(
  "Add new case with following details",
  async ({ page }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceCases(page);
    await pageObj.addNewCase(details);
  }
);

Then(
  "Verify case is created successfully with details",
  async ({ page }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceCases(page);
    await pageObj.verifyCase(details);
  }
);
