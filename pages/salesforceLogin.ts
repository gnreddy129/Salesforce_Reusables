import { expect, type Locator, type Page } from "@playwright/test";
const testData = require("../testdata/userDetails.json");
import { YopmailLocators } from "./yopmail";

export class salesforceLoginLocators {
  readonly username: Locator;
  readonly password: Locator;
  readonly login_button: Locator;
  readonly home_component: Locator;
  readonly page: Page;
  readonly errormessage: Locator;
  readonly context: any;
  readonly verificationCodeInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("//input[@id='username']");
    this.password = page.locator("//input[@id='password']");
    this.login_button = page.locator("//input[@id='Login']");
    this.errormessage = page.locator("(//*[@class='loginError'])[2]");
    this.verificationCodeInput = page.locator("#emc");
    this.context = page.context();
  }

  async Login(data_username: string, data_password: string) {
    // Navigate to Salesforce login page and perform login
    await this.page.goto("https://login.salesforce.com/");
    await this.username.fill(data_username);
    await this.password.fill(data_password);
    await this.login_button.click();

    // Handle verification code if prompted
    if (await this.verificationCodeInput.isVisible()) {
      const verificationCode = await this.getVerificationCode(
        this.context,
        testData.user2.username
      );

      // Enter verification code in Salesforce
      const retry = await this.enterVerificationCode(verificationCode);
      if (!retry) {
        const newVerificationCode = await this.getVerificationCode(
          this.context,
          testData.user2.username
        );
        await this.enterVerificationCode(newVerificationCode);
      }
    }
  }

  async enterVerificationCode(verification: string) {
    await this.verificationCodeInput.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // Enter the verification code and submit
    await this.verificationCodeInput.fill(verification);
    await this.verificationCodeInput.press("Enter");
    if (await this.page.locator("#emc-error").isVisible()) {
      return false;
    }
    return true;
  }

  async verifyError() {
    await expect(this.errormessage).toBeVisible();
  }

  async getVerificationCode(context: any, email: string): Promise<string> {
    // Create a new page in the same context for Yopmail
    const yopmailPage = await context.newPage();
    const yopmail = new YopmailLocators(yopmailPage);

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
          console.log(`Attempt ${attempts}: Refreshing inbox...`);
          await yopmail.refreshInbox();
        }
      }

      return verificationCode;
    } catch (error) {
      console.error("Error getting verification code from Yopmail:", error);
      throw error;
    } finally {
      // Always close the Yopmail page
      await yopmailPage.close();
    }
  }
}
