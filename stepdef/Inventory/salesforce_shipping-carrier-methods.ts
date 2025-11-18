import { createBdd } from "playwright-bdd";
import SalesforceShippingCarrierMethodsPage from "../../pages/Inventory/salesforceShippingCarrierMethods";

const { Given, When, Then } = createBdd();

When(
  "Add new shipping carrier method with following details",
  async ({ page, $testInfo }, dataTable) => {
    const shippingCarrierMethodPage = new SalesforceShippingCarrierMethodsPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await shippingCarrierMethodPage.addNewShippingCarrierMethod(details);
  }
);

Then(
  "Verify Shipping Carrier Method is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const shippingCarrierMethodPage = new SalesforceShippingCarrierMethodsPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await shippingCarrierMethodPage.verifyShippingCarrierMethodCreation(
      details
    );
  }
);
