// Generated from: tests\features\CustomerData\salesforce_contact-point-consent.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Contact Point Consent Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Contact Point Consent with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Contact Point Consent" in app launcher', null, { page }); 
      await Then('Add new Contact Point Consent with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Email Marketing Consent"}]},{"cells":[{"value":"Contact Point Choose Object"},{"value":"Contact Point Address"}]},{"cells":[{"value":"Contact Point"},{"value":"John Doe"}]},{"cells":[{"value":"Data Use Purpose"},{"value":"GDPR"}]},{"cells":[{"value":"Privacy Consent Status"},{"value":"Opt In"}]},{"cells":[{"value":"Party Role Choose Object"},{"value":"Customer"}]},{"cells":[{"value":"Party Role"},{"value":"John Doe"}]},{"cells":[{"value":"Business Brand"},{"value":"ABC Brand"}]},{"cells":[{"value":"Effective From Date"},{"value":"10/10/2024"}]},{"cells":[{"value":"Effective From Time"},{"value":"10:30 AM"}]},{"cells":[{"value":"Effective To Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"Effective To Time"},{"value":"10:30 AM"}]},{"cells":[{"value":"Capture Source"},{"value":"Website Form"}]},{"cells":[{"value":"Capture Contact Point Type"},{"value":"Email"}]},{"cells":[{"value":"Capture Date Date"},{"value":"07/10/2024"}]},{"cells":[{"value":"Capture Date Time"},{"value":"10:30 AM"}]},{"cells":[{"value":"Double Consent Capture Date Date"},{"value":"12/05/2024"}]},{"cells":[{"value":"Double Consent Capture Date Time"},{"value":"10:30 AM"}]}]}}, { page }); 
      await Then('Verify Contact Point Consent is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Email Marketing Consent"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\salesforce_contact-point-consent.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":34,"tags":["@mode:serial","@customer","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Contact Point Consent\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Contact Point Consent\"","children":[{"start":12,"value":"Contact Point Consent","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new Contact Point Consent with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then Verify Contact Point Consent is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end