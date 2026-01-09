// Generated from: tests\features\Service\sr1\salesforce_entitlements.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Entitlements Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new entitlement with comprehensive details', () => {

    test('Example #1', { tag: ['@mode:serial', '@entitlements', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Entitlements" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Entitlements"', null, { page }); 
      await Then('Add new entitlement with following details', {"dataTable":{"rows":[{"cells":[{"value":"Entitlement Name"},{"value":"Web Support ENT"}]},{"cells":[{"value":"Type"},{"value":"Web Support"}]},{"cells":[{"value":"Start Date"},{"value":"11/10/2025"}]},{"cells":[{"value":"Account Name"},{"value":"Testing"}]},{"cells":[{"value":"End Date"},{"value":"11/10/2025"}]},{"cells":[{"value":"Service Contract"},{"value":""}]},{"cells":[{"value":"Business Hours"},{"value":""}]},{"cells":[{"value":"Asset Name"},{"value":""}]},{"cells":[{"value":"SLA Policy"},{"value":""}]},{"cells":[{"value":"Per Incident"},{"value":"true"}]},{"cells":[{"value":"Remaining Cases"},{"value":"5"}]},{"cells":[{"value":"Cases Per Entitlement"},{"value":"10"}]}]}}, { page }); 
      await Then('Verify entitlement is created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Entitlement Name"},{"value":"Web Support ENT"}]},{"cells":[{"value":"Type"},{"value":"Web Support"}]},{"cells":[{"value":"Account"},{"value":"Testing"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\sr1\\salesforce_entitlements.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":29,"tags":["@mode:serial","@entitlements","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Entitlements\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Entitlements\"","children":[{"start":12,"value":"Entitlements","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Entitlements\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Entitlements\"","children":[{"start":26,"value":"Entitlements","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new entitlement with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then Verify entitlement is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end