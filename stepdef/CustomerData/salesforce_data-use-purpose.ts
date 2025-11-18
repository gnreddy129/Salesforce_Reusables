import { createBdd } from "playwright-bdd";
import SalesforceDataUsePurposePage from "../../pages/CustomerData/salesforceDataUsePurpose";
const { Given, When, Then } = createBdd();

// When steps
When(
  "Add new Data Use Purpose with following details",
  async ({ page, $testInfo }, dataTable) => {
    const dataUsePurposePage = new SalesforceDataUsePurposePage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await dataUsePurposePage.addNewDataUsePurpose(details);
  }
);

When(
  "Verify Data Use Purpose is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const dataUsePurposePage = new SalesforceDataUsePurposePage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await dataUsePurposePage.verifyDataUsePurposeCreation(details);
  }
);
