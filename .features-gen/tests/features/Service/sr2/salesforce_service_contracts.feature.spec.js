// Generated from: tests\features\Service\sr2\salesforce_service_contracts.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Service Contracts Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new service contract', () => {

    test('Example #1', { tag: ['@mode:serial', '@service', '@contracts', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Service Contracts" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Service Contracts"', null, { page }); 
      await Then('Add new service contract with following details', {"dataTable":{"rows":[{"cells":[{"value":"Contract Name"},{"value":"SC-001-AUTO"}]},{"cells":[{"value":"Start Date"},{"value":"10/12/2024"}]},{"cells":[{"value":"End Date"},{"value":"11/12/2025"}]},{"cells":[{"value":"Term (months)"},{"value":"12"}]},{"cells":[{"value":"Description"},{"value":"Automation test service contract"}]},{"cells":[{"value":"Special Terms"},{"value":"Standard terms apply"}]},{"cells":[{"value":"Account Name"},{"value":"Testing"}]},{"cells":[{"value":"Contact Name"},{"value":""}]},{"cells":[{"value":"Shipping and Handling"},{"value":"50"}]},{"cells":[{"value":"Tax"},{"value":"10"}]},{"cells":[{"value":"Billing Street"},{"value":"123 Test Street"}]},{"cells":[{"value":"Billing City"},{"value":"New York"}]},{"cells":[{"value":"Billing Zip"},{"value":"10001"}]},{"cells":[{"value":"Billing State"},{"value":"South Australia"}]},{"cells":[{"value":"Billing Country"},{"value":"Australia"}]},{"cells":[{"value":"Shipping Street"},{"value":"456 Ship Lane"}]},{"cells":[{"value":"Shipping City"},{"value":"Los Angeles"}]},{"cells":[{"value":"Shipping Zip"},{"value":"90001"}]},{"cells":[{"value":"Shipping State"},{"value":""}]},{"cells":[{"value":"Shipping Country"},{"value":"Australia"}]}]}}, { page }); 
      await Then('Verify service contract is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\sr2\\salesforce_service_contracts.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":34,"tags":["@mode:serial","@service","@contracts","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Service Contracts\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Service Contracts\"","children":[{"start":12,"value":"Service Contracts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Service Contracts\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Service Contracts\"","children":[{"start":26,"value":"Service Contracts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new service contract with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then Verify service contract is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end