// cucumber-hooks.js
const { After, Before, Status } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");

// Ensure screenshots directory exists
const screenshotsDir = "./cucumber-reports/screenshots/";
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const takeScreenShotOnFailure = async (world, scenario) => {
  const screenshotPath = "./cucumber-reports/screenshots/";
  const screenshotExtn = ".png";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `${scenarioName}_${timestamp}${screenshotExtn}`;
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
  const screenshotPath = "./cucumber-reports/screenshots/";
  const screenshotExtn = ".png";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `${scenarioName}_success_${timestamp}${screenshotExtn}`;
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

  console.log(`✅ After hook completed for: ${scenario.pickle.name}`);
});

module.exports = { takeScreenShotOnFailure, takeScreenShotOnSuccess };
