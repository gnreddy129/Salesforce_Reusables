<b>Available features:</b>
1. Web automation(Built-in)
2. API automation(Built-in)
3. Visual comparison(Built-in)
4. Support for TDD/BDD (additional capability)
5. Sample test scripts for Web, API
6. Custom utilities
7. MSTeams notification
8. Azure pipelines integration
9. **🎭 UnifiedMCPServer Integration - AI-Powered Test Generation**
   - Auto-generate Playwright test scripts from natural language
   - Interactive web automation with AI assistance
   - API testing with intelligent test suite generation
   - Combined web + API workflow automation
   - Real-time test script creation from user actions


<b>Pre-requisites:</b> 
1. NodeJS any latest version should be installed
2. Visual Studio Code any latest version should be installed

## 🤖 AI-Powered Test Generation with UnifiedMCPServer

The Automation Accelerator now includes **UnifiedMCPServer** integration for intelligent test generation and automation assistance.

### **What You Can Do:**
- 🎭 **Interactive Web Automation**: Navigate websites, fill forms, click elements with natural language
- 🌐 **Smart API Testing**: Send requests, validate responses, generate comprehensive test suites
- 📝 **Auto Test Generation**: Convert your manual actions into Playwright test scripts
- 🔄 **Combined Workflows**: Mix web interactions with API calls for end-to-end scenarios

### **Prerequisites for UnifiedMCPServer:**
1. **Node.js** (version 16 or higher) - Already installed for Playwright
2. **VS Code** with GitHub Copilot extension
3. **UnifiedMCPServer files** (provided by Automation COE):
   - `index.cjs` file
   - License key for your machine
4. **GitHub Copilot subscription** with MCP enabled

### **Setup Instructions:**

#### Step 1: Receive Required Files
You will receive:
- `index.cjs` file (place in your workspace root)
- License key (unique to your machine)

#### Step 2: Configure MCP in VS Code
1. Press `SHIFT+CTRL+P` in VS Code
2. Search and select "MCP: User Configuration"
3. Add this configuration (replace paths with your actual paths):

```json
{
  "servers": {
    "unifiedmcpserver": {
      "type": "stdio", 
      "command": "node",
      "args": [
        "C:\\Users\\YourUsername\\repo\\Automation-Accelerator-Playwright\\index.cjs",
        "--head",
        "--browser", "chromium", 
        "--licensekey", "YOUR_LICENSE_KEY_HERE"
      ]
    }
  }
}
```

#### Step 3: Start Using AI Automation
1. Open GitHub Copilot Chat in VS Code
2. Set mode to "Agent"
3. Start with natural language prompts!

### **Usage Examples:**

#### 🌐 **Web Automation Examples:**

**Simple Navigation & Screenshot:**
```
Prompt: "Use unifiedmcpserver tools and navigate to https://example.com and take a screenshot"
```

**Form Filling Workflow:**
```
Prompt: "Use unifiedmcpserver tools and:
1. Go to https://demo-site.com/contact
2. Fill name field with 'Test User'
3. Fill email field with 'test@example.com'
4. Click Submit button
5. Take screenshot of confirmation"
```

**E-commerce Testing:**
```
Prompt: "Use unifiedmcpserver tools and:
1. Navigate to online store
2. Search for 'laptop'
3. Add first result to cart
4. Proceed to checkout
5. Fill customer details
6. Generate Playwright test script from these actions"
```

#### 🔗 **API Testing Examples:**

**Simple API Test:**
```
Prompt: "Use #testAPI and send GET request to https://jsonplaceholder.typicode.com/users/1"
```

**Authentication Flow:**
```
Prompt: "Use #testAPI and send POST request to https://api.example.com/auth/login with body: {'username': 'testuser', 'password': 'password123'} and headers: {'Content-Type': 'application/json'}"
```

**API Test Suite Generation:**
```
Prompt: "After testing the API, use #generateAPIPlaywrightTest to create comprehensive test suite"
```

#### 🔄 **Combined Web + API Scenarios:**

**Order Verification Workflow:**
```
Prompt: "Use unifiedmcpserver tools and:
1. Navigate to e-commerce site
2. Complete purchase workflow
3. Note the order number
4. Use #testAPI to verify order status via backend API
5. Generate end-to-end Playwright test script"
```

**User Registration + API Validation:**
```
Prompt: "Use unifiedmcpserver tools and:
1. Fill user registration form on website
2. Submit registration
3. Use #testAPI to verify user creation in database
4. Generate comprehensive test for regression suite"
```

### **Test Script Generation:**

#### Auto-Generate from Actions:
```
Prompt: "#generatePlaywrightScript to create test script from previous actions"
```

