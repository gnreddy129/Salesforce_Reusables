#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const inquirer = require("inquirer");
const figlet = require("figlet");

// ANSI Color codes for beautiful output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
};

// Helper function to colorize text
const colorize = (text, color) => `${colors[color]}${text}${colors.reset}`;

// Create beautiful banner with figlet
const createBanner = () => {
  // Get terminal width, default to 80 if not available
  const terminalWidth = process.stdout.columns || 80;

  // Generate the main title using figlet
  const figletText = figlet.textSync("Salesforce Reusables", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: Math.min(terminalWidth, 80),
    whitespaceBreak: true,
  });

  // Color the figlet text blue and make it bright
  const coloredFigletText = figletText
    .split("\n")
    .map((line) => `${colors.bright}${colors.blue}${line}${colors.reset}`)
    .join("\n");

  // Create the subtitle "Test Runner"
  const subtitle = "Test Runner";
  const subtitlePadding = Math.max(
    0,
    Math.floor((terminalWidth - subtitle.length) / 2)
  );
  const centeredSubtitle = " ".repeat(subtitlePadding) + subtitle;

  return `
${coloredFigletText}
${colors.yellow}${centeredSubtitle}${colors.reset}

`;
};

// Features directory mapping
const featureDirectories = [
  {
    name: "CustomerData (.feature)",
    path: "tests/features/CustomerData",
    icon: "👥",
    description: "Customer and contact management tests",
  },
  {
    name: "Finance (.feature)",
    path: "tests/features/Finance",
    icon: "💰",
    description: "Financial functionality tests",
  },
  {
    name: "Inventory (.feature)",
    path: "tests/features/Inventory",
    icon: "📦",
    description: "Inventory management tests",
  },
  {
    name: "Marketing (.feature)",
    path: "tests/features/Marketing",
    icon: "📢",
    description: "Marketing feature tests",
  },
  {
    name: "OtherFunctionality (.feature)",
    path: "tests/features/OtherFunctionality",
    icon: "⚙️",
    description: "Miscellaneous feature tests",
  },
  {
    name: "Platform (.feature)",
    path: "tests/features/Platform",
    icon: "🏗️",
    description: "Platform-level tests",
  },
  {
    name: "Sales (.feature)",
    path: "tests/features/Sales",
    icon: "💼",
    description: "Sales process tests",
  },
  {
    name: "Service (.feature)",
    path: "tests/features/Service",
    icon: "🛠️",
    description: "Service functionality tests",
  },
  {
    name: "Test Examples",
    path: "tests-examples",
    icon: "📚",
    description: "Example Playwright tests",
  },
  {
    name: "All Tests",
    path: "tests/features",
    icon: "🎯",
    description: "Run all test suites",
  },
];

// Run options mapping
const runOptions = [
  {
    name: "Run All Tests in Directory (Headless)",
    icon: "🏃",
    description: "Execute all tests in background",
    value: "test-all",
  },
  {
    name: "Run All Tests in Directory (Headed)",
    icon: "🖥️",
    description: "Execute all tests with browser visible",
    value: "test-all-headed",
  },
  {
    name: "Run Specific Test File (Headless)",
    icon: "📄",
    description: "Select and run specific test in background",
    value: "test-specific",
  },
  {
    name: "Run Specific Test File (Headed)",
    icon: "🔍",
    description: "Select and run specific test with browser visible",
    value: "test-specific-headed",
  },
  {
    name: "Open Playwright UI Mode",
    icon: "🎮",
    description: "Interactive debugging mode",
    value: "ui-mode",
  },
  {
    name: "View Existing Reports",
    icon: "📈",
    description: "Open previously generated reports",
    value: "view-reports",
  },
  {
    name: "Back to Main Menu",
    icon: "⬅️",
    description: "Return to directory selection",
    value: "back",
  },
];

// Reporting options after test execution
const reportOptions = [
  {
    name: "Generate Simple Report Only",
    icon: "📊",
    description: "Generate basic HTML report",
    value: "simple-report",
  },
  {
    name: "Open Cucumber Report",
    icon: "🥒",
    description: "Generate and open Cucumber HTML report",
    value: "cucumber-report",
  },
  {
    name: "Open Playwright Report",
    icon: "🎭",
    description: "Open Playwright HTML report",
    value: "playwright-report",
  },
  {
    name: "Open Both Reports",
    icon: "🔄",
    description: "Open both Playwright and Cucumber reports",
    value: "both-reports",
  },
  {
    name: "Skip Reports",
    icon: "⏭️",
    description: "Continue without generating reports",
    value: "skip",
  },
];

