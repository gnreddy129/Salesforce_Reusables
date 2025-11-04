import { expect, type Locator, type Page } from "@playwright/test";

export class salesforceContactsLocators {
  readonly page: Page;
  readonly newContactButton: Locator;
  readonly salutation: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly title: Locator;
  readonly phone: Locator;
  readonly homePhone: Locator;
  readonly mobile: Locator;
  readonly otherPhone: Locator;
  readonly fax: Locator;
  readonly email: Locator;
  readonly assistant: Locator;
  readonly assistantPhone: Locator;
  readonly department: Locator;
  readonly leadSource: Locator;
  readonly birthdate: Locator;
  readonly languages: Locator;
  readonly level: Locator;
  readonly mailingStreet: Locator;
  readonly mailingCity: Locator;
  readonly mailingState: Locator;
  readonly mailingZip: Locator;
  readonly mailingCountry: Locator;
  readonly otherStreet: Locator;
  readonly otherCity: Locator;
  readonly otherState: Locator;
  readonly otherZip: Locator;
  readonly otherCountry: Locator;
  readonly description: Locator;
  readonly saveButton: Locator;
  readonly contactCreatedMessage: Locator;

  constructor(page: Page) {
    if (!page) throw new Error("Page instance is required");
    this.page = page;

    // Buttons
    this.newContactButton = page.locator(
      'div[title="New"] button, button:has-text("New")'
    );
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });

    // Dropdown Fields
    this.salutation = page.locator(
      '[name="salutation"], button:has-text("Salutation")'
    );
    this.leadSource = page.getByRole("combobox", { name: "Lead Source" });
    this.level = page.getByRole("combobox", { name: "Level" });

    // Text Fields
    this.firstName = page.locator(
      'input[name="firstName"], [name="FirstName"]'
    );
    this.lastName = page.locator('input[name="lastName"], [name="LastName"]');
    this.title = page.locator('input[name="Title"]');
    this.department = page.locator(
      'input[name="Department"], [name="department"]'
    );

    // Contact Information
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

    // Assistant Information
    this.assistant = page.locator('input[name="AssistantName"]');
    this.assistantPhone = page.locator('input[name="AssistantPhone"]');

    // Additional Information
    this.birthdate = page.locator('input[name="Birthdate"]');
    this.languages = page.locator('input[name="Languages__c"]');

    // Mailing Address Fields
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

    // Other Address Fields
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

    // Other Fields
    this.description = page.getByRole("textbox", {
      name: "Description",
      exact: true,
    });

    this.contactCreatedMessage = page.locator(".toastMessage ");
  }

  async addNewContact(details: { [key: string]: string }) {
    // Click New Contact
    await this.newContactButton.click();

    // Fill in details
    if (details.Salutation) {
      await this.salutation.click();
      await this.page
        .locator(
          `lightning-base-combobox-item[data-value="${details.Salutation}"]`
        )
        .click();
    }

    //Personal Information
    if (details.FirstName) await this.firstName.fill(details.FirstName);
    if (details.LastName) await this.lastName.fill(details.LastName);
    if (details.Title) await this.title.fill(details.Title);
    if (details.Department) await this.department.fill(details.Department);

    // Contact Information
    if (details.Phone) await this.phone.fill(details.Phone);
    if (details.HomePhone) await this.homePhone.fill(details.HomePhone);
    if (details.Mobile) await this.mobile.fill(details.Mobile);
    if (details.OtherPhone) await this.otherPhone.fill(details.OtherPhone);
    if (details.Fax) await this.fax.fill(details.Fax);
    if (details.Email) await this.email.fill(details.Email);

    // Assistant Information
    if (details.Assistant) await this.assistant.fill(details.Assistant);
    if (details.AssistantPhone)
      await this.assistantPhone.fill(details.AssistantPhone);

    // Birthdate
    if (details.Birthdate)
      await this.birthdate.fill(
        new Date(details.Birthdate).toLocaleDateString("hi-IN")
      );

    // Languages
    if (details.Languages) await this.languages.fill(details.Languages);

    // Lead Source
    if (details.LeadSource) {
      await this.leadSource.click();
      await expect(
        this.page.locator(
          `lightning-base-combobox-item[data-value="${details.LeadSource}"]`
        )
      ).toBeVisible();
      await this.page
        .locator(
          `lightning-base-combobox-item[data-value="${details.LeadSource}"]`
        )
        .click();
    }

    // Level
    if (details.Level) {
      await this.level.click();
      await this.page
        .locator(`lightning-base-combobox-item[data-value="${details.Level}"]`)
        .click();
    }

    // Mailing Address
    if (details.MailingStreet)
      await this.mailingStreet.fill(details.MailingStreet);
    if (details.MailingCity) await this.mailingCity.fill(details.MailingCity);
    if (details.MailingState)
      await this.mailingState.fill(details.MailingState);
    if (details.MailingZip) await this.mailingZip.fill(details.MailingZip);
    if (details.MailingCountry)
      await this.mailingCountry.fill(details.MailingCountry);

    // Other Address
    if (details.OtherStreet) await this.otherStreet.fill(details.OtherStreet);
    if (details.OtherCity) await this.otherCity.fill(details.OtherCity);
    if (details.OtherState) await this.otherState.fill(details.OtherState);
    if (details.OtherZip) await this.otherZip.fill(details.OtherZip);
    if (details.OtherCountry)
      await this.otherCountry.fill(details.OtherCountry);

    // Description
    if (details.Description) await this.description.fill(details.Description);

    // Save Contact
    await this.saveButton.click();
  }

  async verifyContactDetails(details: { [key: string]: string }) {
    await expect(this.contactCreatedMessage).toContainText("Contact");
  }
}
