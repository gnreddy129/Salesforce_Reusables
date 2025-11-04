// Generated from: tests\features\salesforce_catalog.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Catalogue Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new catalogue items', () => {

    test('Example #1', { tag: ['@mode:serial', '@catalogue', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Catalogs" in app launcher', null, { page }); 
      await Then('Add new catalog item with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Sample Item A"}]}]}}, { page }); 
      await Then('Verify catalog item is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Sample Item A"}]}]}}, { page }); 
    });

    test('Example #2', { tag: ['@mode:serial', '@catalogue', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Catalogs" in app launcher', null, { page }); 
      await Then('Add new catalog item with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Sample Service B"}]}]}}, { page }); 
      await Then('Verify catalog item is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Sample Service B"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\salesforce_catalog.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":17,"tags":["@mode:serial","@catalogue","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Catalogs\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Catalogs\"","children":[{"start":12,"value":"Catalogs","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new catalog item with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then Verify catalog item is created successfully with details","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":18,"tags":["@mode:serial","@catalogue","@regression"],"steps":[{"pwStepLine":17,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Catalogs\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Catalogs\"","children":[{"start":12,"value":"Catalogs","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new catalog item with following details","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then Verify catalog item is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end