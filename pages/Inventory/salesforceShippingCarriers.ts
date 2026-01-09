import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceShippingCarriers Page Object Model
 *
 * This class provides automation capabilities for Salesforce Shipping Carriers management functionality.
 * It handles shipping carrier creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new shipping carriers with comprehensive field support
 * - Handle text fields and form interactions
 * - Verify shipping carrier creation success
 * - Support for all standard Salesforce shipping carrier fields
 * - Navigate to Shipping Carriers module using standard navigation
 * - Complete shipping carrier lifecycle management
 *
 * @class SalesforceShippingCarriersPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceShippingCarriersPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Shipping Carrier Information Fields
  readonly nameInput: Locator;
  readonly externalReferenceInput: Locator;

  // Navigation Elements
  readonly shippingCarrierCreatedMessage: Locator;

  // Verification locators
  readonly primaryFieldLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceShippingCarriers page object with all necessary locators
   *
   * Sets up locators for all Salesforce shipping carrier elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceShippingCarriers page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Shipping Carrier Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });
    this.externalReferenceInput = page.getByRole("textbox", {
      name: "External Reference",
    });

    // Success message locator
    this.shippingCarrierCreatedMessage = page.locator(".toastMessage");

    // Verification locators
    this.primaryFieldLocator = page.locator(`[slot="primaryField"]`);

    console.log(
      "✅ SalesforceShippingCarriers page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new shipping carrier in Salesforce with the provided details
   *
   * This method handles the complete shipping carrier creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new shipping carrier creation form
   * 3. Fills in all provided field values
   * 4. Saves the shipping carrier
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing shipping carrier field values to be filled
   * @param details.Name - Shipping Carrier Name (text input)
   * @param details.ExternalReference - External Reference (text input)
   *
   * @example
   * await shippingCarrierPage.addNewShippingCarrier({
   *   Name: "FedEx Express",
   *   ExternalReference: "FEDEX-001"
   * });
   */
  async addNewShippingCarrier(details: { [key: string]: string }) {
    console.log("� Starting shipping carrier creation process...");
    console.log(
      "📝 Shipping Carrier details:",
      JSON.stringify(details, null, 2)
    );

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-shipping-carrier",
        this.testInfo,
        "Inventory/salesforce-shipping-carriers/"
      );
    }

    // Click New Shipping Carrier
    console.log("✅ Shipping Carrier creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Shipping Carrier form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name) {
      await this.nameInput.fill(Helper.generateUniqueValue(details.Name), {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Fill External Reference field (text input)
    if (details.ExternalReference && details.ExternalReference !== "--None--") {
      await this.externalReferenceInput.fill(Helper.generateUniqueValue(details.ExternalReference), {
        timeout: 10000,
      });
      console.log(`✅ External Reference filled: ${details.ExternalReference}`);
    }

    console.log("💾 Saving the shipping carrier...");

    // Save the shipping carrier
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Shipping Carrier saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-shipping-carrier",
        this.testInfo,
        "Inventory/salesforce-shipping-carriers/"
      );
    }

    console.log("🎉 Shipping Carrier creation completed!");
  }

  /**
   * Verifies that a shipping carrier was successfully created by checking for specific field values
   *
   * This method validates shipping carrier creation success by checking if the shipping carrier detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing shipping carrier field values to verify
   * @param details.Name - Shipping Carrier Name to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await shippingCarrierPage.verifyShippingCarrierCreation({
   *   Name: "FedEx Express"
   * });
   */
  async verifyShippingCarrierCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting shipping carrier verification...");
    const nameValue = details.Name;
    console.log(`📝 Verifying Shipping Carrier: ${nameValue}`);
    await expect(this.shippingCarrierCreatedMessage).toContainText(
      "was created"
    );
    await expect(this.primaryFieldLocator).toContainText(
      nameValue
    );

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification",
        this.testInfo,
        "Inventory/salesforce-shipping-carriers/"
      );
    }

    console.log("🎉 Shipping Carrier verification completed!");
  }
}
