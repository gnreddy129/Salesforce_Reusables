// cucumber.simple.report.js - Simplified cucumber reporting by module (no timestamps)

const reporter = require("cucumber-html-reporter");
const path = require("path");
const fs = require("fs");

// Comprehensive mapping of all Salesforce features to their modules and folders
const FEATURE_MODULE_MAP = {
  // CustomerData Module
  "authorization-form-consent": { module: "customerdata", feature: "authorization-form-consent" },
  "authorization-form-data-use": { module: "customerdata", feature: "authorization-form-data-use" },
  "authorization-form-text": { module: "customerdata", feature: "authorization-form-text" },
  "authorization-form": { module: "customerdata", feature: "authorization-form" },
  "communication-subscription-channel-types": { module: "customerdata", feature: "communication-subscription-channel-types" },
  "communication-subscriptions": { module: "customerdata", feature: "communication-subscriptions" },
  "contact-point-consent": { module: "customerdata", feature: "contact-point-consent" },
  "contact-requests": { module: "customerdata", feature: "contact-requests" },
  "contacts": { module: "customerdata", feature: "contacts" },
  "customers": { module: "customerdata", feature: "customers" },
  "data-use-legal-basis": { module: "customerdata", feature: "data-use-legal-basis" },
  "data-use-purpose": { module: "customerdata", feature: "data-use-purpose" },
  "individuals": { module: "customerdata", feature: "individuals" },
  "legal-entities": { module: "customerdata", feature: "legal-entities" },
  "party-consent": { module: "customerdata", feature: "party-consent" },

  // Sales Module
  "accounts": { module: "sales", feature: "accounts" },
  "leads": { module: "sales", feature: "leads" },
  "opportunities": { module: "sales", feature: "opportunities" },
  "orders": { module: "sales", feature: "orders" },
  "price-books": { module: "sales", feature: "price-books" },
  "products": { module: "sales", feature: "products" },
  "sellers": { module: "sales", feature: "sellers" },

  // OtherFunctionality Module
  "reports": { module: "otherfunctionality", feature: "reports" },
  "appointment-categories": { module: "otherfunctionality", feature: "appointment-categories" },
  "appointment-invitations": { module: "otherfunctionality", feature: "appointment-invitations" },
  "business-brands": { module: "otherfunctionality", feature: "business-brands" },
  "calendar": { module: "otherfunctionality", feature: "calendar" },
  "catalog": { module: "otherfunctionality", feature: "catalog" },
  "categories": { module: "otherfunctionality", feature: "categories" },
  "consumption-schedules": { module: "otherfunctionality", feature: "consumption-schedules" },
  "contracts": { module: "otherfunctionality", feature: "contracts" },
  "files": { module: "otherfunctionality", feature: "files" },
  "images": { module: "otherfunctionality", feature: "images" },
  "labels": { module: "otherfunctionality", feature: "labels" },
  "list-emails": { module: "otherfunctionality", feature: "list-emails" },
  "operating-hours": { module: "otherfunctionality", feature: "operating-hours" },
  "process-exceptions": { module: "otherfunctionality", feature: "process-exceptions" },
  "scorecards": { module: "otherfunctionality", feature: "scorecards" },
  "shifts": { module: "otherfunctionality", feature: "shifts" },
  "streaming-channels": { module: "otherfunctionality", feature: "streaming-channels" },

  // Platform Module
  "custom-libraries": { module: "platform", feature: "custom-libraries" },
  "dashboards": { module: "platform", feature: "dashboards" },
  "email-templates": { module: "platform", feature: "email-templates" },
  "enhanced-letterheads": { module: "platform", feature: "enhanced-letterheads" },
  "groups": { module: "platform", feature: "groups" },
  "quick-texts": { module: "platform", feature: "quick-texts" },
  "tasks": { module: "platform", feature: "tasks" },

  // Finance Module
  "alternative-payment": { module: "finance", feature: "alternative-payment" },
  "financetransactions": { module: "finance", feature: "financetransactions" },
  "payment-authorization-adjustments": { module: "finance", feature: "payment-authorization-adjustments" },
  "payment-authorization": { module: "finance", feature: "payment-authorization" },
  "payment-gateway-logs": { module: "finance", feature: "payment-gateway-logs" },
  "payments": { module: "finance", feature: "payments" },
  "refund-line-payments": { module: "finance", feature: "refund-line-payments" },
  "refunds": { module: "finance", feature: "refunds" },

  // Inventory Module
  "assets": { module: "inventory", feature: "assets" },
  "inventoryresevations": { module: "inventory", feature: "inventoryresevations" },
  "location-groups": { module: "inventory", feature: "location-groups" },
  "return-order": { module: "inventory", feature: "return-order" },
  "shipping-carrier-methods": { module: "inventory", feature: "shipping-carrier-methods" },
  "shipping-carriers": { module: "inventory", feature: "shipping-carriers" },

  // Marketing Module
  "campaign": { module: "marketing", feature: "campaign" },
  "coupons": { module: "marketing", feature: "coupons" },
  "engagement-channel-types": { module: "marketing", feature: "engagement-channel-types" },
  "promotion-segments": { module: "marketing", feature: "promotion-segments" },
  "promotions": { module: "marketing", feature: "promotions" },

  // Service Module
  "cases": { module: "service", feature: "cases" },
  "change-requests": { module: "service", feature: "change-requests" },
  "entitlements": { module: "service", feature: "entitlements" },
  "incidents": { module: "service", feature: "incidents" },
  "problems": { module: "service", feature: "problems" },
  "service-appointments": { module: "service", feature: "service-appointments" },
  "service-resources": { module: "service", feature: "service-resources" },
  "service-territories": { module: "service", feature: "service-territories" },
  "service-contracts": { module: "service", feature: "service-contracts" },
  "work-orders": { module: "service", feature: "work-orders" },
  "work-plan-templates": { module: "service", feature: "work-plan-templates" },
  "work-plans": { module: "service", feature: "work-plans" },
  "work-type-groups": { module: "service", feature: "work-type-groups" },
  "work-types": { module: "service", feature: "work-types" }
};

