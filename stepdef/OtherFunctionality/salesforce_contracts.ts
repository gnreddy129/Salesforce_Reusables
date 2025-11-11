import { createBdd } from "playwright-bdd";
import SalesforceContractsPage from "../../pages/OtherFunctionality/salesforceContracts";

const { Given, When, Then } = createBdd();

Then(
  "Add new contract with following details",
  async ({ page, $testInfo }, dataTable) => {
    const details = dataTable.rowsHash();
    const contractsPage = new SalesforceContractsPage(page, $testInfo);
    await contractsPage.addNewContract(details);
  }
);

Then(
  "Verify contract is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const contractsPage = new SalesforceContractsPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await contractsPage.verifyContract(details);
  }
);
