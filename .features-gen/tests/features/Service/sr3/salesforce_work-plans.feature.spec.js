// Generated from: tests\features\Service\sr3\salesforce_work-plans.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Work Plans Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new work plan', () => {

    test('Example #1', { tag: ['@mode:serial', '@workplans', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Work Plans" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Work Plans"', null, { page }); 
      await Then('Add new work plan with following details', {"dataTable":{"rows":[{"cells":[{"value":"Name"},{"value":"QA Work Plan"}]},{"cells":[{"value":"Execution Order"},{"value":"1"}]},{"cells":[{"value":"Parent Record"},{"value":"CHG-000000001"}]},{"cells":[{"value":"Description"},{"value":"Work plan for quality assurance testing activities"}]}]}}, { page }); 
      await Then('Verify work plan is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\sr3\\salesforce_work-plans.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":18,"tags":["@mode:serial","@workplans","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Work Plans\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Work Plans\"","children":[{"start":12,"value":"Work Plans","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Work Plans\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Work Plans\"","children":[{"start":26,"value":"Work Plans","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new work plan with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Verify work plan is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end