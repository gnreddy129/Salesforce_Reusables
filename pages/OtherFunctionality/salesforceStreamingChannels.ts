import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceStreamingChannels Page Object Model
 *
 * This class provides automation capabilities for Salesforce Streaming Channels management functionality.
 * It handles streaming channel creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new streaming channels with comprehensive field support
 * - Handle text fields and form interactions
 * - Verify streaming channel creation success
 * - Support for all standard Salesforce streaming channel fields
 * - Navigate to Streaming Channels module using standard navigation
 * - Complete streaming channel lifecycle management
 *
 * @class SalesforceStreamingChannelsPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceStreamingChannelsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Streaming Channel Information Fields
  readonly streamingChannelNameInput: Locator;
  readonly descriptionInput: Locator;

  // Navigation Elements
  readonly streamingChannelCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceStreamingChannels page object with all necessary locators
   *
   * Sets up locators for all Salesforce streaming channel elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceStreamingChannels page object");
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

    // Streaming Channel Information Fields
    this.streamingChannelNameInput = page.getByRole("textbox", {
      name: "Streaming Channel Name",
      exact: true,
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
      exact: true,
    });

    // Navigation Elements
    this.streamingChannelCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceStreamingChannels page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new streaming channel in Salesforce with the provided details
   *
   * This method handles the complete streaming channel creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new streaming channel creation form
   * 3. Fills in all provided field values
   * 4. Saves the streaming channel
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing streaming channel field values to be filled
   * @param details.StreamingChannelName - Streaming Channel Name (text input)
   * @param details.Description - Description (text input)
   *
   * @example
   * await streamingChannelPage.addNewStreamingChannel({
   *   StreamingChannelName: "Test Channel",
   *   Description: "Test streaming channel description"
   * });
   */
  async addNewStreamingChannel(details: { [key: string]: string }) {
    console.log("🔄 Starting streaming channel creation process...");
    console.log(
      "📝 Streaming Channel details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-streaming-channel",
        this.testInfo,
        "OtherFunctionality/salesforce-streaming-channels/"
      );
    }

    // Click New Streaming Channel
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Streaming Channel creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.streamingChannelNameInput).toBeVisible({
      timeout: 15000,
    });
    console.log("✅ Streaming Channel form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Streaming Channel Name field (text input)
    if (details["Streaming Channel Name"]) {
      await this.streamingChannelNameInput.fill(
        details["Streaming Channel Name"],
        {
          timeout: 10000,
        }
      );
      console.log(
        `✅ Streaming Channel Name filled: ${details["Streaming Channel Name"]}`
      );
    }

    // Fill Description field (text input)
    if (details.Description && details.Description !== "--None--") {
      await this.descriptionInput.fill(details.Description, {
        timeout: 10000,
      });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    console.log("💾 Saving the streaming channel...");

    // Save the streaming channel
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Streaming Channel saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-streaming-channel",
        this.testInfo,
        "OtherFunctionality/salesforce-streaming-channels/"
      );
    }

    console.log("🎉 Streaming Channel creation completed!");
  }

  /**
   * Verifies that a streaming channel was successfully created by checking for specific field values
   *
   * This method validates streaming channel creation success by checking if the streaming channel name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing streaming channel field values to verify
   * @param details.StreamingChannelName - Streaming Channel Name to verify on the page
   *
   * @throws Will throw an assertion error if expected streaming channel name is not found
   *
   * @example
   * await streamingChannelPage.verifyStreamingChannelCreation({
   *   "Streaming Channel Name": "Test Channel"
   * });
   */
  async verifyStreamingChannelCreation(details: { [key: string]: string }) {
    console.log("🔍 Starting streaming channel verification...");

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification-streaming-channel",
        this.testInfo,
        "OtherFunctionality/salesforce-streaming-channels/"
      );
    }

    // Check if the streaming channel name appears in the interface
    const streamingChannelName = details["Streaming Channel Name"];
    if (streamingChannelName) {
      // Wait for page to load after creation
      await this.page.waitForTimeout(3000);

      // Look for the streaming channel name in the page
      const streamingChannelLocator = this.page
        .locator(`[slot="primaryField"]`).filter({ hasText: streamingChannelName })
        .first();
      await expect(streamingChannelLocator).toBeVisible({ timeout: 10000 });
      console.log(
        `✅ Streaming Channel name verification successful: ${streamingChannelName}`
      );
    }

    console.log("🎉 Streaming Channel verification completed!");
  }
}
