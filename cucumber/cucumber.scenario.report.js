// cucumber.scenario.report.js - Generate reports after each scenario execution

const reporter = require("cucumber-html-reporter");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

// Function to generate report for current scenario
function generateScenarioReport() {
  try {
    // Check if cucumber report JSON exists
    const jsonReportPath = "cucumber-reports/cucumber-report.json";
    if (!fs.existsSync(jsonReportPath)) {
      console.log("⚠️ No cucumber report JSON found yet, skipping report generation");
      return;
    }

    // Extract module and feature details from the cucumber report JSON
    const { module: moduleName, feature: featureName } = getModuleAndFeatureFromReport(jsonReportPath);

    // Hierarchical directory structure: module/feature
    const reportsBaseDir = "cucumber-reports";
    const moduleDir = path.join(reportsBaseDir, moduleName);
    const featureDir = path.join(moduleDir, featureName);

    // Ensure directories exist
    if (!fs.existsSync(reportsBaseDir)) {
      fs.mkdirSync(reportsBaseDir, { recursive: true });
    }
    if (!fs.existsSync(moduleDir)) {
      fs.mkdirSync(moduleDir, { recursive: true });
    }
    if (!fs.existsSync(featureDir)) {
      fs.mkdirSync(featureDir, { recursive: true });
    }

    // Copy screenshots to feature directory
    copyScreenshots(moduleName, featureName, featureDir);

    const now = new Date();
    const options = {
      theme: "bootstrap",
      jsonFile: jsonReportPath,
      output: path.join(featureDir, "report.html"),
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: false,
      noInlineScreenshots: false,
      screenshotsDirectory: `cucumber-reports/screenshots/${moduleName}/${featureName}/`,
      storeScreenshots: true,
      metadata: {
        "App Version": "1.0.0",
        "Test Environment": "QA",
        Browser: "Chrome",
        Platform: "Windows",
        "Last Updated": now.toLocaleString(),
      },
    };

    console.log(`🎯 Generating Scenario Report`);
    console.log(`📂 Module: ${moduleName.toUpperCase()}`);
    console.log(`📝 Feature: ${featureName.toUpperCase().replace(/-/g, " ")}`);
    console.log(`📁 Report will be stored as: ${featureDir}/report.html`);

    reporter.generate(options);
    console.log(`✅ Scenario report generated successfully: ${featureDir}/report.html`);

    // Create or update the index file
    createSimpleIndex();

  } catch (error) {
    console.error("❌ Error generating scenario report:", error.message);
  }
}

// Extract module and feature details from the cucumber report JSON
function getModuleAndFeatureFromReport(jsonPath) {
  try {
    const reportData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    if (reportData && reportData.length > 0) {
      const firstFeature = reportData[0];
      let moduleName = "otherfunctionality"; // Default based on current test
      let featureName = "general";

      // Check if there's a URI field (path-based detection)
      if (firstFeature.uri) {
        const pathParts = firstFeature.uri.split(/[/\\]/); // Handle both forward and back slashes

        // Extract module from the path (look for the folder name after "features")
        const featuresIndex = pathParts.findIndex(
          (part) => part.toLowerCase() === "features"
        );
        if (featuresIndex !== -1 && featuresIndex + 1 < pathParts.length) {
          moduleName = pathParts[featuresIndex + 1].toLowerCase();
        }

        // Extract simple feature name from filename
        const fileName = pathParts[pathParts.length - 1];
        if (fileName) {
          featureName = fileName
            .replace("salesforce_", "")
            .replace(".feature", "")
            .toLowerCase();
        }
      } else {
        // Fallback: Extract from feature name/content
        if (firstFeature.name) {
          const featureTitle = firstFeature.name.toLowerCase();

          // Feature detection logic (same as original)
          if (featureTitle.includes("price book")) {
            featureName = "price-books";
            moduleName = "sales";
          } else if (featureTitle.includes("scorecard")) {
            featureName = "scorecards";
            moduleName = "otherfunctionality";
          } else if (featureTitle.includes("location group")) {
            featureName = "location-groups";
            moduleName = "inventory";
          } else if (featureTitle.includes("contact")) {
            featureName = "contacts";
            moduleName = "customerdata";
          } else if (featureTitle.includes("individual")) {
            featureName = "individuals";
            moduleName = "customerdata";
          } else if (featureTitle.includes("account")) {
            featureName = "accounts";
            moduleName = "sales";
          } else if (featureTitle.includes("lead")) {
            featureName = "leads";
            moduleName = "sales";
          } else if (featureTitle.includes("opportunity")) {
            featureName = "opportunities";
            moduleName = "sales";
          } else if (featureTitle.includes("alternative payment")) {
            featureName = "alternative-payment";
            moduleName = "finance";
          } else if (featureTitle.includes("appointment")) {
            featureName = "appointment-categories";
            moduleName = "otherfunctionality";
          } else if (featureTitle.includes("calendar")) {
            featureName = "calendar";
            moduleName = "otherfunctionality";
          } else if (featureTitle.includes("catalog")) {
            featureName = "catalog";
            moduleName = "otherfunctionality";
          } else if (featureTitle.includes("contract")) {
            featureName = "contracts";
            moduleName = "otherfunctionality";
          } else if (featureTitle.includes("file")) {
            featureName = "files";
            moduleName = "otherfunctionality";
          } else if (featureTitle.includes("work step")) {
            featureName = "work-step-templates";
            moduleName = "otherfunctionality";
          } else if (featureTitle.includes("change request")) {
            featureName = "change-requests";
            moduleName = "service";
          } else if (featureTitle.includes("report")) {
            featureName = "reports";
            moduleName = "otherfunctionality";
          }
        }
      }

      return { module: moduleName, feature: featureName };
    }
    return { module: "general", feature: "general" };
  } catch (error) {
    console.log("❌ Error parsing cucumber report:", error.message);
    return { module: "general", feature: "general" };
  }
}

