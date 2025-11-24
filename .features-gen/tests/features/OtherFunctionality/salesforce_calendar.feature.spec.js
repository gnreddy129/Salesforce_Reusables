// Generated from: tests\features\OtherFunctionality\salesforce_calendar.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Calendar Event Creation', () => {

  test.describe('Create a new calendar event with various field combinations', () => {

    test('Example #1', { tag: ['@Calendar', '@OtherFunctionality', '@Smoke'] }, async ({ Given, When, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Calendar" in app launcher', null, { page }); 
      await When('Add new calendar event with the following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Meeting"}]},{"cells":[{"value":"Location"},{"value":"Conference Room"}]},{"cells":[{"value":"Start Date"},{"value":"21-Nov-2025"}]},{"cells":[{"value":"Start Time"},{"value":"10:00 AM"}]},{"cells":[{"value":"End Date"},{"value":"22-Nov-2025"}]},{"cells":[{"value":"End Time"},{"value":"11:00 AM"}]},{"cells":[{"value":"Name"},{"value":"John Doe"}]},{"cells":[{"value":"Related To"},{"value":"Testing"}]},{"cells":[{"value":"All-Day Event"},{"value":"false"}]},{"cells":[{"value":"Description"},{"value":"Weekly team standup meeting"}]}]}}, { page }); 
      await And('Verify the calendar event is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Meeting"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_calendar.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":28,"tags":["@Calendar","@OtherFunctionality","@Smoke"],"steps":[{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When Search for \"Calendar\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Calendar\"","children":[{"start":12,"value":"Calendar","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When Add new calendar event with the following details:","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And Verify the calendar event is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end