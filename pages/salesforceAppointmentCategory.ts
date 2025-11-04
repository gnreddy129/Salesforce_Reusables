import { expect, type Locator, type Page } from "@playwright/test";

export class salesforceAppointmentCategoryLocators {
  readonly page: Page;
  readonly newButton: Locator;
  readonly nameField: Locator;
  readonly descriptionField: Locator;
  readonly saveButton: Locator;
  readonly regularCheckbox: Locator;
  readonly dropInCheckbox: Locator;
  readonly groupCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newButton = page.getByRole("button", { name: /New|New Category/i });
    this.nameField = page.getByRole("textbox", { name: /Name|Category Name/i });
    this.regularCheckbox = page.getByRole("checkbox", { name: /Regular/i });
    this.dropInCheckbox = page.getByRole("checkbox", { name: /Drop In/i });
    this.groupCheckbox = page.getByRole("checkbox", { name: /Group/i });
    this.saveButton = page.getByRole("button", { name: /^Save$/i });
  }

  async addNewAppointmentCategory(details: { [key: string]: string }) {
    // Click New and wait for dialog
    await this.newButton.click();
    const dialog = this.page.getByRole("dialog", {
      name: /New|New Appointment Category|New Category/i,
    });

    await dialog.waitFor({ state: "visible", timeout: 8000 });

    // Category Name
    if (details.Name)
      await dialog
        .getByRole("textbox", { name: /Name|Category Name/i })
        .fill(details.Name);

    // Description
    if (details.Description)
      await dialog
        .getByRole("textbox", { name: /Description/i })
        .fill(details.Description);

    // Checkboxes
    if (details.Regular?.toLowerCase() === "yes") {
      await this.regularCheckbox.check();
    }

    // Drop In
    if (details.DropIn?.toLowerCase() === "yes") {
      await this.dropInCheckbox.check();
    }

    // Group
    if (details.Group?.toLowerCase() === "yes") {
      await this.groupCheckbox.check();
    }

    // Save
    const dialogSave = dialog.getByRole("button", { name: /^Save$/i });
    if ((await dialogSave.count()) > 0) {
      await dialogSave.click();
    } else {
      await this.saveButton.click();
    }

    await this.page.waitForTimeout(1000);
  }

  async verifyAppointmentCategory(details: { [key: string]: string }) {
    if (details.Name)
      expect(await this.page.getByText(details.Name).count()).toBeGreaterThan(
        0
      );
  }
}
