import { createBdd, DataTable } from "playwright-bdd";
import SalesforcePromotionSegmentsPage from "../../pages/Marketing/salesforcePromotionSegments";
const { Then } = createBdd();

/**
 * Step Definition: Add new promotion segment with following details
 * 
 * This step handles the creation of a new promotion segment with the provided data table.
 * Maps to the feature file step and interacts with the SalesforcePromotionSegmentsPage object.
 *
 * @example
 * Then Add new promotion segment with following details
 *   | Field | Value  |
 *   | Name  | Sample |
 */
Then(
  "Add new promotion segment with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const promotionSegmentPage = new SalesforcePromotionSegmentsPage(page, $testInfo);
    await promotionSegmentPage.addNewPromotionSegment(details);
  }
);

/**
 * Step Definition: Verify promotion segment is created successfully with details
 * 
 * This step validates that a promotion segment was successfully created with the expected data.
 * Maps to the feature file step and interacts with the SalesforcePromotionSegmentsPage object.
 *
 * @example
 * Then Verify promotion segment is created successfully with details
 *   | Field | Value  |
 *   | Name  | Sample |
 */
Then(
  "Verify promotion segment is created successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const promotionSegmentPage = new SalesforcePromotionSegmentsPage(page, $testInfo);
    await promotionSegmentPage.verifyPromotionSegment(details);
  }
);
