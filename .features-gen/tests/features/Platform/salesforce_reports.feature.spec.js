// Generated from: tests\features\Platform\salesforce_reports.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Reports Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Reports with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@platform', '@reports', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Reports" in app launcher', null, { page }); 
      await Then('Create new report with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"ReportType"},{"value":"Opportunities"}]},{"cells":[{"value":"ReportName"},{"value":"Opps Report"}]},{"cells":[{"value":"ReportDescription"},{"value":"Sales opportunities report"}]}]}}, { page }); 
      await Then('Save the report', null, { page }); 
      await Then('Verify the report creation with name "Opps Report"', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"ReportName"},{"value":"Opps Report"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Platform\\salesforce_reports.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":20,"tags":["@mode:serial","@platform","@reports","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Reports\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Reports\"","children":[{"start":12,"value":"Reports","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Create new report with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then Save the report","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Verify the report creation with name \"Opps Report\"","stepMatchArguments":[{"group":{"start":37,"value":"\"Opps Report\"","children":[{"start":38,"value":"Opps Report","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end