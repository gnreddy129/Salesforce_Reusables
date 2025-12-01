// Generated from: tests\features\Inventory\salesforce_shipping-carriers.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Shipping Carriers Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Shipping Carrier with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@inventory', '@shipping-carriers', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Shipping Carriers" in app launcher', null, { page }); 
      await Then('Add new shipping carrier with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Carrier 1"}]},{"cells":[{"value":"ExternalReference"},{"value":"EXT-001"}]}]}}, { page }); 
      await And('Verify Shipping Carrier is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Carrier 1"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Inventory\\salesforce_shipping-carriers.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":18,"tags":["@mode:serial","@inventory","@shipping-carriers","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Shipping Carriers\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Shipping Carriers\"","children":[{"start":12,"value":"Shipping Carriers","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new shipping carrier with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And Verify Shipping Carrier is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end