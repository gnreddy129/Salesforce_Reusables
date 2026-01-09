// Generated from: tests\features\CustomerData\c2\salesforce_communication-subscriptions.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Communication Subscriptions Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Communication Subscriptionss with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Communication Subscriptions" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Communication Subscriptions"', null, { page }); 
      await Then('Add new Communication Subscriptions with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Monthly Newsletter"}]}]}}, { page }); 
      await Then('Verify Communication Subscriptions is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Monthly Newsletter"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\c2\\salesforce_communication-subscriptions.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":18,"tags":["@mode:serial","@customer","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Communication Subscriptions\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Communication Subscriptions\"","children":[{"start":12,"value":"Communication Subscriptions","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Communication Subscriptions\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Communication Subscriptions\"","children":[{"start":26,"value":"Communication Subscriptions","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new Communication Subscriptions with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then Verify Communication Subscriptions is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end