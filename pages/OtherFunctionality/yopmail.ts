import { expect, type Locator, type Page, TestInfo } from "@playwright/test";
import { Helper } from "../../utils/helper";

/**
 * YopmailLocators - Handles email verification and two-factor authentication workflows
 *
 * This page object manages interactions with Yopmail temporary email service for:
 * - Email inbox access and management
 * - Verification code extraction from emails
 * - Two-factor authentication support for Salesforce
 *
 * Provides robust iframe handling and email parsing capabilities for test automation.
 */
export default class YopmailPage {
  readonly page: Page;
  readonly testInfo?: TestInfo;
  readonly emailInput: Locator;
  readonly checkInboxButton: Locator;
  readonly refreshButton: Locator;
  readonly latestEmail: Locator;
  readonly verificationCode: Locator;
  private readonly iframeInbox: any;
  private readonly iframeContent: any;

  /**
   * Constructor - Initializes the YopmailLocators page object with email verification elements
   *
   * Sets up locators for Yopmail email service interaction including:
   * - Email input and inbox access controls
   * - Iframe handling for email content
   * - Verification code extraction elements
   *
   * @param page - Playwright Page instance for browser automation
   * @param testInfo - Optional TestInfo for attaching screenshots to test reports
   */
  constructor(page: Page, testInfo?: TestInfo) {
    console.log("🚀 Initializing YopmailLocators page object");
    this.page = page;
    this.testInfo = testInfo;

    // Main Page Locators
    this.emailInput = page.locator("#login");
    this.checkInboxButton = page.locator(
      'button[title="Check Inbox @yopmail.com"]'
    );

    // Iframe Locators
    this.iframeInbox = page.frameLocator("#ifinbox");
    this.iframeContent = page.frameLocator("#ifmail");

    // Email List Locators
    this.refreshButton = page.locator("#refresh");
    this.latestEmail = this.iframeInbox.locator("button[class='lm']").first();

    // Verification Code Locator - adjust the selector based on the actual email content
    this.verificationCode = this.iframeContent.locator("text=/\\d{6}/");

    console.log(
      "✅ YopmailLocators page object initialized successfully with all locators"
    );
  }

  /**
   * Navigates to Yopmail temporary email service
   *
   * Opens the Yopmail homepage and prepares for email access.
   * Takes initial screenshot for documentation purposes.
   */
  async navigateToYopmail() {
    console.log("🔄 Navigating to Yopmail service...");

    await this.page.goto("https://yopmail.com/");
    console.log("✅ Successfully navigated to Yopmail");
    await Helper.takeScreenshotToFile(
      this.page,
      "yopmail/1-start-case.png",
      this.testInfo
    );
  }

  /**
   * Accesses email inbox for specified email address
   *
   * Enters the email address and accesses the inbox to check for new messages.
   * Includes automatic inbox refresh to ensure latest emails are loaded.
   *
   * @param email - Email address to check (without @yopmail.com domain)
   */
  async checkEmail(email: string) {
    console.log(`🔄 Checking email inbox for: ${email}`);

    await this.emailInput.fill(email, { timeout: 10000 });
    await expect(this.checkInboxButton).toBeVisible({ timeout: 10000 });
    await this.checkInboxButton.click({ timeout: 10000 });
    await expect(this.refreshButton).toBeVisible({ timeout: 10000 });
    await this.page.waitForTimeout(3000);
    await this.refreshInbox();

    await Helper.takeScreenshotToFile(
      this.page,
      "yopmail/2-end-case.png",
      this.testInfo
    );
    console.log("✅ Email inbox accessed successfully");
  }

  /**
   * Extracts verification code from the latest email
   *
   * Accesses the most recent email in the inbox and extracts a 6-digit verification code.
   * Handles iframe navigation and provides robust error handling for code extraction.
   *
   * @returns Promise<string> - The 6-digit verification code
   * @throws Error when verification code is not found or email access fails
   */
  async getVerificationCode(): Promise<string> {
    console.log("🔄 Extracting verification code from email...");

    try {
      // Wait for the inbox to load and click the latest email
      await this.latestEmail.waitFor({ state: "visible", timeout: 10000 });
      await this.latestEmail.click({ timeout: 10000 });

      // Wait for the email content to load and get the verification code
      await this.verificationCode.waitFor({ state: "visible", timeout: 10000 });
      const codeText = await this.verificationCode.textContent();

      // Extract just the 6-digit code using regex
      const match = codeText?.match(/\d{6}/);
      if (!match) {
        throw new Error("Verification code not found in email");
      }

      await Helper.takeScreenshotToFile(
        this.page,
        "yopmail/3-verification.png",
        this.testInfo
      );
      console.log(`🎉 Verification code extracted successfully: ${match[0]}`);

      return match[0];
    } catch (error) {
      console.error("❌ Error getting verification code:", error);
      throw error;
    }
  }

  /**
   * Refreshes the email inbox to load new messages
   *
   * Clicks the refresh button and waits for the inbox to update with latest emails.
   */
  async refreshInbox() {
    console.log("🔄 Refreshing email inbox...");
    await this.refreshButton.click({ timeout: 10000 });
    // Wait for the refresh to complete
    await this.page.waitForTimeout(2000);
    console.log("✅ Inbox refreshed successfully");
  }
}