class TestRunner {
  constructor() {}

  showBanner() {
    console.clear();
    console.log(createBanner());
  }

  async showMainMenu() {
    const menuChoices = featureDirectories.map((dir) => {
      const fullPath = path.join(__dirname, "..", dir.path);
      const available =
        fs.existsSync(fullPath) &&
        (dir.name === "All Tests" || this.getFeatureFiles(dir.path).length > 0);

      const fileCount =
        dir.name === "All Tests"
          ? this.getAllFeatureFilesCount()
          : this.getFeatureFiles(dir.path).length;

      const status = available ? "✅" : "❌";
      const name = `${dir.icon} ${dir.name} ${status} (${fileCount} tests)`;

      return {
        name: name,
        value: dir,
        disabled: !available ? "No test files found" : false,
      };
    });

    // Add Exit option
    menuChoices.push(new inquirer.Separator());
    menuChoices.push({
      name: "🚪 Exit",
      value: "exit",
    });

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "directory",
        message: colorize("📋 SELECT TEST DIRECTORY TO RUN:", "bright"),
        choices: menuChoices,
        pageSize: 12,
        loop: false,
      },
    ]);

    return answer.directory;
  }

  async showRunOptions(selectedDirectory) {
    const menuChoices = runOptions.map((option) => ({
      name: `${option.icon} ${option.name}`,
      value: option.value,
      short: option.name,
    }));

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "runOption",
        message: colorize(
          `⚡ SELECT RUN OPTION FOR: ${selectedDirectory.icon} ${selectedDirectory.name}`,
          "bright"
        ),
        choices: menuChoices,
        pageSize: 12,
        loop: false,
      },
    ]);

    return answer.runOption;
  }

  async selectSpecificTestFile(directory) {
    const testFiles = this.getFeatureFiles(directory.path);

    if (testFiles.length === 0) {
      console.log(colorize("❌ No test files found in this directory!", "red"));
      return null;
    }

    const fileChoices = testFiles.map((filePath) => {
      const fileName = path.basename(filePath);
      const fileStats = fs.statSync(filePath);
      const fileSize = Math.round(fileStats.size / 1024);
      const lastModified = fileStats.mtime.toLocaleDateString();
      const fileExtension = path.extname(fileName);

      let fileIcon = "📄";
      if (fileExtension === ".feature") fileIcon = "🥒";
      else if (fileExtension === ".js") fileIcon = "📜";
      else if (fileExtension === ".ts") fileIcon = "📘";

      return {
        name: `${fileIcon} ${fileName} ${colorize(
          `(${fileSize}KB, modified: ${lastModified})`,
          "dim"
        )}`,
        value: filePath,
        short: fileName,
      };
    });

    // Add option to run all files
    fileChoices.unshift({
      name: `🎯 Run All Files in ${directory.name} (${testFiles.length} files)`,
      value: "all-files",
      short: "All Files",
    });

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedFile",
        message: colorize(`📋 SELECT TEST FILE TO RUN:`, "bright"),
        choices: fileChoices,
        pageSize: 15,
        loop: false,
      },
    ]);

    return answer.selectedFile;
  }

  async showReportOptions(testTarget) {
    const menuChoices = reportOptions.map((option) => ({
      name: `${option.icon} ${option.name}`,
      value: option.value,
      short: option.name,
    }));

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "reportOption",
        message: colorize(
          `📊 SELECT REPORTING OPTION FOR: ${testTarget}`,
          "bright"
        ),
        choices: menuChoices,
        pageSize: 8,
        loop: false,
      },
    ]);

    return answer.reportOption;
  }

  getFeatureFiles(directory) {
    // Adjust path to work from cli folder
    const fullPath = path.join(__dirname, "..", directory);
    if (!fs.existsSync(fullPath)) return [];

    return fs
      .readdirSync(fullPath)
      .filter((file) => file.endsWith(".feature"))
      .map((file) => path.join(fullPath, file));
  }

  getAllFeatureFilesCount() {
    let total = 0;
    featureDirectories.forEach((dir) => {
      const fullPath = path.join(__dirname, "..", dir.path);
      if (dir.name !== "All Tests" && fs.existsSync(fullPath)) {
        total += this.getFeatureFiles(dir.path).length;
      }
    });
    return total;
  }

  async runTestsWithReporting(
    directory,
    runOption,
    specificFile = null,
    reportChoice
  ) {
    const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let spinnerIndex = 0;

    let testTarget = directory.name;
    if (specificFile && specificFile !== "all-files") {
      testTarget = `${directory.name} - ${path.basename(specificFile)}`;
    }

    console.log(colorize(`\n🚀 Starting tests for: ${testTarget}`, "bright"));
    console.log(colorize("═".repeat(60), "dim"));

    try {
      let command = "npx";
      let args = ["playwright", "test"];

      // Add specific file or directory path
      if (specificFile && specificFile !== "all-files") {
        // Get only the filename without path and extension
        const fileName = path.basename(specificFile);
        const fileNameWithoutExt = fileName.replace(/\.feature$/, "");
        args.push(fileNameWithoutExt);
      } else if (directory.name !== "All Tests") {
        args.push(directory.path);
      }

      // Add --headed flag for headed options
      if (runOption.includes("headed")) {
        args.push("--headed");
      }

      console.log(colorize(`🔧 Command: ${command} ${args.join(" ")}`, "dim"));

      // Show spinner during test execution
      const spinnerInterval = setInterval(() => {
        process.stdout.write(
          `\r${colors.cyan}${spinner[spinnerIndex]} Running tests...${colors.reset}`
        );
        spinnerIndex = (spinnerIndex + 1) % spinner.length;
      }, 100);

      await this.executeCommand(command, args);
      clearInterval(spinnerInterval);
      process.stdout.write("\r" + " ".repeat(50) + "\r");

      console.log(colorize("✅ Tests completed successfully!", "green"));

      // Now handle the pre-selected reporting option
      console.log(
        colorize(
          `\n📊 Processing selected reporting option: ${reportChoice}`,
          "cyan"
        )
      );
      await this.handleReportChoice(reportChoice);
    } catch (error) {
      if (typeof spinnerInterval !== "undefined") {
        clearInterval(spinnerInterval);
        process.stdout.write("\r" + " ".repeat(50) + "\r");
      }
      console.log(colorize("❌ Tests failed!", "red"));
      console.log(colorize(`Error: ${error.message}`, "red"));

      // Still process reporting even if tests failed
      console.log(
        colorize(
          `\n⚠️  Tests failed, but processing reporting option: ${reportChoice}`,
          "yellow"
        )
      );
      await this.handleReportChoice(reportChoice);
    }
  }

  async runTests(directory, runOption, specificFile = null) {
    // This method is for UI mode only now
    console.log(colorize("🎮 Opening Playwright UI Mode...", "cyan"));

    let command = "npx";
    let args = ["playwright", "test", "--ui"];

    if (specificFile && specificFile !== "all-files") {
      // Get only the filename without path and extension
      const fileName = path.basename(specificFile);
      const fileNameWithoutExt = fileName.replace(/\.feature$/, "");
      args.push(fileNameWithoutExt);
    } else if (directory.name !== "All Tests") {
      args.push(directory.path);
    }

    try {
      await this.executeCommand(command, args);
      console.log(colorize("✅ UI Mode opened successfully!", "green"));
    } catch (error) {
      console.log(colorize("❌ Failed to open UI Mode!", "red"));
      console.log(colorize(`Error: ${error.message}`, "red"));
    }
  }

  async handleReportChoice(reportChoice) {
    // Always generate simple report first (except for skip option)
    if (reportChoice !== "skip") {
      console.log(colorize("📊 Step 1: Generating simple report...", "cyan"));
      await this.generateReports();
    }

    // Then execute the specific option selected
    switch (reportChoice) {
      case "simple-report":
        console.log(colorize("✅ Simple report generation complete!", "green"));
        break;
      case "cucumber-report":
        console.log(colorize("🥒 Step 2: Opening Cucumber report...", "cyan"));
        await this.executeCommand("npm", ["run", "open:reports"]);
        console.log(colorize("✅ Cucumber report opened!", "green"));
        break;
      case "playwright-report":
        console.log(
          colorize("🎭 Step 2: Opening Playwright report...", "cyan")
        );
        await this.executeCommand("npm", ["run", "open:report"]);
        console.log(colorize("✅ Playwright report opened!", "green"));
        break;
      case "both-reports":
        console.log(colorize("🔄 Step 2: Opening both reports...", "cyan"));
        await this.executeCommand("npm", ["run", "open:report"]);
        setTimeout(async () => {
          await this.executeCommand("npm", ["run", "open:reports"]);
        }, 1000);
        console.log(colorize("✅ Both reports opened!", "green"));
        break;
      case "skip":
        console.log(colorize("⏭️  Skipping report generation.", "yellow"));
        break;
    }
  }

  async generateReports() {
    console.log(colorize("\n📊 Generating reports...", "yellow"));

    try {
      await this.executeCommand("npm", ["run", "simple:report"]);
      console.log(colorize("✅ Reports generated successfully!", "green"));
    } catch (error) {
      console.log(colorize("⚠️  Report generation failed!", "yellow"));
      console.log(colorize(`Error: ${error.message}`, "red"));
    }
  }

  async viewExistingReports() {
    console.log(colorize("\n📈 Opening existing reports...", "cyan"));

    try {
      await this.executeCommand("npm", ["run", "open:report"]);
      setTimeout(async () => {
        await this.executeCommand("npm", ["run", "open:reports"]);
      }, 1000);
      console.log(colorize("✅ Existing reports opened!", "green"));
    } catch (error) {
      console.log(colorize("⚠️  Failed to open existing reports!", "yellow"));
      console.log(colorize(`Error: ${error.message}`, "red"));
    }
  }

  executeCommand(command, args) {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args, {
        stdio: "pipe",
        shell: true,
      });

      let output = "";
      let errorOutput = "";

      process.stdout.on("data", (data) => {
        output += data.toString();
      });

      process.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      process.on("close", (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(errorOutput || `Process exited with code ${code}`));
        }
      });

      process.on("error", (error) => {
        reject(error);
      });
    });
  }

  async confirmContinue(message = "Press Enter to continue...") {
    await inquirer.prompt([
      {
        type: "input",
        name: "continue",
        message: colorize(message, "dim"),
        prefix: "",
      },
    ]);
  }

  async run() {
    this.showBanner();

    while (true) {
      const selectedDirectory = await this.showMainMenu();

      if (selectedDirectory === "exit") {
        console.log(
          colorize(
            "\n👋 Thank you for using Salesforce Test Runner CLI!",
            "green"
          )
        );
        console.log(colorize("🚀 Happy Testing!", "cyan"));
        process.exit(0);
      }

      // Check if directory has tests
      if (
        selectedDirectory.name !== "All Tests" &&
        this.getFeatureFiles(selectedDirectory.path).length === 0
      ) {
        console.log(
          colorize(
            `\n❌ No test files found in ${selectedDirectory.name}!`,
            "red"
          )
        );
        await this.confirmContinue();
        continue;
      }

      while (true) {
        console.clear();
        console.log(createBanner());
        console.log(
          colorize(
            `\n📁 Selected Directory: ${selectedDirectory.icon} ${selectedDirectory.name}`,
            "bright"
          )
        );
        console.log(colorize(`📝 ${selectedDirectory.description}`, "dim"));

        const runChoice = await this.showRunOptions(selectedDirectory);

        if (runChoice === "back") {
          break; // Back to main menu
        }

        // Handle specific test file selection
        if (["test-specific", "test-specific-headed"].includes(runChoice)) {
          const selectedFile = await this.selectSpecificTestFile(
            selectedDirectory
          );
          if (selectedFile) {
            // Get reporting preference BEFORE running tests
            const reportChoice = await this.showReportOptions(
              `${selectedDirectory.name} - ${path.basename(selectedFile)}`
            );
            // Now run the test with the reporting preference
            await this.runTestsWithReporting(
              selectedDirectory,
              runChoice,
              selectedFile,
              reportChoice
            );
            await this.confirmContinue("\nPress Enter to continue...");
            break;
          } else {
            continue; // Go back to run options if no file selected
          }
        }

        // Handle all tests in directory
        if (["test-all", "test-all-headed"].includes(runChoice)) {
          // Get reporting preference BEFORE running tests
          const reportChoice = await this.showReportOptions(
            selectedDirectory.name
          );
          // Now run the tests with the reporting preference
          await this.runTestsWithReporting(
            selectedDirectory,
            runChoice,
            null,
            reportChoice
          );
          await this.confirmContinue("\nPress Enter to continue...");
          break;
        } else if (runChoice === "ui-mode") {
          await this.runTests(selectedDirectory, runChoice);
          await this.confirmContinue("\nPress Enter to continue...");
          break;
        } else if (runChoice === "view-reports") {
          await this.viewExistingReports();
          await this.confirmContinue("\nPress Enter to continue...");
        }
      }
    }
  }
}

// Run the CLI
if (require.main === module) {
  const runner = new TestRunner();
  runner.run().catch(console.error);
}

module.exports = TestRunner;
