// Generated from: tests\features\Marketing\salesforce_promotion-segments.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Promotion Segments Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new promotion segment', () => {

    test('Example #1', { tag: ['@mode:serial', '@promotion-segments', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Promotion Segments" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Promotion Segments"', null, { page }); 
      await Then('Add new promotion segment with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Premium Q5 Promotion"}]}]}}, { page }); 
      await Then('Verify promotion segment is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Premium Q5 Promotion"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Marketing\\salesforce_promotion-segments.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":18,"tags":["@mode:serial","@promotion-segments","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Promotion Segments\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Promotion Segments\"","children":[{"start":12,"value":"Promotion Segments","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Promotion Segments\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Promotion Segments\"","children":[{"start":26,"value":"Promotion Segments","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new promotion segment with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then Verify promotion segment is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end