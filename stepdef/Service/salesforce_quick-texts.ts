import { createBdd } from "playwright-bdd";
import SalesforceQuickTextsPage from "../../pages/Service/salesforceQuickTexts";
const { Then } = createBdd();

/**
 * Step Definition File for Quick Texts
 *
 * This file defines the step definitions for the Quick Texts feature.
 * Each step corresponds to actions in the feature file and interacts with
 * the SalesforceQuickTextsPage page object.
 *
 * Supported Steps:
 * - "Add new quick text with following details" - Creates a new quick text with provided data
 * - "Verify quick text is created successfully with details" - Verifies quick text creation
 *
 * @author Automation Team
 * @version 1.0
 */

/**
 * Step: Add new quick text with following details
 *
 * This step creates a new quick text in Salesforce with the provided data.
 * The data is provided as a DataTable with Field-Value pairs.
 *
 * @example
 * Then Add new quick text with following details
 *   | Field           | Value                  |
 *   | QuickTextName   | Order Confirmation     |
 *   | QuickTextBody   | Order has been placed  |
 *   | Description     | Standard confirmation  |
 *   | Status          | Active                 |
 *   | Owner           | John Smith             |
 */
Then(
    "Add new quick text with following details",
    async ({ page, $testInfo }, dataTable) => {
        const quickTextPage = new SalesforceQuickTextsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        console.log("📋 Step: Add new quick text with following details");
        console.log("📊 Data received:", JSON.stringify(details, null, 2));

        // Click the New button to open the form
        const newQuickTextButton = page.getByRole("button", { name: "New Quick Text" });
        await newQuickTextButton.click();
        await page.waitForTimeout(2000);

        // Create the quick text with provided details
        await quickTextPage.addNewQuickText(details);

        // Verify creation was successful
        const nameToVerify = details.QuickTextName || details.Name || "";
        if (nameToVerify) {
            await quickTextPage.verifyQuickTextCreation(nameToVerify);
        }

        console.log("✅ Quick text creation step completed");
    }
);

/**
 * Step: Verify quick text is created successfully with details
 *
 * This step verifies that a quick text was created successfully by checking
 * if it appears in the quick texts list with the expected name.
 *
 * @example
 * Then Verify quick text is created successfully with details
 *   | Field           | Value                |
 *   | QuickTextName   | Order Confirmation   |
 */
Then(
    "Verify quick text is created successfully with details",
    async ({ page, $testInfo }, dataTable) => {
        const quickTextPage = new SalesforceQuickTextsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        console.log("✅ Step: Verify quick text is created successfully");
        console.log("📊 Data to verify:", JSON.stringify(details, null, 2));

        // Verify the quick text creation
        const nameToVerify = details.QuickTextName || details.Name || "";
        if (nameToVerify) {
            await quickTextPage.verifyQuickTextCreation(nameToVerify);
        }

        console.log("✅ Verification step completed");
    }
);
