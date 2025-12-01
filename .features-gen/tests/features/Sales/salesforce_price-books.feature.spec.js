// Generated from: tests\features\Sales\salesforce_price-books.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Price Books Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Price Books with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@sales', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Price Books" in app launcher', null, { page }); 
      await Then('Add new Price Book with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Price Book Name"},{"value":"Standard Pricebook"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"Description"},{"value":"Standard price book for test"}]}]}}, { page }); 
      await Then('Verify Price Book is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Price Book Name"},{"value":"Standard Pricebook"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Sales\\salesforce_price-books.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":19,"tags":["@mode:serial","@sales","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Price Books\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Price Books\"","children":[{"start":12,"value":"Price Books","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new Price Book with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then Verify Price Book is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end