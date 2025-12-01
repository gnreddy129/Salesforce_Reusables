// Generated from: tests\features\Platform\salesforce_email-templates.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Email Templates Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Email Templates with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@platform', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Email Templates" in app launcher', null, { page }); 
      await Then('Add new Email Template with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Email Template Name"},{"value":"Welcome Email"}]},{"cells":[{"value":"Related Entity Type"},{"value":"Contact"}]},{"cells":[{"value":"Description"},{"value":"Welcome email for new users"}]},{"cells":[{"value":"Folder"},{"value":"Public Email Templates"}]},{"cells":[{"value":"Letterhead"},{"value":""}]},{"cells":[{"value":"Subject"},{"value":"Test Email"}]},{"cells":[{"value":"Body"},{"value":"lorem ipsum dolor sit amet"}]}]}}, { page }); 
      await Then('Verify Email Template is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Email Template Name"},{"value":"Welcome Email"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Platform\\salesforce_email-templates.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":23,"tags":["@mode:serial","@platform","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Email Templates\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Email Templates\"","children":[{"start":12,"value":"Email Templates","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new Email Template with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then Verify Email Template is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end