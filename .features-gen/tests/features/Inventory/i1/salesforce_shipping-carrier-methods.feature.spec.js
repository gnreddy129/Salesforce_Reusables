// Generated from: tests\features\Inventory\i1\salesforce_shipping-carrier-methods.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Shipping Carrier Methods Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Shipping Carrier Method with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@inventory', '@shipping-carrier-methods', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Shipping Carrier Methods" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Shipping Carrier Methods"', null, { page }); 
      await Then('Add new shipping carrier method with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Express Delivery"}]},{"cells":[{"value":"ShippingCarrier"},{"value":"Test Carrier 1"}]},{"cells":[{"value":"ExternalReference"},{"value":"FEDEX-EXP-001"}]},{"cells":[{"value":"MinimumTransitTime"},{"value":"1"}]},{"cells":[{"value":"MaximumTransitTime"},{"value":"2"}]},{"cells":[{"value":"TransitTimeUnit"},{"value":"Days"}]}]}}, { page }); 
      await And('Verify Shipping Carrier Method is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Express Delivery"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Inventory\\i1\\salesforce_shipping-carrier-methods.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":23,"tags":["@mode:serial","@inventory","@shipping-carrier-methods","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Shipping Carrier Methods\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Shipping Carrier Methods\"","children":[{"start":12,"value":"Shipping Carrier Methods","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Shipping Carrier Methods\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Shipping Carrier Methods\"","children":[{"start":26,"value":"Shipping Carrier Methods","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new shipping carrier method with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And Verify Shipping Carrier Method is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end