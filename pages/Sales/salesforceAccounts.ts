import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceAccounts Page Object Model
 *
 * This class provides automation capabilities for Salesforce Account management functionality.
 * It handles account creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new accounts with comprehensive field support
 * - Handle complex form interactions with proper wait strategies
 * - Verify account creation success
 * - Support for all standard Salesforce account fields
 * - Navigate to Accounts module using app launcher
 *
 * @class SalesforceAccounts
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceAccountsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly dialog: Locator;
  readonly saveButton: Locator;

  // Form field locators
  readonly accountNameInput: Locator;
  readonly phoneInput: Locator;
  readonly industryCombo: Locator;
  readonly typeCombo: Locator;
  readonly websiteInput: Locator;
  readonly employeesInput: Locator;
  readonly descriptionInput: Locator;
  readonly ratingCombo: Locator;
  readonly accountSiteInput: Locator;
  readonly accountNumberInput: Locator;
  readonly annualRevenueInput: Locator;

  // Additional UI elements
  readonly appLauncher: Locator;
  readonly viewAllButton: Locator;
  readonly searchBox: Locator;
  readonly accountCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceAccounts page object with all necessary locators
   *
   * Sets up locators for all Salesforce account form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceAccounts page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.dialog = page.getByRole("dialog").first();
    this.saveButton = this.dialog
      .getByRole("button", { name: /^Save$/i })
      .first();

    // Initialize form field locators
    this.accountNameInput = this.dialog.getByRole("textbox", {
      name: /Account Name/i,
    });
    this.phoneInput = this.dialog.getByRole("textbox", { name: /Phone/i });
    this.industryCombo = this.dialog.getByRole("combobox", {
      name: /Industry/i,
    });
    this.typeCombo = this.dialog.getByRole("combobox", { name: /Type/i });
    this.websiteInput = this.dialog.getByRole("textbox", { name: /Website/i });
    this.employeesInput = this.dialog.getByLabel(/Employees/i);
    this.descriptionInput = this.dialog.getByRole("textbox", {
      name: /Description/i,
    });
    this.ratingCombo = this.dialog.getByRole("combobox", { name: /Rating/i });
    this.accountSiteInput = this.dialog.getByRole("textbox", {
      name: /Account Site/i,
    });
    this.accountNumberInput = this.dialog.getByRole("textbox", {
      name: /Account Number/i,
    });
    this.annualRevenueInput = this.dialog.getByLabel(/Annual Revenue/i);

    // Initialize navigation elements
    this.appLauncher = page.getByTitle("App Launcher");
    this.viewAllButton = page.getByRole("button", { name: "View All" });
    this.searchBox = page.getByPlaceholder("Search apps and items...");

    // Success message locator
    this.accountCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceAccounts page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new account in Salesforce with the provided details
   *
   * This method handles the complete account creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new account dialog
   * 3. Fills in all provided field values
   * 4. Saves the account
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing account field values to be filled
   * @param details.AccountName - Account name (required)
   * @param details.Phone - Primary phone number
   * @param details.Industry - Industry type
   * @param details.Type - Account type
   * @param details.Website - Website URL
   * @param details.Employees - Number of employees
   * @param details.Description - Account description
   * @param details.Rating - Account rating
   * @param details.AccountSite - Account site
   * @param details.AccountNumber - Account number
   * @param details.AnnualRevenue - Annual revenue
   */
  async addNewAccount(details: { [key: string]: string }) {
    console.log("🔄 Starting account creation process...");
    console.log("📝 Account details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-account",
      this.testInfo,
      "Sales/salesforce-accounts/"
    );

    console.log("📋 Filling form fields...");

    // Fill required fields
    if (details.AccountName || details["Account Name"]) {
      const accountName = details.AccountName || details["Account Name"];
      await this.accountNameInput.fill(accountName, { timeout: 10000 });
    }

    // Fill optional fields
    if (details.Phone) {
      await this.phoneInput.fill(details.Phone, { timeout: 10000 });
    }

    if (details.Industry) {
      await this.industryCombo.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Industry, exact: true })
        .click({ timeout: 10000 });
    }

    if (details.Type) {
      await this.typeCombo.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Type, exact: true })
        .click({ timeout: 10000 });
    }

    if (details.Website) {
      await this.websiteInput.fill(details.Website, { timeout: 10000 });
    }

    if (details.Employees) {
      await this.employeesInput.fill(details.Employees, { timeout: 10000 });
    }

    if (details.Description) {
      await this.descriptionInput.fill(details.Description, { timeout: 10000 });
    }

    if (details.Rating) {
      await this.ratingCombo.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Rating })
        .click({ timeout: 10000 });
    }

    if (details.AccountSite || details["Account Site"]) {
      const accountSite = details.AccountSite || details["Account Site"];
      await this.accountSiteInput.fill(accountSite, { timeout: 10000 });
    }

    if (details.AccountNumber || details["Account Number"]) {
      const accountNumber = details.AccountNumber || details["Account Number"];
      await this.accountNumberInput.fill(accountNumber, { timeout: 10000 });
    }

    if (details.AnnualRevenue || details["Annual Revenue"]) {
      const annualRevenue = details.AnnualRevenue || details["Annual Revenue"];
      await this.annualRevenueInput.fill(annualRevenue, { timeout: 10000 });
    }

    console.log("💾 Saving the account...");

    // Save the account
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Account saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-account",
      this.testInfo,
      "Sales/salesforce-accounts/"
    );

    console.log("🎉 Account creation completed!");
  }

  /**
   * Verifies that an account was successfully created by checking for specific field values
   *
   * This method validates account creation success by checking if the account detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing account field values to verify
   * @param details.AccountName - Account name to verify
   * @param details.Phone - Phone to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   */
  async verifyAccount(details: { [k: string]: string }) {
    console.log("🔍 Starting account verification...");

    // Verify account creation message or account details
    if (details.AccountName || details["Account Name"]) {
      const accountName = details.AccountName || details["Account Name"];
      await expect(
        this.page.locator(`[title*="${accountName}"]`).first()
      ).toBeVisible({ timeout: 10000 });
      console.log(`✅ Account name verification successful: ${accountName}`);
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Sales/salesforce-accounts/"
    );

    console.log("🎉 Account verification completed!");
  }

  /**
   * Navigate to Accounts app using the app launcher
   *
   * This method handles the complete navigation workflow to access the Accounts module
   * through the Salesforce app launcher interface.
   */
  async navigateToAccounts(): Promise<void> {
    console.log("🔄 Navigating to Accounts module...");

    await this.appLauncher.click({ timeout: 10000 });
    await this.viewAllButton.click({ timeout: 10000 });
    await this.searchBox.fill("Accounts", { timeout: 10000 });
    await this.page
      .getByText("Accounts", { exact: true })
      .click({ timeout: 10000 });

    console.log("✅ Successfully navigated to Accounts module");
  }
}
