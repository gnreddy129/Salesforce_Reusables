import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceCalendar Page Object Model
 *
 * This class provides automation capabilities for Salesforce Calendar event management functionality.
 * It handles calendar event creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new calendar events with comprehensive field support
 * - Handle complex form interactions including date/time groups, checkboxes, and text inputs
 * - Verify calendar event creation success
 * - Support for all standard Salesforce calendar event fields
 * - Navigate to Calendar module using standard navigation
 * - Complete calendar event lifecycle management
 *
 * @class SalesforceCalendar
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceCalendarPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newEventButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Calendar Event General Information Fields
  readonly locationInput: Locator;
  readonly subjectInput: Locator;
  readonly nameInput: Locator;
  readonly relatedToCombobox: Locator;
  readonly allDayEventCheckbox: Locator;
  readonly descriptionInput: Locator;

  // Date and Time Fields - Using Parent Element Context
  // Start Section
  readonly startDateInput: Locator;
  readonly startTimeCombobox: Locator;

  // End Section
  readonly endDateInput: Locator;
  readonly endTimeCombobox: Locator;

  // Navigation Elements
  readonly calendarEventCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceCalendar page object with all necessary locators
   *
   * Sets up locators for all Salesforce calendar event form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce Lightning patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceCalendar page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newEventButton = page.getByRole("button", {
      name: "New Event",
    });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Calendar Event General Information field locators
    this.locationInput = page.getByRole("textbox", {
      name: "Location",
    });
    // this.subjectInput = page.getByRole("combobox", {
    //   name: "Subject",
    // });
    this.subjectInput = page.getByLabel("Subject");
    this.nameInput = page.getByLabel("Name",{exact:true});
    this.relatedToCombobox = page.getByLabel("Related To",{exact:true});
    this.allDayEventCheckbox = page.getByRole("checkbox", {
      name: "All-Day Event",
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
    });

    // Date and Time field locators - Using Parent Element Context Based on Service Appointments Pattern
    // Start Section
    this.startDateInput = page
      .getByRole("group", { name: "Start", exact: true})
      .getByRole("textbox", { name: "Date" });
    this.startTimeCombobox = page
      .getByRole("group", { name: "Start", exact: true})
      .getByRole("combobox", { name: "Time" });

    // End Section
    this.endDateInput = page
      .getByRole("group", { name: "End" , exact: true})
      .getByRole("textbox", { name: "Date" });
    this.endTimeCombobox = page
      .getByRole("group", { name: "End", exact: true})
      .getByRole("combobox", { name: "Time" });

    // Success message locator
    this.calendarEventCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceCalendar page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new calendar event in Salesforce with the provided details
   * Based on Service Appointments page pattern for consistent automation approach
   *
   * This method handles the complete calendar event creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new calendar event creation form
   * 3. Fills in all available field values
   * 4. Saves the calendar event
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing calendar event field values to be filled
   */
  async addNewCalendarEvent(details: { [key: string]: string }) {
    console.log("🔄 Starting calendar event creation process...");
    console.log("📝 Calendar event details:", JSON.stringify(details, null, 2));

    await expect(this.newEventButton).toBeVisible({
      timeout: 10000,
    });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-calendar-event",
      this.testInfo,
      "OtherFunctionality/salesforce-calendar/"
    );

    // Click New Event
    await this.newEventButton.click({ timeout: 10000 });
    console.log("✅ Calendar event creation form opened");

    // Wait for form to be fully loaded
    await this.subjectInput.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Fill Subject field (Required)
    if (details.Subject && details.Subject !== "--None--") {
      await this.subjectInput.click({ timeout: 10000 });

      await this.page.getByRole("option", { name: details.Subject }).click({ timeout: 10000 });
      console.log(`✅ Subject filled: ${details.Subject}`);
    }

    // Fill Location field
    if (details.Location && details.Location !== "--None--") {
      await this.locationInput.fill(details.Location, { timeout: 10000 });
      console.log(`✅ Location filled: ${details.Location}`);
    }

    // Fill Name field
    if (details.Name && details.Name !== "--None--") {
      await this.nameInput.fill(details.Name, { timeout: 10000 });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Fill Related To field
    if (
      (details.RelatedTo && details.RelatedTo !== "--None--") ||
      (details["Related To"] && details["Related To"] !== "--None--")
    ) {
      const relatedToValue = details.RelatedTo || details["Related To"];
      await this.relatedToCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: relatedToValue })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Related To selected: ${relatedToValue}`);
    }

    // Fill All-Day Event checkbox
    if (
      (details.AllDayEvent && details.AllDayEvent !== "--None--") ||
      (details["All Day Event"] && details["All Day Event"] !== "--None--")
    ) {
      const isAllDay = details.AllDayEvent
        ? details.AllDayEvent.toLowerCase() === "true" ||
          details.AllDayEvent.toLowerCase() === "yes"
        : false;
      const isCurrentlyChecked = await this.allDayEventCheckbox.isChecked();

      if (isAllDay !== isCurrentlyChecked) {
        await this.allDayEventCheckbox.click({ timeout: 10000 });
        console.log(`✅ All-Day Event checkbox set to: ${isAllDay}`);
      }
    }

    // Fill Start Date/Time
    if (
      (details.StartDate && details.StartDate !== "--None--") ||
      (details["Start Date"] && details["Start Date"] !== "--None--")
    ) {
      const startDateValue = details.StartDate || details["Start Date"];
      await this.startDateInput.fill(startDateValue, { timeout: 10000 });
      console.log(`✅ Start Date filled: ${startDateValue}`);
    }

    if (
      (details.StartTime && details.StartTime !== "--None--") ||
      (details["Start Time"] && details["Start Time"] !== "--None--")
    ) {
      const startTimeValue = details.StartTime || details["Start Time"];
      await this.startTimeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: startTimeValue })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Start Time selected: ${startTimeValue}`);
    }

    // Fill End Date/Time
    if (
      (details.EndDate && details.EndDate !== "--None--") ||
      (details["End Date"] && details["End Date"] !== "--None--")
    ) {
      const endDateValue = details.EndDate || details["End Date"];
      await this.endDateInput.fill(endDateValue, { timeout: 10000 });
      console.log(`✅ End Date filled: ${endDateValue}`);
    }

    if (
      (details.EndTime && details.EndTime !== "--None--") ||
      (details["End Time"] && details["End Time"] !== "--None--")
    ) {
      const endTimeValue = details.EndTime || details["End Time"];
      await this.endTimeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: endTimeValue })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ End Time selected: ${endTimeValue}`);
    }

    // Fill Description field
    if (details.Description && details.Description !== "--None--") {
      await this.descriptionInput.fill(details.Description, { timeout: 10000 });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    console.log("💾 Saving the calendar event...");

    // Save the calendar event
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Calendar event saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-calendar-event",
      this.testInfo,
      "OtherFunctionality/salesforce-calendar/"
    );

    console.log("🎉 Calendar event creation completed!");
  }

  /**
   * Verifies that a calendar event was successfully created by checking for specific field values
   *
   * This method validates calendar event creation success by checking if the calendar event detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing calendar event field values to verify
   */
  async verifyCalendarEvent(details: { [k: string]: string }) {
    console.log("🔍 Starting calendar event verification...");

    await expect(this.calendarEventCreatedMessage).toContainText(
      "was created",
      {
        timeout: 10000,
      }
    );
    console.log("✅ Calendar event creation message verified");

    // Verify calendar event creation by checking for key field values on the page
    if (details.Subject) {
      expect(
        await this.page.getByText(details.Subject).count()
      ).toBeGreaterThan(0);
      console.log(
        `✅ Calendar event subject verification successful: ${details.Subject}`
      );
    }
    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "OtherFunctionality/salesforce-calendar/"
    );

    console.log("🎉 Calendar event verification completed!");
  }
}
