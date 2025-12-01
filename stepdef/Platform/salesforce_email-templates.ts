import { createBdd, DataTable } from "playwright-bdd";
import { expect } from "@playwright/test";
import SalesforceEmailTemplatesPage from "../../pages/Platform/salesforceEmailTemplates";

const { Given, When, Then } = createBdd();

// Step definition for adding new email template with details
Then(
  "Add new Email Template with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const emailTemplatesPage = new SalesforceEmailTemplatesPage(page, $testInfo);
    const details = dataTable.rowsHash(); 
    console.log(
      "📝 Email Template data received:",
      JSON.stringify(details, null, 2)
    );
    // Call the addNewEmailTemplate method with the provided data
    await emailTemplatesPage.addNewEmailTemplate(details);
  }
);

// Step definition for verifying email template creation
Then(
  "Verify Email Template is created successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const emailTemplatesPage = new SalesforceEmailTemplatesPage(page, $testInfo);
    const details = dataTable.rowsHash(); 
    console.log(
      "📋 Email Template verification data:",
      JSON.stringify(details, null, 2)
    );
    await emailTemplatesPage.verifyEmailTemplateCreation(details);
  }
);
