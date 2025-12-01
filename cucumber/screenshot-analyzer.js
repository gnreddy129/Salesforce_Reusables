// screenshot-analyzer.js - Analysis and metrics for screenshot organization

const fs = require("fs");
const path = require("path");

function analyzeScreenshotOrganization() {
  const screenshotsBaseDir = "cucumber-reports/screenshots";

  if (!fs.existsSync(screenshotsBaseDir)) {
    console.log("⚠️ No screenshots directory found");
    return;
  }

  console.log(
    "📊 Analyzing screenshot organization and generating comprehensive summary..."
  );

  let totalScreenshots = 0;
  let totalFeatures = 0;
  let totalModules = 0;
  const moduleStats = {};

  try {
    // Get all module directories
    const modules = fs.readdirSync(screenshotsBaseDir).filter((item) => {
      const itemPath = path.join(screenshotsBaseDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    totalModules = modules.length;

    modules.forEach((module) => {
      const moduleDir = path.join(screenshotsBaseDir, module);
      const items = fs.readdirSync(moduleDir);

      // Count features and screenshots in this module
      let moduleFeatureCount = 0;
      let moduleScreenshotCount = 0;
      const features = {};

      items.forEach((item) => {
        const itemPath = path.join(moduleDir, item);

        if (fs.statSync(itemPath).isDirectory()) {
          // It's a feature directory
          const screenshots = fs
            .readdirSync(itemPath)
            .filter((file) => file.endsWith(".png"));
          if (screenshots.length > 0) {
            features[item] = screenshots.length;
            moduleFeatureCount++;
            moduleScreenshotCount += screenshots.length;
          }
        } else if (item.endsWith(".png")) {
          // It's a loose screenshot - move to general
          const generalDir = path.join(moduleDir, "general");
          if (!fs.existsSync(generalDir)) {
            fs.mkdirSync(generalDir, { recursive: true });
          }

          const targetPath = path.join(generalDir, item);
          if (!fs.existsSync(targetPath)) {
            fs.renameSync(itemPath, targetPath);
            console.log(
              `🔧 Moved remaining loose screenshot: ${module}/${item} → ${module}/general/`
            );

            // Update features count
            features["general"] = (features["general"] || 0) + 1;
            if (!features["general"] || features["general"] === 1) {
              moduleFeatureCount++;
            }
            moduleScreenshotCount++;
          }
        }
      });

      totalFeatures += moduleFeatureCount;
      totalScreenshots += moduleScreenshotCount;
      moduleStats[module] = {
        features: moduleFeatureCount,
        screenshots: moduleScreenshotCount,
        featureDetails: features,
      };
    });

    // Generate comprehensive summary
    console.log(`\n📊 FINAL SCREENSHOT ORGANIZATION SUMMARY`);
    console.log(`${"=".repeat(50)}`);
    console.log(`📂 Total Modules: ${totalModules}`);
    console.log(`📝 Total Features: ${totalFeatures}`);
    console.log(`📸 Total Screenshots: ${totalScreenshots}`);
    console.log(`${"=".repeat(50)}\n`);

    // Detailed module breakdown
    modules.forEach((module) => {
      const stats = moduleStats[module];
      console.log(`📂 ${module.toUpperCase()}`);
      console.log(
        `   Features: ${stats.features} | Screenshots: ${stats.screenshots}`
      );

      // Show top features by screenshot count
      const sortedFeatures = Object.entries(stats.featureDetails)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5); // Top 5 features

      sortedFeatures.forEach(([feature, count]) => {
        console.log(`   │  ├── ${feature}/ (${count} screenshots)`);
      });

      if (Object.keys(stats.featureDetails).length > 5) {
        const remaining = Object.keys(stats.featureDetails).length - 5;
        console.log(`   │  └── ... and ${remaining} more features`);
      }
      console.log("");
    });

    // Generate hierarchical directory tree
    console.log(`📁 COMPLETE DIRECTORY STRUCTURE:`);
    console.log(`${"=".repeat(50)}`);
    console.log(`cucumber-reports/screenshots/`);

    modules.forEach((module, moduleIndex) => {
      const isLastModule = moduleIndex === modules.length - 1;
      const modulePrefix = isLastModule ? "└──" : "├──";
      console.log(`${modulePrefix} ${module}/`);

      const features = Object.keys(moduleStats[module].featureDetails);
      features.forEach((feature, featureIndex) => {
        const isLastFeature = featureIndex === features.length - 1;
        const featurePrefix = isLastModule
          ? isLastFeature
            ? "    └──"
            : "    ├──"
          : isLastFeature
          ? "│   └──"
          : "│   ├──";
        const count = moduleStats[module].featureDetails[feature];
        console.log(`${featurePrefix} ${feature}/ (${count} screenshots)`);
      });
    });

    // Success metrics
    const avgScreenshotsPerModule = (totalScreenshots / totalModules).toFixed(
      1
    );
    const avgScreenshotsPerFeature = (totalScreenshots / totalFeatures).toFixed(
      1
    );

    console.log(`\n📈 ORGANIZATION METRICS:`);
    console.log(`${"=".repeat(50)}`);
    console.log(
      `📊 Average screenshots per module: ${avgScreenshotsPerModule}`
    );
    console.log(
      `📊 Average screenshots per feature: ${avgScreenshotsPerFeature}`
    );
    console.log(
      `✅ Organization efficiency: ${(
        ((totalScreenshots -
          modules.reduce(
            (acc, m) => acc + (moduleStats[m].featureDetails["general"] || 0),
            0
          )) /
          totalScreenshots) *
        100
      ).toFixed(1)}%`
    );

    console.log(`\n🎉 SCREENSHOT ORGANIZATION COMPLETE!`);
    console.log(
      `All ${totalScreenshots} screenshots are now properly organized across ${totalModules} modules and ${totalFeatures} features.`
    );

    // Create a summary JSON file for reference
    const summaryData = {
      timestamp: new Date().toISOString(),
      totalModules,
      totalFeatures,
      totalScreenshots,
      moduleStats,
      organizationEfficiency:
        (
          ((totalScreenshots -
            modules.reduce(
              (acc, m) => acc + (moduleStats[m].featureDetails["general"] || 0),
              0
            )) /
            totalScreenshots) *
          100
        ).toFixed(1) + "%",
    };

    fs.writeFileSync(
      path.join(screenshotsBaseDir, "organization-summary.json"),
      JSON.stringify(summaryData, null, 2)
    );
    console.log(
      `📋 Summary saved to: ${screenshotsBaseDir}/organization-summary.json`
    );
  } catch (error) {
    console.error("❌ Error during final cleanup:", error.message);
  }
}

// Run analysis if called directly
if (require.main === module) {
  analyzeScreenshotOrganization();
}

module.exports = { analyzeScreenshotOrganization };
