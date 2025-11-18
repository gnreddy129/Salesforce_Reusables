import { createBdd } from "playwright-bdd";
import SalesforceCommunicationSubscriptionsPage from "../../pages/CustomerData/salesforceCommunicationSubscriptions";
const { Then } = createBdd();

Then(
  "Add new Communication Subscriptions with following details",
  async ({ page, $testInfo }, dataTable) => {
    const contactPage = new SalesforceCommunicationSubscriptionsPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await contactPage.addNewCommunicationSubscription(details);
  }
);

Then(
  "Verify Communication Subscriptions is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const contactPage = new SalesforceCommunicationSubscriptionsPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await contactPage.verifyCommunicationSubscriptionCreation(details);
  });
