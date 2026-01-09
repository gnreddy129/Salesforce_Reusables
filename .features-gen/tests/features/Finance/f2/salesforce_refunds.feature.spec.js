// Generated from: tests\features\Finance\f2\salesforce_refunds.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Refunds Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new refund with comprehensive details', () => {

    test('Example #1', { tag: ['@mode:serial', '@platform', '@refunds', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Refunds" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Refunds"', null, { page }); 
      await Then('Add new refund with following details', {"dataTable":{"rows":[{"cells":[{"value":"Account"},{"value":"Testing"}]},{"cells":[{"value":"Status"},{"value":"Processed"}]},{"cells":[{"value":"Amount"},{"value":"1500"}]},{"cells":[{"value":"Type"},{"value":"Referenced"}]},{"cells":[{"value":"Payment Group"},{"value":""}]},{"cells":[{"value":"Payment Method"},{"value":""}]},{"cells":[{"value":"Processing Mode"},{"value":"External"}]},{"cells":[{"value":"Effective Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Comments"},{"value":"Automation test refund"}]},{"cells":[{"value":"Cancellation Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Cancellation Effective Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Salesforce Result Code"},{"value":"Success"}]},{"cells":[{"value":"Cancellation Salesforce Result Code"},{"value":""}]},{"cells":[{"value":"Payment Gateway"},{"value":""}]},{"cells":[{"value":"Gateway Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Gateway Result Code"},{"value":"GATEWAY-SUCCESS-001"}]},{"cells":[{"value":"Gateway Result Code Description"},{"value":"Refund processed successfully"}]},{"cells":[{"value":"Gateway Reference Number"},{"value":"GWR-REFUND-2025-001"}]},{"cells":[{"value":"Cancellation Gateway Result Code"},{"value":""}]},{"cells":[{"value":"Cancellation Gateway Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Cancellation Gateway Reference Number"},{"value":""}]},{"cells":[{"value":"MAC Address"},{"value":"00:1A:2B:3C:4D:5E"}]},{"cells":[{"value":"IP Address"},{"value":"192.168.1.100"}]},{"cells":[{"value":"Phone"},{"value":"+1-555-789-1234"}]},{"cells":[{"value":"Audit Email"},{"value":"audit@testing.com"}]}]}}, { page }); 
      await Then('Verify refund is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Finance\\f2\\salesforce_refunds.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":39,"tags":["@mode:serial","@platform","@refunds","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Refunds\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Refunds\"","children":[{"start":12,"value":"Refunds","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Refunds\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Refunds\"","children":[{"start":26,"value":"Refunds","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new refund with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then Verify refund is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end