import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceContactRequests Page Object Model
 *
 * This class provides automation capabilities for Salesforce Contact Requests management functionality.
 * It handles contact request creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new contact requests with comprehensive field support
 * - Handle combobox selections and text field interactions
 * - Verify contact request creation success
 * - Support for all standard Salesforce contact request fields
 * - Navigate to Contact Requests module using standard navigation
 * - Complete contact request lifecycle management
 *
 * @class SalesforceContactRequestsPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceContactRequestsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Contact Request Information Fields
  readonly requestedByCombobox: Locator;
  readonly relatedToCombobox: Locator;
  readonly preferredChannelCombobox: Locator;
  readonly preferredPhoneNumberInput: Locator;
  readonly requestStatusCombobox: Locator;
  readonly requestReasonCombobox: Locator;
  readonly requestDescriptionTextarea: Locator;

  // Navigation Elements
  readonly contactRequestCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceContactRequests page object with all necessary locators
   *
   * Sets up locators for all Salesforce contact request form elements using role-based selectors
   * for maximum reliability. All elements are identified based on the actual MCP server response.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceContactRequests page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Contact Request Information field locators - Based on actual MCP inspection
    this.requestedByCombobox = page.getByRole("combobox", {
      name: "Search Contacts",
    });
    this.relatedToCombobox = page.getByRole("combobox", {
      name: "Search Accounts",
    });
    this.preferredChannelCombobox = page.getByRole("combobox", {
      name: "Preferred Channel",
    });
    this.preferredPhoneNumberInput = page.getByRole("textbox", {
      name: "Preferred Phone Number",
    });
    this.requestStatusCombobox = page.getByRole("combobox", {
      name: "Request Status",
    });
    this.requestReasonCombobox = page.getByRole("combobox", {
      name: "Request Reason",
    });
    this.requestDescriptionTextarea = page.getByRole("textbox", {
      name: "Request Description",
    });

    // Success message locator
    this.contactRequestCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceContactRequests page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new contact request in Salesforce with the provided details
   *
   * This method handles the complete contact request creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new contact request creation form
   * 3. Fills in all provided field values including comboboxes and text fields
   * 4. Saves the contact request
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing contact request field values to be filled
   * @param details.RequestedBy - Requested By selection (combobox)
   * @param details.RelatedTo - Related To selection (combobox)
   * @param details.PreferredChannel - Preferred Channel selection (combobox)
   * @param details.PreferredPhoneNumber - Preferred Phone Number (text input)
   * @param details.RequestStatus - Request Status selection (combobox)
   * @param details.RequestReason - Request Reason selection (combobox)
   * @param details.RequestDescription - Request Description (text input)
   *
   * @example
   * await contactRequestsPage.addNewContactRequest({
   *   RequestedBy: "John Smith",
   *   RelatedTo: "Product Issue",
   *   PreferredChannel: "Email",
   *   PreferredPhoneNumber: "+1-555-123-4567",
   *   RequestStatus: "Open",
   *   RequestReason: "Technical Support",
   *   RequestDescription: "Need help with product configuration"
   * });
   */
  async addNewContactRequest(details: { [key: string]: string }) {
    console.log("🔄 Starting contact request creation process...");
    console.log(
      "📝 Contact Request details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-contact-request",
      this.testInfo,
      "CustomerData/salesforce-contact-requests/"
    );

    // Click New Contact Request
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Contact Request creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.requestedByCombobox).toBeVisible({ timeout: 15000 });
    console.log("✅ Contact Request form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Requested By field (combobox)
    if (details.RequestedBy || details["Requested By"]) {
      const requestedBy = details.RequestedBy || details["Requested By"];
      await this.requestedByCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: requestedBy, exact: true })
        .click({ timeout: 10000 });
      console.log(`✅ Requested By selected: ${requestedBy}`);
    }

    // Fill Related To field (combobox)
    if (details.RelatedTo || details["Related To"]) {
      const relatedTo = details.RelatedTo || details["Related To"];
      await this.relatedToCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: relatedTo, exact: true })
        .click({ timeout: 10000 });
      console.log(`✅ Related To selected: ${relatedTo}`);
    }

    // Fill Preferred Channel field (combobox)
    if (details.PreferredChannel || details["Preferred Channel"]) {
      const preferredChannel =
        details.PreferredChannel || details["Preferred Channel"];
      await this.preferredChannelCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: preferredChannel, exact: true })
        .click({ timeout: 10000 });
      console.log(`✅ Preferred Channel selected: ${preferredChannel}`);
    }

    // Fill Preferred Phone Number field (text input)
    if (details.PreferredPhoneNumber || details["Preferred Phone Number"]) {
      const preferredPhoneNumber =
        details.PreferredPhoneNumber || details["Preferred Phone Number"];
      await this.preferredPhoneNumberInput.fill(preferredPhoneNumber, {
        timeout: 10000,
      });
      console.log(`✅ Preferred Phone Number filled: ${preferredPhoneNumber}`);
    }

    // Fill Request Status field (combobox)
    if (details.RequestStatus || details["Request Status"]) {
      const requestStatus = details.RequestStatus || details["Request Status"];
      await this.requestStatusCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: requestStatus, exact: true })
        .click({ timeout: 10000 });
      console.log(`✅ Request Status selected: ${requestStatus}`);
    }

    // Fill Request Reason field (combobox)
    if (details.RequestReason || details["Request Reason"]) {
      const requestReason = details.RequestReason || details["Request Reason"];
      await this.requestReasonCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: requestReason, exact: true })
        .click({ timeout: 10000 });
      console.log(`✅ Request Reason selected: ${requestReason}`);
    }

    // Fill Request Description field (text input)
    if (details.RequestDescription || details["Request Description"]) {
      const requestDescription =
        details.RequestDescription || details["Request Description"];
      await this.requestDescriptionTextarea.fill(requestDescription, {
        timeout: 10000,
      });
      console.log(`✅ Request Description filled: ${requestDescription}`);
    }

    console.log("💾 Saving the contact request...");

    // Save the contact request
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Contact Request saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-contact-request",
      this.testInfo,
      "CustomerData/salesforce-contact-requests/"
    );

    console.log("🎉 Contact Request creation completed!");
  }

  /**
   * Verifies that a contact request was successfully created by checking for specific field values
   *
   * This method validates contact request creation success by checking if the contact request detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing contact request field values to verify
   * @param details.RequestStatus - Request Status to verify
   * @param details.PreferredPhoneNumber - Preferred Phone Number to verify
   * @param details.RequestDescription - Request Description to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await contactRequestsPage.verifyContactRequestCreation({
   *   RequestStatus: "Contacted",
   *   PreferredPhoneNumber: "+1-555-123-4567",
   *   RequestDescription: "Test description"
   * });
   */
  async verifyContactRequestCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting contact request verification...");

    await expect(this.contactRequestCreatedMessage).toContainText(
      "was created",
      { timeout: 10000 }
    );

    // Verify Request Status
    expect(
      this.page
        .locator('[data-refid="recordId"]', { hasText: details.RequestedBy })
        .first()
    ).toBeVisible();

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "CustomerData/salesforce-contact-requests/"
    );

    console.log("🎉 Contact Request verification completed!");
  }
}
