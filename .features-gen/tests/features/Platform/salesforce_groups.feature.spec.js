// Generated from: tests\features\Platform\salesforce_groups.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Groups Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new group with comprehensive details', () => {

    test('Example #1', { tag: ['@mode:serial', '@groups', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Groups" in app launcher', null, { page }); 
      await Then('Add new group with following details', {"dataTable":{"rows":[{"cells":[{"value":"Name"},{"value":"Test Group123"}]},{"cells":[{"value":"Description"},{"value":"A test group for automation"}]},{"cells":[{"value":"Information"},{"value":"Automated group info"}]},{"cells":[{"value":"Disable automatic archiving"},{"value":"true"}]},{"cells":[{"value":"Access Type"},{"value":"Public"}]},{"cells":[{"value":"Allow customers"},{"value":"false"}]},{"cells":[{"value":"Broadcast Only"},{"value":"true"}]}]}}, { page }); 
      await Then('Verify group is created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Name"},{"value":"Test Group123"}]},{"cells":[{"value":"Description"},{"value":"A test group for automation"}]},{"cells":[{"value":"Access Type"},{"value":"Public"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Platform\\salesforce_groups.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":23,"tags":["@mode:serial","@groups","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Groups\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Groups\"","children":[{"start":12,"value":"Groups","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new group with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then Verify group is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end