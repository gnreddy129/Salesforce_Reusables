import { createBdd, DataTable } from "playwright-bdd";
import SalesforceRefundsPage from "../../pages/Finance/salesforceRefunds";
import { Helper } from "../../utils/helper";

const { When, Then } = createBdd();

/**
 * Step Definition: Add new refund with following details
 *
 * This step handles the creation of a new refund in Salesforce with provided details.
 * It initializes the page object and invokes the refund creation workflow.
 *
 * @param dataTable - Cucumber DataTable with refund field values
 *
 * @example
 * When Add new refund with following details
 *   | Account          | Testing   |
 *   | Status           | Processed |
 *   | Amount           | 100.00    |
 *   | Type             | Referenced|
 */
When(
  "Add new refund with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log("📝 Step: Add new refund with following details");

    const details = dataTable.rowsHash();
    console.log("📦 Received refund details:", JSON.stringify(details, null, 2));

    // Initialize the page object
    const refundsPage = new SalesforceRefundsPage(page, $testInfo);

    const newButton = page.getByRole("button", { name: /New/i }).first();
    await newButton.click();
    await page.waitForTimeout(2000);

    // Create the new refund with provided details
    await refundsPage.createRefund(details);

    console.log("✅ Step completed: Refund added");
  }
);

/**
 * Step Definition: Verify refund is created with following details
 *
 * This step verifies that a refund was successfully created with specific details.
 * It delegates verification logic to the page object.
 *
 * @param dataTable - DataTable with verification fields (Account, Status, Amount)
 *
 * @example
 * Then Verify refund is created with following details
 *   | Account | Testing    |
 *   | Status  | Processed  |
 *   | Amount  | 1500       |
 */
Then(
  "Verify refund is created successfully",
  async ({ page, $testInfo }) => {
    console.log("📝 Step: Verify refund is created successfully");

    // Initialize the page object
    const refundsPage = new SalesforceRefundsPage(page, $testInfo);

    // Verify the refund with provided details
    await refundsPage.verifyRefundsSuccess();

    console.log("✅ Step completed: Refund verified with all details");
  }
);
