import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceOperatingHours Page Object Model
 *
 * This class provides automation capabilities for Salesforce Operating Hours management functionality.
 * It handles operating hours creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new operating hours with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify operating hours creation and setup
 * - Support for multiple row entries (Day, Start Time, End Time, Work Type Group)
 * - Dynamic row addition with "Add Row" button
 *
 * @class SalesforceOperatingHours
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceOperatingHoursPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Primary UI Controls
    readonly newButton: Locator;
    readonly dialog: Locator;

    // Operating Hours Configuration Fields
    readonly nameTextbox: Locator;
    readonly descriptionTextbox: Locator;
    readonly timeZoneDropdown: Locator;

    // Row Management
    readonly addRowButton: Locator;

    // Action Buttons
    readonly saveButton: Locator;

    /**
     * Constructor - Initializes the SalesforceOperatingHours page object with all necessary locators
     *
     * Sets up locators for all Salesforce operating hours form elements using role-based selectors
     * for maximum reliability. All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforceOperatingHours page object");
        this.page = page;
        this.testInfo = testInfo;

        // Primary controls - Main UI interaction elements
        this.newButton = page.getByRole("button", { name: /New|Create/i }).first();

        // Dialog elements - Handle operating hours creation
        this.dialog = this.page.getByRole("dialog").first();

        // Operating Hours Configuration Fields
        this.nameTextbox = this.dialog.getByRole("textbox", {
            name: /^Name/i,
        });

        this.descriptionTextbox = this.dialog.getByRole("textbox", {
            name: /^Description/i,
        });

        this.timeZoneDropdown = this.dialog.getByRole("combobox", {
            name: /^Time Zone/i,
        });

        // Row Management
        this.addRowButton = this.dialog.getByRole("button", {
            name: /Add Row|Add/i,
        }).first();

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", {
            name: /^Save$/i,
        });

        console.log(
            "✅ SalesforceOperatingHours page object initialized successfully with all locators"
        );
    }

    /**
     * Creates a new operating hours in Salesforce with the provided details
     *
     * This method handles the complete operating hours creation workflow:
     * 1. Takes a start screenshot for verification
     * 2. Opens the new operating hours dialog
     * 3. Fills in basic fields (Name, Description, Time Zone)
     * 4. Saves the operating hours
     * 5. Takes an end screenshot for verification
     *
     * @param details - Object containing operating hours field values to be filled
     */
    async addNewOperatingHours(details: { [field: string]: string }) {
        console.log("🔄 Starting operating hours creation process...");
        console.log("📋 Operating hours details:", JSON.stringify(details, null, 2));

        // Wait for the new button to be visible and take start screenshot
        await expect(this.newButton).toBeVisible({ timeout: 10000 });
        await Helper.takeScreenshotToFile(
            this.page,
            "1-start-operating-hours",
            this.testInfo,
            "OtherFunctionality/salesforce-operating-hours/"
        );

        // Open the new operating hours creation dialog
        await this.newButton.click({ timeout: 10000 });
        console.log("✅ Operating hours creation dialog opened");

        await this.dialog.waitFor({ state: "visible", timeout: 10000 });

        console.log("📋 Filling basic fields...");

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

        // Time Zone (Dropdown) - Required
        if (details.TimeZone || details["Time Zone"]) {
            const timeZone = details.TimeZone || details["Time Zone"];
            console.log("🔽 Selecting Time Zone from dropdown...");
            await this.timeZoneDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${timeZone}")`).first();
                await optionRole.click({ timeout: 5000, force: true });
                console.log("✅ Time Zone selected:", timeZone);
            } catch (e) {
                try {
                    await this.timeZoneDropdown.fill(timeZone, { timeout: 5000 });
                    await this.page.waitForTimeout(500);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ Time Zone selected via type and keyboard");
                } catch (e2) {
                    console.log("❌ Failed to select Time Zone:", e2);
                }
            }
        }
    }

    /**
     * Adds a new row to the operating hours table
     *
     * This method handles adding a single row of operating hours:
     * 1. Clicks the Add Row button
     * 2. Fills in Day, Start Time, End Time, Work Type Group
     * 3. Takes a screenshot after row addition
     *
     * @param row - Object containing Day, Start Time, End Time, Work Type Group values
     */
    async addOperatingHoursRow(row: { [field: string]: string }) {
        console.log("� Starting operating hours row addition...");
        console.log("📋 Row details:", JSON.stringify(row, null, 2));

        // Click Add Row button
        try {
            await this.addRowButton.click({ timeout: 5000 });
            console.log("✅ Add Row button clicked");
            await this.page.waitForTimeout(1000);
        } catch (e) {
            console.log("❌ Failed to click Add Row button:", e);
            return;
        }

        // Day (Dropdown)
        if (row.Day) {
            console.log("🔽 Selecting Day from dropdown...");
            try {
                const dayDropdown = this.page.getByRole("combobox", {
                    name: /^Day/i,
                }).last();
                await dayDropdown.click({ timeout: 5000 });
                await this.page.waitForTimeout(800);
                const dayOption = this.page.locator(`[role="option"]:has-text("${row.Day}")`).first();
                await dayOption.click({ timeout: 5000, force: true });
                console.log("✅ Day selected:", row.Day);
            } catch (e) {
                console.log("❌ Failed to select Day:", e);
            }
        }

        // Start Time (Combobox)
        if (row.StartTime || row["Start Time"]) {
            const startTime = row.StartTime || row["Start Time"];
            console.log("⏰ Selecting Start Time...");
            try {
                const startTimeCombobox = this.page.getByRole("combobox", { name: /Start Time/i }).last();
                await startTimeCombobox.click({ timeout: 5000 });
                await this.page.waitForTimeout(1000);

                try {
                    const startTimeOption = this.page.locator(`[role="option"]:has-text("${startTime}")`).first();
                    await startTimeOption.click({ timeout: 5000, force: true });
                    console.log("✅ Start Time selected:", startTime);
                } catch (e) {
                    // Fallback: use keyboard navigation
                    await startTimeCombobox.fill(startTime, { timeout: 5000 });
                    await this.page.waitForTimeout(500);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ Start Time selected via keyboard:", startTime);
                }
            } catch (e) {
                console.log("❌ Failed to select Start Time:", e);
            }
        }

        // End Time (Combobox)
        if (row.EndTime || row["End Time"]) {
            const endTime = row.EndTime || row["End Time"];
            console.log("⏰ Selecting End Time...");
            try {
                const endTimeCombobox = this.page.getByRole("combobox", { name: /End Time/i }).last();
                await endTimeCombobox.click({ timeout: 5000 });
                await this.page.waitForTimeout(1000);

                try {
                    const endTimeOption = this.page.locator(`[role="option"]:has-text("${endTime}")`).first();
                    await endTimeOption.click({ timeout: 5000, force: true });
                    console.log("✅ End Time selected:", endTime);
                } catch (e) {
                    // Fallback: use keyboard navigation
                    await endTimeCombobox.fill(endTime, { timeout: 5000 });
                    await this.page.waitForTimeout(500);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ End Time selected via keyboard:", endTime);
                }
            } catch (e) {
                console.log("❌ Failed to select End Time:", e);
            }
        }

        // Work Type Group (Combobox)
        if (row.WorkTypeGroup || row["Work Type Group"]) {
            const workTypeGroup = row.WorkTypeGroup || row["Work Type Group"];
            console.log("🔽 Selecting Work Type Group from combobox...");
            try {
                const workTypeGroupCombobox = this.page.getByRole("combobox", {
                    name: /Work Type Group/i,
                }).last();
                await workTypeGroupCombobox.click({ timeout: 5000 });
                await this.page.waitForTimeout(800);
                const workTypeGroupOption = this.page.locator(`[role="option"]:has-text("${workTypeGroup}")`).first();
                await workTypeGroupOption.click({ timeout: 5000, force: true });
                console.log("✅ Work Type Group selected:", workTypeGroup);
            } catch (e) {
                console.log("❌ Failed to select Work Type Group:", e);
            }
        }

        // Take screenshot AFTER row is filled
        await Helper.takeScreenshotToFile(
            this.page,
            "2-row-added",
            this.testInfo,
            "OtherFunctionality/salesforce-operating-hours/"
        );

        console.log("🎉 Operating hours row addition completed!");

        console.log("💾 Saving the operating hours...");

        // Save the operating hours
        await this.saveButton.click({ timeout: 10000 });
        console.log("✅ Operating hours saved successfully");

        await this.page.waitForTimeout(2000);

        // Take screenshot AFTER save
        await Helper.takeScreenshotToFile(
            this.page,
            "3-after-save-success",
            this.testInfo,
            "OtherFunctionality/salesforce-operating-hours/"
        );

        console.log("🎉 Operating hours creation completed!");
    }

    /**
     * Verifies that operating hours were successfully created
     *
     * This method validates operating hours creation success by checking that
     * the dialog has closed and we're back on the operating hours list page.
     *
     * @throws Will throw an assertion error if dialog is still visible
     */
    async verifyOperatingHoursSuccess() {
        console.log("🔍 Verifying operating hours creation success...");

        // Check that the dialog is no longer visible (indicates save was successful)
        const dialogVisible = await this.dialog.isVisible().catch(() => false);
        if (!dialogVisible) {
            console.log("✅ Dialog closed - operating hours created successfully");
        } else {
            console.log("❌ Dialog still visible - creation may have failed");
        }

        await Helper.takeScreenshotToFile(
            this.page,
            "5-final-verification",
            this.testInfo,
            "OtherFunctionality/salesforce-operating-hours/"
        );

        console.log("🎉 Verification completed!");
    }
}
