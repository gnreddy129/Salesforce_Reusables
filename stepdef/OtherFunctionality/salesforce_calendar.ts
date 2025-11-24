import { expect } from "@playwright/test";
import { createBdd, DataTable } from "playwright-bdd";
import SalesforceCalendarPage from "../../pages/OtherFunctionality/salesforceCalendar";

const { Given, When, Then } = createBdd();

Then(
  "Add new calendar event with the following details:",
  async ({ page , $testInfo }, dataTable: DataTable) => {
    const catalogue = new SalesforceCalendarPage(page ,$testInfo);
    await catalogue.addNewCalendarEvent(dataTable.rowsHash());
  }
);

Then(
  "Verify the calendar event is created successfully with details",
  async ({ page , $testInfo }, dataTable: DataTable) => {
    const catalogue = new SalesforceCalendarPage(page , $testInfo);
    await catalogue.verifyCalendarEvent(dataTable.rowsHash());
  }
);
