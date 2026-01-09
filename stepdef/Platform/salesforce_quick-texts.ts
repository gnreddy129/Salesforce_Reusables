import { createBdd } from "playwright-bdd";
import SalesforceQuickTextsPage from "../../pages/Platform/salesforceQuickTexts";
const { Then } = createBdd();

Then(
    "Add new quick text with following details",
    async ({ page, $testInfo }, dataTable) => {
        const quickTextPage = new SalesforceQuickTextsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        console.log("📊 Data received:", JSON.stringify(details, null, 2));

        await quickTextPage.addNewQuickText(details);
        console.log("✅ Quick text creation step completed");
    }
);

Then(
    "Verify quick text is created successfully with details",
    async ({ page, $testInfo }, dataTable) => {
        const quickTextPage = new SalesforceQuickTextsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        console.log("📊 Data to verify:", JSON.stringify(details, null, 2));

        const nameToVerify = details.QuickTextName || details.Name || "";
        if (nameToVerify) {
            await quickTextPage.verifyQuickTextCreation(nameToVerify);
        }
        console.log("✅ Verification step completed");
    }
);
