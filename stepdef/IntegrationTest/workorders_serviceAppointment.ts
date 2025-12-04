import { createBdd } from 'playwright-bdd';
const { Then } = createBdd();
import Integrations from '../../pages/IntegrationTest/integrations';
let integrations: Integrations;

Then("Click on New button of Service Appointments in work Orders page", async ({ page }) => {
    integrations = new Integrations(page);
    await integrations.addNewServiceAppointment();
});