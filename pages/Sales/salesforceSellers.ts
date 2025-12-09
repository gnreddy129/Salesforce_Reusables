import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceSellers Page Object Model
 *
 * This class provides automation capabilities for Salesforce Sellers management functionality.
 * It handles seller creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new sellers with comprehensive field support
 * - Handle text fields, combobox, and date field interactions
 * - Verify seller creation success
 * - Support for all standard Salesforce seller fields
 * - Navigate to Sellers module using standard navigation
 * - Complete seller lifecycle management
 *
 * @class SalesforceSellersPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceSellersPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Seller Information Fields
  readonly partyInput: Locator;
  readonly nameInput: Locator;
  readonly sellerTypeCombobox: Locator;
  readonly sellerTierCombobox: Locator;
  readonly salesAmountInput: Locator;
  readonly activeToDateInput: Locator;
  readonly activeFromDateInput: Locator;

  // Navigation Elements
  readonly sellerCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceSellers page object with all necessary locators
   *
   * Sets up locators for all Salesforce seller elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceSellers page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary UI Controls
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", {
      name: "Save & New",
      exact: true,
    });
    this.cancelButton = page.getByRole("button", {
      name: "Cancel",
      exact: true,
    });

    // Seller Information Fields
    this.partyInput = page.getByRole("combobox", {
      name: "Party",
      exact: true,
    });
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
      exact: true,
    });
    this.sellerTypeCombobox = page.getByRole("combobox", {
      name: "Seller Type",
      exact: true,
    });
    this.sellerTierCombobox = page.getByRole("combobox", {
      name: "Seller Tier",
      exact: true,
    });
    this.salesAmountInput = page.getByLabel("Sales Amount", {
      exact: true,
    });
    this.activeToDateInput = page.getByRole("textbox", {
      name: "Active To Date",
      exact: true,
    });
    this.activeFromDateInput = page.getByRole("textbox", {
      name: "Active From Date",
      exact: true,
    });

    // Navigation Elements
    this.sellerCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceSellers page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new seller in Salesforce with the provided details
   *
   * This method handles the complete seller creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new seller creation form
   * 3. Fills in all provided field values
   * 4. Saves the seller
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing seller field values to be filled
   * @param details.Party - Party (text input)
   * @param details.Name - Seller Name (text input)
   * @param details.SellerType - Seller Type (combobox)
   * @param details.SellerTier - Seller Tier (combobox)
   * @param details.SalesAmount - Sales Amount (text input)
   * @param details.ActiveToDate - Active To Date (date input)
   * @param details.ActiveFromDate - Active From Date (date input)
   *
   * @example
   * await sellerPage.addNewSeller({
   *   Party: "ABC Corp",
   *   Name: "John Doe",
   *   SellerType: "Individual",
   *   SellerTier: "Tier 1",
   *   SalesAmount: "50000",
   *   ActiveToDate: "12/31/2025",
   *   ActiveFromDate: "01/01/2025"
   * });
   */
  async addNewSeller(details: { [key: string]: string }) {
    console.log("🔄 Starting seller creation process...");
    console.log("📝 Seller details:", JSON.stringify(details, null, 2));

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-seller",
        this.testInfo,
        "Sales/salesforce-sellers/"
      );
    }

    // Click New Seller
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Seller creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Seller form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Party field (combobox)
    if (details.Party) {
      await this.partyInput.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Party })
        .first()
        .click();
      console.log(`✅ Party filled: ${details.Party}`);
    }

    // Fill Name field (text input)
    if (details.Name) {
      await this.nameInput.fill(details.Name, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Fill Seller Type field (combobox)
    if (details["Seller Type"] && details["Seller Type"] !== "--None--") {
      await this.sellerTypeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details["Seller Type"] })
        .click();
      console.log(`✅ Seller Type selected: ${details["Seller Type"]}`);
    }

    // Fill Seller Tier field (combobox)
    if (details["Seller Tier"] && details["Seller Tier"] !== "--None--") {
      await this.sellerTierCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details["Seller Tier"] })
        .click();
      console.log(`✅ Seller Tier selected: ${details["Seller Tier"]}`);
    }

    // Fill Sales Amount field (text input)
    if (details["Sales Amount"] && details["Sales Amount"] !== "--None--") {
      await this.salesAmountInput.fill(details["Sales Amount"], {
        timeout: 10000,
      });
      console.log(`✅ Sales Amount filled: ${details["Sales Amount"]}`);
    }

    // Fill Active To Date field (date input)
    if (details["Active To Date"] && details["Active To Date"] !== "--None--") {
      await this.activeToDateInput.fill(details["Active To Date"], {
        timeout: 10000,
      });
      console.log(`✅ Active To Date filled: ${details["Active To Date"]}`);
    }

    // Fill Active From Date field (date input)
    if (
      details["Active From Date"] &&
      details["Active From Date"] !== "--None--"
    ) {
      await this.activeFromDateInput.fill(details["Active From Date"], {
        timeout: 10000,
      });
      console.log(`✅ Active From Date filled: ${details["Active From Date"]}`);
    }

    console.log("💾 Saving the seller...");

    // Save the seller
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Seller saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-seller",
        this.testInfo,
        "Sales/salesforce-sellers/"
      );
    }

    console.log("🎉 Seller creation completed!");
  }

  /**
   * Verifies that a seller was successfully created by checking for specific field values
   *
   * This method validates seller creation success by checking if the seller name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing seller field values to verify
   * @param details.Name - Seller Name to verify on the page
   *
   * @throws Will throw an assertion error if expected seller name is not found
   *
   * @example
   * await sellerPage.verifySellerCreation({
   *   Name: "John Doe"
   * });
   */
  async verifySellerCreation(details: { [key: string]: string }) {
    console.log("🔍 Starting seller verification...");

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification-seller",
        this.testInfo,
        "Sales/salesforce-sellers/"
      );
    }

    // Check if the seller name appears in the interface
    const sellerName = details.Name;
    if (sellerName) {
      // Wait for page to load after creation
      await this.page.waitForTimeout(5000);

      // Look for the seller name in the page
      const sellerLocator = this.page.getByText(sellerName).first();
      await expect(sellerLocator).toBeVisible({ timeout: 10000 });
      console.log(`✅ Seller name verification successful: ${sellerName}`);
    }

    console.log("🎉 Seller verification completed!");
  }
}
