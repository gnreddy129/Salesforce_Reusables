import { createBdd } from "playwright-bdd";
import SalesforceContactPointConsentPage from "../../pages/CustomerData/salesforceContactPointConsent";

const { Given, When, Then } = createBdd();

/**
 * Step Definitions for Salesforce Contact Point Consent Feature
 *
 * This file contains all the step definitions for automated testing of Salesforce Contact Point Consent
 * functionality. It supports the complete lifecycle of contact point consent management including
 * creation, form field interaction, and verification processes.
 *
 * Features covered:
 * - New contact point consent creation with comprehensive field support
 * - Field validation and data entry for all contact point consent types
 * - Success verification and error handling
 * - Integration with Playwright page objects for robust automation
 *
 * @version 1.0
 * @author Automation Team
 */

When(
  "Add new Contact Point Consent with following details",
  async ({ page, $testInfo }, dataTable) => {
    const contactPointConsentPage = new SalesforceContactPointConsentPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await contactPointConsentPage.addNewContactPointConsent(details);
  }
);

Then(
  "Verify Contact Point Consent is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const contactPointConsentPage = new SalesforceContactPointConsentPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await contactPointConsentPage.verifyContactPointConsentCreation(details);
  }
);
