// Generated from: tests\features\Platform\p1\salesforce_dashboards.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Dashboards Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage Dashboards with Different Components', () => {

    test('Example #1', { tag: ['@mode:serial', '@platform', '@dashboards', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Dashboards" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Dashboards"', null, { page }); 
      await Then('Create new dashboard with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"DashboardName"},{"value":"Sales"}]},{"cells":[{"value":"Description"},{"value":"Sales performance tracking"}]},{"cells":[{"value":"Folder"},{"value":"Enablement Dashboard Spring '24"}]}]}}, { page }); 
      await And('Save the dashboard', null, { page }); 
      await Then('Verify dashboard is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Platform\\p1\\salesforce_dashboards.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":19,"tags":["@mode:serial","@platform","@dashboards","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Dashboards\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Dashboards\"","children":[{"start":12,"value":"Dashboards","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Dashboards\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Dashboards\"","children":[{"start":26,"value":"Dashboards","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Create new dashboard with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And Save the dashboard","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then Verify dashboard is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end