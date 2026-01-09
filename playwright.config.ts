import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig, cucumberReporter } from "playwright-bdd";
import { Helper } from "./utils/helper";

const testDir = defineBddConfig({
  paths: ["./tests/features/**/*.feature"],
  require: ["./stepdef/**/*.ts"],
});
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Un-comment below line if following TDD pattern and comment the line below that*/
  // testDir: './tests/tdd/'
  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? undefined : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    // ["html", { open: "never" }],
    // cucumberReporter("json", { outputFile: "cucumber-reports/cucumber-report.json" }),
    // ["junit", { outputFile: "./notify-results/test-results.xml" }],
    
    cucumberReporter("html", {
      outputFile: `cucumber-reports/cucumber-html-report-${new Date().toISOString().replace(/[:.]/g, '-')}.html`,
    })
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://login.salesforce.com",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    // storageState: "salesforce-auth.json",
    launchOptions: {
      // 1
      args: ["--start-maximized"],
    },
    screenshot: "on",
    video: "retain-on-failure",
    ignoreHTTPSErrors: true, // Ignore HTTPS certificate errors
  },
  timeout: 120000,
  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
      //teardown: 'close',
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
      dependencies: ["setup"],
    },
  ],
});
