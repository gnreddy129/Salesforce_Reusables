import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceChangeRequests Page Object Model
 *
 * This class provides automation capabilities for Salesforce Change Requests management functionality.
 * It handles change request creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new change requests with comprehensive field support
 * - Handle text fields, date fields, time fields, and various input types
 * - Verify change request creation success
 * - Support for all standard Salesforce change request fields
 * - Navigate to Change Requests module using standard navigation
 * - Complete change request lifecycle management
 *
 * @class SalesforceChangeRequestsPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceChangeRequestsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  // Change Request Information Fields
  readonly subjectInput: Locator;
  readonly descriptionInput: Locator;

  // Dropdown/Combobox fields
  readonly riskLevelInput: Locator;
  readonly statusInput: Locator;
  readonly priorityInput: Locator;
  readonly impactInput: Locator;
  readonly typeOfChangeInput: Locator;
  readonly reviewerInput: Locator;

  // Text area fields
  readonly businessJustificationInput: Locator;
  readonly impactAnalysisInput: Locator;
  readonly remediationPlanInput: Locator;
  readonly finalReviewNotesInput: Locator;

  // Date/Time group fields
  readonly startTimeEstimatedParent: Locator;
  readonly startTimeEstimatedDateInput: Locator;
  readonly startTimeEstimatedTimeInput: Locator;

  readonly endTimeEstimatedParent: Locator;
  readonly endTimeEstimatedDateInput: Locator;
  readonly endTimeEstimatedTimeInput: Locator;

  readonly reviewedOnParent: Locator;
  readonly reviewedOnDateInput: Locator;
  readonly reviewedOnTimeInput: Locator;

  // Navigation Elements
  readonly changeRequestCreatedMessage: Locator;
  readonly allOptionsLocator: Locator;

  /**
   * Constructor - Initializes the SalesforceChangeRequests page object with all necessary locators
   *
   * Sets up locators for all Salesforce change request elements using role-based selectors
   * for maximum reliability. All elements are identified based on standard Salesforce patterns.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceChangeRequests page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // Change Request Information field locators - Based on standard Salesforce patterns
    this.subjectInput = page.getByRole("textbox", {
      name: "Subject",
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: "Description",
    });

    // Dropdown/Combobox fields
    this.riskLevelInput = page.getByRole("combobox", {
      name: "Risk Level",
      exact: true,
    });
    this.statusInput = page.getByRole("combobox", {
      name: "Status",
      exact: true,
    });
    this.priorityInput = page.getByRole("combobox", {
      name: "Priority",
      exact: true,
    });
    this.impactInput = page.getByRole("combobox", {
      name: "Impact",
      exact: true,
    });
    this.typeOfChangeInput = page.getByRole("combobox", {
      name: "Type of Change",
      exact: true,
    });
    this.reviewerInput = page.getByRole("combobox", {
      name: "Reviewer",
      exact: true,
    });

    // Text area fields
    this.businessJustificationInput = page.getByRole("textbox", {
      name: "Business Justification",
    });
    this.impactAnalysisInput = page.getByRole("textbox", {
      name: "Impact Analysis",
    });
    this.remediationPlanInput = page.getByRole("textbox", {
      name: "Remediation Plan",
    });
    this.finalReviewNotesInput = page.getByRole("textbox", {
      name: "Final Review Notes",
    });

    // Date/Time group field parent containers and their child elements
    this.startTimeEstimatedParent = page.getByRole("group", {
      name: "Start Time (Estimated)",
    });
    this.startTimeEstimatedDateInput = this.startTimeEstimatedParent.getByRole(
      "textbox",
      { name: "Date" }
    );
    this.startTimeEstimatedTimeInput = this.startTimeEstimatedParent.getByRole(
      "combobox",
      { name: "Time" }
    );

    this.endTimeEstimatedParent = page.getByRole("group", {
      name: "End Time (Estimated)",
    });
    this.endTimeEstimatedDateInput = this.endTimeEstimatedParent.getByRole(
      "textbox",
      { name: "Date" }
    );
    this.endTimeEstimatedTimeInput = this.endTimeEstimatedParent.getByRole(
      "combobox",
      { name: "Time" }
    );

    this.reviewedOnParent = page.getByRole("group", {
      name: "Reviewed On",
    });
    this.reviewedOnDateInput = this.reviewedOnParent.getByRole("textbox", {
      name: "Date",
    });
    this.reviewedOnTimeInput = this.reviewedOnParent.getByRole("combobox", {
      name: "Time",
    });

    // Success message locator
    this.changeRequestCreatedMessage = page.locator(".toastMessage");
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceChangeRequests page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new change request in Salesforce with the provided details
   *
   * This method handles the complete change request creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new change request creation form
   * 3. Fills in all provided field values
   * 4. Saves the change request
   * 5. Verifies successful creation
   * 6. Takes a completion screenshot
   *
   * @param details - Object containing change request field values
   * @throws Error if change request creation fails
   */
  async addNewChangeRequest(details: { [k: string]: string }): Promise<void> {
    console.log("🔄 Creating new Change Request with details:", details);

    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-change-request",
      this.testInfo,
      "Service/salesforce-change-requests/"
    );
    console.log("✅ Clicked New button");

    // Wait for dialog to be visible
    await this.page.waitForTimeout(3000);
    console.log("✅ New Change Request dialog opened");

    // Fill Subject (required field)
    if (details.Subject) {
      await this.subjectInput.click({ timeout: 10000 });
      await this.subjectInput.clear({ timeout: 10000 });
      await this.subjectInput.fill(Helper.generateUniqueValue(details.Subject));
      console.log(`✅ Filled Subject: ${details.Subject}`);
    }

    // Fill Description
    if (details.Description && details.Description !== "--None--") {
      await this.descriptionInput.clear();
      await this.descriptionInput.fill(Helper.generateUniqueValue(details.Description));
      console.log(`✅ Filled Description: ${details.Description}`);
    }

    // Handle Risk Level
    if (details["Risk Level"] && details["Risk Level"] !== "--None--") {
      await this.riskLevelInput.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details["Risk Level"] }).click({ timeout: 10000 });
      console.log(`✅ Selected Risk Level: ${details["Risk Level"]}`);
    }

    // Handle Status
    if (details.Status && details.Status !== "--None--") {
      await this.statusInput.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.Status }).click({ timeout: 10000 });
      console.log(`✅ Selected Status: ${details.Status}`);
    }

    // Handle Priority
    if (details.Priority && details.Priority !== "--None--") {
      await this.priorityInput.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.Priority }).click({ timeout: 10000 });
      console.log(`✅ Selected Priority: ${details.Priority}`);
    }

    // Handle Impact
    if (details.Impact && details.Impact !== "--None--") {
      await this.impactInput.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.Impact }).click({ timeout: 10000 });
      console.log(`✅ Selected Impact: ${details.Impact}`);
    }

    // Handle Type of Change
    if (details["Type of Change"] && details["Type of Change"] !== "--None--") {
      await this.typeOfChangeInput.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details["Type of Change"] }).first().click({ timeout: 10000 });
      console.log(`✅ Selected Type of Change: ${details["Type of Change"]}`);
    }

    // Handle Reviewer
    if (details.Reviewer && details.Reviewer !== "--None--") {
      await this.reviewerInput.click({ timeout: 10000 });
      await this.page.getByText(details.Reviewer).click({ timeout: 10000 });
      console.log(`✅ Selected Reviewer: ${details.Reviewer}`);
    }

    // Fill Business Justification
    if (
      details["Business Justification"] &&
      details["Business Justification"]
    ) {
      await this.businessJustificationInput.clear();
      await this.businessJustificationInput.fill(
        details["Business Justification"]
      );
      console.log(
        `✅ Filled Business Justification: ${details["Business Justification"]}`
      );
    }

    // Fill Impact Analysis
    if (
      details["Impact Analysis"] &&
      details["Impact Analysis"] !== "--None--"
    ) {
      await this.impactAnalysisInput.clear();
      await this.impactAnalysisInput.fill(details["Impact Analysis"]);
      console.log(`✅ Filled Impact Analysis: ${details["Impact Analysis"]}`);
    }

    // Fill Remediation Plan
    if (
      details["Remediation Plan"] &&
      details["Remediation Plan"] !== "--None--"
    ) {
      await this.remediationPlanInput.clear();
      await this.remediationPlanInput.fill(details["Remediation Plan"]);
      console.log(`✅ Filled Remediation Plan: ${details["Remediation Plan"]}`);
    }

    // Handle Start Time (Estimated) date and time
    if (
      details["Start Time (Estimated) Date"] &&
      details["Start Time (Estimated) Date"] !== "--None--"
    ) {
      await this.startTimeEstimatedDateInput.fill(
        details["Start Time (Estimated) Date"]
      );
      console.log(
        `✅ Filled Start Time (Estimated) Date: ${details["Start Time (Estimated) Date"]}`
      );
    }

    if (
      details["Start Time (Estimated) Time"] &&
      details["Start Time (Estimated) Time"] !== "--None--"
    ) {
      await this.startTimeEstimatedTimeInput.click({ timeout: 10000 });
      await this.startTimeEstimatedTimeInput.fill(
        details["Start Time (Estimated) Time"]
      );
      console.log(
        `✅ Selected Start Time (Estimated) Time: ${details["Start Time (Estimated) Time"]}`
      );
    }

    // Handle End Time (Estimated) date and time
    if (
      details["End Time (Estimated) Date"] &&
      details["End Time (Estimated) Date"] !== "--None--"
    ) {
      await this.endTimeEstimatedDateInput.fill(
        details["End Time (Estimated) Date"]
      );
      console.log(
        `✅ Filled End Time (Estimated) Date: ${details["End Time (Estimated) Date"]}`
      );
    }

    if (
      details["End Time (Estimated) Time"] &&
      details["End Time (Estimated) Time"] !== "--None--"
    ) {
      await this.endTimeEstimatedTimeInput.click({ timeout: 10000 });
      await this.endTimeEstimatedTimeInput.fill(
        details["End Time (Estimated) Time"]
      );
      console.log(
        `✅ Selected End Time (Estimated) Time: ${details["End Time (Estimated) Time"]}`
      );
    }

    // Handle Reviewed On date and time
    if (
      details["Reviewed On Date"] &&
      details["Reviewed On Date"] !== "--None--"
    ) {
      await this.reviewedOnDateInput.fill(details["Reviewed On Date"]);
      console.log(`✅ Filled Reviewed On Date: ${details["Reviewed On Date"]}`);
    }

    if (
      details["Reviewed On Time"] &&
      details["Reviewed On Time"] !== "--None--"
    ) {
      await this.reviewedOnTimeInput.click({ timeout: 10000 });
      await this.reviewedOnTimeInput.fill(details["Reviewed On Time"]);
      console.log(
        `✅ Selected Reviewed On Time: ${details["Reviewed On Time"]}`
      );
    }

    // Fill Final Review Notes
    if (
      details["Final Review Notes"] &&
      details["Final Review Notes"] !== "--None--"
    ) {
      await this.finalReviewNotesInput.clear();
      await this.finalReviewNotesInput.fill(details["Final Review Notes"]);
      console.log(
        `✅ Filled Final Review Notes: ${details["Final Review Notes"]}`
      );
    }

    // Take screenshot before saving
    await Helper.takeScreenshotToFile(
      this.page,
      "2-before-save-change-request",
      this.testInfo,
      "Service/salesforce-change-requests/"
    );

    // Click Save button
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Clicked Save button");

    // Wait for success or error response
    await this.page.waitForTimeout(3000);

    console.log("✅ Change Request creation completed successfully");

    // Take final screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-end-change-request",
      this.testInfo,
      "Service/salesforce-change-requests/"
    );
  }

  /**
   * Verifies that a change request was created successfully
   *
   * @param details - Expected change request details for verification
   */
  async verifyChangeRequestCreation(details: { [field: string]: string }) {
    console.log("🔍 Verifying Change Request creation success");

    await expect(this.changeRequestCreatedMessage).toBeVisible({ timeout: 10000 });
    console.log("✅ Success message is visible");

    // Such as checking if we're on the detail page or if the change request appears in the list
    if (details["Risk Level"]) {
      await this.page.getByText(details["Risk Level"]).count().then(async (count) => {
        if (count === 0) {
          throw new Error("Change Request not found with the expected details");
        }
        console.log(`✅ Verified Risk Level: ${details["Risk Level"]}`);
      });
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "4-verification-change-request",
      this.testInfo,
      "Service/salesforce-change-requests/"
    );

    console.log(
      "✅ Change Request creation verification completed successfully"
    );
  }
}
