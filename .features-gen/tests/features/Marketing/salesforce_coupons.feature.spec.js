// Generated from: tests\features\Marketing\salesforce_coupons.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Coupons Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new coupon', () => {

    test('Example #1', { tag: ['@mode:serial', '@coupons', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Coupons" in app launcher', null, { page }); 
      await Then('Add new coupon with following details', {"dataTable":{"rows":[{"cells":[{"value":"Code"},{"value":"SAVE40"}]},{"cells":[{"value":"Promotion"},{"value":"Testing"}]},{"cells":[{"value":"Description"},{"value":"Save 34% this summer"}]},{"cells":[{"value":"Status"},{"value":"Active"}]},{"cells":[{"value":"Redemption Limit All Buyers"},{"value":"100"}]},{"cells":[{"value":"Redemption Limit Per Buyer"},{"value":"5"}]},{"cells":[{"value":"Start Date"},{"value":"11/11/2024"}]},{"cells":[{"value":"Start Time"},{"value":"12:00 AM"}]},{"cells":[{"value":"End Date"},{"value":"12/12/2024"}]},{"cells":[{"value":"End Time"},{"value":"11:59 PM"}]}]}}, { page }); 
      await Then('Verify coupon is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Marketing\\salesforce_coupons.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":23,"tags":["@mode:serial","@coupons","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Coupons\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Coupons\"","children":[{"start":12,"value":"Coupons","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new coupon with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then Verify coupon is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end