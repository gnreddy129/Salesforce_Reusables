import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import SalesforceRefundLinePaymentsPage from "../../pages/Finance/salesforceRefundLinePayments";

const { Given, When, Then } = createBdd();


When(
  "I create a new refund line payment with the following details:",
  async ({ page }, table) => {
    const details = table.rowsHash();
    const pageObj = new SalesforceRefundLinePaymentsPage(page);
    await pageObj.addNewRefundLinePayment(details);
  }
);

Then(
  "I should see the refund line payment created successfully",
  async ({ page }, table) => {
    const details = table.rowsHash();
    const pageObj = new SalesforceRefundLinePaymentsPage(page);
    const success = await pageObj.verifyRefundLinePayment(details);
  }
);
