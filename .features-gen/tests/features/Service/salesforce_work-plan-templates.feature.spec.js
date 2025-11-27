// Generated from: tests\features\Service\salesforce_work-plan-templates.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Work Plan Templates Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new work plan template', () => {

    test('Example #1', { tag: ['@mode:serial', '@workplantemplates', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Work Plan Templates" in app launcher', null, { page }); 
      await Then('Add new work plan template with following details', {"dataTable":{"rows":[{"cells":[{"value":"Name"},{"value":"Standard Implementation"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"Relative Execution Order"},{"value":"1"}]},{"cells":[{"value":"Description"},{"value":"Standard implementation template for new projects"}]}]}}, { page }); 
      await Then('Verify work plan template is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_work-plan-templates.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":17,"tags":["@mode:serial","@workplantemplates","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Work Plan Templates\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Work Plan Templates\"","children":[{"start":12,"value":"Work Plan Templates","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new work plan template with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then Verify work plan template is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end