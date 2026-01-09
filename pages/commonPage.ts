import { Page, Locator } from "playwright";
import { expect, TestInfo } from "playwright/test";
import { Helper } from "../utils/helper";
import { BasePage } from "./basePage";

export class CommonPage extends BasePage{
    // Login Form Elements
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly logoutText: Locator;
    readonly openMenuButton: Locator;
    readonly logoutButton: Locator;

    constructor(public readonly page: Page){
        super(page);
        
        // Initialize locators - Login elements
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByText("Login");
        
        // Logout elements
        this.logoutText = page.getByText("Login");
        this.openMenuButton = page.getByRole("button", { name: "Open Menu" });
        this.logoutButton = page.getByText("Logout");
    }

    async goto(url = '/'){
        await this.page.goto(url);
        return this;
    }

    async login(username, password, testInfo: TestInfo){
        await this.goto();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click({ timeout: 10000 });
        await expect(this.logoutText).not.toBeVisible();
        Helper.attachScreenshotToReport(this.page, "LoginSuccess", testInfo);
        return this;
    }

    async logout(testInfo: TestInfo){
        await this.openMenuButton.click({ timeout: 10000 });
        await this.logoutButton.click({ timeout: 10000 });
        await expect(this.logoutText).toBeVisible();
        await Helper.attachScreenshotToReport(this.page, "Logout", testInfo);
        return this;
    }
}