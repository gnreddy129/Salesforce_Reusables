// Generated from: tests\features\OtherFunctionality\o1\salesforce_appointment-categories.feature
import { test } from "playwright-bdd";

test.describe('Appointment Categories Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create Appointment Category', () => {

    test('Example #1', { tag: ['@mode:serial', '@appointment', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Appointment Categories" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Appointment Categories"', null, { page }); 
      await Then('Add new appointment category with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Appt Dog A"}]},{"cells":[{"value":"Regular"},{"value":"Yes"}]},{"cells":[{"value":"DropIn"},{"value":"Yes"}]},{"cells":[{"value":"Group"},{"value":"Yes"}]}]}}, { page }); 
      await Then('Verify appointment category is created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Appt Dog A"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\o1\\salesforce_appointment-categories.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":21,"tags":["@mode:serial","@appointment","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Appointment Categories\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Appointment Categories\"","children":[{"start":12,"value":"Appointment Categories","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Appointment Categories\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Appointment Categories\"","children":[{"start":26,"value":"Appointment Categories","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new appointment category with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then Verify appointment category is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end