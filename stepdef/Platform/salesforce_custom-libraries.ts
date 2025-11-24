import { createBdd } from "playwright-bdd";
import SalesforceCustomLibrariesPage from "../../pages/Platform/salesforceCustomLibraries";

const { Given, When, Then } = createBdd();

When(
  "Add new custom library with following details",
  async ({ page, $testInfo }, dataTable) => {
    const customLibraryPage = new SalesforceCustomLibrariesPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await customLibraryPage.addNewCustomLibrary(details);
  }
);

Then(
  "Verify Custom Library is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const customLibraryPage = new SalesforceCustomLibrariesPage(
      page,
      $testInfo
    );
    const details = dataTable.rowsHash();
    await customLibraryPage.verifyCustomLibraryCreation(details);
  }
);
