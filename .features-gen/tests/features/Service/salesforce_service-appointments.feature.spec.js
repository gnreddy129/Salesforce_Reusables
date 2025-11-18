// Generated from: tests\features\Service\salesforce_service-appointments.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Service Appointments Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Service Appointments with Comprehensive Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@service-appointments', '@regression', '@comprehensive'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Service Appointments" in app launcher', null, { page }); 
      await Then('Add new service appointment with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Description"},{"value":"Regular HVAC system maintenance for office building"}]},{"cells":[{"value":"Contact"},{"value":"--None--"}]},{"cells":[{"value":"ParentRecordType"},{"value":"Account"}]},{"cells":[{"value":"ParentRecord"},{"value":"Tech Solutions Inc 2025"}]},{"cells":[{"value":"Status"},{"value":"Scheduled"}]},{"cells":[{"value":"Subject"},{"value":"HVAC System Maintenance"}]},{"cells":[{"value":"WorkType"},{"value":"--None--"}]},{"cells":[{"value":"AppointmentType"},{"value":"--None--"}]},{"cells":[{"value":"Duration"},{"value":"120"}]},{"cells":[{"value":"DurationType"},{"value":"Hours"}]},{"cells":[{"value":"AdditionalInformation"},{"value":"Customer requests morning appointment"}]},{"cells":[{"value":"Comment"},{"value":"Bring standard HVAC tools"}]},{"cells":[{"value":"CancellationReason"},{"value":"--None--"}]},{"cells":[{"value":"EarliestStartPermittedDate"},{"value":"15/12/2025"}]},{"cells":[{"value":"EarliestStartPermittedTime"},{"value":"8:00 am"}]},{"cells":[{"value":"DueDate"},{"value":"16/12/2025"}]},{"cells":[{"value":"DueTime"},{"value":"7:00 pm"}]},{"cells":[{"value":"ArrivalWindowStartDate"},{"value":"15/12/2025"}]},{"cells":[{"value":"ArrivalWindowStartTime"},{"value":"9:00 am"}]},{"cells":[{"value":"ArrivalWindowEndDate"},{"value":"15/12/2025"}]},{"cells":[{"value":"ArrivalWindowEndTime"},{"value":"10:00 pm"}]},{"cells":[{"value":"ScheduledStartDate"},{"value":"15/12/2025"}]},{"cells":[{"value":"ScheduledStartTime"},{"value":"9:30 am"}]},{"cells":[{"value":"ScheduledEndDate"},{"value":"15/12/2025"}]},{"cells":[{"value":"ScheduledEndTime"},{"value":"11:30 pm"}]},{"cells":[{"value":"ActualStartDate"},{"value":"--None--"}]},{"cells":[{"value":"ActualStartTime"},{"value":"--None--"}]},{"cells":[{"value":"ActualEndDate"},{"value":"--None--"}]},{"cells":[{"value":"ActualEndTime"},{"value":"--None--"}]},{"cells":[{"value":"ActualDuration"},{"value":"--None--"}]},{"cells":[{"value":"Street"},{"value":"123 Main Street"}]},{"cells":[{"value":"City"},{"value":"New York"}]},{"cells":[{"value":"ZipPostalCode"},{"value":"10001"}]},{"cells":[{"value":"StateProvince"},{"value":"NY"}]},{"cells":[{"value":"Country"},{"value":"USA"}]},{"cells":[{"value":"Phone"},{"value":"(555) 123-4567"}]},{"cells":[{"value":"Email"},{"value":"maintenance@acme.com"}]}]}}, { page }); 
      await Then('Verify service appointment is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"HVAC System Maintenance"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_service-appointments.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":54,"tags":["@mode:serial","@service-appointments","@regression","@comprehensive"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Service Appointments\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Service Appointments\"","children":[{"start":12,"value":"Service Appointments","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new service appointment with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then Verify service appointment is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end