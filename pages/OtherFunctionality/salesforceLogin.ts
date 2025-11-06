import { expect, type Locator, type Page, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";
const testData = require("../../testdata/userDetails.json");
import YopmailPage from "./yopmail";

/**
 * SalesforceLogin Page Object Model
 *
 * This class provides automation capabilities for Salesforce login functionality.
 * It handles user authentication, two-factor authentication with email verification,
 * and error validation with robust retry mechanisms.
 *
 * Features:
 * - Standard username/password login
 * - Two-factor authentication support with email verification
 * - Verification code retrieval from Yopmail
 * - Login error validation
 * - Retry mechanisms for verification code failures
 *
 * @class salesforceLoginLocators
 * @author Automation Team
 * @version 1.0
 */
export class SalesforceLoginPage {
  readonly page: Page;
  private testInfo?: TestInfo;
  // Login Form Elements
  readonly username: Locator;
  readonly password: Locator;
  readonly login_button: Locator;
  readonly verificationCodeInput: Locator;

  // Verification Elements
  readonly home_component: Locator;
  readonly errormessage: Locator;

  // Context for multi-page operations
  readonly context: any;

  /**
   * Constructor - Initializes the SalesforceLogin page object with all necessary locators
   *
   * Sets up locators for Salesforce login form elements and verification components.
   * Uses XPath selectors for reliable element targeting on the login page.
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing SalesforceLogin page object");
    this.page = page;
    this.testInfo = testInfo;
    // Login form elements using XPath for reliable targeting
    this.username = page.locator("//input[@id='username']");
    this.password = page.locator("//input[@id='password']");
    this.login_button = page.locator("//input[@id='Login']");

    // Verification and error elements
    this.errormessage = page.locator("(//*[@class='loginError'])[2]");
    this.verificationCodeInput = page.locator("#emc");

    // Context for handling multiple pages (Yopmail integration)
    this.context = page.context();

    console.log(
      "✅ SalesforceLogin page object initialized successfully with all locators"
    );
  }

  /**
   * Performs Salesforce login with username and password, handles 2FA if required
   *
   * This method handles the complete login workflow:
   * 1. Takes a start screenshot for verification
   * 2. Navigates to Salesforce login page
   * 3. Enters credentials and submits
   * 4. Handles two-factor authentication if prompted
   * 5. Takes an end screenshot for verification
   *
   * @param data_username - Salesforce username/email
   * @param data_password - Salesforce password
   *
   * @throws Will throw an error if:
   * - Login credentials are invalid
   * - Verification code retrieval fails
   * - Multiple verification attempts fail
   *
   * @example
   * await loginPage.Login("user@example.com", "password123");
   */
  async Login(data_username: string, data_password: string) {
    console.log("🔄 Starting Salesforce login process...");
    console.log(`📝 Login username: ${data_username}`);

    // Navigate to Salesforce login page and perform login
    await this.page.goto("https://login.salesforce.com/");
    // Take start screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "1-start-login",
      this.testInfo,
      "OtherFunctionality/salesforce-login/"
    );
    console.log("✅ Navigated to Salesforce login page");

    console.log("📋 Filling login credentials...");
    await this.username.fill(data_username);
    await this.password.fill(data_password);
    await this.login_button.click();
    console.log("✅ Login credentials submitted");

    // Handle verification code if prompted
    if (await this.verificationCodeInput.isVisible()) {
      console.log(
        "🔐 Two-factor authentication required - retrieving verification code..."
      );
      const verificationCode = await this.getVerificationCode(
        this.context,
        testData.user2.username
      );

      // Enter verification code in Salesforce
      const retry = await this.enterVerificationCode(verificationCode);
      if (!retry) {
        console.log("⚠️ First verification attempt failed - retrying...");
        const newVerificationCode = await this.getVerificationCode(
          this.context,
          testData.user2.username
        );
        await this.enterVerificationCode(newVerificationCode);
      }
      console.log("✅ Two-factor authentication completed");
    }

    console.log("🎉 Login process completed!");
  }

  /**
   * Enters verification code for two-factor authentication
   *
   * @param verification - The verification code to enter
   * @returns Promise<boolean> - True if successful, false if error occurred
   */
  async enterVerificationCode(verification: string) {
    console.log("🔐 Entering verification code...");
    await this.verificationCodeInput.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // Enter the verification code and submit
    await this.verificationCodeInput.fill(verification);

    // Take end screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "2-end-login",
      this.testInfo,
      "OtherFunctionality/salesforce-login/"
    );

    await this.verificationCodeInput.press("Enter");
    if (await this.page.locator("#emc-error").isVisible()) {
      console.log("❌ Verification code entry failed");
      return false;
    }
    console.log("✅ Verification code entered successfully");
    return true;
  }

  /**
   * Verifies that login error message is displayed
   *
   * @throws Will throw an assertion error if error message is not visible
   */
  async verifyError() {
    console.log("🔍 Verifying login error...");
    await expect(this.errormessage).toBeVisible({ timeout: 10000 });
    console.log("✅ Login error verified");

    // Take verification screenshot
    await Helper.takeScreenshotToFile(
      this.page,
      "3-verification-error",
      this.testInfo,
      "OtherFunctionality/salesforce-login/"
    );
  }

  /**
   * Retrieves verification code from Yopmail for two-factor authentication
   *
   * This method opens a new browser tab, navigates to Yopmail, and retrieves
   * the verification code from the latest email. Includes retry mechanism
   * for reliability.
   *
   * @param context - Browser context for creating new page
   * @param email - Email address to check for verification code
   * @returns Promise<string> - The verification code from email
   *
   * @throws Will throw an error if:
   * - Unable to access Yopmail
   * - Verification code email not found after retries
   * - Email parsing fails
   */
  async getVerificationCode(context: any, email: string): Promise<string> {
    console.log("📧 Retrieving verification code from Yopmail...");
    // Create a new page in the same context for Yopmail
    const yopmailPage = await context.newPage();
    const yopmail = new YopmailPage(yopmailPage);

    try {
      // Navigate to Yopmail and check the inbox
      await yopmail.navigateToYopmail();
      await yopmail.checkEmail(email);

      // Try to get the verification code with retries
      let verificationCode = "";
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        try {
          // Attempt to get the verification code
          verificationCode = await yopmail.getVerificationCode();
          break;
        } catch (error) {
          attempts++;
          if (attempts === maxAttempts) {
            throw new Error(
              "Failed to get verification code after multiple attempts"
            );
          }
          console.log(`⚠️ Attempt ${attempts}: Refreshing inbox...`);
          await yopmail.refreshInbox();
        }
      }

      console.log("✅ Verification code retrieved successfully");
      return verificationCode;
    } catch (error) {
      console.error("❌ Error getting verification code from Yopmail:", error);
      throw error;
    } finally {
      // Always close the Yopmail page
      await yopmailPage.close();
    }
  }
}
