// Generated from: tests\features\Service\salesforce_service-territories.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Service Territories Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Service Territory with Different Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@service', '@regression'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Service Territories" in app launcher', null, { page }); 
      await Then('Add new Service Territory with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"North Region Service"}]},{"cells":[{"value":"Parent Territory"},{"value":"--None--"}]},{"cells":[{"value":"Operating Hours"},{"value":"Operating Hour A"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"Country"},{"value":"United States"}]},{"cells":[{"value":"Address"},{"value":"123 Main Street"}]},{"cells":[{"value":"City"},{"value":"New York"}]},{"cells":[{"value":"State/Province"},{"value":"New York"}]},{"cells":[{"value":"Zip/Postal Code"},{"value":"10001"}]},{"cells":[{"value":"Description"},{"value":"Primary service territory for north region"}]}]}}, { page }); 
      await Then('Verify Service Territory is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"North Region Service"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_service-territories.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":26,"tags":["@mode:serial","@service","@regression"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Service Territories\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Service Territories\"","children":[{"start":12,"value":"Service Territories","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new Service Territory with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then Verify Service Territory is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end