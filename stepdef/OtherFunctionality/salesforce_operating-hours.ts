import { createBdd } from "playwright-bdd";
import SalesforceOperatingHoursPage from "../../pages/OtherFunctionality/salesforceOperatingHours";

const { Given, When, Then } = createBdd();

Then("Add new operating hours with following details", async ({ page, $testInfo }, dataTable) => {
    console.log("🔄 Adding new operating hours...");
    const operatingHoursPage = new SalesforceOperatingHoursPage(page, $testInfo);

    const details = dataTable.rowsHash();
    console.log("📋 Operating Hours Details:", details);

    await operatingHoursPage.addNewOperatingHours(details);
});

When("I add rows to the operating hours with the following details:", async ({ page, $testInfo }, dataTable) => {
    console.log("🔄 Adding multiple rows to operating hours...");
    const operatingHoursPage = new SalesforceOperatingHoursPage(page, $testInfo);

    const rows = dataTable.hashes();
    console.log("📋 Multiple Rows:", rows);

    for (const row of rows) {
        await operatingHoursPage.addOperatingHoursRow(row);
    }
});

Then("Verify operating hours is created successfully", async ({ page, $testInfo }) => {
    console.log("🔍 Verifying operating hours creation...");
    const operatingHoursPage = new SalesforceOperatingHoursPage(page, $testInfo);

    await operatingHoursPage.verifyOperatingHoursSuccess();
    console.log("✅ Operating hours verification completed");
});
