// Generated from: tests\features\Finance\f2\salesforce_payments.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Payments Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new payment with comprehensive details', () => {

    test('Example #1', { tag: ['@mode:serial', '@platform', '@payments', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Payments" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Payments"', null, { page }); 
      await Then('Add new payment with following details', {"dataTable":{"rows":[{"cells":[{"value":"Account"},{"value":"Testing"}]},{"cells":[{"value":"Status"},{"value":"Draft"}]},{"cells":[{"value":"Amount"},{"value":"1000"}]},{"cells":[{"value":"Type"},{"value":"Sale"}]},{"cells":[{"value":"Payment Authorization"},{"value":""}]},{"cells":[{"value":"Payment Group"},{"value":""}]},{"cells":[{"value":"Payment Method"},{"value":""}]},{"cells":[{"value":"Processing Mode"},{"value":"External"}]},{"cells":[{"value":"Comments"},{"value":"Automation test payment"}]},{"cells":[{"value":"Salesforce Result Code"},{"value":"Success"}]},{"cells":[{"value":"Cancellation Salesforce Result Code"},{"value":"ABC123"}]},{"cells":[{"value":"Payment Gateway"},{"value":""}]},{"cells":[{"value":"Gateway Result Code"},{"value":"GW-SUCCESS-001"}]},{"cells":[{"value":"Gateway Result Code Description"},{"value":"Payment processed successfully"}]},{"cells":[{"value":"Gateway Reference Number"},{"value":"GWR-2025-11-001"}]},{"cells":[{"value":"Gateway Reference Details"},{"value":"Transaction ID: TXN12345"}]},{"cells":[{"value":"Cancellation Gateway Result Code"},{"value":"CANCEL-001"}]},{"cells":[{"value":"Cancellation Gateway Reference Number"},{"value":"CANCEL-GWR-001"}]},{"cells":[{"value":"MAC Address"},{"value":"00:1A:2B:3C:4D"}]},{"cells":[{"value":"IP Address"},{"value":"192.168.1.100"}]},{"cells":[{"value":"Phone"},{"value":"+1-555-123-4567"}]},{"cells":[{"value":"Audit Email"},{"value":"audit@techsolutions.com"}]},{"cells":[{"value":"Effective Date"},{"value":"11/11/2024"}]},{"cells":[{"value":"Effective Time"},{"value":"12:00 AM"}]},{"cells":[{"value":"Date"},{"value":"11/11/2024"}]},{"cells":[{"value":"Time"},{"value":"01:30 PM"}]},{"cells":[{"value":"Cancellation Date"},{"value":"10/11/2024"}]},{"cells":[{"value":"Cancellation Time"},{"value":"02:45 PM"}]},{"cells":[{"value":"Cancellation Effective Date"},{"value":"10/11/2024"}]},{"cells":[{"value":"Cancellation Effective Time"},{"value":"03:15 AM"}]},{"cells":[{"value":"Gateway Date"},{"value":"10/11/2024"}]},{"cells":[{"value":"Gateway Time"},{"value":"12:30 PM"}]},{"cells":[{"value":"Cancellation Gateway Date"},{"value":"10/11/2024"}]},{"cells":[{"value":"Cancellation Gateway Time"},{"value":"03:00 PM"}]}]}}, { page }); 
      await Then('Verify payment is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Finance\\f2\\salesforce_payments.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":48,"tags":["@mode:serial","@platform","@payments","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Payments\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Payments\"","children":[{"start":12,"value":"Payments","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Payments\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Payments\"","children":[{"start":26,"value":"Payments","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new payment with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then Verify payment is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end