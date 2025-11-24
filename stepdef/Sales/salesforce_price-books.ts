import { createBdd } from "playwright-bdd";
import SalesforcePriceBooksPage from "../../pages/Sales/salesforcePriceBook";
import {
  takeStepScreenshot,
  takeScenarioScreenshot,
} from "../../utils/screenshotHelper";

const { Given, When, Then } = createBdd();

Then(
  "Add new Price Book with following details",
  async ({ page, $testInfo }, dataTable) => {
    console.log(`🎯 Starting Price Book creation step`);

    const priceBooksPage = new SalesforcePriceBooksPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await priceBooksPage.addNewPriceBook(details);

    // Take screenshot after completing the step
    await takeStepScreenshot(page, $testInfo, "CREATE", "price-books");

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

    // Take screenshot after completing the step
    await takeStepScreenshot(page, $testInfo, "VERIFY", "price-books");

    console.log(`✅ Price Book verification step completed`);
  }
);
