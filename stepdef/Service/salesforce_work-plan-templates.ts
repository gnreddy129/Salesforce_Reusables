import { createBdd } from "playwright-bdd";
import SalesforceWorkPlanTemplatesPage from "../../pages/Service/salesforceWorkPlanTemplates";

const { Given, When, Then } = createBdd();

Then("Add new work plan template with following details", async ({ page, $testInfo }, dataTable) => {
    console.log("🔄 Adding new work plan template...");
    const workPlanTemplatesPage = new SalesforceWorkPlanTemplatesPage(page, $testInfo);

    const details = dataTable.rowsHash();
    console.log("📋 Work Plan Template Details:", details);

    await workPlanTemplatesPage.addNewWorkPlanTemplate(details);
});

Then("Verify work plan template is created successfully", async ({ page, $testInfo }) => {
    console.log("🔍 Verifying work plan template creation...");
    const workPlanTemplatesPage = new SalesforceWorkPlanTemplatesPage(page, $testInfo);

    await workPlanTemplatesPage.verifyWorkPlanTemplateSuccess();
    console.log("✅ Work plan template verification completed");
});
