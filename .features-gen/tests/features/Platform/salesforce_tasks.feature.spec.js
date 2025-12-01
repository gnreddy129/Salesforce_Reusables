// Generated from: tests\features\Platform\salesforce_tasks.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Task Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Tasks with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@platform', '@tasks', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Tasks" in app launcher', null, { page }); 
      await Then('Add new task with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Call"}]},{"cells":[{"value":"AssignedTo"},{"value":"Test5 lab"}]},{"cells":[{"value":"RelatedTo"},{"value":"Testing"}]},{"cells":[{"value":"DueDate"},{"value":"10/10/2023"}]},{"cells":[{"value":"Priority"},{"value":"High"}]},{"cells":[{"value":"Status"},{"value":"Not Started"}]},{"cells":[{"value":"Description"},{"value":"Schedule follow-up sales call"}]}]}}, { page }); 
      await Then('Verify task is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Call"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Platform\\salesforce_tasks.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":23,"tags":["@mode:serial","@platform","@tasks","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Tasks\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Tasks\"","children":[{"start":12,"value":"Tasks","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new task with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then Verify task is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end