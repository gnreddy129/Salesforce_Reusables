import { createBdd, DataTable } from "playwright-bdd";
import SalesforceWorkStepTemplatesPage from "../../pages/OtherFunctionality/salesforceWorkStepTemplates";

const { Given, When, Then } = createBdd();

When(
  "I create a new work step template with the following details:",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log(
      "🎯 Step: Creating new work step template with provided details"
    );
    const workStepTemplatesPage = new SalesforceWorkStepTemplatesPage(
      page,
      $testInfo
    );
    await workStepTemplatesPage.addNewWorkStepTemplate(dataTable.rowsHash());
  }
);

Then(
  "I should see the work step template creation success",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log("🎯 Step: Verifying work step template creation success");
    const workStepTemplatesPage = new SalesforceWorkStepTemplatesPage(
      page,
      $testInfo
    );
    await workStepTemplatesPage.verifyWorkStepTemplate(dataTable.rowsHash());
  }
);
