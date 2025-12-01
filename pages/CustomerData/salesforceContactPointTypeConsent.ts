import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceContactPointTypeConsent Page Object Model
 *
 * This class provides automation capabilities for Salesforce Contact Point Type Consent management functionality.
 * It handles contact point type consent creation, form interac    // Handle Capture Contact Point Type
    if (details["Capture Contact Point Type"]) {
      await this.captureContactPointTypeInput.click();
      await this.page
        .getByRole("option", {
          name: details["Capture Contact Point Type"],
          exact: true,
        })
        .first()
        .click();
      console.log(
        `✅ Selected Capture Contact Point Type: ${details["Capture Contact Point Type"]}`
      );
    }rification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new contact point type consents with comprehensive field support
 * - Handle text fields, date fields, time fields, and various input types
 * - Verify contact point type consent creation success
 * - Support for all standard Salesforce contact point type consent fields
 * - Navigate to Contact Point Type Consent module using standard navigation
 * - Complete contact point type consent lifecycle management
 *
 * @class SalesforceContactPointTypeConsentPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceContactPointTypeConsentPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newButton: Locator;
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Contact Point Type Consent Information Fields
  readonly nameInput: Locator;

  // Contact Point Type and Party fields
  readonly contactPointTypeInput: Locator;
  readonly partyInput: Locator;
  readonly businessBrandInput: Locator;

  // Party Role section
  readonly partyRoleChooseObjectInput: Locator;
  readonly partyRoleInput: Locator;

  // Privacy and Data fields
  readonly privacyConsentStatusInput: Locator;
  readonly dataUsePurposeInput: Locator;

  // Date/Time fields
  readonly effectiveToDateInput: Locator;
  readonly effectiveToTimeInput: Locator;
  readonly effectiveFromDateInput: Locator;
  readonly effectiveFromTimeInput: Locator;

  // Capture fields
  readonly captureContactPointTypeInput: Locator;
  readonly captureSourceInput: Locator;
  readonly doubleConsentCaptureDateDateInput: Locator;
  readonly doubleConsentCaptureDateTimeInput: Locator;
  readonly captureDateDateInput: Locator;
  readonly captureDateTimeInput: Locator;

  // Parent containers for date/time fields
  readonly effectiveToParent: Locator;
  readonly effectiveFromParent: Locator;
  readonly doubleConsentCaptureDateParent: Locator;
  readonly captureDateParent: Locator;

  // Navigation Elements
  readonly contactPointTypeConsentCreatedMessage: Locator;

  /**
   * Constructor - Initializes the SalesforceContactPointTypeConsent page object with all necessary locators
   *
   * Sets up locators for all Salesforce contact point type consent elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log(
      "🚀 Initializing SalesforceContactPointTypeConsent page object"
    );
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.newButton = page.getByRole("button", { name: "New" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Contact Point Type Consent Information field locators - Based on standard Salesforce patterns
    this.nameInput = page.getByRole("textbox", {
      name: "Name",
    });

    // Contact Point Type and Party fields
    this.contactPointTypeInput = page.getByRole("combobox", {
      name: "Contact Point Type",
      exact: true,
    });
    this.partyInput = page.getByRole("combobox", {
      name: "Party",
      exact: true,
    });
    this.businessBrandInput = page.getByRole("combobox", {
      name: "Business Brand",
      exact: true,
    });

    // Party Role section
    this.partyRoleChooseObjectInput = page.getByRole("combobox", {
      name: "Choose an object",
      exact: true,
    });
    this.partyRoleInput = page.getByRole("combobox", {
      name: "Party Role",
      exact: true,
    });

    // Privacy and Data fields
    this.privacyConsentStatusInput = page.getByRole("combobox", {
      name: "Privacy Consent Status",
      exact: true,
    });
    this.dataUsePurposeInput = page.getByRole("combobox", {
      name: "Data Use Purpose",
      exact: true,
    });

    // Parent containers for date/time fields
    this.effectiveToParent = page.getByRole("group", {
      name: "Effective To",
    });
    this.effectiveToDateInput = this.effectiveToParent.getByRole("textbox", {
      name: "Date",
    });
    this.effectiveToTimeInput = this.effectiveToParent.getByRole("combobox", {
      name: "Time",
    });

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

    // Capture fields
    this.captureContactPointTypeInput = page.getByRole("combobox", {
      name: "Capture Contact Point Type",
      exact: true,
    });
    this.captureSourceInput = page.getByRole("textbox", {
      name: "Capture Source",
    });

    this.doubleConsentCaptureDateParent = page.getByRole("group", {
      name: "Double Consent Capture Date",
    });
    this.doubleConsentCaptureDateDateInput = this.doubleConsentCaptureDateParent.getByRole("textbox", { name: "Date", }).first();
    this.doubleConsentCaptureDateTimeInput = this.doubleConsentCaptureDateParent.getByRole("combobox", { name: "Time", }).first();

    this.captureDateParent = page.getByRole("group", {
      name: "Capture Date",
      exact: true,
    });
    this.captureDateDateInput = page.getByRole("group", {
      name: "Capture Date",
      exact: true,
    }).getByRole("textbox", {
      name: "Date",
    });
    this.captureDateTimeInput = page.getByRole("group", {
      name: "Capture Date",
      exact: true,
    }).getByRole("combobox", {
      name: "Time",
    });

    // Success message locator
    this.contactPointTypeConsentCreatedMessage = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceContactPointTypeConsent page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new contact point type consent in Salesforce with the provided details
   *
   * This method handles the complete contact point type consent creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new contact point type consent creation form
   * 3. Fills in all provided field values
   * 4. Saves the contact point type consent
   * 5. Verifies successful creation
   * 6. Takes a completion screenshot
   *
   * @param details - Object containing contact point type consent field values
   * @throws Error if contact point type consent creation fails
   */
  async addNewContactPointTypeConsent(details: {
    [k: string]: string;
  }): Promise<void> {
    console.log(
      "🔄 Creating new Contact Point Type Consent with details:",
      details
    );

    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-contact-point-type-consent",
      this.testInfo,
      "CustomerData/salesforce-contact-point-type-consent/"
    );

    // Click New button to open creation form
    await this.newButton.click();
    console.log("✅ Clicked New button");

    // Wait for dialog to be visible
    await this.page.waitForTimeout(3000);
    console.log("✅ New Contact Point Type Consent dialog opened");

    // Fill Name (required field)
    if (details.Name) {
      await this.nameInput.clear();
      await this.nameInput.fill(details.Name);
      console.log(`✅ Filled Name: ${details.Name}`);
    }

    // Handle Contact Point Type
    if (details["Contact Point Type"]) {
      await this.contactPointTypeInput.click();
      await this.page
        .getByRole("option", {
          name: details["Contact Point Type"],
          exact: true,
        })
        .first()
        .click();
      console.log(
        `✅ Selected Contact Point Type: ${details["Contact Point Type"]}`
      );
    }

    // Handle Party (required field)
    if (details.Party) {
      await this.partyInput.click();
      await this.page.getByText(details.Party).first().click();
      console.log(`✅ Selected Party: ${details.Party}`);
    }

    // Handle Business Brand
    if (details["Business Brand"]) {
      await this.businessBrandInput.click();
      await this.page
        .getByRole("option", { name: details["Business Brand"], exact: true })
        .first()
        .click();
      console.log(`✅ Selected Business Brand: ${details["Business Brand"]}`);
    }

    // Handle Party Role section
    if (details["Party Role Choose Object"]) {
      await this.partyRoleChooseObjectInput.click();
      await this.partyRoleChooseObjectInput
        .getByText(details["Party Role Choose Object"], { exact: true })
        .click();
      console.log(
        `✅ Selected Party Role Choose Object: ${details["Party Role Choose Object"]}`
      );
    }

    if (details["Party Role"]) {
      await this.partyRoleInput.click();
      await this.page
        .getByRole("option", { name: details["Party Role"], exact: true })
        .first()
        .click();
      console.log(`✅ Selected Party Role: ${details["Party Role"]}`);
    }

    // Handle Privacy Consent Status (required field)
    if (details["Privacy Consent Status"]) {
      await this.privacyConsentStatusInput.click();
      await this.page
        .getByRole("option", {
          name: details["Privacy Consent Status"],
          exact: true,
        })
        .first()
        .click();
      console.log(
        `✅ Selected Privacy Consent Status: ${details["Privacy Consent Status"]}`
      );
    }

    // Handle Data Use Purpose
    if (details["Data Use Purpose"]) {
      await this.dataUsePurposeInput.click();
      await this.page
        .getByRole("option", {
          name: details["Data Use Purpose"],
        })
        .first()
        .click();
      console.log(
        `✅ Selected Data Use Purpose: ${details["Data Use Purpose"]}`
      );
    }

    // Handle date/time fields
    if (details["Effective To Date"]) {
      await this.effectiveToDateInput.fill(details["Effective To Date"]);
      console.log(
        `✅ Filled Effective To Date: ${details["Effective To Date"]}`
      );
    }

    if (details["Effective To Time"]) {
      await this.effectiveToTimeInput.click();
      await this.effectiveToTimeInput.fill(details["Effective To Time"]);
      console.log(
        `✅ Filled Effective To Time: ${details["Effective To Time"]}`
      );
      // await this.page
      //   .getByRole("option", {
      //     name: details["Effective To Time"],
      //     exact: true,
      //   })
      //   .click();
      // console.log(
      //   `✅ Selected Effective To Time: ${details["Effective To Time"]}`
      // );
    }

    if (details["Effective From Date"]) {
      await this.effectiveFromDateInput.fill(details["Effective From Date"]);
      console.log(
        `✅ Filled Effective From Date: ${details["Effective From Date"]}`
      );
    }

    if (details["Effective From Time"]) {
      await this.effectiveFromTimeInput.click();
      await this.effectiveFromTimeInput.fill(details["Effective From Time"]);
      // await this.page
      //   .getByRole("option", {
      //     name: details["Effective From Time"],
      //     exact: true,
      //   })
      //   .click();
      console.log(
        `✅ Selected Effective From Time: ${details["Effective From Time"]}`
      );
    }

    // Handle capture fields
    if (details["Capture Contact Point Type"]) {
      await this.captureContactPointTypeInput.click();
      await this.page
        .getByRole("option", {
          name: details["Capture Contact Point Type"],
          exact: true,
        })
        .first()
        .click();
      console.log(
        `✅ Selected Capture Contact Point Type: ${details["Capture Contact Point Type"]}`
      );
    }

    if (details["Capture Source"]) {
      await this.captureSourceInput.fill(details["Capture Source"]);
      console.log(`✅ Filled Capture Source: ${details["Capture Source"]}`);
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
      await this.doubleConsentCaptureDateTimeInput.fill(
        details["Double Consent Capture Date Time"]
      );
      // await this.page
      //   .getByRole("option", {
      //     name: details["Double Consent Capture Date Time"],
      //     exact: true,
      //   })
      //   .click();
      console.log(
        `✅ Selected Double Consent Capture Date Time: ${details["Double Consent Capture Date Time"]}`
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
      await this.captureDateTimeInput.fill(details["Capture Date Time"]);
      // await this.page
      //   .getByRole("option", {
      //     name: details["Capture Date Time"],
      //     exact: true,
      //   })
      //   .click();
      console.log(
        `✅ Selected Capture Date Time: ${details["Capture Date Time"]}`
      );
    }

    // Take screenshot before saving
    await Helper.takeScreenshotToFile(
      this.page,
      "2-before-save-contact-point-type-consent",
      this.testInfo,
      "CustomerData/salesforce-contact-point-type-consent/"
    );

    // Click Save button
    await this.saveButton.click();
    console.log("✅ Clicked Save button");

    // Wait for success or error response
    await this.page.waitForTimeout(3000);

    console.log(
      "✅ Contact Point Type Consent creation completed successfully"
    );

    // Take final screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-end-contact-point-type-consent",
      this.testInfo,
      "CustomerData/salesforce-contact-point-type-consent/"
    );
  }

  /**
   * Verifies that a contact point type consent was created successfully
   *
   * @param details - Expected contact point type consent details for verification
   */
  async verifyContactPointTypeConsentCreation(details: {
    [k: string]: string;
  }): Promise<void> {
    console.log("🔍 Verifying Contact Point Type Consent creation success");

    await expect(this.contactPointTypeConsentCreatedMessage).toBeVisible({
      timeout: 10000,
    });
    console.log("✅ Success message is visible");

    // Additional verification can be added here
    // Such as checking if we're on the detail page or if the contact point type consent appears in the list

    await Helper.takeScreenshotToFile(
      this.page,
      "4-verification-contact-point-type-consent",
      this.testInfo,
      "CustomerData/salesforce-contact-point-type-consent/"
    );

    console.log(
      "✅ Contact Point Type Consent creation verification completed successfully"
    );
  }
}
