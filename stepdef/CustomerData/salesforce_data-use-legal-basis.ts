import { createBdd } from "playwright-bdd";
import SalesforceDataUseLegalBasisPage from "../../pages/CustomerData/salesforceDataUseLegalBasis";

const { Given, When, Then } = createBdd();

// When steps
When(
  "Add new Data Use Legal Basis with following details",
  async ({ page, $testInfo }, dataTable) => {
    const dataUseLegalBasisPage = new SalesforceDataUseLegalBasisPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await dataUseLegalBasisPage.addNewDataUseLegalBasis(details);
  }
);

When(
  "Verify Data Use Legal Basis is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const dataUseLegalBasisPage = new SalesforceDataUseLegalBasisPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await dataUseLegalBasisPage.verifyDataUseLegalBasisCreation(details);
  }
);
