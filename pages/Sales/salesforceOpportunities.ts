import { createBdd, DataTable } from "playwright-bdd";
import { expect, type Locator, type Page, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";


/**
 * SalesforceOpportunities Page Object Model
 *
 * This class provides automation capabilities for Salesforce Opportunity management functionality.
 * It handles opportunity creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new opportunities with various field types (text, dropdowns, dates, amounts)
 * - Handle complex form interactions with proper wait strategies
 * - Verify opportunity creation success
 * - Support for all standard Salesforce opportunity fields
 *
 * @class salesforceOpportunitiesLocators
 * @author Automation Team
 * @version 1.0
 */
export class SalesforceOpportunitiesPage {
  readonly page: Page;
  private testInfo?: TestInfo;
  // Primary Action Buttons
  readonly newOpportunityButton: Locator;
  readonly saveButton: Locator;
  readonly dialog: Locator;
  readonly dialogSave: Locator;

  // Basic Information Fields
  readonly opportunityName: Locator;
  readonly closeDate: Locator;
  readonly amount: Locator;

  // Dropdown Fields
  readonly stage: Locator;
  readonly type: Locator;
  readonly leadSource: Locator;

  // Text Fields
  readonly description: Locator;
  readonly nextStep: Locator;

  // Checkbox Fields
  readonly private: Locator;

  /**
   * Constructor - Initializes the SalesforceOpportunities page object with all necessary locators
   *
   * Sets up locators for all Salesforce opportunity form elements using role-based selectors
   * for maximum reliability. Uses dialog-scoped locators for better element isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceOpportunities page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary action buttons - Opportunity creation and saving
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });

    // Dialog-specific elements for better isolation
    this.dialog = this.page.getByRole("dialog", {
      name: /New Opportunity/i,
    });
    this.dialogSave = this.dialog.getByRole("button", { name: /^Save$/i });

    // Basic opportunity information fields
    this.opportunityName = page.getByRole("textbox", {
      name: /Opportunity Name/i,
    });
    this.closeDate = page.getByRole("textbox", { name: /Close Date/i });
    this.amount = page.getByRole("spinbutton", { name: /Amount/i });

    // Dropdown fields for opportunity categorization
    this.type = page.getByRole("combobox", { name: /Type/i });
    this.stage = page.getByRole("combobox", { name: /Stage/i });
    this.leadSource = page.getByRole("combobox", { name: /Lead Source/i });

    // Additional text fields
    this.nextStep = page.getByRole("textbox", { name: /Next Step/i });
    this.description = page.getByRole("textbox", { name: /Description/i });

    // Boolean fields
    this.private = page.getByRole("checkbox", { name: /Private/i });

    console.log(
      "✅ SalesforceOpportunities page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new opportunity in Salesforce with the provided details
   *
   * This method handles the complete opportunity creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new opportunity dialog
   * 3. Fills in all provided field values (text, dropdowns, dates, amounts, checkboxes)
   * 4. Saves the opportunity
   * 5. Takes an end screenshot for verification
   *
   * All actions include proper wait strategies for reliable execution in various
   * network conditions. The method supports both required and optional fields.
   *
   * @param details - Object containing opportunity field values to be filled
   * @param details.Name - Opportunity name (typically required)
   * @param details.CloseDate - Expected close date in DD/MM/YYYY format
   * @param details.Stage - Opportunity stage (e.g., "Prospecting", "Qualification")
   * @param details.Type - Opportunity type (e.g., "New Customer", "Existing Customer")
   * @param details.Amount - Opportunity amount/value
   * @param details.LeadSource - Source of the lead
   * @param details.NextStep - Next step in the sales process
   * @param details.Description - Opportunity description
   * @param details.Private - Whether opportunity is private ("yes"/"no")
   *
   * @example
   * await opportunityPage.addNewOpportunity({
   *   Name: "Big Deal Corp",
   *   CloseDate: "31/12/2024",
   *   Stage: "Prospecting",
   *   Amount: "100000"
   * });
   */
  async addNewOpportunity(details: { [key: string]: string }) {
    console.log("📋 Filling form fields...");
    console.log("📝 Opportunity details:", JSON.stringify(details, null, 2));

    // Fill in basic information scoped to the dialog
    await this.dialog
      .getByRole("textbox", { name: /Opportunity Name/i })
      .fill(details.Name, { timeout: 10000 });

    // Handle date: fill the value provided by the feature file (DD/MM/YYYY) directly
    if (details.CloseDate) {
      await this.dialog
        .getByRole("textbox", { name: /Close Date/i })
        .fill(details.CloseDate, { timeout: 10000 });
    }

    // Handle Type dropdown
    if (details.Type) {
      await this.dialog.getByRole("combobox", { name: /Type/i }).click();
      await this.dialog
        .getByRole("listbox")
        .waitFor({ state: "visible", timeout: 10000 })
        .catch(() => { });
      await this.dialog
        .getByRole("listbox")
        .getByRole("option", { name: details.Type })
        .click({ timeout: 10000 });
    }

    // Handle Stage selection
    if (details.Stage) {
      await this.dialog.getByRole("combobox", { name: /Stage/i }).click();
      await this.dialog
        .getByRole("listbox")
        .waitFor({ state: "visible", timeout: 10000 })
        .catch(() => { });
      await this.dialog
        .getByRole("listbox")
        .getByRole("option", { name: details.Stage })
        .click({ timeout: 10000 });
    }

    // Handle Lead Source if provided
    if (details.LeadSource) {
      await this.dialog.getByRole("combobox", { name: /Lead Source/i }).click();
      await this.dialog
        .getByRole("listbox")
        .waitFor({ state: "visible", timeout: 10000 })
        .catch(() => { });

      await this.dialog
        .getByRole("listbox")
        .getByRole("option", { name: details.LeadSource })
        .click({ timeout: 10000 });
    }

    // Fill in numeric and text fields
    if (details.Amount) {
      await this.dialog
        .getByRole("spinbutton", { name: /Amount/i })
        .fill(String(details.Amount), { timeout: 10000 });
    }

    // Next Step
    if (details.NextStep) {
      await this.dialog
        .getByRole("textbox", { name: /Next Step/i })
        .fill(details.NextStep, { timeout: 10000 });
    }

    // Description
    if (details.Description) {
      await this.dialog
        .getByRole("textbox", { name: /Description/i })
        .fill(details.Description, { timeout: 10000 });
    }

    // Handle Private checkbox
    if (details.Private?.toLowerCase() === "yes") {
      const cb = this.dialog.getByRole("checkbox", { name: /Private/i });
      if (!(await cb.isChecked())) await cb.check({ timeout: 10000 });
    } else if (details.Private?.toLowerCase() === "no") {
      const cb = this.dialog.getByRole("checkbox", { name: /Private/i });
      if (await cb.isChecked()) await cb.uncheck({ timeout: 10000 });
    }

    console.log("💾 Saving the opportunity...");

    // Save and wait for completion
    // Use dialog-scoped Save if present, else fallback to page-level Save
    if ((await this.dialogSave.count()) > 0) {
      await this.dialogSave.click({ timeout: 10000 });
    } else {
      await this.saveButton.click({ timeout: 10000 });
    }
    console.log("✅ Opportunity saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-opportunity",
      this.testInfo,
      "Sales/salesforce-opportunities/"
    );

    console.log("🎉 Opportunity creation completed!");
  }

  /**
   * Verifies that an opportunity was successfully created by checking for the opportunity name
   *
   * This method validates opportunity creation success by:
   * 1. Checking if the opportunity detail page displays the expected opportunity name
   * 2. Taking a verification screenshot for evidence
   *
   * @param details - Object containing opportunity field values to verify
   * @param details.Name - Opportunity name to verify on the detail page
   *
   * @throws Will throw an assertion error if:
   * - Expected opportunity name is not found on the page
   * - Opportunity creation failed
   *
   * @example
   * await opportunityPage.verifyOpportunityCreated({ Name: "Big Deal Corp" });
   */
  async verifyOpportunityCreated(details: { [key: string]: string }) {
    console.log("🔍 Starting opportunity verification...");

    expect(this.page.locator('[slot="primaryField"]')).toContainText(
      details.Name
    );
    console.log("✅ Opportunity verification successful");

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Sales/salesforce-opportunities/"
    );

    console.log("🎉 Verification completed!");
  }
}
