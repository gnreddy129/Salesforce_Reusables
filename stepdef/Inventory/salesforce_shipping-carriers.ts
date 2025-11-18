import { createBdd } from "playwright-bdd";
import SalesforceShippingCarriersPage from "../../pages/Inventory/salesforceShippingCarriers";

const { Given, When, Then } = createBdd();

When(
  "Add new shipping carrier with following details",
  async ({ page, $testInfo }, dataTable) => {
    const shippingCarrierPage = new SalesforceShippingCarriersPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await shippingCarrierPage.addNewShippingCarrier(details);
  }
);

Then(
  "Verify Shipping Carrier is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const shippingCarrierPage = new SalesforceShippingCarriersPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await shippingCarrierPage.verifyShippingCarrierCreation(details);
  }
);
