// Generated from: tests\features\Service\salesforce_quick-texts.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Quick Texts Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Quick Texts with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@service', '@quick-texts', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Quick Text" in app launcher', null, { page }); 
      await Then('Add new quick text with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"QuickTextName"},{"value":"Order Confirmation"}]},{"cells":[{"value":"Message"},{"value":"Your order has been confirmed and will be shipped within 24 hours"}]},{"cells":[{"value":"Category"},{"value":"Greetings"}]},{"cells":[{"value":"RelatedTo"},{"value":"Account"}]},{"cells":[{"value":"Field"},{"value":"Account Description"}]},{"cells":[{"value":"IncludeInSelectedChannels"},{"value":"true"}]}]}}, { page }); 
      await Then('Verify quick text is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"QuickTextName"},{"value":"Order Confirmation"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_quick-texts.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":22,"tags":["@mode:serial","@service","@quick-texts","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Quick Text\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Quick Text\"","children":[{"start":12,"value":"Quick Text","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new quick text with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then Verify quick text is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end