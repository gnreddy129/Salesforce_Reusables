// cucumber-hooks.js
const { After, Before, Status } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");
const { generateScenarioReport } = require("./cucumber.scenario.report");

// Helper function to extract module and feature from scenario URI
function getModuleAndFeatureFromScenario(scenario) {
  let moduleName = "otherfunctionality"; // Default
  let featureName = "general";

  if (scenario.pickle && scenario.pickle.uri) {
    const pathParts = scenario.pickle.uri.split(/[/\\]/);
    
    // Extract module from the path (look for the folder name after "features")
    const featuresIndex = pathParts.findIndex(part => part.toLowerCase() === "features");
    if (featuresIndex !== -1 && featuresIndex + 1 < pathParts.length) {
      moduleName = pathParts[featuresIndex + 1].toLowerCase();
    }

    // Extract feature name from filename
    const fileName = pathParts[pathParts.length - 1];
    if (fileName) {
      featureName = fileName
        .replace("salesforce_", "")
        .replace(".feature", "")
        .toLowerCase();
    }
  } else if (scenario.pickle && scenario.pickle.name) {
    // Fallback: Extract from scenario name
    const scenarioTitle = scenario.pickle.name.toLowerCase();
    
    if (scenarioTitle.includes("price book")) {
      featureName = "price-books";
      moduleName = "sales";
    } else if (scenarioTitle.includes("scorecard")) {
      featureName = "scorecards";
      moduleName = "otherfunctionality";
    } else if (scenarioTitle.includes("contact")) {
      featureName = "contacts";
      moduleName = "customerdata";
    } else if (scenarioTitle.includes("account")) {
      featureName = "accounts";
      moduleName = "sales";
    } else if (scenarioTitle.includes("report")) {
      featureName = "reports";
      moduleName = "otherfunctionality";
    }
  }

  return { module: moduleName, feature: featureName };
}

const takeScreenShotOnFailure = async (world, scenario) => {
  const { module: moduleName, feature: featureName } = getModuleAndFeatureFromScenario(scenario);
  const screenshotPath = `./cucumber-reports/screenshots/${moduleName}/${featureName}/`;
  const screenshotExtn = ".png";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `${scenarioName}_failure_${timestamp}${screenshotExtn}`;
  
  // Ensure hierarchical directory exists
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath, { recursive: true });
  }
  
  const fullPath = path.join(screenshotPath, fileName);

  try {
    // Get page from global context or world
    const page = world.page || global.page;

    if (page && !page.isClosed()) {
      const screenShot = await page.screenshot({
        path: fullPath,
        fullPage: true,
      });

      // Attach the screenshot using World's attach()
      if (screenShot) {
        await world.attach(screenShot, "image/png");
        console.log(
          `📸 Screenshot captured for failed scenario: ${scenario.pickle.name}`
        );
      }
    } else {
      console.log("⚠️ Page not available for screenshot");
    }
  } catch (error) {
    console.log("❌ Error taking screenshot:", error);
  }
};

const takeScreenShotOnSuccess = async (world, scenario) => {
  const { module: moduleName, feature: featureName } = getModuleAndFeatureFromScenario(scenario);
  const screenshotPath = `./cucumber-reports/screenshots/${moduleName}/${featureName}/`;
  const screenshotExtn = ".png";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `${scenarioName}_success_${timestamp}${screenshotExtn}`;
  
  // Ensure hierarchical directory exists
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath, { recursive: true });
  }
  
  const fullPath = path.join(screenshotPath, fileName);

  try {
    // Get page from global context or world
    const page = world.page || global.page;

    if (page && !page.isClosed()) {
      const screenShot = await page.screenshot({
        path: fullPath,
        fullPage: true,
      });

      // Attach the screenshot using World's attach()
      if (screenShot) {
        await world.attach(screenShot, "image/png");
        console.log(
          `📸 Success screenshot captured for scenario: ${scenario.pickle.name}`
        );
      }
    } else {
      console.log("⚠️ Page not available for screenshot");
    }
  } catch (error) {
    console.log("❌ Error taking success screenshot:", error);
  }
};

Before(async function (scenario) {
  console.log(`🚀 Starting scenario: ${scenario.pickle.name}`);
});

After(async function (scenario) {
  console.log(`🏁 Scenario completed: ${scenario.pickle.name}`);
  console.log(`📊 Scenario status: ${scenario.result.status}`);

  // Take screenshot on failure
  if (scenario.result?.status !== Status.PASSED) {
    await takeScreenShotOnFailure(this, scenario);
  } else {
    // Optionally take screenshot on success as well
    await takeScreenShotOnSuccess(this, scenario);
  }

  // Generate report after each scenario completion
  console.log(`📋 Generating report for scenario: ${scenario.pickle.name}`);
  try {
    // Add a small delay to ensure JSON report is written
    setTimeout(() => {
      generateScenarioReport();
    }, 1000);
  } catch (error) {
    console.error("❌ Error generating scenario report:", error.message);
  }

  console.log(`✅ After hook completed for: ${scenario.pickle.name}`);
});

module.exports = { takeScreenShotOnFailure, takeScreenShotOnSuccess };
