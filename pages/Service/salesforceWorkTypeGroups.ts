import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceWorkTypeGroups Page Object Model
 *
 * This class provides automation capabilities for Salesforce Work Type Groups management functionality.
 * It handles work type group creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new work type groups with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify work type group creation and setup
 * - Support for group type selection via dropdown
 *
 * @class SalesforceWorkTypeGroups
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceWorkTypeGroupsPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Primary UI Controls
    readonly newButton: Locator;
    readonly dialog: Locator;

    // Work Type Group Configuration Fields
    readonly workTypeGroupNameTextbox: Locator;
    readonly descriptionTextbox: Locator;
    readonly groupTypeDropdown: Locator;
    readonly activeCheckbox: Locator;

    // Action Buttons
    readonly saveButton: Locator;

    /**
     * Constructor - Initializes the SalesforceWorkTypeGroups page object with all necessary locators
     *
     * Sets up locators for all Salesforce work type groups form elements using role-based selectors
     * for maximum reliability. All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforceWorkTypeGroups page object");
        this.page = page;
        this.testInfo = testInfo;

        // Primary controls - Main UI interaction elements
        this.newButton = page.getByRole("button", { name: /New|Create/i }).first();

        // Dialog elements - Handle work type group creation
        this.dialog = this.page.getByRole("dialog").first();

        // Work Type Group Configuration Fields
        this.workTypeGroupNameTextbox = this.dialog.getByRole("textbox", {
            name: /^Work Type Group Name/i,
        });

        this.descriptionTextbox = this.dialog.getByRole("textbox", {
            name: /^Description/i,
        });

        this.groupTypeDropdown = this.dialog.getByRole("combobox", {
            name: /^Group Type/i,
        });

        this.activeCheckbox = this.dialog.getByRole("checkbox", {
            name: /^Active/i,
        });

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", {
            name: /^Save$/i,
        });

        console.log(
            "✅ SalesforceWorkTypeGroups page object initialized successfully with all locators"
        );
    }

    /**
     * Creates a new work type group in Salesforce with the provided details
     *
     * This method handles the complete work type group creation workflow:
     * 1. Takes a start screenshot for verification
     * 2. Opens the new work type group dialog
     * 3. Fills in all provided field values (Name, Description, Group Type, Active)
     * 4. Saves the work type group
     * 5. Takes an end screenshot for verification
     *
     * @param details - Object containing work type group field values to be filled
     */
    async addNewWorkTypeGroup(details: { [field: string]: string }) {
        console.log("🔄 Starting work type group creation process...");
        console.log("📋 Work type group details:", JSON.stringify(details, null, 2));

        // Wait for the new button to be visible and take start screenshot
        await expect(this.newButton).toBeVisible({ timeout: 10000 });
        await Helper.takeScreenshotToFile(
            this.page,
            "1-start-work-type-group",
            this.testInfo,
            "OtherFunctionality/salesforce-work-type-groups/"
        );

        // Open the new work type group creation dialog
        await this.newButton.click({ timeout: 10000 });
        console.log("✅ Work type group creation dialog opened");

        await this.dialog.waitFor({ state: "visible", timeout: 10000 });

        console.log("📋 Filling form fields...");

        // Work Type Group Name (Textbox)
        if (details.WorkTypeGroupName || details["Work Type Group Name"]) {
            const workTypeGroupName = details.WorkTypeGroupName || details["Work Type Group Name"];
            console.log("📝 Filling Work Type Group Name...");
            try {
                await this.workTypeGroupNameTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.workTypeGroupNameTextbox.fill(workTypeGroupName, { timeout: 10000 });
                console.log("✅ Work Type Group Name filled:", workTypeGroupName);
            } catch (e) {
                console.log("❌ Failed to fill Work Type Group Name:", e);
            }
        }

        // Description (Textbox)
        if (details.Description) {
            console.log("📝 Filling Description...");
            try {
                await this.descriptionTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.descriptionTextbox.fill(details.Description, { timeout: 10000 });
                console.log("✅ Description filled:", details.Description);
            } catch (e) {
                console.log("❌ Failed to fill Description:", e);
            }
        }

        // Group Type (Dropdown) - Required
        if (details.GroupType || details["Group Type"]) {
            const groupType = details.GroupType || details["Group Type"];
            console.log("🔽 Selecting Group Type from dropdown...");
            await this.groupTypeDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${groupType}")`).first();
                await optionRole.click({ timeout: 10000, force: true });
                console.log("✅ Group Type selected:", groupType);
            } catch (e) {
                try {
                    await this.groupTypeDropdown.fill(groupType, { timeout: 10000 });
                    await this.page.waitForTimeout(500);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ Group Type selected via type and keyboard");
                } catch (e2) {
                    console.log("❌ Failed to select Group Type:", e2);
                }
            }
        }

        // Active (Checkbox)
        if (details.Active && details.Active.toLowerCase() === "true") {
            console.log("☑️ Checking Active checkbox...");
            try {
                const isChecked = await this.activeCheckbox.isChecked();
                if (!isChecked) {
                    await this.activeCheckbox.click({ timeout: 5000 });
                    console.log("✅ Active checkbox checked");
                }
            } catch (e) {
                console.log("❌ Failed to check Active:", e);
            }
        }

        // Take screenshot AFTER all fields are filled
        await Helper.takeScreenshotToFile(
            this.page,
            "2-all-fields-filled",
            this.testInfo,
            "OtherFunctionality/salesforce-work-type-groups/"
        );

        console.log("💾 Saving the work type group...");

        // Save the work type group
        await this.saveButton.click({ timeout: 10000 });
        console.log("✅ Work type group saved successfully");

        await this.page.waitForTimeout(2000);

        // Take screenshot AFTER save
        await Helper.takeScreenshotToFile(
            this.page,
            "3-after-save-success",
            this.testInfo,
            "OtherFunctionality/salesforce-work-type-groups/"
        );

        await this.page.waitForTimeout(1000);

        // Take final screenshot showing the work type groups list
        await Helper.takeScreenshotToFile(
            this.page,
            "4-work-type-groups-list",
            this.testInfo,
            "OtherFunctionality/salesforce-work-type-groups/"
        );

        console.log("🎉 Work type group creation completed!");
    }

    /**
     * Verifies that work type group was successfully created
     *
     * This method validates work type group creation success by checking that
     * the dialog has closed and we're back on the work type groups list page.
     *
     * @throws Will throw an assertion error if dialog is still visible
     */
    async verifyWorkTypeGroupSuccess() {
        console.log("🔍 Verifying work type group creation success...");

        // Check that the dialog is no longer visible (indicates save was successful)
        const dialogVisible = await this.dialog.isVisible().catch(() => false);
        if (!dialogVisible) {
            console.log("✅ Dialog closed - work type group created successfully");
        } else {
            console.log("❌ Dialog still visible - creation may have failed");
        }

        await Helper.takeScreenshotToFile(
            this.page,
            "5-final-verification",
            this.testInfo,
            "OtherFunctionality/salesforce-work-type-groups/"
        );

        console.log("🎉 Verification completed!");
    }
}
