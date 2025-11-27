// Generated from: tests\features\OtherFunctionality\salesforce_shifts.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Shifts Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new shift', () => {

    test('Example #1', { tag: ['@mode:serial', '@shifts', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Shifts" in app launcher', null, { page }); 
      await Then('Add new shift with following details', {"dataTable":{"rows":[{"cells":[{"value":"Start Date"},{"value":"10/12/2024"}]},{"cells":[{"value":"Start Time"},{"value":"09:00 AM"}]},{"cells":[{"value":"End Date"},{"value":"11/12/2024"}]},{"cells":[{"value":"End Time"},{"value":"05:00 PM"}]},{"cells":[{"value":"Status"},{"value":"Published"}]},{"cells":[{"value":"Work Type Group"},{"value":"Testing"}]},{"cells":[{"value":"Service Territory"},{"value":""}]},{"cells":[{"value":"Service Resource"},{"value":"testing"}]},{"cells":[{"value":"Time Slot Type"},{"value":"Normal"}]},{"cells":[{"value":"Label"},{"value":"Holiday Shift"}]}]}}, { page }); 
      await Then('Verify shift is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_shifts.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":23,"tags":["@mode:serial","@shifts","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Shifts\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Shifts\"","children":[{"start":12,"value":"Shifts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new shift with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then Verify shift is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end