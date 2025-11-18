import { createBdd } from "playwright-bdd";
import SalesforceServiceResourcesPage from "../../pages/Service/salesforceServiceResources";

const { Given, When, Then } = createBdd();

When(
  "Add new Service Resource with following details",
  async ({ page, $testInfo }, dataTable) => {
    const serviceResourcePage = new SalesforceServiceResourcesPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await serviceResourcePage.addNewServiceResource(details);
  }
);

Then(
  "Verify Service Resource is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const serviceResourcePage = new SalesforceServiceResourcesPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await serviceResourcePage.verifyServiceResourceCreation(details);
  }
);
