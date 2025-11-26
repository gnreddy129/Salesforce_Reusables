import { createBdd, DataTable } from 'playwright-bdd';
import SalesforceIncidentsPage from '../../pages/Service/salesforceIncidents';

const { Given, When, Then } = createBdd();

When('Add new incident with following details', async ({ page }, table: DataTable) => {
  const details = table.rowsHash();
  const incidents = new SalesforceIncidentsPage(page);

  // normalize 'today' keywords to actual date
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();
  const dateStr = `${mm}/${dd}/${yyyy}`;

  const data = {
    shortDescription: details.ShortDescription,
    description: details.Description,
    status: details.Status,
    urgency: details.Urgency,
    impact: details.Impact,
    priority: details.Priority,
    detectedDate: details.DetectedDate === 'Today' ? dateStr : details.DetectedDate,
    detectedTime: details.DetectedTime,
    startDate: details.StartDate === 'Today' ? dateStr : details.StartDate,
    startTime: details.StartTime,
  };

  await incidents.addNewIncident(data);
});

Then('Verify incident is created successfully with details', async ({ page }, table) => {
  const details = table.rowsHash();
  const incidents = new SalesforceIncidentsPage(page);
  await incidents.verifyNewlyCreatedIncident(details.ShortDescription);
});