import { createBdd } from "playwright-bdd";
import SalesforceServiceTerritoriesPage from "../../pages/Service/salesforceServiceTerritories";

const { Given, When, Then } = createBdd();

When(
  "Add new Service Territory with following details",
  async ({ page, $testInfo }, dataTable) => {
    const serviceTerritoryPage = new SalesforceServiceTerritoriesPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await serviceTerritoryPage.addNewServiceTerritory(details);
  }
);

Then(
  "Verify Service Territory is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const serviceTerritoryPage = new SalesforceServiceTerritoriesPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await serviceTerritoryPage.verifyServiceTerritoryCreation(details);
  }
);
