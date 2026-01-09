import { createBdd } from "playwright-bdd";
import SalesforceDashboardsPage from "../../pages/Platform/salesforceDashboards";
const { Given, When, Then } = createBdd();

Then(
  "Create new dashboard with following details",
  async ({ page, $testInfo }, table) => {
    const dashboardPage = new SalesforceDashboardsPage(page, $testInfo);
    const details = table.rowsHash();
    await dashboardPage.createNewDashboard(details);
  }
);

Then("Save the dashboard", async ({ page, $testInfo }) => {
  const dashboardPage = new SalesforceDashboardsPage(page, $testInfo);
  await dashboardPage.saveButton.click({ timeout: 10000 });
});

Then(
  "Verify dashboard is created successfully",
  async ({ page, $testInfo }) => {
    const dashboardPage = new SalesforceDashboardsPage(page, $testInfo);
    await dashboardPage.verifyDashboardCreated();
  }
);
