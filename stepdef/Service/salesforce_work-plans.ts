import { createBdd } from "playwright-bdd";
import SalesforceWorkPlansPage from "../../pages/Service/salesforceWorkPlans";
const { Given, When, Then } = createBdd();

Then("Add new work plan with following details", async ({ page, $testInfo }, dataTable) => {
    console.log("🔄 Adding new work plan...");
    const workPlansPage = new SalesforceWorkPlansPage(page, $testInfo);

    const details = dataTable.rowsHash();
    console.log("📋 Work Plan Details:", details);

    await workPlansPage.addNewWorkPlan(details);
});

Then("Verify work plan is created successfully", async ({ page, $testInfo }) => {
    console.log("🔍 Verifying work plan creation...");
    const workPlansPage = new SalesforceWorkPlansPage(page, $testInfo);

    await workPlansPage.verifyWorkPlanSuccess();
    console.log("✅ Work plan verification completed");
});
