// Generated from: tests\features\Service\sr2\salesforce_service-resources.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Service Resources Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Service Resource with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@service', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Service Resources" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Service Resources"', null, { page }); 
      await Then('Add new Service Resource with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Technical Support Lead"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"User"},{"value":"Salesforce demo"}]},{"cells":[{"value":"Resource Type"},{"value":"Asset"}]},{"cells":[{"value":"Description"},{"value":"Lead technical support"}]}]}}, { page }); 
      await Then('Verify Service Resource is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Technical Support Lead"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\sr2\\salesforce_service-resources.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":22,"tags":["@mode:serial","@service","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Service Resources\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Service Resources\"","children":[{"start":12,"value":"Service Resources","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Service Resources\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Service Resources\"","children":[{"start":26,"value":"Service Resources","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new Service Resource with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then Verify Service Resource is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end