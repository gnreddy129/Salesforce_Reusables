// Generated from: tests\features\OtherFunctionality\salesforce_categories.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Category Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new category', () => {

    test('Example #1', { tag: ['@mode:serial', '@categories', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Categories" in app launcher', null, { page }); 
      await Then('Add new category with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Cat A"}]},{"cells":[{"value":"Catalog"},{"value":"Testing"}]},{"cells":[{"value":"ShowMenu"},{"value":"true"}]},{"cells":[{"value":"ParentCategory"},{"value":""}]},{"cells":[{"value":"Description"},{"value":"Auto-created test A"}]},{"cells":[{"value":"SortOrder"},{"value":"1"}]}]}}, { page }); 
      await Then('Verify category is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Cat A"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_categories.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":22,"tags":["@mode:serial","@categories","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Categories\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Categories\"","children":[{"start":12,"value":"Categories","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new category with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then Verify category is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end