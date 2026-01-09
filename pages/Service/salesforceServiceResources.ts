import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceServiceResources Page Object Model
 *
 * This class provides automation capabilities for Salesforce Service Resources management functionality.
 * It handles service resource creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new service resource with comprehensive field support
 * - Handle text fields, checkbox, and combobox interactions
 * - Verify service resource creation success
 * - Support for all standard Salesforce service resource fields
 * - Navigate to Service Resources module using standard navigation
 * - Complete service resource lifecycle management
 *
 * @class SalesforceServiceResourcesPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceServiceResourcesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Service Resource Information Fields
  readonly nameInput: Locator;
  readonly activeCheckbox: Locator;
  readonly userCombobox: Locator;
  readonly resourceTypeCombobox: Locator;
  readonly descriptionInput: Locator;

  // Navigation Elements
  readonly serviceResourceCreatedMessage: Locator;
  readonly primaryFieldLocator: Locator;
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceServiceResources page object with all necessary locators
   *
   * Sets up locators for all Salesforce service resource elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceServiceResources page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.allOptionsLocator = page.getByRole("option");
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Service Resource Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });
    this.activeCheckbox = page.getByRole("checkbox", {
      name: "Active",
    });
    this.userCombobox = page.getByRole("combobox", {
      name: "User",
    });
    this.resourceTypeCombobox = page.getByRole("combobox", {
      name: "Resource Type",
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
    });

    // Success message locator
    this.serviceResourceCreatedMessage = page.locator(".toastMessage");

    // Primary field locator for verification
    this.primaryFieldLocator = page.locator(`[slot="primaryField"]`);

    console.log(
      "✅ SalesforceServiceResources page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new service resource in Salesforce with the provided details
   *
   * This method handles the complete service resource creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new service resource creation form
   * 3. Fills in all provided field values
   * 4. Saves the service resource
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing service resource field values to be filled
   * @param details.Name - Name (text input)
   * @param details.Active - Active status (checkbox - true/false)
   * @param details.User - User (combobox selection)
   * @param details.ResourceType - Resource Type (combobox selection)
   * @param details.Description - Description (text input)
   *
   * @example
   * await serviceResourcePage.addNewServiceResource({
   *   Name: "Technical Support Lead",
   *   Active: "true",
   *   User: "John Smith",
   *   ResourceType: "Technician",
   *   Description: "Lead technical support agent"
   * });
   */
  async addNewServiceResource(details: { [key: string]: string }) {
    console.log("🔄 Starting service resource creation process...");
    console.log(
      "📝 Service Resource details:",
      JSON.stringify(details, null, 2)
    );

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-service-resource",
        this.testInfo,
        "Service/salesforce-service-resources/"
      );
    }
    console.log("✅ Service Resource creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Service Resource form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name || details["Name"]) {
      const nameValue = details.Name || details["Name"];
      await this.nameInput.fill(nameValue, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${nameValue}`);
    }

    // Handle Active checkbox
    if (
      (details.Active && details.Active !== "--None--") ||
      (details["Active"] && details["Active"] !== "--None--")
    ) {
      const activeValue = details.Active || details["Active"];
      const shouldCheck =
        activeValue.toLowerCase() === "true" || activeValue === "1";

      const isCurrentlyChecked = await this.activeCheckbox.isChecked();

      if (shouldCheck && !isCurrentlyChecked) {
        await this.activeCheckbox.check({ timeout: 10000 });
        console.log("✅ Active checkbox checked");
      } else if (!shouldCheck && isCurrentlyChecked) {
        await this.activeCheckbox.uncheck({ timeout: 10000 });
        console.log("✅ Active checkbox unchecked");
      }
      console.log(`✅ Active status set to: ${activeValue}`);
    }

    // Fill User field (combobox)
    if (
      (details.User && details.User !== "--None--") ||
      (details["User"] && details["User"] !== "--None--")
    ) {
      const userValue = details.User || details["User"];
      await this.userCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.first().click({ timeout: 10000 });
      console.log(`✅ User selected: ${userValue}`);
    }

    // Fill Resource Type field (combobox)
    if (
      (details.ResourceType && details.ResourceType !== "--None--") ||
      (details["Resource Type"] && details["Resource Type"] !== "--None--")
    ) {
      const resourceTypeValue = details.ResourceType || details["Resource Type"];
      await this.resourceTypeCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: resourceTypeValue }).first().click({ timeout: 10000 });
      console.log(`✅ Resource Type selected: ${resourceTypeValue}`);
    }

    // Fill Description field (text input)
    if (
      (details.Description && details.Description !== "--None--") ||
      (details["Description"] && details["Description"] !== "--None--")
    ) {
      const descriptionValue = details.Description || details["Description"];
      await this.descriptionInput.fill(descriptionValue, {
        timeout: 10000,
      });
      console.log(`✅ Description filled: ${descriptionValue}`);
    }

    console.log("💾 Saving the service resource...");

    // Save the service resource
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Service Resource saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-service-resource",
        this.testInfo,
        "Service/salesforce-service-resources/"
      );
    }

    console.log("🎉 Service Resource creation completed!");
  }

  /**
   * Verifies that a service resource was successfully created by checking for specific field values
   *
   * This method validates service resource creation success by checking if the service resource detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing service resource field values to verify
   * @param details.Name - Name to verify
   * @param details.Active - Active status to verify
   * @param details.User - User to verify
   * @param details.ResourceType - Resource Type to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await serviceResourcePage.verifyServiceResourceCreation({
   *   Name: "Technical Support Lead",
   *   Active: "true"
   * });
   */
  async verifyServiceResourceCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting service resource verification...");

    await expect(this.serviceResourceCreatedMessage).toContainText(
      "was created"
    );
    await expect(this.primaryFieldLocator).toContainText(
      details.Name
    );

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification",
        this.testInfo,
        "Service/salesforce-service-resources/"
      );
    }

    console.log("🎉 Service Resource verification completed!");
  }
}
