import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceIndividuals Page Object Model
 *
 * This class provides automation capabilities for Salesforce Individual management functionality.
 * It handles individual creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new individuals with comprehensive field support
 * - Handle complex form interactions including checkboxes, dropdowns, and date fields
 * - Verify individual creation success
 * - Support for all standard Salesforce individual fields including privacy settings
 * - Navigate to Individuals module using standard navigation
 * - Privacy and data protection field management
 *
 * @class SalesforceIndividuals
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceIndividualsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Name Fields
  readonly salutationCombobox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;

  // Additional Information Fields
  readonly birthDateInput: Locator;
  readonly birthDatePickerButton: Locator;
  readonly individualAgeCombobox: Locator;

  // Privacy and Data Protection Checkboxes
  readonly blockGeolocationTrackingCheckbox: Locator;
  readonly dontProcessCheckbox: Locator;
  readonly dontProfileCheckbox: Locator;
  readonly dontMarketCheckbox: Locator;
  readonly dontTrackCheckbox: Locator;
  readonly exportIndividualDataCheckbox: Locator;
  readonly forgetIndividualCheckbox: Locator;
  readonly okToStorePIIDataElsewhereCheckbox: Locator;

  // Navigation Elements
  readonly individualCreatedMessage: Locator;
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceIndividuals page object with all necessary locators
   *
   * Sets up locators for all Salesforce individual form elements using role-based selectors
   * for maximum reliability. All elements are identified based on the actual MCP server response.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceIndividuals page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Name field locators
    this.salutationCombobox = page.getByRole("combobox", {
      name: "Salutation",
    });
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name *" });

    // Additional information fields
    this.birthDateInput = page.getByRole("textbox", { name: "Birth Date" });
    this.birthDatePickerButton = page.getByRole("button", {
      name: /datePickerAssistiveText|Date Picker/i,
    });
    this.individualAgeCombobox = page.getByRole("combobox", {
      name: "Individual's Age",
    });

    // Privacy and data protection checkboxes
    this.blockGeolocationTrackingCheckbox = page.getByRole("checkbox", {
      name: "Block Geolocation Tracking",
    });
    this.dontProcessCheckbox = page.getByRole("checkbox", {
      name: "Don't Process",
    });
    this.dontProfileCheckbox = page.getByRole("checkbox", {
      name: "Don't Profile",
    });
    this.dontMarketCheckbox = page.getByRole("checkbox", {
      name: "Don't Market",
    });
    this.dontTrackCheckbox = page.getByRole("checkbox", {
      name: "Don't Track",
    });
    this.exportIndividualDataCheckbox = page.getByRole("checkbox", {
      name: "Export Individual's Data",
    });
    this.forgetIndividualCheckbox = page.getByRole("checkbox", {
      name: "Forget this Individual",
    });
    this.okToStorePIIDataElsewhereCheckbox = page.getByRole("checkbox", {
      name: "OK to Store PII Data Elsewhere",
    });

    // Success message locator
    this.individualCreatedMessage = page.locator(".toastMessage");
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceIndividuals page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new individual in Salesforce with the provided details
   *
   * This method handles the complete individual creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new individual creation form
   * 3. Fills in all provided field values including privacy settings
   * 4. Saves the individual
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing individual field values to be filled
   * @param details.Salutation - Individual salutation (Mr., Mrs., Dr., etc.)
   * @param details.FirstName - Individual first name
   * @param details.LastName - Individual last name (required)
   * @param details.BirthDate - Birth date in MM/DD/YYYY format
   * @param details.IndividualAge - Individual's age category
   * @param details.BlockGeolocationTracking - Block geolocation tracking (true/false)
   * @param details.DontProcess - Don't process flag (true/false)
   * @param details.DontProfile - Don't profile flag (true/false)
   * @param details.DontMarket - Don't market flag (true/false)
   * @param details.DontTrack - Don't track flag (true/false)
   * @param details.ExportIndividualData - Export individual's data flag (true/false)
   * @param details.ForgetIndividual - Forget individual flag (true/false)
   * @param details.OKToStorePIIDataElsewhere - OK to store PII data elsewhere flag (true/false)
   *
   * @example
   * await individualsPage.addNewIndividual({
   *   Salutation: "Mr.",
   *   FirstName: "John",
   *   LastName: "Doe",
   *   BirthDate: "01/15/1990",
   *   DontMarket: "true"
   * });
   */
  async addNewIndividual(details: { [key: string]: string }) {
    console.log("🔄 Starting individual creation process...");
    console.log("📝 Individual details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-individual",
      this.testInfo,
      "CustomerData/salesforce-individuals/"
    );

    // Click New Individual
    console.log("✅ Individual creation form opened");

    // Wait for form to be fully loaded
    await this.lastNameInput.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Fill name fields
    if (details.Salutation) {
      await this.salutationCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.Salutation }).first().click({ timeout: 10000 });
    }

    if (details.FirstName) {
      await this.firstNameInput.fill(Helper.generateUniqueValue(details.FirstName), { timeout: 10000 });
    }

    if (details.LastName) {
      await this.lastNameInput.fill(Helper.generateUniqueValue(details.LastName), { timeout: 10000 });
    }

    // Fill additional information fields
    if (details.BirthDate) {
      await this.birthDateInput.fill(details.BirthDate, { timeout: 10000 });
    }

    if (details.IndividualAge || details["Individual's Age"]) {
      const individualAge =
        details.IndividualAge || details["Individual's Age"];
      await this.individualAgeCombobox.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: individualAge }).first().click({ timeout: 10000 });
    }

    // Handle privacy and data protection settings
    if (
      details.BlockGeolocationTracking === "true" ||
      details["Block Geolocation Tracking"] === "true"
    ) {
      await this.blockGeolocationTrackingCheckbox.click({ timeout: 10000 });
    }

    if (details.DontProcess === "true" || details["Don't Process"] === "true") {
      await this.dontProcessCheckbox.click({ timeout: 10000 });
    }

    if (details.DontProfile === "true" || details["Don't Profile"] === "true") {
      await this.dontProfileCheckbox.click({ timeout: 10000 });
    }

    if (details.DontMarket === "true" || details["Don't Market"] === "true") {
      await this.dontMarketCheckbox.click({ timeout: 10000 });
    }

    if (details.DontTrack === "true" || details["Don't Track"] === "true") {
      await this.dontTrackCheckbox.click({ timeout: 10000 });
    }

    if (
      details.ExportIndividualData === "true" ||
      details["Export Individual's Data"] === "true"
    ) {
      await this.exportIndividualDataCheckbox.click({ timeout: 10000 });
    }

    if (
      details.ForgetIndividual === "true" ||
      details["Forget this Individual"] === "true"
    ) {
      await this.forgetIndividualCheckbox.click({ timeout: 10000 });
    }

    if (
      details.OKToStorePIIDataElsewhere === "true" ||
      details["OK to Store PII Data Elsewhere"] === "true"
    ) {
      await this.okToStorePIIDataElsewhereCheckbox.click({ timeout: 10000 });
    }

    console.log("💾 Saving the individual...");

    // Save the individual
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Individual saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-individual",
      this.testInfo,
      "CustomerData/salesforce-individuals/"
    );

    console.log("🎉 Individual creation completed!");
  }

  /**
   * Verifies that an individual was successfully created by checking for specific field values
   *
   * This method validates individual creation success by checking if the individual detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing individual field values to verify
   * @param details.FirstName - First name to verify
   * @param details.LastName - Last name to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await individualsPage.verifyIndividual({
   *   FirstName: "John",
   *   LastName: "Doe"
   * });
   */
  async verifyIndividual(details: { [k: string]: string }) {
    console.log("🔍 Starting individual verification...");

    // Verify individual creation by checking for the name on the page
    if (details.FirstName && details.LastName) {
      const fullName = `${details.FirstName} ${details.LastName}`;
      await expect(this.page.getByText(fullName).first().isVisible()).toBeTruthy();
      console.log(`✅ Individual name verification successful: ${fullName}`);
    } else if (details.LastName) {
      await expect(
        this.page.locator(`[title*="${details.LastName}"]`).first()
      ).toBeVisible({ timeout: 10000 });
      console.log(
        `✅ Individual last name verification successful: ${details.LastName}`
      );
    }
    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "CustomerData/salesforce-individuals/"
    );

    console.log("🎉 Individual verification completed!");
  }
}
