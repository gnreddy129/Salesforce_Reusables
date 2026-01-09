import { expect, type Page, type TestInfo, Locator } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * Page Object Model for Salesforce Location Groups
 *
 * This class handles all interactions with the Salesforce Location Groups interface,
 * providing methods for creating and verifying location groups with proper field mapping.
 *
 * Fields supported:
 * - Location Group Number (text)
 * - Description (text)
 * - External Reference (text)
 * - Sync with OCI (checkbox)
 * - Enabled (checkbox)
 *
 * @version 1.0
 * @author Automation Team
 */
export default class SalesforceLocationGroupsPage {
  readonly page: Page;
  readonly testInfo: TestInfo;

  // Locators for Location Groups form elements
  readonly locationGroupNumberField: Locator;
  readonly descriptionField: Locator;
  readonly externalReferenceField: Locator;
  readonly syncWithOciCheckbox: Locator;
  readonly enabledCheckbox: Locator;
  readonly saveButton: Locator;

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;

    // Initialize all locators for Location Groups
    this.locationGroupNumberField = page.getByRole("textbox", {
      name: /location group number/i,
    });
    this.descriptionField = page.getByRole("textbox", { name: /description/i });
    this.externalReferenceField = page.getByRole("textbox", {
      name: /external reference/i,
    });
    this.syncWithOciCheckbox = page.getByRole("checkbox", {
      name: /sync with oci/i,
    });
    this.enabledCheckbox = page.getByRole("checkbox", { name: /enabled/i });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });

    console.log("🚀 Initializing SalesforceLocationGroups page object");
    console.log(
      "✅ SalesforceLocationGroups page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new Location Group with the provided details
   * @param details - Object containing location group field values
   */
  async addNewLocationGroup(details: Record<string, string>) {
    console.log("🔄 Starting location group creation process...");
    console.log("📝 Location Group details:", JSON.stringify(details, null, 2));

    try {
      // Take initial screenshot
      await Helper.takeScreenshotToFile(
        this.page,
        "1-start-locationgroup",
        this.testInfo,
        "Inventory/"
      );

      console.log("📋 Filling form fields...");

      // Fill Location Group Number field
      if (details["Location Group Number"]) {
        await this.locationGroupNumberField.fill(
          details["Location Group Number"]
        );
        console.log(
          `✅ Set Location Group Number to: ${details["Location Group Number"]}`
        );
      }

      // Fill Description field
      if (details["Description"]) {
        await this.descriptionField.fill(details["Description"]);
        console.log(`✅ Set Description to: ${details["Description"]}`);
      }

      // Fill External Reference field
      if (details["External Reference"]) {
        await this.externalReferenceField.fill(details["External Reference"]);
        console.log(
          `✅ Set External Reference to: ${details["External Reference"]}`
        );
      }

      // Handle Sync with OCI checkbox
      if (details["Sync with OCI"]) {
        const shouldCheck = details["Sync with OCI"].toLowerCase() === "true";
        if (shouldCheck) {
          await this.syncWithOciCheckbox.check();
        } else {
          await this.syncWithOciCheckbox.uncheck();
        }
        console.log(
          `✅ Set Sync with OCI status to: ${details["Sync with OCI"]}`
        );
      }

      // Handle Enabled checkbox
      if (details["Enabled"]) {
        const shouldCheck = details["Enabled"].toLowerCase() === "true";
        if (shouldCheck) {
          await this.enabledCheckbox.check();
        } else {
          await this.enabledCheckbox.uncheck();
        }
        console.log(`✅ Set Enabled status to: ${details["Enabled"]}`);
      }

      console.log("💾 Saving the location group...");
      await this.saveButton.click({ timeout: 10000 });
      console.log("✅ Location Group saved successfully");

      // Take final screenshot
      await Helper.takeScreenshotToFile(
        this.page,
        "2-end-locationgroup",
        this.testInfo,
        "Inventory/"
      );

      console.log("🎉 Location Group creation completed!");
    } catch (error) {
      console.error("❌ Error during location group creation:", error);
      throw error;
    }
  }

  /**
   * Verifies that the Location Group was created successfully with the expected details
   * @param details - Object containing expected location group field values
   */
  async verifyLocationGroupCreation(details: Record<string, string>) {
    console.log("🔍 Starting location group verification...");

    const lgn = details["Location Group Number"];
    await this.page.getByText(lgn).count().then(count => {
      if (count === 0) throw new Error(`Location Group Number "${lgn}" not found on the page.`);
    });
    await Helper.takeScreenshotToFile(
        this.page,
        "3-end-locationgroup",
        this.testInfo,
        "Inventory/"
      );
    console.log("🎉 Location Group verification completed!");
  }
}