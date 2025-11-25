import { createBdd } from "playwright-bdd";
import SalesforcePaymentGatewayLogsPage from "../../pages/Finance/salesforcePaymentGatewayLogs";

const { Then } = createBdd();

Then(
    "Add new payment gateway log with following details",
    async ({ page, $testInfo }, dataTable) => {
        console.log("📝 Step: Add new payment gateway log with following details");
        
        const paymentGatewayLogsPage = new SalesforcePaymentGatewayLogsPage(page, $testInfo);
        const details = dataTable.rowsHash();
        console.log("📦 Received gateway log details:", JSON.stringify(details, null, 2));
        
        // Click the New button to open the form
        const newButton = page.getByRole('button', { name: /^New$/ }).first();
        await newButton.click();
        await page.waitForTimeout(2000);
        
        // Fill the form
        await paymentGatewayLogsPage.addNewPaymentGatewayLog(details);
        
        // Save the form
        await paymentGatewayLogsPage.clickSave();
        
        console.log("✅ Step completed: Payment Gateway Log added");
    }
);

Then(
    "Verify payment gateway log is created successfully",
    async ({ page, $testInfo }, dataTable) => {
        console.log("📝 Step: Verify payment gateway log is created successfully");
        
        const paymentGatewayLogsPage = new SalesforcePaymentGatewayLogsPage(page, $testInfo);
        
        // Get details from dataTable if provided, otherwise pass undefined
        const details = dataTable ? dataTable.rowsHash() : undefined;
        
        // Verify the payment gateway log creation with optional details for field verification
        await paymentGatewayLogsPage.verifyPaymentGatewayLogSuccess(details);
        
        console.log("✅ Step completed: Payment Gateway Log verification successful");
    }
);
