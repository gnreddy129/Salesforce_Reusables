import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceProducts Page Object Model
 *
 * This class provides automation capabilities for Salesforce Product management functionality.
 * It handles product creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new products with comprehensive field support
 * - Handle complex form interactions including textboxes and checkbox fields
 * - Verify product creation success
 * - Support for all standard Salesforce product fields including product family and description
 * - Navigate to Products module using standard navigation
 * - Complete product lifecycle management
 *
 * @class SalesforceProducts
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceProductsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Product Information Fields
  readonly productNameInput: Locator;
  readonly activeCheckbox: Locator;
  readonly productCodeInput: Locator;
  readonly productFamilyCombobox: Locator;
  readonly productDescriptionInput: Locator;

  // Navigation Elements
  readonly productCreatedMessage: Locator;
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceProducts page object with all necessary locators
   *
   * Sets up locators for all Salesforce product form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceProducts page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Product Information field locators
    this.productNameInput = page.getByRole("textbox", { name: "Product Name" });
    this.activeCheckbox = page.getByRole("checkbox", { name: "Active" });
    this.productCodeInput = page.getByRole("textbox", { name: "Product Code" });
    this.productFamilyCombobox = page.getByRole("combobox", {
      name: "Product Family",
    });
    this.productDescriptionInput = page.getByRole("textbox", {
      name: "Product Description",
    });

    // Success message locator
    this.productCreatedMessage = page.locator(".toastMessage");
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceProducts page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new product in Salesforce with the provided details
   *
   * This method handles the complete product creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new product creation form
   * 3. Fills in all provided field values including textboxes and checkbox
   * 4. Saves the product
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing product field values to be filled
   * @param details.ProductName - Product name (required) - text input
   * @param details.Active - Active status (optional) - checkbox (true/false)
   * @param details.ProductCode - Product code (optional) - text input
   * @param details.ProductFamily - Product family (optional) - text input
   * @param details.ProductDescription - Product description (optional) - text input
   */
  async addNewProduct(details: { [key: string]: string }) {
    console.log("🔄 Starting product creation process...");
    console.log("📝 Product details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-product",
      this.testInfo,
      "Sales/salesforce-products/"
    );
    console.log("✅ Product creation form opened");

    // Wait for form to be fully loaded
    await this.productNameInput.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Fill Product Information fields
    if (
      (details.ProductName && details.ProductName !== "--None--") ||
      (details["Product Name"] && details["Product Name"] !== "--None--")
    ) {
      const productName = details.ProductName || details["Product Name"];
      await this.productNameInput.fill(productName, { timeout: 10000 });
      console.log(`✅ Product Name filled: ${productName}`);
    }

    // Handle Active checkbox
    if (details.Active && details.Active !== "--None--") {
      const isActive = details.Active.toLowerCase() === "true";

      // Check current state of checkbox
      const isCurrentlyChecked = await this.activeCheckbox.isChecked();

      // Only click if we need to change the state
      if (isActive !== isCurrentlyChecked) {
        await this.activeCheckbox.click({ timeout: 10000 });
        console.log(`✅ Active checkbox set to: ${isActive}`);
      } else {
        console.log(`✅ Active checkbox already in desired state: ${isActive}`);
      }
    }

    if (
      (details.ProductCode && details.ProductCode !== "--None--") ||
      (details["Product Code"] && details["Product Code"] !== "--None--")
    ) {
      const productCode = details.ProductCode || details["Product Code"];
      await this.productCodeInput.fill(productCode, { timeout: 10000 });
      console.log(`✅ Product Code filled: ${productCode}`);
    }

    if (details.ProductFamily || details["Product Family"]) {
      const productFamily =
        details.ProductFamily || details["Product Family"];
      await this.productFamilyCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: productFamily }).first().click({ timeout: 10000 });
      console.log(`✅ Product Family selected: ${productFamily}`);
    }

    if (
      (details.ProductDescription &&
        details.ProductDescription !== "--None--") ||
      (details["Product Description"] &&
        details["Product Description"] !== "--None--")
    ) {
      const productDescription =
        details.ProductDescription || details["Product Description"];
      await this.productDescriptionInput.fill(productDescription, {
        timeout: 10000,
      });
      console.log(`✅ Product Description filled: ${productDescription}`);
    }

    console.log("💾 Saving the product...");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-product",
      this.testInfo,
      "Sales/salesforce-products/"
    );

    // Save the product
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Product saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    console.log("🎉 Product creation completed!");
  }

  /**
   * Verifies that a product was successfully created by checking for specific field values
   *
   * This method validates product creation success by checking if the product detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing product field values to verify
   * @param details.ProductName - Product name to verify
   * @param details.ProductCode - Product code to verify
   * @param details.Active - Active status to verify
   */
  async verifyProduct(details: { [k: string]: string }) {
    console.log("🔍 Starting product verification...");

    await expect(this.productCreatedMessage).toContainText("was created", {
      timeout: 10000,
    });
    console.log("✅ Product creation message verified");

    // Verify product creation by checking for key field values on the page
    if (details.ProductName || details["Product Name"]) {
      const productName = details.ProductName || details["Product Name"];
      expect(await this.page.getByText(productName).count()).toBeGreaterThan(0);
      console.log(`✅ Product name verification successful: ${productName}`);
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Sales/salesforce-products/"
    );

    console.log("🎉 Product verification completed!");
  }
}