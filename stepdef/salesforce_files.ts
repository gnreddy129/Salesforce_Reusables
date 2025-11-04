import { createBdd } from "playwright-bdd";
const { Given, When, Then } = createBdd();
import { SalesforceFilesLocators } from "../pages/salesforceFiles";
const testData = require("../testdata/userDetails.json");

let filesPage: SalesforceFilesLocators;

When(
  "Upload file {string} with following details",
  async ({ page }, fileName: string, dataTable) => {
    filesPage = new SalesforceFilesLocators(page);
    const details = dataTable.rowsHash(); // Use hashes instead of rowsHash for table with headers
    await filesPage.uploadFile(fileName, details);
  }
);

Then("Verify file is uploaded successfully", async ({ page }, dataTable) => {
  const filesPage = new SalesforceFilesLocators(page);
  const details = dataTable.rowsHash(); // Use hashes instead of rowsHash for table with headers
  await filesPage.verifyFileUploadSuccess(details.Title);
});
