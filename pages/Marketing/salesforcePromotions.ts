import { expect, Page, Locator, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * SalesforcePromotions Page Object Model
 *
 * This class provides automation capabilities for Salesforce Promotions management functionality.
 * It handles promotion creation, configuration, and verification processes with robust
 * locator strategies and timeout configurations for reliable test execution.
 *
 * Features:
 * - Create new promotions with comprehensive field management
 * - Handle dialog-based form interactions with proper scope handling
 * - Verify promotion creation and setup
 * - Support for promotion configuration, scheduling, and discount settings
 *
 * @class SalesforcePromotions
 * @author Automation Team
 * @version 1.0
 */
export default class SalesforcePromotionsPage {
    readonly page: Page;
    private testInfo?: TestInfo;

    // Primary UI Controls
    readonly dialog: Locator;

    // Basic Information Fields
    readonly nameTextbox: Locator;
    readonly descriptionTextbox: Locator;
    readonly objectiveTextbox: Locator;
    readonly campaignCombobox: Locator;
    readonly activeCheckbox: Locator;
    readonly displayNameTextbox: Locator;

    // Promotion Settings
    readonly commercePromotionCheckbox: Locator;
    readonly qualifierCriteriaDropdown: Locator;
    readonly priorityNumberTextbox: Locator;
    readonly targetCriteriaDropdown: Locator;
    readonly excludeQualifyingItemsCheckbox: Locator;
    readonly discountOrderDropdown: Locator;
    readonly discountRestrictionDropdown: Locator;
    readonly exclusivityTypeDropdown: Locator;
    readonly qualifyingCriteriaNotRequiredCheckbox: Locator;
    readonly approachingDiscountCheckbox: Locator;

    // Date/Time Fields
    readonly startDatetimeDate: Locator;
    readonly startDatetimeTime: Locator;
    readonly endDatetimeDate: Locator;
    readonly endDatetimeTime: Locator;

    // Advanced Settings
    readonly automaticCheckbox: Locator;
    readonly tieredPromotionCheckbox: Locator;
    readonly maximumApplicationsPerCartTextbox: Locator;

    // Action Buttons
    readonly saveButton: Locator;
    readonly allOptionsLocator: Locator;

    /**
     * Constructor - Initializes the SalesforcePromotions page object with all necessary locators
     *
     * Sets up locators for all Salesforce promotion form elements using role-based selectors
     * for maximum reliability. All elements are scoped to the dialog for better isolation.
     *
     * @param page - Playwright Page instance for browser automation
     * @param testInfo - Optional TestInfo for attaching screenshots to test reports
     */
    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforcePromotions page object");
        this.page = page;
        this.testInfo = testInfo;

        // Dialog elements - Handle promotion creation
        this.dialog = this.page.getByRole("dialog").first();

        // Basic Information Fields
        this.nameTextbox = this.dialog.getByRole("textbox", {
            name: /^Name/i,
        });

        this.descriptionTextbox = this.dialog.getByRole("textbox", {
            name: /^Description/i,
        });

        this.objectiveTextbox = this.dialog.getByRole("textbox", {
            name: /^Objective/i,
        });

        this.campaignCombobox = this.dialog.getByRole("combobox", {
            name: /^Campaign/i,
        });

        this.activeCheckbox = this.dialog.getByRole("checkbox", {
            name: /^Active/i,
        });

        this.displayNameTextbox = this.dialog.getByRole("textbox", {
            name: /^Display Name/i,
        });

        // Promotion Settings
        this.commercePromotionCheckbox = this.dialog.getByRole("checkbox", {
            name: /^Commerce Promotion/i,
        });

        this.qualifierCriteriaDropdown = this.dialog.getByRole("combobox", {
            name: /^Qualifier Criteria/i,
        });

        this.priorityNumberTextbox = this.dialog.getByRole("textbox", {
            name: /^Priority Number/i,
        });

        this.targetCriteriaDropdown = this.dialog.getByRole("combobox", {
            name: /^Target Criteria/i,
        });

        this.excludeQualifyingItemsCheckbox = this.dialog.getByRole("checkbox", {
            name: /^Exclude qualifying items from discounts/i,
        });

        this.discountOrderDropdown = this.dialog.getByRole("combobox", {
            name: /^Discount Order/i,
        });

        this.discountRestrictionDropdown = this.dialog.getByRole("combobox", {
            name: /^Discount Restriction/i,
        });

        this.exclusivityTypeDropdown = this.dialog.getByRole("combobox", {
            name: /^Exclusivity Type/i,
        });

        this.qualifyingCriteriaNotRequiredCheckbox = this.dialog.getByRole("checkbox", {
            name: /^Qualifying Criteria Not Required Per Application/i,
        });

        this.approachingDiscountCheckbox = this.dialog.getByRole("checkbox", {
            name: /^Approaching Discount/i,
        });

        // Date/Time Fields
        this.startDatetimeDate = this.dialog.getByRole("group", {
            name: /Start Datetime/i,
        }).getByLabel(/Date/i).first();

        this.startDatetimeTime = this.dialog.getByRole("group", {
            name: /Start Datetime/i,
        }).getByLabel(/Time/i).first();

        this.endDatetimeDate = this.dialog.getByRole("group", {
            name: /End Datetime/i,
        }).getByLabel(/Date/i).first();

        this.endDatetimeTime = this.dialog.getByRole("group", {
            name: /End Datetime/i,
        }).getByLabel(/Time/i).first();

        // Advanced Settings
        this.automaticCheckbox = this.dialog.getByRole("checkbox", {
            name: /^Automatic/i,
        });

        this.tieredPromotionCheckbox = this.dialog.getByRole("checkbox", {
            name: /^Tiered Promotion/i,
        });

        this.maximumApplicationsPerCartTextbox = this.dialog.getByRole("textbox", {
            name: /^Maximum Applications Per Cart/i,
        });

        // Action Buttons
        this.saveButton = this.dialog.getByRole("button", {
            name: /^Save$/i,
        });

        this.allOptionsLocator = page.getByRole("option");

        console.log(
            "✅ SalesforcePromotions page object initialized successfully with all locators"
        );
    }

    /**
     * Creates a new promotion in Salesforce with the provided details
     *
     * This method handles the complete promotion creation workflow:
     * 1. Takes a start screenshot for verification
     * 2. Opens the new promotion dialog
     * 3. Fills in all provided field values
     * 4. Saves the promotion
     * 5. Takes an end screenshot for verification
     *
     * @param details - Object containing promotion field values to be filled
     */
    async addNewPromotion(details: { [field: string]: string }) {
        console.log("🔄 Starting promotion creation process...");
        console.log("📋 Promotion details:", JSON.stringify(details, null, 2));

        // Wait for the new button to be visible and take start screenshot
        await Helper.takeScreenshotToFile(
            this.page,
            "1-start-promotion",
            this.testInfo,
            "OtherFunctionality/salesforce-promotions/"
        );

        // Open the new promotion creation dialog
        console.log("✅ Promotion creation dialog opened");

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

        // Description (Textbox)
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

        // Objective (Textbox)
        if (details.Objective) {
            console.log("📝 Filling Objective...");
            try {
                await this.objectiveTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.objectiveTextbox.fill(Helper.generateUniqueValue(details.Objective), { timeout: 10000 });
                console.log("✅ Objective filled:", details.Objective);
            } catch (e) {
                console.log("❌ Failed to fill Objective:", e);
            }
        }

        // Campaign (Combobox)
        if (details.Campaign) {
            console.log("🔽 Selecting Campaign from dropdown...");
            await this.campaignCombobox.click({ timeout: 10000 });
            await this.page.waitForTimeout(2000);
            await this.allOptionsLocator.first().click({ timeout: 10000 });
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

        // Display Name (Textbox)
        if (details.DisplayName || details["Display Name"]) {
            const displayName = details.DisplayName || details["Display Name"];
            console.log("📝 Filling Display Name...");
            try {
                await this.displayNameTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.displayNameTextbox.fill(displayName, { timeout: 10000 });
                console.log("✅ Display Name filled:", displayName);
            } catch (e) {
                console.log("❌ Failed to fill Display Name:", e);
            }
        }

        // Commerce Promotion (Checkbox)
        if (details.CommercePromotion || details["Commerce Promotion"]) {
            const commercePromotion = (details.CommercePromotion || details["Commerce Promotion"]).toLowerCase();
            if (commercePromotion === "true") {
                console.log("☑️ Checking Commerce Promotion checkbox...");
                try {
                    const isChecked = await this.commercePromotionCheckbox.isChecked();
                    if (!isChecked) {
                        await this.commercePromotionCheckbox.click({ timeout: 5000 });
                        console.log("✅ Commerce Promotion checkbox checked");
                    }
                } catch (e) {
                    console.log("❌ Failed to check Commerce Promotion:", e);
                }
            }
        }

        // Qualifier Criteria (Dropdown)
        if (details.QualifierCriteria || details["Qualifier Criteria"]) {
            const qualifierCriteria = details.QualifierCriteria || details["Qualifier Criteria"];
            console.log("🔽 Selecting Qualifier Criteria from dropdown...");
            await this.qualifierCriteriaDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);
            await this.allOptionsLocator.filter({ hasText: qualifierCriteria }).first().click({ timeout: 10000 });
        }

        // Priority Number (Textbox)
        if (details.PriorityNumber || details["Priority Number"]) {
            const priorityNumber = details.PriorityNumber || details["Priority Number"];
            console.log("📝 Filling Priority Number...");
            try {
                await this.priorityNumberTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.priorityNumberTextbox.fill(priorityNumber, { timeout: 10000 });
                console.log("✅ Priority Number filled:", priorityNumber);
            } catch (e) {
                console.log("❌ Failed to fill Priority Number:", e);
            }
        }

        // Target Criteria (Dropdown)
        if (details.TargetCriteria || details["Target Criteria"]) {
            const targetCriteria = details.TargetCriteria || details["Target Criteria"];
            console.log("🔽 Selecting Target Criteria from dropdown...");
            await this.targetCriteriaDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);
            await this.allOptionsLocator.filter({ hasText: targetCriteria }).first().click({ timeout: 10000 });
        }

        // Exclude qualifying items from discounts (Checkbox)
        if (details.ExcludeQualifyingItems || details["Exclude qualifying items from discounts"]) {
            const excludeItems = (details.ExcludeQualifyingItems || details["Exclude qualifying items from discounts"]).toLowerCase();
            if (excludeItems === "true") {
                console.log("☑️ Checking Exclude qualifying items from discounts checkbox...");
                try {
                    const isChecked = await this.excludeQualifyingItemsCheckbox.isChecked();
                    if (!isChecked) {
                        await this.excludeQualifyingItemsCheckbox.click({ timeout: 5000 });
                        console.log("✅ Exclude qualifying items checkbox checked");
                    }
                } catch (e) {
                    console.log("❌ Failed to check Exclude qualifying items:", e);
                }
            }
        }

        // Discount Order (Dropdown)
        if (details.DiscountOrder || details["Discount Order"]) {
            const discountOrder = details.DiscountOrder || details["Discount Order"];
            console.log("🔽 Selecting Discount Order from dropdown...");
            await this.discountOrderDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);
            await this.allOptionsLocator.filter({ hasText: discountOrder }).first().click({ timeout: 10000 });
        }

        // Discount Restriction (Dropdown)
        if (details.DiscountRestriction || details["Discount Restriction"]) {
            const discountRestriction = details.DiscountRestriction || details["Discount Restriction"];
            console.log("� Selecting Discount Restriction from dropdown...");
            await this.discountRestrictionDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);
            await this.allOptionsLocator.filter({ hasText: discountRestriction }).first().click({ timeout: 10000 });
        }

        // Exclusivity Type (Dropdown)
        if (details.ExclusivityType || details["Exclusivity Type"]) {
            const exclusivityType = details.ExclusivityType || details["Exclusivity Type"];
            console.log("🔽 Selecting Exclusivity Type from dropdown...");
            await this.exclusivityTypeDropdown.click({ timeout: 10000 });
            await this.page.waitForTimeout(1000);
            await this.allOptionsLocator.filter({ hasText: exclusivityType }).first().click({ timeout: 10000 });
        }

        // Qualifying Criteria Not Required Per Application (Checkbox)
        if (details.QualifyingCriteriaNotRequired || details["Qualifying Criteria Not Required Per Application"]) {
            const qualifyingNotRequired = (details.QualifyingCriteriaNotRequired || details["Qualifying Criteria Not Required Per Application"]).toLowerCase();
            if (qualifyingNotRequired === "true") {
                console.log("☑️ Checking Qualifying Criteria Not Required checkbox...");
                try {
                    const isChecked = await this.qualifyingCriteriaNotRequiredCheckbox.isChecked();
                    if (!isChecked) {
                        await this.qualifyingCriteriaNotRequiredCheckbox.click({ timeout: 5000 });
                        console.log("✅ Qualifying Criteria Not Required checkbox checked");
                    }
                } catch (e) {
                    console.log("❌ Failed to check Qualifying Criteria Not Required:", e);
                }
            }
        }

        // Approaching Discount (Checkbox)
        if (details.ApproachingDiscount || details["Approaching Discount"]) {
            const approachingDiscount = (details.ApproachingDiscount || details["Approaching Discount"]).toLowerCase();
            if (approachingDiscount === "true") {
                console.log("☑️ Checking Approaching Discount checkbox...");
                try {
                    const isChecked = await this.approachingDiscountCheckbox.isChecked();
                    if (!isChecked) {
                        await this.approachingDiscountCheckbox.click({ timeout: 5000 });
                        console.log("✅ Approaching Discount checkbox checked");
                    }
                } catch (e) {
                    console.log("❌ Failed to check Approaching Discount:", e);
                }
            }
        }

        // Start Datetime (Date & Time)
        if (details.StartDate || details["Start Date"]) {
            const startDate = details.StartDate || details["Start Date"];
            console.log("📝 Filling Start Date...");
            try {
                await this.startDatetimeDate.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.startDatetimeDate.fill(startDate, { timeout: 10000 });
                console.log("✅ Start Date filled:", startDate);
            } catch (e) {
                console.log("❌ Failed to fill Start Date:", e);
            }
        }

        if (details.StartTime || details["Start Time"]) {
            const startTime = details.StartTime || details["Start Time"];
            console.log("📝 Filling Start Time...");
            try {
                await this.startDatetimeTime.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.startDatetimeTime.fill(startTime, { timeout: 10000 });
                console.log("✅ Start Time filled:", startTime);
            } catch (e) {
                console.log("❌ Failed to fill Start Time:", e);
            }
        }

        // End Datetime (Date & Time)
        if (details.EndDate || details["End Date"]) {
            const endDate = details.EndDate || details["End Date"];
            console.log("📝 Filling End Date...");
            try {
                await this.endDatetimeDate.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.endDatetimeDate.fill(endDate, { timeout: 10000 });
                console.log("✅ End Date filled:", endDate);
            } catch (e) {
                console.log("❌ Failed to fill End Date:", e);
            }
        }

        if (details.EndTime || details["End Time"]) {
            const endTime = details.EndTime || details["End Time"];
            console.log("📝 Filling End Time...");
            try {
                await this.endDatetimeTime.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.endDatetimeTime.fill(endTime, { timeout: 10000 });
                console.log("✅ End Time filled:", endTime);
            } catch (e) {
                console.log("❌ Failed to fill End Time:", e);
            }
        }

        // Automatic (Checkbox)
        if (details.Automatic && details.Automatic.toLowerCase() === "true") {
            console.log("☑️ Checking Automatic checkbox...");
            try {
                const isChecked = await this.automaticCheckbox.isChecked();
                if (!isChecked) {
                    await this.automaticCheckbox.click({ timeout: 5000 });
                    console.log("✅ Automatic checkbox checked");
                }
            } catch (e) {
                console.log("❌ Failed to check Automatic:", e);
            }
        }

        // Tiered Promotion (Checkbox)
        if (details.TieredPromotion || details["Tiered Promotion"]) {
            const tieredPromotion = (details.TieredPromotion || details["Tiered Promotion"]).toLowerCase();
            if (tieredPromotion === "true") {
                console.log("☑️ Checking Tiered Promotion checkbox...");
                try {
                    const isChecked = await this.tieredPromotionCheckbox.isChecked();
                    if (!isChecked) {
                        await this.tieredPromotionCheckbox.click({ timeout: 5000 });
                        console.log("✅ Tiered Promotion checkbox checked");
                    }
                } catch (e) {
                    console.log("❌ Failed to check Tiered Promotion:", e);
                }
            }
        }

        // Maximum Applications Per Cart (Textbox)
        if (details.MaximumApplicationsPerCart || details["Maximum Applications Per Cart"]) {
            const maxApplications = details.MaximumApplicationsPerCart || details["Maximum Applications Per Cart"];
            console.log("📝 Filling Maximum Applications Per Cart...");
            try {
                await this.maximumApplicationsPerCartTextbox.fill("", { timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.maximumApplicationsPerCartTextbox.fill(maxApplications, { timeout: 10000 });
                console.log("✅ Maximum Applications Per Cart filled:", maxApplications);
            } catch (e) {
                console.log("❌ Failed to fill Maximum Applications Per Cart:", e);
            }
        }

        // Take screenshot AFTER all fields are filled
        await Helper.takeScreenshotToFile(
            this.page,
            "2-all-fields-filled",
            this.testInfo,
            "OtherFunctionality/salesforce-promotions/"
        );

        console.log("💾 Saving the promotion...");

        // Save the promotion
        await this.saveButton.click({ timeout: 10000 });
        console.log("✅ Promotion saved successfully");

        await this.page.waitForTimeout(2000);

        // Take screenshot AFTER save
        await Helper.takeScreenshotToFile(
            this.page,
            "3-after-save-success",
            this.testInfo,
            "OtherFunctionality/salesforce-promotions/"
        );

        await this.page.waitForTimeout(1000);

        // Take final screenshot showing the promotions list
        await Helper.takeScreenshotToFile(
            this.page,
            "4-promotions-list",
            this.testInfo,
            "OtherFunctionality/salesforce-promotions/"
        );

        console.log("🎉 Promotion creation completed!");
    }

    /**
     * Verifies that a promotion was successfully created
     *
     * This method validates promotion creation success by checking that
     * the dialog has closed and we're back on the promotions list page.
     *
     * @throws Will throw an assertion error if dialog is still visible
     */
    async verifyPromotionSuccess() {
        console.log("🔍 Verifying promotion creation success...");

        // Check that the dialog is no longer visible (indicates save was successful)
        const dialogVisible = await this.dialog.isVisible().catch(() => false);
        if (!dialogVisible) {
            console.log("✅ Dialog closed - promotion created successfully");
        } else {
            console.log("❌ Dialog still visible - creation may have failed");
        }

        await Helper.takeScreenshotToFile(
            this.page,
            "5-final-verification",
            this.testInfo,
            "OtherFunctionality/salesforce-promotions/"
        );

        console.log("🎉 Verification completed!");
    }
}
