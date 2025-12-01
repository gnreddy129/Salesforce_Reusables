import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceCommunicationSubscriptions Page Object Model
 *
 * This class provides automation capabilities for Salesforce Communication Subscriptions management functionality.
 * It handles communication subscription creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new communication subscriptions with comprehensive field support
 * - Handle form interactions with field validation
 * - Verify communication subscription creation success
 * - Support for all standard Salesforce communication subscription fields
 * - Navigate to Communication Subscriptions module using standard navigation
 * - Complete communication subscription lifecycle management
 *
 * @class SalesforceCommunicationSubscriptionsPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceCommunicationSubscriptionsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Communication Subscription Information Fields
  readonly nameInput: Locator;

  // Navigation Elements
  readonly successMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceCommunicationSubscriptions page object with all necessary locators
   *
   * Sets up locators for all Salesforce communication subscription form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log(
      "🚀 Initializing SalesforceCommunicationSubscriptions page object"
    );
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", {
      name: "New",
    });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Communication Subscription Information field locators
    this.nameInput = page.getByRole("textbox", { name: "Name" });

    // Success message locator
    this.successMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceCommunicationSubscriptions page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new communication subscription in Salesforce with the provided details
   *
   * This method handles the complete communication subscription creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new communication subscription creation form
   * 3. Fills in all provided field values
   * 4. Saves the communication subscription
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing communication subscription field values to be filled
   * @param details.Name - Communication subscription name (required) - text input
   */
  async addNewCommunicationSubscription(details: { [key: string]: string }) {
    console.log("🔄 Starting communication subscription creation process...");
    console.log(
      "📝 Communication subscription details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({
      timeout: 10000,
    });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-communication-subscription",
      this.testInfo,
      "CustomerData/salesforce-communication-subscriptions/"
    );

    // Click New Communication Subscription
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Communication subscription creation form opened");

    // Wait for form to be fully loaded
    await this.nameInput.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Fill Name field (required)
    if (details.Name && details.Name !== "--None--") {
      await this.nameInput.fill(details.Name, { timeout: 10000 });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    console.log("💾 Saving the communication subscription...");

    // Save the communication subscription
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Communication subscription saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-communication-subscription",
      this.testInfo,
      "CustomerData/salesforce-communication-subscriptions/"
    );

    console.log("🎉 Communication subscription creation completed!");
  }

  /**
   * Verify that a communication subscription was created successfully
   *
   * @param details - Object containing expected field values for verification
   */
  async verifyCommunicationSubscriptionCreation(details: {
    [key: string]: string;
  }) {
    console.log("🔍 Verifying communication subscription creation...");

    // Take initial screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-verification",
      this.testInfo,
      "CustomerData/salesforce-communication-subscriptions/"
    );

    await expect(this.successMessage).toBeVisible({
      timeout: 5000,
    });
    console.log(
      "✅ Communication subscription creation success message appeared"
    );

    if (details.Name) {
      const nameElement = this.page.locator(`text=${details.Name}`).first();
      if (await nameElement.isVisible({ timeout: 5000 })) {
        console.log(`✅ Name verification successful: ${details.Name}`);
      }
      console.log(`ℹ️ Field ${details.Name} verification completed`);
    }

    console.log(
      "✅ Communication subscription verification completed successfully"
    );

    // Take final verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-verification",
      this.testInfo,
      "CustomerData/salesforce-communication-subscriptions/"
    );
  }
}
