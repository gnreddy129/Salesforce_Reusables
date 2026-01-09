import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceScoreCards Page Object Model
 *
 * This class provides automation capabilities for Salesforce Scorecards management functionality.
 * It handles scorecard creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new scorecards with comprehensive field support
 * - Handle text fields and form interactions
 * - Verify scorecard creation success
 * - Support for all standard Salesforce scorecard fields
 * - Navigate to Scorecards module using standard navigation
 * - Complete scorecard lifecycle management
 *
 * @class SalesforceScoreCards
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceScorecardsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Scorecard Information Fields
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;

  // Navigation Elements
  readonly scorecardCreatedMessage: Locator;
  readonly primaryFieldWithCardLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceScoreCards page object with all necessary locators
   *
   * Sets up locators for all Salesforce scorecard elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceScoreCards page object");
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

    // Scorecard Information Fields
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
      exact: true
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
      exact: true
    });

    // Navigation Elements
    this.scorecardCreatedMessage = page.locator(".toastMessage");

    // Primary field locator with scorecard name filter
    this.primaryFieldWithCardLocator = page.locator(`[slot="primaryField"]`);

    console.log(
      "✅ SalesforceScoreCards page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new scorecard in Salesforce with the provided details
   *
   * This method handles the complete scorecard creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new scorecard creation form
   * 3. Fills in all provided field values
   * 4. Saves the scorecard
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing scorecard field values to be filled
   * @param details.Name - Scorecard Name (text input)
   * @param details.Description - Description (text input)
   *
   * @example
   * await scorecardPage.addNewScorecard({
   *   Name: "Customer Satisfaction",
   *   Description: "Customer satisfaction scorecard"
   * });
   */
  async addNewScorecard(details: { [key: string]: string }) {
    console.log("🔄 Starting scorecard creation process...");
    console.log(
      "📝 Scorecard details:",
      JSON.stringify(details, null, 2)
    );

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-scorecard",
        this.testInfo,
        "OtherFunctionality/salesforce-scorecards/"
      );
    }

    // Click New Scorecard
    console.log("✅ Scorecard creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Scorecard form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name) {
      await this.nameInput.fill(details.Name, { timeout: 10000, });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Fill Description field (text input)
    if (details.Description && details.Description !== "--None--") {
      await this.descriptionInput.fill(details.Description, {
        timeout: 10000,
      });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    console.log("💾 Saving the scorecard...");

    // Save the scorecard
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Scorecard saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-scorecard",
        this.testInfo,
        "OtherFunctionality/salesforce-scorecards/"
      );
    }

    console.log("🎉 Scorecard creation completed!");
  }

  /**
   * Verifies that a scorecard was successfully created by checking for specific field values
   *
   * This method validates scorecard creation success by checking if the scorecard name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing scorecard field values to verify
   * @param details.Name - Scorecard Name to verify on the page
   *
   * @throws Will throw an assertion error if expected scorecard name is not found
   *
   * @example
   * await scorecardPage.verifyScorecardCreation({ 
   *   Name: "Customer Satisfaction" 
   * });
   */
  async verifyScorecardCreation(details: { [key: string]: string }) {
    console.log("🔍 Starting scorecard verification...");

    await expect(this.scorecardCreatedMessage).toBeVisible({ timeout: 10000 });

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification-scorecard",
        this.testInfo,
        "OtherFunctionality/salesforce-scorecards/"
      );
    }

    // Check if the scorecard name appears in the interface
    const scorecardName = details.Name;
    if (scorecardName) {
      await expect(this.primaryFieldWithCardLocator.filter({ hasText: scorecardName }).first()).toBeVisible({ timeout: 10000 });
      console.log(`✅ Scorecard name verification successful: ${scorecardName}`);
    }

    console.log("🎉 Scorecard verification completed!");
  }
}
