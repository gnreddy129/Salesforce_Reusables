// Generated from: tests\features\OtherFunctionality\salesforce_contracts.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Contract Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Contracts with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@contract', '@contracts', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Contracts" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Accounts"', null, { page }); 
      await Then('Add new contract with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Status"},{"value":"Draft"}]},{"cells":[{"value":"Contract Start Date"},{"value":"12/12/2024"}]},{"cells":[{"value":"Account Name"},{"value":"Testing"}]},{"cells":[{"value":"Contract Term"},{"value":"12"}]},{"cells":[{"value":"Customer Signed By"},{"value":""}]},{"cells":[{"value":"Owner Expiration Notice"},{"value":"15 Days"}]},{"cells":[{"value":"Customer Signed Title"},{"value":"Sales Manager"}]},{"cells":[{"value":"Company Signed By"},{"value":""}]},{"cells":[{"value":"Customer Signed Date"},{"value":"10/12/2024"}]},{"cells":[{"value":"Company Signed Date"},{"value":"12/12/2024"}]},{"cells":[{"value":"Price Book"},{"value":""}]},{"cells":[{"value":"Billing Street"},{"value":"123 Main St"}]},{"cells":[{"value":"Billing City"},{"value":"New York"}]},{"cells":[{"value":"Billing Zip"},{"value":"10001"}]},{"cells":[{"value":"Billing State"},{"value":"South Australia"}]},{"cells":[{"value":"Billing Country"},{"value":"Australia"}]},{"cells":[{"value":"Special Terms"},{"value":"Standard contract terms apply"}]},{"cells":[{"value":"Description"},{"value":"Annual service contract"}]}]}}, { page }); 
      await Then('Verify contract is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Account Name"},{"value":"Testing"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_contracts.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":35,"tags":["@mode:serial","@contract","@contracts","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Contracts\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Contracts\"","children":[{"start":12,"value":"Contracts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Accounts\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Accounts\"","children":[{"start":26,"value":"Accounts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new contract with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then Verify contract is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end