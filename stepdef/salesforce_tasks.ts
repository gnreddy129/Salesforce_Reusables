import { createBdd } from "playwright-bdd";
import { salesforceTasksLocators } from "../pages/salesforceTasks";
const { Then } = createBdd();

Then("Add new task with following details", async ({ page }, dataTable) => {
  const taskPage = new salesforceTasksLocators(page);
  const details = dataTable
    .rows()
    .reduce((acc: { [key: string]: string }, [field, value]) => {
      acc[field] = value;
      return acc;
    }, {});

  await taskPage.addNewTask(details);
  await taskPage.verifyTaskCreation(details.Subject);
});
