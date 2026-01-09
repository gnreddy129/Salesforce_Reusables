// Generated from: tests\features\OtherFunctionality\o2\salesforce_consumption-schedules.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Consumption Schedule Creation', () => {

  test.describe('Create a new consumption schedule with various field combinations', () => {

    test('Example #1', { tag: ['@ConsumptionSchedule', '@OtherFunctionality', '@Smoke'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Consumption Schedules" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Consumption Schedules"', null, { page }); 
      await When('I create a new consumption schedule with the following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Consumption Schedule Name"},{"value":"Test Schedule 001"}]},{"cells":[{"value":"Active"},{"value":"false"}]},{"cells":[{"value":"Description"},{"value":"Automated test schedule 1"}]},{"cells":[{"value":"Rating Method"},{"value":"Tier"}]},{"cells":[{"value":"Billing Term"},{"value":"12"}]},{"cells":[{"value":"Type"},{"value":"Slab"}]},{"cells":[{"value":"Billing Term Unit"},{"value":"Month"}]}]}}, { page }); 
      await And('I should see the consumption schedule details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Consumption Schedule Name"},{"value":"Test Schedule 001"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\o2\\salesforce_consumption-schedules.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":26,"tags":["@ConsumptionSchedule","@OtherFunctionality","@Smoke"],"steps":[{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When Search for \"Consumption Schedules\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Consumption Schedules\"","children":[{"start":12,"value":"Consumption Schedules","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Consumption Schedules\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Consumption Schedules\"","children":[{"start":26,"value":"Consumption Schedules","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I create a new consumption schedule with the following details:","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I should see the consumption schedule details","stepMatchArguments":[]}]},
]; // bdd-data-end