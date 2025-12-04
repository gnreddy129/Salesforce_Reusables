import { createBdd, DataTable } from "playwright-bdd";
import SalesforceServiceAppointmentsPage from "../../pages/Service/salesforceServiceAppointments";

const { Given, When, Then } = createBdd();

Then(
  "Fill Service Appointments fields with following details:",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const serviceAppointments = new SalesforceServiceAppointmentsPage(page, $testInfo);
    await serviceAppointments.addNewServiceAppointment(dataTable.rowsHash());
  }
);

Then(
  "Verify service appointment is created successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const serviceAppointments = new SalesforceServiceAppointmentsPage(
      page,
      $testInfo
    );
    await serviceAppointments.verifyServiceAppointment(dataTable.rowsHash());
  }
);
