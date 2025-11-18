// Generated from: tests\features\CustomerData\salesforce_data-use-legal-basis.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Data Use Legal Basis Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Data Use Legal Basis with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Data Use Legal Basis" in app launcher', null, { page }); 
      await Then('Add new Data Use Legal Basis with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR Consent"}]},{"cells":[{"value":"Source"},{"value":"Customer Website"}]},{"cells":[{"value":"Description"},{"value":"Legal basis for GDPR compliance"}]}]}}, { page }); 
      await Then('Verify Data Use Legal Basis is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR Consent"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\salesforce_data-use-legal-basis.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":19,"tags":["@mode:serial","@customer","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Data Use Legal Basis\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Data Use Legal Basis\"","children":[{"start":12,"value":"Data Use Legal Basis","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new Data Use Legal Basis with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then Verify Data Use Legal Basis is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end