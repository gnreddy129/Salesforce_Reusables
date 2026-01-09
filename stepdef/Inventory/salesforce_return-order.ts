import { createBdd, DataTable } from "playwright-bdd";
import SalesforceReturnOrder from "../../pages/Inventory/salesforceReturnOrder";

const { Given, When, Then } = createBdd();

Then(
    "Add new return order with following details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const returnOrderPage = new SalesforceReturnOrder(page, $testInfo);
        const details = dataTable.rowsHash();
        await returnOrderPage.createReturnOrder(details);
    }
);

Then(
    "Verify return order is created successfully with details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const returnOrderPage = new SalesforceReturnOrder(page, $testInfo);
        const details = dataTable.rowsHash();
        await returnOrderPage.verifyCreationSuccess();
    }
);
