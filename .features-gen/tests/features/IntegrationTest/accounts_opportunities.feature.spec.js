// Generated from: tests\features\IntegrationTest\accounts_opportunities.feature
import { test } from "playwright-bdd";

test.describe('Create account module then click on first account on list and add opportunities on it.', () => {

  test.describe('Create a new business account with complete details', () => {

    test('Example #1', { tag: ['@account-opportunities'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Accounts" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Accounts"', null, { page }); 
      await And('Fill Accounts fields with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Account Name"},{"value":"Tech Solutions Inc 2025"}]},{"cells":[{"value":"Phone"},{"value":"555-0123"}]},{"cells":[{"value":"Industry"},{"value":"Technology"}]},{"cells":[{"value":"Type"},{"value":"Technology Partner"}]},{"cells":[{"value":"Website"},{"value":"www.techsol2025.com"}]},{"cells":[{"value":"Employees"},{"value":"500"}]},{"cells":[{"value":"Description"},{"value":"A leading technology company specializing in enterprise solutions"}]},{"cells":[{"value":"Rating"},{"value":"Hot"}]},{"cells":[{"value":"Account Site"},{"value":"Headquarters"}]},{"cells":[{"value":"Account Number"},{"value":"ACC2025"}]},{"cells":[{"value":"Annual Revenue"},{"value":"5000000"}]}]}}, { page }); 
      await Then('I should see the account created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Account Name"},{"value":"Tech Solutions Inc 2025"}]}]}}, { page }); 
      await When('I click new opportunities on Accounts page', null, { page }); 
      await Then('Add opportunity with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"New Business Opp"}]},{"cells":[{"value":"Type"},{"value":"New Customer"}]},{"cells":[{"value":"Stage"},{"value":"Prospecting"}]},{"cells":[{"value":"Amount"},{"value":"50000"}]},{"cells":[{"value":"CloseDate"},{"value":"10/10/2024"}]},{"cells":[{"value":"Private"},{"value":"Yes"}]},{"cells":[{"value":"NextStep"},{"value":"Initial Contact"}]},{"cells":[{"value":"Description"},{"value":"New business opportunity test"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\IntegrationTest\\accounts_opportunities.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":38,"tags":["@account-opportunities"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When Search for \"Accounts\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Accounts\"","children":[{"start":12,"value":"Accounts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Accounts\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Accounts\"","children":[{"start":26,"value":"Accounts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And Fill Accounts fields with following details:","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then I should see the account created successfully","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When I click new opportunities on Accounts page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then Add opportunity with following details","stepMatchArguments":[]}]},
]; // bdd-data-end