// Generated from: tests\features\Service\salesforce_work-type-groups.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Work Type Groups Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new work type group', () => {

    test('Example #1', { tag: ['@mode:serial', '@worktypegroups', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Work Type Groups" in app launcher', null, { page }); 
      await Then('Add new work type group with following details', {"dataTable":{"rows":[{"cells":[{"value":"Work Type Group Name"},{"value":"Field Service Team"}]},{"cells":[{"value":"Description"},{"value":"Work type group for field service operations"}]},{"cells":[{"value":"Group Type"},{"value":"Capacity"}]},{"cells":[{"value":"Active"},{"value":"true"}]}]}}, { page }); 
      await Then('Verify work type group is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_work-type-groups.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":17,"tags":["@mode:serial","@worktypegroups","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Work Type Groups\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Work Type Groups\"","children":[{"start":12,"value":"Work Type Groups","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new work type group with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then Verify work type group is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end