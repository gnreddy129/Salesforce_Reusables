// Generated from: tests\features\CustomerData\c2\salesforce_customers.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Customer Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Customers with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@customers', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Customers" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Customers"', null, { page }); 
      await Then('Add new customer with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Party"},{"value":"John Smith"}]},{"cells":[{"value":"Name"},{"value":"Customer for John Test"}]},{"cells":[{"value":"Customer Status Type"},{"value":"Active"}]},{"cells":[{"value":"Total Life Time Value"},{"value":"50000"}]}]}}, { page }); 
      await Then('Verify customer is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Customer for John Test"}]},{"cells":[{"value":"Party"},{"value":"John Smith"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\c2\\salesforce_customers.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":22,"tags":["@mode:serial","@customer","@customers","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Customers\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Customers\"","children":[{"start":12,"value":"Customers","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Customers\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Customers\"","children":[{"start":26,"value":"Customers","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new customer with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then Verify customer is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end