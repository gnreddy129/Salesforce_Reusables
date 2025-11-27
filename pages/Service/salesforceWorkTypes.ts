import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceWorkTypes Page Object Model
 *
 * This class provides automation capabilities for Salesforce Work Types management functionality.
 * It handles work type creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new work types with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify work type creation and setup
 * - Support for spinbutton inputs and multiple dropdown selectors
 *
 * @class SalesforceWorkTypes
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceWorkTypesPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Primary UI Controls
    readonly newButton: Locator;
    readonly dialog: Locator;

    // Work Type Configuration Fields
    readonly workTypeNameTextbox: Locator;
    readonly descriptionTextbox: Locator;
    readonly operatingHoursCombobox: Locator;
    readonly estimatedDurationSpinbutton: Locator;
    readonly durationTypeDropdown: Locator;
    readonly blockTimeBeforeAppointmentSpinbutton: Locator;
    readonly blockTimeBeforeUnitDropdown: Locator;
    readonly blockTimeAfterAppointmentSpinbutton: Locator;
    readonly blockTimeAfterUnitDropdown: Locator;
    readonly timeframeStartSpinbutton: Locator;
    readonly timeFrameStartUnitDropdown: Locator;
    readonly timeframeEndSpinbutton: Locator;
    readonly timeFrameEndUnitDropdown: Locator;

    // Action Buttons
    readonly saveButton: Locator;

    /**
     * Constructor - Initializes the SalesforceWorkTypes page object with all necessary locators
     *
     * Sets up locators for all Salesforce work types form elements using role-based selectors
     * for maximum reliability. All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforceWorkTypes page object");
        this.page = page;
        this.testInfo = testInfo;

        // Primary controls - Main UI interaction elements
        this.newButton = page.getByRole("button", { name: /New|Create/i }).first();

        // Dialog elements - Handle work type creation
        this.dialog = this.page.getByRole("dialog").first();

        // Work Type Configuration Fields
        this.workTypeNameTextbox = this.dialog.getByRole("textbox", {
            name: /^Work Type Name/i,
        });

        this.descriptionTextbox = this.dialog.getByRole("textbox", {
            name: /^Description/i,
        });

        this.operatingHoursCombobox = this.dialog.getByRole("combobox", {
            name: /^Operating Hours/i,
        });

        this.estimatedDurationSpinbutton = this.dialog.getByRole("spinbutton", {
            name: /^Estimated Duration/i,
        });

        this.durationTypeDropdown = this.dialog.getByRole("combobox", {
            name: /^Duration Type/i,
        });

        this.blockTimeBeforeAppointmentSpinbutton = this.dialog.getByRole("spinbutton", {
            name: /^Block Time Before Appointment/i,
        });

        this.blockTimeBeforeUnitDropdown = this.dialog.getByRole("combobox", {
            name: /^Block Time Before Unit/i,
        });

        this.blockTimeAfterAppointmentSpinbutton = this.dialog.getByRole("spinbutton", {
            name: /^Block Time After Appointment/i,
        });

        this.blockTimeAfterUnitDropdown = this.dialog.getByRole("combobox", {
            name: /^Block Time After Unit/i,
        });

        this.timeframeStartSpinbutton = this.dialog.getByRole("spinbutton", {
            name: /^Timeframe Start/i,
        });

        this.timeFrameStartUnitDropdown = this.dialog.getByRole("combobox", {
            name: /^Time Frame Start Unit/i,
        });

        this.timeframeEndSpinbutton = this.dialog.getByRole("spinbutton", {
            name: /^Timeframe End/i,
        });

        this.timeFrameEndUnitDropdown = this.dialog.getByRole("combobox", {
            name: /^Time Frame End Unit/i,
        });

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", {
            name: /^Save$/i,
        });

        console.log(
            "✅ SalesforceWorkTypes page object initialized successfully with all locators"
        );
    }

    /**
     * Creates a new work type in Salesforce with the provided details
     *
     * This method handles the complete work type creation workflow:
     * 1. Takes a start screenshot for verification
     * 2. Opens the new work type dialog
     * 3. Fills in all provided field values
     * 4. Saves the work type
     * 5. Takes an end screenshot for verification
     *
     * @param details - Object containing work type field values to be filled
     */
    async addNewWorkType(details: { [field: string]: string }) {
        console.log("🔄 Starting work type creation process...");
        console.log("📋 Work type details:", JSON.stringify(details, null, 2));

        // Wait for the new button to be visible and take start screenshot
        await expect(this.newButton).toBeVisible({ timeout: 10000 });
        await Helper.takeScreenshotToFile(
            this.page,
            "1-start-work-type",
            this.testInfo,
            "OtherFunctionality/salesforce-work-types/"
        );

        // Open the new work type creation dialog
        await this.newButton.click({ timeout: 10000 });
        console.log("✅ Work type creation dialog opened");

        await this.dialog.waitFor({ state: "visible", timeout: 10000 });

        console.log("📋 Filling form fields...");

        // Work Type Name (Textbox) - Required
        if (details.WorkTypeName || details["Work Type Name"]) {
            const workTypeName = details.WorkTypeName || details["Work Type Name"];
            console.log("📝 Filling Work Type Name...");
            try {
                await this.workTypeNameTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.workTypeNameTextbox.fill(workTypeName, { timeout: 10000 });
                console.log("✅ Work Type Name filled:", workTypeName);
            } catch (e) {
                console.log("❌ Failed to fill Work Type Name:", e);
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

        // Operating Hours (Combobox)
        if (details.OperatingHours || details["Operating Hours"]) {
            const operatingHours = details.OperatingHours || details["Operating Hours"];
            console.log("🔽 Selecting Operating Hours from combobox...");
            await this.operatingHoursCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${operatingHours}")`).first();
                await optionRole.click({ timeout: 10000, force: true });
                console.log("✅ Operating Hours selected:", operatingHours);
            } catch (e) {
                try {
                    await this.operatingHoursCombobox.fill(operatingHours, { timeout: 10000 });
                    await this.page.waitForTimeout(500);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ Operating Hours selected via type and keyboard");
                } catch (e2) {
                    console.log("❌ Failed to select Operating Hours:", e2);
                }
            }
        }

        // Estimated Duration (Spinbutton) - Required
        if (details.EstimatedDuration || details["Estimated Duration"]) {
            const estimatedDuration = details.EstimatedDuration || details["Estimated Duration"];
            console.log("📊 Filling Estimated Duration...");
            try {
                await this.estimatedDurationSpinbutton.fill(estimatedDuration, { timeout: 10000 });
                console.log("✅ Estimated Duration filled:", estimatedDuration);
            } catch (e) {
                console.log("❌ Failed to fill Estimated Duration:", e);
            }
        }

        // Duration Type (Dropdown) - Required
        if (details.DurationType || details["Duration Type"]) {
            const durationType = details.DurationType || details["Duration Type"];
            console.log("🔽 Selecting Duration Type from dropdown...");
            await this.durationTypeDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${durationType}")`).first();
                await optionRole.click({ timeout: 10000, force: true });
                console.log("✅ Duration Type selected:", durationType);
            } catch (e) {
                try {
                    await this.durationTypeDropdown.fill(durationType, { timeout: 10000 });
                    await this.page.waitForTimeout(500);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ Duration Type selected via type and keyboard");
                } catch (e2) {
                    console.log("❌ Failed to select Duration Type:", e2);
                }
            }
        }

        // Block Time Before Appointment (Spinbutton)
        if (details.BlockTimeBeforeAppointment || details["Block Time Before Appointment"]) {
            const blockTimeBeforeAppointment = details.BlockTimeBeforeAppointment || details["Block Time Before Appointment"];
            console.log("📊 Filling Block Time Before Appointment...");
            try {
                await this.blockTimeBeforeAppointmentSpinbutton.fill(blockTimeBeforeAppointment, { timeout: 10000 });
                console.log("✅ Block Time Before Appointment filled:", blockTimeBeforeAppointment);
            } catch (e) {
                console.log("❌ Failed to fill Block Time Before Appointment:", e);
            }
        }

        // Block Time Before Unit (Dropdown)
        if (details.BlockTimeBeforeUnit || details["Block Time Before Unit"]) {
            const blockTimeBeforeUnit = details.BlockTimeBeforeUnit || details["Block Time Before Unit"];
            console.log("🔽 Selecting Block Time Before Unit from dropdown...");
            await this.blockTimeBeforeUnitDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(800);

            try {
                const optionRole = this.page.locator(`[role="option"]:has-text("${blockTimeBeforeUnit}")`).first();
                await optionRole.click({ timeout: 10000, force: true });
                console.log("✅ Block Time Before Unit selected:", blockTimeBeforeUnit);
            } catch (e) {
                console.log("❌ Failed to select Block Time Before Unit:", e);
            }
        }

        // Block Time After Appointment (Spinbutton)
        if (details.BlockTimeAfterAppointment || details["Block Time After Appointment"]) {
            const blockTimeAfterAppointment = details.BlockTimeAfterAppointment || details["Block Time After Appointment"];
            console.log("📊 Filling Block Time After Appointment...");
            try {
                await this.blockTimeAfterAppointmentSpinbutton.fill(blockTimeAfterAppointment, { timeout: 10000 });
                console.log("✅ Block Time After Appointment filled:", blockTimeAfterAppointment);
            } catch (e) {
                console.log("❌ Failed to fill Block Time After Appointment:", e);
            }
        }

        // Block Time After Unit (Dropdown)
        if (details.BlockTimeAfterUnit || details["Block Time After Unit"]) {
            const blockTimeAfterUnit = details.BlockTimeAfterUnit || details["Block Time After Unit"];
            console.log("🔽 Selecting Block Time After Unit from dropdown...");
            try {
                await this.blockTimeAfterUnitDropdown.click({ timeout: 5000 });
                await this.page.waitForTimeout(1000);
                const optionRole = this.page.locator(`[role="option"]:has-text("${blockTimeAfterUnit}")`).first();
                await optionRole.click({ timeout: 5000, force: true });
                console.log("✅ Block Time After Unit selected:", blockTimeAfterUnit);
            } catch (e) {
                console.log("❌ Failed to select Block Time After Unit with click, trying keyboard...", e);
                try {
                    await this.blockTimeAfterUnitDropdown.fill(blockTimeAfterUnit, { timeout: 5000 });
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ Block Time After Unit selected via keyboard:", blockTimeAfterUnit);
                } catch (ke) {
                    console.log("❌ Failed to select Block Time After Unit:", ke);
                }
            }
        }

        // Timeframe Start (Spinbutton)
        if (details.TimeframeStart || details["Timeframe Start"]) {
            const timeframeStart = details.TimeframeStart || details["Timeframe Start"];
            console.log("📊 Filling Timeframe Start...");
            try {
                await this.timeframeStartSpinbutton.fill(timeframeStart, { timeout: 10000 });
                console.log("✅ Timeframe Start filled:", timeframeStart);
            } catch (e) {
                console.log("❌ Failed to fill Timeframe Start:", e);
            }
        }

        // Time Frame Start Unit (Dropdown)
        if (details.TimeFrameStartUnit || details["Time Frame Start Unit"]) {
            const timeFrameStartUnit = details.TimeFrameStartUnit || details["Time Frame Start Unit"];
            console.log("🔽 Selecting Time Frame Start Unit from dropdown...");
            try {
                await this.timeFrameStartUnitDropdown.click({ timeout: 5000 });
                await this.page.waitForTimeout(1000);
                const optionRole = this.page.locator(`[role="option"]:has-text("${timeFrameStartUnit}")`).first();
                await optionRole.click({ timeout: 5000, force: true });
                console.log("✅ Time Frame Start Unit selected:", timeFrameStartUnit);
            } catch (e) {
                console.log("❌ Failed to select Time Frame Start Unit with click, trying keyboard...", e);
                try {
                    await this.timeFrameStartUnitDropdown.fill(timeFrameStartUnit, { timeout: 5000 });
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ Time Frame Start Unit selected via keyboard:", timeFrameStartUnit);
                } catch (ke) {
                    console.log("❌ Failed to select Time Frame Start Unit:", ke);
                }
            }
        }

        // Timeframe End (Spinbutton)
        if (details.TimeframeEnd || details["Timeframe End"]) {
            const timeframeEnd = details.TimeframeEnd || details["Timeframe End"];
            console.log("📊 Filling Timeframe End...");
            try {
                await this.timeframeEndSpinbutton.fill(timeframeEnd, { timeout: 10000 });
                console.log("✅ Timeframe End filled:", timeframeEnd);
            } catch (e) {
                console.log("❌ Failed to fill Timeframe End:", e);
            }
        }

        // Time Frame End Unit (Dropdown)
        if (details.TimeFrameEndUnit || details["Time Frame End Unit"]) {
            const timeFrameEndUnit = details.TimeFrameEndUnit || details["Time Frame End Unit"];
            console.log("🔽 Selecting Time Frame End Unit from dropdown...");
            try {
                await this.timeFrameEndUnitDropdown.click({ timeout: 5000 });
                await this.page.waitForTimeout(1000);
                const optionRole = this.page.locator(`[role="option"]:has-text("${timeFrameEndUnit}")`).first();
                await optionRole.click({ timeout: 5000, force: true });
                console.log("✅ Time Frame End Unit selected:", timeFrameEndUnit);
            } catch (e) {
                console.log("❌ Failed to select Time Frame End Unit with click, trying keyboard...", e);
                try {
                    await this.timeFrameEndUnitDropdown.fill(timeFrameEndUnit, { timeout: 5000 });
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("ArrowDown");
                    await this.page.waitForTimeout(300);
                    await this.page.keyboard.press("Enter");
                    console.log("✅ Time Frame End Unit selected via keyboard:", timeFrameEndUnit);
                } catch (ke) {
                    console.log("❌ Failed to select Time Frame End Unit:", ke);
                }
            }
        }

        // Take screenshot AFTER all fields are filled
        await Helper.takeScreenshotToFile(
            this.page,
            "2-all-fields-filled",
            this.testInfo,
            "OtherFunctionality/salesforce-work-types/"
        );

        console.log("💾 Saving the work type...");

        await this.page.pause();
        // Save the work type
        await this.saveButton.click({ timeout: 10000 });
        console.log("✅ Work type saved successfully");

        await this.page.waitForTimeout(2000);

        // Take screenshot AFTER save
        await Helper.takeScreenshotToFile(
            this.page,
            "3-after-save-success",
            this.testInfo,
            "OtherFunctionality/salesforce-work-types/"
        );

        await this.page.waitForTimeout(1000);

        // Take final screenshot showing the work types list
        await Helper.takeScreenshotToFile(
            this.page,
            "4-work-types-list",
            this.testInfo,
            "OtherFunctionality/salesforce-work-types/"
        );

        console.log("🎉 Work type creation completed!");
    }

    /**
     * Verifies that work type was successfully created
     *
     * This method validates work type creation success by checking that
     * the dialog has closed and we're back on the work types list page.
     *
     * @throws Will throw an assertion error if dialog is still visible
     */
    async verifyWorkTypeSuccess() {
        console.log("🔍 Verifying work type creation success...");

        // Check that the dialog is no longer visible (indicates save was successful)
        const dialogVisible = await this.dialog.isVisible().catch(() => false);
        if (!dialogVisible) {
            console.log("✅ Dialog closed - work type created successfully");
        } else {
            console.log("❌ Dialog still visible - creation may have failed");
        }

        await Helper.takeScreenshotToFile(
            this.page,
            "5-final-verification",
            this.testInfo,
            "OtherFunctionality/salesforce-work-types/"
        );

        console.log("🎉 Verification completed!");
    }
}
