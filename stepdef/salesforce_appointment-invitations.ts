import { createBdd, DataTable } from "playwright-bdd";
import SalesforceAppointmentInvitation from "../pages/salesforceAppointmentInvitation";
const { Then } = createBdd();

Then(
  "Add new appointment invitation with following details",
  async ({ page }, dataTable: DataTable) => {
    const salesforce = new SalesforceAppointmentInvitation(page);
    const details = dataTable.rowsHash();
    await salesforce.addNewAppointmentInvitation(details);
  }
);

Then(
  "Verify appointment invitation is created successfully with details",
  async ({ page }, dataTable: DataTable) => {
    const salesforce = new SalesforceAppointmentInvitation(page);
    const details = dataTable.rowsHash();
    await salesforce.verifyInvitation(details);
  }
);
