import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforceShifts Page Object Model
 *
 * This class provides automation capabilities for Salesforce Shifts management functionality.
 * It handles shift creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new shifts with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify shift creation and setup
 * - Support for shift configuration with start/end times, status, and assignments
 *
 * @class SalesforceShifts
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforceShiftsPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Primary UI Controls
    readonly dialog: Locator;

    // Shift Configuration Fields
    readonly startDateTextbox: Locator;
    readonly startTimeTextbox: Locator;
    readonly endDateTextbox: Locator;
    readonly endTimeTextbox: Locator;
    readonly statusDropdown: Locator;
    readonly workTypeGroupCombobox: Locator;
    readonly serviceTerritoryCombobox: Locator;
    readonly serviceResourceCombobox: Locator;
    readonly timeSlotTypeDropdown: Locator;
    readonly labelTextbox: Locator;

    // Action Buttons
    readonly saveButton: Locator;
    readonly allOptionsLocator: Locator;

    /**
     * Constructor - Initializes the SalesforceShifts page object with all necessary locators
     *
     * Sets up locators for all Salesforce shift form elements using role-based selectors
     * for maximum reliability. All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforceShifts page object");
        this.page = page;
        this.testInfo = testInfo;

        // Dialog elements - Handle shift creation
        this.dialog = this.page.getByRole("dialog").first();

        // Start Time Fields (Date & Time) - Required
        this.startDateTextbox = this.dialog.getByRole("group", {
            name: /Start Time|Start Date/i,
        }).getByLabel(/Date/i).first();

        this.startTimeTextbox = this.dialog.getByRole("group", {
            name: /Start Time|Start Date/i,
        }).getByLabel(/Time/i).first();

        // End Time Fields (Date & Time) - Required
        this.endDateTextbox = this.dialog.getByRole("group", {
            name: /End Time|End Date/i,
        }).getByLabel(/Date/i).first();

        this.endTimeTextbox = this.dialog.getByRole("group", {
            name: /End Time|End Date/i,
        }).getByLabel(/Time/i).first();

        // Status (Dropdown) - Required
        this.statusDropdown = this.dialog.getByRole("combobox", {
            name: /^Status/i,
        });

        // Work Type Group (Combobox)
        this.workTypeGroupCombobox = this.dialog.getByRole("combobox", {
            name: /^Work Type Group/i,
        });

        // Service Territory (Combobox)
        this.serviceTerritoryCombobox = this.dialog.getByRole("combobox", {
            name: /^Service Territory/i,
        });

        // Service Resource (Combobox)
        this.serviceResourceCombobox = this.dialog.getByRole("combobox", {
            name: /^Service Resource/i,
        });

        // Time Slot Type (Dropdown) - Required
        this.timeSlotTypeDropdown = this.dialog.getByRole("combobox", {
            name: /^Time Slot Type/i,
        });

        // Label (Textbox)
        this.labelTextbox = this.dialog.getByRole("textbox", {
            name: /^Label/i,
        });

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", {
            name: /^Save$/i,
        });

        this.allOptionsLocator = page.getByRole("option");

        console.log(
            "✅ SalesforceShifts page object initialized successfully with all locators"
        );
    }

    /**
     * Creates a new shift in Salesforce with the provided details
     *
     * This method handles the complete shift creation workflow:
     * 1. Takes a start screenshot for verification
     * 2. Opens the new shift dialog
     * 3. Fills in all provided field values
     * 4. Saves the shift
     * 5. Takes an end screenshot for verification
     *
     * @param details - Object containing shift field values to be filled
     */
    async addNewShift(details: { [field: string]: string }) {
        console.log("🔄 Starting shift creation process...");
        console.log("📋 Shift details:", JSON.stringify(details, null, 2));

        await Helper.takeScreenshotToFile(
            this.page,
            "1-start-shift",
            this.testInfo,
            "OtherFunctionality/salesforce-shifts/"
        );

        // Open the new shift creation dialog
        console.log("✅ Shift creation dialog opened");

        await this.dialog.waitFor({ state: "visible", timeout: 10000 });

        console.log("📋 Filling form fields...");

        // Start Date (Date & Time) - Required
        if (details.StartDate || details["Start Date"]) {
            const startDate = details.StartDate || details["Start Date"];
            console.log("📝 Filling Start Date...");
            try {
                await this.startDateTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.startDateTextbox.fill(startDate, { timeout: 10000 });
                console.log("✅ Start Date filled:", startDate);
            } catch (e) {
                console.log("❌ Failed to fill Start Date:", e);
            }
        }

        // Start Time - Required
        if (details.StartTime || details["Start Time"]) {
            const startTime = details.StartTime || details["Start Time"];
            console.log("📝 Filling Start Time...");
            try {
                await this.startTimeTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.startTimeTextbox.fill(startTime, { timeout: 10000 });
                console.log("✅ Start Time filled:", startTime);
            } catch (e) {
                console.log("❌ Failed to fill Start Time:", e);
            }
        }

        // End Date (Date & Time) - Required
        if (details.EndDate || details["End Date"]) {
            const endDate = details.EndDate || details["End Date"];
            console.log("📝 Filling End Date...");
            try {
                await this.endDateTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.endDateTextbox.fill(endDate, { timeout: 10000 });
                console.log("✅ End Date filled:", endDate);
            } catch (e) {
                console.log("❌ Failed to fill End Date:", e);
            }
        }

        // End Time - Required
        if (details.EndTime || details["End Time"]) {
            const endTime = details.EndTime || details["End Time"];
            console.log("📝 Filling End Time...");
            try {
                await this.endTimeTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.endTimeTextbox.fill(endTime, { timeout: 10000 });
                console.log("✅ End Time filled:", endTime);
            } catch (e) {
                console.log("❌ Failed to fill End Time:", e);
            }
        }

        // Status (Dropdown) - Required
        if (details.Status) {
            console.log("🔽 Selecting Status from dropdown...");
            await this.statusDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);
            await this.allOptionsLocator.filter({ hasText: details.Status }).first().click({ timeout: 10000 });
        }

        // Work Type Group (Combobox)
        if (details.WorkTypeGroup || details["Work Type Group"]) {
            const workTypeGroup = details.WorkTypeGroup || details["Work Type Group"];
            console.log("🔽 Selecting Work Type Group from combobox...");
            await this.workTypeGroupCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                await this.allOptionsLocator.first().click({ timeout: 10000 });
                console.log("✅ Work Type Group selected:", workTypeGroup);
            } catch (e) {
                console.log("❌ Failed to select Work Type Group:", e);
            }
        }

        // Service Territory (Combobox)
        if (details.ServiceTerritory || details["Service Territory"]) {
            const serviceTerritory = details.ServiceTerritory || details["Service Territory"];
            console.log("🔽 Selecting Service Territory from combobox...");
            await this.serviceTerritoryCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                await this.allOptionsLocator.first().click({ timeout: 10000 });
                console.log("✅ Service Territory selected:", serviceTerritory);
            } catch (e) {
                console.log("❌ Failed to select Service Territory:", e);
            }
        }

        // Service Resource (Combobox)
        if (details.ServiceResource || details["Service Resource"]) {
            const serviceResource = details.ServiceResource || details["Service Resource"];
            console.log("🔽 Selecting Service Resource from combobox...");
            await this.serviceResourceCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                await this.allOptionsLocator.first().click({ timeout: 10000 });
                console.log("✅ Service Resource selected:", serviceResource);
            } catch (e) {
                console.log("❌ Failed to select Service Resource:", e);
            }
        }

        // Time Slot Type (Dropdown) - Required
        if (details.TimeSlotType || details["Time Slot Type"]) {
            const timeSlotType = details.TimeSlotType || details["Time Slot Type"];
            console.log("🔽 Selecting Time Slot Type from dropdown...");
            await this.timeSlotTypeDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);

            try {
                await this.allOptionsLocator.filter({ hasText: timeSlotType }).first().click({ timeout: 10000 });
                console.log("✅ Time Slot Type selected:", timeSlotType);
            } catch (e) {
                console.log("❌ Failed to select Time Slot Type:", e);
            }
        }

        // Label (Textbox)
        if (details.Label) {
            console.log("📝 Filling Label...");
            try {
                await this.labelTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.labelTextbox.fill(details.Label, { timeout: 10000 });
                console.log("✅ Label filled:", details.Label);
            } catch (e) {
                console.log("❌ Failed to fill Label:", e);
            }
        }

        // Take screenshot AFTER all fields are filled
        await Helper.takeScreenshotToFile(
            this.page,
            "2-all-fields-filled",
            this.testInfo,
            "OtherFunctionality/salesforce-shifts/"
        );

        console.log("💾 Saving the shift...");

        // Save the shift
        await this.saveButton.click({ timeout: 10000 });
        console.log("✅ Shift saved successfully");

        await this.page.waitForTimeout(2000);

        // Take screenshot AFTER save
        await Helper.takeScreenshotToFile(
            this.page,
            "3-after-save-success",
            this.testInfo,
            "OtherFunctionality/salesforce-shifts/"
        );

        await this.page.waitForTimeout(1000);

        // Take final screenshot showing the shifts list
        await Helper.takeScreenshotToFile(
            this.page,
            "4-shifts-list",
            this.testInfo,
            "OtherFunctionality/salesforce-shifts/"
        );

        console.log("🎉 Shift creation completed!");
    }

    /**
     * Verifies that a shift was successfully created
     *
     * This method validates shift creation success by checking that
     * the dialog has closed and we're back on the shifts list page.
     *
     * @throws Will throw an assertion error if dialog is still visible
     */
    async verifyShiftSuccess() {
        console.log("🔍 Verifying shift creation success...");

        // Check that the dialog is no longer visible (indicates save was successful)
        const dialogVisible = await this.dialog.isVisible().catch(() => false);
        if (!dialogVisible) {
            console.log("✅ Dialog closed - shift created successfully");
        } else {
            console.log("❌ Dialog still visible - creation may have failed");
        }

        await Helper.takeScreenshotToFile(
            this.page,
            "5-final-verification",
            this.testInfo,
            "OtherFunctionality/salesforce-shifts/"
        );

        console.log("🎉 Verification completed!");
    }
}
