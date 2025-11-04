import { createBdd } from "playwright-bdd";
import { salesforceContactsLocators } from "../pages/salesforceContacts";
const { Then } = createBdd();

Then("Add new contact with following details", async ({ page }, dataTable) => {
  const contactPage = new salesforceContactsLocators(page);
  const details = dataTable
    .rows()
    .reduce((acc: { [key: string]: string }, [field, value]) => {
      acc[field] = value;
      return acc;
    }, {});

  await contactPage.addNewContact(details);
  await contactPage.verifyContactDetails(details);
});
