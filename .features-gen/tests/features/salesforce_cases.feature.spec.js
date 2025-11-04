// Generated from: tests\features\salesforce_cases.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Case Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new case', () => {

    test('Example #1', { tag: ['@mode:serial', '@cases', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Cases" in app launcher', null, { page }); 
      await Then('Add new case with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Status"},{"value":"New"}]},{"cells":[{"value":"CaseOrigin"},{"value":"Phone"}]},{"cells":[{"value":"Priority"},{"value":"Medium"}]},{"cells":[{"value":"Type"},{"value":"Mechanical"}]},{"cells":[{"value":"CaseReason"},{"value":"Installation"}]},{"cells":[{"value":"Product"},{"value":"GC1040"}]},{"cells":[{"value":"PotentialLiability"},{"value":"No"}]},{"cells":[{"value":"SLA"},{"value":"Yes"}]},{"cells":[{"value":"EngineeringReqNumber"},{"value":"12345"}]},{"cells":[{"value":"Subject"},{"value":"AutoTest Case 01"}]},{"cells":[{"value":"Description"},{"value":"Created by automation test"}]},{"cells":[{"value":"InternalComments"},{"value":"For internal review"}]},{"cells":[{"value":"WebEmail"},{"value":"test.user@example.com"}]},{"cells":[{"value":"WebCompany"},{"value":"TestCompany Ltd."}]},{"cells":[{"value":"WebName"},{"value":"Test User"}]},{"cells":[{"value":"WebPhone"},{"value":"+1-555-0100"}]}]}}, { page }); 
      await Then('Verify case is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"AutoTest Case 01"}]}]}}, { page }); 
    });

    test('Example #2', { tag: ['@mode:serial', '@cases', '@regression'] }, async ({ Given, When, Then, context, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { context, page }); 
      await When('Search for "Cases" in app launcher', null, { page }); 
      await Then('Add new case with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Status"},{"value":"Working"}]},{"cells":[{"value":"CaseOrigin"},{"value":"Email"}]},{"cells":[{"value":"Priority"},{"value":"High"}]},{"cells":[{"value":"Type"},{"value":"Electrical"}]},{"cells":[{"value":"CaseReason"},{"value":"Performance"}]},{"cells":[{"value":"Product"},{"value":"GC3020"}]},{"cells":[{"value":"PotentialLiability"},{"value":"Yes"}]},{"cells":[{"value":"SLA"},{"value":"No"}]},{"cells":[{"value":"EngineeringReqNumber"},{"value":"67890"}]},{"cells":[{"value":"Subject"},{"value":"AutoTest Case 02"}]},{"cells":[{"value":"Description"},{"value":"Second automation test"}]},{"cells":[{"value":"InternalComments"},{"value":"Urgent case"}]},{"cells":[{"value":"WebEmail"},{"value":"test.user2@example.com"}]},{"cells":[{"value":"WebCompany"},{"value":"TestCompany Ltd."}]},{"cells":[{"value":"WebName"},{"value":"Test User 2"}]},{"cells":[{"value":"WebPhone"},{"value":"+1-555-0101"}]}]}}, { page }); 
      await Then('Verify case is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"AutoTest Case 02"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\salesforce_cases.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":32,"tags":["@mode:serial","@cases","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Cases\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Cases\"","children":[{"start":12,"value":"Cases","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new case with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then Verify case is created successfully with details","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":33,"tags":["@mode:serial","@cases","@regression"],"steps":[{"pwStepLine":17,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Cases\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Cases\"","children":[{"start":12,"value":"Cases","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new case with following details","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then Verify case is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end