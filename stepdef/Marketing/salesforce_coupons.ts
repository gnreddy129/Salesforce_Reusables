import { createBdd, DataTable } from "playwright-bdd";
import SalesforceCouponsPage from "../../pages/Marketing/salesforceCoupons";

const { Given, Then } = createBdd();

/**
 * Step Definition: Add new coupon with following details
 *
 * This step handles the creation of a new coupon in Salesforce with provided details.
 * It initializes the page object and invokes the coupon creation workflow.
 *
 * @param dataTable - Cucumber DataTable with coupon field values
 *
 * @example
 * Given Add new coupon with following details
 *   | Code            | SAVE20        |
 *   | Discount Amount | 20            |
 *   | Discount Type   | Percentage    |
 *   | Expiration Date | 12/31/2025    |
 */
Given(
  "Add new coupon with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log("📝 Step: Add new coupon with following details");

    const details = dataTable.rowsHash();
    console.log("📦 Received coupon details:", JSON.stringify(details, null, 2));

    // Initialize the page object
    const couponsPage = new SalesforceCouponsPage(page, $testInfo);

    // Add the new coupon with provided details
    await couponsPage.addNewCoupon(details);

    console.log("✅ Step completed: Coupon added");
  }
);

/**
 * Step Definition: Verify coupon is created successfully with details
 *
 * This step validates that the coupon was successfully created by verifying
 * the presence of the provided field values in the Salesforce interface.
 *
 * @param dataTable - Cucumber DataTable with coupon field values to verify
 *
 * @example
 * Then Verify coupon is created successfully with details
 *   | Code            | SAVE20 |
 *   | Promotion | Summer Promotion |
 */
Then(
  "Verify coupon is created successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log(
      "✔️ Step: Verify coupon is created successfully with details"
    );

    const details = dataTable.rowsHash();
    console.log("📦 Details to verify:", JSON.stringify(details, null, 2));

    // Initialize the page object
    const couponsPage = new SalesforceCouponsPage(page, $testInfo);

    // Verify the coupon creation
    await couponsPage.verifyCoupon(details);

    console.log("✅ Step completed: Coupon verified");
  }
);

/**
 * Step Definition: Verify coupon is created successfully (simple verification)
 *
 * This step validates that the coupon creation succeeded without requiring
 * specific field verification. It simply checks that the dialog closed and
 * we're back on the coupon list page.
 *
 * @example
 * Then Verify coupon is created successfully
 */
Then(
  "Verify coupon is created successfully",
  async ({ page, $testInfo }) => {
    console.log("✔️ Step: Verify coupon is created successfully");

    // Initialize the page object
    const couponsPage = new SalesforceCouponsPage(page, $testInfo);

    // Perform simple verification
    await couponsPage.verifyCouponSuccess();

    console.log("✅ Step completed: Coupon creation verified");
  }
);
