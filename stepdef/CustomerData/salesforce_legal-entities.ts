import { createBdd } from "playwright-bdd";
import SalesforceLegalEntitiesPage from "../../pages/CustomerData/salesforceLegalEntities";

const { Given, When, Then } = createBdd();

When(
  "Add new Legal Entities with following details",
  async ({ page, $testInfo }, dataTable) => {
    const legalEntitiesPage = new SalesforceLegalEntitiesPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await legalEntitiesPage.addNewLegalEntities(details);
  }
);

Then(
  "Verify Legal Entities are created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const legalEntitiesPage = new SalesforceLegalEntitiesPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await legalEntitiesPage.verifyLegalEntitiesCreation(details);
  }
);
