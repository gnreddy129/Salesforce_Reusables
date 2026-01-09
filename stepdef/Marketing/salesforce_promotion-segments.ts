import { createBdd, DataTable } from "playwright-bdd";
import SalesforcePromotionSegmentsPage from "../../pages/Marketing/salesforcePromotionSegments";
const { Then } = createBdd();

Then(
  "Add new promotion segment with following details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const promotionSegmentPage = new SalesforcePromotionSegmentsPage(page, $testInfo);
    await promotionSegmentPage.addNewPromotionSegment(details);
  }
);

Then(
  "Verify promotion segment is created successfully with details",
  async ({ page, $testInfo }, dataTable: DataTable) => {
    const details = dataTable.rowsHash();
    const promotionSegmentPage = new SalesforcePromotionSegmentsPage(page, $testInfo);
    await promotionSegmentPage.verifyPromotionSegment(details);
  }
);
