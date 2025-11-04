import { expect, type Locator, type Page } from "@playwright/test";
const testData = require("../testdata/userDetails.json");

export class salesforceHomeLocators {
  readonly home_component: Locator;
  readonly app_launcher: Locator;
  readonly search_text_box: Locator;
  readonly searchedresult_campagin: Locator;
  readonly page: Page;
  readonly viewAll_link: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.home_component = page.locator("//div[@id='setupComponent']");
    this.app_launcher = page.locator("//button[@title='App Launcher']");
    this.search_text_box = page.locator(
      "//input[@placeholder='Search apps and items...']"
    );
    this.searchedresult_campagin = page.locator(
      " //b[contains(text(),'Campaigns')]"
    );
    this.viewAll_link = page.getByRole("button", { name: "View All" });
  }
  async searchApp(appName: string) {
    await expect(this.app_launcher).toBeVisible({ timeout: 20000 });

    // Click App Launcher
    await this.app_launcher.click({ timeout: 30000 });

    // Click View All
    await this.viewAll_link.click();

    // Search for the app
    await this.page.getByRole("link", { name: appName, exact: true }).click();
  }
}
