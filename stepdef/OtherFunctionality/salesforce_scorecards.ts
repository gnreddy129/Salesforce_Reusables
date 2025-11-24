import { createBdd } from "playwright-bdd";
import SalesforceScorecardsPage from "../../pages/OtherFunctionality/salesforceScoreCards";

const { Given, When, Then } = createBdd();

When(
  "Add new scorecard with following details",
  async ({ page, $testInfo }, dataTable) => {
    const scorecardPage = new SalesforceScorecardsPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await scorecardPage.addNewScorecard(details);
  }
);

Then(
  "Verify Scorecard is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const scorecardPage = new SalesforceScorecardsPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await scorecardPage.verifyScorecardCreation(details);
  }
);
