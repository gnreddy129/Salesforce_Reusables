import { createBdd } from "playwright-bdd";
import { TestInfo } from '@playwright/test';
import { SalesforceProblemsPage } from '../../pages/Service/salesforceProblems';

const { Then } = createBdd();

Then("Add new problem with following details",
    async ({ page, $testInfo }, dataTable) => {
        const problemsPage = new SalesforceProblemsPage(page, $testInfo as TestInfo);
        const details = dataTable.rowsHash();
        console.log('   Details:', details);
        await problemsPage.createProblem(details);
    }
);

Then("Verify problem {string} exists in the list",
    async ({ page, $testInfo }, Category: string) => {
        const problemsPage = new SalesforceProblemsPage(page, $testInfo as TestInfo);
        await problemsPage.verifyProblemCreation(Category);
    }
);