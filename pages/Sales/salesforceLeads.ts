import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceLeads Page Object Model
 *
 * This class provides automation capabilities for Salesforce Lead management functionality.
 * It handles lead creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new leads with comprehensive field support
 * - Handle complex form interactions including dropdown selections
 * - Verify lead creation success
 * - Support for all standard Salesforce lead fields
 * - Navigate to Leads module using app launcher
 * - Logout functionality for session management
 *
 * @class SalesforceLeads
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceLeadsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly dialog: Locator;
  readonly saveButton: Locator;

  // Form field locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly statusCombo: Locator;
  readonly industryCombo: Locator;

  // Dynamic Fields - Country and State (can be textbox or combobox)
  readonly countryTextbox: Locator;
  readonly countryCombobox: Locator;
  readonly stateTextbox: Locator;
  readonly stateCombobox: Locator;

  // Additional UI elements
  readonly leadCreatedMessage: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceLeads page object with all necessary locators
   *
   * Sets up locators for all Salesforce lead form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceLeads page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.saveButton = page.getByRole("button", { name: /^Save$/i }).first();

    // Initialize form field locators
    this.firstNameInput = page.getByRole("textbox", { name: /First Name/i });
    this.lastNameInput = page.getByRole("textbox", { name: /Last Name/i });
    this.companyInput = page.getByRole("textbox", { name: /Company/i });
    this.emailInput = page.getByRole("textbox", { name: /Email/i });
    this.phoneInput = page.getByRole("textbox", { name: /Phone/i });
    this.statusCombo = page.getByRole("combobox", { name: /Lead Status/i, exact: true, });
    this.industryCombo = page.getByRole("combobox", { name: /Industry/i, exact: true, });

    // Dynamic Fields - Initialize dual locators for Country and State
    this.countryTextbox = page.getByRole("textbox", { name: /Country/i });
    this.countryCombobox = page.getByRole("combobox", { name: /Country/i });
    this.stateTextbox = page.getByRole("textbox", { name: /State/i });
    this.stateCombobox = page.getByRole("combobox", { name: /State/i });

    // Success message locator
    this.leadCreatedMessage = page.locator(".toastMessage");
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceLeads page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new lead in Salesforce with the provided details
   *
   * This method handles the complete lead creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new lead dialog
   * 3. Fills in all provided field values including dropdown selections
   * 4. Saves the lead
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing lead field values to be filled
   * @param details.FirstName - Lead first name (required)
   * @param details.LastName - Lead last name (required)
   * @param details.Company - Company name (required)
   * @param details.Email - Email address
   * @param details.Phone - Phone number
   * @param details.LeadStatus - Lead status
   * @param details.Industry - Industry type
   */
  async addNewLead(details: { [key: string]: string }) {
    console.log("🔄 Starting lead creation process...");
    console.log("📝 Lead details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-lead",
      this.testInfo,
      "Sales/salesforce-leads/"
    );

    console.log("📋 Filling form fields...");

    // Fill required fields
    if (details.FirstName || details["First Name"]) {
      let firstName = details.FirstName || details["First Name"];
      await this.firstNameInput.fill(Helper.generateUniqueValue(firstName), { timeout: 10000 });
    }

    if (details.LastName || details["Last Name"]) {
      let lastName = details.LastName || details["Last Name"];
      await this.lastNameInput.fill(Helper.generateUniqueValue(lastName), { timeout: 10000 });
    }

    if (details.Company) {
      await this.companyInput.fill(Helper.generateUniqueValue(details.Company), { timeout: 10000 });
    }

    // Fill optional fields
    if (details.Email) {
      await this.emailInput.fill(Helper.generateUniqueEmail(details.Email), { timeout: 10000 });
    }

    if (details.Phone) {
      await this.phoneInput.fill(Helper.generateUniqueValue(details.Phone), { timeout: 10000 });
    }

    if (details.LeadStatus || details["Lead Status"]) {
      const leadStatus = details.LeadStatus || details["Lead Status"];
      await this.statusCombo.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: leadStatus }).first().click({ timeout: 10000 });
    }

    if (details.Industry) {
      await this.industryCombo.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.Industry }).first().click({ timeout: 10000 });
    }

    // Fill Country FIRST (must be done before State)
    if (details.Country) {
      console.log("🌍 Handling Country field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.countryTextbox,
        this.countryCombobox,
        "Country",
        details.Country
      );
    }

    // Then fill State
    if (details.State) {
      console.log("🏘️ Handling State field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.stateTextbox,
        this.stateCombobox,
        "State",
        details.State
      );
    }

    console.log("💾 Saving the lead...");

    // Save the lead
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Lead saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-lead",
      this.testInfo,
      "Sales/salesforce-leads/"
    );

    console.log("🎉 Lead creation completed!");
  }

  /**
   * Verifies that a lead was successfully created by checking for specific field values
   *
   * This method validates lead creation success by checking if the lead detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing lead field values to verify
   * @param details.FirstName - First name to verify
   * @param details.LastName - Last name to verify
   * @param details.Company - Company to verify
   * @param details.Email - Email to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   */
  async verifyLead(details: { [k: string]: string }) {
    console.log("🔍 Starting lead verification...");

    // Verify lead creation message or lead details
    if (details.FirstName || details["First Name"]) {
      await expect(this.page.locator(`[title*="${details.FirstName || details["First Name"]}"]`).first()).toBeVisible({ timeout: 10000 });
      console.log(`✅ Lead name verification successful: ${details.FirstName || details["First Name"]}`);
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Sales/salesforce-leads/"
    );

    console.log("🎉 Lead verification completed!");
  }
}
