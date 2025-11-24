import { createBdd } from "playwright-bdd";
import SalesforceEngagementChannelTypesPage from "../../pages/Marketing/salesforceEngagementChannelTypes";

const { Given, When, Then } = createBdd();

When(
  "Add new engagement channel type with following details",
  async ({ page, $testInfo }, dataTable) => {
    const engagementChannelTypePage = new SalesforceEngagementChannelTypesPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await engagementChannelTypePage.addNewEngagementChannelType(details);
  }
);

Then(
  "Verify Engagement Channel Type is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const engagementChannelTypePage = new SalesforceEngagementChannelTypesPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await engagementChannelTypePage.verifyEngagementChannelTypeCreation(
      details
    );
  }
);
