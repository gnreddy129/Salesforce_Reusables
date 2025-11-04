import { expect, Page, Locator } from "@playwright/test";

export default class SalesforceCases {
  readonly page: Page;
  readonly newButton: Locator;
  readonly dialog: Locator;
  readonly listbox: Locator;
  readonly statusCombo: Locator;
  readonly originCombo: Locator;
  readonly priorityCombo: Locator;
  readonly typeCombo: Locator;
  readonly reasonCombo: Locator;
  readonly prodCombo: Locator;
  readonly plCombo: Locator;
  readonly slaCombo: Locator;
  readonly engineeringReqTextbox: Locator;
  readonly subjectTextbox: Locator;
  readonly descriptionTextbox: Locator;
  readonly internalCommentsTextbox: Locator;
  readonly webEmailTextbox: Locator;
  readonly webCompanyTextbox: Locator;
  readonly webNameTextbox: Locator;
  readonly webPhoneTextbox: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // primary controls
    this.newButton = this.page.getByRole("button", { name: /New/i }).first();
    this.dialog = this.page.getByRole("dialog").first();
    this.listbox = this.page.getByRole("listbox").first();
    
    // comboboxes (scoped to dialog locator)
    this.statusCombo = this.dialog
      .getByRole("combobox", { name: /Status/i })
      .first();
    this.originCombo = this.dialog
      .getByRole("combobox", { name: /Case Origin|CaseOrigin/i })
      .first();
    this.priorityCombo = this.dialog
      .getByRole("combobox", { name: /Priority/i })
      .first();
    this.typeCombo = this.dialog
      .getByRole("combobox", { name: /Type/i })
      .first();
    this.reasonCombo = this.dialog
      .getByRole("combobox", { name: /Case Reason|CaseReason/i })
      .first();
    this.prodCombo = this.dialog
      .getByRole("combobox", { name: /Product/i })
      .first();
    this.plCombo = this.dialog
      .getByRole("combobox", { name: /Potential Liability/i })
      .first();
    this.slaCombo = this.dialog
      .getByRole("combobox", { name: /SLA Violation|SLA/i })
      .first();

    // textboxes
    this.engineeringReqTextbox = this.dialog.getByRole("textbox", {
      name: /Engineering Req Number/i,
    });
    this.subjectTextbox = this.dialog.getByRole("textbox", {
      name: /Subject/i,
    });
    this.descriptionTextbox = this.dialog.getByRole("textbox", {
      name: /Description/i,
    });
    this.internalCommentsTextbox = this.dialog.getByRole("textbox", {
      name: /Internal Comments/i,
    });

    // web info textboxes
    this.webEmailTextbox = this.dialog.getByRole("textbox", {
      name: /Web Email/i,
    });
    this.webCompanyTextbox = this.dialog.getByRole("textbox", {
      name: /Web Company/i,
    });
    this.webNameTextbox = this.dialog.getByRole("textbox", {
      name: /Web Name/i,
    });
    this.webPhoneTextbox = this.dialog.getByRole("textbox", {
      name: /Web Phone/i,
    });

    // save
    this.saveButton = this.dialog
      .getByRole("button", { name: /^Save$/i })
      .first();
  }

  async addNewCase(details: { [k: string]: string }) {
    await this.newButton.click();

    // Combobox selection helper
    const selectFromList = async (combo: Locator, value: string) => {
      await combo.click();
      await this.listbox
        .getByRole("option", { name: value, exact: true })
        .click();
    };

    // Status
    if (details.Status) {
      await selectFromList(this.statusCombo, details.Status);
    }

    // Case Origin
    if (details.CaseOrigin) {
      await selectFromList(this.originCombo, details.CaseOrigin);
    }

    // Priority
    if (details.Priority) {
      await selectFromList(this.priorityCombo, details.Priority);
    }

    // Type
    if (details.Type) {
      await selectFromList(this.typeCombo, details.Type);
    }

    // Case Reason
    if (details.CaseReason) {
      await selectFromList(this.reasonCombo, details.CaseReason);
    }

    // Product
    if (details.Product) {
      await selectFromList(this.prodCombo, details.Product);
    }

    // Potential Liability
    if (details.PotentialLiability) {
      await selectFromList(this.plCombo, details.PotentialLiability);
    }

    // SLA Violation
    if (details.SLA) {
      await selectFromList(this.slaCombo, details.SLA);
    }

    // Engineering Req Number
    if (details.EngineeringReqNumber) {
      await this.engineeringReqTextbox.fill(details.EngineeringReqNumber);
    }

    // Subject
    if (details.Subject) {
      await this.subjectTextbox.fill(details.Subject);
    }

    // Description
    if (details.Description) {
      await this.descriptionTextbox.fill(details.Description);
    }

    // Internal Comments
    if (details.InternalComments) {
      await this.internalCommentsTextbox.fill(details.InternalComments);
    }

    // Web Information
    if (details.WebEmail) {
      await this.webEmailTextbox.fill(details.WebEmail);
    }
    if (details.WebCompany) {
      await this.webCompanyTextbox.fill(details.WebCompany);
    }
    if (details.WebName) {
      await this.webNameTextbox.fill(details.WebName);
    }
    if (details.WebPhone) {
      await this.webPhoneTextbox.fill(details.WebPhone);
    }

    // Save
    await this.saveButton.click();

    // wait and verify
    await this.page.waitForTimeout(1000);
  }

  async verifyCase(details: { [k: string]: string }) {
    if (details.Subject) {
      await expect(
        this.page.locator(`[title="${details.Subject}"]`)
      ).toBeVisible();
    }
  }
}