// Extract module and feature details from the cucumber report JSON
function getModuleAndFeatureFromReport(jsonPath) {
  try {
    const reportData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    if (reportData && reportData.length > 0) {
      const firstFeature = reportData[0];
      let moduleName = "otherfunctionality"; // Default
      let featureName = "general";

      // Check if there's a URI field (path-based detection) - Most reliable method
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
          const extractedFeature = fileName
            .replace("salesforce_", "")
            .replace("salesforce-", "")
            .replace(".feature", "")
            .toLowerCase();

          // Check if extracted feature exists in our comprehensive mapping
          if (FEATURE_MODULE_MAP[extractedFeature]) {
            return FEATURE_MODULE_MAP[extractedFeature];
          }
          
          featureName = extractedFeature;
        }
      } else {
        // Fallback: Extract from feature name/content using comprehensive mapping
        if (firstFeature.name) {
          const featureTitle = firstFeature.name.toLowerCase();
          
          // Try to find matching feature from title keywords
          for (const [featureKey, mapping] of Object.entries(FEATURE_MODULE_MAP)) {
            const featureKeywords = featureKey.split('-');
            const hasAllKeywords = featureKeywords.every(keyword => 
              featureTitle.includes(keyword.replace('_', ''))
            );
            
            if (hasAllKeywords) {
              return mapping;
            }
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

// Function to organize screenshots hierarchically
function organizeScreenshots(moduleName, featureName) {
  const flatScreenshotsDir = "cucumber-reports/screenshots";
  const hierarchicalScreenshotsDir = `cucumber-reports/screenshots/${moduleName}/${featureName}`;
  
  // Create hierarchical screenshot directory
  if (!fs.existsSync(hierarchicalScreenshotsDir)) {
    fs.mkdirSync(hierarchicalScreenshotsDir, { recursive: true });
  }

  // Check if there are any flat screenshots to organize
  if (fs.existsSync(flatScreenshotsDir)) {
    try {
      const items = fs.readdirSync(flatScreenshotsDir);
      items.forEach((item) => {
        const itemPath = path.join(flatScreenshotsDir, item);
        
        // Only process PNG files (skip directories)
        if (fs.statSync(itemPath).isFile() && item.endsWith('.png')) {
          // Check if screenshot belongs to current feature
          const lowercaseFilename = item.toLowerCase();
          const featureKeywords = featureName.split('-');
          const belongsToFeature = featureKeywords.some(keyword => 
            lowercaseFilename.includes(keyword.replace('_', ''))
          );
          
          if (belongsToFeature) {
            const targetPath = path.join(hierarchicalScreenshotsDir, item);
            // Move the screenshot to hierarchical location
            if (!fs.existsSync(targetPath)) {
              fs.renameSync(itemPath, targetPath);
              console.log(`📁 Organized screenshot: ${item} → ${moduleName}/${featureName}/`);
            }
          }
        }
      });
    } catch (error) {
      console.log("⚠️ Error organizing screenshots:", error.message);
    }
  }
}

// Get module and feature details from the report
const { module: moduleName, feature: featureName } =
  getModuleAndFeatureFromReport("cucumber-reports/cucumber-report.json");

// Hierarchical directory structure: module/feature (no timestamps)
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

// Organize screenshots hierarchically
organizeScreenshots(moduleName, featureName);

const now = new Date();
const options = {
  jsonFile: "cucumber-reports/cucumber-report.json",
  launchReport: false,
  noInlineScreenshots: false,
  output: path.join(featureDir, "report.html"), // Hierarchical: module/feature/report.html
  reportSuiteAsScenarios: true,
  scenarioTimestamp: false, // Remove timestamps from scenarios
  screenshotsDirectory: `cucumber-reports/screenshots/${moduleName}/${featureName}/`,
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
    "Last Updated": now.toLocaleString(),
  },
};

console.log(`🎯 Generating Hierarchical Cucumber Report`);
console.log(`📂 Module: ${moduleName.toUpperCase()}`);
console.log(`� Feature: ${featureName.toUpperCase().replace(/-/g, " ")}`);
console.log(`�📁 Report will be stored as: ${featureDir}/report.html`);

try {
  reporter.generate(options);
  console.log(`✅ Report generated successfully: ${featureDir}/report.html`);

  // Create simple index file for easy access
  createSimpleIndex();
} catch (error) {
  console.error("❌ Error generating cucumber report:", error.message);
}

function createSimpleIndex() {
  const indexPath = path.join(reportsBaseDir, "index.html");

  // Get all modules and their features
  const moduleStructure = {};
  if (fs.existsSync(reportsBaseDir)) {
    const items = fs.readdirSync(reportsBaseDir);
    for (const item of items) {
      const itemPath = path.join(reportsBaseDir, item);
      if (fs.statSync(itemPath).isDirectory() && item !== "screenshots") {
        // Check for features within this module
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
  console.log(`📋 Hierarchical index created: ${indexPath}`);
}
