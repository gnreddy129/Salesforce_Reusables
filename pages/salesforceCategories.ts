import { expect, Page, Locator } from "@playwright/test";

export default class SalesforceCategories {
  readonly page: Page;
  readonly newButton: Locator;
  readonly dialog: Locator;
  readonly listbox: Locator;
  readonly nameTextbox: Locator;
  readonly parentCombo: Locator;
  readonly catalogCombo: Locator;
  readonly descriptionTextbox: Locator;
  readonly showInMenuCheckbox: Locator;
  readonly sortOrder: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newButton = this.page.getByRole("button", { name: /New/i }).first();
    this.dialog = this.page.getByRole("dialog", { name: /New Category/i });
    this.listbox = this.page.getByRole("listbox").first();

    this.nameTextbox = this.dialog.getByRole("textbox", { name: /Name/i });
    this.parentCombo = this.dialog
      .getByRole("combobox", { name: /Parent Category|ParentCategory/i })
      .first();
    this.catalogCombo = this.dialog.getByRole("combobox", {
      name: /Catalog/i,
    });
    // this.catalogCombo = this.page.getByPlaceholder("Select Catalog...");
    this.descriptionTextbox = this.dialog.getByRole("textbox", {
      name: /Description/i,
    });
    this.showInMenuCheckbox = this.dialog.getByRole("checkbox", {
      name: /Show in Menu/i,
    });
    this.sortOrder = this.dialog.getByRole("textbox", { name: /Sort Order/i });
    this.saveButton = this.dialog
      .getByRole("button", { name: /Save/i })
      .first();
  }

  async addNewCategory(details: { [k: string]: string }) {
    // Click New and wait for dialog
    await this.newButton.click();

    // Combobox selection helper
    const selectFromList = async (combo: Locator, value: string) => {
      await combo.click();
      await this.listbox.getByRole("option", { name: value }).first().click();
    };

    // Name
    if (details.Name) {
      await this.nameTextbox.fill(details.Name);
    }

    // Parent Category
    if (details.ParentCategory && details.ParentCategory !== "--None--") {
      await selectFromList(this.parentCombo, details.ParentCategory);
    }

    // Catalog
    if (details.Catalog && details.Catalog !== "--None--") {
      await selectFromList(this.catalogCombo, details.Catalog);
    }

    // Description
    if (details.Description) {
      await this.descriptionTextbox.fill(details.Description);
    }

    // Show in Menu
    if (details.ShowMenu) {
      const checked = (details.ShowMenu + "").toLowerCase() === "true";
      if ((await this.showInMenuCheckbox.isChecked()) !== checked) {
        await this.showInMenuCheckbox.click();
      }
    }

    // Sort Order
    if (details.SortOrder) {
      await this.sortOrder.fill(details.SortOrder);
    }

    // Save
    await this.saveButton.click();
    
    await this.page.waitForTimeout(1000);
  }

  async verifyCategory(details: { [k: string]: string }) {
    if (details.Name) {
      await expect(
        await this.page.getByText(details.Name, { exact: true }).count()
      ).toBeGreaterThan(0);
    }
  }
}
