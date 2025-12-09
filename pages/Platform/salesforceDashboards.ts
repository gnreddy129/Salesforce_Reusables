import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceDashboards Page Object Model
 *
 * This class provides automation capabilities for Salesforce Dashboard management functionality.
 * It handles dashboard creation, customization, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new dashboards with various component types
 * - Handle dashboard configuration and layout management
 * - Verify dashboard creation and component setup
 * - Support for dashboard sharing and permissions
 *
 * @class SalesforceDashboards
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceDashboardsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newDashboardButton: Locator;
  readonly searchDashboardInput: Locator;

  // Dashboard Configuration Fields
  readonly dashboardNameInput: Locator;
  readonly dashboardDescriptionInput: Locator;
  readonly selectFolder: Locator;

  // Dashboard Components
  readonly addComponentButton: Locator;
  readonly componentTypeDropdown: Locator;
  readonly sourceReportSearch: Locator;

  // Component Type Elements
  readonly chartComponent: Locator;
  readonly gaugeComponent: Locator;
  readonly tableComponent: Locator;
  readonly textComponent: Locator;
  readonly imageComponent: Locator;

  // Component Configuration Elements
  readonly componentTitleInput: Locator;
  readonly textContentInput: Locator;
  readonly imageUrlInput: Locator;
  readonly maxHeightInput: Locator;

  // Dashboard Control Elements
  readonly refreshScheduleButton: Locator;
  readonly layoutButton: Locator;
  readonly saveButton: Locator;
  readonly createButton: Locator;
  readonly doneButton: Locator;

  /** Static property to store current dashboard name for verification */
  static dashboardName: string;
  /**
   * Constructor - Initializes the SalesforceDashboards page object with all necessary locators
   *
   * Sets up locators for all Salesforce dashboard form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the iframe for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceDashboards page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newDashboardButton = page.getByRole("button", {
      name: "New Dashboard",
    });
    this.searchDashboardInput = page.getByPlaceholder("Search dashboards...");

    // Dashboard configuration fields - Handle dashboard metadata within iframe
    // Use attribute selector to target the specific dashboard iframe (sfxdash-*)
    const frameLocator = page.frameLocator('iframe[name*="sfxdash"]');
    this.dashboardNameInput = frameLocator.getByRole("textbox", {
      name: "*Name",
    });
    this.dashboardDescriptionInput = frameLocator.getByRole("textbox", {
      name: "Description",
    });
    this.selectFolder = frameLocator.getByRole("button", {
      name: "Select Folder",
    });
    this.addComponentButton = frameLocator.getByRole("button", {
      name: "Add Widget",
    });

    // Component type elements - Handle component selection
    this.componentTypeDropdown = frameLocator.getByRole("group", {
      name: "Select Component Type",
    });
    this.chartComponent = frameLocator.getByRole("button", {
      name: "Chart or Table",
    });
    this.textComponent = frameLocator.getByRole("button", { name: "Text" });
    this.imageComponent = frameLocator.getByRole("button", { name: "Image" });

    // Component configuration elements - Handle component settings
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

    // Dashboard control elements - Handle dashboard operations
    this.refreshScheduleButton = frameLocator.getByRole("button", {
      name: "Set Refresh Schedule",
    });
    this.layoutButton = frameLocator.getByRole("button", {
      name: "Edit Dashboard Properties",
    });
    this.saveButton = frameLocator.getByRole("button", { name: "Save" });
    this.createButton = frameLocator.locator("#submitBtn");
    this.doneButton = frameLocator.getByRole("button", { name: "Done" });

    console.log(
      "✅ SalesforceDashboards page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new dashboard in Salesforce with the provided details
   *
   * This method handles the complete dashboard creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new dashboard dialog
   * 3. Fills in all provided field values
   * 4. Saves the dashboard
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing dashboard field values to be filled
   * @param details.DashboardName - Dashboard name (required)
   * @param details.Description - Dashboard description
   *
   * @example
   * await dashboardPage.createNewDashboard({
   *   DashboardName: "Sales Performance Dashboard",
   *   Description: "Monthly sales metrics and KPIs"
   * });
   */
  async createNewDashboard(details: { [field: string]: string }) {
    console.log("🔄 Starting dashboard creation process...");
    console.log("📝 Dashboard details:", JSON.stringify(details, null, 2));

    // Wait for the new dashboard button to be visible and take start screenshot
    await expect(this.newDashboardButton).toBeVisible({ timeout: 10000 });
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-dashboard",
      this.testInfo,
      "Platform/salesforce-dashboards/"
    );

    // Open the new dashboard creation dialog
    await this.newDashboardButton.click({ timeout: 10000 });
    console.log("✅ Dashboard creation dialog opened");

    // Set dashboard name for verification
    SalesforceDashboardsPage.dashboardName = details.DashboardName;

    // Wait for the dashboard iframe to be ready (use attribute selector to target correct iframe)
    const frameLocator = this.page.frameLocator('iframe[name*="sfxdash"]');
    await frameLocator
      .getByRole("textbox", { name: "*Name" })
      .waitFor({ timeout: 30000 });

    console.log("📋 Filling form fields...");

    // Dashboard Name - Primary identifier for the dashboard (required)
    await this.dashboardNameInput.fill(details.DashboardName, {
      timeout: 10000,
    });

    // Dashboard Description - Detailed explanation of dashboard purpose
    if (details.Description) {
      await this.dashboardDescriptionInput.fill(details.Description, {
        timeout: 10000,
      });
    }

    // if (details.Folder) {
    //   // Select Folder - Choose the folder to save the dashboard in
    //   await this.selectFolder.click({ timeout: 10000 });
    //   await this.page.getByText(details.Folder).first().click({ timeout: 10000 });
    //   await this.page.getByRole('button', { name: 'Select Folder' }).click({ timeout: 10000 });
    // }

    await this.page.waitForTimeout(2000);
    console.log("💾 Saving the dashboard...");

    // Save the dashboard - Submit all entered information
    await this.createButton.click({ timeout: 10000 });
    console.log("✅ Dashboard Created successfully");

    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Dashboard saved successfully");

    await this.doneButton.click({ timeout: 10000 });
    console.log("✅ Dashboard creation completed successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-dashboard",
      this.testInfo,
      "Platform/salesforce-dashboards/"
    );

    console.log("🎉 Dashboard creation completed!");
  }

  /**
   * Verifies that a dashboard was successfully created by checking for specific field values
   *
   * This method validates dashboard creation success by checking if the dashboard name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * Uses the static dashboardName property set during creation for verification.
   *
   * @throws Will throw an assertion error if expected dashboard name is not found
   *
   * @example
   * await dashboardPage.verifyDashboardCreated();
   */
  async verifyDashboardCreated() {
    console.log("🔍 Starting dashboard verification...");

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Platform/salesforce-dashboards/"
    );

    console.log(
      `📊 Verifying dashboard: ${SalesforceDashboardsPage.dashboardName}`
    );

    // Wait for the dashboard to be created and loaded
    expect(
      await this.page.getByText(SalesforceDashboardsPage.dashboardName).count()
    ).toBeGreaterThan(0);

    console.log("✅ Dashboard successfully verified in interface");
    console.log("🎉 Verification completed!");
  }

  /**
   * Selects and navigates to a specific dashboard from the list view
   *
   * This method handles dashboard selection and navigation with proper
   * wait strategies and error handling for dynamic content.
   *
   * @param dashboardName - Name of the dashboard to select and open
   *
   * @throws Will throw an error if dashboard is not found or navigation fails
   *
   * @example
   * await dashboardPage.selectDashboard("Sales Performance Dashboard");
   */
  async selectDashboard(dashboardName: string) {
    console.log(`🔍 Selecting dashboard: ${dashboardName}`);

    // Search and select the dashboard from the list view
    await this.page.getByRole("link", { name: dashboardName }).click();

    console.log(`✅ Successfully navigated to dashboard: ${dashboardName}`);
  }
}
