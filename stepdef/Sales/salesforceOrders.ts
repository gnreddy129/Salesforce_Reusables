import { createBdd } from "playwright-bdd";
import SalesforceOrdersPage from "../../pages/Sales/salesforceOrders";

const { Given, When, Then } = createBdd();

Then(
  "Add new order with following details",
  async ({ page, $testInfo }, dataTable) => {
    const details = dataTable.rowsHash();
    const ordersPage = new SalesforceOrdersPage(page, $testInfo);
    await ordersPage.addNewOrder(details);
  }
);

Then(
  "Verify order is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const ordersPage = new SalesforceOrdersPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await ordersPage.verifyOrder(details);
  }
);
