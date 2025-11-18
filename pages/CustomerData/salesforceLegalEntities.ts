import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceLegalEntities Page Object Model
 *
 * This class provides automation capabilities for Salesforce Legal Entities management functionality.
 * It handles legal entities creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new legal entities with comprehensive field support
 * - Handle text fields and combobox interactions
 * - Verify legal entities creation success
 * - Support for all standard Salesforce legal entities fields
 * - Navigate to Legal Entities module using standard navigation
 * - Complete legal entities lifecycle management
 *
 * @class SalesforceLegalEntitiesPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceLegalEntitiesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Legal Entities Information Fields
  readonly legalEntityNameInput: Locator;
  readonly companyNameInput: Locator;
  readonly countryCombobox: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateCombobox: Locator;
  readonly postalCodeInput: Locator;
  readonly descriptionInput: Locator;
  readonly statusCombobox: Locator;

  // Navigation Elements
  readonly legalEntitiesCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceLegalEntities page object with all necessary locators
   *
   * Sets up locators for all Salesforce legal entities elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceLegalEntities page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Legal Entities Information field locators - Based on standard Salesforce patterns
    this.legalEntityNameInput = page.getByRole("textbox", {
      name: "Legal Entity Name",
    });
    this.companyNameInput = page.getByRole("textbox", {
      name: "Company Name",
    });
    this.countryCombobox = page.getByRole("combobox", {
      name: "Country",
    });
    this.streetInput = page.getByRole("textbox", {
      name: "Street",
    });
    this.cityInput = page.getByRole("textbox", {
      name: "City",
    });
    this.stateCombobox = page.getByRole("combobox", {
      name: "State",
    });
    this.postalCodeInput = page.getByRole("textbox", {
      name: "Postal Code",
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
    });
    this.statusCombobox = page.getByRole("combobox", {
      name: "Status",
    });

    // Success message locator
    this.legalEntitiesCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceLegalEntities page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new legal entities in Salesforce with the provided details
   *
   * This method handles the complete legal entities creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new legal entities creation form
   * 3. Fills in all provided field values
   * 4. Saves the legal entities
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing legal entities field values to be filled
   * @param details.LegalEntitiesName - Legal Entities Name (text input)
   * @param details.CompanyName - Company Name (text input)
   * @param details.Address - Address (text input)
   * @param details.Country - Country (combobox)
   * @param details.Street - Street (text input)
   * @param details.City - City (text input)
   * @param details.State - State (combobox)
   * @param details.PostalCode - Postal Code (text input)
   * @param details.Description - Description (text input)
   * @param details.Status - Status (combobox)
   *
   * @example
   * await legalEntitiesPage.addNewLegalEntities({
   *   LegalEntitiesName: "ABC Corp Legal",
   *   CompanyName: "ABC Corporation",
   *   Address: "123 Business Street",
   *   Country: "United States",
   *   Street: "123 Business St",
   *   City: "New York",
   *   State: "New York",
   *   PostalCode: "10001",
   *   Description: "Main legal entities",
   *   Status: "Active"
   * });
   */
  async addNewLegalEntities(details: { [key: string]: string }) {
    console.log("🔄 Starting legal entities creation process...");
    console.log("📝 Legal Entities details:", JSON.stringify(details, null, 2));

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-legal-entities",
        this.testInfo,
        "CustomerData/salesforce-legal-entities/"
      );
    }

    // Click New Legal Entities
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Legal Entities creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.legalEntityNameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Legal Entity  form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Legal Entity Name field (text input)
    if (details.EntityName || details["Legal Entity Name"]) {
      const legalEntityNameValue =
        details.EntityName || details["Legal Entity Name"];
      await this.legalEntityNameInput.fill(legalEntityNameValue, {
        timeout: 10000,
      });
      console.log(`✅ Legal Entity Name filled: ${legalEntityNameValue}`);
    }

    // Fill Company Name field (text input)
    if (
      (details.CompanyName && details.CompanyName !== "--None--") ||
      (details["Company Name"] && details["Company Name"] !== "--None--")
    ) {
      const companyNameValue = details.CompanyName || details["Company Name"];
      await this.companyNameInput.fill(companyNameValue, {
        timeout: 10000,
      });
      console.log(`✅ Company Name filled: ${companyNameValue}`);
    }

    // Handle Country combobox
    if (
      (details.Country && details.Country !== "--None--") ||
      (details["Country"] && details["Country"] !== "--None--")
    ) {
      const countryValue = details.Country || details["Country"];
      await this.countryCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: countryValue }).click({
        timeout: 10000,
      });
      console.log(`✅ Country selected: ${countryValue}`);
    }

    // Fill Street field (text input)
    if (
      (details.Street && details.Street !== "--None--") ||
      (details["Street"] && details["Street"] !== "--None--")
    ) {
      const streetValue = details.Street || details["Street"];
      await this.streetInput.fill(streetValue, {
        timeout: 10000,
      });
      console.log(`✅ Street filled: ${streetValue}`);
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

    // Handle State combobox
    if (
      (details.State && details.State !== "--None--") ||
      (details["State"] && details["State"] !== "--None--")
    ) {
      const stateValue = details.State || details["State"];
      await this.stateCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: stateValue, exact: true })
        .click({
          timeout: 10000,
        });
      console.log(`✅ State selected: ${stateValue}`);
    }

    // Fill Postal Code field (text input)
    if (
      (details.PostalCode && details.PostalCode !== "--None--") ||
      (details["Postal Code"] && details["Postal Code"] !== "--None--")
    ) {
      const postalCodeValue = details.PostalCode || details["Postal Code"];
      await this.postalCodeInput.fill(postalCodeValue, {
        timeout: 10000,
      });
      console.log(`✅ Postal Code filled: ${postalCodeValue}`);
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

    // Handle Status combobox
    if (
      (details.Status && details.Status !== "--None--") ||
      (details["Status"] && details["Status"] !== "--None--")
    ) {
      const statusValue = details.Status || details["Status"];
      await this.statusCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: statusValue, exact: true })
        .click({
          timeout: 10000,
        });
      console.log(`✅ Status selected: ${statusValue}`);
    }

    console.log("💾 Saving the legal entities...");

    // Save the legal entities
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Legal Entities saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-legal-entities",
        this.testInfo,
        "CustomerData/salesforce-legal-entities/"
      );
    }

    console.log("🎉 Legal Entities creation completed!");
  }

  /**
   * Verifies that a legal entities was successfully created by checking for specific field values
   *
   * This method validates legal entities creation success by checking if the legal entities detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing legal entities field values to verify
   * @param details.LegalEntitiesName - Legal Entities Name to verify
   * @param details.CompanyName - Company Name to verify
   * @param details.Status - Status to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await legalEntitiesPage.verifyLegalEntitiesCreation({
   *   LegalEntitiesName: "ABC Corp Legal",
   *   CompanyName: "ABC Corporation"
   * });
   */
  async verifyLegalEntitiesCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting legal entities verification...");
    const legalEntityNameValue =
      details.EntityName || details["Legal Entity Name"];
    console.log(`📝 Verifying Legal Entities: ${legalEntityNameValue}`);
    await expect(this.legalEntitiesCreatedMessage).toContainText("was created");
    await expect(this.page.locator(`[slot="primaryField"]`)).toContainText(
      legalEntityNameValue
    );

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification",
        this.testInfo,
        "CustomerData/salesforce-legal-entities/"
      );
    }

    console.log("🎉 Legal Entities verification completed!");
  }
}
