import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import SalesforceContentPage from "../../pages/OtherFunctionality/salesforceContent";

const { Given, When, Then } = createBdd();

/**
 * Step Definitions for Salesforce CMS Content Workspace Creation
 *
 * This file contains step definitions for automating CMS workspace creation
 * in Salesforce Lightning interface. Based on MCP analysis of the 3-step
 * workspace creation wizard with comprehensive field support.
 *
 * Supported Features:
 * - Complete CMS workspace creation workflow
 * - Multi-step wizard navigation (Name/Describe → Add Channels → Select Languages)
 * - Form validation and error handling
 * - Success verification and workspace access
 * - Negative testing scenarios
 *
 * @author Automation Team
 * @version 1.0
 */

When(
  "I create a new CMS workspace with the following details:",
  async ({ page, $testInfo }, dataTable) => {
    console.log("🎯 Step: Creating new CMS workspace with provided details");
    const details = dataTable.rowsHash();
    const contentPage = new SalesforceContentPage(page, $testInfo);
    await contentPage.addNewWorkspace(details);
  }
);

Then(
  "I should see the CMS workspace creation success",
  async ({ page, $testInfo }, dataTable) => {
    console.log("🎯 Step: Verifying CMS workspace creation success");
    const details = dataTable.rowsHash();
    const contentPage = new SalesforceContentPage(page, $testInfo);
    await contentPage.verifyWorkspaceCreation(details);
  }
);
