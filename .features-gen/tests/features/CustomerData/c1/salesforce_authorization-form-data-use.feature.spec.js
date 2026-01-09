// Generated from: tests\features\CustomerData\c1\salesforce_authorization-form-data-use.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Authorization Form Data Use Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Authorization Form Data Use with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Authorization Form Data Use" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Authorization Form Data Use"', null, { page }); 
      await Then('Add new Authorization Form Data Use with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR Data Use"}]},{"cells":[{"value":"Authorization Form"},{"value":"Testing"}]},{"cells":[{"value":"Data Use Purpose"},{"value":"Testing"}]}]}}, { page }); 
      await Then('Verify Authorization Form Data Use is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR Data Use"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\c1\\salesforce_authorization-form-data-use.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":20,"tags":["@mode:serial","@customer","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Authorization Form Data Use\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Authorization Form Data Use\"","children":[{"start":12,"value":"Authorization Form Data Use","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Authorization Form Data Use\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Authorization Form Data Use\"","children":[{"start":26,"value":"Authorization Form Data Use","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new Authorization Form Data Use with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Verify Authorization Form Data Use is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end