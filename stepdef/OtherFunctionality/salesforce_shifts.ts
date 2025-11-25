import { createBdd, DataTable } from "playwright-bdd";
import SalesforceShiftsPage from "../../pages/OtherFunctionality/salesforceShifts";
const { Then } = createBdd();

/**
 * Step Definition: Add new shift with following details
 *
 * This step handles the creation of a new shift with the provided data table.
 * Maps to the feature file step and interacts with the SalesforceShiftsPage object.
 *
 * Feature File Usage:
 * Then Add new shift with following details
 */
Then(
    "Add new shift with following details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const details = dataTable.rowsHash();
        const shiftsPage = new SalesforceShiftsPage(page, $testInfo);
        await shiftsPage.addNewShift(details);
    }
);

/**
 * Step Definition: Verify shift is created successfully
 *
 * This step handles the verification that a shift was successfully created
 * by checking if the dialog has closed and we're back on the shifts list page.
 *
 * Feature File Usage:
 * Then Verify shift is created successfully
 */
Then("Verify shift is created successfully", async ({ page, $testInfo }) => {
    const shiftsPage = new SalesforceShiftsPage(page, $testInfo);
    await shiftsPage.verifyShiftSuccess();
});
