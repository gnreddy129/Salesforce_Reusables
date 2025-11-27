import { createBdd, DataTable } from "playwright-bdd";
import SalesforceServiceContractsPage from "../../pages/Service/salesforceServiceContracts";

const { Given, Then } = createBdd();

/**
 * Step Definition: Add new service contract with following details
 *
 * This step handles the creation of a new service contract in Salesforce with provided details.
 * It initializes the page object and invokes the service contract creation workflow.
 *
 * @param dataTable - Cucumber DataTable with service contract field values
 *
 * @example
 * Given Add new service contract with following details
 *   | Contract Name       | SC-001           |
 *   | Account Name        | Acme Corp        |
 *   | Start Date          | 31/12/2024       |
 *   | End Date            | 31/12/2025       |
 */
Given(
  "Add new service contract with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log("📝 Step: Add new service contract with following details");

    const details = dataTable.rowsHash();
    console.log("📦 Received service contract details:", JSON.stringify(details, null, 2));

    // Initialize the page object
    const serviceContractsPage = new SalesforceServiceContractsPage(page, $testInfo);

    // Add the new service contract with provided details
    await serviceContractsPage.addNewServiceContract(details);

    console.log("✅ Step completed: Service contract added");
  }
);

/**
 * Step Definition: Verify service contract is created successfully
 *
 * This step validates that the service contract was successfully created by checking
 * that the dialog has closed and we're back on the service contracts list.
 *
 * @example
 * Then Verify service contract is created successfully
 */
Then(
  "Verify service contract is created successfully",
  async ({ page, $testInfo }) => {
    console.log("📝 Step: Verify service contract is created successfully");

    // Initialize the page object
    const serviceContractsPage = new SalesforceServiceContractsPage(page, $testInfo);

    // Verify the service contract creation
    await serviceContractsPage.verifyServiceContractSuccess();

    console.log("✅ Step completed: Service contract verification successful");
  }
);
