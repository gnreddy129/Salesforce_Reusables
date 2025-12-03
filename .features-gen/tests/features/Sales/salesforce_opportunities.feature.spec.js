// Generated from: tests\features\Sales\salesforce_opportunities.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Opportunity Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Opportunities with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@sales', '@opportunities', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Opportunities" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Opportunities"', null, { page }); 
      await Then('Add opportunity with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"New Business Opp"}]},{"cells":[{"value":"Type"},{"value":"New Customer"}]},{"cells":[{"value":"Stage"},{"value":"Prospecting"}]},{"cells":[{"value":"Amount"},{"value":"50000"}]},{"cells":[{"value":"CloseDate"},{"value":"10/10/2024"}]},{"cells":[{"value":"Private"},{"value":"Yes"}]},{"cells":[{"value":"NextStep"},{"value":"Initial Contact"}]},{"cells":[{"value":"Description"},{"value":"New business opportunity test"}]}]}}, { page }); 
      await Then('Verify opportunity is created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"New Business Opp"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Sales\\salesforce_opportunities.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":25,"tags":["@mode:serial","@sales","@opportunities","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Opportunities\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Opportunities\"","children":[{"start":12,"value":"Opportunities","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Opportunities\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Opportunities\"","children":[{"start":26,"value":"Opportunities","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add opportunity with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then Verify opportunity is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end