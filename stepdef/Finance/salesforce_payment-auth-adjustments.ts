import { createBdd } from "playwright-bdd";
import SalesforcePaymentAuthorizationAdjustmentsPage from "../../pages/Finance/salesforcePaymentAuthorizationAdjustments";

const { Then } = createBdd();

Then(
    "Add new payment authorization adjustment with following details",
    async ({ page, $testInfo }, dataTable) => {
        console.log("📝 Step: Add new payment authorization adjustment with following details");
        
        const paymentAuthAdjustmentsPage = new SalesforcePaymentAuthorizationAdjustmentsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        console.log("📦 Received adjustment details:", JSON.stringify(details, null, 2));
        
        // Click the New button to open the form
        const newButton = page.getByRole('button', { name: /^New$/ }).first();
        await newButton.click();
        await page.waitForTimeout(2000);
        
        // Fill the form
        await paymentAuthAdjustmentsPage.addNewPaymentAuthorizationAdjustment(details);
        
        // Save the form (this will wait for dialog to close)
        await paymentAuthAdjustmentsPage.clickSave();
        
        console.log("✅ Step completed: Payment Authorization Adjustment added");
    }
);

Then(
    "Verify payment authorization adjustment is created successfully",
    async ({ page, $testInfo }, dataTable) => {
        console.log("📝 Step: Verify payment authorization adjustment is created successfully");
        
        const paymentAuthAdjustmentsPage = new SalesforcePaymentAuthorizationAdjustmentsPage(page, $testInfo);
        
        // Get details from dataTable if provided, otherwise pass undefined
        const details = dataTable ? dataTable.rowsHash() : undefined;
        
        // Verify the payment authorization adjustment creation with optional details for field verification
        await paymentAuthAdjustmentsPage.verifyPaymentAuthAdjustmentSuccess(details);
        
        console.log("✅ Step completed: Payment Authorization Adjustment verification successful");
    }
);
