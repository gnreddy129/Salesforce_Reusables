// Generated from: tests\features\Inventory\i1\salesforce_return-order.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Return Orders Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create new Return Order with different data', () => {

    test('Example #1', { tag: ['@mode:serial', '@returnorder', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Return Orders" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Return Orders"', null, { page }); 
      await Then('Add new return order with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Case"},{"value":"00001026"}]},{"cells":[{"value":"Returned By"},{"value":"Salesforce demo"}]},{"cells":[{"value":"Account"},{"value":"Testing"}]},{"cells":[{"value":"Status"},{"value":"Approved"}]},{"cells":[{"value":"Contact"},{"value":"John Doe"}]},{"cells":[{"value":"Source Location"},{"value":""}]},{"cells":[{"value":"Destination Location"},{"value":""}]},{"cells":[{"value":"Shipment Type"},{"value":"Standard"}]},{"cells":[{"value":"Ship Address"},{"value":"123 Main Street"}]},{"cells":[{"value":"Ship From City"},{"value":"New York"}]},{"cells":[{"value":"Ship From Zip/Postal Code"},{"value":"10001"}]},{"cells":[{"value":"Ship From State/Province"},{"value":""}]},{"cells":[{"value":"Ship From Country"},{"value":""}]},{"cells":[{"value":"Expected Arrival Date"},{"value":"11/02/2025"}]},{"cells":[{"value":"Expected Arrival Time"},{"value":"10:00 AM"}]},{"cells":[{"value":"Description"},{"value":"Return order for defective merchandise in good condition"}]}]}}, { page }); 
      await Then('Verify return order is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Status"},{"value":"Approved"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Inventory\\i1\\salesforce_return-order.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":33,"tags":["@mode:serial","@returnorder","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Return Orders\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Return Orders\"","children":[{"start":12,"value":"Return Orders","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Return Orders\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Return Orders\"","children":[{"start":26,"value":"Return Orders","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new return order with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then Verify return order is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end