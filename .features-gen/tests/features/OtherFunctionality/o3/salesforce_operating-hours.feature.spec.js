// Generated from: tests\features\OtherFunctionality\o3\salesforce_operating-hours.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Operating Hours Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Add new operating hours', () => {

    test('Example #1', { tag: ['@mode:serial', '@operatinghours', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Operating Hours" in app launcher', null, { page }); 
      await Then('Click on "New" button of "Operating Hours"', null, { page }); 
      await Then('Add new operating hours with following details', {"dataTable":{"rows":[{"cells":[{"value":"Name"},{"value":"Business Hours"}]},{"cells":[{"value":"Description"},{"value":"Standard business hrs"}]},{"cells":[{"value":"Time Zone"},{"value":"(GMT+13:00) New Zealand Daylight Time (Antarctica/McMurdo)"}]}]}}, { page }); 
      await And('I add rows to the operating hours with the following details:', {"dataTable":{"rows":[{"cells":[{"value":"Day"},{"value":"Start Time"},{"value":"End Time"},{"value":"Work Type Group"}]},{"cells":[{"value":"Monday"},{"value":"1:00 AM"},{"value":"1:15 AM"},{"value":""}]}]}}, { page }); 
      await Then('Verify operating hours is created successfully', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\o3\\salesforce_operating-hours.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":20,"tags":["@mode:serial","@operatinghours","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Operating Hours\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Operating Hours\"","children":[{"start":12,"value":"Operating Hours","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Click on \"New\" button of \"Operating Hours\"","stepMatchArguments":[{"group":{"start":9,"value":"\"New\"","children":[{"start":10,"value":"New","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"\"Operating Hours\"","children":[{"start":26,"value":"Operating Hours","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then Add new operating hours with following details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And I add rows to the operating hours with the following details:","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then Verify operating hours is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end