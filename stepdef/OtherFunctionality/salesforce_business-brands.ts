import { createBdd, DataTable } from "playwright-bdd";
import SalesforceBusinessBrandsPage from "../../pages/OtherFunctionality/salesforceBusinessBrands";

const { Given, Then } = createBdd();

/**
 * Step Definition: Add new business brand with following details
 *
 * This step handles the creation of a new business brand in Salesforce with provided details.
 * It initializes the page object and invokes the business brand creation workflow.
 *
 * @param dataTable - Cucumber DataTable with business brand field values
 *
 * @example
 * Given Add new business brand with following details
 *   | Name        | Premium Brand            |
 *   | Description | High-end premium brand line |
 */
Given(
  "Add new business brand with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log("📝 Step: Add new business brand with following details");

    const details = dataTable.rowsHash();
    console.log(
      "📦 Received business brand details:",
      JSON.stringify(details, null, 2)
    );

    // Initialize the page object
    const businessBrandsPage = new SalesforceBusinessBrandsPage(page, $testInfo);

    // Add the new business brand with provided details
    await businessBrandsPage.addNewBusinessBrand(details);

    console.log("✅ Step completed: Business brand added");
  }
);

/**
 * Step Definition: Verify business brand is created successfully with details
 *
 * This step validates that the business brand was successfully created by verifying
 * the presence of the provided field values in the Salesforce interface.
 *
 * @param dataTable - Cucumber DataTable with business brand field values to verify
 *
 * @example
 * Then Verify business brand is created successfully with details
 *   | Name        | Premium Brand            |
 *   | Description | High-end premium brand line |
 */
Then(
  "Verify business brand is created successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    console.log(
      "✔️ Step: Verify business brand is created successfully with details"
    );

    const details = dataTable.rowsHash();
    console.log("📦 Details to verify:", JSON.stringify(details, null, 2));

    // Initialize the page object
    const businessBrandsPage = new SalesforceBusinessBrandsPage(page, $testInfo);

    // Verify the business brand creation
    await businessBrandsPage.verifyBusinessBrand(details);

    console.log("✅ Step completed: Business brand verified");
  }
);
