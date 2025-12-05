import { type Locator, type Page, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * Mailosaur Page Object Model
 *
 * This class provides automation capabilities for Mailosaur email verification.
 * It handles navigation to Mailosaur, login, inbox checking, and OTP extraction
 * for two-factor authentication workflows.
 *
 * Features:
 * - Login to Mailosaur account
 * - Navigate to inbox
 * - Extract verification codes/OTP from emails
 * - Reset inbox functionality
 *
 * @class MailosaurPage
 * @author Automation Team
 * @version 1.0
 */
export default class MailosaurPage {
  readonly page: Page;
  private testInfo?: TestInfo;

  // Locators - declared and initialized in constructor
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly inboxButton: Locator;
  readonly resetInboxButton: Locator;
  readonly returnToInboxButton: Locator;

  /**
   * Constructor - Initializes the Mailosaur page object with all necessary locators
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing Mailosaur page object");
    this.page = page;
    this.testInfo = testInfo;

    // Declare and initialize all locators in constructor
    // Login elements - based on actual Mailosaur page structure
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Log in" });

    // Inbox elements - based on actual Mailosaur interface
    this.inboxButton = page.getByRole("link", { name: "salesforcecode" });
    this.resetInboxButton = page.getByRole("button", { name: "Empty inbox" });
    this.returnToInboxButton = page.getByRole("button", {
      name: "Return to inbox",
    });

    console.log("✅ Mailosaur page object initialized successfully");
  }

  /**
   * Navigates to Mailosaur login page
   */
  async navigateToMailosaur() {
    console.log("🌐 Navigating to Mailosaur login page...");
    await this.page.goto("https://mailosaur.com/app/sign-in");

    // Take screenshot for verification
    await Helper.takeScreenshotToFile(
      this.page,
      "mailosaur-login-page",
      this.testInfo,
      "OtherFunctionality/mailosaur/"
    );

    console.log("✅ Navigated to Mailosaur successfully");
  }

  /**
   * Logs into Mailosaur with provided credentials
   *
   * @param email - Mailosaur login email
   * @param password - Mailosaur login password
   */
  async loginToMailosaur(email: string, password: string) {
    console.log("🔐 Logging into Mailosaur...");
    console.log(`📧 Login email: ${email}`);

    try {
      // Check if already logged in by looking for inbox elements
      const inboxCheck = this.page.getByRole("link", {
        name: "salesforcecode",
      });
      await inboxCheck.waitFor({ state: "visible", timeout: 3000 });
      console.log("✅ Already logged into Mailosaur");
      return;
    } catch (error) {
      console.log("ℹ️ Not logged in, proceeding with login...");
    }

    // Fill login credentials
    await this.emailInput.fill(email);
    await this.page.getByRole("button", { name: "Continue" }).click();
    await this.passwordInput.fill(password);

    // Take screenshot before login
    await Helper.takeScreenshotToFile(
      this.page,
      "mailosaur-credentials-filled",
      this.testInfo,
      "OtherFunctionality/mailosaur/"
    );

    await this.loginButton.click();

    // Wait for redirect and dashboard to load
    await this.page.waitForTimeout(3000);

    console.log("✅ Successfully logged into Mailosaur");
  }

  /**
   * Navigates to salesforcecode inbox and checks for latest email
   */
  async navigateToInbox() {
    console.log("📬 Navigating to salesforcecode inbox...");

    // Click on the salesforcecode inbox
    await this.inboxButton.waitFor({ state: "visible", timeout: 10000 });
    await this.inboxButton.click();

    // Take screenshot of inbox
    await Helper.takeScreenshotToFile(
      this.page,
      "mailosaur-inbox",
      this.testInfo,
      "OtherFunctionality/mailosaur/"
    );

    console.log("✅ Successfully navigated to salesforcecode inbox");
  }

  /**
   * Retrieves verification code from the latest email
   *
   * @returns Promise<string> - The verification code extracted from email
   */
  async getVerificationCode(): Promise<string> {
    console.log("🔍 Looking for verification code in latest email...");

    // Click on the latest email in the inbox
    console.log("📧 Clicking on the latest email...");
    const latestEmailButton = this.page
      .getByRole("button")
      .filter({ hasText: "Verify your identity in Salesforce" })
      .first();
    await latestEmailButton.click();

    // Take screenshot of opened email
    await Helper.takeScreenshotToFile(
      this.page,
      "mailosaur-email-opened",
      this.testInfo,
      "OtherFunctionality/mailosaur/"
    );

    // Wait for email content to fully load
    await this.page.waitForTimeout(2000);

    // Get the complete text content of the email - similar to Yopmail approach
    console.log("� Getting complete email text content...");
    const emailText = (await this.page.textContent("body")) || "";

    // Print the email text to console for debugging
    console.log("📧 COMPLETE EMAIL TEXT CONTENT:");
    console.log("=".repeat(80));
    console.log(emailText);
    console.log("=".repeat(80));

    // Extract verification code using regex - following Yopmail pattern
    let verificationCode = "";

    // Use the same approach as Yopmail - get text content first, then extract with regex
    console.log("🔍 Extracting verification code using regex pattern...");

    // Look for 6-digit codes in the email text
    const codeMatches = emailText.match(/\b\d{6}\b/g);

    if (codeMatches && codeMatches.length > 0) {
      console.log(
        `� Found ${
          codeMatches.length
        } 6-digit codes in email: [${codeMatches.join(", ")}]`
      );

      // Filter out known static codes that might appear in templates
      const filteredCodes = codeMatches.filter(
        (code) =>
          code !== "004550" && // Reject the cached code
          code !== "000000" && // Reject placeholder codes
          code !== "123456" // Reject test codes
      );

      if (filteredCodes.length > 0) {
        // Use the LAST valid code (most recent)
        verificationCode = filteredCodes[filteredCodes.length - 1];
        console.log(
          `✅ Using LATEST valid verification code: ${verificationCode}`
        );
        console.log(`🔍 Filtered codes: [${filteredCodes.join(", ")}]`);
      } else {
        console.log("⚠️ All codes were filtered out as invalid");
        // If all filtered, use the last one anyway but warn
        verificationCode = codeMatches[codeMatches.length - 1];
        console.log(`⚠️ Using last code despite filter: ${verificationCode}`);
      }
    } else {
      console.log("❌ No 6-digit codes found in email text");
    }

    if (!verificationCode) {
      // Take screenshot for debugging
      await Helper.takeScreenshotToFile(
        this.page,
        "mailosaur-no-code-found",
        this.testInfo,
        "OtherFunctionality/mailosaur/"
      );
      throw new Error("❌ Could not find verification code in email");
    }

    console.log(`✅ Final verification code extracted: ${verificationCode}`);

    // Go back to inbox after getting the code
    console.log("🔙 Going back to inbox...");
    try {
      // Try to use the "Return to inbox" button first
      await this.returnToInboxButton.waitFor({
        state: "visible",
        timeout: 3000,
      });
      await this.returnToInboxButton.click();
      console.log("✅ Used 'Return to inbox' button");
    } catch (error) {
      // Fallback to browser back button
      console.log(
        "⚠️ Return to inbox button not found, using browser back button"
      );
      await this.page.goBack();
    }

    // Take screenshot of inbox after returning
    await Helper.takeScreenshotToFile(
      this.page,
      "mailosaur-returned-to-inbox",
      this.testInfo,
      "OtherFunctionality/mailosaur/"
    );

    // Empty the inbox before returning to Salesforce
    await this.resetInbox();

    return verificationCode;
  }

  /**
   * Empties the inbox after retrieving the verification code
   */
  async resetInbox() {
    console.log("🔄 Emptying inbox...");

    try {
      // Look for "Empty inbox" button
      await this.resetInboxButton.waitFor({ state: "visible", timeout: 5000 });
      await this.resetInboxButton.click();
      await this.page.getByRole("button", { name: "Delete" }).click();

      // Wait for confirmation or page update
      await this.page.waitForTimeout(2000);

      // Take screenshot after reset
      await Helper.takeScreenshotToFile(
        this.page,
        "mailosaur-inbox-emptied",
        this.testInfo,
        "OtherFunctionality/mailosaur/"
      );

      console.log("✅ Inbox emptied successfully");
    } catch (error) {
      console.log(
        "⚠️ Empty inbox button not found or not clickable, continuing..."
      );
      console.error(error);
    }
  }
}
