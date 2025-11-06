import { expect, type Locator, type Page, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceTasks Page Object Model
 *
 * This class provides automation capabilities for Salesforce Task management functionality.
 * It handles task creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new tasks with various field types (text, dropdowns, dates, lookups)
 * - Handle complex form interactions with proper wait strategies
 * - Verify task creation success
 * - Support for all standard Salesforce task fields
 *
 * @class salesforceTasksLocators
 * @author Automation Team
 * @version 1.0
 */
export class SalesforceTasksPage {
  readonly page: Page;
  private testInfo?: TestInfo;
  // Primary Action Elements
  readonly newTaskButton: Locator;
  readonly saveButton: Locator;
  readonly commandDropdown: Locator;

  // Basic Task Information Fields
  readonly subject: Locator;
  readonly dueDate: Locator;
  readonly description: Locator;

  // Lookup Fields
  readonly assignedTo: Locator;
  readonly assignedToInput: Locator;
  readonly relatedTo: Locator;
  readonly relatedToInput: Locator;

  // Dropdown Fields
  readonly priority: Locator;
  readonly status: Locator;

  // Verification Elements
  readonly taskDetailHeader: Locator;

  /**
   * Constructor - Initializes the SalesforceTasks page object with all necessary locators
   *
   * Sets up locators for all Salesforce task form elements using role-based selectors
   * for maximum reliability. Uses Lightning UI specific locators.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceTasks page object");
    this.page = page;
    this.testInfo = testInfo;

    // Global Actions Menu for Tasks
    this.commandDropdown = page.getByRole("button", {
      name: "Show more actions",
    });
    this.newTaskButton = page.getByRole("menuitem", { name: "New Task" });

    // Primary action buttons
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });

    // Basic task information fields
    this.subject = page.getByRole("combobox", { name: "Subject" });
    this.dueDate = page.getByRole("textbox", { name: "Due Date" });
    this.description = page.getByRole("textbox", { name: "Comments" });

    // Lookup fields for task relationships
    this.assignedTo = page.getByRole("combobox", { name: "Assigned To" });
    this.assignedToInput = page.getByRole("searchbox", { name: "Assigned To" });
    this.relatedTo = page.getByRole("combobox", { name: "Related To" });
    this.relatedToInput = page.getByRole("searchbox", { name: "Related To" });

    // Dropdown fields for task categorization
    this.priority = page.getByRole("combobox", { name: "Priority" });
    this.status = page.getByRole("combobox", { name: "Status" });

    // Detail view elements for verification
    this.taskDetailHeader = page.getByRole("heading", { name: "Tasks" });

    console.log(
      "✅ SalesforceTasks page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new task in Salesforce with the provided details
   *
   * This method handles the complete task creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new task dialog via global actions menu
   * 3. Fills in all provided field values (text, dropdowns, dates)
   * 4. Saves the task
   * 5. Takes an end screenshot for verification
   *
   * All actions include proper wait strategies for reliable execution.
   * The method supports both required and optional fields.
   *
   * @param details - Object containing task field values to be filled
   * @param details.Subject - Task subject/title (typically required)
   * @param details.DueDate - Task due date
   * @param details.Priority - Task priority level (e.g., "High", "Medium", "Low")
   * @param details.Status - Task status (e.g., "Not Started", "In Progress", "Completed")
   * @param details.Description - Task description/comments
   * @param details.AssignedTo - User assigned to the task (currently commented out)
   * @param details.RelatedTo - Related record (currently commented out)
   *
   * @example
   * await taskPage.addNewTask({
   *   Subject: "Follow up call",
   *   Priority: "High",
   *   Status: "Not Started",
   *   DueDate: "2024-12-31"
   * });
   */
  async addNewTask(details: { [key: string]: string }) {
    console.log("🔄 Starting task creation process...");
    console.log("📝 Task details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-task",
      this.testInfo,
      "Platform/salesforce-tasks/"
    );

    // Open Task menu and click New Task
    await this.commandDropdown.click({ timeout: 10000 });
    await this.newTaskButton.click({ timeout: 10000 });
    console.log("✅ Task creation dialog opened");

    // Wait for new task form modal to load
    await this.subject.waitFor({ state: "visible", timeout: 10000 });
    console.log("📋 Filling form fields...");

    // Fill required Subject field
    await this.subject.fill(details.Subject, { timeout: 10000 });
    await expect(this.subject).toHaveValue(details.Subject);

    // Handle Assigned To lookup
    // if (details.AssignedTo) {
    //   await this.assignedTo.click();
    //   await this.assignedToInput.fill(details.AssignedTo);
    //   await this.page
    //     .getByRole("option", { name: details.AssignedTo })
    //     .click();
    //   await expect(this.assignedTo).toHaveValue(details.AssignedTo);
    // }

    // Handle Related To lookup
    // if (details.RelatedTo) {
    //   await this.relatedTo.click();
    //   await this.relatedToInput.fill(details.RelatedTo);
    //   await this.page
    //     .getByRole("option", { name: details.RelatedTo })
    //     .click();
    //   await expect(this.relatedTo).toHaveValue(details.RelatedTo);
    // }

    // Handle Due Date
    if (details.DueDate) {
      await this.dueDate.fill(
        new Date(details.DueDate).toLocaleDateString("hi-IN"),
        { timeout: 10000 }
      );
      await expect(this.dueDate).toHaveValue(
        new Date(details.DueDate).toLocaleDateString("hi-IN")
      );
    }

    // Handle Priority dropdown
    if (details.Priority) {
      await this.priority.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Priority })
        .click({ timeout: 10000 });
      // await expect(this.priority).toHaveValue(details.Priority);
    }

    // Handle Status dropdown
    if (details.Status) {
      await this.status.click({ timeout: 10000 });
      await this.page
        .getByRole("option", { name: details.Status })
        .click({ timeout: 10000 });
      // await expect(this.status).toHaveValue(details.Status);
    }

    // Handle Comments
    if (details.Description) {
      await this.description.fill(details.Description, { timeout: 10000 });
      // await expect(this.description).toHaveValue(details.Description);
    }

    console.log("💾 Saving the task...");

    // Save the task
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Task saved successfully");

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-task",
      this.testInfo,
      "Platform/salesforce-tasks/"
    );

    console.log("🎉 Task creation completed!");
  }

  /**
   * Verifies that a task was successfully created by checking for the task subject
   *
   * This method validates task creation success by:
   * 1. Checking if the task appears in the grid with the expected subject
   * 2. Taking a verification screenshot for evidence
   *
   * @param subject - Task subject to verify in the task list
   *
   * @throws Will throw an assertion error if:
   * - Expected task subject is not found in the grid
   * - Task creation failed
   *
   * @example
   * await taskPage.verifyTaskCreation("Follow up call");
   */
  async verifyTaskCreation(subject: string) {
    console.log("🔍 Starting task verification...");
    console.log(`🔍 Verifying task subject: "${subject}"`);

    await expect(
      this.page
        .locator("[role='GridCell']")
        .filter({ hasText: subject })
        .first()
    ).toBeVisible({ timeout: 10000 });
    console.log("✅ Task verification successful");

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Platform/salesforce-tasks/"
    );

    console.log("🎉 Verification completed!");
  }
}
