// Generated from: tests\features\IntegrationTest\campaign_leadsContactsOpportunities.feature
import { test } from "playwright-bdd";

test.describe('Campaign Management in Salesforce and adding Lead, opportunity, Contact', () => {

  test.describe('Create a new marketing campaign with complete details', () => {

    test('Example #1', { tag: ['@campaign_leadContact'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Campaigns" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Campaigns"', null, { page }); 
      await And('I create a new campaign with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Campaign Name"},{"value":"End of Year Campaign 2025"}]},{"cells":[{"value":"Type"},{"value":"Conference"}]},{"cells":[{"value":"Status"},{"value":"Planned"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"Start Date"},{"value":"11/01/2025"}]},{"cells":[{"value":"Expected Revenue"},{"value":"15/01/2026"}]},{"cells":[{"value":"Budgeted Cost"},{"value":"50000"}]},{"cells":[{"value":"Actual Cost"},{"value":"25000"}]},{"cells":[{"value":"Expected Response"},{"value":"0"}]},{"cells":[{"value":"Description"},{"value":"10"}]}]}}, { page }); 
      await Then('I should see the campaign created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Campaign Name"},{"value":"End of Year Campaign 2025"}]}]}}, { page }); 
      await When('I click Add Leads in campaign page', null, { page }); 
      await And('Fill all fields of lead with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"First Name"},{"value":"Johnny"}]},{"cells":[{"value":"Last Name"},{"value":"Deep"}]},{"cells":[{"value":"Company"},{"value":"Tech Corp Ltd"}]},{"cells":[{"value":"Email"},{"value":"johnny.smith@techcorp.com"}]},{"cells":[{"value":"Phone"},{"value":"9876543210"}]},{"cells":[{"value":"Lead Status"},{"value":"Open - Not Contacted"}]},{"cells":[{"value":"Industry"},{"value":"Technology"}]}]}}, { page }); 
      await Then('I should see the lead created successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field Name"},{"value":"Value"}]},{"cells":[{"value":"Lead Name"},{"value":"John Smith"}]}]}}, { page }); 
      await When('I click Add Contacts in campaign page', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\IntegrationTest\\campaign_leadsContactsOpportunities.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":83,"tags":["@campaign_leadContact"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When Search for \"Campaigns\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Campaigns\"","children":[{"start":12,"value":"Campaigns","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Campaigns\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Campaigns\"","children":[{"start":26,"value":"Campaigns","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And I create a new campaign with following details:","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then I should see the campaign created successfully","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When I click Add Leads in campaign page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And Fill all fields of lead with following details:","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then I should see the lead created successfully","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When I click Add Contacts in campaign page","stepMatchArguments":[]}]},
]; // bdd-data-end