import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceAppointmentInvitation Page Object Model
 *
 * This class provides automation capabilities for Salesforce Appointment Invitation management functionality.
 * It handles invitation creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new appointment invitations with date configurations
 * - Handle invitation settings (active status, topics, territories)
 * - Verify invitation creation and setup
 * - Support for invitation metadata management
 *
 * @class SalesforceAppointmentInvitation
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceAppointmentInvitationPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly dialog: Locator;
  readonly listbox: Locator;

  // Date Configuration Fields
  readonly startDateTextbox: Locator;
  readonly endDateTextbox: Locator;
  readonly urlExpirationDateTextbox: Locator;

  // Invitation Settings
  readonly activeCheckbox: Locator;
  readonly appointmentTopicCombo: Locator;
  readonly serviceTerritoryCombo: Locator;

  // Action Buttons
  readonly saveButton: Locator;

  /**
   * Constructor - Initializes the SalesforceAppointmentInvitation page object with all necessary locators
   *
   * Sets up locators for all Salesforce appointment invitation form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceAppointmentInvitation page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.listbox = page.getByRole("listbox").first();
    this.newButton = page.getByRole("button", {
      name: /New|New Appointment Invitation|New Invitation/i,
    });
    this.dialog = page.getByRole("dialog").first();

    // Date configuration fields - Handle invitation date settings
    this.startDateTextbox = this.dialog
      .getByRole("textbox", {
        name: /Booking Start Date|Booking Start|Start Date/i,
      })
      .first();
    this.endDateTextbox = this.dialog
      .getByRole("textbox", {
        name: /Booking End Date|Booking End|End Date/i,
      })
      .first();
    this.urlExpirationDateTextbox = this.dialog
      .getByRole("textbox", {
        name: /URL Expiration Date|URL Expiration|Expiration Date/i,
      })
      .first();

    // Invitation settings - Handle invitation configuration
    this.activeCheckbox = this.dialog
      .getByRole("checkbox", { name: /Active/i })
      .first();
    this.appointmentTopicCombo = this.dialog
      .getByRole("combobox", { name: /Appointment Topic|Appointment Topic/i })
      .first();
    this.serviceTerritoryCombo = this.dialog
      .getByRole("combobox", { name: /Service Territory|Service Territory/i })
      .first();

    // Action buttons - Save operations
    this.saveButton = this.dialog
      .getByRole("button", { name: /Save/i })
      .first();

    console.log(
      "✅ SalesforceAppointmentInvitation page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new appointment invitation in Salesforce with the provided details
   *
   * This method handles the complete appointment invitation creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new invitation dialog
   * 3. Fills in all provided field values (dates, settings)
   * 4. Configures invitation settings (active status, topic, territory)
   * 5. Saves the invitation and takes an end screenshot for verification
   *
   * @param details - Object containing invitation field values to be filled
   * @param details.BookingStartDate - Start date for booking availability
   * @param details.BookingEndDate - End date for booking availability
   * @param details.URLExpirationDate - Expiration date for invitation URL
   * @param details.Active - Active status ("true", "yes", "1" to enable)
   * @param details.AppointmentTopic - Topic/category for appointments
   * @param details.ServiceTerritory - Service territory assignment
   *
   * @example
   * await invitationPage.addNewAppointmentInvitation({
   *   BookingStartDate: "2024-01-01",
   *   BookingEndDate: "2024-12-31",
   *   URLExpirationDate: "2024-06-30",
   *   Active: "true",
   *   AppointmentTopic: "Medical Consultation"
   * });
   */
  async addNewAppointmentInvitation(details: { [field: string]: string }) {
    console.log("🔄 Starting appointment invitation creation process...");
    console.log("📝 Invitation details:", JSON.stringify(details, null, 2));

    // Wait for the new button to be visible and take start screenshot
    await expect(this.newButton).toBeVisible({ timeout: 10000 });
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-invitation",
      this.testInfo,
      "OtherFunctionality/salesforce-appointment-invitations/"
    );

    // Helper function to handle dropdown/combobox selections
    const selectFromList = async (combo: Locator, value: string) => {
      await combo.click({ timeout: 10000 });
      await this.page.getByText(value).click({ timeout: 10000 });
    };

    // Open the new invitation creation dialog
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Invitation creation dialog opened");

    console.log("📋 Filling form fields...");

    // Booking Start Date - Beginning of availability period
    if (details.BookingStartDate) {
      await this.startDateTextbox.fill(details.BookingStartDate, {
        timeout: 10000,
      });
    }

    // Booking End Date - End of availability period
    if (details.BookingEndDate) {
      await this.endDateTextbox.fill(details.BookingEndDate, {
        timeout: 10000,
      });
    }

    // URL Expiration Date - When invitation link expires
    if (details.URLExpirationDate) {
      await this.urlExpirationDateTextbox.fill(details.URLExpirationDate, {
        timeout: 10000,
      });
    }

    // Active status configuration
    if (
      details.Active === "true" ||
      details.Active === "yes" ||
      details.Active === "1"
    ) {
      if ((await this.activeCheckbox.count()) > 0) {
        await this.activeCheckbox.check({ timeout: 10000 });
        const isChecked = await this.activeCheckbox.isChecked();
        if (isChecked !== true) {
          await this.activeCheckbox.click({ timeout: 10000 });
        }
      }
    }

    // Appointment Topic dropdown configuration
    if (details.AppointmentTopic) {
      await selectFromList(
        this.appointmentTopicCombo,
        details.AppointmentTopic
      );
    }

    // Service Territory dropdown configuration
    if (details.ServiceTerritory) {
      await selectFromList(
        this.serviceTerritoryCombo,
        details.ServiceTerritory
      );
    }

    console.log("💾 Saving the invitation...");

    // Save the invitation
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Invitation saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-invitation",
      this.testInfo,
      "OtherFunctionality/salesforce-appointment-invitations/"
    );

    console.log("🎉 Invitation creation completed!");
  }

  /**
   * Verifies that an appointment invitation was successfully created by checking for specific field values
   *
   * This method validates invitation creation success by checking if the appointment topic
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing invitation field values to verify
   * @param details.AppointmentTopic - Appointment topic to verify on the page
   *
   * @throws Will throw an assertion error if expected topic is not found
   *
   * @example
   * await invitationPage.verifyInvitation({ AppointmentTopic: "Medical Consultation" });
   */
  async verifyInvitation(details: { [field: string]: string }) {
    console.log("🔍 Starting invitation verification...");

    await this.page.waitForTimeout(1000);

    if (details.AppointmentTopic) {
      expect(
        this.page.getByText(details.AppointmentTopic, { exact: true }).count()
      ).toBeGreaterThan(0);
      console.log("✅ Appointment topic verification successful");
    } else {
      console.log("⚠️ No appointment topic provided for verification");
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-appointment-invitations/"
    );

    console.log("🎉 Verification completed!");
  }
}
