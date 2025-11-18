// Generated from: tests\features\Service\salesforce_work-orders.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Work Orders Management', () => {
  test.describe.configure({"mode":"serial"});

  test.describe('Create and Manage New Work Orders with Comprehensive Data', () => {

    test('Example #1', { tag: ['@mode:serial', '@work-orders', '@regression', '@comprehensive'] }, async ({ Given, When, Then, page }) => { 
      await Given('Open a browser and login to the sales force site', null, { page }); 
      await When('Search for "Work Orders" in app launcher', null, { page }); 
      await Then('Add new work order with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Status"},{"value":"New"}]},{"cells":[{"value":"Priority"},{"value":"Medium"}]},{"cells":[{"value":"ParentWorkOrder"},{"value":"--None--"}]},{"cells":[{"value":"Contact"},{"value":"John Smith"}]},{"cells":[{"value":"Account"},{"value":"Testing"}]},{"cells":[{"value":"Asset"},{"value":"--None--"}]},{"cells":[{"value":"Case"},{"value":"--None--"}]},{"cells":[{"value":"Entitlement"},{"value":"--None--"}]},{"cells":[{"value":"ServiceContract"},{"value":"--None--"}]},{"cells":[{"value":"Description"},{"value":"HVAC system maintenance required for building"}]},{"cells":[{"value":"Subject"},{"value":"HVAC System Maintenance"}]}]}}, { page }); 
      await Then('Verify work order is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Account"},{"value":"Testing"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Service\\salesforce_work-orders.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":9,"pickleLine":27,"tags":["@mode:serial","@work-orders","@regression","@comprehensive"],"steps":[{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When Search for \"Work Orders\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Work Orders\"","children":[{"start":12,"value":"Work Orders","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then Add new work order with following details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then Verify work order is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end