#### Generate API Test Suites:
```
Prompt: "#generateAPIPlaywrightTest for comprehensive API testing"
Prompt: "#generateAPIPlaywrightNegative for negative scenario testing"
Prompt: "#generateAPIPlaywrightEdgeCase for edge case validation"
```

### **Integration with Existing Framework:**

The generated test scripts will:
- ✅ Follow your existing folder structure (`tests/tdd/` or `tests/features/`)
- ✅ Use your configured page objects in `pages/` folder
- ✅ Integrate with your test data in `testdata/` folder
- ✅ Work with existing CI/CD pipeline configuration
- ✅ Generate reports compatible with current reporting setup

### **Best Practices:**

#### For Web Automation:
- Always take snapshots first to understand page structure
- Use specific element descriptions for reliable interactions
- Take screenshots for documentation and debugging

#### For API Testing:
- Store and reuse tokens for authenticated endpoints
- Validate response structure, not just status codes
- Generate comprehensive test suites for better coverage

#### For Combined Workflows:
- Plan sequence: web actions first, then API validation
- Document workflows with screenshots and API responses
- Handle async operations properly

### **Troubleshooting UnifiedMCPServer:**

**Common Issues:**
1. **MCP Connection Issues**: Restart VS Code and verify configuration path
2. **Browser Not Loading**: Check Node.js version and network connectivity
3. **License Key Issues**: Verify key is correct for your machine
4. **API Requests Failing**: Check URL accessibility and authentication

**Getting Help:**
- Use `--head` mode to see browser actions in real-time
- Check browser console for errors during web automation
- Review API response details in tool output
- Generate scripts to verify automation sequences


<b>Install dependencies:</b>
1. Open the Framework folder in VSCode IDE. 

2. Open New terminal using the "Terminal" menu in VSCode IDE.

3. In the terminal window, type and enter the following command :: <b>npm install --force --legacy-peer-deps</b>

    (This will install all the required dependencies for the framework to work. Dependencies may not download if behind a proxy/firewall.)

4. In the VSCode IDE, open the file package.json and modify "Name", "Description" as per your requirement.

<b>Folder structure:</b>
<br/>

```
Framework
└───node_modules                # Default folder for dependency files
└───notify_results              # Contains Config and result files for MSTeams notification
└───pages                       # Folder to store Page object files for Application pages
└───playwright-report           # Default folder for HTML report and screenshots
└───test-results                # Default folder internally used by Playwright
└───testdata                    # Folder to store test data files
└───tests                       # Folder to store test script files
└───tests-examples              # Playwright sample script
└───utils                       # Contains helper, datagenerator, fixture files
│   package.json                # Project dependency configuration
│   playwright.config.ts        # Playwright configuration
│   README.md

```

<b>Execution:</b>
To run tests, you have multiple options:

1. **Playwright UI Mode** - Open new terminal(or use existing) and type/enter the following command :: <b>npm run open:uimode</b> 

    (This will open the Playwright UI in a new browser window. From there you can select the tests to run)

2. **Command Line** - Open new terminal(or use existing) and type/enter the following command :: 

    <b>BDD (Behavior Driven Development):</b>
    **Configuration Required:** In `playwright.config.ts`, comment out `testDir: './tests/tdd/',` and uncomment `//testDir,` (which references the BDD feature and stepdef paths)
    
    <b>npx bddgen && npx playwright test</b> 
    This will run all the feature files present under the "tests/features" folder.

    <b>TDD (Test Driven Development):</b>
    **Configuration Required:** In `playwright.config.ts`, uncomment `testDir: './tests/tdd/',` and comment out the BDD `testDir,` line
    
    <b>npx playwright test</b>
    This will run all the scripts present under the "tests" folder.

3. **🤖 AI-Generated Tests** - Use UnifiedMCPServer to create and run tests:
   ```
   # Generate tests with AI using natural language prompts in Copilot Chat, then run normally:
   npm run open:uimode  # or
   npx playwright test
   ```
    
<b>Reports:</b>
1. To open the Playwright html report, Open new terminal(or use existing) and type/enter the following command :: <b>npm run open:report</b>

    (This will open the report in a browser)
2. To open the Cucumber html report, open the report.html under the cucumber-report folder


<b>MSTeams notification:</b>
1. To notify last execution results, Open new terminal(or use existing) and type/enter the following command :: <b>npm run notify:results</b>

    (This will send a notification to configured MSTeams channel. Configuration steps are listed under notify-results folder)


<b>Further documentation:</b>
1. Playwright - https://playwright.dev/docs/intro