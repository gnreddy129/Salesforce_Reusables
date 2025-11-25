import { createBdd, DataTable } from "playwright-bdd";
import SalesforceListEmailsPage from "../../pages/OtherFunctionality/salesforceListEmails";

const { Given, Then } = createBdd();

/**
 * Step Definition: Send email with following details
 *
 * This step handles sending an email via the List Emails app with provided details.
 * It initializes the page object and invokes the email sending workflow.
 *
 * @param dataTable - Cucumber DataTable with email field values
 *
 * @example
 * Given Send email with following details
 *   | Recipients | contact@example.com       |
 *   | Subject    | Q4 Marketing Campaign     |
 */
Given(
  "Send email with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log("📝 Step: Send email with following details");

    const details = dataTable.rowsHash();
    console.log("📦 Received email details:", JSON.stringify(details, null, 2));

    // Initialize the page object
    const emailListPage = new SalesforceListEmailsPage(page, $testInfo);

    // Send the email with provided details
    await emailListPage.sendEmail(details);

    console.log("✅ Step completed: Email sent");
  }
);

/**
 * Step Definition: Verify email is sent successfully with details
 *
 * This step validates that the email was successfully sent by verifying
 * the presence of the provided field values in the Salesforce interface.
 *
 * @param dataTable - Cucumber DataTable with email field values to verify
 *
 * @example
 * Then Verify email is sent successfully with details
 *   | Recipients | contact@example.com       |
 *   | Subject    | Q4 Marketing Campaign     |
 */
Then(
  "Verify email is sent successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log("✔️ Step: Verify email is sent successfully with details");

    const details = dataTable.rowsHash();
    console.log("📦 Details to verify:", JSON.stringify(details, null, 2));

    // Initialize the page object
    const emailListPage = new SalesforceListEmailsPage(page, $testInfo);

    // Verify the email sending
    await emailListPage.verifyEmailSent(details);

    console.log("✅ Step completed: Email verified");
  }
);
