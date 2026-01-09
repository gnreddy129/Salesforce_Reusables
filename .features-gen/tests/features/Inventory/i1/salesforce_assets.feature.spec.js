// Generated from: tests\features\Inventory\i1\salesforce_assets.feature
import { test } from "playwright-bdd";

test.describe('Asset Management in Salesforce', () => {

  test.describe('Create a new asset with complete details', () => {

    test('Example #1', async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Assets" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Assets"', null, { page }); 
      await And('I create a new asset with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Asset Name"},{"value":"Test Asset 1"}]},{"cells":[{"value":"Account Name"},{"value":"Testing"}]},{"cells":[{"value":"Contact"},{"value":""}]},{"cells":[{"value":"Serial Number"},{"value":"SN001"}]},{"cells":[{"value":"Competitor Asset"},{"value":"true"}]},{"cells":[{"value":"Install Date"},{"value":"10/10/2025"}]},{"cells":[{"value":"Purchase Date"},{"value":"10/10/2025"}]},{"cells":[{"value":"Status"},{"value":"Shipped"}]},{"cells":[{"value":"Usage End Date"},{"value":"10/10/2026"}]},{"cells":[{"value":"Quantity"},{"value":"1"}]},{"cells":[{"value":"Price"},{"value":"1000"}]},{"cells":[{"value":"Description"},{"value":"Enterprise hardware asset for customer tracking"}]}]}}, { page }); 
      await Then('I should see the asset created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Asset Name"},{"value":"Test Asset 1"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Inventory\\i1\\salesforce_assets.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":30,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When Search for \"Assets\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Assets\"","children":[{"start":12,"value":"Assets","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Assets\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Assets\"","children":[{"start":26,"value":"Assets","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And I create a new asset with following details:","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then I should see the asset created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end