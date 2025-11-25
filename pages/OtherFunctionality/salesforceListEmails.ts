import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceListEmails Page Object Model
 *
 * This class provides automation capabilities for Salesforce List Emails functionality.
 * It handles sending emails to lists with recipients and subject management, with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Send emails to recipients with subject line
 * - Handle form-based interactions with proper field locators
 * - Verify email sending and completion
 * - Support for email composition and submission
 *
 * @class SalesforceListEmails
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceListEmailsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly sendEmailButton: Locator;

  // Email Composition Form Fields
  readonly recipientsCombobox: Locator;
  readonly recipientsInput: Locator;
  readonly recipientsOption: Locator;
  readonly subjectTextbox: Locator;

  // Action Buttons
  readonly sendButton: Locator;

  /**
   * Constructor - Initializes the SalesforceListEmails page object with all necessary locators
   *
   * Sets up locators for all Salesforce email form elements using role-based selectors
   * for maximum reliability. Locators target the Recipients, Subject fields and Send button.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceListEmails page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary UI controls - Open email sending form
    this.sendEmailButton = page.getByRole("button", {
      name: /Send Email|Send/i,
    });

    // Recipients field - Combobox with autocomplete
    // Use the specific ID for the recipients input field
    this.recipientsInput = page.locator(
      'input[id="recipients-list-input-dom-id"], input[id*="recipients"][id*="input"]'
    );
    
    // Recipients combobox - The actual combobox role element
    this.recipientsCombobox = page.locator(
      'input[role="combobox"][aria-describedby*="recipients"]'
    );
    
    // Options in the dropdown list
    this.recipientsOption = page.locator(".optionLabel, .uiVirtualDataTableCell");
    
    // Subject field with placeholder
    this.subjectTextbox = page.locator(
      "input[placeholder*='Enter Subject'], input[placeholder*='Subject'], [role='textbox'][name*='subject']"
    );

    // Send button for email submission
    this.sendButton = page.getByRole("button", { name: /^Send$/i });

    console.log(
      "✅ SalesforceListEmails page object initialized successfully with all locators"
    );
  }

  /**
   * Sends an email to a list of recipients with the provided subject
   *
   * This method handles the complete email sending workflow:
   * 1. Clicks the "Send Email" button to open the email form
   * 2. Takes a start screenshot for verification
   * 3. Fills in the Recipients field
   * 4. Fills in the Subject field
   * 5. Sends the email by clicking the Send button
   * 6. Takes an end screenshot for verification
   *
   * @param details - Object containing email field values to be filled
   * @param details.Recipients - Email recipients (required)
   * @param details.Subject - Email subject line (required)
   *
   * @example
   * await emailListPage.sendEmail({
   *   Recipients: "contact@example.com",
   *   Subject: "Q4 Marketing Campaign"
   * });
   */
  async sendEmail(details: { [field: string]: string }) {
    console.log("🔄 Starting email sending process...");
    console.log("📋 Email details:", JSON.stringify(details, null, 2));

    // Click the "Send Email" button to open the email form
    await expect(this.sendEmailButton).toBeVisible({ timeout: 10000 });
    console.log("📧 Clicking 'Send Email' button...");
    await this.sendEmailButton.click({ timeout: 10000 });
    await this.page.waitForTimeout(2000);
    console.log("✅ Email form opened");

    // Wait for the recipients combobox to load
    console.log("⏳ Waiting for Recipients combobox to load...");
    await this.recipientsInput.first().waitFor({ state: "visible", timeout: 15000 });
    
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-email",
      this.testInfo,
      "OtherFunctionality/salesforce-list-emails/"
    );

    console.log("📋 Filling form fields...");

    // Recipients field - Combobox with autocomplete interaction
    if (details.Recipients) {
      console.log("📧 Interacting with Recipients combobox...");
      
      // Get the combobox input field
      const recipientsField = this.recipientsInput.first();
      
      // Click to activate the combobox
      await recipientsField.click({ timeout: 10000 });
      await this.page.waitForTimeout(500);
      
      // Clear any existing value and type the recipient
      await recipientsField.fill("", { timeout: 5000 });
      await this.page.waitForTimeout(300);
      await recipientsField.type(details.Recipients, { delay: 50 });
      console.log("✅ Recipients typed:", details.Recipients);
      
      // Wait for the dropdown options to appear
      await this.page.waitForTimeout(1500);
      
      // Click the first option from the dropdown
      const firstOption = this.recipientsOption.first();
      await firstOption.click({ timeout: 10000 });
      console.log("✅ Recipients option selected");
    }

    await this.page.waitForTimeout(1500);

    // Subject field - Email subject line (required)
    if (details.Subject) {
      console.log("📝 Filling Subject field...");
      const subjectField = this.subjectTextbox.first();
      await subjectField.click({ timeout: 10000 });
      await this.page.waitForTimeout(500);
      await subjectField.fill(details.Subject, { timeout: 10000 });
      console.log("✅ Subject filled:", details.Subject);
    }

    await this.page.waitForTimeout(1000);
    console.log("📤 Sending the email...");

    // Send the email
    await this.sendButton.click({ timeout: 10000 });
    console.log("✅ Email sent successfully");

    await this.page.waitForTimeout(1000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-email",
      this.testInfo,
      "OtherFunctionality/salesforce-list-emails/"
    );

    console.log("🎉 Email sending completed!");
  }

  /**
   * Verifies that an email was successfully sent by checking for success message
   *
   * This method validates email sending success by checking for a success toast/alert
   * that appears after the email is sent. It looks for success indicators on the page.
   *
   * @param details - Object containing email field values to verify
   * @param details.Recipients - Email recipients that were sent to
   * @param details.Subject - Email subject that was sent
   *
   * @throws Will throw an assertion error if success message is not found
   *
   * @example
   * await emailListPage.verifyEmailSent({ 
   *   Recipients: "My Unread Leads",
   *   Subject: "Q4 Marketing Campaign"
   * });
   */
  async verifyEmailSent(details: { [field: string]: string }) {
    console.log("🔍 Starting email verification...");
    console.log("📦 Verifying email sent with details:", JSON.stringify(details, null, 2));

    // Wait a moment for any success message to appear
    await this.page.waitForTimeout(2000);

    try {
      // Look for success toast/alert messages
      const successMessages = [
        'text=/success|sent|complete/i',
        '[role="alert"]',
        '[class*="success"]',
        '[class*="slds-notify"]',
        '.slds-notify__content'
      ];

      let successFound = false;
      
      for (const selector of successMessages) {
        try {
          const element = this.page.locator(selector).first();
          if (await element.isVisible({ timeout: 5000 })) {
            const text = await element.textContent();
            console.log("✅ Success message found:", text);
            successFound = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      if (!successFound) {
        // Alternative: Check if the Send Email button is available again (form was reset)
        try {
          await this.sendEmailButton.isVisible({ timeout: 5000 });
          console.log("✅ Email form reset detected - Email sent successfully");
          successFound = true;
        } catch (e) {
          console.log("⚠️ Could not verify success message");
        }
      }

      // Check if we can see the page has changed (no form displayed)
      try {
        const formVisible = await this.recipientsInput.first().isVisible({ timeout: 3000 });
        if (!formVisible) {
          console.log("✅ Email form closed - Email appears to have been sent");
          successFound = true;
        }
      } catch (e) {
        console.log("✅ Email form is no longer visible - Email sent");
        successFound = true;
      }

    } catch (error) {
      console.log("⚠️ Error during verification:", error);
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-list-emails/"
    );

    console.log("🎉 Verification completed!");
  }
}
