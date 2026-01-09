import { createBdd } from "playwright-bdd";
import { SalesforceTasksPage } from "../../pages/Platform/salesforceTasks";
const { Then } = createBdd();

Then(
  "Add new task with following details",
  async ({ page, $testInfo }, dataTable) => {
    const taskPage = new SalesforceTasksPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await taskPage.addNewTask(details);
  }
);

Then(
  "Verify task is created successfully with details",
  async ({ page, $testInfo }, dataTable) => {
    const taskPage = new SalesforceTasksPage(page, $testInfo);
    const details = dataTable.rowsHash();
    await taskPage.verifyTaskCreation(details.Subject);
  }
);
