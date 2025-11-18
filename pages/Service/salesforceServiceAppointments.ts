import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceServiceAppointments Page Object Model
 *
 * This class provides automation capabilities for Salesforce Service Appointment management functionality.
 * It handles service appointment creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new service appointments with comprehensive field support
 * - Handle complex form interactions including comboboxes, date/time fields, and text inputs
 * - Verify service appointment creation success
 * - Support for all standard Salesforce service appointment fields
 * - Navigate to Service Appointments module using standard navigation
 * - Complete service appointment lifecycle management
 *
 * @class SalesforceServiceAppointments
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceServiceAppointmentsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newServiceAppointmentButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Service Appointment General Information Fields
  readonly appointmentNumberInput: Locator;
  readonly descriptionInput: Locator;
  readonly contactCombobox: Locator;
  readonly parentRecordTypeCombobox: Locator;
  readonly parentRecordCombobox: Locator;
  readonly subjectInput: Locator;
  readonly statusCombobox: Locator;
  readonly workTypeCombobox: Locator;
  readonly appointmentTypeCombobox: Locator;
  readonly accountCombobox: Locator;
  readonly serviceResourceCombobox: Locator;
  readonly serviceTerritoryCombobox: Locator;
  readonly priorityCombobox: Locator;

  // Duration and Scheduling Information
  readonly durationInput: Locator;
  readonly durationTypeCombobox: Locator;
  readonly additionalInformationInput: Locator;
  readonly commentInput: Locator;
  readonly cancellationReasonInput: Locator;

  // Date and Time Fields - Using Parent Element Context
  // Earliest Start Permitted Section
  readonly earliestStartPermittedDateInput: Locator;
  readonly earliestStartPermittedTimeCombobox: Locator;

  // Due Date Section
  readonly dueDateInput: Locator;
  readonly dueTimeCombobox: Locator;

  // Arrival Window Section
  readonly arrivalWindowStartDateInput: Locator;
  readonly arrivalWindowStartTimeCombobox: Locator;
  readonly arrivalWindowEndDateInput: Locator;
  readonly arrivalWindowEndTimeCombobox: Locator;

  // Scheduled Times Section
  readonly scheduledStartDateInput: Locator;
  readonly scheduledStartTimeCombobox: Locator;
  readonly scheduledEndDateInput: Locator;
  readonly scheduledEndTimeCombobox: Locator;

  // Actual Times Section
  readonly actualStartDateInput: Locator;
  readonly actualStartTimeCombobox: Locator;
  readonly actualEndDateInput: Locator;
  readonly actualEndTimeCombobox: Locator;
  readonly actualDurationInput: Locator;

  // Address Fields
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly zipPostalCodeInput: Locator;
  readonly stateProvinceInput: Locator;
  readonly countryInput: Locator;
  readonly latitudeInput: Locator;
  readonly longitudeInput: Locator;

  // Contact Information Fields
  readonly phoneInput: Locator;
  readonly emailInput: Locator;

  // Service Appointment Preferences
  readonly isAnytimeCheckbox: Locator;
  readonly emergencyCheckbox: Locator;
  readonly isRequiredResourceCheckbox: Locator;

  // Work Order Related Fields
  readonly workOrderCombobox: Locator;
  readonly workOrderLineItemCombobox: Locator;

  // Navigation Elements
  readonly serviceAppointmentCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceServiceAppointments page object with all necessary locators
   *
   * Sets up locators for all Salesforce service appointment form elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce Lightning patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceServiceAppointments page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newServiceAppointmentButton = page.getByRole("button", {
      name: "New",
    });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Service Appointment General Information field locators
    this.appointmentNumberInput = page.getByRole("textbox", {
      name: "Appointment Number",
    });
    this.descriptionInput = page.getByRole("textbox", { name: "Description" });
    this.contactCombobox = page.getByRole("combobox", { name: "Contact" });
    this.parentRecordTypeCombobox = page.getByRole("combobox", {
      name: "Choose an object",
    });
    this.parentRecordCombobox = page.getByRole("combobox", {
      name: "Parent Record",
    });
    this.subjectInput = page.getByRole("textbox", { name: "Subject" });
    this.statusCombobox = page.getByRole("combobox", { name: "Status" });
    this.workTypeCombobox = page.getByRole("combobox", { name: "Work Type" });
    this.appointmentTypeCombobox = page.getByRole("combobox", {
      name: "Appointment Type",
    });
    this.accountCombobox = page.getByRole("combobox", { name: "Account" });
    this.serviceResourceCombobox = page.getByRole("combobox", {
      name: "Service Resource",
    });
    this.serviceTerritoryCombobox = page.getByRole("combobox", {
      name: "Service Territory",
    });
    this.priorityCombobox = page.getByRole("combobox", { name: "Priority" });

    // Duration and Scheduling Information field locators
    this.durationInput = page.getByRole("spinbutton", { name: "Duration", exact: true });
    this.durationTypeCombobox = page.getByRole("combobox", {
      name: "Duration Type",
    });
    this.additionalInformationInput = page.getByRole("textbox", {
      name: "Additional Information",
    });
    this.commentInput = page.getByRole("textbox", { name: "Comment" });
    this.cancellationReasonInput = page.getByRole("textbox", {
      name: "Cancellation Reason",
    });

    // Date and Time field locators - Using Parent Element Context Based on MCP Analysis
    // Earliest Start Permitted Section (required fields marked with *)
    this.earliestStartPermittedDateInput = page
      .getByRole("group", { name: "Earliest Start Permitted" })
      .getByRole("textbox", { name: "*Date" });
    this.earliestStartPermittedTimeCombobox = page
      .getByRole("group", { name: "Earliest Start Permitted" })
      .getByRole("combobox", { name: "*Time" });

    // Due Date Section (required fields marked with *)
    this.dueDateInput = page
      .getByRole("group", { name: "Due Date" })
      .getByRole("textbox", { name: "*Date" });
    this.dueTimeCombobox = page
      .getByRole("group", { name: "Due Date" })
      .getByRole("combobox", { name: "*Time" });

    // Arrival Window Section
    this.arrivalWindowStartDateInput = page
      .getByRole("group", { name: "Arrival Window Start" })
      .getByRole("textbox", { name: "Date" });
    this.arrivalWindowStartTimeCombobox = page
      .getByRole("group", { name: "Arrival Window Start" })
      .getByRole("combobox", { name: "Time" });
    this.arrivalWindowEndDateInput = page
      .getByRole("group", { name: "Arrival Window End" })
      .getByRole("textbox", { name: "Date" });
    this.arrivalWindowEndTimeCombobox = page
      .getByRole("group", { name: "Arrival Window End" })
      .getByRole("combobox", { name: "Time" });

    // Scheduled Times Section
    this.scheduledStartDateInput = page
      .getByRole("group", { name: "Scheduled Start" })
      .getByRole("textbox", { name: "Date" });
    this.scheduledStartTimeCombobox = page
      .getByRole("group", { name: "Scheduled Start" })
      .getByRole("combobox", { name: "Time" });
    this.scheduledEndDateInput = page
      .getByRole("group", { name: "Scheduled End" })
      .getByRole("textbox", { name: "Date" });
    this.scheduledEndTimeCombobox = page
      .getByRole("group", { name: "Scheduled End" })
      .getByRole("combobox", { name: "Time" });

    // Actual Times Section
    this.actualStartDateInput = page
      .getByRole("group", { name: "Actual Start" })
      .getByRole("textbox", { name: "Date" });
    this.actualStartTimeCombobox = page
      .getByRole("group", { name: "Actual Start" })
      .getByRole("combobox", { name: "Time" });
    this.actualEndDateInput = page
      .getByRole("group", { name: "Actual End" })
      .getByRole("textbox", { name: "Date" });
    this.actualEndTimeCombobox = page
      .getByRole("group", { name: "Actual End" })
      .getByRole("combobox", { name: "Time" });
    this.actualDurationInput = page.getByRole("spinbutton", {
      name: "Actual Duration (Minutes)",
    });

    // Address field locators - Using Address group parent element from MCP analysis
    this.streetInput = page
      .getByRole("group", { name: "Address" })
      .getByRole("textbox", { name: "Street" });
    this.cityInput = page
      .getByRole("group", { name: "Address" })
      .getByRole("textbox", { name: "City" });
    this.zipPostalCodeInput = page
      .getByRole("group", { name: "Address" })
      .getByRole("textbox", { name: "Zip/Postal Code" });
    this.stateProvinceInput = page
      .getByRole("group", { name: "Address" })
      .getByRole("textbox", { name: "State/Province" });
    this.countryInput = page
      .getByRole("group", { name: "Address" })
      .getByRole("textbox", { name: "Country" });
    this.latitudeInput = page.getByRole("textbox", { name: "Latitude" });
    this.longitudeInput = page.getByRole("textbox", { name: "Longitude" });

    // Contact Information field locators
    this.phoneInput = page.getByRole("textbox", { name: "Phone" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });

    // Service Appointment Preferences field locators
    this.isAnytimeCheckbox = page.getByRole("checkbox", {
      name: "Is Anytime Appointment",
    });
    this.emergencyCheckbox = page.getByRole("checkbox", { name: "Emergency" });
    this.isRequiredResourceCheckbox = page.getByRole("checkbox", {
      name: "Is Required Resource",
    });

    // Work Order Related field locators
    this.workOrderCombobox = page.getByRole("combobox", { name: "Work Order" });
    this.workOrderLineItemCombobox = page.getByRole("combobox", {
      name: "Work Order Line Item",
    });

    // Success message locator
    this.serviceAppointmentCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceServiceAppointments page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new service appointment in Salesforce with the provided details
   * Based on MCP Server analysis of actual Service Appointment form fields
   *
   * This method handles the complete service appointment creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new service appointment creation form
   * 3. Fills in all available field values based on MCP analysis
   * 4. Saves the service appointment
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing service appointment field values to be filled
   */
  async addNewServiceAppointment(details: { [key: string]: string }) {
    console.log("🔄 Starting service appointment creation process...");
    console.log(
      "📝 Service appointment details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newServiceAppointmentButton).toBeVisible({
      timeout: 10000,
    });

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-service-appointment",
      this.testInfo,
      "Service/salesforce-service-appointments/"
    );

    // Click New Service Appointment
    await this.newServiceAppointmentButton.click({ timeout: 10000 });
    console.log("✅ Service appointment creation form opened");

    // Wait for form to be fully loaded
    await this.statusCombobox.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields based on MCP analysis...");

    // Fill General Information fields
    if (details.Description && details.Description !== "--None--") {
      await this.descriptionInput.fill(details.Description, { timeout: 10000 });
      console.log(`✅ Description filled: ${details.Description}`);
    }

    if (details.Contact && details.Contact !== "--None--") {
      await this.contactCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Contact })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Contact selected: ${details.Contact}`);
    }

    // Fill Parent Record field (Required) - First select object type if needed
    if (
      (details.ParentRecord && details.ParentRecord !== "--None--") ||
      (details["Parent Record"] && details["Parent Record"] !== "--None--")
    ) {
      const parentRecord = details.ParentRecord || details["Parent Record"];

      // If parent record object type is specified, select it first
      if (details.ParentRecordType || details["Parent Record Type"]) {
        const parentRecordType =
          details.ParentRecordType || details["Parent Record Type"];
        await this.parentRecordTypeCombobox.click({ timeout: 10000 });
        await this.page
          .getByRole("option", { name: parentRecordType })
          .first()
          .click({ timeout: 10000 });
        console.log(`✅ Parent Record Type selected: ${parentRecordType}`);
      }

      await this.parentRecordCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: parentRecord })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Parent Record selected: ${parentRecord}`);
    }

    // Fill Status field (Required)
    if (details.Status && details.Status !== "--None--") {
      await this.statusCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Status })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Status selected: ${details.Status}`);
    }

    if (details.Subject && details.Subject !== "--None--") {
      await this.subjectInput.fill(details.Subject, { timeout: 10000 });
      console.log(`✅ Subject filled: ${details.Subject}`);
    }

    if (details.WorkType && details.WorkType !== "--None--") {
      await this.workTypeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.WorkType })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Work Type selected: ${details.WorkType}`);
    }

    // Fill Duration fields
    if (details.Duration && details.Duration !== "--None--") {
      await this.durationInput.fill(details.Duration, { timeout: 10000 });
      console.log(`✅ Duration filled: ${details.Duration}`);
    }

    if (details.DurationType && details.DurationType !== "--None--") {
      await this.durationTypeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.DurationType })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Duration Type selected: ${details.DurationType}`);
    }

    // Fill Appointment Type field
    if (details.AppointmentType && details.AppointmentType !== "--None--") {
      await this.appointmentTypeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.AppointmentType })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Appointment Type selected: ${details.AppointmentType}`);
    }

    // Fill Additional Information fields
    if (
      details.AdditionalInformation &&
      details.AdditionalInformation !== "--None--"
    ) {
      await this.additionalInformationInput.fill(
        details.AdditionalInformation,
        { timeout: 10000 }
      );
      console.log(
        `✅ Additional Information filled: ${details.AdditionalInformation}`
      );
    }

    if (details.Comment && details.Comment !== "--None--") {
      await this.commentInput.fill(details.Comment, { timeout: 10000 });
      console.log(`✅ Comment filled: ${details.Comment}`);
    }

    if (
      details.CancellationReason &&
      details.CancellationReason !== "--None--"
    ) {
      await this.cancellationReasonInput.fill(details.CancellationReason, {
        timeout: 10000,
      });
      console.log(
        `✅ Cancellation Reason filled: ${details.CancellationReason}`
      );
    }

    // Fill Required Date/Time fields - Earliest Start Permitted (Required)
    if (
      details.EarliestStartPermittedDate &&
      details.EarliestStartPermittedDate !== "--None--"
    ) {
      await this.earliestStartPermittedDateInput.fill(
        details.EarliestStartPermittedDate,
        { timeout: 10000 }
      );
      console.log(
        `✅ Earliest Start Permitted Date filled: ${details.EarliestStartPermittedDate}`
      );
    }

    if (
      details.EarliestStartPermittedTime &&
      details.EarliestStartPermittedTime !== "--None--"
    ) {
      await this.earliestStartPermittedTimeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.EarliestStartPermittedTime })
        .first()
        .click({ timeout: 10000 });
      console.log(
        `✅ Earliest Start Permitted Time selected: ${details.EarliestStartPermittedTime}`
      );
    }

    // Fill Due Date/Time fields (Required)
    if (details.DueDate && details.DueDate !== "--None--") {
      await this.dueDateInput.fill(details.DueDate, { timeout: 10000 });
      console.log(`✅ Due Date filled: ${details.DueDate}`);
    }

    if (details.DueTime && details.DueTime !== "--None--") {
      await this.dueTimeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.DueTime })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Due Time selected: ${details.DueTime}`);
    }

    // Fill Arrival Window Start Date/Time
    if (
      details.ArrivalWindowStartDate &&
      details.ArrivalWindowStartDate !== "--None--"
    ) {
      await this.arrivalWindowStartDateInput.fill(
        details.ArrivalWindowStartDate,
        { timeout: 10000 }
      );
      console.log(
        `✅ Arrival Window Start Date filled: ${details.ArrivalWindowStartDate}`
      );
    }

    if (
      details.ArrivalWindowStartTime &&
      details.ArrivalWindowStartTime !== "--None--"
    ) {
      await this.arrivalWindowStartTimeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ArrivalWindowStartTime })
        .first()
        .click({ timeout: 10000 });
      console.log(
        `✅ Arrival Window Start Time selected: ${details.ArrivalWindowStartTime}`
      );
    }

    // Fill Arrival Window End Date/Time
    if (
      details.ArrivalWindowEndDate &&
      details.ArrivalWindowEndDate !== "--None--"
    ) {
      await this.arrivalWindowEndDateInput.fill(details.ArrivalWindowEndDate, {
        timeout: 10000,
      });
      console.log(
        `✅ Arrival Window End Date filled: ${details.ArrivalWindowEndDate}`
      );
    }

    if (
      details.ArrivalWindowEndTime &&
      details.ArrivalWindowEndTime !== "--None--"
    ) {
      await this.arrivalWindowEndTimeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ArrivalWindowEndTime })
        .first()
        .click({ timeout: 10000 });
      console.log(
        `✅ Arrival Window End Time selected: ${details.ArrivalWindowEndTime}`
      );
    }

    // Fill Scheduled Start Date/Time
    if (
      details.ScheduledStartDate &&
      details.ScheduledStartDate !== "--None--"
    ) {
      await this.scheduledStartDateInput.fill(details.ScheduledStartDate, {
        timeout: 10000,
      });
      console.log(
        `✅ Scheduled Start Date filled: ${details.ScheduledStartDate}`
      );
    }

    if (
      details.ScheduledStartTime &&
      details.ScheduledStartTime !== "--None--"
    ) {
      await this.scheduledStartTimeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ScheduledStartTime })
        .first()
        .click({ timeout: 10000 });
      console.log(
        `✅ Scheduled Start Time selected: ${details.ScheduledStartTime}`
      );
    }

    // Fill Scheduled End Date/Time
    if (details.ScheduledEndDate && details.ScheduledEndDate !== "--None--") {
      await this.scheduledEndDateInput.fill(details.ScheduledEndDate, {
        timeout: 10000,
      });
      console.log(`✅ Scheduled End Date filled: ${details.ScheduledEndDate}`);
    }

    if (details.ScheduledEndTime && details.ScheduledEndTime !== "--None--") {
      await this.scheduledEndTimeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ScheduledEndTime })
        .first()
        .click({ timeout: 10000 });
      console.log(
        `✅ Scheduled End Time selected: ${details.ScheduledEndTime}`
      );
    }

    // Fill Actual Start Date/Time
    if (details.ActualStartDate && details.ActualStartDate !== "--None--") {
      await this.actualStartDateInput.fill(details.ActualStartDate, {
        timeout: 10000,
      });
      console.log(`✅ Actual Start Date filled: ${details.ActualStartDate}`);
    }

    if (details.ActualStartTime && details.ActualStartTime !== "--None--") {
      await this.actualStartTimeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ActualStartTime })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Actual Start Time selected: ${details.ActualStartTime}`);
    }

    // Fill Actual End Date/Time
    if (details.ActualEndDate && details.ActualEndDate !== "--None--") {
      await this.actualEndDateInput.fill(details.ActualEndDate, {
        timeout: 10000,
      });
      console.log(`✅ Actual End Date filled: ${details.ActualEndDate}`);
    }

    if (details.ActualEndTime && details.ActualEndTime !== "--None--") {
      await this.actualEndTimeCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ActualEndTime })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Actual End Time selected: ${details.ActualEndTime}`);
    }

    // Fill Actual Duration
    if (details.ActualDuration && details.ActualDuration !== "--None--") {
      await this.actualDurationInput.fill(details.ActualDuration, {
        timeout: 10000,
      });
      console.log(`✅ Actual Duration filled: ${details.ActualDuration}`);
    }

    // Fill Address fields
    if (details.Street && details.Street !== "--None--") {
      await this.streetInput.fill(details.Street, { timeout: 10000 });
      console.log(`✅ Street filled: ${details.Street}`);
    }

    if (details.City && details.City !== "--None--") {
      await this.cityInput.fill(details.City, { timeout: 10000 });
      console.log(`✅ City filled: ${details.City}`);
    }

    if (
      (details.ZipPostalCode && details.ZipPostalCode !== "--None--") ||
      (details["Zip/Postal Code"] && details["Zip/Postal Code"] !== "--None--")
    ) {
      const zipPostalCode = details.ZipPostalCode || details["Zip/Postal Code"];
      await this.zipPostalCodeInput.fill(zipPostalCode, { timeout: 10000 });
      console.log(`✅ Zip/Postal Code filled: ${zipPostalCode}`);
    }

    if (
      (details.StateProvince && details.StateProvince !== "--None--") ||
      (details["State/Province"] && details["State/Province"] !== "--None--")
    ) {
      const stateProvince = details.StateProvince || details["State/Province"];
      await this.stateProvinceInput.fill(stateProvince, { timeout: 10000 });
      console.log(`✅ State/Province filled: ${stateProvince}`);
    }

    if (details.Country && details.Country !== "--None--") {
      await this.countryInput.fill(details.Country, { timeout: 10000 });
      console.log(`✅ Country filled: ${details.Country}`);
    }

    // Fill Contact Information fields
    if (details.Phone && details.Phone !== "--None--") {
      await this.phoneInput.fill(details.Phone, { timeout: 10000 });
      console.log(`✅ Phone filled: ${details.Phone}`);
    }

    if (details.Email && details.Email !== "--None--") {
      await this.emailInput.fill(details.Email, { timeout: 10000 });
      console.log(`✅ Email filled: ${details.Email}`);
    }

    // Fill other optional fields if available
    if (details.Account && details.Account !== "--None--") {
      await this.accountCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Account })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Account selected: ${details.Account}`);
    }

    if (details.ServiceResource && details.ServiceResource !== "--None--") {
      await this.serviceResourceCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ServiceResource })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Service Resource selected: ${details.ServiceResource}`);
    }

    if (details.ServiceTerritory && details.ServiceTerritory !== "--None--") {
      await this.serviceTerritoryCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ServiceTerritory })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Service Territory selected: ${details.ServiceTerritory}`);
    }

    if (details.Priority && details.Priority !== "--None--") {
      await this.priorityCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Priority })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Priority selected: ${details.Priority}`);
    }

    // Fill checkbox fields if available
    if (
      details.IsAnytimeAppointment &&
      details.IsAnytimeAppointment !== "--None--"
    ) {
      const isAnytime = details.IsAnytimeAppointment.toLowerCase() === "true";
      const isCurrentlyChecked = await this.isAnytimeCheckbox.isChecked();

      if (isAnytime !== isCurrentlyChecked) {
        await this.isAnytimeCheckbox.click({ timeout: 10000 });
        console.log(`✅ Is Anytime Appointment checkbox set to: ${isAnytime}`);
      }
    }

    if (details.Emergency && details.Emergency !== "--None--") {
      const isEmergency = details.Emergency.toLowerCase() === "true";
      const isCurrentlyChecked = await this.emergencyCheckbox.isChecked();

      if (isEmergency !== isCurrentlyChecked) {
        await this.emergencyCheckbox.click({ timeout: 10000 });
        console.log(`✅ Emergency checkbox set to: ${isEmergency}`);
      }
    }

    if (
      details.IsRequiredResource &&
      details.IsRequiredResource !== "--None--"
    ) {
      const isRequired = details.IsRequiredResource.toLowerCase() === "true";
      const isCurrentlyChecked =
        await this.isRequiredResourceCheckbox.isChecked();

      if (isRequired !== isCurrentlyChecked) {
        await this.isRequiredResourceCheckbox.click({ timeout: 10000 });
        console.log(`✅ Is Required Resource checkbox set to: ${isRequired}`);
      }
    }

    // Fill Work Order related fields if available
    if (details.WorkOrder && details.WorkOrder !== "--None--") {
      await this.workOrderCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.WorkOrder })
        .first()
        .click({ timeout: 10000 });
      console.log(`✅ Work Order selected: ${details.WorkOrder}`);
    }

    if (details.WorkOrderLineItem && details.WorkOrderLineItem !== "--None--") {
      await this.workOrderLineItemCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.WorkOrderLineItem })
        .first()
        .click({ timeout: 10000 });
      console.log(
        `✅ Work Order Line Item selected: ${details.WorkOrderLineItem}`
      );
    }

    console.log("💾 Saving the service appointment...");

    // Save the service appointment
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Service appointment saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-service-appointment",
      this.testInfo,
      "Service/salesforce-service-appointments/"
    );

    console.log("🎉 Service appointment creation completed!");
  }

  /**
   * Verifies that a service appointment was successfully created by checking for specific field values
   *
   * This method validates service appointment creation success by checking if the service appointment detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing service appointment field values to verify
   */
  async verifyServiceAppointment(details: { [k: string]: string }) {
    console.log("🔍 Starting service appointment verification...");

    await expect(this.serviceAppointmentCreatedMessage).toContainText(
      "was created",
      {
        timeout: 10000,
      }
    );
    console.log("✅ Service appointment creation message verified");

    // Verify service appointment creation by checking for key field values on the page
    if (details.ParentRecord || details["Parent Record"]) {
      const parentRecord = details.ParentRecord || details["Parent Record"];
      expect(await this.page.getByText(parentRecord).count()).toBeGreaterThan(0);
      console.log(
        `✅ Service appointment parent record verification successful: ${parentRecord}`
      );
    }

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Service/salesforce-service-appointments/"
    );

    console.log("🎉 Service appointment verification completed!");
  }
}
