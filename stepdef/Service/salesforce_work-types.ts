import { createBdd } from "playwright-bdd";
import SalesforceWorkTypesPage from "../../pages/Service/salesforceWorkTypes";
const { Given, When, Then } = createBdd();

Then("Add new work type with following details", async ({ page, $testInfo }, dataTable) => {
    console.log("🔄 Adding new work type...");
    const workTypesPage = new SalesforceWorkTypesPage(page, $testInfo);

    const details = dataTable.rowsHash();
    console.log("📋 Work Type Details:", details);

    await workTypesPage.addNewWorkType(details);
});

Then("Verify work type is created successfully", async ({ page, $testInfo }) => {
    console.log("🔍 Verifying work type creation...");
    const workTypesPage = new SalesforceWorkTypesPage(page, $testInfo);

    await workTypesPage.verifyWorkTypeSuccess();
    console.log("✅ Work type verification completed");
});
