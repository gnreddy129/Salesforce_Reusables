import { createBdd } from "playwright-bdd";
import SalesforceAuthorizationFormConsentPage from "../../pages/CustomerData/salesforceAuthorizationFormConsent";

const { Given, When, Then } = createBdd();

When(
  "Add new Authorization Form Consent with following details",
  async ({ page, $testInfo }, dataTable) => {
    const authorizationFormConsentPage =
      new SalesforceAuthorizationFormConsentPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await authorizationFormConsentPage.addNewAuthorizationFormConsent(details);
  }
);

Then(
  "Verify Authorization Form Consent is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const authorizationFormConsentPage =
      new SalesforceAuthorizationFormConsentPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await authorizationFormConsentPage.verifyAuthorizationFormConsentCreation(
      details
    );
  }
);
