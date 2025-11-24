import { createBdd, DataTable } from "playwright-bdd";
import SalesforceImagesPage from "../../pages/OtherFunctionality/salesforceImages";
const { Given, When, Then } = createBdd();

Then(
  "Add new Image with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const images = new SalesforceImagesPage(page, $testInfo);
    await images.addNewImage(dataTable.rowsHash());
  }
);

Then(
  "Verify Image is created successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const images = new SalesforceImagesPage(page, $testInfo);
    await images.verifyImage(dataTable.rowsHash());
  }
);
