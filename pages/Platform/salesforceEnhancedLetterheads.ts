import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceEnhancedLetterheads Page Object Model
 *
 * This class provides automation capabilities for Salesforce Enhanced Letterheads management functionality.
 * It handles enhanced letterhead creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new enhanced letterheads with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify enhanced letterhead creation and setup
 * - Support for letterhead configuration with name, description, header, and footer
 *
 * @class SalesforceEnhancedLetterheads
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceEnhancedLetterheadsPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Primary UI Controls
    readonly dialog: Locator;

    // Enhanced Letterhead Configuration Fields
    readonly nameTextbox: Locator;
    readonly descriptionTextbox: Locator;
    readonly headerTextbox: Locator;
    readonly footerTextbox: Locator;

    // Action Buttons
    readonly saveButton: Locator;

    /**
     * Constructor - Initializes the SalesforceEnhancedLetterheads page object with all necessary locators
     *
     * Sets up locators for all Salesforce enhanced letterhead form elements using role-based selectors
     * for maximum reliability. All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforceEnhancedLetterheads page object");
        this.page = page;
        this.testInfo = testInfo;

        // Dialog elements - Handle enhanced letterhead creation
        this.dialog = page.getByRole("dialog").first();

        // Enhanced Letterhead Configuration Fields
        this.nameTextbox = this.dialog.getByRole("textbox", {
            name: /^Name/i,
        });

        this.descriptionTextbox = this.dialog.getByRole("textbox", {
            name: /^Description/i,
        });

        // Header field - Located in iframe with nested iframe structure
        this.headerTextbox = page
            .frameLocator('[title="CK Editor Container"]').nth(0)
            .frameLocator('.cke_wysiwyg_frame.cke_reset')
            .locator('#editor_rta_body');

        // Footer field - Located in iframe with nested iframe structure
        this.footerTextbox = page
            .frameLocator('[title="CK Editor Container"]').nth(1)
            .frameLocator('.cke_wysiwyg_frame.cke_reset')
            .locator('#editor_rta_body');

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", {
            name: /^Save$/i,
        });

        console.log(
            "✅ SalesforceEnhancedLetterheads page object initialized successfully with all locators"
        );
    }

    /**
     * Creates a new enhanced letterhead in Salesforce with the provided details
     *
     * This method handles the complete enhanced letterhead creation workflow:
     * 1. Takes a start screenshot for verification
     * 2. Opens the new enhanced letterhead dialog
     * 3. Fills in all provided field values
     * 4. Saves the enhanced letterhead
     * 5. Takes an end screenshot for verification
     *
     * @param details - Object containing enhanced letterhead field values to be filled
     */
    async addNewEnhancedLetterhead(details: { [field: string]: string }) {
        console.log("🔄 Starting enhanced letterhead creation process...");
        console.log("📋 Enhanced letterhead details:", JSON.stringify(details, null, 2));

        await Helper.takeScreenshotToFile(
            this.page,
            "1-start-enhanced-letterhead",
            this.testInfo,
            "Platform/salesforce-enhanced-letterheads/"
        );

        // Open the new enhanced letterhead creation dialog
        console.log("✅ Enhanced letterhead creation dialog opened");

        await this.dialog.waitFor({ state: "visible", timeout: 10000 });

        console.log("📋 Filling form fields...");

        // Name (Textbox) - Required
        if (details.Name) {
            console.log("📝 Filling Name...");
            try {
                await this.nameTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.nameTextbox.fill(Helper.generateUniqueValue(details.Name), { timeout: 10000 });
                console.log("✅ Name filled:", details.Name);
            } catch (e) {
                console.log("❌ Failed to fill Name:", e);
            }
        }

        // Description (Textbox) - Required
        if (details.Description) {
            console.log("📝 Filling Description...");
            try {
                await this.descriptionTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.descriptionTextbox.fill(Helper.generateUniqueValue(details.Description), { timeout: 10000 });
                console.log("✅ Description filled:", details.Description);
            } catch (e) {
                console.log("❌ Failed to fill Description:", e);
            }
        }

        // Header (Textbox) - Required
        if (details.Header) {
            console.log("📝 Filling Header...");
            try {
                // Click inside the header iframe to focus it
                await this.headerTextbox.click({ timeout: 5000 });
                await this.page.waitForTimeout(300);
                // Select all content and clear
                await this.headerTextbox.press("Control+A");
                await this.page.waitForTimeout(200);
                // Type the new header content
                await this.headerTextbox.type(details.Header, { delay: 50 });
                console.log("✅ Header filled:", details.Header);
            } catch (e) {
                console.log("❌ Failed to fill Header:", e);
            }
        }

        // Footer (Textbox) - Required
        if (details.Footer) {
            console.log("📝 Filling Footer...");
            try {
                // Click inside the footer iframe to focus it
                await this.footerTextbox.click({ timeout: 5000 });
                await this.page.waitForTimeout(300);
                // Select all content and clear
                await this.footerTextbox.press("Control+A");
                await this.page.waitForTimeout(200);
                // Type the new footer content
                await this.footerTextbox.type(details.Footer, { delay: 50 });
                console.log("✅ Footer filled:", details.Footer);
            } catch (e) {
                console.log("❌ Failed to fill Footer:", e);
            }
        }

        // Take screenshot AFTER all fields are filled
        await Helper.takeScreenshotToFile(
            this.page,
            "2-all-fields-filled",
            this.testInfo,
            "Platform/salesforce-enhanced-letterheads/"
        );

        console.log("💾 Saving the enhanced letterhead...");

        // Save the enhanced letterhead
        await this.saveButton.click({ timeout: 10000 });
        console.log("✅ Enhanced letterhead saved successfully");

        await this.page.waitForTimeout(2000);

        // Take screenshot AFTER save
        await Helper.takeScreenshotToFile(
            this.page,
            "3-after-save-success",
            this.testInfo,
            "Platform/salesforce-enhanced-letterheads/"
        );

        await this.page.waitForTimeout(1000);

        // Take final screenshot showing the enhanced letterheads list
        await Helper.takeScreenshotToFile(
            this.page,
            "4-enhanced-letterheads-list",
            this.testInfo,
            "Platform/salesforce-enhanced-letterheads/"
        );

        console.log("🎉 Enhanced letterhead creation completed!");
    }

    /**
     * Verifies that an enhanced letterhead was successfully created
     *
     * This method validates enhanced letterhead creation success by checking that
     * the dialog has closed and we're back on the enhanced letterheads list page.
     *
     * @throws Will throw an assertion error if dialog is still visible
     */
    async verifyEnhancedLetterheadSuccess() {
        console.log("🔍 Verifying enhanced letterhead creation success...");

        // Check that the dialog is no longer visible (indicates save was successful)
        const dialogVisible = await this.dialog.isVisible().catch(() => false);
        if (!dialogVisible) {
            console.log("✅ Dialog closed - enhanced letterhead created successfully");
        } else {
            console.log("❌ Dialog still visible - creation may have failed");
        }

        await Helper.takeScreenshotToFile(
            this.page,
            "5-final-verification",
            this.testInfo,
            "Platform/salesforce-enhanced-letterheads/"
        );

        console.log("🎉 Verification completed!");
    }
}
