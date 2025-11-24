// cucumber.simple.report.js - Hierarchical cucumber reporting by module and feature

const reporter = require("cucumber-html-reporter");
const path = require("path");
const fs = require("fs");

// Extract module and feature details from the cucumber report JSON
function getModuleAndFeatureFromReport(jsonPath) {
  try {
    const reportData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    if (reportData && reportData.length > 0) {
      const firstFeature = reportData[0];
      let moduleName = "otherfunctionality"; // Default
      let featureName = "general";

      // Check if there's a URI field (path-based detection)
      if (firstFeature.uri) {
        const pathParts = firstFeature.uri.split(/[/\\]/);
        const featuresIndex = pathParts.findIndex(
          (part) => part.toLowerCase() === "features"
        );
        if (featuresIndex !== -1 && featuresIndex + 1 < pathParts.length) {
          moduleName = pathParts[featuresIndex + 1].toLowerCase();
        }

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

          if (featureTitle.includes("price book")) {
            featureName = "price-books";
            moduleName = "sales";
          } else if (featureTitle.includes("opportunity")) {
            featureName = "opportunities";
            moduleName = "sales";
          } else if (featureTitle.includes("account")) {
            featureName = "accounts";
            moduleName = "sales";
          } else if (featureTitle.includes("lead")) {
            featureName = "leads";
            moduleName = "sales";
          } else if (featureTitle.includes("contact")) {
            featureName = "contacts";
            moduleName = "customerdata";
          } else if (featureTitle.includes("scorecard")) {
            featureName = "scorecards";
            moduleName = "otherfunctionality";
          } else if (featureTitle.includes("location group")) {
            featureName = "location-groups";
            moduleName = "inventory";
          }
        }
      }

      return { module: moduleName, feature: featureName };
    }
  } catch (error) {
    console.log(
      "⚠️ Could not extract module/feature from report JSON, using defaults"
    );
  }
  return { module: "general", feature: "general" };
}

// Get module and feature details from the report
const { module: moduleName, feature: featureName } =
  getModuleAndFeatureFromReport("cucumber-reports/cucumber-report.json");

// Hierarchical directory structure: module/feature
const reportsBaseDir = "cucumber-reports";
const moduleDir = path.join(reportsBaseDir, moduleName);
const featureDir = path.join(moduleDir, featureName);

// Ensure directories exist
if (!fs.existsSync(reportsBaseDir))
  fs.mkdirSync(reportsBaseDir, { recursive: true });
if (!fs.existsSync(moduleDir)) fs.mkdirSync(moduleDir, { recursive: true });
if (!fs.existsSync(featureDir)) fs.mkdirSync(featureDir, { recursive: true });

const options = {
  jsonFile: "cucumber-reports/cucumber-report.json",
  launchReport: false,
  noInlineScreenshots: false,
  output: path.join(featureDir, "report.html"),
  reportSuiteAsScenarios: true,
  screenshotsDirectory: `cucumber-reports/screenshots/${moduleName}/`,
  storeScreenshots: true,
  theme: "bootstrap",
  brandTitle: `Salesforce ${moduleName.toUpperCase()} - ${featureName
    .toUpperCase()
    .replace(/-/g, " ")} Test Report`,
  name: `${moduleName.toUpperCase()} > ${featureName
    .toUpperCase()
    .replace(/-/g, " ")} Test Results`,
  columnLayout: 1,
  metadata: {
    Module: moduleName.toUpperCase(),
    Feature: featureName.toUpperCase().replace(/-/g, " "),
    "Test Environment": "QA",
    Browser: "Chrome",
    Platform: "Windows",
    "Last Updated": new Date().toLocaleString(),
  },
};

console.log(`🎯 Generating Hierarchical Cucumber Report`);
console.log(`📂 Module: ${moduleName.toUpperCase()}`);
console.log(`📄 Feature: ${featureName.toUpperCase().replace(/-/g, " ")}`);
console.log(`📁 Report will be stored as: ${featureDir}/report.html`);

try {
  reporter.generate(options);
  console.log(`✅ Report generated successfully: ${featureDir}/report.html`);
  createOrUpdateIndex();
} catch (error) {
  console.error("❌ Error generating cucumber report:", error.message);
}

function createOrUpdateIndex() {
  const indexPath = path.join(reportsBaseDir, "index.html");

  // Get all modules and their features
  const moduleStructure = {};
  if (fs.existsSync(reportsBaseDir)) {
    const items = fs.readdirSync(reportsBaseDir);
    for (const item of items) {
      const itemPath = path.join(reportsBaseDir, item);
      if (fs.statSync(itemPath).isDirectory() && item !== "screenshots") {
        const features = [];
        const moduleItems = fs.readdirSync(itemPath);
        for (const featureItem of moduleItems) {
          const featurePath = path.join(itemPath, featureItem);
          if (
            fs.statSync(featurePath).isDirectory() &&
            fs.existsSync(path.join(featurePath, "report.html"))
          ) {
            features.push(featureItem);
          }
        }
        if (features.length > 0) {
          moduleStructure[item] = features;
        }
      }
    }
  }

  const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salesforce Test Reports</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #007acc;
            padding-bottom: 10px;
        }
        .module-section {
            margin-bottom: 30px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
        }
        .module-header {
            background: #007acc;
            color: white;
            padding: 15px 20px;
            font-weight: bold;
            font-size: 18px;
            text-transform: uppercase;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            padding: 20px;
            background: #f8f9fa;
        }
        .feature-card {
            background: white;
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .feature-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        .feature-card a {
            text-decoration: none;
            color: #007acc;
            font-weight: 600;
            font-size: 14px;
            text-transform: capitalize;
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
  console.log(`📋 Hierarchical index updated: ${indexPath}`);
}
