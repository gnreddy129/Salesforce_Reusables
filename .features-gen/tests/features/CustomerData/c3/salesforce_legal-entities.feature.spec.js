// Generated from: tests\features\CustomerData\c3\salesforce_legal-entities.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Legal Entities Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Legal Entity with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Legal Entities" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Legal Entities"', null, { page }); 
      await Then('Add new Legal Entities with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Legal Entity Name"},{"value":"ABC Corp Legal"}]},{"cells":[{"value":"Company Name"},{"value":"ABC Corporation"}]},{"cells":[{"value":"Country"},{"value":"United States"}]},{"cells":[{"value":"Street"},{"value":"123 Business St"}]},{"cells":[{"value":"City"},{"value":"New York"}]},{"cells":[{"value":"State"},{"value":"New York"}]},{"cells":[{"value":"Postal Code"},{"value":"10001"}]},{"cells":[{"value":"Description"},{"value":"Main legal entity"}]},{"cells":[{"value":"Status"},{"value":"Active"}]}]}}, { page }); 
      await Then('Verify Legal Entities are created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Legal Entity Name"},{"value":"ABC Corp Legal"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\c3\\salesforce_legal-entities.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":26,"tags":["@mode:serial","@customer","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Legal Entities\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Legal Entities\"","children":[{"start":12,"value":"Legal Entities","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Legal Entities\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Legal Entities\"","children":[{"start":26,"value":"Legal Entities","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new Legal Entities with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then Verify Legal Entities are created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end