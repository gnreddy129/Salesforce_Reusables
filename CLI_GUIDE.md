# 🚀 Salesforce Test Runner CLI - Complete Guide

## What is this?
A simple, interactive command-line tool to run your Playwright and Cucumber tests with a beautiful menu interface and advanced features for specific test execution.

## 🚀 Quick Start

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

### Start the CLI:
```bash
npm run cli
```

### What you'll see:
1. **Beautiful figlet banner** with "Salesforce Reusables" title
2. **Menu of test directories** with icons and test counts
3. **Enhanced run options** for each directory
4. **Flexible report options** after tests complete

## 🎮 Menu Navigation
- Use **↑↓ arrow keys** to navigate
- Press **Enter** to select
- Press **Ctrl+C** to exit

## 📁 Available Test Directories
- 👥 **CustomerData** - Customer and contact management tests
- 💰 **Finance** - Financial functionality tests  
- 📦 **Inventory** - Inventory management tests
- 📢 **Marketing** - Marketing feature tests
- ⚙️ **OtherFunctionality** - Miscellaneous feature tests
- 🏗️ **Platform** - Platform-level tests
- 💼 **Sales** - Sales process tests
- 🛠️ **Service** - Service functionality tests
- 🎯 **All Tests** - Run everything

## ⚡ Enhanced Run Options
When you select a directory, you'll see these powerful options:

1. **🏃 Run All Tests in Directory (Headless)** - Execute all tests in background
2. **🖥️ Run All Tests in Directory (Headed)** - Execute all tests with browser visible
3. **📄 Run Specific Test File (Headless)** - Select and run one test file in background
4. **🔍 Run Specific Test File (Headed)** - Select and run one test with browser visible
5. **🎮 Open Playwright UI Mode** - Interactive debugging mode
6. **📈 View Existing Reports** - Open previously generated reports
7. **⬅️ Back to Main Menu** - Return to directory selection

## 📄 Specific Test File Selection
When you choose "Run Specific Test File", you'll see a detailed list:

```
? 📋 SELECT TEST FILE TO RUN: (Use arrow keys)
❯ 🎯 Run All Files in CustomerData (15 files)
  🥒 salesforce_authorization-form.feature (2KB, modified: 11/25/2025)
  🥒 salesforce_contacts.feature (3KB, modified: 11/24/2025)
  🥒 salesforce_customers.feature (4KB, modified: 11/23/2025)
  🥒 salesforce_individuals.feature (2KB, modified: 11/22/2025)
  ... (and more files)
```

### File Selection Features:
- **🎯 Run All option** - Execute all files at once
- **File icons** - 🥒 for .feature files, 📜 for .js files, 📘 for .ts files
- **File size** - Helps identify complex tests
- **Modified date** - See recently updated tests
- **File count** - Total available tests

## 📊 Report Options
After tests complete, choose how to handle reports:
- **📊 Generate Simple Report Only** - Basic HTML report
- **🥒 Open Cucumber Report** - Generate and open Cucumber HTML report
- **🎭 Open Playwright Report** - Open Playwright HTML report  
- **🔄 Open Both Reports** - Open both Playwright and Cucumber reports
- **⏭️ Skip Reports** - Continue without generating reports

## 💡 Common Use Cases

### 🎯 Run All Tests Scenarios:
- **Full regression testing** of a module
- **CI/CD pipeline** execution
- **Comprehensive validation** after changes
- **Module-wide** test execution

### 📄 Specific Test Scenarios:
- **Debugging individual** test failures
- **Testing specific** functionality
- **Quick validation** of recent changes
- **Focused testing** during development

### 🎮 UI Mode Scenarios:
- **Interactive debugging** with step-by-step execution
- **Visual test exploration** with browser inspection
- **Test development** and troubleshooting

## 📊 Example Workflows

### Scenario 1: Debug Specific Test
1. Run CLI: `npm run cli`
2. Select: `👥 CustomerData`
3. Choose: `📄 Run Specific Test File (Headless)`
4. Pick: `salesforce_contacts.feature`
5. Choose: `🎭 Open Playwright Report`
6. View results in browser

### Scenario 2: Full Module Testing
1. Run CLI: `npm run cli`
2. Select: `💼 Sales`
3. Choose: `🖥️ Run All Tests in Directory (Headed)`
4. Choose: `🔄 Open Both Reports`
5. Watch tests run, reports generate, browser opens

### Scenario 3: Quick Validation
1. Run CLI: `npm run cli`
2. Select: `🎯 All Tests`
3. Choose: `🏃 Run All Tests in Directory (Headless)`
4. Choose: `⏭️ Skip Reports`
5. Get quick pass/fail status

## 🎨 Visual Feedback
- **🚀 Starting tests for:** Shows what's being executed
- **⠋ Running tests...** - Animated spinner during execution
- **✅ Tests completed successfully!** - Success indicator
- **❌ Tests failed!** - Error indicator with details
- **📊 Processing selected reporting option** - Report generation status

## 🔧 Technical Details

### Commands Generated:
- **All tests:** `npx playwright test tests/features/CustomerData`
- **Specific test:** `npx playwright test salesforce_contacts`
- **UI Mode:** `npx playwright test --ui tests/features/CustomerData`
- **Headed mode:** `npx playwright test --headed tests/features/CustomerData`

### Report Integration:
- Uses existing `npm run simple:report` command
- Opens reports via `npm run open:report` and `npm run open:reports`
- Handles errors gracefully with fallback options

## ✨ Key Benefits
- **🎯 Precision Testing** - Target exactly what you want to test
- **🚀 Efficiency** - Quick feedback loops and reduced execution time
- **📊 Better Reporting** - Focused or comprehensive reports as needed
- **🎮 Enhanced UX** - Intuitive navigation with visual indicators
- **💪 Flexibility** - Multiple execution modes (headless, headed, UI)

## 🎉 Ready to Use!
Your CLI provides complete test execution control:

✅ **Directory Selection** - Choose your test scope  
✅ **Execution Modes** - Headless, headed, or UI mode  
✅ **Specific File Targeting** - Individual test execution  
✅ **Smart File Selection** - Detailed file metadata  
✅ **Flexible Reporting** - Reports for any test scope  
✅ **Visual Feedback** - Clear progress and status indicators

**Launch and explore:**
```bash
npm run cli
```

**Experience the power of comprehensive test control! 🚀**
