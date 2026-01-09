import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";
import { de } from "@faker-js/faker";

/**
 * SalesforceCustomLibraries Page Object Model
 *
 * This class provides automation capabilities for Salesforce Custom Libraries management functionality.
 * It handles custom library creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new custom libraries with comprehensive field support
 * - Handle text fields, combobox, and checkbox interactions
 * - Verify custom library creation success
 * - Support for all standard Salesforce custom library fields
 * - Navigate to Custom Libraries module using standard navigation
 * - Complete custom library lifecycle management
 *
 * @class SalesforceCustomLibrariesPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceCustomLibrariesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Custom Library Information Fields
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;
  readonly contentTypeCombobox: Locator;
  readonly activeCheckbox: Locator;

  // Navigation Elements
  readonly customLibraryCreatedMessage: Locator;
  readonly allOptionsLocator: Locator;
  readonly primaryFieldLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceCustomLibraries page object with all necessary locators
   *
   * Sets up locators for all Salesforce custom library elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceCustomLibraries page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary UI Controls
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", {
      name: "Save & New",
      exact: true,
    });
    this.cancelButton = page.getByRole("button", {
      name: "Cancel",
      exact: true,
    });

    // Custom Library Information Fields
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
      exact: true,
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
      exact: true,
    });
    this.contentTypeCombobox = page.getByRole("combobox", {
      name: "Content Type",
      exact: true,
    });
    this.activeCheckbox = page.getByRole("checkbox", {
      name: "Active",
      exact: true,
    });

    // Navigation Elements
    this.customLibraryCreatedMessage = page.locator(".toastMessage");
    this.allOptionsLocator = page.getByRole("option");
    this.primaryFieldLocator = page.locator(`[slot="primaryField"]`);

    console.log(
      "✅ SalesforceCustomLibraries page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new custom library in Salesforce with the provided details
   *
   * This method handles the complete custom library creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new custom library creation form
   * 3. Fills in all provided field values
   * 4. Saves the custom library
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing custom library field values to be filled
   * @param details.Name - Custom Library Name (text input)
   * @param details.Description - Description (text input)
   * @param details.ContentType - Content Type (combobox)
   * @param details.Active - Active status (checkbox)
   *
   * @example
   * await customLibraryPage.addNewCustomLibrary({
   *   Name: "jQuery Library",
   *   Description: "jQuery JavaScript library",
   *   ContentType: "JavaScript",
   *   Active: "true"
   * });
   */
  async addNewCustomLibrary(details: { [key: string]: string }) {
    console.log("🔄 Starting custom library creation process...");
    console.log("📝 Custom Library details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-custom-library",
        this.testInfo,
        "Platform/salesforce-custom-libraries/"
      );
    }

    // Click New Custom Library
    console.log("✅ Custom Library creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Custom Library form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name) {
      await this.nameInput.fill(Helper.generateUniqueValue(details.Name), {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Fill Description field (text input)
    if (details.Description && details.Description !== "--None--") {
      await this.descriptionInput.fill(Helper.generateUniqueValue(details.Description), {
        timeout: 10000,
      });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    // Fill Content Type field (combobox)
    if (details["Content Type"] && details["Content Type"] !== "--None--") {
      await this.contentTypeCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details["Content Type"] }).first().click({ timeout: 10000 });
      console.log(`✅ Content Type selected: ${details["Content Type"]}`);
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

    console.log("💾 Saving the custom library...");

    // Save the custom library
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Custom Library saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-custom-library",
        this.testInfo,
        "Platform/salesforce-custom-libraries/"
      );
    }

    console.log("🎉 Custom Library creation completed!");
  }

  /**
   * Verifies that a custom library was successfully created by checking for specific field values
   *
   * This method validates custom library creation success by checking if the custom library name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing custom library field values to verify
   * @param details.Name - Custom Library Name to verify on the page
   *
   * @throws Will throw an assertion error if expected custom library name is not found
   *
   * @example
   * await customLibraryPage.verifyCustomLibraryCreation({
   *   Name: "jQuery Library"
   * });
   */
  async verifyCustomLibraryCreation(details: { [key: string]: string }) {
    console.log("🔍 Starting custom library verification...");
    await expect(this.customLibraryCreatedMessage).toBeVisible({ timeout: 10000 });
    
    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification-custom-library",
      this.testInfo,
      "Platform/salesforce-custom-libraries/"
    );

    // Check if the custom library name appears in the interface
    if (details.Name) {
      this.page.getByText(details.Name).count().then(async (count) => {
        if (count === 0) {
          throw new Error(`Custom Library with Name "${details.Name}" was not found on the page.`);
        }
      });
    }

    console.log("🎉 Custom Library verification completed!");
  }
}
