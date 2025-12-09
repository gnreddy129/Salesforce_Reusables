// Generated from: tests\features\Marketing\salesforce_campaign.feature
import { test } from "playwright-bdd";

test.describe('Campaign Management in Salesforce', () => {

  test.describe('Create a new marketing campaign with complete details', () => {

    test('Example #1', async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Campaigns" in app launcher', null, { page }); 
      await And('I create a new campaign with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Campaign Name"},{"value":"End of Year Campaign 2025"}]},{"cells":[{"value":"Type"},{"value":"Conference"}]},{"cells":[{"value":"Status"},{"value":"Planned"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"Start Date"},{"value":"11/01/2025"}]},{"cells":[{"value":"Expected Revenue"},{"value":"50000"}]},{"cells":[{"value":"Budgeted Cost"},{"value":"25000"}]},{"cells":[{"value":"Actual Cost"},{"value":"0"}]},{"cells":[{"value":"Expected Response"},{"value":"10"}]},{"cells":[{"value":"Description"},{"value":"End of year promotional campaign targeting existing customers with special holiday offers and discounts"}]}]}}, { page }); 
      await Then('I should see the campaign created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Campaign Name"},{"value":"End of Year Campaign 2025"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Marketing\\salesforce_campaign.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When Search for \"Campaigns\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Campaigns\"","children":[{"start":12,"value":"Campaigns","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I create a new campaign with following details:","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then I should see the campaign created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end