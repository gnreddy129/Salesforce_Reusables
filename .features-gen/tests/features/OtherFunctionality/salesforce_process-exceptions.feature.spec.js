// Generated from: tests\features\OtherFunctionality\salesforce_process-exceptions.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Process Exceptions Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new process exception with comprehensive details', () => {

    test('Example #1', { tag: ['@mode:serial', '@processexceptions', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Process Exceptions" in app launcher', null, { page }); 
      await Then('Add new process exception with following details', {"dataTable":{"rows":[{"cells":[{"value":"Category"},{"value":"Order Approval"}]},{"cells":[{"value":"Status"},{"value":"Resolved"}]},{"cells":[{"value":"Priority"},{"value":"High"}]},{"cells":[{"value":"Severity"},{"value":"High"}]},{"cells":[{"value":"Message"},{"value":"Payment processing failed"}]},{"cells":[{"value":"Object Type"},{"value":"Payment"}]},{"cells":[{"value":"Attached To"},{"value":"P-000000001"}]},{"cells":[{"value":"Case"},{"value":"00001026"}]},{"cells":[{"value":"External Reference"},{"value":"EXT-REF-001"}]},{"cells":[{"value":"Description"},{"value":"Order payment exception"}]}]}}, { page }); 
      await Then('Verify process exception is created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Category"},{"value":"Order Approval"}]},{"cells":[{"value":"Status"},{"value":"Resolved"}]},{"cells":[{"value":"Priority"},{"value":"High"}]},{"cells":[{"value":"Message"},{"value":"Payment processing failed"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_process-exceptions.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":27,"tags":["@mode:serial","@processexceptions","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Process Exceptions\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Process Exceptions\"","children":[{"start":12,"value":"Process Exceptions","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new process exception with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then Verify process exception is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end