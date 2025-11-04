// Generated from: tests\features\salesforce_opportunities.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Opportunity Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Opportunities with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@opportunities', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Opportunities" in app launcher', null, { page }); 
      await Then('Add new opportunity with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"New Business Opp"}]},{"cells":[{"value":"Type"},{"value":"New Customer"}]},{"cells":[{"value":"Stage"},{"value":"Prospecting"}]},{"cells":[{"value":"Amount"},{"value":"50000"}]},{"cells":[{"value":"CloseDate"},{"value":"31/10/2024"}]},{"cells":[{"value":"Private"},{"value":"Yes"}]},{"cells":[{"value":"NextStep"},{"value":"Initial Contact"}]},{"cells":[{"value":"Description"},{"value":"New business opportunity test"}]}]}}, { page }); 
      await Then('Verify opportunity is created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"New Business Opp"}]}]}}, { page }); 
    });

    test('Example #2', { tag: ['@mode:serial', '@opportunities', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Opportunities" in app launcher', null, { page }); 
      await Then('Add new opportunity with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Existing Business Opp"}]},{"cells":[{"value":"Type"},{"value":"Existing Customer - Upgrade"}]},{"cells":[{"value":"Stage"},{"value":"Qualification"}]},{"cells":[{"value":"Amount"},{"value":"75000"}]},{"cells":[{"value":"CloseDate"},{"value":"30/11/2024"}]},{"cells":[{"value":"Private"},{"value":"No"}]},{"cells":[{"value":"NextStep"},{"value":"Follow-up Meeting"}]},{"cells":[{"value":"Description"},{"value":"Existing account expansion test"}]}]}}, { page }); 
      await Then('Verify opportunity is created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Existing Business Opp"}]}]}}, { page }); 
    });

    test('Example #3', { tag: ['@mode:serial', '@opportunities', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Opportunities" in app launcher', null, { page }); 
      await Then('Add new opportunity with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Partner Opportunity"}]},{"cells":[{"value":"Type"},{"value":"Existing Customer - Downgrade"}]},{"cells":[{"value":"Stage"},{"value":"Value Proposition"}]},{"cells":[{"value":"Amount"},{"value":"100000"}]},{"cells":[{"value":"CloseDate"},{"value":"31/12/2024"}]},{"cells":[{"value":"Private"},{"value":"Yes"}]},{"cells":[{"value":"NextStep"},{"value":"Partner Meeting"}]},{"cells":[{"value":"Description"},{"value":"Strategic partnership test"}]}]}}, { page }); 
      await Then('Verify opportunity is created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Partner Opportunity"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\salesforce_opportunities.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":24,"tags":["@mode:serial","@opportunities","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Opportunities\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Opportunities\"","children":[{"start":12,"value":"Opportunities","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new opportunity with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then Verify opportunity is created successfully","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":25,"tags":["@mode:serial","@opportunities","@regression"],"steps":[{"pwStepLine":17,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Opportunities\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Opportunities\"","children":[{"start":12,"value":"Opportunities","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new opportunity with following details","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then Verify opportunity is created successfully","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":26,"tags":["@mode:serial","@opportunities","@regression"],"steps":[{"pwStepLine":24,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Opportunities\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Opportunities\"","children":[{"start":12,"value":"Opportunities","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new opportunity with following details","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then Verify opportunity is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end