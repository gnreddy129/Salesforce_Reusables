// Generated from: tests\features\CustomerData\salesforce_contacts.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Contact Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Contacts with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@contacts', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Contacts" in app launcher', null, { page }); 
      await Then('Add new contact with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Salutation"},{"value":"Mr."}]},{"cells":[{"value":"FirstName"},{"value":"Jhonny"}]},{"cells":[{"value":"LastName"},{"value":"Smith"}]},{"cells":[{"value":"AccountName"},{"value":"Test Account 1"}]},{"cells":[{"value":"Title"},{"value":"Sales Manager"}]},{"cells":[{"value":"Phone"},{"value":"+1234567890"}]},{"cells":[{"value":"HomePhone"},{"value":"+1234567891"}]},{"cells":[{"value":"Mobile"},{"value":"+1987654321"}]},{"cells":[{"value":"OtherPhone"},{"value":"+1234567892"}]},{"cells":[{"value":"Fax"},{"value":"+1234567893"}]},{"cells":[{"value":"Email"},{"value":"john.smith@test.com"}]},{"cells":[{"value":"Assistant"},{"value":"Mary Johnson"}]},{"cells":[{"value":"AssistantPhone"},{"value":"+1234567894"}]},{"cells":[{"value":"Department"},{"value":"Sales"}]},{"cells":[{"value":"LeadSource"},{"value":"Web"}]},{"cells":[{"value":"Birthdate"},{"value":"1985-06-15"}]},{"cells":[{"value":"ReportsTo"},{"value":"Sarah Johnson"}]},{"cells":[{"value":"Languages"},{"value":"English,French"}]},{"cells":[{"value":"Level"},{"value":"Primary"}]},{"cells":[{"value":"MailingStreet"},{"value":"123 Main St"}]},{"cells":[{"value":"MailingCity"},{"value":"New York"}]},{"cells":[{"value":"MailingState"},{"value":"NY"}]},{"cells":[{"value":"MailingZip"},{"value":"10001"}]},{"cells":[{"value":"MailingCountry"},{"value":"USA"}]},{"cells":[{"value":"OtherStreet"},{"value":"456 Work St"}]},{"cells":[{"value":"OtherCity"},{"value":"Brooklyn"}]},{"cells":[{"value":"OtherState"},{"value":"NY"}]},{"cells":[{"value":"OtherZip"},{"value":"10002"}]},{"cells":[{"value":"OtherCountry"},{"value":"USA"}]},{"cells":[{"value":"Description"},{"value":"Primary sales contact"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\salesforce_contacts.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":43,"tags":["@mode:serial","@customer","@contacts","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Contacts\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Contacts\"","children":[{"start":12,"value":"Contacts","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new contact with following details","stepMatchArguments":[]}]},
]; // bdd-data-end