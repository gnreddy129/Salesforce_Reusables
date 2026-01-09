// Generated from: tests\features\CustomerData\c3\salesforce_individuals.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Individual Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new individual records', () => {

    test('Example #1', { tag: ['@mode:serial', '@individuals', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Individuals" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Individuals"', null, { page }); 
      await Then('Add new individual with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Salutation"},{"value":"Mr."}]},{"cells":[{"value":"FirstName"},{"value":"John"}]},{"cells":[{"value":"LastName"},{"value":"TestIndividual"}]},{"cells":[{"value":"BirthDate"},{"value":"01/01/1990"}]},{"cells":[{"value":"Individual's Age"},{"value":"13 or Older"}]},{"cells":[{"value":"Block Geolocation Tracking"},{"value":"true"}]},{"cells":[{"value":"Don't Process"},{"value":"true"}]},{"cells":[{"value":"Don't Profile"},{"value":"true"}]},{"cells":[{"value":"Don't Market"},{"value":"true"}]},{"cells":[{"value":"Don't Track"},{"value":"true"}]},{"cells":[{"value":"Export Individual's Data"},{"value":"true"}]},{"cells":[{"value":"Forget this Individual"},{"value":"true"}]},{"cells":[{"value":"OK to Store PII Data Elsewhere"},{"value":"true"}]}]}}, { page }); 
      await Then('Verify individual is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Salutation"},{"value":"Mr."}]},{"cells":[{"value":"FirstName"},{"value":"John"}]},{"cells":[{"value":"LastName"},{"value":"TestIndividual"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\c3\\salesforce_individuals.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":32,"tags":["@mode:serial","@individuals","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Individuals\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Individuals\"","children":[{"start":12,"value":"Individuals","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Individuals\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Individuals\"","children":[{"start":26,"value":"Individuals","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new individual with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then Verify individual is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end