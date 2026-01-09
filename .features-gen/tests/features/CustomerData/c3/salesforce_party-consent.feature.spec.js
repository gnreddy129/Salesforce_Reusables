// Generated from: tests\features\CustomerData\c3\salesforce_party-consent.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Party Consent Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Party Consent with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Party Consent" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Party Consent"', null, { page }); 
      await Then('Add new Party Consent with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR Party Consent"}]},{"cells":[{"value":"Party"},{"value":"John Doe"}]},{"cells":[{"value":"Business Brand"},{"value":"ABC Brand"}]},{"cells":[{"value":"Choose an object"},{"value":"Customer"}]},{"cells":[{"value":"Party Role"},{"value":"John Doe"}]},{"cells":[{"value":"Privacy Consent Status"},{"value":"Seen"}]},{"cells":[{"value":"Action"},{"value":"Segment"}]},{"cells":[{"value":"Consent Captured Contact Point Type"},{"value":"Email"}]},{"cells":[{"value":"Consent Captured Source"},{"value":"Website Form"}]},{"cells":[{"value":"Effective From"},{"value":""}]},{"cells":[{"value":"Effective To"},{"value":""}]},{"cells":[{"value":"Double Consent Capture Date"},{"value":""}]},{"cells":[{"value":"Double Consent Capture Time"},{"value":""}]},{"cells":[{"value":"Consent Captured Date"},{"value":"07/10/2024"}]},{"cells":[{"value":"Consent Captured Time"},{"value":"10:30 AM"}]}]}}, { page }); 
      await Then('Verify Party Consent is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR Party Consent"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\c3\\salesforce_party-consent.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":32,"tags":["@mode:serial","@customer","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Party Consent\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Party Consent\"","children":[{"start":12,"value":"Party Consent","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Party Consent\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Party Consent\"","children":[{"start":26,"value":"Party Consent","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new Party Consent with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then Verify Party Consent is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end