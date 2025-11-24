import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import SalesforceConsumptionSchedulesPage from "../../pages/OtherFunctionality/salesforceConsumptionSchedules";

const { Given, When, Then } = createBdd();

Then(
  "I create a new consumption schedule with the following details:",
  async ({ page, $testInfo }, dataTable) => {
    const details = dataTable.rowsHash();
    const contractsPage = new SalesforceConsumptionSchedulesPage(
      page,
      $testInfo
    );
    await contractsPage.addNewConsumptionSchedule(details);
  }
);

Then(
  "I should see the consumption schedule details",
  async ({ page, $testInfo }, dataTable) => {
    const contractsPage = new SalesforceConsumptionSchedulesPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await contractsPage.verifyConsumptionSchedule(details);
  }
);
