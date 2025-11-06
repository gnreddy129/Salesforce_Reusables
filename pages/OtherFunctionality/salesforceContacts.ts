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
  readonly newContactButton: Locator;
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

    // Primary action buttons - Contact creation and saving
    this.newContactButton = page.locator(
      'div[title="New"] button, button:has-text("New")'
    );
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });

    // Personal information dropdown fields
    this.salutation = page.locator(
      '[name="salutation"], button:has-text("Salutation")'
    );
    this.leadSource = page.getByRole("combobox", { name: "Lead Source" });
    this.level = page.getByRole("combobox", { name: "Level" });

    // Personal information text fields
    this.firstName = page.locator(
      'input[name="firstName"], [name="FirstName"]'
    );
    this.lastName = page.locator('input[name="lastName"], [name="LastName"]');
    this.title = page.locator('input[name="Title"]');
    this.department = page.locator(
      'input[name="Department"], [name="department"]'
    );

    // Contact communication fields
    this.phone = page.locator('input[name="Phone"], [name="phone"]');
    this.homePhone = page.locator(
      'input[name="HomePhone"], [name="homePhone"]'
    );
    this.mobile = page.locator(
      'input[name="MobilePhone"], [name="mobilePhone"]'
    );
    this.otherPhone = page.locator(
      'input[name="OtherPhone"], [name="otherPhone"]'
    );
    this.fax = page.locator('input[name="Fax"], [name="fax"]');
    this.email = page.locator('input[name="Email"], [name="email"]');

    // Assistant information fields
    this.assistant = page.locator('input[name="AssistantName"]');
    this.assistantPhone = page.locator('input[name="AssistantPhone"]');

    // Additional contact information fields
    this.birthdate = page.locator('input[name="Birthdate"]');
    this.languages = page.locator('input[name="Languages__c"]');

    // Mailing address fields
    this.mailingStreet = page.getByLabel("Mailing Street");
    this.mailingCity = page.locator(
      '[field-label="Mailing Address"] [name="city"]'
    );
    this.mailingState = page.locator(
      '[field-label="Mailing Address"] [name="province"]'
    );
    this.mailingZip = page.locator(
      '[field-label="Mailing Address"] [name="postalCode"]'
    );
    this.mailingCountry = page.locator(
      '[field-label="Mailing Address"] [name="country"]'
    );

    // Other address fields
    this.otherStreet = page.getByLabel("Other Street");
    this.otherCity = page.locator(
      '[field-label="Other Address"] [name="city"]'
    );
    this.otherState = page.locator(
      '[field-label="Other Address"] [name="province"]'
    );
    this.otherZip = page.locator(
      '[field-label="Other Address"] [name="postalCode"]'
    );
    this.otherCountry = page.locator(
      '[field-label="Other Address"] [name="country"]'
    );

    // Additional fields
    this.description = page.getByRole("textbox", {
      name: "Description",
      exact: true,
    });

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
    await expect(this.newContactButton).toBeVisible({ timeout: 10000 });
    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-contact",
      this.testInfo,
      "OtherFunctionality/salesforce-contacts/"
    );

    // Click New Contact
    await this.newContactButton.click({ timeout: 10000 });
    console.log("✅ Contact creation dialog opened");

    console.log("📋 Filling form fields...");

    // Fill in contact details
    if (details.Salutation) {
      await this.salutation.click({ timeout: 10000 });
      await this.page
        .locator(
          `lightning-base-combobox-item[data-value="${details.Salutation}"]`
        )
        .click();
    }

    // Personal Information
    if (details.FirstName) await this.firstName.fill(details.FirstName,{ timeout: 10000 });
    if (details.LastName) await this.lastName.fill(details.LastName,{ timeout: 10000 });
    if (details.Title) await this.title.fill(details.Title,{ timeout: 10000 });
    if (details.Department) await this.department.fill(details.Department,{ timeout: 10000 });

    // Contact Information
    if (details.Phone) await this.phone.fill(details.Phone,{ timeout: 10000 });
    if (details.HomePhone) await this.homePhone.fill(details.HomePhone,{ timeout: 10000 });
    if (details.Mobile) await this.mobile.fill(details.Mobile,{ timeout: 10000 });
    if (details.OtherPhone) await this.otherPhone.fill(details.OtherPhone,{ timeout: 10000 });
    if (details.Fax) await this.fax.fill(details.Fax,{ timeout: 10000 });
    if (details.Email) await this.email.fill(details.Email,{ timeout: 10000 });

    // Assistant Information
    if (details.Assistant) await this.assistant.fill(details.Assistant,{ timeout: 10000 });
    if (details.AssistantPhone)
      await this.assistantPhone.fill(details.AssistantPhone,{ timeout: 10000 });

    // Birthdate
    if (details.Birthdate)
      await this.birthdate.fill(
        new Date(details.Birthdate).toLocaleDateString("hi-IN"),{ timeout: 10000 }
      );

    // Languages
    if (details.Languages) await this.languages.fill(details.Languages,{ timeout: 10000 });

    // Lead Source
    if (details.LeadSource) {
      await this.leadSource.click({ timeout: 10000 });
      await expect(
        this.page.locator(
          `lightning-base-combobox-item[data-value="${details.LeadSource}"]`
        )
      ).toBeVisible({ timeout: 10000 });
      await this.page
        .locator(
          `lightning-base-combobox-item[data-value="${details.LeadSource}"]`
        )
        .click({ timeout: 10000 });
    }

    // Level
    if (details.Level) {
      await this.level.click();
      await this.page
        .locator(`lightning-base-combobox-item[data-value="${details.Level}"]`)
        .click({ timeout: 10000 });
    }

    // Mailing Address
    if (details.MailingStreet)
      await this.mailingStreet.fill(details.MailingStreet,{ timeout: 10000 });
    if (details.MailingCity) await this.mailingCity.fill(details.MailingCity,{ timeout: 10000 });
    if (details.MailingState)
      await this.mailingState.fill(details.MailingState,{ timeout: 10000 });
    if (details.MailingZip) await this.mailingZip.fill(details.MailingZip,{ timeout: 10000 });
    if (details.MailingCountry)
      await this.mailingCountry.fill(details.MailingCountry,{ timeout: 10000 });

    // Other Address
    if (details.OtherStreet) await this.otherStreet.fill(details.OtherStreet,{ timeout: 10000 });
    if (details.OtherCity) await this.otherCity.fill(details.OtherCity,{ timeout: 10000 });
    if (details.OtherState) await this.otherState.fill(details.OtherState,{ timeout: 10000 });
    if (details.OtherZip) await this.otherZip.fill(details.OtherZip,{ timeout: 10000 });
    if (details.OtherCountry)
      await this.otherCountry.fill(details.OtherCountry,{ timeout: 10000 });

    // Description
    if (details.Description) await this.description.fill(details.Description,{ timeout: 10000 });

    console.log("💾 Saving the contact...");

    // Save Contact
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Contact saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-contact",
      this.testInfo,
      "OtherFunctionality/salesforce-contacts/"
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

    await expect(this.contactCreatedMessage).toContainText("Contact",{ timeout: 10000 });
    console.log("✅ Contact verification successful");

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-contacts/"
    );

    console.log("🎉 Verification completed!");
  }
}
