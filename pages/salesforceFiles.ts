import { expect, type Locator, type Page } from "@playwright/test";
const path = require("path");

export class SalesforceFilesLocators {
  readonly page: Page;
  readonly uploadFilesButton: Locator;
  readonly uploadInput: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly doneButton: Locator;
  readonly fileTitle: Locator;
  readonly fileDescription: Locator;
  readonly fileType: Locator;
  readonly uploadingSpinner: Locator;
  readonly fileDetailsDialog: Locator;
  readonly shareWithDropdown: Locator;
  readonly folderDropdown: Locator;
  readonly newFolderButton: Locator;
  readonly folderNameInput: Locator;
  readonly downloadButton: Locator;
  readonly deleteButton: Locator;
  readonly recycleBinButton: Locator;
  readonly restoreButton: Locator;
  readonly moveButton: Locator;
  readonly successToast: Locator;
  readonly filePreview: Locator;
  readonly shareSettingsButton: Locator;
  readonly sharingSaveButton: Locator;
  readonly removeShareButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    if (!page) throw new Error("Page instance is required");
    this.page = page;
    this.successToast = page.locator(".toastMessage");
    // Main Actions
    this.uploadFilesButton = page.getByRole("button", { name: "Upload Files" });
    this.uploadInput = page.locator('input[type="file"]');
    this.doneButton = page.getByRole("button", { name: "Done" });

    // File Details Form
    // this.titleInput = page.getByLabel("Title", { exact: true });
    this.titleInput = page
      .locator(".uiInput")
      .filter({ hasText: /Title/ })
      .locator("input");

    // this.descriptionInput = page.getByLabel("Description", { exact: true });
    this.descriptionInput = page
      .locator(".uiInput")
      .filter({ hasText: /Description/ })
      .locator("textarea");
    this.saveButton = page.getByRole("button", { name: "Save" });
  }

  async uploadFile(filePath: string, details: { [key: string]: string }) {
    // Resolve absolute path
    const absolutePath = path.resolve(__dirname, "../testdata/", filePath);

    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.uploadFilesButton.click();

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(absolutePath);
    // await this.uploadInput.setInputFiles(absolutePath);
    // await this.fileDetailsDialog.waitFor({ state: "visible" });
    await expect(this.page.locator("[data-key='success']")).toBeVisible();
    
    // Done button to close the dialog
    await this.doneButton.click();

    // Edit file details if provided
    const table = this.page.locator(
      "table[data-aura-class='uiVirtualDataTable']"
    );
    const row = table
      .locator("tr", { hasText: filePath.split(".")[0] })
      .first();
    await row.locator("[role='button']").click();
    await this.page.locator("a[title='Edit File Details']").click();

    // Fill in details
    if (details.Title) await this.titleInput.fill(details.Title);
    if (details.Description)
      await this.descriptionInput.fill(details.Description);
    await this.saveButton.click();
  }

  async verifyFileUploadSuccess(fileName: string) {
    const table = this.page.locator(
      "table[data-aura-class='uiVirtualDataTable']"
    );
    const row = table
      .locator("tr", { hasText: fileName})
      .first();
    await expect(row).toBeVisible();
  }
}
