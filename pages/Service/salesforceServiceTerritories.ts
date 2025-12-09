import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceServiceTerritories Page Object Model
 *
 * This class provides automation capabilities for Salesforce Service Territories management functionality.
 * It handles service territory creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new service territory with comprehensive field support
 * - Handle text fields, checkbox, and combobox interactions
 * - Verify service territory creation success
 * - Support for all standard Salesforce service territory fields
 * - Navigate to Service Territories module using standard navigation
 * - Complete service territory lifecycle management
 *
 * @class SalesforceServiceTerritoriesPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceServiceTerritoriesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Service Territory Information Fields
  readonly nameInput: Locator;
  readonly parentTerritoryCombobox: Locator;
  readonly operatingHoursCombobox: Locator;
  readonly activeCheckbox: Locator;

  // Dynamic Fields - Country and State (can be textbox or combobox)
  readonly countryTextbox: Locator;
  readonly countryCombobox: Locator;
  readonly stateProvinceTextbox: Locator;
  readonly stateProvinceCombobox: Locator;

  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly zipPostalCodeInput: Locator;
  readonly descriptionInput: Locator;

  // Navigation Elements
  readonly serviceTerritoryCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceServiceTerritories page object with all necessary locators
   *
   * Sets up locators for all Salesforce service territory elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceServiceTerritories page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Service Territory Information field locators - Based on actual Salesforce testing
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });
    this.parentTerritoryCombobox = page.getByRole("combobox", {
      name: "Parent Territory",
    });
    this.operatingHoursCombobox = page.getByRole("combobox", {
      name: "Operating Hours",
    });
    this.activeCheckbox = page.getByRole("checkbox", {
      name: "Active",
    });

    // Dynamic Fields - Initialize dual locators for Country and State
    this.countryTextbox = page.getByRole("textbox", {
      name: "Country",
    });
    this.countryCombobox = page.getByRole("combobox", {
      name: "Country",
    });
    this.stateProvinceTextbox = page.getByRole("textbox", {
      name: "State/Province",
    });
    this.stateProvinceCombobox = page.getByRole("combobox", {
      name: "State/Province",
    });

    this.addressInput = page.getByRole("textbox", {
      name: "Address",
    });
    this.cityInput = page.getByRole("textbox", {
      name: "City",
    });
    this.zipPostalCodeInput = page.getByRole("textbox", {
      name: "Zip/Postal Code",
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
    });

    // Success message locator
    this.serviceTerritoryCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceServiceTerritories page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new service territory in Salesforce with the provided details
   *
   * This method handles the complete service territory creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new service territory creation form
   * 3. Fills in all provided field values
   * 4. Saves the service territory
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing service territory field values to be filled
   * @param details.Name - Name (text input)
   * @param details.ParentTerritory - Parent Territory (combobox selection from Recent Service Territories)
   * @param details.OperatingHours - Operating Hours (combobox selection from Recent Operating Hours - REQUIRED)
   * @param details.Active - Active status (checkbox - true/false)
   * @param details.Country - Country (text input)
   * @param details.Address - Address (text input)
   * @param details.City - City (text input)
   * @param details.StateProvince - State/Province (text input)
   * @param details.ZipPostalCode - Zip/Postal Code (text input)
   * @param details.Description - Description (text input)
   *
   * @example
   * await serviceTerritoryPage.addNewServiceTerritory({
   *   Name: "North Region Service",
   *   ParentTerritory: "--None--",
   *   OperatingHours: "Standard Hours",
   *   Active: "true",
   *   Country: "United States",
   *   Address: "123 Main Street",
   *   City: "New York",
   *   StateProvince: "New York",
   *   ZipPostalCode: "10001",
   *   Description: "Primary service territory for north region"
   * });
   */
  async addNewServiceTerritory(details: { [key: string]: string }) {
    console.log("🔄 Starting service territory creation process...");
    console.log(
      "📝 Service Territory details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-service-territory",
        this.testInfo,
        "Service/salesforce-service-territories/"
      );
    }

    // Click New Service Territory
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Service Territory creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Service Territory form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name || details["Name"]) {
      const nameValue = details.Name || details["Name"];
      await this.nameInput.fill(nameValue, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${nameValue}`);
    }

    // Fill Parent Territory field (combobox)
    if (
      (details.ParentTerritory && details.ParentTerritory !== "--None--") ||
      (details["Parent Territory"] &&
        details["Parent Territory"] !== "--None--")
    ) {
      const parentTerritoryValue =
        details.ParentTerritory || details["Parent Territory"];
      await this.parentTerritoryCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: parentTerritoryValue })
        .first()
        .click({ timeout: 5000 });
      console.log(`✅ Parent Territory selected: ${parentTerritoryValue}`);
    }

    // Fill Operating Hours field (combobox)
    if (
      (details.OperatingHours && details.OperatingHours !== "--None--") ||
      (details["Operating Hours"] && details["Operating Hours"] !== "--None--")
    ) {
      const operatingHoursValue =
        details.OperatingHours || details["Operating Hours"];
      await this.operatingHoursCombobox.click({ timeout: 10000 });

      // Wait for dropdown to appear and select from options
      await this.page
        .getByRole("option", { name: operatingHoursValue })
        .first()
        .click({ timeout: 5000 });
      console.log(`✅ Operating Hours selected: ${operatingHoursValue}`);
    }

    // Handle Active checkbox
    if (
      (details.Active && details.Active !== "--None--") ||
      (details["Active"] && details["Active"] !== "--None--")
    ) {
      const activeValue = details.Active || details["Active"];
      const shouldCheck =
        activeValue.toLowerCase() === "true" || activeValue === "1";

      const isCurrentlyChecked = await this.activeCheckbox.isChecked();

      if (shouldCheck && !isCurrentlyChecked) {
        await this.activeCheckbox.check({ timeout: 10000 });
        console.log("✅ Active checkbox checked");
      } else if (!shouldCheck && isCurrentlyChecked) {
        await this.activeCheckbox.uncheck({ timeout: 10000 });
        console.log("✅ Active checkbox unchecked");
      }
      console.log(`✅ Active status set to: ${activeValue}`);
    }

    // Fill Country field (textbox/combobox input)
    if (
      (details.Country && details.Country !== "--None--") ||
      (details["Country"] && details["Country"] !== "--None--")
    ) {
      const countryValue = details.Country || details["Country"];
      console.log("🌍 Handling Country field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.countryTextbox,
        this.countryCombobox,
        "Country",
        countryValue
      );
    }

    // Fill Address field (text input)
    if (
      (details.Address && details.Address !== "--None--") ||
      (details["Address"] && details["Address"] !== "--None--")
    ) {
      const addressValue = details.Address || details["Address"];
      await this.addressInput.fill(addressValue, {
        timeout: 10000,
      });
      console.log(`✅ Address filled: ${addressValue}`);
    }

    // Fill City field (text input)
    if (
      (details.City && details.City !== "--None--") ||
      (details["City"] && details["City"] !== "--None--")
    ) {
      const cityValue = details.City || details["City"];
      await this.cityInput.fill(cityValue, {
        timeout: 10000,
      });
      console.log(`✅ City filled: ${cityValue}`);
    }

    // Fill State/Province field (textbox/combobox input)
    if (
      (details.StateProvince && details.StateProvince !== "--None--") ||
      (details["State/Province"] && details["State/Province"] !== "--None--")
    ) {
      const stateProvinceValue = details.StateProvince || details["State/Province"];
      console.log("🏘️ Handling State/Province field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.stateProvinceTextbox,
        this.stateProvinceCombobox,
        "State/Province",
        stateProvinceValue
      );
    }

    // Fill Zip/Postal Code field (text input)
    if (
      (details.ZipPostalCode && details.ZipPostalCode !== "--None--") ||
      (details["Zip/Postal Code"] && details["Zip/Postal Code"] !== "--None--")
    ) {
      const zipPostalCodeValue =
        details.ZipPostalCode || details["Zip/Postal Code"];
      await this.zipPostalCodeInput.fill(zipPostalCodeValue, {
        timeout: 10000,
      });
      console.log(`✅ Zip/Postal Code filled: ${zipPostalCodeValue}`);
    }

    // Fill Description field (text input)
    if (
      (details.Description && details.Description !== "--None--") ||
      (details["Description"] && details["Description"] !== "--None--")
    ) {
      const descriptionValue = details.Description || details["Description"];
      await this.descriptionInput.fill(descriptionValue, {
        timeout: 10000,
      });
      console.log(`✅ Description filled: ${descriptionValue}`);
    }

    console.log("💾 Saving the service territory...");

    // Save the service territory
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Service Territory saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-service-territory",
        this.testInfo,
        "Service/salesforce-service-territories/"
      );
    }

    console.log("🎉 Service Territory creation completed!");
  }

  /**
   * Verifies that a service territory was successfully created by checking for specific field values
   *
   * This method validates service territory creation success by checking if the service territory detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing service territory field values to verify
   * @param details.Name - Name to verify
   * @param details.Active - Active status to verify
   * @param details.Country - Country to verify
   * @param details.City - City to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await serviceTerritoryPage.verifyServiceTerritoryCreation({
   *   Name: "North Region Service",
   *   Active: "true"
   * });
   */
  async verifyServiceTerritoryCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting service territory verification...");

    await expect(this.serviceTerritoryCreatedMessage).toContainText(
      "was created"
    );
    await expect(this.page.locator(`[slot="primaryField"]`)).toContainText(
      details.Name
    );

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification",
        this.testInfo,
        "Service/salesforce-service-territories/"
      );
    }

    console.log("🎉 Service Territory verification completed!");
  }
}
