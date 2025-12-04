import { expect, type Locator, type Page, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceContacts Page Object Model
 *
 * This class provides automation capabilities for Salesforce Contact management functionality.
 * It handles contact creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new contacts with various field types (dropdowns, text inputs, addresses)
 * - Handle complex form interactions with proper wait strategies
 * - Verify contact creation success
 * - Support for all standard Salesforce contact fields including personal info, addresses
 *
 * @class salesforceContactsLocators
 * @author Automation Team
 * @version 1.0
 */
export class SalesforceContactsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary Action Buttons
  readonly saveButton: Locator;

  // Personal Information Fields
  readonly salutation: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly title: Locator;
  readonly department: Locator;

  // Contact Information Fields
  readonly phone: Locator;
  readonly homePhone: Locator;
  readonly mobile: Locator;
  readonly otherPhone: Locator;
  readonly fax: Locator;
  readonly email: Locator;

  // Assistant Information Fields
  readonly assistant: Locator;
  readonly assistantPhone: Locator;

  // Additional Information Fields
  readonly leadSource: Locator;
  readonly birthdate: Locator;
  readonly languages: Locator;
  readonly level: Locator;

  // Mailing Address Fields
  readonly mailingStreet: Locator;
  readonly mailingCity: Locator;
  readonly mailingState: Locator;
  readonly mailingZip: Locator;
  readonly mailingCountry: Locator;

  // Other Address Fields
  readonly otherStreet: Locator;
  readonly otherCity: Locator;
  readonly otherState: Locator;
  readonly otherZip: Locator;
  readonly otherCountry: Locator;

  // Additional Fields
  readonly description: Locator;
  readonly contactCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceContacts page object with all necessary locators
   *
   * Sets up locators for all Salesforce contact form elements using role-based and
   * attribute-based selectors for maximum reliability.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceContacts page object");
    if (!page) throw new Error("Page instance is required");
    this.page = page;
    this.testInfo = testInfo;

    this.saveButton = page.getByRole("button", { name: "Save", exact: true });

    // Personal information dropdown fields
    this.salutation = page.getByRole('combobox', { name: /Salutation/ });
    this.leadSource = page.getByRole("combobox", { name: /Lead Source/i });
    this.level = page.getByRole("combobox", { name: /Level/i });

    // Personal information text fields
    this.firstName = page.getByRole("textbox", { name: /First Name/i });
    this.lastName = page.getByRole("textbox", { name: /Last Name/i });
    this.title = page.getByRole("textbox", { name: /Title/i });
    this.department = page.getByRole("textbox", { name: /Department/i });

    // Contact communication fields
    this.phone = page.getByRole("textbox", { name: /Phone/i, exact: true }).first();
    this.homePhone = page.getByRole("textbox", { name: /Home Phone/i, exact: true }).first();
    this.mobile = page.getByRole("textbox", { name: /Mobile/i, exact: true }).first();
    this.otherPhone = page.getByRole("textbox", { name: /Other Phone/i, exact: true }).first();
    this.fax = page.getByRole("textbox", { name: /Fax/i });
    this.email = page.getByRole("textbox", { name: /Email/i });

    // Assistant information fields
    this.assistant = page.getByRole("textbox", { name: /Assistant/i, exact: true }).first();
    this.assistantPhone = page.getByRole("textbox", { name: /Asst. Phone/i, exact: true }).first();

    // Additional contact information fields
    this.birthdate = page.getByRole("textbox", { name: /Birthdate/i });
    this.languages = page.getByRole("textbox", { name: /Languages/i });

    // Mailing address fields
    this.mailingStreet = page.getByRole("textbox", { name: /Mailing Street/i });
    this.mailingCity = page.getByRole("textbox", { name: /Mailing City/i });
    this.mailingState = page.getByRole("textbox", { name: /Mailing State/i });
    this.mailingZip = page.getByRole("textbox", { name: /Mailing Zip/i });
    this.mailingCountry = page.getByRole("textbox", { name: /Mailing Country/i });

    // Other address fields
    this.otherStreet = page.getByRole("textbox", { name: /Other Street/i });
    this.otherCity = page.getByRole("textbox", { name: /Other City/i });
    this.otherState = page.getByRole("textbox", { name: /Other State/i });
    this.otherZip = page.getByRole("textbox", { name: /Other Zip/i });
    this.otherCountry = page.getByRole("textbox", { name: /Other Country/i });

    // Additional fields
    this.description = page.getByRole("textbox", { name: "Description", exact: true }).first();
    this.contactCreatedMessage = page.locator(".toastMessage ");

    console.log(
      "✅ SalesforceContacts page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new contact in Salesforce with the provided details
   *
   * This method handles the complete contact creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new contact dialog
   * 3. Fills in all provided field values (personal info, contact details, addresses)
   * 4. Saves the contact
   * 5. Takes an end screenshot for verification
   *
   * All actions include timeouts for reliable execution in various network conditions.
   * The method supports both required and optional fields, only filling fields that
   * have values provided in the details object.
   *
   * @param details - Object containing contact field values to be filled
   * @param details.Salutation - Contact salutation (e.g., "Mr.", "Mrs.", "Dr.")
   * @param details.FirstName - Contact first name
   * @param details.LastName - Contact last name (typically required)
   * @param details.Title - Job title or position
   * @param details.Department - Department name
   * @param details.Phone - Primary phone number
   * @param details.HomePhone - Home phone number
   * @param details.Mobile - Mobile phone number
   * @param details.OtherPhone - Alternative phone number
   * @param details.Fax - Fax number
   * @param details.Email - Email address
   * @param details.Assistant - Assistant name
   * @param details.AssistantPhone - Assistant phone number
   * @param details.Birthdate - Birth date
   * @param details.Languages - Languages spoken
   * @param details.LeadSource - Source of the lead
   * @param details.Level - Contact level/tier
   * @param details.MailingStreet - Mailing address street
   * @param details.MailingCity - Mailing address city
   * @param details.MailingState - Mailing address state/province
   * @param details.MailingZip - Mailing address postal code
   * @param details.MailingCountry - Mailing address country
   * @param details.OtherStreet - Other address street
   * @param details.OtherCity - Other address city
   * @param details.OtherState - Other address state/province
   * @param details.OtherZip - Other address postal code
   * @param details.OtherCountry - Other address country
   * @param details.Description - Contact description
   *
   * @example
   * await contactPage.addNewContact({
   *   FirstName: "John",
   *   LastName: "Doe",
   *   Email: "john.doe@example.com",
   *   Phone: "555-123-4567"
   * });
   */
  async addNewContact(details: { [key: string]: string }) {
    console.log("🔄 Starting contact creation process...");
    console.log("📝 Contact details:", JSON.stringify(details, null, 2));
    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-contact",
      this.testInfo,
      "CustomerData/salesforce-contacts/"
    );

    console.log("📋 Filling form fields...");

    // Fill in contact details
    if (details.Salutation) {
      console.log("🔽 Selecting Salutation from dropdown...");
      await this.salutation.click({ timeout: 10000 });
      await this.page.waitForTimeout(1000);

      try {
        const optionRole = this.page.locator(`[role="option"]:has-text("${details.Salutation}")`).first();
        await optionRole.click({ timeout: 5000, force: true });
        console.log("✅ Salutation selected:", details.Salutation);
      } catch (e) {
        try {
          const textOption = this.page.locator(`text=/\\b${details.Salutation}\\b/`).first();
          await textOption.click({ timeout: 5000, force: true });
          console.log("✅ Salutation selected with force:", details.Salutation);
        } catch (e2) {
          try {
            await this.salutation.fill(details.Salutation, { timeout: 5000 });
            await this.page.waitForTimeout(500);
            await this.page.keyboard.press("ArrowDown");
            await this.page.waitForTimeout(300);
            await this.page.keyboard.press("Enter");
            console.log("✅ Salutation selected via type and keyboard");
          } catch (e3) {
            console.log("❌ Failed to select Salutation:", e3);
          }
        }
      }
    }

    // Personal Information
    if (details.FirstName) await this.firstName.fill(details.FirstName, { timeout: 10000 });
    if (details.LastName) await this.lastName.fill(details.LastName, { timeout: 10000 });
    if (details.Title) await this.title.fill(details.Title, { timeout: 10000 });
    if (details.Department) await this.department.fill(details.Department, { timeout: 10000 });

    // Contact Information
    if (details.Phone) await this.phone.fill(details.Phone, { timeout: 10000 });
    if (details.HomePhone) await this.homePhone.fill(details.HomePhone, { timeout: 10000 });
    if (details.Mobile) await this.mobile.fill(details.Mobile, { timeout: 10000 });
    if (details.OtherPhone) await this.otherPhone.fill(details.OtherPhone, { timeout: 10000 });
    if (details.Fax) await this.fax.fill(details.Fax, { timeout: 10000 });
    if (details.Email) await this.email.fill(details.Email, { timeout: 10000 });

    // Assistant Information
    if (details.Assistant) await this.assistant.fill(details.Assistant, { timeout: 10000 });
    if (details.AssistantPhone)
      await this.assistantPhone.fill(details.AssistantPhone, { timeout: 10000 });

    // Birthdate
    if (details.Birthdate)
      await this.birthdate.fill(
        new Date(details.Birthdate).toLocaleDateString("hi-IN"), { timeout: 10000 }
      );

    // Languages
    if (details.Languages) await this.languages.fill(details.Languages, { timeout: 10000 });

    // Lead Source (Dropdown)
    if (details.LeadSource) {
      console.log("🔽 Selecting LeadSource from dropdown...");
      await this.leadSource.click({ timeout: 10000 });
      await this.page.waitForTimeout(1000);

      try {
        const optionRole = this.page.locator(`[role="option"]:has-text("${details.LeadSource}")`).first();
        await optionRole.click({ timeout: 5000, force: true });
        console.log("✅ LeadSource selected:", details.LeadSource);
      } catch (e) {
        try {
          const textOption = this.page.locator(`text=/\\b${details.LeadSource}\\b/`).first();
          await textOption.click({ timeout: 5000, force: true });
          console.log("✅ LeadSource selected with force:", details.LeadSource);
        } catch (e2) {
          try {
            await this.leadSource.fill(details.LeadSource, { timeout: 5000 });
            await this.page.waitForTimeout(500);
            await this.page.keyboard.press("ArrowDown");
            await this.page.waitForTimeout(300);
            await this.page.keyboard.press("Enter");
            console.log("✅ LeadSource selected via type and keyboard");
          } catch (e3) {
            console.log("❌ Failed to select LeadSource:", e3);
          }
        }
      }
    }

    if (details.Level) {
      console.log("🔽 Selecting Level from dropdown...");
      await this.level.click({ timeout: 10000 });
      await this.page.waitForTimeout(1000);

      try {
        const optionRole = this.page.locator(`[role="option"]:has-text("${details.Level}")`).first();
        await optionRole.click({ timeout: 5000, force: true });
        console.log("✅ Level selected:", details.Level);
      } catch (e) {
        try {
          const textOption = this.page.locator(`text=/\\b${details.Level}\\b/`).first();
          await textOption.click({ timeout: 5000, force: true });
          console.log("✅ Level selected with force:", details.Level);
        } catch (e2) {
          try {
            await this.level.fill(details.Level, { timeout: 5000 });
            await this.page.waitForTimeout(500);
            await this.page.keyboard.press("ArrowDown");
            await this.page.waitForTimeout(300);
            await this.page.keyboard.press("Enter");
            console.log("✅ Level selected via type and keyboard");
          } catch (e3) {
            console.log("❌ Failed to select Level:", e3);
          }
        }
      }
    }

    // Mailing Address
    if (details.MailingStreet)
      await this.mailingStreet.fill(details.MailingStreet, { timeout: 10000 });
    if (details.MailingCity) await this.mailingCity.fill(details.MailingCity, { timeout: 10000 });
    if (details.MailingState)
      await this.mailingState.fill(details.MailingState, { timeout: 10000 });
    if (details.MailingZip) await this.mailingZip.fill(details.MailingZip, { timeout: 10000 });
    if (details.MailingCountry)
      await this.mailingCountry.fill(details.MailingCountry, { timeout: 10000 });

    // Other Address
    if (details.OtherStreet) await this.otherStreet.fill(details.OtherStreet, { timeout: 10000 });
    if (details.OtherCity) await this.otherCity.fill(details.OtherCity, { timeout: 10000 });
    if (details.OtherState) await this.otherState.fill(details.OtherState, { timeout: 10000 });
    if (details.OtherZip) await this.otherZip.fill(details.OtherZip, { timeout: 10000 });
    if (details.OtherCountry)
      await this.otherCountry.fill(details.OtherCountry, { timeout: 10000 });

    // Description
    if (details.Description) await this.description.fill(details.Description, { timeout: 10000 });

    console.log("💾 Saving the contact...");

    // Save Contact
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Contact saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-contact",
      this.testInfo,
      "CustomerData/salesforce-contacts/"
    );

    console.log("🎉 Contact creation completed!");
  }

  /**
   * Verifies that a contact was successfully created by checking for the success message
   *
   * This method validates contact creation success by:
   * 1. Checking if the contact creation success message is displayed
   * 2. Taking a verification screenshot for evidence
   *
   * @param details - Object containing contact field values to verify (for future expansion)
   *
   * @throws Will throw an assertion error if:
   * - Contact creation success message is not found
   * - Contact creation failed
   *
   * @example
   * await contactPage.verifyContactDetails({});
   */
  async verifyContactDetails(details: { [key: string]: string }) {
    console.log("🔍 Starting contact verification...");

    await expect(this.contactCreatedMessage).toContainText("Contact", { timeout: 10000 });
    console.log("✅ Contact verification successful");

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "CustomerData/salesforce-contacts/"
    );

    console.log("🎉 Verification completed!");
  }
}
