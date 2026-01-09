import { createBdd } from "playwright-bdd";
import SalesforceLocationGroupsPage from "../../pages/Inventory/salesforceLocationGroups";

const { When, Then } = createBdd();

When(
  "Add new Location Group with following details",
  async ({ page, $testInfo }, dataTable) => {
    console.log(`🎯 Starting Location Group creation step`);

    const locationGroupsPage = new SalesforceLocationGroupsPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await locationGroupsPage.addNewLocationGroup(details);
    console.log(`✅ Location Group creation step completed`);
  }
);

Then(
  "Verify Location Group is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    console.log(`🎯 Starting Location Group verification step`);

    const locationGroupsPage = new SalesforceLocationGroupsPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await locationGroupsPage.verifyLocationGroupCreation(details);

    console.log(`✅ Location Group verification step completed`);
  }
);
