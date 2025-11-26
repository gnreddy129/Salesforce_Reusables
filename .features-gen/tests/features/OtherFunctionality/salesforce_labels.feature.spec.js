// Generated from: tests\features\OtherFunctionality\salesforce_labels.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Label Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new label', () => {

    test('Example #1', { tag: ['@mode:serial', '@labels', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Labels" in app launcher', null, { page }); 
      await Then('Add new label with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"AutoCgLebel1"}]}]}}, { page }); 
      await Then('Verify label is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"AutoCgLebel1"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_labels.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":17,"tags":["@mode:serial","@labels","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Labels\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Labels\"","children":[{"start":12,"value":"Labels","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new label with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then Verify label is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end