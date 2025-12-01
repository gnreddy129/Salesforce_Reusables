// Generated from: tests\features\Finance\salesforce_financeTransactions.feature
import { test } from "playwright-bdd";

test.describe('Finance Transactions', () => {

  test.describe('Create a new Finance Transaction and verify it is created', () => {

    test('Example #1', async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Finance Transactions" in app launcher', null, { page }); 
      await Then('Add new finance transaction with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Account"},{"value":"Burlington Textiles Corp of America"}]},{"cells":[{"value":"LegalEntity"},{"value":"LE001"}]},{"cells":[{"value":"ReferenceEntityType"},{"value":"Invoice Line tax"}]},{"cells":[{"value":"EventAction"},{"value":"Post an invoice"}]},{"cells":[{"value":"EventType"},{"value":"Other"}]},{"cells":[{"value":"TotalAmountWithTax"},{"value":"1001"}]},{"cells":[{"value":"ResultingBalance"},{"value":"10"}]},{"cells":[{"value":"ChargeAmount"},{"value":"2"}]},{"cells":[{"value":"AdjustmentAmount"},{"value":"2"}]},{"cells":[{"value":"Subtotal"},{"value":"10015"}]},{"cells":[{"value":"TaxAmount"},{"value":"11"}]},{"cells":[{"value":"ImpactAmount"},{"value":"5"}]},{"cells":[{"value":"Status"},{"value":"New"}]},{"cells":[{"value":"TransactionDate"},{"value":"11/12/2024"}]},{"cells":[{"value":"TransactionTime"},{"value":"10:00 AM"}]},{"cells":[{"value":"EffectiveDate"},{"value":"10/12/2024"}]},{"cells":[{"value":"EffectiveTime"},{"value":"10:00 AM"}]},{"cells":[{"value":"ResultingBalance"},{"value":"10"}]},{"cells":[{"value":"FinanceSystemName"},{"value":"AdminSystem"}]},{"cells":[{"value":"FinanceSystemTransactionNumber"},{"value":"FS0000001"}]},{"cells":[{"value":"FinanceSystemIntegrationMode"},{"value":"FSIM00A"}]},{"cells":[{"value":"FinanceSystemIntegrationStatus"},{"value":"In Process"}]}]}}, { page }); 
      await Then('Verify finance transaction is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"ReferenceEntityType"},{"value":"Invoice Line tax"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Finance\\salesforce_financeTransactions.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":36,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When Search for \"Finance Transactions\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Finance Transactions\"","children":[{"start":12,"value":"Finance Transactions","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then Add new finance transaction with following details","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then Verify finance transaction is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end