// Generated from: tests\features\OtherFunctionality\o4\salesforce_work-step-templates.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Work Step Templates Creation', () => {

  test.describe('Create a new work step template with basic details', () => {

    test('Example #1', { tag: ['@WorkStepTemplates', '@OtherFunctionality', '@Smoke'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Work Step Templates" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Work Step Templates"', null, { page }); 
      await When('I create a new work step template with the following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Work Step Template"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"Action Definition"},{"value":"Log a Call"}]},{"cells":[{"value":"Description"},{"value":"Automated test work step template"}]}]}}, { page }); 
      await And('I should see the work step template creation success', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Work Step Template"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\o4\\salesforce_work-step-templates.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":23,"tags":["@WorkStepTemplates","@OtherFunctionality","@Smoke"],"steps":[{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When Search for \"Work Step Templates\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Work Step Templates\"","children":[{"start":12,"value":"Work Step Templates","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Work Step Templates\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Work Step Templates\"","children":[{"start":26,"value":"Work Step Templates","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I create a new work step template with the following details:","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I should see the work step template creation success","stepMatchArguments":[]}]},
]; // bdd-data-end