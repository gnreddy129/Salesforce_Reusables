import { expect, Locator, Page } from "@playwright/test";

export default class SalesforceAppointmentInvitation {
  readonly page: Page;
  readonly listbox: Locator;
  readonly newButton: Locator;
  readonly dialogs: Locator;
  readonly startDate: Locator;
  readonly endDate: Locator;
  readonly urlExpirationDate: Locator;
  readonly activeCheckbox: Locator;
  readonly appointmentTopic: Locator;
  readonly serviceTerritory: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.listbox = this.page.getByRole("listbox").first();
    this.newButton = page.getByRole("button", {
      name: /New|New Appointment Invitation|New Invitation/i,
    });
    this.dialogs = page.getByRole("dialog");
    this.startDate = this.dialogs
      .getByRole("textbox", {
        name: /Booking Start Date|Booking Start|Start Date/i,
      })
      .first();
    this.endDate = this.dialogs
      .getByRole("textbox", {
        name: /Booking End Date|Booking End|End Date/i,
      })
      .first();
    this.urlExpirationDate = this.dialogs
      .getByRole("textbox", {
        name: /URL Expiration Date|URL Expiration|Expiration Date/i,
      })
      .first();
    this.activeCheckbox = this.dialogs
      .getByRole("checkbox", { name: /Active/i })
      .first();
    this.appointmentTopic = this.dialogs
      .getByRole("combobox", { name: /Appointment Topic|Appointment Topic/i })
      .first();
    this.serviceTerritory = this.dialogs
      .getByRole("combobox", { name: /Service Territory|Service Territory/i })
      .first();
    this.saveButton = this.dialogs
      .getByRole("button", { name: /Save & New|Save/i })
      .first();
  }

  async addNewAppointmentInvitation(details: { [k: string]: string }) {
    // Combobox selection helper
    const selectFromList = async (combo: Locator, value: string) => {
      await combo.click();
      await this.page.getByText(value).click();
      // await this.listbox
      //   .getByRole("option", { name: value, exact: true })
      //   .click();
    };

    // Click New and wait for dialog
    await this.newButton.click();

    // Start Date
    await this.startDate.fill(details.BookingStartDate);

    // End Date
    await this.endDate.fill(details.BookingEndDate);

    // URL Expiration Date
    await this.urlExpirationDate.fill(details.URLExpirationDate);

    // Active checkbox
    if (
      details.Active === "true" ||
      details.Active === "yes" ||
      details.Active === "1"
    ) {
      if ((await this.activeCheckbox.count()) > 0) {
        this.activeCheckbox.check();
        const isChecked = await this.activeCheckbox.isChecked();
        if (isChecked !== true) {
          await this.activeCheckbox.click();
        }
      }
    }

    // Appointment Topic (combobox)
    if (details.AppointmentTopic) {
      await selectFromList(this.appointmentTopic, details.AppointmentTopic);
    }

    // Service Territory (combobox)
    if (details.ServiceTerritory) {
      await selectFromList(this.serviceTerritory, details.ServiceTerritory);
    }

    // Save
    await this.saveButton.click();
  }

  async verifyInvitation(details: { [k: string]: string }) {
    await this.page.waitForTimeout(1000);
    if (details.AppointmentTopic) {
      expect(
        this.page.getByText(details.AppointmentTopic, { exact: true }).count()
      ).toBeGreaterThan(0);
    }
  }
}
