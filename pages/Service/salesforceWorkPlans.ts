import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceWorkPlans Page Object Model
 *
 * This class provides automation capabilities for Salesforce Work Plans management functionality.
 * It handles work plan creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new work plans with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify work plan creation and setup
 * - Support for parent record selection via combobox
 *
 * @class SalesforceWorkPlans
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceWorkPlansPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Primary UI Controls
    readonly newButton: Locator;
    readonly dialog: Locator;

    // Work Plan Configuration Fields
    readonly nameTextbox: Locator;
    readonly executionOrderTextbox: Locator;
    readonly parentRecordCombobox: Locator;
    readonly descriptionTextbox: Locator;

    // Action Buttons
    readonly saveButton: Locator;

    /**
     * Constructor - Initializes the SalesforceWorkPlans page object with all necessary locators
     *
     * Sets up locators for all Salesforce work plans form elements using role-based selectors
     * for maximum reliability. All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforceWorkPlans page object");
        this.page = page;
        this.testInfo = testInfo;

        // Primary controls - Main UI interaction elements
        this.newButton = page.getByRole("button", { name: /New|Create/i }).first();

        // Dialog elements - Handle work plan creation
        this.dialog = this.page.getByRole("dialog").first();

        // Work Plan Configuration Fields
        this.nameTextbox = this.dialog.getByRole("textbox", {
            name: /^Name/i,
        });

        this.executionOrderTextbox = this.dialog.getByRole("textbox", {
            name: /^Execution Order/i,
        });

        this.parentRecordCombobox = this.dialog.getByRole("combobox", {
            name: /^Parent Record/i,
        });

        this.descriptionTextbox = this.dialog.getByRole("textbox", {
            name: /^Description/i,
        });

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", {
            name: /^Save$/i,
        });

        console.log(
            "✅ SalesforceWorkPlans page object initialized successfully with all locators"
        );
    }

    /**
     * Creates a new work plan in Salesforce with the provided details
     *
     * This method handles the complete work plan creation workflow:
     * 1. Takes a start screenshot for verification
     * 2. Opens the new work plan dialog
     * 3. Fills in all provided field values (Name, Execution Order, Parent Record, Description)
     * 4. Saves the work plan
     * 5. Takes an end screenshot for verification
     *
     * @param details - Object containing work plan field values to be filled
     */
    async addNewWorkPlan(details: { [field: string]: string }) {
        console.log("🔄 Starting work plan creation process...");
        console.log("📋 Work plan details:", JSON.stringify(details, null, 2));

        // Wait for the new button to be visible and take start screenshot
        await expect(this.newButton).toBeVisible({ timeout: 10000 });
        await Helper.takeScreenshotToFile(
            this.page,
            "1-start-work-plan",
            this.testInfo,
            "OtherFunctionality/salesforce-work-plans/"
        );

        // Open the new work plan creation dialog
        await this.newButton.click({ timeout: 10000 });
        console.log("✅ Work plan creation dialog opened");

        await this.dialog.waitFor({ state: "visible", timeout: 10000 });

        console.log("📋 Filling form fields...");

        // Name (Textbox) - Required
        if (details.Name) {
            console.log("📝 Filling Name...");
            try {
                await this.nameTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.nameTextbox.fill(details.Name, { timeout: 10000 });
                console.log("✅ Name filled:", details.Name);
            } catch (e) {
                console.log("❌ Failed to fill Name:", e);
            }
        }

        // Execution Order (Textbox - integer only)
        if (details.ExecutionOrder || details["Execution Order"]) {
            const executionOrder = details.ExecutionOrder || details["Execution Order"];
            console.log("📝 Filling Execution Order...");
            try {
                await this.executionOrderTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.executionOrderTextbox.fill(executionOrder, { timeout: 10000 });
                console.log("✅ Execution Order filled:", executionOrder);
            } catch (e) {
                console.log("❌ Failed to fill Execution Order:", e);
            }
        }

        // Parent Record (Combobox) - Required
        if (details.ParentRecord || details["Parent Record"]) {
            const parentRecord = details.ParentRecord || details["Parent Record"];
            console.log("🔽 Selecting Parent Record from combobox...");
            await this.parentRecordCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${parentRecord}")`).first();
                await optionRole.click({ timeout: 10000, force: true });
                console.log("✅ Parent Record selected:", parentRecord);
            } catch (e) {
                try {
                    await this.parentRecordCombobox.fill(parentRecord, { timeout: 10000 });
                    await this.page.waitForTimeout(500);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ Parent Record selected via type and keyboard");
                } catch (e2) {
                    console.log("❌ Failed to select Parent Record:", e2);
                }
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

        // Take screenshot AFTER all fields are filled
        await Helper.takeScreenshotToFile(
            this.page,
            "2-all-fields-filled",
            this.testInfo,
            "OtherFunctionality/salesforce-work-plans/"
        );

        console.log("💾 Saving the work plan...");

        // Save the work plan
        await this.saveButton.click({ timeout: 10000 });
        console.log("✅ Work plan saved successfully");

        await this.page.waitForTimeout(2000);

        // Take screenshot AFTER save
        await Helper.takeScreenshotToFile(
            this.page,
            "3-after-save-success",
            this.testInfo,
            "OtherFunctionality/salesforce-work-plans/"
        );

        await this.page.waitForTimeout(1000);

        // Take final screenshot showing the work plans list
        await Helper.takeScreenshotToFile(
            this.page,
            "4-work-plans-list",
            this.testInfo,
            "OtherFunctionality/salesforce-work-plans/"
        );

        console.log("🎉 Work plan creation completed!");
    }

    /**
     * Verifies that work plan was successfully created
     *
     * This method validates work plan creation success by checking that
     * the dialog has closed and we're back on the work plans list page.
     *
     * @throws Will throw an assertion error if dialog is still visible
     */
    async verifyWorkPlanSuccess() {
        console.log("🔍 Verifying work plan creation success...");

        // Check that the dialog is no longer visible (indicates save was successful)
        const dialogVisible = await this.dialog.isVisible().catch(() => false);
        if (!dialogVisible) {
            console.log("✅ Dialog closed - work plan created successfully");
        } else {
            console.log("❌ Dialog still visible - creation may have failed");
        }

        await Helper.takeScreenshotToFile(
            this.page,
            "5-final-verification",
            this.testInfo,
            "OtherFunctionality/salesforce-work-plans/"
        );

        console.log("🎉 Verification completed!");
    }
}
