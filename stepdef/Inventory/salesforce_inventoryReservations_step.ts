import { createBdd, DataTable } from "playwright-bdd";
import SalesforceInventoryReservationsPage from "../../pages/Inventory/salesforceInventoryReservations_page";

const { Given, When, Then } = createBdd();

Then(
    "Add new inventory reservations with following details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const inventoryReservationPage = new SalesforceInventoryReservationsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        await inventoryReservationPage.addNewInventoryReservation(details);
    }
);

Then(
    "Verify inventory reservations is created successfully with details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const inventoryReservationPage = new SalesforceInventoryReservationsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        await inventoryReservationPage.verifyNewlyCreatedInventoryReservation(details);
    }
);