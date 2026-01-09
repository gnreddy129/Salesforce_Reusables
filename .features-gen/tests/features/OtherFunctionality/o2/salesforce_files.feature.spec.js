// Generated from: tests\features\OtherFunctionality\o2\salesforce_files.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Files Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Upload different types of files in Salesforce', () => {

    test('Example #1', { tag: ['@mode:serial', '@files', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Files" in app launcher', null, { page }); 
      await Then('Click on "Upload" Files button of "Files"', null, { page }); 
      await And('Upload file "doc1.pdf" with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"FileName"},{"value":"doc1.pdf"}]},{"cells":[{"value":"Title"},{"value":"Requirements Doc"}]},{"cells":[{"value":"Description"},{"value":"Project requirements"}]}]}}, { page }); 
      await Then('Verify file is uploaded successfully', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Title"},{"value":"Requirements Doc"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\o2\\salesforce_files.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":20,"tags":["@mode:serial","@files","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Files\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Files\"","children":[{"start":12,"value":"Files","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"Upload\" Files button of \"Files\"","stepMatchArguments":[{"group":{"start":9,"value":"\"Upload\"","children":[{"start":10,"value":"Upload","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":34,"value":"\"Files\"","children":[{"start":35,"value":"Files","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And Upload file \"doc1.pdf\" with following details","stepMatchArguments":[{"group":{"start":12,"value":"\"doc1.pdf\"","children":[{"start":13,"value":"doc1.pdf","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Verify file is uploaded successfully","stepMatchArguments":[]}]},
]; // bdd-data-end