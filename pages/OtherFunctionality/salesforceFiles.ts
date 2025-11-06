import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";
const path = require("path");

/**
 * SalesforceFiles Page Object Model
 *
 * This class provides automation capabilities for Salesforce Files management functionality.
 * It handles file upload, sharing, organization, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Upload files to Salesforce with metadata
 * - Handle file sharing and permissions
 * - Organize files in libraries and folders
 * - Verify file upload and accessibility
 *
 * @class SalesforceFiles
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceFilesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly uploadFilesButton: Locator;
  readonly dialog: Locator;

  // File Upload Fields
  readonly uploadInput: Locator;
  readonly doneButton: Locator;

  // File Metadata Fields
  readonly titleTextbox: Locator;
  readonly descriptionTextbox: Locator;

  // Action Buttons
  readonly saveButton: Locator;

  // Notification Elements
  readonly successToast: Locator;
  /**
   * Constructor - Initializes the SalesforceFiles page object with all necessary locators
   *
   * Sets up locators for all Salesforce file management elements using role-based selectors
   * for maximum reliability. All elements are scoped appropriately for better isolation.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceFiles page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary controls - Main UI interaction elements
    this.uploadFilesButton = page.getByRole("button", { name: "Upload Files" });
    this.dialog = page.getByRole("dialog").first();

    // File upload fields - Handle file selection and upload
    this.uploadInput = page.locator('input[type="file"]');
    this.doneButton = page.getByRole("button", { name: "Done" });

    // File metadata fields - Handle file properties
    this.titleTextbox = page
      .locator(".uiInput")
      .filter({ hasText: /Title/ })
      .locator("input");
    this.descriptionTextbox = page
      .locator(".uiInput")
      .filter({ hasText: /Description/ })
      .locator("textarea");

    // Action buttons - File operations
    this.saveButton = page.getByRole("button", { name: "Save" });

    // Notification elements - Success/error feedback
    this.successToast = page.locator(".toastMessage");

    console.log(
      "✅ SalesforceFiles page object initialized successfully with all locators"
    );
  }

  /**
   * Uploads a file to Salesforce with optional metadata configuration
   *
   * This method handles the complete file upload workflow:
   * 1. Takes a start screenshot for verification
   * 2. Resolves file path and initiates upload via file chooser
   * 3. Monitors upload progress and completion
   * 4. Configures file metadata (title, description) if provided
   * 5. Takes completion screenshot for verification
   *
   * Includes robust file chooser handling and proper wait strategies for upload completion.
   *
   * @param filePath - Relative path to file in testdata directory
   * @param details - File metadata configuration object containing:
   *   - Title: Display name for the uploaded file
   *   - Description: Optional description text
   *
   * @throws Will throw an error if:
   * - File path cannot be resolved
   * - Upload process fails or times out
   * - Metadata configuration fails
   *
   * @example
   * await filesPage.uploadFile("doc1.pdf", {
   *   Title: "Project Requirements Document",
   *   Description: "Updated requirements for Q4 project"
   * });
   */
  async uploadFile(filePath: string, details: { [key: string]: string }) {
    console.log("🔄 Starting file upload process...");
    console.log(`📁 Uploading file: ${filePath}`);

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-file-upload",
      this.testInfo,
      "OtherFunctionality/salesforce-files/"
    );

    // Resolve absolute path
    const absolutePath = path.resolve(__dirname, "../../testdata/", filePath);
    console.log(`✅ File path resolved: ${absolutePath}`);

    // Start waiting for file chooser before clicking
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.uploadFilesButton.click({ timeout: 10000 });
    console.log("✅ Upload dialog opened");

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(absolutePath);
    console.log("✅ File selected for upload");

    // Wait for upload completion
    await expect(this.page.locator("[data-key='success']")).toBeVisible({
      timeout: 10000,
    });
    console.log("✅ File upload completed successfully");

    // Done button to close the dialog
    await this.doneButton.click({ timeout: 10000 });
    console.log("✅ Upload dialog closed");

    // Edit file details if provided
    if (details.Title || details.Description) {
      console.log("🔧 Configuring file metadata...");

      const table = this.page.locator(
        "table[data-aura-class='uiVirtualDataTable']"
      );
      const row = table
        .locator("tr", { hasText: filePath.split(".")[0] })
        .first();
      await row.locator("[role='button']").click({ timeout: 10000 });
      await this.page.locator("a[title='Edit File Details']").click({ timeout: 10000 });

      // Fill in details
      if (details.Title) {
        await this.titleTextbox.fill(details.Title,{ timeout: 10000 });
        console.log(`✅ File title set: ${details.Title}`);
      }
      if (details.Description) {
        await this.descriptionTextbox.fill(details.Description);
        console.log("✅ File description added");
      }
      await this.saveButton.click({ timeout: 10000 });
      console.log("✅ File metadata saved");
    }

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-file-upload",
      this.testInfo,
      "OtherFunctionality/salesforce-files/"
    );

    console.log("🎉 File upload process completed!");
  }

  /**
   * Verifies that a file has been successfully uploaded and is visible in the file list
   *
   * This method performs comprehensive file upload verification:
   * 1. Searches for the uploaded file in the file table
   * 2. Validates file visibility and accessibility
   * 3. Takes a verification screenshot for documentation
   * 4. Provides detailed feedback on verification results
   *
   * Uses the file name to locate and verify the uploaded file in the data table.
   *
   * @param fileName - Name of the file to verify (without extension)
   *
   * @throws Will throw an error if:
   * - File is not found in the file table
   * - File row visibility assertion fails
   * - Table navigation issues occur
   *
   * @example
   * await filesPage.verifyFileUploadSuccess("doc1");
   * await filesPage.verifyFileUploadSuccess("project-requirements");
   */
  async verifyFileUploadSuccess(fileName: string) {
    console.log("🔍 Starting file upload verification...");
    console.log(`📁 Verifying file: ${fileName}`);

    const table = this.page.locator(
      "table[data-aura-class='uiVirtualDataTable']"
    );
    const row = table.locator("tr", { hasText: fileName }).first();

    await expect(row).toBeVisible({ timeout: 10000 });
    console.log("✅ File successfully verified in file list");

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification-file-uploaded",
      this.testInfo,
      "OtherFunctionality/salesforce-files/"
    );

    console.log("🎉 File upload verification completed successfully!");
  }
}
