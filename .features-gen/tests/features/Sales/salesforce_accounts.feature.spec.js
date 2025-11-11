// Generated from: tests\features\Sales\salesforce_accounts.feature
import { test } from "playwright-bdd";

test.describe('Account Management in Salesforce', () => {

  test.describe('Create a new business account with complete details', () => {

    test('Example #1', async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Accounts" in app launcher', null, { page }); 
      await And('I create a new account with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Account Name"},{"value":"Tech Solutions Inc 2025"}]},{"cells":[{"value":"Phone"},{"value":"555-0123"}]},{"cells":[{"value":"Industry"},{"value":"Technology"}]},{"cells":[{"value":"Type"},{"value":"Technology Partner"}]},{"cells":[{"value":"Website"},{"value":"www.techsol2025.com"}]},{"cells":[{"value":"Employees"},{"value":"500"}]},{"cells":[{"value":"Description"},{"value":"A leading technology company specializing in enterprise solutions"}]},{"cells":[{"value":"Rating"},{"value":"Hot"}]},{"cells":[{"value":"Account Site"},{"value":"Headquarters"}]},{"cells":[{"value":"Account Number"},{"value":"ACC2025"}]},{"cells":[{"value":"Annual Revenue"},{"value":"5000000"}]}]}}, { page }); 
      await Then('I should see the account created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Account Name"},{"value":"Tech Solutions Inc 2025"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Sales\\salesforce_accounts.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":28,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When Search for \"Accounts\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Accounts\"","children":[{"start":12,"value":"Accounts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I create a new account with following details:","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then I should see the account created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end