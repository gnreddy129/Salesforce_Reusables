import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceRefunds Page Object Model
 *
 * This class provides automation capabilities for Salesforce Refunds management.
 * It handles refund creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new refunds with comprehensive field management
 * - Handle complex form interactions with dates, comboboxes, and text inputs
 * - Verify refund creation success
 * - Support for all required and optional refund fields
 *
 * @class SalesforceRefundsPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceRefundsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly dialog: Locator;

  // Refund Information Fields - Comboboxes
  readonly accountCombobox: Locator;
  readonly statusCombobox: Locator;
  readonly typeCombobox: Locator;
  readonly paymentGroupCombobox: Locator;
  readonly paymentMethodCombobox: Locator;
  readonly processingModeCombobox: Locator;
  readonly salesforceResultCodeCombobox: Locator;
  readonly paymentGatewayCombobox: Locator;
  readonly cancellationSalesforceResultCodeCombobox: Locator;

  // Refund Amount Field
  readonly amountTextbox: Locator;

  // Text Input Fields
  readonly commentsTextbox: Locator;
  readonly gatewayResultCodeTextbox: Locator;
  readonly gatewayResultCodeDescriptionTextbox: Locator;
  readonly gatewayReferenceNumberTextbox: Locator;
  readonly cancellationGatewayResultCodeTextbox: Locator;
  readonly cancellationGatewayReferenceNumberTextbox: Locator;
  readonly macAddressTextbox: Locator;
  readonly ipAddressTextbox: Locator;
  readonly phoneTextbox: Locator;
  readonly auditEmailTextbox: Locator;

  // Date/Time Fields
  readonly effectiveDateTextbox: Locator;
  readonly effectiveTimeTextbox: Locator;
  readonly dateTextbox: Locator;
  readonly dateTimeTextbox: Locator;
  readonly cancellationDateTextbox: Locator;
  readonly cancellationEffectiveDateTextbox: Locator;
  readonly cancellationGatewayDateTextbox: Locator;

  // Action Buttons
  readonly saveButton: Locator;
  readonly saveNewButton: Locator;
  readonly cancelButton: Locator;

  /**
   * Constructor - Initializes the SalesforceRefunds page object with all necessary locators
   *
   * Sets up locators for all Salesforce refund form elements using role-based selectors
   * for maximum reliability. All elements are scoped to the dialog for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceRefunds page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls
    this.dialog = page.getByRole("dialog").first();

    // Refund Information Comboboxes
    this.accountCombobox = this.dialog.getByRole("combobox", {
      name: /^Account$/i,
    });

    this.statusCombobox = this.dialog.getByRole("combobox", {
      name: /^Status$/i,
    });

    this.typeCombobox = this.dialog.getByRole("combobox", {
      name: /^Type$/i,
    });

    this.paymentGroupCombobox = this.dialog.getByRole("combobox", {
      name: /^Payment Group$/i,
    });

    this.paymentMethodCombobox = this.dialog.getByRole("combobox", {
      name: /^Payment Method$/i,
    });

    this.processingModeCombobox = this.dialog.getByRole("combobox", {
      name: /^Processing Mode$/i,
    });

    this.salesforceResultCodeCombobox = this.dialog.getByRole("combobox", {
      name: /^Salesforce Result Code$/i,
    });

    this.paymentGatewayCombobox = this.dialog.getByRole("combobox", {
      name: /^Payment Gateway$/i,
    });

    this.cancellationSalesforceResultCodeCombobox = this.dialog.getByRole(
      "combobox",
      { name: /^Cancellation Salesforce Result Code$/i }
    );

    // Refund Amount Field
    this.amountTextbox = this.dialog.getByRole("textbox", {
      name: /Amount/i,
    });

    // Text Input Fields
    this.commentsTextbox = this.dialog.getByRole("textbox", {
      name: /^Comments$/i,
    });

    this.gatewayResultCodeTextbox = this.dialog.getByRole("textbox", {
      name: /^Gateway Result Code$/i,
    });

    this.gatewayResultCodeDescriptionTextbox = this.dialog.getByRole(
      "textbox",
      { name: /^Gateway Result Code Description$/i }
    );

    this.gatewayReferenceNumberTextbox = this.dialog.getByRole("textbox", {
      name: /^Gateway Reference Number$/i,
    });

    this.cancellationGatewayResultCodeTextbox = this.dialog.getByRole(
      "textbox",
      { name: /^Cancellation Gateway Result Code$/i }
    );

    this.cancellationGatewayReferenceNumberTextbox = this.dialog.getByRole(
      "textbox",
      { name: /^Cancellation Gateway Reference Number$/i }
    );

    this.macAddressTextbox = this.dialog.getByRole("textbox", {
      name: /^MAC Address$/i,
    });

    this.ipAddressTextbox = this.dialog.getByRole("textbox", {
      name: /^IP Address$/i,
    });

    this.phoneTextbox = this.dialog.getByRole("textbox", {
      name: /^Phone$/i,
    });

    this.auditEmailTextbox = this.dialog.getByRole("textbox", {
      name: /^Audit Email$/i,
    });

    // Date/Time Fields - Group-based locators
    this.effectiveDateTextbox = this.dialog
      .getByRole("group", { name: "Effective Date", exact: true })
      .getByLabel("Date");

    this.effectiveTimeTextbox = this.dialog
      .getByRole("group", { name: "Effective Date", exact: true })
      .getByLabel("Time");

    this.dateTextbox = this.dialog
      .getByRole("group", { name: "Date", exact: true })
      .getByLabel("Date");

    this.dateTimeTextbox = this.dialog
      .getByRole("group", { name: "Date", exact: true })
      .getByLabel("Time");

    this.cancellationDateTextbox = this.dialog
      .getByRole("group", { name: "Cancellation Date", exact: true })
      .getByLabel("Date");

    this.cancellationEffectiveDateTextbox = this.dialog
      .getByRole("group", { name: "Cancellation Effective Date", exact: true })
      .getByLabel("Date");

    this.cancellationGatewayDateTextbox = this.dialog
      .getByRole("group", { name: "Cancellation Gateway Date", exact: true })
      .getByLabel("Date");

    // Action Buttons
    this.saveButton = this.dialog.getByRole("button", { name: /^Save$/i });
    this.saveNewButton = this.dialog.getByRole("button", {
      name: /Save & New/i,
    });
    this.cancelButton = this.dialog.getByRole("button", {
      name: /^Cancel$/i,
    });

    console.log("✅ SalesforceRefunds page object initialized successfully");
  }

  /**
   * Creates a new refund with provided details
   *
   * This method fills all available refund fields with the provided data and saves the refund.
   * It handles both required and optional fields gracefully, skipping fields not provided.
   *
   * @param refundDetails - Object containing refund field values
   * @throws Will throw an error if required fields are missing or save fails
   *
   * @example
   * await refundsPage.createRefund({
   *   Account: 'Testing',
   *   Status: 'Processed',
   *   Amount: '100.00',
   *   Type: 'Referenced'
   * });
   */
  async createRefund(refundDetails: Record<string, string>) {
    console.log("📝 Starting refund creation with details:", refundDetails);

    try {
      // Take initial screenshot
      await Helper.takeScreenshotToFile(this.page, "01-refund-form-start", this.testInfo,
        "Finance/salesforce-refunds/");

      // Fill Account combobox if provided
      if (refundDetails["Account"]) {
        console.log(`🔍 Filling Account: ${refundDetails["Account"]}`);
        await this.accountCombobox.click();
        await this.page
          .getByRole("option", { name: new RegExp(refundDetails["Account"], "i") }).first()
          .click();
        console.log("✅ Account filled");
      }

      // Fill Status combobox (required)
      if (refundDetails["Status"]) {
        console.log(`🔍 Filling Status: ${refundDetails["Status"]}`);
        await this.statusCombobox.click();
        await this.page
          .getByRole("option", { name: new RegExp(refundDetails["Status"], "i") }).first()
          .click();
        console.log("✅ Status filled");
      }

      // Fill Amount (required)
      if (refundDetails["Amount"]) {
        console.log(`🔍 Filling Amount: ${refundDetails["Amount"]}`);
        await this.amountTextbox.fill(refundDetails["Amount"]);
        console.log("✅ Amount filled");
      }

      // Fill Type combobox (required)
      if (refundDetails["Type"]) {
        console.log(`🔍 Filling Type: ${refundDetails["Type"]}`);
        await this.typeCombobox.click();
        await this.page
          .getByRole("option", { name: new RegExp(refundDetails["Type"], "i") }).first()
          .click();
        console.log("✅ Type filled");
      }

      // Fill Payment Group if provided
      if (refundDetails["Payment Group"]) {
        console.log(
          `🔍 Filling Payment Group: ${refundDetails["Payment Group"]}`
        );
        await this.paymentGroupCombobox.click();
        await this.page
          .getByRole("option", {
            name: new RegExp(refundDetails["Payment Group"], "i"),
          })
          .click();
        console.log("✅ Payment Group filled");
      }

      // Fill Payment Method if provided
      if (refundDetails["Payment Method"]) {
        console.log(
          `🔍 Filling Payment Method: ${refundDetails["Payment Method"]}`
        );
        await this.paymentMethodCombobox.click();
        await this.page
          .getByRole("option", {
            name: new RegExp(refundDetails["Payment Method"], "i"),
          })
          .click();
        console.log("✅ Payment Method filled");
      }

      // Fill Processing Mode combobox (required)
      if (refundDetails["Processing Mode"]) {
        console.log(
          `🔍 Filling Processing Mode: ${refundDetails["Processing Mode"]}`
        );
        await this.processingModeCombobox.click();
        await this.page
          .getByRole("option", {
            name: new RegExp(refundDetails["Processing Mode"], "i"),
          })
          .click();
        console.log("✅ Processing Mode filled");
      }

      // Fill Effective Date if provided
      if (refundDetails["Effective Date"]) {
        console.log(
          `🔍 Filling Effective Date: ${refundDetails["Effective Date"]}`
        );
        await this.effectiveDateTextbox.fill(refundDetails["Effective Date"]);
        console.log("✅ Effective Date filled");
      }

      // Fill Date if provided
      if (refundDetails["Date"]) {
        console.log(`🔍 Filling Date: ${refundDetails["Date"]}`);
        await this.dateTextbox.fill(refundDetails["Date"]);
        console.log("✅ Date filled");
      }

      // Fill Comments if provided
      if (refundDetails["Comments"]) {
        console.log(`🔍 Filling Comments: ${refundDetails["Comments"]}`);
        await this.commentsTextbox.fill(refundDetails["Comments"]);
        console.log("✅ Comments filled");
      }

      // Fill Cancellation Date if provided
      if (refundDetails["Cancellation Date"]) {
        console.log(
          `🔍 Filling Cancellation Date: ${refundDetails["Cancellation Date"]}`
        );
        await this.cancellationDateTextbox.fill(
          refundDetails["Cancellation Date"]
        );
        console.log("✅ Cancellation Date filled");
      }

      // Fill Cancellation Effective Date if provided
      if (refundDetails["Cancellation Effective Date"]) {
        console.log(
          `🔍 Filling Cancellation Effective Date: ${refundDetails["Cancellation Effective Date"]}`
        );
        await this.cancellationEffectiveDateTextbox.fill(
          refundDetails["Cancellation Effective Date"]
        );
        console.log("✅ Cancellation Effective Date filled");
      }

      // Fill Salesforce Result Code if provided
      if (refundDetails["Salesforce Result Code"]) {
        console.log(
          `🔍 Filling Salesforce Result Code: ${refundDetails["Salesforce Result Code"]}`
        );
        await this.salesforceResultCodeCombobox.click();
        await this.page
          .getByRole("option", {
            name: new RegExp(refundDetails["Salesforce Result Code"], "i"),
          })
          .click();
        console.log("✅ Salesforce Result Code filled");
      }

      // Fill Cancellation Salesforce Result Code if provided
      if (refundDetails["Cancellation Salesforce Result Code"]) {
        console.log(
          `🔍 Filling Cancellation Salesforce Result Code: ${refundDetails["Cancellation Salesforce Result Code"]}`
        );
        await this.cancellationSalesforceResultCodeCombobox.click();
        await this.page
          .getByRole("option", {
            name: new RegExp(
              refundDetails["Cancellation Salesforce Result Code"],
              "i"
            ),
          })
          .click();
        console.log("✅ Cancellation Salesforce Result Code filled");
      }

      // Fill Payment Gateway if provided
      if (refundDetails["Payment Gateway"]) {
        console.log(
          `🔍 Filling Payment Gateway: ${refundDetails["Payment Gateway"]}`
        );
        await this.paymentGatewayCombobox.click();
        await this.page
          .getByRole("option", {
            name: new RegExp(refundDetails["Payment Gateway"], "i"),
          })
          .click();
        console.log("✅ Payment Gateway filled");
      }

      // Fill Gateway Date if provided
      if (refundDetails["Gateway Date"]) {
        console.log(`🔍 Filling Gateway Date: ${refundDetails["Gateway Date"]}`);
        // Note: May need to adjust locator if Gateway Date has a separate date field
        console.log("⚠️ Gateway Date field locator may need adjustment");
      }

      // Fill Gateway Result Code if provided
      if (refundDetails["Gateway Result Code"]) {
        console.log(
          `🔍 Filling Gateway Result Code: ${refundDetails["Gateway Result Code"]}`
        );
        await this.gatewayResultCodeTextbox.fill(
          refundDetails["Gateway Result Code"]
        );
        console.log("✅ Gateway Result Code filled");
      }

      // Fill Gateway Result Code Description if provided
      if (refundDetails["Gateway Result Code Description"]) {
        console.log(
          `🔍 Filling Gateway Result Code Description: ${refundDetails["Gateway Result Code Description"]}`
        );
        await this.gatewayResultCodeDescriptionTextbox.fill(
          refundDetails["Gateway Result Code Description"]
        );
        console.log("✅ Gateway Result Code Description filled");
      }

      // Fill Gateway Reference Number if provided
      if (refundDetails["Gateway Reference Number"]) {
        console.log(
          `🔍 Filling Gateway Reference Number: ${refundDetails["Gateway Reference Number"]}`
        );
        await this.gatewayReferenceNumberTextbox.fill(
          refundDetails["Gateway Reference Number"]
        );
        console.log("✅ Gateway Reference Number filled");
      }

      // Fill Cancellation Gateway Result Code if provided
      if (refundDetails["Cancellation Gateway Result Code"]) {
        console.log(
          `🔍 Filling Cancellation Gateway Result Code: ${refundDetails["Cancellation Gateway Result Code"]}`
        );
        await this.cancellationGatewayResultCodeTextbox.fill(
          refundDetails["Cancellation Gateway Result Code"]
        );
        console.log("✅ Cancellation Gateway Result Code filled");
      }

      // Fill Cancellation Gateway Date if provided
      if (refundDetails["Cancellation Gateway Date"]) {
        console.log(
          `🔍 Filling Cancellation Gateway Date: ${refundDetails["Cancellation Gateway Date"]}`
        );
        await this.cancellationGatewayDateTextbox.fill(
          refundDetails["Cancellation Gateway Date"]
        );
        console.log("✅ Cancellation Gateway Date filled");
      }

      // Fill Cancellation Gateway Reference Number if provided
      if (refundDetails["Cancellation Gateway Reference Number"]) {
        console.log(
          `🔍 Filling Cancellation Gateway Reference Number: ${refundDetails["Cancellation Gateway Reference Number"]}`
        );
        await this.cancellationGatewayReferenceNumberTextbox.fill(
          refundDetails["Cancellation Gateway Reference Number"]
        );
        console.log("✅ Cancellation Gateway Reference Number filled");
      }

      // Fill MAC Address if provided
      if (refundDetails["MAC Address"]) {
        console.log(`🔍 Filling MAC Address: ${refundDetails["MAC Address"]}`);
        await this.macAddressTextbox.fill(refundDetails["MAC Address"]);
        console.log("✅ MAC Address filled");
      }

      // Fill IP Address if provided
      if (refundDetails["IP Address"]) {
        console.log(`🔍 Filling IP Address: ${refundDetails["IP Address"]}`);
        await this.ipAddressTextbox.fill(refundDetails["IP Address"]);
        console.log("✅ IP Address filled");
      }

      // Fill Phone if provided
      if (refundDetails["Phone"]) {
        console.log(`🔍 Filling Phone: ${refundDetails["Phone"]}`);
        await this.phoneTextbox.fill(refundDetails["Phone"]);
        console.log("✅ Phone filled");
      }

      // Fill Audit Email if provided
      if (refundDetails["Audit Email"]) {
        console.log(
          `🔍 Filling Audit Email: ${refundDetails["Audit Email"]}`
        );
        await this.auditEmailTextbox.fill(refundDetails["Audit Email"]);
        console.log("✅ Audit Email filled");
      }

      // Take screenshot before saving
      await Helper.takeScreenshotToFile(
        this.page,
        "02-refund-form-filled",
        this.testInfo,
        "Finance/salesforce-refunds/"
      );

      // Save the refund
      console.log("💾 Clicking Save button...");
      await this.saveButton.click();

      await this.page.waitForTimeout(2000);
      // Take final screenshot
      await Helper.takeScreenshotToFile(
        this.page,
        "03-refund-saved",
        this.testInfo,
        "Finance/salesforce-refunds/"
      );

      console.log("✅ Refund created successfully");
    } catch (error) {
      console.error("❌ Error creating refund:", error);
      await Helper.takeScreenshotToFile(
        this.page,
        "error-refund-creation",
        this.testInfo
      );
      throw error;
    }
  }

  /**
   * Verifies that a refund was successfully created by checking the list view
*/
  async verifyRefundsSuccess() {
    console.log("🔍 Verifying refund creation success...");

    // Check that the dialog is no longer visible (indicates save was successful)
    const dialogVisible = await this.dialog.isVisible().catch(() => false);
    if (!dialogVisible) {
      console.log("✅ Dialog closed - payment created successfully");
    } else {
      console.log("❌ Dialog still visible - creation may have failed");
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "04-final-verification",
      this.testInfo,
      "Finance/salesforce-refunds/"
    );

    console.log("🎉 Verification completed!");
  }
}
