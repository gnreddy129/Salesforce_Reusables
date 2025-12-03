import { createBdd } from "playwright-bdd";
import { SalesforceContactsPage } from "../../pages/CustomerData/salesforceContacts";
const { Then } = createBdd();

Then(
  "Fill Contacts fields with following details:",
  async ({ page, $testInfo }, dataTable) => {
    const contactPage = new SalesforceContactsPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await contactPage.addNewContact(details);
    await contactPage.verifyContactDetails(details);
  }
);
