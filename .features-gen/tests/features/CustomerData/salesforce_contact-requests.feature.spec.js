// Generated from: tests\features\CustomerData\salesforce_contact-requests.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Contact Requests Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Contact Requests with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Contact Requests" in app launcher', null, { page }); 
      await Then('Add new Contact Request with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Requested By"},{"value":"John Smith"}]},{"cells":[{"value":"Related To"},{"value":"Testing"}]},{"cells":[{"value":"Preferred Channel"},{"value":"Phone"}]},{"cells":[{"value":"Preferred Phone Number"},{"value":"+1-555-987-6543"}]},{"cells":[{"value":"Request Status"},{"value":"Attempted"}]},{"cells":[{"value":"Request Reason"},{"value":"Case"}]},{"cells":[{"value":"Request Description"},{"value":"Question about case charges"}]}]}}, { page }); 
      await Then('Verify Contact Request is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Requested By"},{"value":"John Smith"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\salesforce_contact-requests.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":23,"tags":["@mode:serial","@customer","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Contact Requests\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Contact Requests\"","children":[{"start":12,"value":"Contact Requests","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new Contact Request with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then Verify Contact Request is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end