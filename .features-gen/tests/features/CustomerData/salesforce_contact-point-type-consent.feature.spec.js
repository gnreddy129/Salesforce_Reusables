// Generated from: tests\features\CustomerData\salesforce_contact-point-type-consent.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Contact Point Type Consent Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Contact Point Type Consent with Different Data', () => {

    test('Example #1', { tag: ['@customer', '@regression', '@mode:serial'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Contact Point Type Consent" in app launcher', null, { page }); 
      await Then('Add new Contact Point Type Consent with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Email Consent Type Example"}]},{"cells":[{"value":"Party"},{"value":"John Smith"}]},{"cells":[{"value":"Contact Point Type"},{"value":"Email"}]},{"cells":[{"value":"Data Use Purpose"},{"value":"Testing"}]},{"cells":[{"value":"Privacy Consent Status"},{"value":"Opt In"}]},{"cells":[{"value":"Party Role Choose Object"},{"value":"Customer"}]},{"cells":[{"value":"Party Role"},{"value":"John Doe"}]},{"cells":[{"value":"Business Brand"},{"value":"Business Brand A"}]},{"cells":[{"value":"Effective From Date"},{"value":"10/10/2024"}]},{"cells":[{"value":"Effective From Time"},{"value":"10:30 AM"}]},{"cells":[{"value":"Effective To Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Effective To Time"},{"value":"10:30 AM"}]},{"cells":[{"value":"Capture Source"},{"value":"Website Form"}]},{"cells":[{"value":"Capture Date Date"},{"value":"07/10/2024"}]},{"cells":[{"value":"Capture Date Time"},{"value":"10:30 AM"}]},{"cells":[{"value":"Double Consent Capture Date Date"},{"value":"12/05/2024"}]},{"cells":[{"value":"Double Consent Capture Date Time"},{"value":"10:30 AM"}]}]}}, { page }); 
      await Then('Verify Contact Point Type Consent is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Email Consent Type Example"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\salesforce_contact-point-type-consent.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":32,"tags":["@customer","@regression","@mode:serial"],"steps":[{"pwStepLine":10,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When Search for \"Contact Point Type Consent\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Contact Point Type Consent\"","children":[{"start":12,"value":"Contact Point Type Consent","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then Add new Contact Point Type Consent with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then Verify Contact Point Type Consent is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end