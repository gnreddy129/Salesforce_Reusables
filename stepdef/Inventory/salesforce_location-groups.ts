import { createBdd } from "playwright-bdd";
import SalesforceLocationGroupsPage from "../../pages/Inventory/salesforceLocationGroups";
import {
  takeStepScreenshot,
  takeScenarioScreenshot,
} from "../../utils/screenshotHelper";

const { Given, When, Then } = createBdd();

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

    // Take screenshot after completing the step
    await takeStepScreenshot(page, $testInfo, "CREATE", "location-groups");

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

    // Take screenshot after completing the step
    await takeStepScreenshot(page, $testInfo, "VERIFY", "location-groups");

    console.log(`✅ Location Group verification step completed`);
  }
);
