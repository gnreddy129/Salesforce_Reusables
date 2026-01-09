import { createBdd, DataTable } from "playwright-bdd";
import SalesforcePaymentsPage from "../../pages/Finance/salesforcePayments";

const { Given, Then } = createBdd();

Given(
  "Add new payment with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log("📝 Step: Add new payment with following details");
    const details = dataTable.rowsHash();
    console.log("📦 Received payment details:", JSON.stringify(details, null, 2));
    const paymentsPage = new SalesforcePaymentsPage(page, $testInfo);
    await paymentsPage.addNewPayment(details);
    console.log("✅ Step completed: Payment added");
  }
);

Then(
  "Verify payment is created successfully",
  async ({ page, $testInfo }) => {
    console.log("📝 Step: Verify payment is created successfully");
    const paymentsPage = new SalesforcePaymentsPage(page, $testInfo);
    await paymentsPage.verifyPaymentSuccess();
    console.log("✅ Step completed: Payment verification successful");
  }
);
