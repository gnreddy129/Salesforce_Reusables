// Generated from: tests\features\CustomerData\salesforce_communication-subscription-channel-types.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Communication Subscription Channel Types Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Communication Subscription Channel Type with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customerdata', '@communication-subscription-channel-types', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Communication Subscription Channel Types" in app launcher', null, { page }); 
      await Then('Add new communication subscription channel type with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Channel Type 1"}]},{"cells":[{"value":"Engagement Channel Type"},{"value":"Test Channel 1"}]},{"cells":[{"value":"Communication Subscription"},{"value":"Commutation Subscription A"}]}]}}, { page }); 
      await And('Verify Communication Subscription Channel Type is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Channel Type 1"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\salesforce_communication-subscription-channel-types.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":19,"tags":["@mode:serial","@customerdata","@communication-subscription-channel-types","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Communication Subscription Channel Types\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Communication Subscription Channel Types\"","children":[{"start":12,"value":"Communication Subscription Channel Types","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new communication subscription channel type with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And Verify Communication Subscription Channel Type is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end