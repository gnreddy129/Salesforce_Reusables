import { createBdd } from "playwright-bdd";
import SalesforceAuthorizationFormPage from "../../pages/CustomerData/salesforceAuthorizationForm";

const { Given, When, Then } = createBdd();

When(
  "Add new Authorization Form with following details",
  async ({ page, $testInfo }, dataTable) => {
    const authorizationFormPage = new SalesforceAuthorizationFormPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await authorizationFormPage.addNewAuthorizationForm(details);
  }
);

Then(
  "Verify Authorization Form is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const authorizationFormPage = new SalesforceAuthorizationFormPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await authorizationFormPage.verifyAuthorizationFormCreation(details);
  }
);
