// Generated from: tests\features\Service\salesforce_problems.feature
import { test } from "playwright-bdd";

test.describe('Create and Manage Problems in Salesforce Service Cloud', () => {

  test.describe('Create and Manage New Problems with Complete Details', () => {

    test('Example #1', { tag: ['@service', '@problems', '@regression', '@smoke', '@create'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Problems" in app launcher', null, { page }); 
      await Then('Add new problem with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Memory Leak in Production"}]},{"cells":[{"value":"Description"},{"value":"Application memory usage constantly increasing"}]},{"cells":[{"value":"Status"},{"value":"Open"}]},{"cells":[{"value":"Urgency"},{"value":"Medium"}]},{"cells":[{"value":"ParentProblem"},{"value":"PRB-000000001"}]},{"cells":[{"value":"Impact"},{"value":"Medium"}]},{"cells":[{"value":"Priority"},{"value":"High"}]},{"cells":[{"value":"Category"},{"value":"Software"}]},{"cells":[{"value":"Subcategory"},{"value":"MS SQL Server"}]},{"cells":[{"value":"PriorityOverrideReason"},{"value":"System stability risk"}]},{"cells":[{"value":"RootCauseSummary"},{"value":"Memory leak in background task"}]},{"cells":[{"value":"ResolvedBy"},{"value":"Test5 lab"}]},{"cells":[{"value":"ResolutionDate"},{"value":"11/11/2025"}]},{"cells":[{"value":"ResolutionSummary"},{"value":"Patched memory leak in task scheduler"}]}]}}, { page }); 
      await Then('Verify problem "Memory Leak in Production" exists in the list', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_problems.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":28,"tags":["@service","@problems","@regression","@smoke","@create"],"steps":[{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Problems\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Problems\"","children":[{"start":12,"value":"Problems","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new problem with following details","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then Verify problem \"Memory Leak in Production\" exists in the list","stepMatchArguments":[{"group":{"start":15,"value":"\"Memory Leak in Production\"","children":[{"start":16,"value":"Memory Leak in Production","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end