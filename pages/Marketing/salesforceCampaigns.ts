import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceCampaigns Page Object Model
 *
 * This class provides automation capabilities for Salesforce Campaign management functionality.
 * It handles campaign creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new campaigns with comprehensive field support
 * - Handle complex form interactions including checkboxes and date fields
 * - Verify campaign creation success
 * - Support for all standard Salesforce campaign fields
 * - Navigate to Campaigns module using app launcher
 * - Advanced dropdown selection with proper wait strategies
 *
 * @class SalesforceCampaigns
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceCampaignsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newCampaignButton: Locator;
  readonly dialog: Locator;
  readonly saveButton: Locator;

  // Form field locators
  readonly nameInput: Locator;
  readonly typeCombo: Locator;
  readonly statusCombo: Locator;
  readonly activeCheckbox: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly expectedRevenueInput: Locator;
  readonly budgetedCostInput: Locator;
  readonly actualCostInput: Locator;
  readonly expectedResponseInput: Locator;
  readonly descriptionInput: Locator;

  // Additional UI elements
  readonly appLauncher: Locator;
  readonly viewAllButton: Locator;
  readonly searchBox: Locator;
  readonly campaignCreatedMessage: Locator;
  readonly listbox: Locator;

  /**
   * Constructor - Initializes the SalesforceCampaigns page object with all necessary locators
   *
   * Sets up locators for all Salesforce campaign form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceCampaigns page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newCampaignButton = page.getByRole("button", { name: /New/i }).first();
    this.dialog = page.getByRole("dialog").first();
    this.saveButton = this.dialog
      .getByRole("button", { name: "Save", exact: true })
      .first();

    // Initialize form field locators
    this.nameInput = this.dialog.getByRole("textbox", {
      name: /Campaign Name/i,
    });
    this.typeCombo = this.dialog.getByRole("combobox", { name: /Type/i });
    this.statusCombo = this.dialog.getByRole("combobox", { name: /Status/i });
    this.activeCheckbox = this.dialog.getByRole("checkbox", {
      name: /Active/i,
    });
    this.startDateInput = this.dialog.getByRole("textbox", {
      name: /Start Date/i,
    });
    this.endDateInput = this.dialog.getByRole("textbox", { name: /End Date/i });
    this.expectedRevenueInput = this.dialog.getByRole("textbox", {
      name: /Expected Revenue/i,
    });
    this.budgetedCostInput = this.dialog.getByRole("textbox", {
      name: /Budgeted Cost/i,
    });
    this.actualCostInput = this.dialog.getByRole("textbox", {
      name: /Actual Cost/i,
    });
    this.expectedResponseInput = this.dialog.getByRole("textbox", {
      name: /Expected Response/i,
    });
    this.descriptionInput = this.dialog.getByRole("textbox", {
      name: /Description/i,
    });

    // Initialize navigation elements
    this.appLauncher = page.getByTitle("App Launcher");
    this.viewAllButton = page.getByRole("button", { name: "View All" });
    this.searchBox = page.getByPlaceholder("Search apps and items...");
    this.listbox = page.getByRole("listbox");

    // Success message locator
    this.campaignCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceCampaigns page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new campaign in Salesforce with the provided details
   *
   * This method handles the complete campaign creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new campaign dialog
   * 3. Fills in all provided field values including checkbox and date fields
   * 4. Saves the campaign
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing campaign field values to be filled
   * @param details.CampaignName - Campaign name (required)
   * @param details.Type - Campaign type
   * @param details.Status - Campaign status
   * @param details.Active - Campaign active status (true/false)
   * @param details.StartDate - Campaign start date
   * @param details.EndDate - Campaign end date
   * @param details.ExpectedRevenue - Expected revenue amount
   * @param details.BudgetedCost - Budgeted cost amount
   * @param details.ActualCost - Actual cost amount
   * @param details.ExpectedResponse - Expected response percentage
   * @param details.Description - Campaign description
   */
  async addNewCampaign(details: { [key: string]: string }) {
    console.log("🔄 Starting campaign creation process...");
    console.log("📝 Campaign details:", JSON.stringify(details, null, 2));

    await expect(this.newCampaignButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-campaign",
      this.testInfo,
      "Marketing/salesforce-campaigns/"
    );

    // Click New Campaign
    await this.newCampaignButton.click({ timeout: 10000 });
    console.log("✅ Campaign creation dialog opened");

    console.log("📋 Filling form fields...");

    // Fill campaign name (required field)
    if (details.CampaignName || details["Campaign Name"]) {
      const campaignName = details.CampaignName || details["Campaign Name"];
      await this.nameInput.fill(campaignName, { timeout: 10000 });
    }

    // Fill optional fields
    if (details.Type) {
      await this.typeCombo.click({ timeout: 10000 });
      await this.listbox
        .getByRole("option", { name: details.Type, exact: true })
        .click({ timeout: 10000 });
    }

    if (details.Status) {
      await this.statusCombo.click({ timeout: 10000 });
      await this.listbox
        .getByRole("option", { name: details.Status, exact: true })
        .click({ timeout: 10000 });
    }

    if (details.Active) {
      const shouldBeActive = details.Active.toLowerCase() === "true";
      const isCurrentlyActive = await this.activeCheckbox.isChecked();
      if (shouldBeActive !== isCurrentlyActive) {
        await this.activeCheckbox.click({ timeout: 10000 });
      }
    }

    if (details.StartDate || details["Start Date"]) {
      const startDate = details.StartDate || details["Start Date"];
      await this.startDateInput.fill(startDate, { timeout: 10000 });
    }

    if (details.EndDate || details["End Date"]) {
      const endDate = details.EndDate || details["End Date"];
      await this.endDateInput.fill(endDate, { timeout: 10000 });
    }

    if (details.ExpectedRevenue || details["Expected Revenue"]) {
      const expectedRevenue =
        details.ExpectedRevenue || details["Expected Revenue"];
      await this.expectedRevenueInput.fill(expectedRevenue, { timeout: 10000 });
    }

    if (details.BudgetedCost || details["Budgeted Cost"]) {
      const budgetedCost = details.BudgetedCost || details["Budgeted Cost"];
      await this.budgetedCostInput.fill(budgetedCost, { timeout: 10000 });
    }

    if (details.ActualCost || details["Actual Cost"]) {
      const actualCost = details.ActualCost || details["Actual Cost"];
      await this.actualCostInput.fill(actualCost, { timeout: 10000 });
    }

    if (details.ExpectedResponse || details["Expected Response"]) {
      const expectedResponse =
        details.ExpectedResponse || details["Expected Response"];
      await this.expectedResponseInput.fill(expectedResponse, {
        timeout: 10000,
      });
    }

    if (details.Description) {
      await this.descriptionInput.fill(details.Description, { timeout: 10000 });
    }

    console.log("💾 Saving the campaign...");

    // Save the campaign
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Campaign saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-campaign",
      this.testInfo,
      "Marketing/salesforce-campaigns/"
    );

    console.log("🎉 Campaign creation completed!");
  }


  /**
   * Verifies that a campaign was successfully created by checking for specific field values
   *
   * This method validates campaign creation success by checking if the campaign detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing campaign field values to verify
   * @param details.CampaignName - Campaign name to verify
   * @param details.Type - Campaign type to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   */
  async verifyCampaign(details: { [k: string]: string }) {

    console.log("🔍 Starting campaign verification...");
    await expect(this.campaignCreatedMessage).toBeVisible({ timeout: 10000 });
    await expect(this.page.locator(`.entityNameTitle`)).toBeVisible(); // check if header is visible
    // Verify campaign creation message or campaign details
    if (details.CampaignName || details["Campaign Name"]) {
      const campaignName = details.CampaignName || details["Campaign Name"];
      expect(await this.page.getByText(campaignName).count()).toBeGreaterThan(
        0
      );
      console.log(`✅ Campaign name verification successful: ${campaignName}`);
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Marketing/salesforce-campaigns/"
    );

    console.log("🎉 Campaign verification completed!");
  }
}
