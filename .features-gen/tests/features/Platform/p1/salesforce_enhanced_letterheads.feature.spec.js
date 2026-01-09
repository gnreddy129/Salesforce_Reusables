// Generated from: tests\features\Platform\p1\salesforce_enhanced_letterheads.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Enhanced Letterheads Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new enhanced letterhead', () => {

    test('Example #1', { tag: ['@mode:serial', '@enhanced-letterheads', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Enhanced Letterheads" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Enhanced Letterheads"', null, { page }); 
      await Then('Add new enhanced letterhead with following details', {"dataTable":{"rows":[{"cells":[{"value":"Name"},{"value":"Professional Corporate Letterhead"}]},{"cells":[{"value":"Description"},{"value":"Enhanced letterhead template for corporate communications"}]},{"cells":[{"value":"Header"},{"value":"ACME Corporation\n123 Business Avenue\nNew York, NY 10001\nPhone: (555) 123-4567\nEmail: contact@acme.com"}]},{"cells":[{"value":"Footer"},{"value":"This document is confidential and intended for authorized recipients only.\nACME Corporation © 2024"}]}]}}, { page }); 
      await Then('Verify enhanced letterhead is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Platform\\p1\\salesforce_enhanced_letterheads.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":18,"tags":["@mode:serial","@enhanced-letterheads","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Enhanced Letterheads\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Enhanced Letterheads\"","children":[{"start":12,"value":"Enhanced Letterheads","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Enhanced Letterheads\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Enhanced Letterheads\"","children":[{"start":26,"value":"Enhanced Letterheads","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new enhanced letterhead with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Verify enhanced letterhead is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end