import { createBdd, DataTable } from "playwright-bdd";
import SalesforcePaymentsPage from "../../pages/Finance/salesforcePayments";

const { Given, Then } = createBdd();

/**
 * Step Definition: Add new payment with following details
 *
 * This step handles the creation of a new payment in Salesforce with provided details.
 * It initializes the page object and invokes the payment creation workflow.
 *
 * @param dataTable - Cucumber DataTable with payment field values
 *
 * @example
 * Given Add new payment with following details
 *   | Payment Amount      | 1000.00          |
 *   | Payment Status      | Pending          |
 *   | Payment Method      | Credit Card      |
 *   | Account Name        | Acme Corp        |
 */
Given(
  "Add new payment with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log("📝 Step: Add new payment with following details");

    const details = dataTable.rowsHash();
    console.log("📦 Received payment details:", JSON.stringify(details, null, 2));

    // Initialize the page object
    const paymentsPage = new SalesforcePaymentsPage(page, $testInfo);

    // Add the new payment with provided details
    await paymentsPage.addNewPayment(details);

    console.log("✅ Step completed: Payment added");
  }
);

/**
 * Step Definition: Verify payment is created successfully
 *
 * This step validates that the payment was successfully created by checking
 * that the dialog has closed and we're back on the payments list.
 *
 * @example
 * Then Verify payment is created successfully
 */
Then(
  "Verify payment is created successfully",
  async ({ page, $testInfo }) => {
    console.log("📝 Step: Verify payment is created successfully");

    // Initialize the page object
    const paymentsPage = new SalesforcePaymentsPage(page, $testInfo);

    // Verify the payment creation
    await paymentsPage.verifyPaymentSuccess();

    console.log("✅ Step completed: Payment verification successful");
  }
);
