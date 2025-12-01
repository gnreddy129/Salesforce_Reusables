// Generated from: tests\features\Finance\salesforce_payment-authorization.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Payment Authorizations Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create new Payment Authorization with different data', () => {

    test('Example #1', { tag: ['@mode:serial', '@paymentauthorizations', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Payment Authorizations" in app launcher', null, { page }); 
      await Then('Add new payment authorization with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Account"},{"value":"Testing"}]},{"cells":[{"value":"Status"},{"value":"Processed"}]},{"cells":[{"value":"Amount"},{"value":"500"}]},{"cells":[{"value":"Date"},{"value":"11/10/2025"}]},{"cells":[{"value":"Time"},{"value":"2:22 AM"}]},{"cells":[{"value":"Payment Method"},{"value":""}]},{"cells":[{"value":"Payment Group"},{"value":""}]},{"cells":[{"value":"Expiration Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Expiration Time"},{"value":"3:00 AM"}]},{"cells":[{"value":"Effective Date"},{"value":"11/04/2025"}]},{"cells":[{"value":"Effective Time"},{"value":"2:00 AM"}]},{"cells":[{"value":"Processing Mode"},{"value":"External"}]},{"cells":[{"value":"Comments"},{"value":"Online payment renewal"}]},{"cells":[{"value":"Payment Gateway"},{"value":""}]},{"cells":[{"value":"Gateway Date"},{"value":"11/08/2025"}]},{"cells":[{"value":"Gateway Time"},{"value":"2:05 AM"}]},{"cells":[{"value":"Gateway Auth Code"},{"value":"AUTH123456"}]},{"cells":[{"value":"Gateway Result Code Description"},{"value":"Success"}]},{"cells":[{"value":"Gateway Result Code"},{"value":"200"}]},{"cells":[{"value":"Gateway Reference Details"},{"value":"REF001-STR"}]},{"cells":[{"value":"Gateway Reference Number"},{"value":"PA-REF-001"}]},{"cells":[{"value":"MAC Address"},{"value":"AA:BB:CC:DD:EE:FF"}]},{"cells":[{"value":"IP Address"},{"value":"192.168.1.100"}]},{"cells":[{"value":"Phone"},{"value":"+91-9876543210"}]},{"cells":[{"value":"Audit Email"},{"value":"audit@company.com"}]}]}}, { page }); 
      await Then('Verify payment authorization is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Account"},{"value":"Testing"}]},{"cells":[{"value":"Status"},{"value":"Processed"}]},{"cells":[{"value":"Amount"},{"value":"500"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Finance\\salesforce_payment-authorization.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":43,"tags":["@mode:serial","@paymentauthorizations","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Payment Authorizations\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Payment Authorizations\"","children":[{"start":12,"value":"Payment Authorizations","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new payment authorization with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then Verify payment authorization is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end