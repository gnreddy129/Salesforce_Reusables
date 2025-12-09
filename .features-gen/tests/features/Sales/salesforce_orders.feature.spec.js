// Generated from: tests\features\Sales\salesforce_orders.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Orders Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create a new order with different data sets', () => {

    test('Example #1', { tag: ['@mode:serial', '@regression', '@orders', '@create'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Orders" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Orders"', null, { page }); 
      await Then('Fill Orders fields with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Contract Number"},{"value":"00000101"}]},{"cells":[{"value":"Order Number"},{"value":"<OrderNumber>"}]},{"cells":[{"value":"Account Name"},{"value":"Testing"}]},{"cells":[{"value":"Status"},{"value":"Draft"}]},{"cells":[{"value":"Order Start Date"},{"value":"11/11/2024"}]},{"cells":[{"value":"Customer Authorized By"},{"value":""}]},{"cells":[{"value":"Company Authorized By"},{"value":""}]},{"cells":[{"value":"Shipping Street"},{"value":"123 Main Street"}]},{"cells":[{"value":"Shipping City"},{"value":"New York"}]},{"cells":[{"value":"Shipping Zip"},{"value":"10001"}]},{"cells":[{"value":"Shipping State"},{"value":"South Australia"}]},{"cells":[{"value":"Shipping Country"},{"value":"Australia"}]},{"cells":[{"value":"Billing Street"},{"value":"456 Oak Avenue"}]},{"cells":[{"value":"Billing City"},{"value":"Los Angeles"}]},{"cells":[{"value":"Billing Zip"},{"value":"90210"}]},{"cells":[{"value":"Billing State"},{"value":""}]},{"cells":[{"value":"Billing Country"},{"value":"Australia"}]},{"cells":[{"value":"Description"},{"value":"Standard order for testing"}]}]}}, { page }); 
      await Then('Verify order is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Account Name"},{"value":"Testing"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Sales\\salesforce_orders.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":35,"tags":["@mode:serial","@regression","@orders","@create"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Orders\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Orders\"","children":[{"start":12,"value":"Orders","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Orders\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Orders\"","children":[{"start":26,"value":"Orders","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Fill Orders fields with following details:","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then Verify order is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end