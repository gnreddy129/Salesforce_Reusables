// Generated from: tests\features\Sales\salesforce_leads.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Leads Creation and Management', () => {

  test.describe('Create new leads with different test data', () => {

    test('Example #1', async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Leads" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Leads"', null, { page }); 
      await And('Fill all fields of lead with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"First Name"},{"value":"Johnny"}]},{"cells":[{"value":"Last Name"},{"value":"Deep"}]},{"cells":[{"value":"Company"},{"value":"Tech Corp Ltd"}]},{"cells":[{"value":"Email"},{"value":"johnny.smith@techcorp.com"}]},{"cells":[{"value":"Phone"},{"value":"9876543210"}]},{"cells":[{"value":"Lead Status"},{"value":"Open - Not Contacted"}]},{"cells":[{"value":"Industry"},{"value":"Technology"}]}]}}, { page }); 
      await Then('I should see the lead created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Lead Name"},{"value":"John Smith"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Sales\\salesforce_leads.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When Search for \"Leads\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Leads\"","children":[{"start":12,"value":"Leads","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Leads\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Leads\"","children":[{"start":26,"value":"Leads","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And Fill all fields of lead with following details:","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then I should see the lead created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end