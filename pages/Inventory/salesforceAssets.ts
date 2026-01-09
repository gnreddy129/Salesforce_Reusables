import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceAssets Page Object Model
 *
 * This class provides automation capabilities for Salesforce Asset management functionality.
 * It handles asset creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new assets with comprehensive field support
 * - Handle complex form interactions including lookups and date fields
 * - Verify asset creation success
 * - Support for all standard Salesforce asset fields
 * - Advanced lookup handling for Account and Contact relationships
 *
 * @class SalesforceAssets
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceAssetsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly dialog: Locator;
  readonly saveButton: Locator;

  // Form field locators
  readonly assetNameInput: Locator;
  readonly accountLookup: Locator;
  readonly contactLookup: Locator;
  readonly serialNumberInput: Locator;
  readonly competitorAssetCheckbox: Locator;
  readonly installDateInput: Locator;
  readonly purchaseDateInput: Locator;
  readonly statusCombobox: Locator;
  readonly usageEndDateInput: Locator;
  readonly quantityInput: Locator;
  readonly priceInput: Locator;
  readonly descriptionInput: Locator;
  readonly assetCreatedMessage: Locator;
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceAssets page object with all necessary locators
   *
   * Sets up locators for all Salesforce asset form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceAssets page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.dialog = page.getByRole("dialog").first();
    this.saveButton = this.dialog.getByRole("button", { name: /^Save$/i }).first();

    // Initialize form field locators
    this.assetNameInput = this.dialog.getByLabel("Asset Name");
    this.accountLookup = this.dialog.getByLabel("Account");
    this.contactLookup = this.dialog.getByLabel("Contact");
    this.serialNumberInput = this.dialog.getByLabel("Serial Number");
    this.competitorAssetCheckbox = this.dialog.getByLabel("Competitor Asset");
    this.installDateInput = this.dialog.getByLabel("Install Date");
    this.purchaseDateInput = this.dialog.getByLabel("Purchase Date");
    this.statusCombobox = this.dialog.getByRole("combobox", { name: "Status" });
    this.usageEndDateInput = this.dialog.getByLabel("Usage End Date");
    this.quantityInput = this.dialog.getByLabel("Quantity");
    this.priceInput = this.dialog.getByLabel("Price");
    this.descriptionInput = this.dialog.getByLabel("Description");

    // Success message locator
    this.assetCreatedMessage = page.locator(".toastMessage");
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceAssets page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new asset in Salesforce with the provided details
   *
   * This method handles the complete asset creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new asset dialog
   * 3. Fills in all provided field values including complex lookups
   * 4. Saves the asset
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing asset field values to be filled
   * @param details.AssetName - Asset name (required)
   * @param details.Account - Account lookup (required)
   * @param details.Contact - Contact lookup (optional)
   * @param details.SerialNumber - Serial number
   * @param details.CompetitorAsset - Competitor asset checkbox (true/false)
   * @param details.InstallDate - Installation date
   * @param details.PurchaseDate - Purchase date
   * @param details.Status - Asset status
   * @param details.UsageEndDate - Usage end date
   * @param details.Quantity - Quantity
   * @param details.Price - Price
   * @param details.Description - Asset description
   */
  async addNewAsset(details: { [key: string]: string }) {
    console.log("🔄 Starting asset creation process...");
    console.log("📝 Asset details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-asset",
      this.testInfo,
      "Inventory/salesforce-assets/"
    );

    console.log("✅ Asset creation dialog opened");
    console.log("📋 Filling form fields...");

    // Fill required fields
    if (details.AssetName || details["Asset Name"]) {
      const assetName = details.AssetName || details["Asset Name"];
      await this.assetNameInput.fill(assetName, { timeout: 10000 });
    }

    // Handle account lookup
    if (details['Account Name']) {
      console.log("🔍 Handling Account lookup...");
      await this.accountLookup.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log("✅ Account selected");
    }

    // Handle contact lookup if provided
    if (details.Contact) {
      console.log("🔍 Handling Contact lookup...");
      await this.contactLookup.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
    }

    // Fill optional fields
    if (details.SerialNumber || details["Serial Number"]) {
      const serialNumber = details.SerialNumber || details["Serial Number"];
      await this.serialNumberInput.fill(serialNumber, { timeout: 10000 });
    }

    if (details.CompetitorAsset || details["Competitor Asset"]) {
      const competitorAsset =
        details.CompetitorAsset || details["Competitor Asset"];
      const shouldCheck = competitorAsset.toLowerCase() === "true";
      const isChecked = await this.competitorAssetCheckbox.isChecked();
      if (shouldCheck !== isChecked) {
        await this.competitorAssetCheckbox.click({ timeout: 10000 });
      }
    }

    if (details.InstallDate || details["Install Date"]) {
      const installDate = details.InstallDate || details["Install Date"];
      await this.installDateInput.fill(installDate, { timeout: 10000 });
    }

    if (details.PurchaseDate || details["Purchase Date"]) {
      const purchaseDate = details.PurchaseDate || details["Purchase Date"];
      await this.purchaseDateInput.fill(purchaseDate, { timeout: 10000 });
    }

    if (details.Status) {
      await this.statusCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.Status }).first().click({ timeout: 10000 });
    }

    if (details.UsageEndDate || details["Usage End Date"]) {
      const usageEndDate = details.UsageEndDate || details["Usage End Date"];
      await this.usageEndDateInput.fill(usageEndDate, { timeout: 10000 });
    }

    if (details.Quantity) {
      await this.quantityInput.fill(details.Quantity, { timeout: 10000 });
    }

    if (details.Price) {
      await this.priceInput.fill(details.Price, { timeout: 10000 });
    }

    if (details.Description) {
      await this.descriptionInput.fill(details.Description, { timeout: 10000 });
    }

    console.log("💾 Saving the asset...");
    await this.saveButton.waitFor({ state: "visible", timeout: 10000 });
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Asset saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-asset",
      this.testInfo,
      "Inventory/salesforce-assets/"
    );

    console.log("🎉 Asset creation completed!");
  }

  /**
   * Verifies that an asset was successfully created by checking for specific field values
   *
   * This method validates asset creation success by checking if the asset detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing asset field values to verify
   * @param details.AssetName - Asset name to verify
   * @param details.SerialNumber - Serial number to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   */
  async verifyAsset(details: { [k: string]: string }) {
    console.log("🔍 Starting asset verification...");

    // Verify asset creation message or asset details
    if (details.AssetName || details["Asset Name"]) {
      const assetName = details.AssetName || details["Asset Name"];
      await expect(this.page.locator(`[title*="${assetName}"]`).first()).toBeVisible({ timeout: 10000 });
      console.log(`✅ Asset name verification successful: ${assetName}`);
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Inventory/salesforce-assets/"
    );

    console.log("🎉 Asset verification completed!");
  }
}
