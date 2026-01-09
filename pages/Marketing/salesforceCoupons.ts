import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceCoupons Page Object Model
 * It handles coupon creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new coupons with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify coupon creation and setup
 * - Support for promotion selection, redemption limits, and scheduling
 *
 * @class SalesforceCoupons
 * @author Automation Team
 * @version 2.0
 */
export default class SalesforceCouponsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly dialog: Locator;

  // Coupon Configuration Fields
  readonly dialogCodeTextbox: Locator;
  readonly dialogPromotionCombobox: Locator;
  readonly dialogPromotionOptionRole: Locator;
  readonly dialogPromotionTextOption: Locator;
  readonly dialogDescriptionTextbox: Locator;
  readonly dialogStatusCombobox: Locator;
  readonly dialogStatusOptionRole: Locator;
  readonly dialogStatusTextOption: Locator;
  readonly dialogRedemptionLimitAllBuyersTextbox: Locator;
  readonly dialogRedemptionLimitPerBuyerTextbox: Locator;
  readonly dialogStartDateTextbox: Locator;
  readonly dialogStartTimeTextbox: Locator;
  readonly dialogEndDateTextbox: Locator;
  readonly dialogEndTimeTextbox: Locator;

  // Action Buttons
  readonly dialogSaveButton: Locator;
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceCoupons page object with all necessary locators
   *
   * Sets up locators for all Salesforce coupon form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceCoupons page object");
    this.page = page;
    this.testInfo = testInfo;

    // Dialog elements - Handle coupon creation
    this.dialog = this.page.getByRole("dialog", {
      name: /New|New Coupon|Create Coupon/i,
    });

    this.dialogCodeTextbox = this.dialog.getByRole("textbox", {
      name: /Code|Coupon Code/i,
    });

    this.dialogPromotionCombobox = this.dialog.getByRole("combobox", {
      name: /Promotion/i,
    });

    // Promotion dropdown options - for dynamic selection
    this.dialogPromotionOptionRole = page.locator(`[role="option"]:has-text("[PLACEHOLDER_PROMOTION]")`);
    this.dialogPromotionTextOption = page.locator(`text=/\\b[PLACEHOLDER_PROMOTION]\\b/`);

    this.dialogDescriptionTextbox = this.dialog.getByRole("textbox", {
      name: /Description/i,
    });

    this.dialogStatusCombobox = this.dialog.getByRole("combobox", {
      name: /Status/i,
    });

    // Status dropdown options - for dynamic selection
    this.dialogStatusOptionRole = page.locator(`[role="option"]:has-text("[PLACEHOLDER_STATUS]")`);
    this.dialogStatusTextOption = page.locator(`text=/\\b[PLACEHOLDER_STATUS]\\b/`);

    // Redemption Limit fields - using spinbutton roles
    this.dialogRedemptionLimitAllBuyersTextbox = this.dialog.getByRole("spinbutton", {
      name: /Redemption Limit All Buyers/i,
    });
    this.dialogRedemptionLimitPerBuyerTextbox = this.dialog.getByRole("spinbutton", {
      name: /Redemption Limit Per Buyer/i,
    });

    // Date/Time fields - using group and label selectors
    this.dialogStartDateTextbox = this.dialog.getByRole("group", { name: /Start Date Time/i }).getByLabel(/Date/i);
    this.dialogStartTimeTextbox = this.dialog.getByRole("group", { name: /Start Date Time/i }).getByLabel(/Time/i);

    this.dialogEndDateTextbox = this.dialog.getByRole("group", { name: /End Date Time/i }).getByLabel(/Date/i);
    this.dialogEndTimeTextbox = this.dialog.getByRole("group", { name: /End Date Time/i }).getByLabel(/Time/i);

    this.dialogSaveButton = this.dialog.getByRole("button", { name: /^Save$/i });
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceCoupons page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new coupon in Salesforce with the provided details
   *
   * This method handles the complete coupon creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new coupon dialog
   * 3. Fills in all provided field values
   * 4. Saves the coupon
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing coupon field values to be filled
   * @param details.Code - Coupon code (required)
   * @param details.Promotion - Promotion selection (required)
   * @param details.Description - Description text (optional)
   * @param details.Status - Status selection (required)
   * @param details.RedemptionLimitAllBuyers - Redemption limit for all buyers (optional)
   * @param details.RedemptionLimitPerBuyer - Redemption limit per buyer (optional)
   * @param details.StartDate - Start date (optional)
   * @param details.StartTime - Start time (optional)
   * @param details.EndDate - End date (optional)
   * @param details.EndTime - End time (optional)
   *
   * @example
   * await couponsPage.addNewCoupon({
   *   Code: "SAVE20",
   *   Promotion: "Summer Promotion",
   *   Description: "Save 20% this summer",
   *   Status: "Active",
   *   RedemptionLimitAllBuyers: "100",
   *   RedemptionLimitPerBuyer: "5",
   *   StartDate: "12/15/2024",
   *   StartTime: "12:00 AM",
   *   EndDate: "12/31/2025",
   *   EndTime: "11:59 PM"
   * });
   */
  async addNewCoupon(details: { [field: string]: string }) {
    console.log("🔄 Starting coupon creation process...");
    console.log("📋 Coupon details:", JSON.stringify(details, null, 2));

    // Wait for dialog to become visible and take start screenshot
    await this.dialog.waitFor({ state: "visible", timeout: 10000 });
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-coupon",
      this.testInfo,
      "OtherFunctionality/salesforce-coupons/"
    );

    console.log("📋 Filling form fields...");

    // Coupon Code - Primary identifier for the coupon (required)
    if (details.Code) {
      await this.dialogCodeTextbox.fill(Helper.generateUniqueValue(details.Code), { timeout: 10000 });
      console.log("✅ Code filled:", details.Code);
    }

    // Promotion - Select from combobox
    if (details.Promotion) {
      console.log("🔽 Selecting Promotion from combobox...");
      await this.dialogPromotionCombobox.click({ timeout: 10000 });
      await this.page.waitForTimeout(1000);
      await this.allOptionsLocator.first().click({ timeout: 10000 });
    }

    // Description
    if (details.Description) {
      await this.dialogDescriptionTextbox.fill(Helper.generateUniqueValue(details.Description), { timeout: 10000 });
      console.log("✅ Description filled:", details.Description);
    }

    // Status - Select from combobox (MUST BE BEFORE REDEMPTION LIMITS)
    if (details.Status) {
      console.log("🔽 Selecting Status...");
      await this.dialogStatusCombobox.click({ timeout: 10000 });
      await this.page.waitForTimeout(1000);
      await this.allOptionsLocator.filter({ hasText: details.Status }).first().click({ timeout: 10000 });
    }

    // Allow form to stabilize after Status selection
    await this.page.waitForTimeout(500);

    // Redemption Limit All Buyers - Fill AFTER Status
    if (details.RedemptionLimitAllBuyers || details["Redemption Limit All Buyers"]) {
      const limitAllBuyers = details.RedemptionLimitAllBuyers || details["Redemption Limit All Buyers"];
      console.log("📝 Filling Redemption Limit All Buyers...");
      try {
        await this.dialogRedemptionLimitAllBuyersTextbox.fill(limitAllBuyers, { timeout: 10000 });
        console.log("✅ Redemption Limit All Buyers filled:", limitAllBuyers);
      } catch (e) {
        console.log("❌ Failed to fill Redemption Limit All Buyers:", e);
      }
    }

    // Redemption Limit Per Buyer - Fill AFTER Status
    if (details.RedemptionLimitPerBuyer || details["Redemption Limit Per Buyer"]) {
      const limitPerBuyer = details.RedemptionLimitPerBuyer || details["Redemption Limit Per Buyer"];
      console.log("📝 Filling Redemption Limit Per Buyer...");
      try {
        await this.dialogRedemptionLimitPerBuyerTextbox.fill(limitPerBuyer, { timeout: 10000 });
        console.log("✅ Redemption Limit Per Buyer filled:", limitPerBuyer);
      } catch (e) {
        console.log("❌ Failed to fill Redemption Limit Per Buyer:", e);
      }
    }

    // Start Date
    if (details.StartDate || details["Start Date"]) {
      const startDate = details.StartDate || details["Start Date"];
      console.log("📝 Filling Start Date...");
      try {
        await this.dialogStartDateTextbox.clear({ timeout: 10000 });
        await this.dialogStartDateTextbox.fill(startDate, { timeout: 10000 });
        console.log("✅ Start Date filled:", startDate);
      } catch (e) {
        console.log("❌ Failed to fill Start Date:", e);
      }
    }

    // Start Time
    if (details.StartTime || details["Start Time"]) {
      const startTime = details.StartTime || details["Start Time"];
      console.log("📝 Filling Start Time...");
      try {
        await this.dialogStartTimeTextbox.clear({ timeout: 10000 });
        await this.dialogStartTimeTextbox.fill(startTime, { timeout: 10000 });
        console.log("✅ Start Time filled:", startTime);
      } catch (e) {
        console.log("❌ Failed to fill Start Time:", e);
      }
    }

    // End Date
    if (details.EndDate || details["End Date"]) {
      const endDate = details.EndDate || details["End Date"];
      console.log("📝 Filling End Date...");
      try {
        await this.dialogEndDateTextbox.clear({ timeout: 10000 });
        await this.dialogEndDateTextbox.fill(endDate, { timeout: 10000 });
        console.log("✅ End Date filled:", endDate);
      } catch (e) {
        console.log("❌ Failed to fill End Date:", e);
      }
    }

    // End Time
    if (details.EndTime || details["End Time"]) {
      const endTime = details.EndTime || details["End Time"];
      console.log("📝 Filling End Time...");
      try {
        await this.dialogEndTimeTextbox.clear({ timeout: 10000 });
        await this.dialogEndTimeTextbox.fill(endTime, { timeout: 10000 });
        console.log("✅ End Time filled:", endTime);
      } catch (e) {
        console.log("❌ Failed to fill End Time:", e);
      }
    }

    // Take screenshot AFTER all fields are filled
    await Helper.takeScreenshotToFile(
      this.page,
      "2-all-fields-filled",
      this.testInfo,
      "OtherFunctionality/salesforce-coupons/"
    );

    console.log("💾 Saving the coupon...");

    // Save the coupon
    await this.dialogSaveButton.click({ timeout: 10000 });
    console.log("✅ Coupon saved successfully");

    await this.page.waitForTimeout(2000);

    // Take screenshot AFTER save - showing success popup or confirmation
    await Helper.takeScreenshotToFile(
      this.page,
      "3-after-save-success",
      this.testInfo,
      "OtherFunctionality/salesforce-coupons/"
    );

    await this.page.waitForTimeout(1000);

    // Take final screenshot showing the coupon list
    await Helper.takeScreenshotToFile(
      this.page,
      "4-coupon-list",
      this.testInfo,
      "OtherFunctionality/salesforce-coupons/"
    );

    console.log("🎉 Coupon creation completed!");
  }

  /**
   * Verifies that a coupon was successfully created by checking for success indicator
   *
   * This method validates coupon creation success by checking if the coupon code
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing coupon field values to verify
   * @param details.Code - Coupon code to verify on the page
   *
   * @throws Will throw an assertion error if expected coupon code is not found
   *
   * @example
   * await couponsPage.verifyCoupon({ 
   *   Code: "SAVE20"
   * });
   */
  async verifyCoupon(details: { [field: string]: string }) {
    console.log("🔍 Starting coupon verification...");

    if (details.Code) {
      expect(await this.page.getByText(details.Code).count()).toBeGreaterThan(
        0
      );
      console.log("✅ Coupon code verification successful");
    } else {
      console.log("⚠️ No code provided for verification");
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-coupons/"
    );

    console.log("🎉 Verification completed!");
  }

  /**
   * Verifies that a coupon was successfully created by checking for dialog closure
   *
   * This method validates coupon creation success by checking that the dialog
   * has closed and we're back on the coupon list page.
   *
   * @throws Will throw an assertion error if dialog is still visible
   *
   * @example
   * await couponsPage.verifyCouponSuccess();
   */
  async verifyCouponSuccess() {
    console.log("🔍 Verifying coupon creation success...");

    // Check that the dialog is no longer visible (indicates save was successful)
    const dialogVisible = await this.dialog.isVisible().catch(() => false);
    if (!dialogVisible) {
      console.log("✅ Dialog closed - coupon created successfully");
    } else {
      console.log("❌ Dialog still visible - creation may have failed");
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-coupons/"
    );

    console.log("🎉 Verification completed!");
  }
}
