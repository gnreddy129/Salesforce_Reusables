import { createBdd } from "playwright-bdd";
import SalesforceWorkTypeGroupsPage from "../../pages/Service/salesforceWorkTypeGroups";

const { Given, When, Then } = createBdd();

Then("Add new work type group with following details", async ({ page, $testInfo }, dataTable) => {
    console.log("🔄 Adding new work type group...");
    const workTypeGroupsPage = new SalesforceWorkTypeGroupsPage(page, $testInfo);

    const details = dataTable.rowsHash();
    console.log("📋 Work Type Group Details:", details);

    await workTypeGroupsPage.addNewWorkTypeGroup(details);
});

Then("Verify work type group is created successfully", async ({ page, $testInfo }) => {
    console.log("🔍 Verifying work type group creation...");
    const workTypeGroupsPage = new SalesforceWorkTypeGroupsPage(page, $testInfo);

    await workTypeGroupsPage.verifyWorkTypeGroupSuccess();
    console.log("✅ Work type group verification completed");
});
