import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";
import { de } from "@faker-js/faker";

/**
 * SalesforceWorkOrders Page Object Model
 *
 * This class provides automation capabilities for Salesforce Work Order management functionality.
 * It handles work order creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new work orders with comprehensive field support
 * - Handle complex form interactions including comboboxes and text inputs
 * - Verify work order creation success
 * - Support for all standard Salesforce work order fields
 * - Navigate to Work Orders module using standard navigation
 * - Complete work order lifecycle management
 *
 * @class SalesforceWorkOrders
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceWorkOrdersPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Work Order General Information Fields
  readonly workOrderNumberInput: Locator;
  readonly statusCombobox: Locator;
  readonly priorityCombobox: Locator;
  readonly parentWorkOrderCombobox: Locator;
  readonly contactCombobox: Locator;
  readonly accountCombobox: Locator;
  readonly assetCombobox: Locator;
  readonly caseCombobox: Locator;
  readonly entitlementCombobox: Locator;
  readonly serviceContractCombobox: Locator;
  readonly descriptionInput: Locator;
  readonly subjectInput: Locator;

  // Navigation Elements
  readonly workOrderCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceWorkOrders page object with all necessary locators
   *
   * Sets up locators for all Salesforce work order form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce Lightning patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceWorkOrders page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Work Order General Information field locators
    this.workOrderNumberInput = page.getByRole("textbox", {
      name: "Work Order Number",
    });
    this.statusCombobox = page.getByRole("combobox", { name: "Status" });
    this.priorityCombobox = page.getByRole("combobox", { name: "Priority" });
    this.parentWorkOrderCombobox = page.getByRole("combobox", {
      name: "Parent Work Order",
    });
    this.contactCombobox = page.getByRole("combobox", { name: "Contact" });
    this.accountCombobox = page.getByRole("combobox", { name: "Account" });
    this.assetCombobox = page.getByRole("combobox", { name: "Asset" });
    this.caseCombobox = page.getByRole("combobox", { name: "Case" });
    this.entitlementCombobox = page.getByRole("combobox", {
      name: "Entitlement",
    });
    this.serviceContractCombobox = page.getByRole("combobox", {
      name: "Service Contract",
    });
    this.descriptionInput = page.getByRole("textbox", { name: "Description" });
    this.subjectInput = page.getByRole("textbox", { name: "Subject" });

    // Success message locator
    this.workOrderCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceWorkOrders page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new work order in Salesforce with the provided details
   *
   * This method handles the complete work order creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new work order creation form
   * 3. Fills in all available field values
   * 4. Saves the work order
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing work order field values to be filled
   */
  async addNewWorkOrder(details: { [key: string]: string }) {
    console.log("🔄 Starting work order creation process...");
    console.log("📝 Work order details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-work-order",
      this.testInfo,
      "Service/salesforce-work-orders/"
    );

    // Wait for form to be fully loaded
    await this.statusCombobox.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Fill Status field (Required)
    if (details.Status && details.Status !== "--None--") {
      await this.statusCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Status })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Status selected: ${details.Status}`);
    }

    // Fill Priority field
    if (details.Priority && details.Priority !== "--None--") {
      await this.priorityCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Priority })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Priority selected: ${details.Priority}`);
    }

    // Fill Parent Work Order field
    if (details.ParentWorkOrder && details.ParentWorkOrder !== "--None--") {
      await this.parentWorkOrderCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ParentWorkOrder })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Parent Work Order selected: ${details.ParentWorkOrder}`);
    }

    // Fill Contact field
    if (details.Contact && details.Contact !== "--None--") {
      await this.contactCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Contact })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Contact selected: ${details.Contact}`);
    }

    // Fill Account field
    if (details.Account && details.Account !== "--None--") {
      await this.accountCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Account })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Account selected: ${details.Account}`);
    }

    // Fill Asset field
    if (details.Asset && details.Asset !== "--None--") {
      await this.assetCombobox.click({ timeout: 10000 });
      await this.assetCombobox.fill(details.Asset, { timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Asset })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Asset selected: ${details.Asset}`);
    }

    // Fill Case field
    if (details.Case && details.Case !== "--None--") {
      await this.caseCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Case })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Case selected: ${details.Case}`);
    }

    // Fill Entitlement field
    if (details.Entitlement && details.Entitlement !== "--None--") {
      await this.entitlementCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Entitlement })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Entitlement selected: ${details.Entitlement}`);
    }

    // Fill Service Contract field
    if (details.ServiceContract && details.ServiceContract !== "--None--") {
      await this.serviceContractCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ServiceContract })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Service Contract selected: ${details.ServiceContract}`);
    }

    // Fill Description field
    if (details.Description && details.Description !== "--None--") {
      await this.descriptionInput.fill(details.Description, { timeout: 10000 });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    // Fill Subject field
    if (details.Subject && details.Subject !== "--None--") {
      await this.subjectInput.fill(details.Subject, { timeout: 10000 });
      console.log(`✅ Subject filled: ${details.Subject}`);
    }

    console.log("💾 Saving the work order...");

    // Save the work order
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Work order saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-work-order",
      this.testInfo,
      "Service/salesforce-work-orders/"
    );

    console.log("🎉 Work order creation completed!");
  }

  /**
   * Verify that a work order was created successfully
   *
   * @param expectedDetails - Object containing expected field values for verification
   */
  async verifyWorkOrderCreation(details: { [key: string]: string }) {
    console.log("🔍 Verifying work order creation...");

    // Check for success message if visible
    await expect(this.workOrderCreatedMessage).toContainText("was created", {
      timeout: 10000,
    });
    console.log("✅ Work order creation success message appeared");

    expect(await this.page.getByText(details.Account).count()).toBeGreaterThan(
      0
    );
    // Take screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Service/salesforce-work-orders/"
    );
    console.log("✅ Work order verification completed successfully");
  }
}
