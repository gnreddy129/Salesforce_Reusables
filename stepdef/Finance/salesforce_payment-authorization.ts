import { createBdd, DataTable } from "playwright-bdd";
import SalesforcePaymentAuthorization from "../../pages/Finance/salesforcePaymentAuthorization";

const { Given, When, Then } = createBdd();

Then(
    "Add new payment authorization with following details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const paymentAuthPage = new SalesforcePaymentAuthorization(page, $testInfo);
        const details = dataTable.rowsHash();
        
        // Click the New button to open the form
        const newButton = page.getByRole('button', { name: /^New$/ }).first();
        await newButton.click();
        await page.waitForTimeout(2000);
        await paymentAuthPage.createPaymentAuthorization(details);
    }
);

Then(
    "Verify payment authorization is created successfully with details",
    async ({ page, $testInfo }, dataTable: DataTable) => {
        const paymentAuthPage = new SalesforcePaymentAuthorization(page, $testInfo);
        const details = dataTable.rowsHash();
        await paymentAuthPage.verifyCreationSuccess();
    }
);
