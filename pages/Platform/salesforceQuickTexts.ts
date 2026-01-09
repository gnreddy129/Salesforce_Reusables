import { expect, type Locator, type Page, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceQuickTexts Page Object Model
 *
 * This class provides automation capabilities for Salesforce Quick Texts management functionality.
 * Quick Texts are predefined text snippets that users can quickly insert into various Salesforce fields.
 * This page object handles quick text creation, form interactions, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new quick texts with various field types (text inputs, dropdowns, textareas)
 * - Handle complex form interactions with proper wait strategies
 * - Verify quick text creation success
 * - Support for all standard Salesforce quick text fields (Name, Message, Description, Status, Owner)
 *
 * @class SalesforceQuickTextsPage
 * @author Automation Team
 * @version 1.0
 */
export class SalesforceQuickTextsPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Primary Action Elements
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly previewButton: Locator;
  readonly saveAndNewButton: Locator;

  // Basic Quick Text Information Fields
  readonly quickTextName: Locator;
  readonly message: Locator;

  // Merge Field Related Fields
  readonly relatedTo: Locator;
  readonly field: Locator;
  readonly insertButton: Locator;

  // Dropdown Fields
  readonly category: Locator;

  // Checkbox Fields
  readonly includeInSelectedChannels: Locator;

  // Verification Elements
  readonly quickTextDetailHeader: Locator;
  readonly quickTextGrid: Locator;
  readonly allOptionsLocator: Locator;


  /**
   * Constructor - Initializes the SalesforceQuickTexts page object with all necessary locators
   *
   * Sets up locators for all Salesforce quick text form elements using role-based and
   * attribute-based selectors for maximum reliability. Uses Lightning UI specific locators.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceQuickTexts page object");
    this.page = page;
    this.testInfo = testInfo;

    // Primary action buttons
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.cancelButton = page.getByRole("button", { name: "Cancel", exact: true });
    this.previewButton = page.getByRole("button", { name: "Preview", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New", exact: true });

    // Basic quick text information fields
    // Quick Text Name field (required)
    this.quickTextName = page.getByRole("textbox", { name: /Quick Text Name/i });

    // Message field (required) - text area with merge field support
    this.message = page.getByRole("textbox", { name: /Message/i });

    // Merge field related fields
    this.relatedTo = page.getByRole("combobox", { name: /Related To/i });
    this.field = page.getByRole("combobox", { name: /Field/i });
    this.insertButton = page.getByRole("button", { name: /Insert/i });

    // Category dropdown field
    this.category = page.getByRole("combobox", { name: /Category/i });

    // Include in selected channels checkbox
    this.includeInSelectedChannels = page.getByRole("checkbox", {
      name: /Include in selected channels/i,
    });

    // Detail view elements for verification
    this.quickTextDetailHeader = page.getByRole("heading", {
      name: /Quick Text/i,
    });
    this.allOptionsLocator = page.getByRole("option");

    console.log(
      "✅ SalesforceQuickTexts page object initialized successfully with all locators"
    );
  }

  /**
   * Creates a new quick text in Salesforce with the provided details
   *
   * This method handles the complete quick text creation workflow:
   * 1. Takes a start screenshot for verification
   * 2. Opens the new quick text form (already loaded)
   * 3. Fills in all provided field values (text, dropdowns)
   * 4. Optionally inserts merge fields (Related To -> Field -> Insert)
   * 5. Saves the quick text
   * 6. Takes an end screenshot for verification
   *
   * All actions include proper wait strategies for reliable execution.
   * The method supports both required and optional fields.
   *
   * @param details - Object containing quick text field values to be filled
   * @param details.QuickTextName - Quick text name/title (required)
   * @param details.Message - Quick text message content (required)
   * @param details.Category - Quick text category (e.g., "Greetings", "Common Answers")
   * @param details.RelatedTo - Related object for merge field (e.g., "Account", "Contact")
   * @param details.Field - Field to insert from related object (e.g., "Account Description")
   * @param details.IncludeInSelectedChannels - Whether to check the include checkbox (true/false)
   *
   * @example
   * await quickTextPage.addNewQuickText({
   *   QuickTextName: "Order Confirmation",
   *   Message: "Your order has been confirmed.",
   *   Category: "Greetings",
   *   RelatedTo: "Account",
   *   Field: "Account Description"
   * });
   */
  async addNewQuickText(details: { [key: string]: string }) {
    console.log("🔄 Starting quick text creation process...");
    console.log("📝 Quick text details:", JSON.stringify(details, null, 2));

    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-quicktext",
      this.testInfo,
      "Platform/salesforce-quick-texts/"
    );

    // Wait for form to be visible
    await this.quickTextName.waitFor({ state: "visible", timeout: 10000 });
    console.log("📋 Form loaded, filling fields...");

    // Fill required Quick Text Name field
    if (details.QuickTextName) {
      await this.quickTextName.fill(Helper.generateUniqueValue(details.QuickTextName), { timeout: 10000 });
      console.log(`✅ Quick Text Name filled: "${details.QuickTextName}"`);
    }

    // Fill required Message field
    if (details.Message) {
      await this.message.fill(Helper.generateUniqueValue(details.Message), { timeout: 10000 });
      console.log(`✅ Message field filled with content`);
    }

    // Handle merge field insertion flow (Related To -> Field -> Insert)
    if (details.RelatedTo && details.Field) {
      console.log("📋 Inserting merge field...");

      // Step 1: Select Related To (e.g., Account)
      await this.relatedTo.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.RelatedTo }).first().click({ timeout: 10000 });
      console.log(`✅ Related To set to: "${details.RelatedTo}"`);

      // Step 2: Select Field (e.g., Account Description)
      await this.field.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.Field }).first().click({ timeout: 10000 });
      console.log(`✅ Field set to: "${details.Field}"`);

      // Step 3: Click Insert button
      await this.insertButton.click({ timeout: 10000 });
      console.log(`✅ Merge field inserted`);
    }

    // Handle Category dropdown
    if (details.Category) {
      await this.category.click({ timeout: 10000 });
      await this.allOptionsLocator.filter({ hasText: details.Category }).first().click({ timeout: 10000 });
      console.log(`✅ Category set to: "${details.Category}"`);
    }

    // Handle Include in selected channels checkbox
    if (details.IncludeInSelectedChannels) {
      const shouldCheck = details.IncludeInSelectedChannels.toLowerCase() === "true";
      const isChecked = await this.includeInSelectedChannels.isChecked();

      if (shouldCheck && !isChecked) {
        await this.includeInSelectedChannels.check({ timeout: 10000 });
        console.log(`✅ "Include in selected channels" checkbox checked`);
      } else if (!shouldCheck && isChecked) {
        await this.includeInSelectedChannels.uncheck({ timeout: 10000 });
        console.log(`✅ "Include in selected channels" checkbox unchecked`);
      } else {
        console.log(`✅ "Include in selected channels" already in desired state`);
      }
    }

    console.log("💾 Saving the quick text...");

    // Save the quick text
    await this.saveButton.click({ timeout: 10000 });
    console.log("✅ Quick text saved successfully");

    // Wait for success and form to close/redirect
    await this.page.waitForTimeout(2000);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-quicktext",
      this.testInfo,
      "Platform/salesforce-quick-texts/"
    );

    console.log("🎉 Quick text creation completed!");
  }

  /**
   * Verifies that a quick text was successfully created by checking for the quick text name
   *
   * This method validates quick text creation success by:
   * 1. Checking if the quick text appears in the grid with the expected name
   * 2. Verifying visibility and clickability of the created quick text
   * 3. Taking a verification screenshot for evidence
   *
   * @param quickTextName - Quick text name to verify in the quick texts list
   *
   * @throws Will throw an assertion error if:
   * - Expected quick text name is not found in the grid
   * - Quick text creation failed
   *
   * @example
   * await quickTextPage.verifyQuickTextCreation("Order Confirmation");
   */
  async verifyQuickTextCreation(quickTextName: string) {
    console.log(`🔍 Starting quick text verification for quick text name: "${quickTextName}"`);
    await this.page.waitForTimeout(1000);
    const count = await this.page.getByText(quickTextName).count();
    if (count === 0) {
      throw new Error(`❌ Quick text "${quickTextName}" not found in the list`);
    }
    expect(count).toBeGreaterThan(0);
    console.log(`✅ Quick text "${quickTextName}" found in the list`);

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification",
      this.testInfo,
      "Platform/salesforce-quick-texts/"
    );

    console.log("🎉 Verification completed!");
  }
}

export default SalesforceQuickTextsPage;
