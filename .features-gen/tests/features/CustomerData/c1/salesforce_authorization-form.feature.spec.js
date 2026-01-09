// Generated from: tests\features\CustomerData\c1\salesforce_authorization-form.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Authorization Form Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Authorization Form with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@regression', '@salesforce_authorization-form1'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Authorization Form" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Authorization Form"', null, { page }); 
      await Then('Add new Authorization Form with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR Authorization Form"}]},{"cells":[{"value":"Revision Number"},{"value":"1.0"}]},{"cells":[{"value":"Effective From Date"},{"value":"10/11/2025"}]},{"cells":[{"value":"Effective To Date"},{"value":"11/12/2024"}]},{"cells":[{"value":"Default Auth Form Text"},{"value":"Testing"}]},{"cells":[{"value":"Is Signature Required"},{"value":"true"}]}]}}, { page }); 
      await Then('Verify Authorization Form is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR Authorization Form"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\c1\\salesforce_authorization-form.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":23,"tags":["@mode:serial","@customer","@regression","@salesforce_authorization-form1"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Authorization Form\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Authorization Form\"","children":[{"start":12,"value":"Authorization Form","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Authorization Form\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Authorization Form\"","children":[{"start":26,"value":"Authorization Form","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new Authorization Form with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then Verify Authorization Form is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end