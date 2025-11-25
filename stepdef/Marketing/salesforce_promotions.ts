import { createBdd, DataTable } from "playwright-bdd";
import SalesforcePromotionsPage from "../../pages/Marketing/salesforcePromotions";
const { Then } = createBdd();

/**
 * Step Definition: Add new promotion with following details
 *
 * This step handles the creation of a new promotion with the provided data table.
 * Maps to the feature file step and interacts with the SalesforcePromotionsPage object.
 *
 * Feature File Usage:
 * Then Add new promotion with following details
 */
Then(
    "Add new promotion with following details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const details = dataTable.rowsHash();
        const promotionsPage = new SalesforcePromotionsPage(page, $testInfo);
        await promotionsPage.addNewPromotion(details);
    }
);

/**
 * Step Definition: Verify promotion is created successfully
 *
 * This step handles the verification that a promotion was successfully created
 * by checking if the dialog has closed and we're back on the promotions list page.
 *
 * Feature File Usage:
 * Then Verify promotion is created successfully
 */
Then("Verify promotion is created successfully", async ({ page, $testInfo }) => {
    const promotionsPage = new SalesforcePromotionsPage(page, $testInfo);
    await promotionsPage.verifyPromotionSuccess();
});
