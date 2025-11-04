import { expect, type Locator, type Page } from "@playwright/test";

export class salesforceCatalogLocators {
  readonly page: Page;
  readonly newItemButton: Locator;
  readonly itemName: Locator;
  readonly dialog: Locator;
  readonly dialogName: Locator;
  readonly dialogSave: Locator;

  constructor(page: Page) {
    if (!page) throw new Error("Page instance is required");
    this.page = page;

    // Only the fields required for the create flow
    this.newItemButton = page.getByRole("button", { name: "New" });
    this.itemName = page.getByRole("textbox", { name: /Name|Item Name/i });
    
    this.dialog = this.page.getByRole("dialog", {
      name: /New|New Catalog|New Catalog Item|New Catalog/i,
    });
    this.dialogName = this.dialog
        .getByRole("textbox", { name: /Name|Item Name/i })
    this.dialogSave = this.dialog.getByRole("button", { name: /^Save$/i });
  }

  async addNewCatalogItem(details: { [key: string]: string }) {
    // Open New dialog
    await this.newItemButton.click();

    await this.dialog.waitFor({ state: "visible", timeout: 8000 });
    
    // Fill Name
    if (details.Name)
      await this.dialogName
        .fill(details.Name);

    // Save (dialog scoped preferred)
    await this.dialogSave.click();

    await this.page.waitForTimeout(1000);
  }

  async verifyCatalogItem(details: { [key: string]: string }) {
    if (details.Name)
      expect(await this.page.getByText(details.Name).count()).toBeGreaterThan(0);
  }
}
