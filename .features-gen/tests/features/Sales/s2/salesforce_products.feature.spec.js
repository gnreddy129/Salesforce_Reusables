// Generated from: tests\features\Sales\s2\salesforce_products.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Products Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Products with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@regression', '@products', '@create'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Products" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Products"', null, { page }); 
      await Then('Add new product with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Product Name"},{"value":"Standard Product"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"Product Code"},{"value":"PROD-001"}]},{"cells":[{"value":"Product Family"},{"value":"None"}]},{"cells":[{"value":"Product Description"},{"value":"Standard hardware product for testing"}]}]}}, { page }); 
      await Then('Verify product is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Product Name"},{"value":"Standard Product"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Sales\\s2\\salesforce_products.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":22,"tags":["@mode:serial","@regression","@products","@create"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Products\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Products\"","children":[{"start":12,"value":"Products","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Products\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Products\"","children":[{"start":26,"value":"Products","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new product with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then Verify product is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end