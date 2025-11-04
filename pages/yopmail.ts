import { expect, type Locator, type Page } from "@playwright/test";

export class YopmailLocators {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly checkInboxButton: Locator;
  readonly refreshButton: Locator;
  readonly latestEmail: Locator;
  readonly verificationCode: Locator;
  private readonly iframeInbox: any;
  private readonly iframeContent: any;

  constructor(page: Page) {
    this.page = page;

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
  }

  async navigateToYopmail() {
    await this.page.goto("https://yopmail.com/");
  }

  async checkEmail(email: string) {
    await this.emailInput.fill(email);
    await expect(this.checkInboxButton).toBeVisible();
    await this.checkInboxButton.click();
    await expect(this.refreshButton).toBeVisible();
    await this.page.waitForTimeout(3000);
    await this.refreshInbox();
  }

  async getVerificationCode(): Promise<string> {
    try {
      // Wait for the inbox to load and click the latest email
      await this.latestEmail.waitFor({ state: "visible", timeout: 10000 });
      await this.latestEmail.click();

      // Wait for the email content to load and get the verification code
      await this.verificationCode.waitFor({ state: "visible", timeout: 10000 });
      const codeText = await this.verificationCode.textContent();

      // Extract just the 6-digit code using regex
      const match = codeText?.match(/\d{6}/);
      if (!match) {
        throw new Error("Verification code not found in email");
      }

      return match[0];
    } catch (error) {
      console.error("Error getting verification code:");
      throw error;
    }
  }

  async refreshInbox() {
    await this.refreshButton.click();
    // Wait for the refresh to complete
    await this.page.waitForTimeout(2000);
  }
}
