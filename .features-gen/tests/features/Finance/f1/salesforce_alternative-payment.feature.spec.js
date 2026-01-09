// Generated from: tests\features\Finance\f1\salesforce_alternative-payment.feature
import { test } from "playwright-bdd";

test.describe('Alternative Payment Method Management in Salesforce', () => {

  test.describe('Create a new alternative payment method with complete details', () => {

    test('Example #1', async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Alternative Payment Methods" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Alternative Payment Methods"', null, { page }); 
      await And('I create a new alternative payment method with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Nickname"},{"value":"Corporate Card 2025"}]},{"cells":[{"value":"Registered Email"},{"value":""}]},{"cells":[{"value":"Account"},{"value":"Testing"}]},{"cells":[{"value":"Status"},{"value":"Active"}]},{"cells":[{"value":"Processing Mode"},{"value":"External"}]},{"cells":[{"value":"Auto Pay"},{"value":"true"}]},{"cells":[{"value":"Company Name"},{"value":"Corp Inc"}]},{"cells":[{"value":"Street"},{"value":"123 Main St"}]},{"cells":[{"value":"City"},{"value":"New York"}]},{"cells":[{"value":"State"},{"value":"South Australia"}]},{"cells":[{"value":"Country"},{"value":"Australia"}]},{"cells":[{"value":"Postal Code"},{"value":"10001"}]},{"cells":[{"value":"Comments"},{"value":"Primary corporate payment method"}]},{"cells":[{"value":"MAC Address"},{"value":"00:11:22:33:44:55"}]},{"cells":[{"value":"IP Address"},{"value":"192.168.1.100"}]},{"cells":[{"value":"Phone"},{"value":"2125551234"}]},{"cells":[{"value":"Audit Email"},{"value":"audit1@example.com"}]}]}}, { page }); 
      await Then('I should see the alternative payment method created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Nickname"},{"value":"Corporate Card 2025"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Finance\\f1\\salesforce_alternative-payment.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":35,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When Search for \"Alternative Payment Methods\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Alternative Payment Methods\"","children":[{"start":12,"value":"Alternative Payment Methods","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Alternative Payment Methods\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Alternative Payment Methods\"","children":[{"start":26,"value":"Alternative Payment Methods","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And I create a new alternative payment method with following details:","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then I should see the alternative payment method created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end