// Generated from: tests\features\salesforce_tasks.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Task Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Tasks with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@tasks', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Tasks" in app launcher', null, { page }); 
      await Then('Add new task with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Call"}]},{"cells":[{"value":"AssignedTo"},{"value":"John Smith"}]},{"cells":[{"value":"RelatedTo"},{"value":"Test Account 1"}]},{"cells":[{"value":"DueDate"},{"value":"2024-12-31"}]},{"cells":[{"value":"Priority"},{"value":"High"}]},{"cells":[{"value":"Status"},{"value":"Not Started"}]},{"cells":[{"value":"Description"},{"value":"Schedule follow-up sales call"}]}]}}, { page }); 
    });

    test('Example #2', { tag: ['@mode:serial', '@tasks', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Tasks" in app launcher', null, { page }); 
      await Then('Add new task with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Email"}]},{"cells":[{"value":"AssignedTo"},{"value":"Sarah Johnson"}]},{"cells":[{"value":"RelatedTo"},{"value":"Test Account 2"}]},{"cells":[{"value":"DueDate"},{"value":"2024-11-30"}]},{"cells":[{"value":"Priority"},{"value":"Normal"}]},{"cells":[{"value":"Status"},{"value":"In Progress"}]},{"cells":[{"value":"Description"},{"value":"Review client proposal draft"}]}]}}, { page }); 
    });

    test('Example #3', { tag: ['@mode:serial', '@tasks', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Tasks" in app launcher', null, { page }); 
      await Then('Add new task with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Send Letter"}]},{"cells":[{"value":"AssignedTo"},{"value":"Michael Brown"}]},{"cells":[{"value":"RelatedTo"},{"value":"Test Account 3"}]},{"cells":[{"value":"DueDate"},{"value":"2024-10-31"}]},{"cells":[{"value":"Priority"},{"value":"Low"}]},{"cells":[{"value":"Status"},{"value":"Completed"}]},{"cells":[{"value":"Description"},{"value":"Send technical documentation"}]}]}}, { page }); 
    });

  });

  test('Create Task with Minimum Required Fields', { tag: ['@mode:serial', '@tasks', '@smoke'] }, async ({ Given, When, Then, context, page }) => { 
    await Given('Open a browser and login to the sales force site', null, { context, page }); 
    await When('Search for "tasks" in app launcher', null, { page }); 
    await Then('Add new task with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Call"}]},{"cells":[{"value":"DueDate"},{"value":"2024-12-31"}]}]}}, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\salesforce_tasks.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":20,"tags":["@mode:serial","@tasks","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Tasks\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Tasks\"","children":[{"start":12,"value":"Tasks","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new task with following details","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":21,"tags":["@mode:serial","@tasks","@regression"],"steps":[{"pwStepLine":16,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Tasks\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Tasks\"","children":[{"start":12,"value":"Tasks","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new task with following details","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":22,"tags":["@mode:serial","@tasks","@regression"],"steps":[{"pwStepLine":22,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Tasks\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Tasks\"","children":[{"start":12,"value":"Tasks","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new task with following details","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":25,"tags":["@mode:serial","@tasks","@smoke"],"steps":[{"pwStepLine":30,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When Search for \"tasks\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"tasks\"","children":[{"start":12,"value":"tasks","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then Add new task with following details","stepMatchArguments":[]}]},
]; // bdd-data-end