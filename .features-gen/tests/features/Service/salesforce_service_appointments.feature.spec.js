// Generated from: tests\features\Service\salesforce_service_appointments.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Service Appointments Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Service Appointments with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@service-appointments', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Service Appointments" in app launcher', null, { page }); 
      await Then('Add new service appointment with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"HVAC System Maintenance"}]},{"cells":[{"value":"Status"},{"value":"Scheduled"}]},{"cells":[{"value":"Work Type"},{"value":"Maintenance"}]},{"cells":[{"value":"Parent Record"},{"value":"--None--"}]},{"cells":[{"value":"Account"},{"value":"Testing"}]},{"cells":[{"value":"Contact"},{"value":"--None--"}]},{"cells":[{"value":"Service Resource"},{"value":"--None--"}]},{"cells":[{"value":"Service Territory"},{"value":"--None--"}]},{"cells":[{"value":"Priority"},{"value":"Medium"}]},{"cells":[{"value":"Scheduled Start"},{"value":"15/11/2024 09:00 AM"}]},{"cells":[{"value":"Scheduled End"},{"value":"15/11/2024 11:00 AM"}]},{"cells":[{"value":"Due Date"},{"value":"15/11/2024"}]},{"cells":[{"value":"Duration"},{"value":"2"}]},{"cells":[{"value":"Duration Type"},{"value":"Hours"}]},{"cells":[{"value":"Street"},{"value":"123 Main St"}]},{"cells":[{"value":"City"},{"value":"New York"}]},{"cells":[{"value":"State"},{"value":"NY"}]},{"cells":[{"value":"Postal Code"},{"value":"10001"}]},{"cells":[{"value":"Country"},{"value":"USA"}]},{"cells":[{"value":"Description"},{"value":"Regular HVAC system maintenance"}]},{"cells":[{"value":"Additional Information"},{"value":"Customer requests morning slot"}]},{"cells":[{"value":"Emergency"},{"value":"false"}]}]}}, { page }); 
      await Then('Verify service appointment is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"HVAC System Maintenance"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_service_appointments.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":38,"tags":["@mode:serial","@service-appointments","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Service Appointments\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Service Appointments\"","children":[{"start":12,"value":"Service Appointments","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new service appointment with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then Verify service appointment is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end