// Generated from: tests\features\OtherFunctionality\salesforce_streaming-channels.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Streaming Channels Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Streaming Channel with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@otherfunctionality', '@streaming-channels', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Streaming Channels" in app launcher', null, { page }); 
      await Then('Add new streaming channel with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Streaming Channel Name"},{"value":"/u/TestChannel1"}]},{"cells":[{"value":"Description"},{"value":"Test streaming channel data"}]}]}}, { page }); 
      await And('Verify Streaming Channel is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Streaming Channel Name"},{"value":"/u/TestChannel1"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_streaming-channels.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":18,"tags":["@mode:serial","@otherfunctionality","@streaming-channels","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Streaming Channels\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Streaming Channels\"","children":[{"start":12,"value":"Streaming Channels","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new streaming channel with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And Verify Streaming Channel is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end