import { createBdd } from "playwright-bdd";
import { SalesforceDashboardsLocators } from "../pages/salesforceDashboards";
import { Page } from "@playwright/test";

const { Given, When, Then } = createBdd();

Then("Create new dashboard with following details", async ({ page }, table) => {
  const dashboardPage = new SalesforceDashboardsLocators(page);
  const details = table.rowsHash();
  await dashboardPage.createNewDashboard(details);
});

Then("Save the dashboard", async ({ page }) => {
  const dashboardPage = new SalesforceDashboardsLocators(page);
  await dashboardPage.saveButton.click();
});

Then("Verify dashboard is created successfully", async ({ page }) => {
  const dashboardPage = new SalesforceDashboardsLocators(page);
  await dashboardPage.verifyDashboardCreated();
});
