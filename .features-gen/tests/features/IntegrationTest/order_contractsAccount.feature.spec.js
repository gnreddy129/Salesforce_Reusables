// Generated from: tests\features\IntegrationTest\order_contractsAccount.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Orders Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create a new order with different data sets', () => {

    test('Example #1', { tag: ['@mode:serial', '@order_contractsAccount'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Orders" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Orders"', null, { page }); 
      await Then('Fill Orders fields with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Status"},{"value":"Draft"}]},{"cells":[{"value":"Order Start Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Customer Authorized By"},{"value":""}]},{"cells":[{"value":"Company Authorized By"},{"value":""}]},{"cells":[{"value":"Shipping Street"},{"value":"123 Main Street"}]},{"cells":[{"value":"Shipping City"},{"value":"New York"}]},{"cells":[{"value":"Shipping Zip"},{"value":"10001"}]},{"cells":[{"value":"Shipping State"},{"value":""}]},{"cells":[{"value":"Shipping Country"},{"value":""}]},{"cells":[{"value":"Billing Street"},{"value":"123 Main St"}]},{"cells":[{"value":"Billing City"},{"value":"New York"}]},{"cells":[{"value":"Billing Zip"},{"value":"10001"}]},{"cells":[{"value":"Billing State"},{"value":""}]},{"cells":[{"value":"Billing Country"},{"value":""}]},{"cells":[{"value":"Description"},{"value":"Annual service contract"}]}]}}, { page }); 
      await Then('Click on Add new Account in order page', null, { page }); 
      await And('Fill Accounts fields with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Account Name"},{"value":"Testing"}]},{"cells":[{"value":"Phone"},{"value":"555-0123"}]},{"cells":[{"value":"Industry"},{"value":"Technology"}]},{"cells":[{"value":"Type"},{"value":"Technology Partner"}]},{"cells":[{"value":"Website"},{"value":"www.techsol2025.com"}]},{"cells":[{"value":"Employees"},{"value":"500"}]},{"cells":[{"value":"Description"},{"value":"A leading technology company specializing in enterprise solutions"}]},{"cells":[{"value":"Rating"},{"value":"Hot"}]},{"cells":[{"value":"Account Site"},{"value":"Headquarters"}]},{"cells":[{"value":"Account Number"},{"value":"ACC2025"}]},{"cells":[{"value":"Annual Revenue"},{"value":"5000000"}]}]}}, { page }); 
      await Then('Click on Add new Contracts in order page', null, { page }); 
      await Then('Add new contract with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Status"},{"value":"Draft"}]},{"cells":[{"value":"Contract Start Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Account Name"},{"value":"Testing"}]},{"cells":[{"value":"Contract Term"},{"value":"12"}]},{"cells":[{"value":"Customer Signed By"},{"value":""}]},{"cells":[{"value":"Owner Expiration Notice"},{"value":"15 Days"}]},{"cells":[{"value":"Customer Signed Title"},{"value":"Sales Manager"}]},{"cells":[{"value":"Company Signed By"},{"value":""}]},{"cells":[{"value":"Customer Signed Date"},{"value":"10/12/2024"}]},{"cells":[{"value":"Company Signed Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Price Book"},{"value":""}]},{"cells":[{"value":"Billing Street"},{"value":"456 Oak Avenue"}]},{"cells":[{"value":"Billing City"},{"value":"Los Angeles"}]},{"cells":[{"value":"Billing Zip"},{"value":"90210"}]},{"cells":[{"value":"Billing State"},{"value":""}]},{"cells":[{"value":"Billing Country"},{"value":""}]},{"cells":[{"value":"Special Terms"},{"value":"Standard contract terms apply"}]},{"cells":[{"value":"Description"},{"value":"Standard order for testing"}]}]}}, { page }); 
      await Then('Click on Save button of "Orders"', null, { page }); 
      await Then('Verify order is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Account Name"},{"value":"Testing"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\IntegrationTest\\order_contractsAccount.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":70,"tags":["@mode:serial","@order_contractsAccount"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Orders\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Orders\"","children":[{"start":12,"value":"Orders","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Orders\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Orders\"","children":[{"start":26,"value":"Orders","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Fill Orders fields with following details:","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then Click on Add new Account in order page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And Fill Accounts fields with following details:","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then Click on Add new Contracts in order page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then Add new contract with following details","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then Click on Save button of \"Orders\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Orders\"","children":[{"start":25,"value":"Orders","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"Then Verify order is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end