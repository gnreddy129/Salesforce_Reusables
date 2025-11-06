import { createBdd } from "playwright-bdd";
const { Given, When, Then } = createBdd();
import SalesforceFilesPage from "../../pages/OtherFunctionality/salesforceFiles";

let filesPage: SalesforceFilesPage;

When(
  "Upload file {string} with following details",
  async ({ page , $testInfo }, fileName: string, dataTable) => {
    filesPage = new SalesforceFilesPage(page , $testInfo);
    const details = dataTable.rowsHash(); // Use hashes instead of rowsHash for table with headers
    await filesPage.uploadFile(fileName, details);
  }
);

Then("Verify file is uploaded successfully", async ({ page , $testInfo }, dataTable) => {
  const filesPage = new SalesforceFilesPage(page , $testInfo);
  const details = dataTable.rowsHash(); // Use hashes instead of rowsHash for table with headers
  await filesPage.verifyFileUploadSuccess(details.Title);
});
