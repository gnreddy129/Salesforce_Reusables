import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";
import exp from "constants";

/**
 * SalesforceImages Page Object Model
 *
 * This class provides automation capabilities for Salesforce Images management functionality.
 * It handles image creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new images with comprehensive field support
 * - Handle complex form interactions with proper wait strategies
 * - Verify image creation success
 * - Support for all standard Salesforce image fields
 * - Navigate to Images module using app launcher
 *
 * @class SalesforceImagesPage
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceImagesPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary UI Controls
  readonly newImageButton: Locator;
  readonly dialog: Locator;
  readonly saveButton: Locator;

  // Form field locators
  readonly nameInput: Locator;
  readonly imageOrientationCombobox: Locator;
  readonly titleInput: Locator;
  readonly accessibilityTextInput: Locator;
  readonly urlInput: Locator;
  readonly activeCheckbox: Locator;
  readonly categoryCombobox: Locator;
  readonly imageTypeCombobox: Locator;
  readonly fileCombobox: Locator;
  readonly cameraAngleInput: Locator;

  // Additional UI elements
  readonly appLauncher: Locator;
  readonly viewAllButton: Locator;
  readonly searchBox: Locator;
  readonly imageCreatedMessage: Locator;

  // List View Elements
  readonly searchThisListInput: Locator;
  readonly listViewControls: Locator;
  readonly refreshButton: Locator;
  readonly editListButton: Locator;

  /**
   * Constructor - Initializes the SalesforceImages page object with all necessary locators
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - TestInfo object for test context and reporting
   */
  constructor(page: Page, testInfo?: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;

    console.log("🚀 Initializing SalesforceImages page object");

    // Initialize primary UI controls
    this.newImageButton = page.getByRole("button", { name: /new/i });
    this.dialog = page.locator(".modal-dialog, .slds-modal");
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });

    // Initialize form field locators with improved selectors
    this.nameInput = page.getByRole("textbox", { name: "Name", exact: true });
    this.imageOrientationCombobox = page.getByRole("textbox", {
      name: "Image Orientation", exact: true
    });
    this.titleInput = page.getByRole("textbox", { name: "Title", exact: true });
    this.accessibilityTextInput = page.getByRole("textbox", {
      name: "Accessibility Text",
      exact: true,
    });
    this.urlInput = page.getByRole("textbox", { name: "URL", exact: true });
    this.activeCheckbox = page.getByRole("checkbox", { name: "Active", exact: true });
    this.categoryCombobox = page.getByRole("combobox", { name: "Category", exact: true });
    this.imageTypeCombobox = page.getByRole("combobox", {
      name: "Image Type", exact: true
    });
    this.fileCombobox = page.getByRole("combobox", { name: "File", exact: true });
    this.cameraAngleInput = page.getByRole("textbox", {
      name: "Camera Angle",
      exact: true,
    });

    // Initialize additional UI elements
    this.appLauncher = page.locator("//button[@title='App Launcher']");
    this.viewAllButton = page.getByRole("button", { name: "View all" });
    this.searchBox = page.locator(
      "//input[@placeholder='Search apps and items...']"
    );
    this.imageCreatedMessage = page.locator(".toastMessage");

    // Initialize list view elements
    this.searchThisListInput = page.locator(
      "//input[@name='Image-search-input']"
    );
    this.listViewControls = page.locator(".slds-page-header__controls");
    this.refreshButton = page.getByRole("button", { name: "Refresh" });
    this.editListButton = page.getByRole("button", { name: "Edit List" });

    console.log(
      "✅ SalesforceImages page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new image in Salesforce with the provided details
   *
   * This method handles the complete image creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new image dialog
   * 3. Fills in all provided field values
   * 4. Saves the image
   * 5. Takes an end screenshot for verification
   *
   * @param details - Object containing image field values to be filled
   */
  async addNewImage(details: { [field: string]: string }) {
    console.log("🔄 Starting image creation process...");
    console.log("📝 Image details:", JSON.stringify(details, null, 2));

    // Wait for the new button to be visible and take start screenshot
    await expect(this.newImageButton).toBeVisible({ timeout: 10000 });
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-image",
      this.testInfo,
      "OtherFunctionality/salesforce-images/"
    );

    // Open the new image creation dialog
    await this.newImageButton.click({ timeout: 10000 });
    console.log("✅ Image creation dialog opened");

    await this.dialog.waitFor({ state: "visible", timeout: 10000 });

    console.log("📋 Filling form fields...");

    // Image Name - Primary identifier for the image (required)
    if (details.Name) {
      await this.nameInput.fill(details.Name, { timeout: 10000 });
    }

    // Image Orientation
    if (details.ImageOrientation && details.ImageOrientation !== "--None--") {
      await this.imageOrientationCombobox.fill(details.ImageOrientation, { timeout: 10000 });
    }

    // Title
    if (details.Title) {
      await this.titleInput.fill(details.Title, { timeout: 10000 });
    }

    // Accessibility Text
    if (details.AccessibilityText && details.AccessibilityText !== "--None--") {
      await this.accessibilityTextInput.fill(details.AccessibilityText, {
        timeout: 10000,
      });
    }

    // URL
    if (details.URL) {
      await this.urlInput.fill(details.URL, { timeout: 10000 });
    }

    // Active checkbox
    if (details.Active) {
      if (details.Active.toLowerCase() === "true") {
        await this.activeCheckbox.check({ timeout: 10000 });
      } else {
        await this.activeCheckbox.uncheck({ timeout: 10000 });
      }
    }

    // Category
    if (details.Category && details.Category !== "--None--") {
      await this.categoryCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: details.Category }).click();
    }

    // Image Type
    if (details.ImageType && details.ImageType !== "--None--") {
      await this.imageTypeCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: details.ImageType }).click();
    }

    // File
    if (details.File && details.File !== "--None--") {
      await this.fileCombobox.click({ timeout: 10000 });
      await this.page.getByRole("option", { name: details.File }).click();
    }

    // Camera Angle
    if (details.CameraAngle && details.CameraAngle !== "--None--") {
      await this.cameraAngleInput.fill(details.CameraAngle, { timeout: 10000 });
    }

    console.log("💾 Saving the image...");

    // Save the image
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Image saved successfully");

    await this.page.waitForTimeout(1000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-image",
      this.testInfo,
      "OtherFunctionality/salesforce-images/"
    );

    console.log("🎉 Image creation completed!");
  }

  /**
   * Verifies that an image was successfully created by checking for specific field values
   *
   * This method validates image creation success by checking if the image name
   * appears in the interface and takes a verification screenshot for documentation.
   *
   * @param details - Object containing image field values to verify
   * @param details.Name - Image name to verify on the page
   *
   * @throws Will throw an assertion error if expected image name is not found
   */
  async verifyImage(details: { [field: string]: string }) {
    console.log("🔍 Starting image verification...");

    // Check if the image name appears in the list
    const imageName = details["Name"] || details["name"];
    if (imageName) {
      await expect(this.page.locator(`[slot="primaryField"]`).filter({ hasText: imageName }).first()).toBeVisible({ timeout: 10000 });
      console.log(`✅ Image name verification successful: ${imageName}`);
    }

    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification-image",
      this.testInfo,
      "OtherFunctionality/salesforce-images/"
    );
    console.log("🎉 Image verification completed!");
  }
}
