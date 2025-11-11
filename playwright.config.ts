import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig, cucumberReporter } from "playwright-bdd";

import path from "path";

export const STORAGE_STATE = path.join(__dirname, "playwright/.auth/user.json");
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

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
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { open: 'never' }],
    cucumberReporter("html", { outputFile: "cucumber-report/report.html" }),
    ["junit", { outputFile: "./notify-results/test-results.xml" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://www.saucedemo.com",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    // storageState: "salesforce-auth.json",
    launchOptions: {
      // 1
      args: ["--start-maximized"],
    },
    screenshot: "on",
    ignoreHTTPSErrors: true, // Ignore HTTPS certificate errors
  },
  timeout: 60000,
  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
      //teardown: 'close',
    },
    //{
    //name: 'close',
    //testMatch: /global\.teardown\.ts/,
    //},

    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
      dependencies: ["setup"],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
