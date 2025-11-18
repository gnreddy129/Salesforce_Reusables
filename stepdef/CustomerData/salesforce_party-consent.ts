import { createBdd } from "playwright-bdd";
import SalesforcePartyConsentPage from "../../pages/CustomerData/salesforcePartyConsent";

const { Given, When, Then } = createBdd();

When(
  "Add new Party Consent with following details",
  async ({ page, $testInfo }, dataTable) => {
    const partyConsentPage = new SalesforcePartyConsentPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await partyConsentPage.addNewPartyConsent(details);
  }
);

Then(
  "Verify Party Consent is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const partyConsentPage = new SalesforcePartyConsentPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await partyConsentPage.verifyPartyConsentCreation(details);
  }
);
