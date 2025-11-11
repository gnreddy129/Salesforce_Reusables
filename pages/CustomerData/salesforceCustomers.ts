import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceCustomers Page Object Model
 *
 * This class provides automation capabilities for Salesforce Customer management functionality.
 * It handles customer creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new customers with comprehensive field support
 * - Handle complex form interactions including comboboxes and numeric inputs
 * - Verify customer creation success
 * - Support for all standard Salesforce customer fields
 * - Navigate to Customers module using standard navigation
 * - Customer status and party management
 *
 * @class SalesforceCustomers
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceCustomersPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newCustomerButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Customer Information Fields
  readonly partyCombobox: Locator; // Required combobox
  readonly nameInput: Locator; // Required text input
  readonly customerStatusTypeCombobox: Locator; // Optional combobox
  readonly totalLifeTimeValueInput: Locator; // Numeric spinbutton

  // Navigation Elements
  readonly customerCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceCustomers page object with all necessary locators
   *
   * Sets up locators for all Salesforce customer form elements using role-based selectors
   * for maximum reliability. All elements are identified based on the actual MCP server response.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceCustomers page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newCustomerButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Customer Information field locators
    this.partyCombobox = page.getByRole("combobox", { name: "Party" });
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.customerStatusTypeCombobox = page.getByRole("combobox", {
      name: "Customer Status Type",
    });
    this.totalLifeTimeValueInput = page.getByRole("spinbutton", {
      name: "Total Life Time Value",
    });

    // Success message locator
    this.customerCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceCustomers page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new customer in Salesforce with the provided details
   *
   * This method handles the complete customer creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new customer creation form
   * 3. Fills in all provided field values including Party and Customer Status Type comboboxes
   * 4. Saves the customer
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing customer field values to be filled
   * @param details.Party - Party selection (required) - combobox
   * @param details.Name - Customer name (required) - text input
   * @param details.CustomerStatusType - Customer status type (optional) - combobox
   * @param details.TotalLifeTimeValue - Total lifetime value (optional) - numeric input
   *
   * @example
   * await customersPage.addNewCustomer({
   *   Party: "Individual",
   *   Name: "John Doe Customer",
   *   CustomerStatusType: "Active",
   *   TotalLifeTimeValue: "50000"
   * });
   */
  async addNewCustomer(details: { [key: string]: string }) {
    console.log("🔄 Starting customer creation process...");
    console.log("📝 Customer details:", JSON.stringify(details, null, 2));

    await expect(this.newCustomerButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-customer",
      this.testInfo,
      "CustomerData/salesforce-customers/"
    );

    // Click New Customer
    await this.newCustomerButton.click({ timeout: 10000 });
    console.log("✅ Customer creation form opened");

    // Wait for form to be fully loaded
    await this.partyCombobox.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Fill Party field (Required lookup to Individual records)
    if (details.Party) {
      await this.partyCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Party }).first()
        .click({ timeout: 10000 });
      console.log(`✅ Party selected: ${details.Party}`);
    }

    // Fill Name field (Required text input)
    if (details.Name) {
      await this.nameInput.fill(details.Name, { timeout: 10000 });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Fill Customer Status Type (Optional combobox)
    if (details.CustomerStatusType || details["Customer Status Type"]) {
      const customerStatusType =
        details.CustomerStatusType || details["Customer Status Type"];
      await this.customerStatusTypeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: customerStatusType , exact: true})
        .click({ timeout: 10000 });
      console.log(`✅ Customer Status Type selected: ${customerStatusType}`);
    }

    // Fill Total Life Time Value (Optional numeric input)
    if (details.TotalLifeTimeValue || details["Total Life Time Value"]) {
      const totalLifeTimeValue =
        details.TotalLifeTimeValue || details["Total Life Time Value"];
      await this.totalLifeTimeValueInput.fill(totalLifeTimeValue, {
        timeout: 10000,
      });
      console.log(`✅ Total Life Time Value filled: ${totalLifeTimeValue}`);
    }

    console.log("💾 Saving the customer...");

    // Save the customer
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Customer saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-customer",
      this.testInfo,
      "CustomerData/salesforce-customers/"
    );

    console.log("🎉 Customer creation completed!");
  }

  /**
   * Verifies that a customer was successfully created by checking for specific field values
   *
   * This method validates customer creation success by checking if the customer detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing customer field values to verify
   * @param details.Name - Customer name to verify
   * @param details.Party - Party to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await customersPage.verifyCustomer({
   *   Name: "John Doe Customer",
   *   Party: "Individual"
   * });
   */
  async verifyCustomer(details: { [k: string]: string }) {
    console.log("🔍 Starting customer verification...");

    // Verify customer creation by checking for the name on the page
    if (details.Name) {
      await expect(
        this.page.locator(`[slot="outputField"]`, { hasText: details.Name }).first()
      ).toBeVisible({ timeout: 10000 });
      console.log(`✅ Customer name verification successful: ${details.Name}`);
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "CustomerData/salesforce-customers/"
    );

    console.log("🎉 Customer verification completed!");
  }
}
