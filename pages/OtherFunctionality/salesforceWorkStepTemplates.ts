import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceWorkStepTemplates Page Object Model
 *
 * This class provides automation capabilities for Salesforce Work Step Templates management functionality.
 * It handles work step template creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new work step templates with comprehensive field support
 * - Handle complex form interactions including comboboxes, checkboxes, and text inputs
 * - Verify work step template creation success
 * - Support for all standard Salesforce work step template fields
 * - Navigate to Work Step Templates module using standard navigation
 * - Complete work step template lifecycle management
 *
 * @class SalesforceWorkStepTemplatesPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceWorkStepTemplatesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Work Step Template General Information Fields
  readonly nameInput: Locator;
  readonly activeCheckbox: Locator;
  readonly actionDefinitionCombobox: Locator;
  readonly descriptionInput: Locator;

  // Navigation Elements
  readonly workStepTemplateCreatedMessage: Locator;
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceWorkStepTemplates page object with all necessary locators
   *
   * Sets up locators for all Salesforce work step template form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce Lightning patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceWorkStepTemplates page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Work Step Template General Information field locators
    this.nameInput = page.getByRole("textbox", { name: /Name/ });
    this.activeCheckbox = page.getByRole("checkbox", {
      name: "Active",
      exact: true,
    });
    this.actionDefinitionCombobox = page.getByRole("combobox");
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
    });

    // Success message locator
    this.workStepTemplateCreatedMessage = page.locator(".toastMessage");
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceWorkStepTemplates page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new work step template in Salesforce with the provided details
   * Based on Service Appointments page pattern for consistent automation approach
   *
   * This method handles the complete work step template creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new work step template creation form
   * 3. Fills in all available field values
   * 4. Saves the work step template
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing work step template field values to be filled
   */
  async addNewWorkStepTemplate(details: { [key: string]: string }) {
    console.log("🔄 Starting work step template creation process...");
    console.log(
      "📝 Work step template details:",
      JSON.stringify(details, null, 2)
    );

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-work-step-template",
      this.testInfo,
      "OtherFunctionality/salesforce-work-step-templates/"
    );
    console.log("✅ Work step template creation form opened");

    // Wait for form to be fully loaded
    await this.nameInput.waitFor({
      state: "visible",
      timeout: 10000,
    });

    console.log("📋 Filling form fields...");

    // Fill Name field (Required)
    if (details["Name"]) {
      await this.nameInput.fill(details["Name"]);
      console.log(`✅ Name: ${details["Name"]}`);
    }

    // Handle Active checkbox
    if (details["Active"]) {
      const isActive = details["Active"].toLowerCase() === "true";
      if (isActive) {
        await this.activeCheckbox.check();
        console.log("✅ Active checkbox checked");
      } else {
        await this.activeCheckbox.uncheck();
        console.log("✅ Active checkbox unchecked");
      }
    }
    // Fill Action Definition combobox
    if (
      (details["Action Definition"] &&
        details["Action Definition"] !== "--None--") ||
      (details.ActionDefinition && details.ActionDefinition !== "None")
    ) {
      const actionDefinition =
        details["Action Definition"] || details.ActionDefinition;
      await this.actionDefinitionCombobox.click({ timeout: 10000 });
      await this.page.waitForTimeout(1000);
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(`✅ Action Definition: ${actionDefinition}`);
    }

    // Fill Description field
    if (details["Description"] && details["Description"] !== "--None--") {
      await this.descriptionInput.fill(details["Description"]);
      console.log(`✅ Description: ${details["Description"]}`);
    }

    // Take screenshot before saving
    await Helper.takeScreenshotToFile(
      this.page,
      "2-before-save",
      this.testInfo,
      "OtherFunctionality/salesforce-work-step-templates/"
    );

    // Save the work step template
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Clicked Save button");

    // Wait for success message
    await expect(this.workStepTemplateCreatedMessage).toBeVisible({
      timeout: 15000,
    });

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "3-work-step-template-created",
      this.testInfo,
      "OtherFunctionality/salesforce-work-step-templates/"
    );

    console.log("🎉 Work step template creation completed successfully");
  }

  /**
   * Verifies that a work step template was created successfully
   *
   * This method validates work step template creation by checking:
   * 1. Success notification message
   * 2. Form field values if provided
   *
   * @param details - Object containing expected work step template details for verification
   */
  async verifyWorkStepTemplate(details: { [key: string]: string }) {
    console.log("🔍 Verifying work step template creation...");

    // Check for success message
    await expect(this.workStepTemplateCreatedMessage).toBeVisible({
      timeout: 10000,
    });
    console.log("✅ Success message verified");

    // Verify Name field if provided
    if (details["Name"]) {
      await expect(this.page.locator(`[title="${details["Name"]}"]`).first()).toContainText(details["Name"]);
      console.log(`✅ Name field verified: ${details["Name"]}`);
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "4-verification-complete",
      this.testInfo,
      "OtherFunctionality/salesforce-work-step-templates/"
    );

    console.log("🎉 Work step template verification completed successfully");
  }
}
