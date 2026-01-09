// Generated from: tests\features\Platform\p1\salesforce_custom-libraries.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Custom Libraries Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Custom Library with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@platform', '@custom-libraries', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Custom Libraries" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Custom Libraries"', null, { page }); 
      await Then('Add new custom library with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Library 1"}]},{"cells":[{"value":"Description"},{"value":"Test custom library data"}]},{"cells":[{"value":"Content Type"},{"value":"String"}]},{"cells":[{"value":"Active"},{"value":"true"}]}]}}, { page }); 
      await And('Verify Custom Library is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Library 1"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Platform\\p1\\salesforce_custom-libraries.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":21,"tags":["@mode:serial","@platform","@custom-libraries","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Custom Libraries\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Custom Libraries\"","children":[{"start":12,"value":"Custom Libraries","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Custom Libraries\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Custom Libraries\"","children":[{"start":26,"value":"Custom Libraries","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new custom library with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And Verify Custom Library is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end