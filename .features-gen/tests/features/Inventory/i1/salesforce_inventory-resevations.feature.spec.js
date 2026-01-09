// Generated from: tests\features\Inventory\i1\salesforce_inventory-resevations.feature
import { test } from "playwright-bdd";

test.describe('Create Inventory Reservations in Salesforce', () => {

  test.describe('Create a new Inventory Reservations and verify it is created', () => {

    test('Example #1', async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Inventory Reservations" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Inventory Reservations"', null, { page }); 
      await Then('Add new inventory reservations with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"ReservationIdentifier"},{"value":"Incident"}]},{"cells":[{"value":"ReservationDuration"},{"value":"120"}]},{"cells":[{"value":"ReservationDate"},{"value":"11/11/2023"}]},{"cells":[{"value":"ReservationTime"},{"value":"10:00 AM"}]},{"cells":[{"value":"AsyncOperation"},{"value":"True"}]},{"cells":[{"value":"LatestOperation"},{"value":"True"}]}]}}, { page }); 
      await Then('Verify inventory reservations is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"ReservationIdentifier"},{"value":"Incident"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Inventory\\i1\\salesforce_inventory-resevations.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":21,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When Search for \"Inventory Reservations\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Inventory Reservations\"","children":[{"start":12,"value":"Inventory Reservations","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Inventory Reservations\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Inventory Reservations\"","children":[{"start":26,"value":"Inventory Reservations","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then Add new inventory reservations with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then Verify inventory reservations is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end