// Generated from: tests\features\Marketing\salesforce_promotions.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Promotions Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new promotion', () => {

    test('Example #1', { tag: ['@mode:serial', '@promotions', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Promotions" in app launcher', null, { page }); 
      await Then('Add new promotion with following details', {"dataTable":{"rows":[{"cells":[{"value":"Name"},{"value":"Holiday Sale 2024"}]},{"cells":[{"value":"Description"},{"value":"Special holiday promotion for Q4"}]},{"cells":[{"value":"Objective"},{"value":"Increase sales during holiday season"}]},{"cells":[{"value":"Campaign"},{"value":"Test Campaign"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"Display Name"},{"value":"Holiday 2024 - 15% Off"}]},{"cells":[{"value":"Commerce Promotion"},{"value":"true"}]},{"cells":[{"value":"Qualifier Criteria"},{"value":"All"}]},{"cells":[{"value":"Priority Number"},{"value":"1"}]},{"cells":[{"value":"Target Criteria"},{"value":"All"}]},{"cells":[{"value":"Exclude qualifying items from discounts"},{"value":"true"}]},{"cells":[{"value":"Discount Order"},{"value":"Least Expensive"}]},{"cells":[{"value":"Discount Restriction"},{"value":"Limit by Least Expensive Qualifying Product"}]},{"cells":[{"value":"Exclusivity Type"},{"value":"Global"}]},{"cells":[{"value":"Qualifying Criteria Not Required Per Application"},{"value":"true"}]},{"cells":[{"value":"Approaching Discount"},{"value":"true"}]},{"cells":[{"value":"Start Date"},{"value":"11/01/2024"}]},{"cells":[{"value":"Start Time"},{"value":"12:00 AM"}]},{"cells":[{"value":"End Date"},{"value":"12/02/2024"}]},{"cells":[{"value":"End Time"},{"value":"11:59 PM"}]},{"cells":[{"value":"Automatic"},{"value":"true"}]},{"cells":[{"value":"Tiered Promotion"},{"value":"true"}]},{"cells":[{"value":"Maximum Applications Per Cart"},{"value":"5"}]}]}}, { page }); 
      await Then('Verify promotion is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Marketing\\salesforce_promotions.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":36,"tags":["@mode:serial","@promotions","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Promotions\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Promotions\"","children":[{"start":12,"value":"Promotions","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new promotion with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then Verify promotion is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end