import { createBdd } from "playwright-bdd";
import SalesforcePriceBooksPage from "../../pages/Sales/salesforcePriceBook";

const { Then } = createBdd();

Then(
  "Add new Price Book with following details",
  async ({ page, $testInfo }, dataTable) => {
    console.log(`🎯 Starting Price Book creation step`);

    const priceBooksPage = new SalesforcePriceBooksPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await priceBooksPage.addNewPriceBook(details);
    console.log(`✅ Price Book creation step completed`);
  }
);

Then(
  "Verify Price Book is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    console.log(`🎯 Starting Price Book verification step`);

    const priceBooksPage = new SalesforcePriceBooksPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await priceBooksPage.verifyPriceBookCreation(details);
    console.log(`✅ Price Book verification step completed`);
  }
);
