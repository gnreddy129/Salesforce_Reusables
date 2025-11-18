import { createBdd, DataTable } from "playwright-bdd";
import SalesforceWorkOrdersPage from "../../pages/Service/salesforceWorkOrders";

const { Given, When, Then } = createBdd();

Then(
  "Add new work order with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const workOrders = new SalesforceWorkOrdersPage(page, $testInfo);
    await workOrders.addNewWorkOrder(dataTable.rowsHash());
  }
);

Then(
  "Verify work order is created successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const workOrders = new SalesforceWorkOrdersPage(page, $testInfo);
    await workOrders.verifyWorkOrderCreation(dataTable.rowsHash());
  }
);
