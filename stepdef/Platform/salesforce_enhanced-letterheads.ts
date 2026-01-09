import { createBdd, DataTable } from "playwright-bdd";
import SalesforceEnhancedLetterheadsPage from "../../pages/Platform/salesforceEnhancedLetterheads";
const { Then } = createBdd();

Then(
    "Add new enhanced letterhead with following details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const details = dataTable.rowsHash();
        const enhancedLetterheadsPage = new SalesforceEnhancedLetterheadsPage(page, $testInfo);
        await enhancedLetterheadsPage.addNewEnhancedLetterhead(details);
    }
);

Then("Verify enhanced letterhead is created successfully", async ({ page, $testInfo }) => {
    const enhancedLetterheadsPage = new SalesforceEnhancedLetterheadsPage(page, $testInfo);
    await enhancedLetterheadsPage.verifyEnhancedLetterheadSuccess();
});
