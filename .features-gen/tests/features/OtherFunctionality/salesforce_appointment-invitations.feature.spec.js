// Generated from: tests\features\OtherFunctionality\salesforce_appointment-invitations.feature
import { test } from "playwright-bdd";

test.describe('Appointment Invitations', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create an appointment invitation', () => {

    test('Example #1', { tag: ['@mode:serial', '@appointment', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Appointment Invitations" in app launcher', null, { page }); 
      await Then('Add new appointment invitation with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"BookingStartDate"},{"value":"28/10/2025"}]},{"cells":[{"value":"BookingEndDate"},{"value":"28/11/2025"}]},{"cells":[{"value":"URLExpirationDate"},{"value":"30/12/2025"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"AppointmentTopic"},{"value":"Work Item A"}]},{"cells":[{"value":"ServiceTerritory"},{"value":"Service Territory A"}]}]}}, { page }); 
      await Then('Verify appointment invitation is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"BookingStartDate"},{"value":"28/10/2025"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_appointment-invitations.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":22,"tags":["@mode:serial","@appointment","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Appointment Invitations\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Appointment Invitations\"","children":[{"start":12,"value":"Appointment Invitations","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new appointment invitation with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then Verify appointment invitation is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end