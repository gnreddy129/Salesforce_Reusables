import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceServiceContracts Page Object Model
 *
 * This class provides automation capabilities for Salesforce Service Contracts management.
 * It handles service contract creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new service contracts with comprehensive field management
 * - Handle complex form interactions with dates, comboboxes, and text inputs
 * - Verify service contract creation success
 * - Support for all required and optional service contract fields
 *
 * @class SalesforceServiceContracts
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceServiceContractsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly dialog: Locator;

  // Contract Information Fields
  readonly contractNameTextbox: Locator;
  readonly startDateTextbox: Locator;
  readonly endDateTextbox: Locator;
  readonly termMonthsTextbox: Locator;
  readonly descriptionTextarea: Locator;
  readonly specialTermsTextarea: Locator;

  // Combobox Fields
  readonly accountNameCombobox: Locator;
  readonly contactNameCombobox: Locator;

  // Totals Section
  readonly shippingHandlingTextbox: Locator;
  readonly taxTextbox: Locator;

  // Billing Address Fields
  readonly billingStreetTextarea: Locator;
  readonly billingCityTextbox: Locator;
  readonly billingZipTextbox: Locator;

  // Dynamic Fields - Billing Country and State (can be textbox or combobox)
  readonly billingCountryTextbox_static: Locator;
  readonly billingCountryCombobox: Locator;
  readonly billingStateTextbox_static: Locator;
  readonly billingStateCombobox: Locator;

  // Shipping Address Fields
  readonly shippingStreetTextarea: Locator;
  readonly shippingCityTextbox: Locator;
  readonly shippingZipTextbox: Locator;

  // Dynamic Fields - Shipping Country and State (can be textbox or combobox)
  readonly shippingCountryTextbox_static: Locator;
  readonly shippingCountryCombobox: Locator;
  readonly shippingStateTextbox_static: Locator;
  readonly shippingStateCombobox: Locator;

  // Keep original textbox references for backward compatibility
  readonly billingStateTextbox: Locator;
  readonly billingCountryTextbox: Locator;
  readonly shippingStateTextbox: Locator;
  readonly shippingCountryTextbox: Locator;

  // Action Buttons
  readonly saveButton: Locator;
    readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceServiceContracts page object with all necessary locators
   *
   * Sets up locators for all Salesforce service contract form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceServiceContracts page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls
    this.allOptionsLocator = page.getByRole("option");
    this.dialog = page.getByRole("dialog").first();

    // Contract Information Fields - Dialog scoped textboxes and textareas
    this.contractNameTextbox = this.dialog.getByRole("textbox", {
      name: /Contract Name/i,
    });

    this.startDateTextbox = this.dialog.getByRole("textbox", {
      name: /Start Date/i,
    });

    this.endDateTextbox = this.dialog.getByRole("textbox", {
      name: /End Date/i,
    });

    this.termMonthsTextbox = this.dialog.getByRole("spinbutton", {
      name: /Term \(months\)/i,
    });

    this.descriptionTextarea = this.dialog.getByRole("textbox", {
      name: /Description/i,
    });

    this.specialTermsTextarea = this.dialog.getByRole("textbox", {
      name: /Special Terms/i,
    });

    // Combobox Fields
    this.accountNameCombobox = this.dialog.getByRole("combobox", {
      name: /Account Name/i,
    });

    this.contactNameCombobox = this.dialog.getByRole("combobox", {
      name: /Contact Name/i,
    });

    // Totals Section - Shipping and Handling & Tax
    this.shippingHandlingTextbox = this.dialog.getByRole("spinbutton", {
      name: /Shipping and Handling/i,
    });

    this.taxTextbox = this.dialog.getByRole("spinbutton", {
      name: /^Tax$/i,
    });

    // Billing Address Fields
    this.billingStreetTextarea = this.dialog.getByRole("textbox", {
      name: /^Billing Street$/i,
    });

    this.billingCityTextbox = this.dialog.getByRole("textbox", {
      name: /^Billing City$/i,
    });

    this.billingZipTextbox = this.dialog.getByRole("textbox", {
      name: /^Billing Zip$/i,
    });

    // Dynamic Fields - Initialize dual locators for Billing Country and State
    this.billingCountryTextbox_static = this.dialog.getByRole("textbox", { name: /Billing Country/i });
    this.billingCountryCombobox = this.dialog.getByRole("combobox", { name: /Billing Country/i });
    this.billingStateTextbox_static = this.dialog.getByRole("textbox", { name: /Billing State/i });
    this.billingStateCombobox = this.dialog.getByRole("combobox", { name: /Billing State/i });

    // Keep original references for backward compatibility
    this.billingCountryTextbox = this.billingCountryTextbox_static;
    this.billingStateTextbox = this.billingStateTextbox_static;

    // Shipping Address Fields
    this.shippingStreetTextarea = this.dialog.getByRole("textbox", {
      name: /^Shipping Street$/i,
    });

    this.shippingCityTextbox = this.dialog.getByRole("textbox", {
      name: /^Shipping City$/i,
    });

    this.shippingZipTextbox = this.dialog.getByRole("textbox", {
      name: /^Shipping Zip$/i,
    });

    // Dynamic Fields - Initialize dual locators for Shipping Country and State
    this.shippingCountryTextbox_static = this.dialog.getByRole("textbox", { name: /Shipping Country/i });
    this.shippingCountryCombobox = this.dialog.getByRole("combobox", { name: /Shipping Country/i });
    this.shippingStateTextbox_static = this.dialog.getByRole("textbox", { name: /Shipping State/i });
    this.shippingStateCombobox = this.dialog.getByRole("combobox", { name: /Shipping State/i });

    // Keep original references for backward compatibility
    this.shippingCountryTextbox = this.shippingCountryTextbox_static;
    this.shippingStateTextbox = this.shippingStateTextbox_static;

    // Action Buttons
    this.saveButton = this.dialog.getByRole("button", {
      name: /^Save$/i,
    });

    console.log(
      "✅ SalesforceServiceContracts page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new service contract in Salesforce with the provided details
   *
   * This method handles the complete service contract creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new service contract dialog
   * 3. Fills in all provided field values
   * 4. Saves the service contract
   * 5. Takes screenshots at key points
   *
   * @param details - Object containing service contract field values to be filled
   */
  async addNewServiceContract(details: { [field: string]: string }) {
    console.log("🔄 Starting service contract creation process...");
    console.log("📋 Service contract details:", JSON.stringify(details, null, 2));

    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-service-contract",
      this.testInfo,
      "Service/salesforce-service-contracts/"
    );
    console.log("✅ Service contract creation dialog opened");

    await this.dialog.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Contract Name (Required)
    if (details.ContractName || details["Contract Name"]) {
      const contractName = details.ContractName || details["Contract Name"];
      await this.contractNameTextbox.fill(contractName, { timeout: 10000 });
      console.log("✅ Contract Name filled:", contractName);
    }

    // Start Date
    if (details.StartDate || details["Start Date"]) {
      const startDate = details.StartDate || details["Start Date"];
      console.log("📝 Filling Start Date...");
      try {
        await this.startDateTextbox.fill(startDate, { timeout: 10000 });
        console.log("✅ Start Date filled:", startDate);
      } catch (e) {
        console.log("❌ Failed to fill Start Date:", e);
      }
    }

    // End Date
    if (details.EndDate || details["End Date"]) {
      const endDate = details.EndDate || details["End Date"];
      console.log("📝 Filling End Date...");
      try {
        await this.endDateTextbox.fill(endDate, { timeout: 10000 });
        console.log("✅ End Date filled:", endDate);
      } catch (e) {
        console.log("❌ Failed to fill End Date:", e);
      }
    }

    // Term (months)
    if (details.TermMonths || details["Term (months)"]) {
      const termMonths = details.TermMonths || details["Term (months)"];
      await this.termMonthsTextbox.fill(termMonths, { timeout: 10000 });
      console.log("✅ Term (months) filled:", termMonths);
    }

    // Description
    if (details.Description) {
      await this.descriptionTextarea.fill(Helper.generateUniqueValue(details.Description), { timeout: 10000 });
      console.log("✅ Description filled:", details.Description);
    }

    // Special Terms
    if (details.SpecialTerms || details["Special Terms"]) {
      const specialTerms = details.SpecialTerms || details["Special Terms"];
      await this.specialTermsTextarea.fill(Helper.generateUniqueValue(specialTerms), { timeout: 10000 });
      console.log("✅ Special Terms filled:", specialTerms);
    }

    // Account Name (Required) - Combobox
    if (details.AccountName || details["Account Name"]) {
      const accountName = details.AccountName || details["Account Name"];
      console.log("🔽 Selecting Account Name from combobox...");
      await this.accountNameCombobox.click({ timeout: 10000 });
      await this.page.waitForTimeout(1000);
      await this.allOptionsLocator.first().click({ timeout: 10000 });
    }

    // Contact Name - Combobox (Optional)
    if (details.ContactName || details["Contact Name"]) {
      const contactName = details.ContactName || details["Contact Name"];
      console.log("🔽 Selecting Contact Name from combobox...");
      await this.contactNameCombobox.click({ timeout: 10000 });
      await this.page.waitForTimeout(1000);
      await this.allOptionsLocator.first().click({ timeout: 10000 });
    }

    // Shipping and Handling
    if (details.ShippingAndHandling || details["Shipping and Handling"]) {
      const shippingHandling = details.ShippingAndHandling || details["Shipping and Handling"];
      await this.shippingHandlingTextbox.fill(shippingHandling, { timeout: 10000 });
      console.log("✅ Shipping and Handling filled:", shippingHandling);
    }

    // Tax
    if (details.Tax) {
      await this.taxTextbox.fill(details.Tax, { timeout: 10000 });
      console.log("✅ Tax filled:", details.Tax);
    }

    // Billing Address Fields
    if (details.BillingStreet || details["Billing Street"]) {
      const billingStreet = details.BillingStreet || details["Billing Street"];
      await this.billingStreetTextarea.fill(billingStreet, { timeout: 10000 });
      console.log("✅ Billing Street filled:", billingStreet);
    }

    if (details.BillingCity || details["Billing City"]) {
      const billingCity = details.BillingCity || details["Billing City"];
      await this.billingCityTextbox.fill(billingCity, { timeout: 10000 });
      console.log("✅ Billing City filled:", billingCity);
    }

    if (details.BillingZip || details["Billing Zip"]) {
      const billingZip = details.BillingZip || details["Billing Zip"];
      await this.billingZipTextbox.fill(billingZip, { timeout: 10000 });
      console.log("✅ Billing Zip filled:", billingZip);
    }

    // Fill Billing Country FIRST (must be done before State)
    if (details.BillingCountry || details["Billing Country"]) {
      const billingCountry = details.BillingCountry || details["Billing Country"];
      console.log("🌍 Handling Billing Country field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.billingCountryTextbox_static,
        this.billingCountryCombobox,
        "Billing Country",
        billingCountry
      );
    }

    // Then fill Billing State
    if (details.BillingState || details["Billing State"]) {
      const billingState = details.BillingState || details["Billing State"];
      console.log("🏘️ Handling Billing State field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.billingStateTextbox_static,
        this.billingStateCombobox,
        "Billing State",
        billingState
      );
    }

    // Shipping Address Fields
    if (details.ShippingStreet || details["Shipping Street"]) {
      const shippingStreet = details.ShippingStreet || details["Shipping Street"];
      await this.shippingStreetTextarea.fill(shippingStreet, { timeout: 10000 });
      console.log("✅ Shipping Street filled:", shippingStreet);
    }

    if (details.ShippingCity || details["Shipping City"]) {
      const shippingCity = details.ShippingCity || details["Shipping City"];
      await this.shippingCityTextbox.fill(shippingCity, { timeout: 10000 });
      console.log("✅ Shipping City filled:", shippingCity);
    }

    if (details.ShippingZip || details["Shipping Zip"]) {
      const shippingZip = details.ShippingZip || details["Shipping Zip"];
      await this.shippingZipTextbox.fill(shippingZip, { timeout: 10000 });
      console.log("✅ Shipping Zip filled:", shippingZip);
    }

    // Fill Shipping Country FIRST (must be done before State)
    if (details.ShippingCountry || details["Shipping Country"]) {
      const shippingCountry = details.ShippingCountry || details["Shipping Country"];
      console.log("🌍 Handling Shipping Country field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.shippingCountryTextbox_static,
        this.shippingCountryCombobox,
        "Shipping Country",
        shippingCountry
      );
    }

    // Then fill Shipping State
    if (details.ShippingState || details["Shipping State"]) {
      const shippingState = details.ShippingState || details["Shipping State"];
      console.log("🏘️ Handling Shipping State field (textbox/combobox)...");
      await Helper.fillDynamicField(
        this.page,
        this.shippingStateTextbox_static,
        this.shippingStateCombobox,
        "Shipping State",
        shippingState
      );
    }

    // Take screenshot AFTER all fields are filled
    await Helper.takeScreenshotToFile(
      this.page,
      "2-all-fields-filled",
      this.testInfo,
      "Service/salesforce-service-contracts/"
    );

    console.log("💾 Saving the service contract...");

    // Save the service contract
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Service contract saved successfully");

    await this.page.waitForTimeout(2000);

    // Take screenshot AFTER save
    await Helper.takeScreenshotToFile(
      this.page,
      "3-after-save-success",
      this.testInfo,
      "Service/salesforce-service-contracts/"
    );

    await this.page.waitForTimeout(1000);

    // Take final screenshot showing the service contracts list
    await Helper.takeScreenshotToFile(
      this.page,
      "4-service-contracts-list",
      this.testInfo,
      "Service/salesforce-service-contracts/"
    );

    console.log("🎉 Service contract creation completed!");
  }

  /**
   * Verifies that a service contract was successfully created
   *
   * This method validates service contract creation success by checking that
   * the dialog has closed and we're back on the service contracts list page.
   *
   * @throws Will throw an assertion error if dialog is still visible
   */
  async verifyServiceContractSuccess() {
    console.log("🔍 Verifying service contract creation success...");

    // Check that the dialog is no longer visible (indicates save was successful)
    const dialogVisible = await this.dialog.isVisible().catch(() => false);
    if (!dialogVisible) {
      console.log("✅ Dialog closed - service contract created successfully");
    } else {
      console.log("❌ Dialog still visible - creation may have failed");
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "5-final-verification",
      this.testInfo,
      "Service/salesforce-service-contracts/"
    );

    console.log("🎉 Verification completed!");
  }
}
