// Generated from: tests\features\Service\salesforce_work-types.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Work Types Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new work type', () => {

    test('Example #1', { tag: ['@mode:serial', '@worktypes', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Work Types" in app launcher', null, { page }); 
      await Then('Add new work type with following details', {"dataTable":{"rows":[{"cells":[{"value":"Work Type Name"},{"value":"Field Service Visit"}]},{"cells":[{"value":"Description"},{"value":"Standard field service work type"}]},{"cells":[{"value":"Operating Hours"},{"value":"Operating Hours A"}]},{"cells":[{"value":"Estimated Duration"},{"value":"60"}]},{"cells":[{"value":"Duration Type"},{"value":"Minutes"}]},{"cells":[{"value":"Block Time Before Appointment"},{"value":"15"}]},{"cells":[{"value":"Block Time Before Unit"},{"value":"Hour(s)"}]},{"cells":[{"value":"Block Time After Appointment"},{"value":"30"}]},{"cells":[{"value":"Block Time After Unit"},{"value":"Hour(s)"}]},{"cells":[{"value":"Timeframe Start"},{"value":"1"}]},{"cells":[{"value":"Time Frame Start Unit"},{"value":"Hour(s)"}]},{"cells":[{"value":"Timeframe End"},{"value":"24"}]},{"cells":[{"value":"Time Frame End Unit"},{"value":"Hour(s)"}]}]}}, { page }); 
      await Then('Verify work type is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_work-types.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":26,"tags":["@mode:serial","@worktypes","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Work Types\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Work Types\"","children":[{"start":12,"value":"Work Types","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new work type with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then Verify work type is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end