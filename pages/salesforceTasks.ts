import { expect, type Locator, type Page } from "@playwright/test";

export class salesforceTasksLocators {
  readonly page: Page;
  readonly newTaskButton: Locator;
  readonly subject: Locator;
  readonly assignedTo: Locator;
  readonly assignedToInput: Locator;
  readonly relatedTo: Locator;
  readonly relatedToInput: Locator;
  readonly dueDate: Locator;
  readonly priority: Locator;
  readonly status: Locator;
  readonly description: Locator;
  readonly saveButton: Locator;
  readonly taskDetailHeader: Locator;
  readonly commandDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    // Global Actions Menu for Tasks
    this.commandDropdown = page.getByRole("button", {
      name: "Show more actions",
    });
    this.newTaskButton = page.getByRole("menuitem", { name: "New Task" });

    // Form Fields - Lightning
    this.subject = page.getByRole("combobox", { name: "Subject" });

    // Lookup Fields - Lightning
    this.assignedTo = page.getByRole("combobox", { name: "Assigned To" });
    this.assignedToInput = page.getByRole("searchbox", { name: "Assigned To" });
    this.relatedTo = page.getByRole("combobox", { name: "Related To" });
    this.relatedToInput = page.getByRole("searchbox", { name: "Related To" });

    // Date Field - Lightning
    this.dueDate = page.getByRole("textbox", { name: "Due Date" });

    // Dropdown Fields - Lightning
    this.priority = page.getByRole("combobox", { name: "Priority" });
    this.status = page.getByRole("combobox", { name: "Status" });

    // Comments Area - Lightning
    this.description = page.getByRole("textbox", { name: "Comments" });

    // Action Buttons
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });

    // Detail View Elements
    this.taskDetailHeader = page.getByRole("heading", { name: "Tasks" });
  }

  async addNewTask(details: { [key: string]: string }) {
      // Open Task menu and click New Task
      await this.commandDropdown.click();
      await this.newTaskButton.click();

      // Wait for new task form modal to load
      await this.subject.waitFor({ state: "visible", timeout: 10000 });

      // Fill required Subject field
      await this.subject.fill(details.Subject);
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
          new Date(details.DueDate).toLocaleDateString("hi-IN")
        );
        await expect(this.dueDate).toHaveValue(
          new Date(details.DueDate).toLocaleDateString("hi-IN")
        );
      }

      // Handle Priority dropdown
      if (details.Priority) {
        await this.priority.click();
        await this.page.getByRole("option", { name: details.Priority }).click();
        // await expect(this.priority).toHaveValue(details.Priority);
      }

      // Handle Status dropdown
      if (details.Status) {
        await this.status.click();
        await this.page.getByRole("option", { name: details.Status }).click();
        // await expect(this.status).toHaveValue(details.Status);
      }

      // Handle Comments
      if (details.Description) {
        await this.description.fill(details.Description);
        // await expect(this.description).toHaveValue(details.Description);
      }

      // Save the task
      await this.saveButton.click();

  }

  async verifyTaskCreation(subject: string) {
    await expect(
      this.page
        .locator("[role='GridCell']")
        .filter({ hasText: subject })
        .first()
    ).toBeVisible();
  }
}
