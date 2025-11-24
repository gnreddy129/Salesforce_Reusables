// Generated from: tests\features\Sales\salesforce_sellers.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Sellers Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Seller with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@sales', '@sellers', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Sellers" in app launcher', null, { page }); 
      await Then('Add new seller with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Party"},{"value":"John Doe"}]},{"cells":[{"value":"Name"},{"value":"Test Seller 1"}]},{"cells":[{"value":"Seller Type"},{"value":"Reseller"}]},{"cells":[{"value":"Seller Tier"},{"value":"Gold"}]},{"cells":[{"value":"Sales Amount"},{"value":"10000"}]},{"cells":[{"value":"Active To Date"},{"value":"12/03/2025"}]},{"cells":[{"value":"Active From Date"},{"value":"01/01/2025"}]}]}}, { page }); 
      await And('Verify Seller is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Seller 1"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Sales\\salesforce_sellers.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":23,"tags":["@mode:serial","@sales","@sellers","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Sellers\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Sellers\"","children":[{"start":12,"value":"Sellers","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new seller with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And Verify Seller is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end