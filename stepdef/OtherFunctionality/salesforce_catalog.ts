import { createBdd, DataTable } from "playwright-bdd";
import SalesforceCatalogPage from "../../pages/OtherFunctionality/salesforceCatalog";
const { Given, When, Then } = createBdd();

Then(
  "Add new catalog item with following details",
  async ({ page , $testInfo }, dataTable: DataTable) => {
    const catalogue = new SalesforceCatalogPage(page ,$testInfo);
    await catalogue.addNewCatalogItem(dataTable.rowsHash());
  }
);

Then(
  "Verify catalog item is created successfully with details",
  async ({ page , $testInfo }, dataTable: DataTable) => {
    const catalogue = new SalesforceCatalogPage(page , $testInfo);
    await catalogue.verifyCatalogItem(dataTable.rowsHash());
  }
);
