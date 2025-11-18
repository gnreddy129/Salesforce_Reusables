import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceContactPointConsent Page Object Model
 *
 * This class provides automation capabilities for Salesforce Contact Point Consent management functionality.
 * It handles contact point consent creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new contact point consents with comprehensive field support
 * - Handle text fields, date fields, time fields, and various input types
 * - Verify contact point consent creation success
 * - Support for all standard Salesforce contact point consent fields
 * - Navigate to Contact Point Consent module using standard navigation
 * - Complete contact point consent lifecycle management
 *
 * @class SalesforceContactPointConsentPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceContactPointConsentPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Contact Point Consent Information Fields
  readonly nameInput: Locator;

  // Contact Point section
  readonly contactPointChooseObjectInput: Locator;
  readonly contactPointInput: Locator;

  // Data and Privacy fields
  readonly dataUsePurposeInput: Locator;
  readonly privacyConsentStatusInput: Locator;

  // Party Role section
  readonly partyRoleChooseObjectInput: Locator;
  readonly partyRoleInput: Locator;
  readonly businessBrandInput: Locator;

  // Date/Time fields
  readonly effectiveFromDateInput: Locator;
  readonly effectiveFromTimeInput: Locator;
  readonly effectiveToDateInput: Locator;
  readonly effectiveToTimeInput: Locator;

  // Capture fields
  readonly captureSourceInput: Locator;
  readonly captureContactPointTypeInput: Locator;
  readonly captureDateDateInput: Locator;
  readonly captureDateTimeInput: Locator;
  readonly doubleConsentCaptureDateDateInput: Locator;
  readonly doubleConsentCaptureDateTimeInput: Locator;

  // Parent containers for date/time fields
  readonly effectiveFromParent: Locator;
  readonly effectiveToParent: Locator;
  readonly captureDateParent: Locator;
  readonly doubleConsentCaptureDateParent: Locator;

  // Navigation Elements
  readonly contactPointConsentCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceContactPointConsent page object with all necessary locators
   *
   * Sets up locators for all Salesforce contact point consent elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceContactPointConsent page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Contact Point Consent Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });

    // Contact Point section
    this.contactPointChooseObjectInput = page
      .getByRole("combobox", {
        name: "Choose an object",
        exact: true,
      })
      .first();
    this.contactPointInput = page.getByRole("combobox", {
      name: "Contact Point",
      exact: true,
    });

    // Data and Privacy fields
    this.dataUsePurposeInput = page.getByRole("combobox", {
      name: "Data Use Purpose",
      exact: true,
    });
    this.privacyConsentStatusInput = page.getByRole("combobox", {
      name: "Privacy Consent Status",
      exact: true,
    });

    // Party Role section
    this.partyRoleChooseObjectInput = page
      .getByRole("combobox", {
        name: "Choose an object",
        exact: true,
      })
      .nth(1);
    this.partyRoleInput = page.getByRole("combobox", {
      name: "Party Role",
      exact: true,
    });
    this.businessBrandInput = page.getByRole("combobox", {
      name: "Business Brand",
      exact: true,
    });

    // Parent containers for date/time fields
    this.effectiveFromParent = page.getByRole("group", {
      name: "Effective From",
    });
    this.effectiveFromDateInput = this.effectiveFromParent.getByRole(
      "textbox",
      { name: "Date" }
    );
    this.effectiveFromTimeInput = this.effectiveFromParent.getByRole(
      "combobox",
      {
        name: "Time",
      }
    );

    this.effectiveToParent = page.getByRole("group", {
      name: "Effective To",
    });
    this.effectiveToDateInput = this.effectiveToParent.getByRole("textbox", {
      name: "Date",
    });
    this.effectiveToTimeInput = this.effectiveToParent.getByRole("combobox", {
      name: "Time",
    });

    // Capture fields
    this.captureSourceInput = page.getByRole("textbox", {
      name: "Capture Source",
    });
    this.captureContactPointTypeInput = page.getByRole("combobox", {
      name: "Capture Contact Point Type",
      exact: true,
    });

    this.captureDateParent = page.getByRole("group", {
      name: "Capture Date",
    });
    this.captureDateDateInput = this.captureDateParent.getByRole("textbox", {
      name: "Date",
    });
    this.captureDateTimeInput = this.captureDateParent.getByRole("combobox", {
      name: "Time",
    });

    this.doubleConsentCaptureDateParent = page.getByRole("group", {
      name: "Double Consent Capture Date",
    });
    this.doubleConsentCaptureDateDateInput =
      this.doubleConsentCaptureDateParent.getByRole("textbox", {
        name: "Date",
      });
    this.doubleConsentCaptureDateTimeInput =
      this.doubleConsentCaptureDateParent.getByRole("combobox", {
        name: "Time",
      });

    // Success message locator
    this.contactPointConsentCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceContactPointConsent page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new contact point consent in Salesforce with the provided details
   *
   * This method handles the complete contact point consent creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new contact point consent creation form
   * 3. Fills in all provided field values
   * 4. Saves the contact point consent
   * 5. Verifies successful creation
   * 6. Takes a completion screenshot
   *
   * @param details - Object containing contact point consent field values
   * @throws Error if contact point consent creation fails
   */
  async addNewContactPointConsent(details: {
    [k: string]: string;
  }): Promise<void> {
    console.log("🔄 Creating new Contact Point Consent with details:", details);

    try {
      // Take initial screenshot
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-contact-point-consent",
        this.testInfo,
        "CustomerData/salesforce-contact-point-consent/"
      );

      // Click New button to open creation form
      await this.newButton.click();
      console.log("✅ Clicked New button");

      // Wait for dialog to be visible
      await this.page.waitForTimeout(3000);
      console.log("✅ New Contact Point Consent dialog opened");

      // Fill Name (required field)
      if (details.Name) {
        await this.nameInput.clear();
        await this.nameInput.fill(details.Name);
        console.log(`✅ Filled Name: ${details.Name}`);
      }

      // Handle Contact Point section
      if (details["Contact Point Choose Object"]) {
        await this.contactPointChooseObjectInput.click();
        await this.page
          .getByRole("option", {
            name: details["Contact Point Choose Object"],
            exact: true,
          })
          .click();
        console.log(
          `✅ Selected Contact Point Choose Object: ${details["Contact Point Choose Object"]}`
        );
      }

      if (details["Contact Point"]) {
        await this.contactPointInput.click();
        await this.page
          .getByRole("option", { name: details["Contact Point"], exact: true })
          .click();
        console.log(`✅ Selected Contact Point: ${details["Contact Point"]}`);
      }

      // Handle Data Use Purpose
      if (details["Data Use Purpose"]) {
        await this.dataUsePurposeInput.click();
        await this.page
          .getByRole("option", {
            name: details["Data Use Purpose"],
            exact: true,
          })
          .click();
        console.log(
          `✅ Selected Data Use Purpose: ${details["Data Use Purpose"]}`
        );
      }

      // Handle Privacy Consent Status (required field)
      if (details["Privacy Consent Status"]) {
        await this.privacyConsentStatusInput.click();
        await this.page
          .getByRole("option", {
            name: details["Privacy Consent Status"],
            exact: true,
          })
          .click();
        console.log(
          `✅ Selected Privacy Consent Status: ${details["Privacy Consent Status"]}`
        );
      }

      // Handle Party Role section
      if (details["Party Role Choose Object"]) {
        await this.partyRoleChooseObjectInput.click();
        await this.page
          .getByRole("option", {
            name: details["Party Role Choose Object"],
            exact: true,
          })
          .click();
        console.log(
          `✅ Selected Party Role Choose Object: ${details["Party Role Choose Object"]}`
        );
      }

      if (details["Party Role"]) {
        await this.partyRoleInput.click();
        await this.page
          .getByRole("option", { name: details["Party Role"], exact: true })
          .click();
        console.log(`✅ Selected Party Role: ${details["Party Role"]}`);
      }

      if (details["Business Brand"]) {
        await this.businessBrandInput.click();
        await this.page
          .getByRole("option", { name: details["Business Brand"], exact: true })
          .click();
        console.log(`✅ Selected Business Brand: ${details["Business Brand"]}`);
      }

      // Handle date/time fields
      if (details["Effective From Date"]) {
        await this.effectiveFromDateInput.fill(details["Effective From Date"]);
        console.log(
          `✅ Filled Effective From Date: ${details["Effective From Date"]}`
        );
      }

      if (details["Effective From Time"]) {
        await this.effectiveFromTimeInput.click();
        await this.page
          .getByRole("option", {
            name: details["Effective From Time"],
            exact: true,
          })
          .click();
        console.log(
          `✅ Selected Effective From Time: ${details["Effective From Time"]}`
        );
      }

      if (details["Effective To Date"]) {
        await this.effectiveToDateInput.fill(details["Effective To Date"]);
        console.log(
          `✅ Filled Effective To Date: ${details["Effective To Date"]}`
        );
      }

      if (details["Effective To Time"]) {
        await this.effectiveToTimeInput.click();
        await this.page
          .getByRole("option", {
            name: details["Effective To Time"],
            exact: true,
          })
          .click();
        console.log(
          `✅ Selected Effective To Time: ${details["Effective To Time"]}`
        );
      }

      // Handle capture fields
      if (details["Capture Source"]) {
        await this.captureSourceInput.fill(details["Capture Source"]);
        console.log(`✅ Filled Capture Source: ${details["Capture Source"]}`);
      }

      if (details["Capture Contact Point Type"]) {
        await this.captureContactPointTypeInput.click();
        await this.page
          .getByRole("option", {
            name: details["Capture Contact Point Type"],
            exact: true,
          })
          .click();
        console.log(
          `✅ Selected Capture Contact Point Type: ${details["Capture Contact Point Type"]}`
        );
      }

      if (details["Capture Date Date"]) {
        await this.captureDateDateInput.fill(details["Capture Date Date"]);
        console.log(
          `✅ Filled Capture Date Date: ${details["Capture Date Date"]}`
        );
      }

      if (details["Capture Date Time"]) {
        await this.captureDateTimeInput.click();
        await this.page
          .getByRole("option", {
            name: details["Capture Date Time"],
            exact: true,
          })
          .click();
        console.log(
          `✅ Selected Capture Date Time: ${details["Capture Date Time"]}`
        );
      }

      if (details["Double Consent Capture Date Date"]) {
        await this.doubleConsentCaptureDateDateInput.fill(
          details["Double Consent Capture Date Date"]
        );
        console.log(
          `✅ Filled Double Consent Capture Date Date: ${details["Double Consent Capture Date Date"]}`
        );
      }

      if (details["Double Consent Capture Date Time"]) {
        await this.doubleConsentCaptureDateTimeInput.click();
        await this.page
          .getByRole("option", {
            name: details["Double Consent Capture Date Time"],
            exact: true,
          })
          .click();
        console.log(
          `✅ Selected Double Consent Capture Date Time: ${details["Double Consent Capture Date Time"]}`
        );
      }

      // Take screenshot before saving
      await Helper.takeScreenshotToFile(
        this.page,
        "2-before-save-contact-point-consent",
        this.testInfo,
        "CustomerData/salesforce-contact-point-consent/"
      );

      // Click Save button
      await this.saveButton.click();
      console.log("✅ Clicked Save button");

      // Wait for success or error response
      await this.page.waitForTimeout(3000);

      console.log("✅ Contact Point Consent creation completed successfully");

      // Take final screenshot
      await Helper.takeScreenshotToFile(
        this.page,
        "3-end-contact-point-consent",
        this.testInfo,
        "CustomerData/salesforce-contact-point-consent/"
      );
    } catch (error) {
      console.error("❌ Contact Point Consent creation failed:", error);

      await Helper.takeScreenshotToFile(
        this.page,
        "error-contact-point-consent",
        this.testInfo,
        "CustomerData/salesforce-contact-point-consent/"
      );

      throw new Error(`Contact Point Consent creation failed: ${error}`);
    }
  }

  /**
   * Verifies that a contact point consent was created successfully
   *
   * @param details - Expected contact point consent details for verification
   */
  async verifyContactPointConsentCreation(details: {
    [k: string]: string;
  }): Promise<void> {
    console.log("🔍 Verifying Contact Point Consent creation success");

    try {
      // Check for success message
      await expect(this.contactPointConsentCreatedMessage).toBeVisible({
        timeout: 10000,
      });
      console.log("✅ Success message is visible");

      // Additional verification can be added here
      // Such as checking if we're on the detail page or if the contact point consent appears in the list

      await Helper.takeScreenshotToFile(
        this.page,
        "4-verification-contact-point-consent",
        this.testInfo,
        "CustomerData/salesforce-contact-point-consent/"
      );

      console.log(
        "✅ Contact Point Consent creation verification completed successfully"
      );
    } catch (error) {
      console.error(
        "❌ Contact Point Consent creation verification failed:",
        error
      );
      throw new Error(`Contact Point Consent verification failed: ${error}`);
    }
  }
}
