import { createBdd, DataTable } from "playwright-bdd";
import { salesforceCatalogLocators } from "../pages/salesforceCatalog";
const { Given, When, Then } = createBdd();

Then(
  "Add new catalog item with following details",
  async ({ page }, dataTable: DataTable) => {
    const catalogue = new salesforceCatalogLocators(page);
    await catalogue.addNewCatalogItem(dataTable.rowsHash());
  }
);

Then(
  "Verify catalog item is created successfully with details",
  async ({ page }, dataTable: DataTable) => {
    const catalogue = new salesforceCatalogLocators(page);
    await catalogue.verifyCatalogItem(dataTable.rowsHash());
  }
);
