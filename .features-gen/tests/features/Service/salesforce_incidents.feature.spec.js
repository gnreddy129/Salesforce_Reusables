// Generated from: tests\features\Service\salesforce_incidents.feature
import { test } from "playwright-bdd";

test.describe('Create Incident', () => {

  test.describe('Create a new Incident and verify it is created', () => {

    test('Example #1', async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Incidents" in app launcher', null, { page }); 
      await Then('Add new incident with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"ShortDescription"},{"value":"Incident00A"}]},{"cells":[{"value":"Description"},{"value":"Incident00A: New sample incidents"}]},{"cells":[{"value":"Status"},{"value":"New"}]},{"cells":[{"value":"Urgency"},{"value":"Medium"}]},{"cells":[{"value":"Impact"},{"value":"Medium"}]},{"cells":[{"value":"Priority"},{"value":"Moderate"}]},{"cells":[{"value":"DetectedDate"},{"value":"Today"}]},{"cells":[{"value":"DetectedTime"},{"value":"10:00 AM"}]},{"cells":[{"value":"StartDate"},{"value":"Today"}]},{"cells":[{"value":"StartTime"},{"value":"10:00 AM"}]}]}}, { page }); 
      await Then('Verify incident is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"ShortDescription"},{"value":"Incident00A"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_incidents.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":24,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When Search for \"Incidents\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Incidents\"","children":[{"start":12,"value":"Incidents","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then Add new incident with following details","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then Verify incident is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end