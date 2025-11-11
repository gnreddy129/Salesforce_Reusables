import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import SalesforceAlternativePaymentPage from "../../pages/Finance/salesforceAlternativePayment";

const { When, Then } = createBdd();

When(
  "I create a new alternative payment method with following details:",
  async ({ page }, table) => {
    const details = table.rowsHash();
    const pageObj = new SalesforceAlternativePaymentPage(page);
    await pageObj.addNewPaymentMethod(details);
  }
);

Then(
  "I should see the alternative payment method created successfully",
  async ({ page }, table) => {
    const details = table.rowsHash();
    const pageObj = new SalesforceAlternativePaymentPage(page);
    const success = await pageObj.verifyPaymentMethod(details);
  }
);
