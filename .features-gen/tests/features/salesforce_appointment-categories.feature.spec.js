// Generated from: tests\features\salesforce_appointment-categories.feature
import { test } from "playwright-bdd";

test.describe('Appointment Categories Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create Appointment Category', () => {

    test('Example #1', { tag: ['@mode:serial', '@appointment', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Appointment Categories" in app launcher', null, { page }); 
      await Then('Add new appointment category with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Appt Cat A"}]},{"cells":[{"value":"Regular"},{"value":"Yes"}]},{"cells":[{"value":"DropIn"},{"value":"No"}]},{"cells":[{"value":"Group"},{"value":"Yes"}]}]}}, { page }); 
      await Then('Verify appointment category is created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Appt Cat A"}]}]}}, { page }); 
    });

    test('Example #2', { tag: ['@mode:serial', '@appointment', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Appointment Categories" in app launcher', null, { page }); 
      await Then('Add new appointment category with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Appt Cat B"}]},{"cells":[{"value":"Regular"},{"value":"No"}]},{"cells":[{"value":"DropIn"},{"value":"Yes"}]},{"cells":[{"value":"Group"},{"value":"No"}]}]}}, { page }); 
      await Then('Verify appointment category is created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Appt Cat B"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\salesforce_appointment-categories.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":20,"tags":["@mode:serial","@appointment","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Appointment Categories\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Appointment Categories\"","children":[{"start":12,"value":"Appointment Categories","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new appointment category with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Verify appointment category is created successfully","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":21,"tags":["@mode:serial","@appointment","@regression"],"steps":[{"pwStepLine":17,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Appointment Categories\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Appointment Categories\"","children":[{"start":12,"value":"Appointment Categories","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new appointment category with following details","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Verify appointment category is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end