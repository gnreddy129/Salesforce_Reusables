// Generated from: tests\features\CustomerData\c3\salesforce_data-use-purpose.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Data Use Purpose Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Data Use Purpose with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@customer', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Data Use Purpose" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Data Use Purpose"', null, { page }); 
      await Then('Add new Data Use Purpose with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR"}]},{"cells":[{"value":"Description"},{"value":"Purpose for GDPR compliance"}]},{"cells":[{"value":"Legal Basis"},{"value":"Test"}]},{"cells":[{"value":"Can Data Subject Opt Out"},{"value":"true"}]}]}}, { page }); 
      await Then('Verify Data Use Purpose is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"GDPR"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CustomerData\\c3\\salesforce_data-use-purpose.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":21,"tags":["@mode:serial","@customer","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Data Use Purpose\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Data Use Purpose\"","children":[{"start":12,"value":"Data Use Purpose","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Data Use Purpose\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Data Use Purpose\"","children":[{"start":26,"value":"Data Use Purpose","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new Data Use Purpose with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then Verify Data Use Purpose is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end