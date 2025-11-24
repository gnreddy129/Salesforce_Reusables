import { createBdd } from "playwright-bdd";
import SalesforceSellersPage from "../../pages/Sales/salesforceSellers";

const { Given, When, Then } = createBdd();

When(
  "Add new seller with following details",
  async ({ page, $testInfo }, dataTable) => {
    const sellerPage = new SalesforceSellersPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await sellerPage.addNewSeller(details);
  }
);

Then(
  "Verify Seller is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const sellerPage = new SalesforceSellersPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await sellerPage.verifySellerCreation(details);
  }
);
