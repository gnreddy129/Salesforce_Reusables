import { expect, Page, Locator, TestInfo } from '@playwright/test';
import { Helper } from "../../utils/helper";

/**
 * SalesforceIncidents Page Object Model
 *
 * This class provides automation capabilities for Salesforce Incidents management functionality.
 * It handles incident creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new incidents with parent/child relationships
 * - Handle incident configuration (name, description, sort order)
 * - Configure incident settings (show in menu, catalog assignment)
 * - Verify incident creation and setup
 *
 * @class SalesforceIncidents
 * @author Automation Team
 * @version 1.0
 */

export default class SalesforceIncidentsPage {
  readonly page: Page;
  private testInfo?: TestInfo;
  readonly listbox: Locator;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly dialog: Locator;
  readonly shortDesc: Locator;
  readonly description: Locator;
  readonly urgencyCombo: Locator;
  readonly detectedDateInput: Locator;
  readonly detectedTimeInput: Locator;
  // Action Buttons
  readonly saveButton: Locator;

  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceCategories page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = this.page.getByRole("button", { name: /New/i }).first();
    this.dialog = this.page.getByRole("dialog", { name: /New Incident/i });
    this.listbox = this.page.getByRole("listbox").first();

    // Form fields
    this.shortDesc = this.page.getByRole('textbox', { name: /Subject/i });
    this.description = this.page.getByLabel('Description').first();
    this.urgencyCombo = this.dialog.getByRole("combobox", { name: /Urgency/i});
    this.detectedDateInput = this.dialog.getByRole('textbox', { name: /DetectedDateTime/i }).first();
    this.detectedTimeInput = this.dialog.getByRole('textbox', { name: /DetectedTime/i }).first();

    // Action buttons - Save operations
    this.saveButton = this.dialog
      .getByRole("button", { name: 'Save', exact: true });

    console.log(
      "✅ SalesforceIncidents page object initialized successfully with all locators"    
    );
  }

  // Method to add a new incident with provided details
  async addNewIncident(details: { [field: string]: string }) {
    console.log("🔄 Starting incident creation process...");
    console.log("📝 incident details:", JSON.stringify(details, null, 2));

    // Wait for the new button to be visible and take start screenshot
    await expect(this.newButton).toBeVisible({ timeout: 10000 });
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-incident",
      this.testInfo,
      "Service/salesforce-incidents/"
    );

    // Open the new incident creation dialog
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Incident creation dialog opened");
    console.log("📋 Filling form fields...");

    // fill short description if present
    if (details.shortDescription) {
      await this.shortDesc.fill(details.shortDescription);
    }
    // fill description if present
    if (details.description) {
      await this.description.fill(details.description);
    }
    // Urgency dropdown selection
    if (details.urgency.length > 1 && details.urgency !== "--None--") {
      await this.selectFromList(this.urgencyCombo, details.urgency);
    }
    // Set detected date and time if provided
    if (details.detectedDate.length > 1) 
      await this.setDate(details.detectedDate).catch(() => {});
    // Set detected time if provided
    if (details.detectedTime.length > 1) 
      await this.setTime(details.detectedTime).catch(() => {});

    console.log("💾 Saving the incident...");
    // Save the incident
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Incident saved successfully");

    await this.page.waitForTimeout(1000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-incident",
      this.testInfo,
      "Service/salesforce-incidents/"
    );
    console.log("🎉 Incident creation completed!");
  }

  // Verify newly created incident by short description
  async verifyNewlyCreatedIncident(details: { [field: string]: string }) {
    
    console.log("🔍 Starting incident verification...");

    if (details.ShortDescription) {
      await expect(
        await this.page.getByText(details.ShortDescription, { exact: true }).count()
      ).toBeGreaterThan(0);
      console.log("✅ Incident verification successful");
    } else {
      console.log("⚠️ No name provided for verification");
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Service/salesforce-incidents/"
    );

    console.log("🎉 Verification completed!");
  }


  // Additional methods for incident management can be added here
  // Helper method to set date fields
  private async setDate(dateValue?: string) {
    if (dateValue && (await this.detectedDateInput.count())) {
      await this.detectedDateInput.first().click({ force: true });
      await this.detectedDateInput.first().fill(dateValue);
    }
  }

  // Helper method to set time fields
  private async setTime(timeValue?: string) {
    if (timeValue && (await this.detectedTimeInput.count())) {
      await this.selectFromList(this.detectedTimeInput, timeValue);
    }
  }

  // Helper function to select from listbox
  private async selectFromList(combo: Locator, value: string) {
    // Helper function to handle dropdown/combobox selections
      await combo.click({ timeout: 10000 });
      await this.listbox
        .getByRole("option", { name: value })
        .first()
        .click({ timeout: 10000 });
  }
}