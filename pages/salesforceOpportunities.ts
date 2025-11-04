import { createBdd, DataTable } from "playwright-bdd";
import { expect, type Locator, type Page } from "@playwright/test";
const testData = require("../testdata/userDetails.json");
const { Given, When, Then } = createBdd();

export class salesforceOpportunitiesLocators {
  readonly page: Page;
  readonly newOpportunityButton: Locator;
  readonly opportunityName: Locator;
  readonly closeDate: Locator;
  readonly stage: Locator;
  readonly amount: Locator;
  readonly type: Locator;
  readonly description: Locator;
  readonly nextStep: Locator;
  readonly private: Locator;
  readonly saveButton: Locator;
  readonly leadSource: Locator;
  readonly dialog: Locator;
  readonly dialogSave: Locator;

  constructor(page: Page) {
    this.page = page;

    // Buttons
    this.newOpportunityButton = page.getByRole("button", { name: "New" });
    // Use a non-exact Save locator to avoid brittle exact matching
    this.saveButton = page.getByRole("button", { name: "Save" });

    // Basic Info Fields - use role-based locators (handles required '*' in labels)
    this.opportunityName = page.getByRole("textbox", {
      name: /Opportunity Name/i,
    });
    this.closeDate = page.getByRole("textbox", { name: /Close Date/i });

    // Dropdown Fields
    this.type = page.getByRole("combobox", { name: /Type/i });
    this.stage = page.getByRole("combobox", { name: /Stage/i });
    this.leadSource = page.getByRole("combobox", { name: /Lead Source/i });

    // Number Fields
    this.amount = page.getByRole("spinbutton", { name: /Amount/i });

    // Text Fields
    this.nextStep = page.getByRole("textbox", { name: /Next Step/i });
    this.description = page.getByRole("textbox", { name: /Description/i });

    // Checkboxes
    this.private = page.getByRole("checkbox", { name: /Private/i });

    this.dialog = this.page.getByRole("dialog", {
      name: /New Opportunity/i,
    });
    this.dialogSave = this.dialog.getByRole("button", { name: /^Save$/i });
  }

  async addNewOpportunity(details: { [key: string]: string }) {
    // Click New button and wait for dialog to appear
    await this.newOpportunityButton.click();

    await this.dialog.waitFor({ state: "visible", timeout: 8000 });

    // Fill in basic information scoped to the dialog
    await this.dialog
      .getByRole("textbox", { name: /Opportunity Name/i })
      .fill(details.Name);

    // Handle date: fill the value provided by the feature file (DD/MM/YYYY) directly
    if (details.CloseDate) {
      await this.dialog
        .getByRole("textbox", { name: /Close Date/i })
        .fill(details.CloseDate);
    }

    // Handle Type dropdown
    if (details.Type) {
      await this.dialog.getByRole("combobox", { name: /Type/i }).click();
      await this.dialog
        .getByRole("listbox")
        .waitFor({ state: "visible", timeout: 3000 })
        .catch(() => {});
      await this.dialog
        .getByRole("listbox")
        .getByRole("option", { name: details.Type })
        .click();
    }

    // Handle Stage selection
    if (details.Stage) {
      await this.dialog.getByRole("combobox", { name: /Stage/i }).click();
      await this.dialog
        .getByRole("listbox")
        .waitFor({ state: "visible", timeout: 3000 })
        .catch(() => {});
      await this. dialog
        .getByRole("listbox")
        .getByRole("option", { name: details.Stage })
        .click();
    }

    // Handle Lead Source if provided
    if (details.LeadSource) {
      await this.dialog.getByRole("combobox", { name: /Lead Source/i }).click();
      await this.dialog
        .getByRole("listbox")
        .waitFor({ state: "visible", timeout: 3000 })
        .catch(() => {});
      await this.dialog
        .getByRole("listbox")
        .getByRole("option", { name: details.LeadSource })
        .click();
    }

    // Fill in numeric and text fields
    if (details.Amount) {
      await this.dialog
        .getByRole("spinbutton", { name: /Amount/i })
        .fill(String(details.Amount));
    }

    // Next Step
    if (details.NextStep) {
      await this.dialog
        .getByRole("textbox", { name: /Next Step/i })
        .fill(details.NextStep);
    }

    // Description
    if (details.Description) {
      await this.dialog
        .getByRole("textbox", { name: /Description/i })
        .fill(details.Description);
    }

    // Handle Private checkbox
    if (details.Private?.toLowerCase() === "yes") {
      const cb = this.dialog.getByRole("checkbox", { name: /Private/i });
      if (!(await cb.isChecked())) await cb.check();
    } else if (details.Private?.toLowerCase() === "no") {
      const cb = this.dialog.getByRole("checkbox", { name: /Private/i });
      if (await cb.isChecked()) await cb.uncheck();
    }

    // Save and wait for completion
    // Use dialog-scoped Save if present, else fallback to page-level Save
    if ((await this.dialogSave.count()) > 0) {
      await this.dialogSave.click();
    } else {
      await this.saveButton.click();
    }

    // Short pause to allow post-save UI updates (toasts/navigation)
    await this.page.waitForTimeout(1000);
  }

  async verifyOpportunityCreated(details: { [key: string]: string }) {
    expect(this.page.locator('[slot="primaryField"]')).toContainText(
      details.Name
    );
  }
}
