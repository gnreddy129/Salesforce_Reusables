import { createBdd } from "playwright-bdd";
import SalesforceAuthorizationFormDataUsePage from "../../pages/CustomerData/salesforceAuthorizationFormDataUse";

const { Given, When, Then } = createBdd();

When(
  "Add new Authorization Form Data Use with following details",
  async ({ page, $testInfo }, dataTable) => {
    const authorizationFormDataUsePage =
      new SalesforceAuthorizationFormDataUsePage(page, $testInfo);
    const details = dataTable.rowsHash();
    await authorizationFormDataUsePage.addNewAuthorizationFormDataUse(details);
  }
);

Then(
  "Verify Authorization Form Data Use is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const authorizationFormDataUsePage =
      new SalesforceAuthorizationFormDataUsePage(page, $testInfo);
    const details = dataTable.rowsHash();
    await authorizationFormDataUsePage.verifyAuthorizationFormDataUseCreation(
      details
    );
  }
);
