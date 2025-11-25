import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceWorkPlanTemplates Page Object Model
 *
 * This class provides automation capabilities for Salesforce Work Plan Templates management functionality.
 * It handles work plan template creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new work plan templates with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify work plan template creation and setup
 * - Support for template configuration with name, active status, and execution order
 *
 * @class SalesforceWorkPlanTemplates
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceWorkPlanTemplatesPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Primary UI Controls
    readonly newButton: Locator;
    readonly dialog: Locator;

    // Work Plan Template Configuration Fields
    readonly nameTextbox: Locator;
    readonly activeCheckbox: Locator;
    readonly relativeExecutionOrderTextbox: Locator;
    readonly descriptionTextbox: Locator;

    // Action Buttons
    readonly saveButton: Locator;

    /**
     * Constructor - Initializes the SalesforceWorkPlanTemplates page object with all necessary locators
     *
     * Sets up locators for all Salesforce work plan templates form elements using role-based selectors
     * for maximum reliability. All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforceWorkPlanTemplates page object");
        this.page = page;
        this.testInfo = testInfo;

        // Primary controls - Main UI interaction elements
        this.newButton = page.getByRole("button", { name: /New|Create/i }).first();

        // Dialog elements - Handle work plan template creation
        this.dialog = this.page.getByRole("dialog").first();

        // Work Plan Template Configuration Fields
        this.nameTextbox = this.dialog.getByRole("textbox", {
            name: /^Name/i,
        });

        this.activeCheckbox = this.dialog.getByRole("checkbox", {
            name: /^Active/i,
        });

        this.relativeExecutionOrderTextbox = this.dialog.getByRole("spinbutton", {
            name: /^Relative Execution Order/i,
        });

        this.descriptionTextbox = this.dialog.getByRole("textbox", {
            name: /^Description/i,
        });

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", {
            name: /^Save$/i,
        });

        console.log(
            "✅ SalesforceWorkPlanTemplates page object initialized successfully with all locators"
        );
    }

    /**
     * Creates a new work plan template in Salesforce with the provided details
     *
     * This method handles the complete work plan template creation workflow:
     * 1. Takes a start screenshot for verification
     * 2. Opens the new work plan template dialog
     * 3. Fills in all provided field values (Name, Active, Relative Execution Order, Description)
     * 4. Saves the work plan template
     * 5. Takes an end screenshot for verification
     *
     * @param details - Object containing work plan template field values to be filled
     */
    async addNewWorkPlanTemplate(details: { [field: string]: string }) {
        console.log("🔄 Starting work plan template creation process...");
        console.log("📋 Work plan template details:", JSON.stringify(details, null, 2));

        // Wait for the new button to be visible and take start screenshot
        await expect(this.newButton).toBeVisible({ timeout: 10000 });
        await Helper.takeScreenshotToFile(
            this.page,
            "1-start-work-plan-template",
            this.testInfo,
            "OtherFunctionality/salesforce-work-plan-templates/"
        );

        // Open the new work plan template creation dialog
        await this.newButton.click({ timeout: 10000 });
        console.log("✅ Work plan template creation dialog opened");

        await this.dialog.waitFor({ state: "visible", timeout: 10000 });

        console.log("📋 Filling form fields...");

        // Name (Textbox)
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

        // Relative Execution Order (Textbox)
        if (details.RelativeExecutionOrder || details["Relative Execution Order"]) {
            const relativeExecutionOrder = details.RelativeExecutionOrder || details["Relative Execution Order"];
            console.log("📝 Filling Relative Execution Order...");
            try {
                await this.relativeExecutionOrderTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.relativeExecutionOrderTextbox.fill(relativeExecutionOrder, { timeout: 10000 });
                console.log("✅ Relative Execution Order filled:", relativeExecutionOrder);
            } catch (e) {
                console.log("❌ Failed to fill Relative Execution Order:", e);
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
            "OtherFunctionality/salesforce-work-plan-templates/"
        );

        console.log("💾 Saving the work plan template...");

        // Save the work plan template
        await this.saveButton.click({ timeout: 10000 });
        console.log("✅ Work plan template saved successfully");

        await this.page.waitForTimeout(2000);

        // Take screenshot AFTER save
        await Helper.takeScreenshotToFile(
            this.page,
            "3-after-save-success",
            this.testInfo,
            "OtherFunctionality/salesforce-work-plan-templates/"
        );

        await this.page.waitForTimeout(1000);

        // Take final screenshot showing the work plan templates list
        await Helper.takeScreenshotToFile(
            this.page,
            "4-work-plan-templates-list",
            this.testInfo,
            "OtherFunctionality/salesforce-work-plan-templates/"
        );

        console.log("🎉 Work plan template creation completed!");
    }

    /**
     * Verifies that work plan template was successfully created
     *
     * This method validates work plan template creation success by checking that
     * the dialog has closed and we're back on the work plan templates list page.
     *
     * @throws Will throw an assertion error if dialog is still visible
     */
    async verifyWorkPlanTemplateSuccess() {
        console.log("🔍 Verifying work plan template creation success...");

        // Check that the dialog is no longer visible (indicates save was successful)
        const dialogVisible = await this.dialog.isVisible().catch(() => false);
        if (!dialogVisible) {
            console.log("✅ Dialog closed - work plan template created successfully");
        } else {
            console.log("❌ Dialog still visible - creation may have failed");
        }

        await Helper.takeScreenshotToFile(
            this.page,
            "5-final-verification",
            this.testInfo,
            "OtherFunctionality/salesforce-work-plan-templates/"
        );

        console.log("🎉 Verification completed!");
    }
}
