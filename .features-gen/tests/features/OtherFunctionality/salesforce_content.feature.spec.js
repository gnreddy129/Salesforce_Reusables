// Generated from: tests\features\OtherFunctionality\salesforce_content.feature
import { test } from "playwright-bdd";

test.describe('Salesforce CMS Content Workspace Creation', () => {

  test.describe('Create a new CMS workspace with comprehensive details', () => {

    test('Example #1', { tag: ['@Content', '@CMS', '@OtherFunctionality', '@Smoke'] }, async ({ Given, When, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Content" in app launcher', null, { page }); 
      await When('I create a new CMS workspace with the following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Content Workspace"}]},{"cells":[{"value":"API Name"},{"value":"Test_Content_Workspace"}]},{"cells":[{"value":"Description"},{"value":"Automated test workspace for content"}]},{"cells":[{"value":"Channel"},{"value":"Enablement"}]},{"cells":[{"value":"Default Language"},{"value":"French"}]}]}}, { page }); 
      await And('I should see the CMS workspace creation success', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Content Workspace"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_content.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":23,"tags":["@Content","@CMS","@OtherFunctionality","@Smoke"],"steps":[{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When Search for \"Content\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Content\"","children":[{"start":12,"value":"Content","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I create a new CMS workspace with the following details:","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I should see the CMS workspace creation success","stepMatchArguments":[]}]},
]; // bdd-data-end