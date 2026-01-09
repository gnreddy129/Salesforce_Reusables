// Generated from: tests\features\Finance\f1\salesforce_payment-authorization-adjustments.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Payment Authorization Adjustments Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new payment authorization adjustment', () => {

    test('Example #1', { tag: ['@mode:serial', '@paymentauthorizationadjustment', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Payment Authorization Adjustments" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Payment Authorization Adjustments"', null, { page }); 
      await Then('Add new payment authorization adjustment with following details', {"dataTable":{"rows":[{"cells":[{"value":"Account"},{"value":"Testing"}]},{"cells":[{"value":"Status"},{"value":"Processed"}]},{"cells":[{"value":"Amount"},{"value":"1000"}]},{"cells":[{"value":"Payment Authorization"},{"value":"PA-000000001"}]},{"cells":[{"value":"Adjustment Type"},{"value":"Reversal"}]},{"cells":[{"value":"Processing Mode"},{"value":"External"}]},{"cells":[{"value":"Effective Date"},{"value":"11/12/2024"}]},{"cells":[{"value":"Effective Time"},{"value":"9:30 AM"}]},{"cells":[{"value":"Date"},{"value":"01/12/2024"}]},{"cells":[{"value":"Date Time"},{"value":"10:30 AM"}]},{"cells":[{"value":"Comments"},{"value":"Test authorization"}]},{"cells":[{"value":"Gateway Date"},{"value":"01/01/2025"}]},{"cells":[{"value":"Gateway Time"},{"value":"10:00 AM"}]},{"cells":[{"value":"Gateway Result Code Description"},{"value":"Success"}]},{"cells":[{"value":"Gateway Result Code"},{"value":"GW001"}]},{"cells":[{"value":"Gateway Reference Details"},{"value":"Gateway processed"}]},{"cells":[{"value":"Gateway Reference Number"},{"value":"REF-12345-001"}]},{"cells":[{"value":"MAC Address"},{"value":"AA:BB:CC:DD:EE:FF"}]},{"cells":[{"value":"IP Address"},{"value":"192.168.1.1"}]},{"cells":[{"value":"Phone"},{"value":"9876543210"}]},{"cells":[{"value":"Audit Email"},{"value":"admin@test.com"}]}]}}, { page }); 
      await Then('Verify payment authorization adjustment is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Finance\\f1\\salesforce_payment-authorization-adjustments.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":35,"tags":["@mode:serial","@paymentauthorizationadjustment","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Payment Authorization Adjustments\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Payment Authorization Adjustments\"","children":[{"start":12,"value":"Payment Authorization Adjustments","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Payment Authorization Adjustments\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Payment Authorization Adjustments\"","children":[{"start":26,"value":"Payment Authorization Adjustments","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new payment authorization adjustment with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then Verify payment authorization adjustment is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end