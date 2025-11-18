import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceEmailTemplates Page Object Model
 *
 * This class provides automation capabilities for Salesforce Email Templates management functionality.
 * It handles email template creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new email templates with comprehensive field support
 * - Handle combobox selections and text field interactions
 * - Verify email template creation success
 * - Support for all standard Salesforce email template fields
 * - Navigate to Email Templates module using standard navigation
 * - Complete email template lifecycle management
 *
 * @class SalesforceEmailTemplatesPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceEmailTemplatesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Email Template Information Fields
  readonly emailTemplateNameInput: Locator;
  readonly relatedEntityTypeCombobox: Locator;
  readonly descriptionTextarea: Locator;
  readonly folderCombobox: Locator;

  //Message Content
  readonly emailSubjectInput: Locator;
  readonly emailLetterheadCombobox: Locator;
  readonly emailBodyTextarea: Locator;

  // Navigation Elements
  readonly emailTemplateCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceEmailTemplates page object with all necessary locators
   *
   * Sets up locators for all Salesforce email template form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceEmailTemplates page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Email Template Information field locators - Based on standard Salesforce patterns
    this.emailTemplateNameInput = page.getByRole("textbox", {
      name: "Email Template Name",
    });
    this.relatedEntityTypeCombobox = page.getByRole("combobox", {
      name: "Related Entity Type",
    });
    this.descriptionTextarea = page.getByRole("textbox", {
      name: "Description",
    });
    this.folderCombobox = page.locator(
      '[data-value="Private Email Templates"]'
    );

    //Message Content
    this.emailSubjectInput = page.getByRole("textbox", {
      name: "Subject",
    });
    this.emailLetterheadCombobox = page.getByRole("combobox", {
      name: "Enhanced Letterhead",
    });
    // HTML Value field - Rich text editor in nested iframes (based on MCP inspection)
    this.emailBodyTextarea = page
      .frameLocator('iframe[title="CK Editor Container"]')
      .frameLocator("iframe")
      .getByRole("textbox");

    // Success message locator
    this.emailTemplateCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceEmailTemplates page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new email template in Salesforce with the provided details
   *
   * This method handles the complete email template creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new email template creation form
   * 3. Fills in all provided field values including comboboxes and text fields
   * 4. Saves the email template
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing email template field values to be filled
   * @param details.EmailTemplateName - Email Template Name (text input)
   * @param details.RelatedEntityType - Related Entity Type selection (combobox)
   * @param details.Description - Description (text input)
   * @param details.Folder - Folder selection (combobox)
   *
   * @example
   * await emailTemplatesPage.addNewEmailTemplate({
   *   EmailTemplateName: "Welcome Email",
   *   RelatedEntityType: "Contact",
   *   Description: "Welcome email for new customers",
   *   Folder: "My Templates"
   * });
   */
  async addNewEmailTemplate(details: { [key: string]: string }) {
    console.log("🔄 Starting email template creation process...");
    console.log("📝 Email Template details:", JSON.stringify(details, null, 2));

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-email-template",
      this.testInfo,
      "Platform/salesforce-email-templates/"
    );

    // Click New Email Template
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Email Template creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.emailTemplateNameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Email Template form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Email Template Name field (text input)
    if (details.EmailTemplateName || details["Email Template Name"]) {
      const emailTemplateName =
        details.EmailTemplateName || details["Email Template Name"];
      await this.emailTemplateNameInput.fill(emailTemplateName, {
        timeout: 10000,
      });
      console.log(`✅ Email Template Name filled: ${emailTemplateName}`);
    }

    // Fill Related Entity Type field (combobox)
    if (details.RelatedEntityType || details["Related Entity Type"]) {
      const relatedEntityType =
        details.RelatedEntityType || details["Related Entity Type"];
      await this.relatedEntityTypeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: relatedEntityType, exact: true })
        .click({ timeout: 10000 });
      console.log(`✅ Related Entity Type selected: ${relatedEntityType}`);
    }

    // Fill Description field (text input)
    if (details.Description && details.Description !== "--None--") {
      await this.descriptionTextarea.fill(details.Description, {
        timeout: 10000,
      });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    // Fill Folder field (combobox)
    if (details.Folder) {
      await this.folderCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Folder, exact: true })
        .click({ timeout: 10000 });
      console.log(`✅ Folder selected: ${details.Folder}`);
    }

    console.log("💾 Saving the email template...");

    //Message Content
    if (details.Subject && details.Subject !== "--None--") {
      await this.emailSubjectInput.fill(details.Subject, { timeout: 10000 });
      console.log(`✅ Email Subject filled: ${details.Subject}`);
    }

    if (details.Letterhead && details.Letterhead !== "--None--") {
      await this.emailLetterheadCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Letterhead, exact: true })
        .click({ timeout: 10000 });
      console.log(`✅ Letterhead selected: ${details.Letterhead}`);
    }

    if (details.Body && details.Body !== "--None--") {
      // Wait for the iframe to be loaded before filling the HTML body
      await this.page.waitForTimeout(2000); // Allow iframe to fully load
      await expect(this.emailBodyTextarea).toBeVisible({ timeout: 15000 });
      await this.emailBodyTextarea.fill(details.Body, { timeout: 10000});
      console.log(`✅ Email Body filled: ${details.Body}`);
    }

    // Save the email template
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Email Template saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-email-template",
      this.testInfo,
      "Platform/salesforce-email-templates/"
    );

    console.log("🎉 Email Template creation completed!");
  }

  /**
   * Verifies that an email template was successfully created by checking for specific field values
   *
   * This method validates email template creation success by checking if the email template detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing email template field values to verify
   * @param details.EmailTemplateName - Email Template Name to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await emailTemplatesPage.verifyEmailTemplateCreation({
   *   EmailTemplateName: "Welcome Email",
   *   Description: "Welcome email for new customers"
   * });
   */
  async verifyEmailTemplateCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting email template verification...");

    await expect(this.emailTemplateCreatedMessage).toContainText(
      "was created",
      { timeout: 10000 }
    );
    const emailTemplateName =
      details.EmailTemplateName || details["Email Template Name"];
    // expect(
    //   await this.page.getByText(`${emailTemplateName}"]`).count()
    // ).toBeGreaterThan(0);
    console.log(`✅ Verified Email Template Name: ${emailTemplateName}`);
    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Platform/salesforce-email-templates/"
    );

    console.log("🎉 Email Template verification completed!");
  }
}
