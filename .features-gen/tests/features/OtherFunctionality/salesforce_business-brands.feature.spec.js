// Generated from: tests\features\OtherFunctionality\salesforce_business-brands.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Business Brands Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new business brand', () => {

    test('Example #1', { tag: ['@mode:serial', '@business-brands', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Business Brands" in app launcher', null, { page }); 
      await Then('Add new business brand with following details', {"dataTable":{"rows":[{"cells":[{"value":"Name"},{"value":"Premium Brand"}]},{"cells":[{"value":"Org Id"},{"value":"ORG1"}]},{"cells":[{"value":"Parent"},{"value":"pk"}]}]}}, { page }); 
      await Then('Verify business brand is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Name"},{"value":"Premium Brand"}]},{"cells":[{"value":"Org Id"},{"value":"ORG1"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_business-brands.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":18,"tags":["@mode:serial","@business-brands","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Business Brands\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Business Brands\"","children":[{"start":12,"value":"Business Brands","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new business brand with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then Verify business brand is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end