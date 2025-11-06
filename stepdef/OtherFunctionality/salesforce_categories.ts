import { createBdd, DataTable } from "playwright-bdd";
import SalesforceCategoriesPage from "../../pages/OtherFunctionality/salesforceCategories";
const { Then } = createBdd();

Then(
  "Add new category with following details",
  async ({ page }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceCategoriesPage(page);
    await pageObj.addNewCategory(details);
  }
);

Then(
  "Verify category is created successfully with details",
  async ({ page }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const pageObj = new SalesforceCategoriesPage(page);
    await pageObj.verifyCategory(details);
  }
);
