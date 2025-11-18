import { createBdd } from "playwright-bdd";
import SalesforceAuthorizationFormTextPage from "../../pages/CustomerData/salesforceAuthorizationFormText";

const { Given, When, Then } = createBdd();

Then(
  "Add new Authorization Form Text with following details",
  async ({ page, $testInfo }, dataTable) => {
    const authorizationFormTextPage = new SalesforceAuthorizationFormTextPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await authorizationFormTextPage.addNewAuthorizationFormText(details);
  }
);

Then(
  "Verify Authorization Form Text is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const authorizationFormTextPage = new SalesforceAuthorizationFormTextPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await authorizationFormTextPage.verifyAuthorizationFormTextCreation(
      details
    );
  }
);
