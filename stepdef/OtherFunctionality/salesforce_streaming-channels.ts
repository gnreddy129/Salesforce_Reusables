import { createBdd } from "playwright-bdd";
import SalesforceStreamingChannelsPage from "../../pages/OtherFunctionality/salesforceStreamingChannels";

const { Given, When, Then } = createBdd();

When(
  "Add new streaming channel with following details",
  async ({ page, $testInfo }, dataTable) => {
    const streamingChannelPage = new SalesforceStreamingChannelsPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await streamingChannelPage.addNewStreamingChannel(details);
  }
);

Then(
  "Verify Streaming Channel is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const streamingChannelPage = new SalesforceStreamingChannelsPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await streamingChannelPage.verifyStreamingChannelCreation(details);
  }
);
