import { createBdd } from "playwright-bdd";
import SalesforcePriceBooksPage from "../../pages/Sales/salesforcePriceBook";

const { Given, When, Then } = createBdd();

Then(
  "Add new Price Book with following details",
  async ({ page, $testInfo }, dataTable) => {
    const priceBooksPage = new SalesforcePriceBooksPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await priceBooksPage.addNewPriceBook(details);
  }
);

Then(
  "Verify Price Book is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const priceBooksPage = new SalesforcePriceBooksPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await priceBooksPage.verifyPriceBookCreation(details);
  }
);
