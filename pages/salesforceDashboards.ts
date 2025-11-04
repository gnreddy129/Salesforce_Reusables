import { expect, type Locator, type Page } from "@playwright/test";

export class SalesforceDashboardsLocators {
  readonly page: Page;
  readonly newDashboardButton: Locator;
  readonly dashboardNameInput: Locator;
  readonly dashboardDescriptionInput: Locator;
  readonly folderDropdown: Locator;
  readonly addComponentButton: Locator;
  readonly componentTypeDropdown: Locator;
  readonly sourceReportSearch: Locator;
  readonly refreshScheduleButton: Locator;
  readonly layoutButton: Locator;
  readonly saveButton: Locator;
  readonly createButton: Locator;
  readonly searchDashboardInput: Locator;

  // Component Type Locators
  readonly chartComponent: Locator;
  readonly gaugeComponent: Locator;
  readonly tableComponent: Locator;
  readonly textComponent: Locator;
  readonly imageComponent: Locator;

  // Component Configuration Locators
  readonly componentTitleInput: Locator;
  readonly textContentInput: Locator;
  readonly imageUrlInput: Locator;
  readonly maxHeightInput: Locator;
  readonly doneButton: Locator;
  static dashboardName: string;
  
  constructor(page: Page) {
    if (!page) throw new Error("Page instance is required");
    this.page = page;
    // Dashboard List View
    this.newDashboardButton = page.getByRole("button", {
      name: "New Dashboard",
    });
    this.searchDashboardInput = page.getByPlaceholder("Search dashboards...");

    // Dashboard Builder Frame Locators
    const frameLocator = page.frameLocator("iframe");
    this.dashboardNameInput = frameLocator.getByRole("textbox", {
      name: "*Name",
    });
    this.dashboardDescriptionInput = frameLocator.getByRole("textbox", {
      name: "Description",
    });
    this.folderDropdown = frameLocator.getByRole("button", {
      name: "Select Folder",
    });
    this.addComponentButton = frameLocator.getByRole("button", {
      name: "Add Widget",
    });

    // Component Types
    this.componentTypeDropdown = frameLocator.getByRole("group", {
      name: "Select Component Type",
    });
    this.chartComponent = frameLocator.getByRole("button", {
      name: "Chart or Table",
    });
    this.textComponent = frameLocator.getByRole("button", { name: "Text" });
    this.imageComponent = frameLocator.getByRole("button", { name: "Image" });

    // Component Configuration
    this.sourceReportSearch = frameLocator.getByRole("searchbox", {
      name: "Search Reports",
    });
    this.componentTitleInput = frameLocator.getByRole("textbox", {
      name: "Title",
    });
    this.textContentInput = frameLocator.getByRole("textbox", {
      name: "Content",
    });
    this.imageUrlInput = frameLocator.getByRole("textbox", {
      name: "Image URL",
    });
    this.maxHeightInput = frameLocator.getByRole("spinbutton", {
      name: "Max Height",
    });

    // Dashboard Controls
    this.refreshScheduleButton = frameLocator.getByRole("button", {
      name: "Set Refresh Schedule",
    });
    this.layoutButton = frameLocator.getByRole("button", {
      name: "Edit Dashboard Properties",
    });
    this.saveButton = frameLocator.getByRole("button", { name: "Save" });
    this.createButton = frameLocator.locator("#submitBtn");
    this.doneButton = frameLocator.getByRole("button", { name: "Done" });
  }

  async createNewDashboard(details: { [key: string]: string }) {
    // Click New Dashboard and wait for builder
    await this.newDashboardButton.click();

    // Set dashboard name
    SalesforceDashboardsLocators.dashboardName = details.DashboardName;

    // Wait for the iframe to be ready
    const frameLocator = this.page.frameLocator("iframe");
    await frameLocator.getByRole("textbox", { name: "*Name" }).waitFor();

    // Fill Dashboard Details
    await this.dashboardNameInput.fill(details.DashboardName);
    if (details.Description) {
      await this.dashboardDescriptionInput.fill(details.Description);
    }

    // Select Folder if specified and not Private Dashboards
    // if (details.Folder && details.Folder !== "Private Dashboards") {
    //   await this.folderDropdown.click();
    //   await frameLocator.getByRole("option", { name: details.Folder }).click();
    // }

    // Save Dashboard (initial creation)
    await this.createButton.click();
  }

  async verifyDashboardCreated() {
    // Wait for the dashboard to be created and loaded
    expect(
      await this.page
        .getByText(SalesforceDashboardsLocators.dashboardName)
        .count()
    ).toBeGreaterThan(0);
  }

  async selectDashboard(dashboardName: string) {
    // Search and select the dashboard from the list view
    await this.page.getByRole("link", { name: dashboardName }).click();
  }
}
