// Generated from: tests\features\IntegrationTest\contact_opportunities.feature
import { test } from "playwright-bdd";

test.describe('Create account module then click on first account on list and add opportunities on it.', () => {

  test.describe('Create a new business account with complete details', () => {

    test('Example #1', { tag: ['@Contacts-opportunities'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Contacts" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Contacts"', null, { page }); 
      await Then('Fill Contacts fields with following details:', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Salutation"},{"value":"Mr."}]},{"cells":[{"value":"FirstName"},{"value":"Jhonnny"}]},{"cells":[{"value":"LastName"},{"value":"Smitth"}]},{"cells":[{"value":"AccountName"},{"value":"Test Account 4"}]},{"cells":[{"value":"Title"},{"value":"Sales Maneager"}]},{"cells":[{"value":"Phone"},{"value":"+123r456789"}]},{"cells":[{"value":"HomePhone"},{"value":"+1234456789"}]},{"cells":[{"value":"Mobile"},{"value":"+1985654321"}]},{"cells":[{"value":"OtherPhone"},{"value":"+1274567892"}]},{"cells":[{"value":"Fax"},{"value":"+1234767893"}]},{"cells":[{"value":"Email"},{"value":"john.smith@tert.com"}]},{"cells":[{"value":"Assistant"},{"value":"Mary Johtson"}]},{"cells":[{"value":"AssistantPhone"},{"value":"+1236567894"}]},{"cells":[{"value":"Department"},{"value":"Salles"}]},{"cells":[{"value":"LeadSource"},{"value":"Web"}]},{"cells":[{"value":"Birthdate"},{"value":"1985-06-15"}]},{"cells":[{"value":"ReportsTo"},{"value":"Sarah Johdnson"}]},{"cells":[{"value":"Languages"},{"value":"English"}]},{"cells":[{"value":"Level"},{"value":"Primary"}]},{"cells":[{"value":"MailingStreet"},{"value":"123 Main St"}]},{"cells":[{"value":"MailingCity"},{"value":"New York"}]},{"cells":[{"value":"MailingState"},{"value":"NY"}]},{"cells":[{"value":"MailingZip"},{"value":"10001"}]},{"cells":[{"value":"MailingCountry"},{"value":"USA"}]},{"cells":[{"value":"OtherStreet"},{"value":"456 Work St"}]},{"cells":[{"value":"OtherCity"},{"value":"Brooklyn"}]},{"cells":[{"value":"OtherState"},{"value":"NY"}]},{"cells":[{"value":"OtherZip"},{"value":"10002"}]},{"cells":[{"value":"OtherCountry"},{"value":"USA"}]},{"cells":[{"value":"Description"},{"value":"Primary sales contact"}]}]}}, { page }); 
      await Then('I click new opportunities on Contacts page', null, { page }); 
      await Then('Add opportunity with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"New Business Opp"}]},{"cells":[{"value":"Type"},{"value":"New Customer"}]},{"cells":[{"value":"Stage"},{"value":"Prospecting"}]},{"cells":[{"value":"Amount"},{"value":"50000"}]},{"cells":[{"value":"CloseDate"},{"value":"10/10/2024"}]},{"cells":[{"value":"Private"},{"value":"Yes"}]},{"cells":[{"value":"NextStep"},{"value":"Initial Contact"}]},{"cells":[{"value":"Description"},{"value":"Primary sales contact"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\IntegrationTest\\contact_opportunities.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":54,"tags":["@Contacts-opportunities"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When Search for \"Contacts\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Contacts\"","children":[{"start":12,"value":"Contacts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Contacts\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Contacts\"","children":[{"start":26,"value":"Contacts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Fill Contacts fields with following details:","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then I click new opportunities on Contacts page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then Add opportunity with following details","stepMatchArguments":[]}]},
]; // bdd-data-end