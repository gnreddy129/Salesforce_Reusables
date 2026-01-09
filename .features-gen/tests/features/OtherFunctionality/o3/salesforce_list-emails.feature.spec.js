// Generated from: tests\features\OtherFunctionality\o3\salesforce_list-emails.feature
import { test } from "playwright-bdd";

test.describe('Salesforce List Emails Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Send email to list', () => {

    test('Example #1', { tag: ['@mode:serial', '@list-emails', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "List Emails" in app launcher', null, { page }); 
      await Then('Send email with following details', {"dataTable":{"rows":[{"cells":[{"value":"Recipients"},{"value":"My Unread Leads"}]},{"cells":[{"value":"Subject"},{"value":"Q4 Marketing Campaign"}]}]}}, { page }); 
      await Then('Verify email is sent successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Recipients"},{"value":"My Unread Leads"}]},{"cells":[{"value":"Subject"},{"value":"Q4 Marketing Campaign"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\o3\\salesforce_list-emails.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":17,"tags":["@mode:serial","@list-emails","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"List Emails\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"List Emails\"","children":[{"start":12,"value":"List Emails","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Send email with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then Verify email is sent successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end