import { createBdd, DataTable } from "playwright-bdd";
import SalesforceLabelsPage from "../../pages/OtherFunctionality/salesforceLabels";
const { Then } = createBdd();

Then(
  "Add new label with following details",
  async ({ page }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceLabelsPage(page);
    await pageObj.addNewLabel(details);
  }
);

Then(
  "Verify label is created successfully with details",
  async ({ page }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceLabelsPage(page);
    await pageObj.verifyLabel(details);
  }
);
