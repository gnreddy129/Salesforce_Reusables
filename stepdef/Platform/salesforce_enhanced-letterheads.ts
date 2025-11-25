import { createBdd, DataTable } from "playwright-bdd";
import SalesforceEnhancedLetterheadsPage from "../../pages/Platform/salesforceEnhancedLetterheads";
const { Then } = createBdd();

/**
 * Step Definition: Add new enhanced letterhead with following details
 *
 * This step handles the creation of a new enhanced letterhead with the provided data table.
 * Maps to the feature file step and interacts with the SalesforceEnhancedLetterheadsPage object.
 *
 * Feature File Usage:
 * Then Add new enhanced letterhead with following details
 */
Then(
    "Add new enhanced letterhead with following details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const details = dataTable.rowsHash();
        const enhancedLetterheadsPage = new SalesforceEnhancedLetterheadsPage(page, $testInfo);
        await enhancedLetterheadsPage.addNewEnhancedLetterhead(details);
    }
);

/**
 * Step Definition: Verify enhanced letterhead is created successfully
 *
 * This step handles the verification that an enhanced letterhead was successfully created
 * by checking if the dialog has closed and we're back on the enhanced letterheads list page.
 *
 * Feature File Usage:
 * Then Verify enhanced letterhead is created successfully
 */
Then("Verify enhanced letterhead is created successfully", async ({ page, $testInfo }) => {
    const enhancedLetterheadsPage = new SalesforceEnhancedLetterheadsPage(page, $testInfo);
    await enhancedLetterheadsPage.verifyEnhancedLetterheadSuccess();
});
