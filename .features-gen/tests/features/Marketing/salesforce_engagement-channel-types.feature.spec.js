// Generated from: tests\features\Marketing\salesforce_engagement-channel-types.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Engagement Channel Types Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Engagement Channel Type with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@marketing', '@engagement-channel-types', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Engagement Channel Types" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Engagement Channel Types"', null, { page }); 
      await Then('Add new engagement channel type with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Channel 1"}]},{"cells":[{"value":"Contact Point Type"},{"value":"Phone"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"Usage Type"},{"value":"Salesforce Scheduler"}]}]}}, { page }); 
      await And('Verify Engagement Channel Type is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Channel 1"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Marketing\\salesforce_engagement-channel-types.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":21,"tags":["@mode:serial","@marketing","@engagement-channel-types","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Engagement Channel Types\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Engagement Channel Types\"","children":[{"start":12,"value":"Engagement Channel Types","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Engagement Channel Types\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Engagement Channel Types\"","children":[{"start":26,"value":"Engagement Channel Types","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new engagement channel type with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And Verify Engagement Channel Type is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end