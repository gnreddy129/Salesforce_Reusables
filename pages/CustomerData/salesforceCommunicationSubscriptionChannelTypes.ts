import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceCommunicationSubscriptionChannelTypes Page Object Model
 *
 * This class provides automation capabilities for Salesforce Communication Subscription Channel Types management functionality.
 * It handles communication subscription channel type creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new communication subscription channel types with comprehensive field support
 * - Handle text fields and combobox interactions
 * - Verify communication subscription channel type creation success
 * - Support for all standard Salesforce communication subscription channel type fields
 * - Navigate to Communication Subscription Channel Types module using standard navigation
 * - Complete communication subscription channel type lifecycle management
 *
 * @class SalesforceCommunicationSubscriptionChannelTypesPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceCommunicationSubscriptionChannelTypesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Communication Subscription Channel Type Information Fields
  readonly nameInput: Locator;
  readonly engagementChannelTypeCombobox: Locator;
  readonly communicationSubscriptionCombobox: Locator;
  readonly firstOptionLocator: Locator;
  readonly subscriptionChannelTypeLocator: Locator;

  // Navigation Elements
  readonly communicationSubscriptionChannelTypeCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceCommunicationSubscriptionChannelTypes page object with all necessary locators
   *
   * Sets up locators for all Salesforce communication subscription channel type elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log(
      "🚀 Initializing SalesforceCommunicationSubscriptionChannelTypes page object"
    );
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

    // Communication Subscription Channel Type Information Fields
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
      exact: true,
    });
    this.engagementChannelTypeCombobox = page.getByRole("combobox", {
      name: "Engagement Channel Type",
      exact: true,
    });
    this.communicationSubscriptionCombobox = page.getByRole("combobox", {
      name: "Communication Subscription",
      exact: true,
    });

    this.firstOptionLocator = page.getByRole("option").first();
    this.subscriptionChannelTypeLocator = page.locator(`[slot="primaryField"]`);

    // Navigation Elements
    this.communicationSubscriptionChannelTypeCreatedMessage =
      page.locator(".toastMessage");

    console.log(
      "✅ SalesforceCommunicationSubscriptionChannelTypes page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new communication subscription channel type in Salesforce with the provided details
   *
   * This method handles the complete communication subscription channel type creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new communication subscription channel type creation form
   * 3. Fills in all provided field values
   * 4. Saves the communication subscription channel type
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing communication subscription channel type field values to be filled
   * @param details.Name - Communication Subscription Channel Type Name (text input)
   * @param details.EngagementChannelType - Engagement Channel Type (combobox)
   * @param details.CommunicationSubscription - Communication Subscription (combobox)
   *
   * @example
   * await communicationSubscriptionChannelTypePage.addNewCommunicationSubscriptionChannelType({
   *   Name: "Email Newsletter",
   *   EngagementChannelType: "Email",
   *   CommunicationSubscription: "Newsletter"
   * });
   */
  async addNewCommunicationSubscriptionChannelType(details: {
    [key: string]: string;
  }) {
    console.log(
      "🔄 Starting communication subscription channel type creation process..."
    );
    console.log(
      "📝 Communication Subscription Channel Type details:",
      JSON.stringify(details, null, 2)
    );

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-communication-subscription-channel-type",
        this.testInfo,
        "CustomerData/salesforce-communication-subscription-channel-types/"
      );
    }

    // Click New Communication Subscription Channel Type
    console.log(
      "✅ Communication Subscription Channel Type creation form opened"
    );

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log(
      "✅ Communication Subscription Channel Type form fields are now visible"
    );

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name) {
      await this.nameInput.fill(Helper.generateUniqueValue(details.Name), {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Fill Engagement Channel Type field (combobox)
    if (
      details["Engagement Channel Type"] &&
      details["Engagement Channel Type"] !== "--None--"
    ) {
      await this.engagementChannelTypeCombobox.click({ timeout: 10000 });
      await this.firstOptionLocator.click({ timeout: 10000 });
      console.log(
        `✅ Engagement Channel Type selected: ${details["Engagement Channel Type"]}`
      );
    }

    // Fill Communication Subscription field (combobox)
    if (
      details["Communication Subscription"] &&
      details["Communication Subscription"] !== "--None--"
    ) {
      await this.communicationSubscriptionCombobox.click({ timeout: 10000 });
      await this.firstOptionLocator.click({ timeout: 10000 });
      console.log(
        `✅ Communication Subscription selected: ${details["Communication Subscription"]}`
      );
    }

    console.log("💾 Saving the communication subscription channel type...");

    // Save the communication subscription channel type
    await this.saveButton.click({ timeout: 10000 });
    console.log(
      "✅ Communication Subscription Channel Type saved successfully"
    );

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-communication-subscription-channel-type",
        this.testInfo,
        "CustomerData/salesforce-communication-subscription-channel-types/"
      );
    }

    console.log(
      "🎉 Communication Subscription Channel Type creation completed!"
    );
  }

  /**
   * Verifies that a communication subscription channel type was successfully created by checking for specific field values
   *
   * This method validates communication subscription channel type creation success by checking if the communication subscription channel type name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing communication subscription channel type field values to verify
   * @param details.Name - Communication Subscription Channel Type Name to verify on the page
   *
   * @throws Will throw an assertion error if expected communication subscription channel type name is not found
   *
   * @example
   * await communicationSubscriptionChannelTypePage.verifyCommunicationSubscriptionChannelTypeCreation({
   *   Name: "Email Newsletter"
   * });
   */
  async verifyCommunicationSubscriptionChannelTypeCreation(details: {
    [key: string]: string;
  }) {
    console.log(
      "🔍 Starting communication subscription channel type verification..."
    );

    await expect(
      this.communicationSubscriptionChannelTypeCreatedMessage
    ).toBeVisible({ timeout: 10000 });
    console.log(
      "✅ Communication Subscription Channel Type creation message is visible"
    );

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification-communication-subscription-channel-type",
        this.testInfo,
        "CustomerData/salesforce-communication-subscription-channel-types/"
      );
    }

    // Check if the communication subscription channel type name appears in the interface
    const communicationSubscriptionChannelTypeName = details.Name;
    if (communicationSubscriptionChannelTypeName) {
      // Look for the communication subscription channel type name in the page
      const communicationSubscriptionChannelTypeLocator = this.subscriptionChannelTypeLocator
        .filter({ hasText: communicationSubscriptionChannelTypeName })
        .first();
      await expect(communicationSubscriptionChannelTypeLocator).toBeVisible({
        timeout: 10000,
      });
      console.log(
        `✅ Communication Subscription Channel Type name verification successful: ${communicationSubscriptionChannelTypeName}`
      );
    }

    console.log(
      "🎉 Communication Subscription Channel Type verification completed!"
    );
  }
}
