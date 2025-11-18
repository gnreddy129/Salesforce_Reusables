// Generated from: tests\features\CustomerData\salesforce_authorization-form-consent.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Authorization Form Consent Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Authorization Form Consent with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Authorization Form Consent" in app launcher', null, { page }); 
      await Then('Add new Authorization Form Consent with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR Consent Record"}]},{"cells":[{"value":"Consent Giver"},{"value":"John Doe"}]},{"cells":[{"value":"Choose an object"},{"value":"Contact"}]},{"cells":[{"value":"Authorization Form Text"},{"value":"GDPR Auth Text"}]},{"cells":[{"value":"Consent Captured Source"},{"value":"Website Form"}]},{"cells":[{"value":"Consent Captured Source Type"},{"value":"Web"}]},{"cells":[{"value":"Status"},{"value":"Seen"}]},{"cells":[{"value":"Date"},{"value":"11/30/2025"}]},{"cells":[{"value":"Time"},{"value":"12:15 AM"}]},{"cells":[{"value":"Content Version"},{"value":"--None--"}]}]}}, { page }); 
      await Then('Verify Authorization Form Consent is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR Consent Record"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\salesforce_authorization-form-consent.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":26,"tags":["@mode:serial","@customer","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Authorization Form Consent\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Authorization Form Consent\"","children":[{"start":12,"value":"Authorization Form Consent","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new Authorization Form Consent with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then Verify Authorization Form Consent is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end