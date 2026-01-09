import { createBdd, DataTable } from "playwright-bdd";
import SalesforcePromotionsPage from "../../pages/Marketing/salesforcePromotions";
const { Then } = createBdd();

Then(
    "Add new promotion with following details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const details = dataTable.rowsHash();
        const promotionsPage = new SalesforcePromotionsPage(page, $testInfo);
        await promotionsPage.addNewPromotion(details);
    }
);

Then("Verify promotion is created successfully", async ({ page, $testInfo }) => {
    const promotionsPage = new SalesforcePromotionsPage(page, $testInfo);
    await promotionsPage.verifyPromotionSuccess();
});
