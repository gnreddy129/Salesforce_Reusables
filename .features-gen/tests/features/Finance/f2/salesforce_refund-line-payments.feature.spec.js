// Generated from: tests\features\Finance\f2\salesforce_refund-line-payments.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Refund Line Payment Creation', () => {

  test.describe('Create a new refund line payment with various field combinations', () => {

    test('Example #1', { tag: ['@RefundLinePayment', '@Finance', '@Smoke'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Refund Line Payments" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Refund Line Payments"', null, { page }); 
      await And('I create a new refund line payment with the following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Refund"},{"value":"R-000000001"}]},{"cells":[{"value":"Type"},{"value":"Applied"}]},{"cells":[{"value":"Has Been Unapplied"},{"value":"No"}]},{"cells":[{"value":"Payment"},{"value":"P-000000002"}]},{"cells":[{"value":"Comments"},{"value":"Automated test comment 1"}]},{"cells":[{"value":"Amount"},{"value":"50"}]},{"cells":[{"value":"Associated Account"},{"value":"Testing"}]},{"cells":[{"value":"Associated Refund Line Payment"},{"value":""}]},{"cells":[{"value":"Date"},{"value":"12/12/2024"}]},{"cells":[{"value":"DateTime"},{"value":"10:00 AM"}]},{"cells":[{"value":"Effective Date"},{"value":"10/12/2024"}]},{"cells":[{"value":"Effective Date Time"},{"value":"10:30 AM"}]},{"cells":[{"value":"Applied Date"},{"value":"05/11/2024"}]},{"cells":[{"value":"Applied Date Time"},{"value":"11:00 AM"}]},{"cells":[{"value":"Unapplied Date"},{"value":""}]},{"cells":[{"value":"Unapplied Date Time"},{"value":""}]}]}}, { page }); 
      await And('I should see the refund line payment created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Refund"},{"value":"R-000000001"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Finance\\f2\\salesforce_refund-line-payments.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":35,"tags":["@RefundLinePayment","@Finance","@Smoke"],"steps":[{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When Search for \"Refund Line Payments\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Refund Line Payments\"","children":[{"start":12,"value":"Refund Line Payments","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Refund Line Payments\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Refund Line Payments\"","children":[{"start":26,"value":"Refund Line Payments","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And I create a new refund line payment with the following details:","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And I should see the refund line payment created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end