function copyScreenshots(moduleName, featureName, targetDir) {
  const screenshotSourceDir = `cucumber-reports/screenshots/${moduleName}/${featureName}`;
  const screenshotTargetDir = path.join(targetDir, "screenshots");

  if (fs.existsSync(screenshotSourceDir)) {
    if (!fs.existsSync(screenshotTargetDir)) {
      fs.mkdirSync(screenshotTargetDir, { recursive: true });
    }

    try {
      const screenshots = fs.readdirSync(screenshotSourceDir);
      screenshots.forEach((screenshot) => {
        if (screenshot.endsWith(".png")) {
          const sourcePath = path.join(screenshotSourceDir, screenshot);
          const targetPath = path.join(screenshotTargetDir, screenshot);
          fs.copyFileSync(sourcePath, targetPath);
        }
      });
      console.log(`📸 Screenshots copied from: ${screenshotSourceDir} to: ${screenshotTargetDir}`);
    } catch (error) {
      console.log("⚠️ Error copying screenshots:", error.message);
    }
  } else {
    console.log(`⚠️ Screenshot source directory not found: ${screenshotSourceDir}`);
  }
}

function createSimpleIndex() {
  const reportsBaseDir = "cucumber-reports";
  const indexPath = path.join(reportsBaseDir, "index.html");

  // Get all modules and their features
  const moduleStructure = {};
  if (fs.existsSync(reportsBaseDir)) {
    const items = fs.readdirSync(reportsBaseDir);
    for (const item of items) {
      const itemPath = path.join(reportsBaseDir, item);
      if (fs.statSync(itemPath).isDirectory() && item !== "screenshots") {
        const features = fs.readdirSync(itemPath);
        moduleStructure[item] = features.filter((feature) => {
          const featurePath = path.join(itemPath, feature);
          return fs.statSync(featurePath).isDirectory();
        });
      }
    }
  }

  const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salesforce Test Reports Dashboard</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f7fa;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 30px;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 40px;
            font-size: 2.5em;
        }
        .module-section {
            margin-bottom: 40px;
        }
        .module-header {
            background: #3498db;
            color: white;
            padding: 15px 20px;
            border-radius: 6px;
            font-size: 1.4em;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            padding-left: 20px;
        }
        .feature-card {
            background: #ecf0f1;
            border-left: 4px solid #3498db;
            padding: 15px;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        .feature-card:hover {
            background: #d5dbdb;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .feature-card a {
            text-decoration: none;
            color: #2c3e50;
            font-weight: 600;
            font-size: 1.1em;
        }
        .feature-card a:hover {
            color: #005fa3;
        }
        .timestamp {
            font-size: 12px;
            color: #666;
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Salesforce Test Reports</h1>
        ${Object.keys(moduleStructure)
          .map(
            (module) => `
            <div class="module-section">
                <div class="module-header">${module.toUpperCase()}</div>
                <div class="features-grid">
                    ${moduleStructure[module]
                      .map(
                        (feature) => `
                        <div class="feature-card">
                            <a href="${module}/${feature}/report.html">${feature
                          .replace(/-/g, " ")
                          .toUpperCase()}</a>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `
          )
          .join("")}
        <div class="timestamp">
            Last updated: ${new Date().toLocaleString()}
        </div>
    </div>
</body>
</html>`;

  fs.writeFileSync(indexPath, indexContent);
  console.log(`📋 Index updated: ${indexPath}`);
}

// Allow the script to be run directly or imported as a module
if (require.main === module) {
  // Script is being run directly
  generateScenarioReport();
} else {
  // Script is being imported as a module
  module.exports = { generateScenarioReport };
}
