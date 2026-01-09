import { createBdd, DataTable } from "playwright-bdd";
import SalesforceCouponsPage from "../../pages/Marketing/salesforceCoupons";

const { Given, Then } = createBdd();

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
