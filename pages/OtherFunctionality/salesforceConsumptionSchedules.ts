import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceConsumptionSchedules Page Object Model
 *
 * This class provides automation capabilities for Salesforce Consumption Schedule management functionality.
 * It handles consumption schedule creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new consumption schedules with comprehensive field support
 * - Handle complex form interactions including comboboxes, checkboxes, and text inputs
 * - Verify consumption schedule creation success
 * - Support for all standard Salesforce consumption schedule fields
 * - Navigate to Consumption Schedules module using standard navigation
 * - Complete consumption schedule lifecycle management
 *
 * @class SalesforceConsumptionSchedules
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceConsumptionSchedulesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newConsumptionScheduleButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Consumption Schedule General Information Fields
  readonly consumptionScheduleNameInput: Locator;
  readonly activeCheckbox: Locator;
  readonly descriptionInput: Locator;
  readonly ratingMethodCombobox: Locator;
  readonly billingTermInput: Locator;
  readonly typeCombobox: Locator;
  readonly billingTermUnitCombobox: Locator;

  // Navigation Elements
  readonly consumptionScheduleCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceConsumptionSchedules page object with all necessary locators
   *
   * Sets up locators for all Salesforce consumption schedule form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce Lightning patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceConsumptionSchedules page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newConsumptionScheduleButton = page.getByRole("button", {
      name: "New",
    });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Consumption Schedule General Information field locators
    this.consumptionScheduleNameInput = page.getByRole("textbox", {
      name: "Consumption Schedule Name",
      exact: true,
    });
    this.activeCheckbox = page.getByRole("checkbox", {
      name: "Active",
      exact: true,
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
      exact: true,
    });
    this.ratingMethodCombobox = page.getByRole("combobox", {
      name: "Rating Method",
      exact: true,
    });
    // this.billingTermInput = page.getByLabel("Billing Term", { exact: true });
    this.billingTermInput = page.getByRole("spinbutton", {
      name: "Billing Term",
      exact: true,
    });
    this.typeCombobox = page.getByRole("combobox", {
      name: "Type",
      exact: true,
    });
    this.billingTermUnitCombobox = page.getByRole("combobox", {
      name: "Billing Term Unit",
      exact: true,
    });

    // Success message locator
    this.consumptionScheduleCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceConsumptionSchedules page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new consumption schedule in Salesforce with the provided details
   * Based on Service Appointments page pattern for consistent automation approach
   *
   * This method handles the complete consumption schedule creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new consumption schedule creation form
   * 3. Fills in all available field values
   * 4. Saves the consumption schedule
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing consumption schedule field values to be filled
   */
  async addNewConsumptionSchedule(details: { [key: string]: string }) {
    console.log("🔄 Starting consumption schedule creation process...");
    console.log(
      "📝 Consumption schedule details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newConsumptionScheduleButton).toBeVisible({
      timeout: 10000,
    });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-consumption-schedule",
      this.testInfo,
      "OtherFunctionality/salesforce-consumption-schedules/"
    );

    // Click New Consumption Schedule
    await this.newConsumptionScheduleButton.click({ timeout: 10000 });
    console.log("✅ Consumption schedule creation form opened");

    // Wait for form to be fully loaded
    await this.consumptionScheduleNameInput.waitFor({
      state: "visible",
      timeout: 10000,
    });

    console.log("📋 Filling form fields...");

    // Fill Consumption Schedule Name field (Required)
    if (
      details.ConsumptionScheduleName &&
      details.ConsumptionScheduleName !== "--None--"
    ) {
      await this.consumptionScheduleNameInput.fill(
        details.ConsumptionScheduleName,
        { timeout: 10000 }
      );
      console.log(
        `✅ Consumption Schedule Name filled: ${details.ConsumptionScheduleName}`
      );
    }

    // Handle alternative field name formats
    if (
      details["Consumption Schedule Name"] &&
      details["Consumption Schedule Name"] !== "--None--"
    ) {
      await this.consumptionScheduleNameInput.fill(
        details["Consumption Schedule Name"],
        { timeout: 10000 }
      );
      console.log(
        `✅ Consumption Schedule Name filled: ${details["Consumption Schedule Name"]}`
      );
    }

    // Fill Active checkbox
    if (details.Active && details.Active !== "--None--") {
      const isActive =
        details.Active.toLowerCase() === "true" ||
        details.Active.toLowerCase() === "yes";
      const isCurrentlyChecked = await this.activeCheckbox.isChecked();

      if (isActive !== isCurrentlyChecked) {
        await this.activeCheckbox.click({ timeout: 10000 });
        console.log(`✅ Active checkbox set to: ${isActive}`);
      }
    }

    // Fill Description field
    if (details.Description && details.Description !== "--None--") {
      await this.descriptionInput.fill(details.Description, { timeout: 10000 });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    // Fill Rating Method field
    if (details.RatingMethod && details.RatingMethod !== "--None--") {
      await this.ratingMethodCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.RatingMethod })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Rating Method selected: ${details.RatingMethod}`);
    }

    // Handle alternative field name formats
    if (details["Rating Method"] && details["Rating Method"] !== "--None--") {
      await this.ratingMethodCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details["Rating Method"] })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Rating Method selected: ${details["Rating Method"]}`);
    }

    // Fill Billing Term field
    if (
      (details.BillingTerm && details.BillingTerm !== "--None--") ||
      (details["Billing Term"] && details["Billing Term"] !== "--None--")
    ) {
      const billingTermValue =
        details.BillingTerm && details.BillingTerm !== "--None--"
          ? details.BillingTerm
          : details["Billing Term"];
      await this.billingTermInput.fill(billingTermValue, { timeout: 10000 });
      console.log(`✅ Billing Term filled: ${billingTermValue}`);
    }

    // Fill Type field
    if (details.Type && details.Type !== "--None--") {
      await this.typeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Type })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Type selected: ${details.Type}`);
    }

    // Fill Billing Term Unit field
    if (details.BillingTermUnit && details.BillingTermUnit !== "--None--") {
      await this.billingTermUnitCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.BillingTermUnit })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Billing Term Unit selected: ${details.BillingTermUnit}`);
    }

    // Handle alternative field name formats
    if (
      details["Billing Term Unit"] &&
      details["Billing Term Unit"] !== "--None--"
    ) {
      await this.billingTermUnitCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details["Billing Term Unit"] })
        .first()
        .click({ timeout: 10000 });
      console.log(
        `✅ Billing Term Unit selected: ${details["Billing Term Unit"]}`
      );
    }

    console.log("💾 Saving the consumption schedule...");

    // Save the consumption schedule
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Consumption schedule saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-consumption-schedule",
      this.testInfo,
      "OtherFunctionality/salesforce-consumption-schedules/"
    );

    console.log("🎉 Consumption schedule creation completed!");
  }

  /**
   * Verifies that a consumption schedule was successfully created by checking for specific field values
   *
   * This method validates consumption schedule creation success by checking if the consumption schedule detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing consumption schedule field values to verify
   */
  async verifyConsumptionSchedule(details: { [k: string]: string }) {
    console.log("🔍 Starting consumption schedule verification...");

    await expect(this.consumptionScheduleCreatedMessage).toContainText(
      "was created",
      {
        timeout: 10000,
      }
    );
    console.log("✅ Consumption schedule creation message verified");

    // Verify consumption schedule creation by checking for key field values on the page
    const nameToVerify =
      details.ConsumptionScheduleName || details["Consumption Schedule Name"];
    if (nameToVerify) {
      expect(await this.page.getByText(nameToVerify).count()).toBeGreaterThan(
        0
      );
      console.log(
        `✅ Consumption schedule name verification successful: ${nameToVerify}`
      );
    }

    if (details.Description) {
      expect(
        await this.page.getByText(details.Description).count()
      ).toBeGreaterThan(0);
      console.log(
        `✅ Consumption schedule description verification successful: ${details.Description}`
      );
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-consumption-schedules/"
    );

    console.log("🎉 Consumption schedule verification completed!");
  }
}
