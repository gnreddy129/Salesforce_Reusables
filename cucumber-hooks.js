// cucumber-hooks.js
const { After, Before, Status } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");

// Ensure screenshots directory exists
const screenshotsDir = "./cucumber-reports/screenshots/";
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const takeScreenshot = async (world, scenario, status = "failed") => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `${scenarioName}_${status}_${timestamp}.png`;
  const fullPath = path.join(screenshotsDir, fileName);

  try {
    const page = world.page || global.page;
    if (page && !page.isClosed()) {
      const screenShot = await page.screenshot({
        path: fullPath,
        fullPage: true,
      });
      if (screenShot) {
        await world.attach(screenShot, "image/png");
        console.log(`📸 Screenshot saved: ${fileName}`);
      }
    }
  } catch (error) {
    console.log("❌ Error taking screenshot:", error);
  }
};

Before(async function (scenario) {
  console.log(`🚀 Starting: ${scenario.pickle.name}`);
});

After(async function (scenario) {
  console.log(
    `🏁 Completed: ${scenario.pickle.name} - ${scenario.result.status}`
  );

  // Take screenshot on failure only
  if (scenario.result?.status !== Status.PASSED) {
    await takeScreenshot(this, scenario, "failed");
  }
});

module.exports = { takeScreenshot };
