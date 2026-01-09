import { createBdd } from "playwright-bdd";
import SalesforceContactRequestsPage from "../../pages/CustomerData/salesforceContactRequests";

const { Then } = createBdd();

Then(
  "Add new Contact Request with following details",
  async ({ page, $testInfo }, dataTable) => {
    const contactRequestsPage = new SalesforceContactRequestsPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await contactRequestsPage.addNewContactRequest(details);
  }
);

Then(
  "Verify Contact Request is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const contactRequestsPage = new SalesforceContactRequestsPage(
      page,
      $testInfo
    );
    await contactRequestsPage.verifyContactRequestCreation();
  }
);
