// Generated from: tests\features\Inventory\salesforce_location-groups.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Location Groups Management', () => {

  test.describe('Create and Manage New Location Group with Different Data', () => {
    test.describe.configure({"mode":"serial"});

    test('Example #1', { tag: ['@mode:serial', '@inventory', '@location-groups', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Location Groups" in app launcher', null, { page }); 
      await And('Add new Location Group with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Location Group Number"},{"value":"LG-001"}]},{"cells":[{"value":"Description"},{"value":"Main Warehouse Group"}]},{"cells":[{"value":"External Reference"},{"value":"EXT-WH-001"}]},{"cells":[{"value":"Sync with OCI"},{"value":"true"}]},{"cells":[{"value":"Enabled"},{"value":"true"}]}]}}, { page }); 
      await Then('Verify Location Group is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Location Group Number"},{"value":"LG-001"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Inventory\\salesforce_location-groups.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":23,"tags":["@mode:serial","@inventory","@location-groups","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When Search for \"Location Groups\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Location Groups\"","children":[{"start":12,"value":"Location Groups","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And Add new Location Group with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then Verify Location Group is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end