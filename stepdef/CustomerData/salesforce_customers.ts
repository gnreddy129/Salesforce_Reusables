import { createBdd } from "playwright-bdd";
import SalesforceCustomersPage from "../../pages/CustomerData/salesforceCustomers";
const { Given, When, Then } = createBdd();

Then(
  "Add new customer with following details",
  async ({ page, $testInfo }, dataTable) => {
    const customersPage = new SalesforceCustomersPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await customersPage.addNewCustomer(details);
  }
);

Then(
  "Verify customer is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const customersPage = new SalesforceCustomersPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await customersPage.verifyCustomer(details);
  }
);
