import { createBdd, DataTable } from "playwright-bdd";
import SalesforceAppointmentCategoryPage from "../../pages/OtherFunctionality/salesforceAppointmentCategory";
const { Then } = createBdd();

Then(
  "Add new appointment category with following details",
  async ({ page }, dataTable: DataTable) => {
    const pageObj = new SalesforceAppointmentCategoryPage(page);
    await pageObj.addNewAppointmentCategory(dataTable.rowsHash());
  }
);

Then(
  "Verify appointment category is created successfully",
  async ({ page }, dataTable: DataTable) => {
    const pageObj = new SalesforceAppointmentCategoryPage(page);
    await pageObj.verifyAppointmentCategory(dataTable.rowsHash());
  }
);
