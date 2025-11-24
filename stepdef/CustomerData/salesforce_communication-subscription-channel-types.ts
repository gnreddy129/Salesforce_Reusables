import { createBdd } from "playwright-bdd";
import SalesforceCommunicationSubscriptionChannelTypesPage from "../../pages/CustomerData/salesforceCommunicationSubscriptionChannelTypes";

const { Given, When, Then } = createBdd();

When(
  "Add new communication subscription channel type with following details",
  async ({ page, $testInfo }, dataTable) => {
    const communicationSubscriptionChannelTypePage =
      new SalesforceCommunicationSubscriptionChannelTypesPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await communicationSubscriptionChannelTypePage.addNewCommunicationSubscriptionChannelType(
      details
    );
  }
);

Then(
  "Verify Communication Subscription Channel Type is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const communicationSubscriptionChannelTypePage =
      new SalesforceCommunicationSubscriptionChannelTypesPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await communicationSubscriptionChannelTypePage.verifyCommunicationSubscriptionChannelTypeCreation(
      details
    );
  }
);
