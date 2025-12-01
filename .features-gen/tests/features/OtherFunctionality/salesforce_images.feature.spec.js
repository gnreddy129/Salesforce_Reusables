// Generated from: tests\features\OtherFunctionality\salesforce_images.feature
import { test } from "playwright-bdd";

test.describe('Salesforce Images Management', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('Open a browser and login to the sales force site', null, { page }); 
  });
  
  test.describe('Create and Manage New Images with Different Data', () => {
    test.describe.configure({"mode":"serial"});

    test('Example #1', { tag: ['@images', '@otherFunctionality', '@regression', '@mode:serial'] }, async ({ When, Then, And, page }) => { 
      await When('Search for "Images" in app launcher', null, { page }); 
      await And('Add new Image with following details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Image 1"}]},{"cells":[{"value":"ImageOrientation"},{"value":"Landscape"}]},{"cells":[{"value":"Title"},{"value":"Product Image"}]},{"cells":[{"value":"AccessibilityText"},{"value":"Image of main product"}]},{"cells":[{"value":"URL"},{"value":"https://example.com/1"}]},{"cells":[{"value":"Active"},{"value":"true"}]},{"cells":[{"value":"Category"},{"value":"Logos"}]},{"cells":[{"value":"ImageType"},{"value":"Training"}]},{"cells":[{"value":"File"},{"value":"--None--"}]},{"cells":[{"value":"CameraAngle"},{"value":"Front"}]}]}}, { page }); 
      await Then('Verify Image is created successfully with details', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Name"},{"value":"Test Image 1"}]}]}}, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\OtherFunctionality\\salesforce_images.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":13,"pickleLine":31,"tags":["@images","@otherFunctionality","@regression","@mode:serial"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given Open a browser and login to the sales force site","isBg":true,"stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When Search for \"Images\" in app launcher","stepMatchArguments":[{"group":{"start":11,"value":"\"Images\"","children":[{"start":12,"value":"Images","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And Add new Image with following details","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then Verify Image is created successfully with details","stepMatchArguments":[]}]},
]; // bdd-data-end