// Generated from: tests\features\Finance\f2\salesforce_payment-gateway-logs.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Payment Gateway Logs Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new payment gateway log with comprehensive details', () => {

    test('Example #1', { tag: ['@mode:serial', '@paymentgatewaylogs', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Payment Gateway Logs" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Payment Gateway Logs"', null, { page }); 
      await Then('Add new payment gateway log with following details', {"dataTable":{"rows":[{"cells":[{"value":"Interaction Type"},{"value":"Authorization"}]},{"cells":[{"value":"Object Type"},{"value":"Alternative Payment Method"}]},{"cells":[{"value":"Referenced Entity"},{"value":"PM_APM-000000001"}]},{"cells":[{"value":"Payment Gateway"},{"value":""}]},{"cells":[{"value":"Status"},{"value":"Success"}]},{"cells":[{"value":"Gateway Date"},{"value":"11/12/2024"}]},{"cells":[{"value":"Gateway Time"},{"value":"9:30 AM"}]},{"cells":[{"value":"Gateway Reference Number"},{"value":"REF-2024-001"}]},{"cells":[{"value":"Gateway Result Code"},{"value":"200"}]},{"cells":[{"value":"Gateway Result Code Description"},{"value":"Request approved successfully"}]},{"cells":[{"value":"Gateway Auth Code"},{"value":"AUTH-12345"}]},{"cells":[{"value":"Gateway Avs Code"},{"value":"M"}]},{"cells":[{"value":"Gateway Message"},{"value":"Transaction Approved"}]},{"cells":[{"value":"Salesforce Result Code"},{"value":"Success"}]},{"cells":[{"value":"Salesforce Reference Number"},{"value":"SF-REF-001"}]},{"cells":[{"value":"Request"},{"value":"{\"amount\": 1000, \"currency\": \"USD\", \"card\": \"4111111\"}"}]},{"cells":[{"value":"Response"},{"value":"{\"status\": \"approved\", \"id\": \"TXN-001\", \"code\": \"00\"}"}]}]}}, { page }); 
      await Then('Verify payment gateway log is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Finance\\f2\\salesforce_payment-gateway-logs.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":31,"tags":["@mode:serial","@paymentgatewaylogs","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Payment Gateway Logs\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Payment Gateway Logs\"","children":[{"start":12,"value":"Payment Gateway Logs","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Payment Gateway Logs\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Payment Gateway Logs\"","children":[{"start":26,"value":"Payment Gateway Logs","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new payment gateway log with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then Verify payment gateway log is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end