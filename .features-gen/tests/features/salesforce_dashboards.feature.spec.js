// Generated from: tests\features\salesforce_dashboards.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Dashboards Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage Dashboards with Different Components', () => {

    test('Example #1', { tag: ['@mode:serial', '@dashboards', '@regression'] }, async ({ Given, When, Then, And, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Dashboards" in app launcher', null, { page }); 
      await Then('Create new dashboard with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"DashboardName"},{"value":"Sales"}]},{"cells":[{"value":"Description"},{"value":"Sales performance tracking"}]},{"cells":[{"value":"Folder"},{"value":"Sales Reports"}]}]}}, { page }); 
      await And('Save the dashboard', null, { page }); 
      await Then('Verify dashboard is created successfully', null, { page }); 
    });

    test('Example #2', { tag: ['@mode:serial', '@dashboards', '@regression'] }, async ({ Given, When, Then, And, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Dashboards" in app launcher', null, { page }); 
      await Then('Create new dashboard with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"DashboardName"},{"value":"Account Health"}]},{"cells":[{"value":"Description"},{"value":"Account status dashboard"}]},{"cells":[{"value":"Folder"},{"value":"Accounts"}]}]}}, { page }); 
      await And('Save the dashboard', null, { page }); 
      await Then('Verify dashboard is created successfully', null, { page }); 
    });

    test('Example #3', { tag: ['@mode:serial', '@dashboards', '@regression'] }, async ({ Given, When, Then, And, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Dashboards" in app launcher', null, { page }); 
      await Then('Create new dashboard with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"DashboardName"},{"value":"Team Performance"}]},{"cells":[{"value":"Description"},{"value":"Team metrics overview"}]},{"cells":[{"value":"Folder"},{"value":"Team Reports"}]}]}}, { page }); 
      await And('Save the dashboard', null, { page }); 
      await Then('Verify dashboard is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\salesforce_dashboards.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":18,"tags":["@mode:serial","@dashboards","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Dashboards\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Dashboards\"","children":[{"start":12,"value":"Dashboards","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Create new dashboard with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And Save the dashboard","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Verify dashboard is created successfully","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":19,"tags":["@mode:serial","@dashboards","@regression"],"steps":[{"pwStepLine":18,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Dashboards\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Dashboards\"","children":[{"start":12,"value":"Dashboards","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Create new dashboard with following details","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And Save the dashboard","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Verify dashboard is created successfully","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":20,"tags":["@mode:serial","@dashboards","@regression"],"steps":[{"pwStepLine":26,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Dashboards\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Dashboards\"","children":[{"start":12,"value":"Dashboards","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Create new dashboard with following details","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And Save the dashboard","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Verify dashboard is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end