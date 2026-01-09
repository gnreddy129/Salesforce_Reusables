import { createBdd, DataTable } from "playwright-bdd";
import SalesforceRefundsPage from "../../pages/Finance/salesforceRefunds";

const { When, Then } = createBdd();

When(
  "Add new refund with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log("📝 Step: Add new refund with following details");
    const details = dataTable.rowsHash();
    console.log("📦 Received refund details:", JSON.stringify(details, null, 2));
    const refundsPage = new SalesforceRefundsPage(page, $testInfo);
    await refundsPage.createRefund(details);
    console.log("✅ Step completed: Refund added");
  }
);

Then("Verify refund is created successfully",
  async ({ page, $testInfo }) => {
    console.log("📝 Step: Verify refund is created successfully");

    // Initialize the page object
    const refundsPage = new SalesforceRefundsPage(page, $testInfo);
    await refundsPage.verifyRefundsSuccess();
    console.log("✅ Step completed: Refund verified with all details");
  }
);
