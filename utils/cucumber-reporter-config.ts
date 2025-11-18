/**
 * Custom Cucumber Reporter Configuration
 *
 * This configuration enhances the cucumber reporting to include:
 * - Screenshot attachments for all test steps
 * - Enhanced HTML reports with embedded media
 * - JSON reports for CI/CD integration
 * - Proper folder structure for organized reporting
 */

export const cucumberReporterConfig = {
  // HTML Reporter Configuration
  htmlOutputFile: "cucumber-reports/cucumber-html-report.html",

  // JSON Reporter Configuration
  jsonOutputFile: "cucumber-reports/cucumber-report.json",

  // Screenshots and Media Configuration
  screenshotsPath: "cucumber-reports/screenshots",
  videosPath: "cucumber-reports/videos",
  tracesPath: "cucumber-reports/traces",
};

export default cucumberReporterConfig;
