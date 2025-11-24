import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceEngagementChannelTypes Page Object Model
 *
 * This class provides automation capabilities for Salesforce Engagement Channel Types management functionality.
 * It handles engagement channel type creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new engagement channel types with comprehensive field support
 * - Handle text fields, combobox, checkbox, options, and button interactions
 * - Verify engagement channel type creation success
 * - Support for all standard Salesforce engagement channel type fields
 * - Navigate to Engagement Channel Types module using standard navigation
 * - Complete engagement channel type lifecycle management
 *
 * @class SalesforceEngagementChannelTypesPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceEngagementChannelTypesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Engagement Channel Type Information Fields
  readonly nameInput: Locator;
  readonly contactPointTypeCombobox: Locator;
  readonly activeCheckbox: Locator;
  readonly usageTypeOption: Locator;
  readonly moveToChosenButton: Locator;
  readonly moveToAvailableButton: Locator;

  // Navigation Elements
  readonly engagementChannelTypeCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceEngagementChannelTypes page object with all necessary locators
   *
   * Sets up locators for all Salesforce engagement channel type elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceEngagementChannelTypes page object");
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

    // Engagement Channel Type Information Fields
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
      exact: true,
    });
    this.contactPointTypeCombobox = page.getByRole("combobox", {
      name: "Contact Point Type",
      exact: true,
    });
    this.activeCheckbox = page.getByRole("checkbox", {
      name: "Active",
      exact: true,
    });
    this.usageTypeOption = page.getByRole("option", {
      name: "Usage Type",
      exact: true,
    });
    this.moveToChosenButton = page.getByRole("button", {
      name: "Move to Chosen",
    });
    this.moveToAvailableButton = page.getByRole("button", {
      name: "Move to Available",
    });

    // Navigation Elements
    this.engagementChannelTypeCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceEngagementChannelTypes page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new engagement channel type in Salesforce with the provided details
   *
   * This method handles the complete engagement channel type creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new engagement channel type creation form
   * 3. Fills in all provided field values
   * 4. Saves the engagement channel type
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing engagement channel type field values to be filled
   * @param details.Name - Engagement Channel Type Name (text input)
   * @param details.ContactPointType - Contact Point Type (combobox)
   * @param details.Active - Active status (checkbox)
   * @param details.UsageType - Usage Type (option)
   *
   * @example
   * await engagementChannelTypePage.addNewEngagementChannelType({
   *   Name: "Email Marketing",
   *   ContactPointType: "Email",
   *   Active: "true",
   *   UsageType: "Marketing"
   * });
   */
  async addNewEngagementChannelType(details: { [key: string]: string }) {
    console.log("🔄 Starting engagement channel type creation process...");
    console.log(
      "📝 Engagement Channel Type details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-engagement-channel-type",
        this.testInfo,
        "Marketing/salesforce-engagement-channel-types/"
      );
    }

    // Click New Engagement Channel Type
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Engagement Channel Type creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Engagement Channel Type form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name) {
      await this.nameInput.fill(details.Name, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Fill Contact Point Type field (combobox)
    if (details["Contact Point Type"] && details["Contact Point Type"] !== "--None--") {
      await this.contactPointTypeCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: details["Contact Point Type"] }).click();
      console.log(`✅ Contact Point Type selected: ${details["Contact Point Type"]}`);
    }

    // Fill Active checkbox
    if (details.Active !== undefined) {
      if (details.Active.toLowerCase() === "true") {
        await this.activeCheckbox.check({ timeout: 10000 });
        console.log(`✅ Active checkbox checked`);
      } else {
        await this.activeCheckbox.uncheck({ timeout: 10000 });
        console.log(`✅ Active checkbox unchecked`);
      }
    }

    // Handle Usage Type option selection
    if (details["Usage Type"] && details["Usage Type"] !== "--None--") {
      // Click on the usage type option
      await this.page.getByRole("option", { name: details["Usage Type"] }).click();
      console.log(`✅ Usage Type selected: ${details["Usage Type"]}`);
      
      // Click Move to Chosen button if available
      try {
        await this.moveToChosenButton.click({ timeout: 5000 });
        console.log(`✅ Moved ${details["Usage Type"]} to chosen`);
      } catch (error) {
        console.log(`⚠️ Move to Chosen button not available or not needed`);
      }
    }

    console.log("💾 Saving the engagement channel type...");

    // Save the engagement channel type
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Engagement Channel Type saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-engagement-channel-type",
        this.testInfo,
        "Marketing/salesforce-engagement-channel-types/"
      );
    }

    console.log("🎉 Engagement Channel Type creation completed!");
  }

  /**
   * Verifies that an engagement channel type was successfully created by checking for specific field values
   *
   * This method validates engagement channel type creation success by checking if the engagement channel type name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing engagement channel type field values to verify
   * @param details.Name - Engagement Channel Type Name to verify on the page
   *
   * @throws Will throw an assertion error if expected engagement channel type name is not found
   *
   * @example
   * await engagementChannelTypePage.verifyEngagementChannelTypeCreation({ 
   *   Name: "Email Marketing" 
   * });
   */
  async verifyEngagementChannelTypeCreation(details: { [key: string]: string }) {
    console.log("🔍 Starting engagement channel type verification...");
    await expect(this.engagementChannelTypeCreatedMessage).toBeVisible({ timeout: 10000 });
    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification-engagement-channel-type",
        this.testInfo,
        "Marketing/salesforce-engagement-channel-types/"
      );
    }

    // Check if the engagement channel type name appears in the interface
    const engagementChannelTypeName = details.Name;
    if (engagementChannelTypeName) {
      // Look for the engagement channel type name in the page
      const engagementChannelTypeLocator = this.page.getByText(engagementChannelTypeName).first();
      await expect(engagementChannelTypeLocator).toBeVisible({ timeout: 10000 });
      console.log(`✅ Engagement Channel Type name verification successful: ${engagementChannelTypeName}`);
    }

    console.log("🎉 Engagement Channel Type verification completed!");
  }
}
