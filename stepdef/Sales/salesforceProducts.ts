import { createBdd } from "playwright-bdd";
import SalesforceProductsPage from "../../pages/Sales/salesforceProducts";
const { Given, When, Then } = createBdd();

Then(
  "Add new product with following details",
  async ({ page, $testInfo }, dataTable) => {
    const details = dataTable.rowsHash();
    const productsPage = new SalesforceProductsPage(page, $testInfo);
    await productsPage.addNewProduct(details);
  }
);

Then(
  "Verify product is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const productsPage = new SalesforceProductsPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await productsPage.verifyProduct(details);
  }
);
