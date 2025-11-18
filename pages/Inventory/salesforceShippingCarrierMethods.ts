import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceShippingCarrierMethods Page Object Model
 *
 * This class provides automation capabilities for Salesforce Shipping Carrier Methods management functionality.
 * It handles shipping carrier method creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new shipping carrier methods with comprehensive field support
 * - Handle text fields, combobox interactions, and form validation
 * - Verify shipping carrier method creation success
 * - Support for all standard Salesforce shipping carrier method fields
 * - Navigate to Shipping Carrier Methods module using standard navigation
 * - Complete shipping carrier method lifecycle management
 *
 * @class SalesforceShippingCarrierMethodsPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceShippingCarrierMethodsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Shipping Carrier Method Information Fields
  readonly nameInput: Locator;
  readonly shippingCarrierCombobox: Locator;
  readonly externalReferenceInput: Locator;
  readonly minimumTransitTimeInput: Locator;
  readonly maximumTransitTimeInput: Locator;
  readonly transitTimeUnitCombobox: Locator;

  // Navigation Elements
  readonly shippingCarrierMethodCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceShippingCarrierMethods page object with all necessary locators
   *
   * Sets up locators for all Salesforce shipping carrier method elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceShippingCarrierMethods page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Shipping Carrier Method Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });
    this.shippingCarrierCombobox = page.getByRole("combobox", {
      name: "Shipping Carrier",
    });
    this.externalReferenceInput = page.getByRole("textbox", {
      name: "External Reference",
    });
    this.minimumTransitTimeInput = page.getByLabel("Minimum Transit Time");
    this.maximumTransitTimeInput = page.getByLabel("Maximum Transit Time");
    this.transitTimeUnitCombobox = page.getByRole("combobox", {
      name: "Transit Time Unit",
    });

    // Success message locator
    this.shippingCarrierMethodCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceShippingCarrierMethods page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new shipping carrier method in Salesforce with the provided details
   *
   * This method handles the complete shipping carrier method creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new shipping carrier method creation form
   * 3. Fills in all provided field values
   * 4. Saves the shipping carrier method
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing shipping carrier method field values to be filled
   * @param details.Name - Shipping Carrier Method Name (text input)
   * @param details.ShippingCarrier - Shipping Carrier (combobox)
   * @param details.ExternalReference - External Reference (text input)
   * @param details.MinimumTransitTime - Minimum Transit Time (text input)
   * @param details.MaximumTransitTime - Maximum Transit Time (text input)
   * @param details.TransitTimeUnit - Transit Time Unit (combobox)
   *
   * @example
   * await shippingCarrierMethodPage.addNewShippingCarrierMethod({
   *   Name: "Express Delivery",
   *   ShippingCarrier: "FedEx Express",
   *   ExternalReference: "FEDEX-EXP-001",
   *   MinimumTransitTime: "1",
   *   MaximumTransitTime: "2",
   *   TransitTimeUnit: "Days"
   * });
   */
  async addNewShippingCarrierMethod(details: { [key: string]: string }) {
    console.log("🔄 Starting shipping carrier method creation process...");
    console.log(
      "📝 Shipping Carrier Method details:",
      JSON.stringify(details, null, 2)
    );

    await expect(this.newButton).toBeVisible({ timeout: 10000 });

    // Take start screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-shipping-carrier-method",
        this.testInfo,
        "Inventory/salesforce-shipping-carrier-methods/"
      );
    }

    // Click New Shipping Carrier Method
    await this.newButton.click({ timeout: 10000 });
    console.log("✅ Shipping Carrier Method creation form opened");

    // Wait for the form dialog to be fully loaded
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
    console.log("✅ Shipping Carrier Method form fields are now visible");

    console.log("📋 Filling form fields...");

    // Fill Name field (text input)
    if (details.Name) {
      await this.nameInput.fill(details.Name, {
        timeout: 10000,
      });
      console.log(`✅ Name filled: ${details.Name}`);
    }

    // Handle Shipping Carrier combobox
    if (details.ShippingCarrier && details.ShippingCarrier !== "--None--") {
      await this.shippingCarrierCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.ShippingCarrier })
        .click({
          timeout: 10000,
        });
      console.log(`✅ Shipping Carrier selected: ${details.ShippingCarrier}`);
    }

    // Fill External Reference field (text input)
    if (details.ExternalReference && details.ExternalReference !== "--None--") {
      await this.externalReferenceInput.fill(details.ExternalReference, {
        timeout: 10000,
      });
      console.log(`✅ External Reference filled: ${details.ExternalReference}`);
    }

    // Fill Minimum Transit Time field (text input)
    if (
      details.MinimumTransitTime &&
      details.MinimumTransitTime !== "--None--"
    ) {
      await this.minimumTransitTimeInput.fill(details.MinimumTransitTime, {
        timeout: 10000,
      });
      console.log(
        `✅ Minimum Transit Time filled: ${details.MinimumTransitTime}`
      );
    }

    // Fill Maximum Transit Time field (text input)
    if (
      details.MaximumTransitTime &&
      details.MaximumTransitTime !== "--None--"
    ) {
      await this.maximumTransitTimeInput.fill(details.MaximumTransitTime, {
        timeout: 10000,
      });
      console.log(
        `✅ Maximum Transit Time filled: ${details.MaximumTransitTime}`
      );
    }

    // Handle Transit Time Unit combobox
    if (details.TransitTimeUnit && details.TransitTimeUnit !== "--None--") {
      await this.transitTimeUnitCombobox.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.TransitTimeUnit, exact: true })
        .click({
          timeout: 10000,
        });
      console.log(`✅ Transit Time Unit selected: ${details.TransitTimeUnit}`);
    }

    console.log("💾 Saving the shipping carrier method...");

    // Save the shipping carrier method
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Shipping Carrier Method saved successfully");

    // Wait for navigation after save
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-shipping-carrier-method",
        this.testInfo,
        "Inventory/salesforce-shipping-carrier-methods/"
      );
    }

    console.log("🎉 Shipping Carrier Method creation completed!");
  }

  /**
   * Verifies that a shipping carrier method was successfully created by checking for specific field values
   *
   * This method validates shipping carrier method creation success by checking if the shipping carrier method detail page
   * displays the expected field values and takes a verification screenshot for documentation.
   *
   * @param details - Object containing shipping carrier method field values to verify
   * @param details.Name - Shipping Carrier Method Name to verify
   *
   * @throws Will throw an assertion error if expected field values are not found
   *
   * @example
   * await shippingCarrierMethodPage.verifyShippingCarrierMethodCreation({
   *   Name: "Express Delivery"
   * });
   */
  async verifyShippingCarrierMethodCreation(details: { [k: string]: string }) {
    console.log("🔍 Starting shipping carrier method verification...");
    const nameValue = details.Name;
    console.log(`📝 Verifying Shipping Carrier Method: ${nameValue}`);
    await expect(this.shippingCarrierMethodCreatedMessage).toContainText(
      "was created"
    );
    await expect(this.page.locator(`[slot="primaryField"]`)).toContainText(
      nameValue
    );

    // Take verification screenshot
    if (this.testInfo) {
      await Helper.takeScreenshotToFile(
        this.page,
        "3-verification",
        this.testInfo,
        "Inventory/salesforce-shipping-carrier-methods/"
      );
    }

    console.log("🎉 Shipping Carrier Method verification completed!");
  }
}
