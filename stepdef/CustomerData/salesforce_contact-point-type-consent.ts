import { createBdd } from "playwright-bdd";
import SalesforceContactPointTypeConsentPage from "../../pages/CustomerData/salesforceContactPointTypeConsent";

const { Given, When, Then } = createBdd();

/**
 * Step Definitions for Salesforce Contact Point Type Consent Feature
 *
 * This file contains all the step definitions for automated testing of Salesforce Contact Point Type Consent
 * functionality. It supports the complete lifecycle of contact point type consent management including
 * creation, form field interaction, and verification processes.
 *
 * Features covered:
 * - New contact point type consent creation with comprehensive field support
 * - Field validation and data entry for all contact point type consent types
 * - Success verification and error handling
 * - Integration with Playwright page objects for robust automation
 *
 * @version 1.0
 * @author Automation Team
 */

When(
  "Add new Contact Point Type Consent with following details",
  async ({ page, $testInfo }, dataTable) => {
    const contactPointTypeConsentPage =
      new SalesforceContactPointTypeConsentPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await contactPointTypeConsentPage.addNewContactPointTypeConsent(details);
  }
);

Then(
  "Verify Contact Point Type Consent is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const contactPointTypeConsentPage =
      new SalesforceContactPointTypeConsentPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await contactPointTypeConsentPage.verifyContactPointTypeConsentCreation(
      details
    );
  }
);
