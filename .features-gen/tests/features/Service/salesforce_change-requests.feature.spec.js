// Generated from: tests\features\Service\salesforce_change-requests.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Change Requests Management', () => {

  test.describe('Create a new Change Request with all required fields', () => {

    test('Example #1', { tag: ['@salesforce', '@service', '@change-requests', '@smoke', '@regression', '@positive', '@create', '@priority-high'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Change Requests" in app launcher', null, { page }); 
      await When('Add new Change Request with the following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Critical Security Update"}]},{"cells":[{"value":"Description"},{"value":"Update to address security"}]},{"cells":[{"value":"Risk Level"},{"value":"High"}]},{"cells":[{"value":"Status"},{"value":"Open"}]},{"cells":[{"value":"Priority"},{"value":"High"}]},{"cells":[{"value":"Impact"},{"value":"High"}]},{"cells":[{"value":"Type of Change"},{"value":"Major"}]},{"cells":[{"value":"Business Justification"},{"value":"Security Patch"}]},{"cells":[{"value":"Impact Analysis"},{"value":"To mitigate security risks"}]},{"cells":[{"value":"Remediation Plan"},{"value":"High impact if not applied"}]},{"cells":[{"value":"Start Time (Estimated) Date"},{"value":"10/10/2025"}]},{"cells":[{"value":"Start Time (Estimated) Time"},{"value":"10:00 AM"}]},{"cells":[{"value":"End Time (Estimated) Date"},{"value":"11/11/2025"}]},{"cells":[{"value":"End Time (Estimated) Time"},{"value":"12:00 PM"}]},{"cells":[{"value":"Reviewer"},{"value":"Test5 lab"}]},{"cells":[{"value":"Reviewed On Date"},{"value":"06/06/2025"}]},{"cells":[{"value":"Reviewed On Time"},{"value":"02:00 PM"}]},{"cells":[{"value":"Final Review Notes"},{"value":"Approved for deployment"}]}]}}, { page }); 
      await Then('Verify Change Request is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Subject"},{"value":"Critical Security Update"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_change-requests.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":34,"tags":["@salesforce","@service","@change-requests","@smoke","@regression","@positive","@create","@priority-high"],"steps":[{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Change Requests\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Change Requests\"","children":[{"start":12,"value":"Change Requests","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When Add new Change Request with the following details:","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then Verify Change Request is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end