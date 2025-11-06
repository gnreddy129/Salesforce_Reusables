import { createBdd, DataTable } from "playwright-bdd";
import SalesforceCasesPage from "../../pages/Service/salesforceCases";
const { Then } = createBdd();

Then(
  "Add new case with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceCasesPage(page, $testInfo);
    await pageObj.addNewCase(details);
  }
);

Then(
  "Verify case is created successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceCasesPage(page, $testInfo);
    await pageObj.verifyCase(details);
  }
);
