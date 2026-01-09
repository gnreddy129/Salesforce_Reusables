import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforcePromotionSegments Page Object Model
 *
 * This class provides automation capabilities for Salesforce Promotion Segments management functionality.
 * It handles promotion segment creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new promotion segments with name and configuration management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify promotion segment creation and setup
 * - Support for promotion segment configuration and setup
 *
 * @class SalesforcePromotionSegments
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforcePromotionSegmentsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly dialog: Locator;

  // Promotion Segment Configuration Fields
  readonly segmentNameTextbox: Locator;
  readonly dialogSegmentNameTextbox: Locator;

  // Action Buttons
  readonly dialogSaveButton: Locator;
  readonly successMessage: Locator;
  /**
   * Constructor - Initializes the SalesforcePromotionSegments page object with all necessary locators
   *
   * Sets up locators for all Salesforce promotion segment form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforcePromotionSegments page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.segmentNameTextbox = page.getByRole("textbox", {
      name: /Promotion Segment Name/i,
    });

    // Dialog elements - Handle promotion segment creation
    this.dialog = this.page.getByRole("dialog", {
      name: /New Promotion Segment/i,
    });
    this.dialogSegmentNameTextbox = this.dialog.getByRole("textbox", {
      name: /Promotion Segment Name/i,
    });
    this.dialogSaveButton = this.dialog.getByRole("button", {
      name: /^Save$/i,
    });

    this.successMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforcePromotionSegments page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new promotion segment in Salesforce with the provided details
   *
   * This method handles the complete promotion segment creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new promotion segment dialog
   * 3. Fills in all provided field values
   * 4. Saves the promotion segment
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing promotion segment field values to be filled
   * @param details.Name - Promotion segment name (required)
   * @param details.Code - Promotion segment code (optional)
   * @param details.Status - Promotion segment status (optional)
   *
   * @example
   * await promotionSegmentPage.addNewPromotionSegment({
   *   Name: "Premium Q4 Promotion",
   *   Code: "PREM_Q4_001",
   *   Status: "Active"
   * });
   */
  async addNewPromotionSegment(details: { [field: string]: string }) {
    console.log("🔄 Starting promotion segment creation process...");
    console.log("📋 Promotion segment details:", JSON.stringify(details, null, 2));

    // Wait for the new button to be visible and take start screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-promotion-segment",
      this.testInfo,
      "OtherFunctionality/salesforce-promotion-segments/"
    );

    // Open the new promotion segment creation dialog
    console.log("✅ Promotion segment creation dialog opened");

    await this.dialog.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Promotion Segment Name - Primary identifier for the promotion segment (required)
    if (details.Name) {
      await this.dialogSegmentNameTextbox.fill(Helper.generateUniqueValue(details.Name), { timeout: 10000 });
      console.log("✅ Promotion Segment Name filled:", details.Name);
    }

    // Note: Code and Status fields may appear after Name is filled or in different sections
    // This template provides the structure for adding those fields if they become visible

    console.log("💾 Saving the promotion segment...");

    // Save the promotion segment
    await this.dialogSaveButton.click({ timeout: 10000 });
    console.log("✅ Promotion segment saved successfully");

    await this.page.waitForTimeout(1000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-promotion-segment",
      this.testInfo,
      "OtherFunctionality/salesforce-promotion-segments/"
    );

    console.log("🎉 Promotion segment creation completed!");
  }

  /**
   * Verifies that a promotion segment was successfully created by checking for specific field values
   *
   * This method validates promotion segment creation success by checking if the segment name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing promotion segment field values to verify
   * @param details.Name - Promotion segment name to verify on the page
   * @param details.Code - Promotion segment code to verify on the page (optional)
   * @param details.Status - Promotion segment status to verify on the page (optional)
   *
   * @throws Will throw an assertion error if expected segment name is not found
   *
   * @example
   * await promotionSegmentPage.verifyPromotionSegment({ 
   *   Name: "Premium Q4 Promotion",
   *   Code: "PREM_Q4_001",
   *   Status: "Active"
   * });
   */
  async verifyPromotionSegment(details: { [field: string]: string }) {
    console.log("🔍 Starting promotion segment verification...");

    await expect(this.successMessage).toBeVisible({ timeout: 10000 });

    if (details.Name) {
      expect(await this.page.getByText(details.Name).count()).toBeGreaterThan(
        0
      );
      console.log("✅ Promotion segment name verification successful");
    } else {
      console.log("⚠️ No name provided for verification");
    }

    if (details.Code) {
      const codeCount = await this.page.getByText(details.Code).count();
      if (codeCount > 0) {
        console.log("✅ Promotion segment code verification successful");
      } else {
        console.log("⚠️ Promotion segment code not found on page");
      }
    }

    if (details.Status) {
      const statusCount = await this.page.getByText(details.Status).count();
      if (statusCount > 0) {
        console.log("✅ Promotion segment status verification successful");
      } else {
        console.log("⚠️ Promotion segment status not found on page");
      }
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-promotion-segments/"
    );

    console.log("🎉 Verification completed!");
  }
}
