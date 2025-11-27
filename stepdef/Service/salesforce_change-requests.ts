import { createBdd } from "playwright-bdd";
import SalesforceChangeRequestsPage from "../../pages/Service/salesforceChangeRequests";

const { Given, When, Then } = createBdd();

When(
  "Add new Change Request with the following details:",
  async ({ page, $testInfo }, dataTable) => {
    console.log("🔄 Creating new Change Request with provided details");
    const changeRequestsPage = new SalesforceChangeRequestsPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await changeRequestsPage.addNewChangeRequest(details);
  }
);

Then(
  "Verify Change Request is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    console.log("🔍 Verifying Change Request creation success");
    const changeRequestsPage = new SalesforceChangeRequestsPage(
      page,
      $testInfo
    );
    const expectedDetails = dataTable.rowsHash();
    await changeRequestsPage.verifyChangeRequestCreation(expectedDetails);
  }
);
