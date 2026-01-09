import { expect, Page, Locator, TestInfo } from "@playwright/test";

export default class Integrations {
    readonly page: Page;
    private testInfo?: TestInfo;

    readonly list: Locator;
    readonly newOpportunities: Locator;
    readonly newContacts: Locator;

    readonly newCampaignOpportunity: Locator;
    readonly addLeads: Locator;
    readonly searchLeads: Locator;
    readonly addNewLeadsLocator: Locator;
    readonly addContactsLocator: Locator;
    readonly serchContacts: Locator;
    readonly addNewContactsLocator: Locator;
    readonly nextButton: Locator;
    readonly submitButton: Locator;

    readonly newContract: Locator;
    readonly newAccount: Locator;

    readonly newServiceAppointment: Locator;
    readonly contractCombobox: Locator;
    readonly accountCombobox: Locator;

    constructor(page: Page, testInfo?: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;

        this.list = page.locator("lst-list-view-manager-header");
        this.newOpportunities = this.list.filter({ hasText: /Opportunities/i }).getByRole('button', { name: "New", exact: true });

        this.newCampaignOpportunity = this.page.getByRole('button', { name: 'New', exact: true });
        this.addLeads = this.page.getByRole('button', { name: 'Add Leads' });
        this.searchLeads = this.page.getByRole('combobox', { name: 'Search <Entity> Search <' });
        this.addNewLeadsLocator = this.page.getByRole('option', { name: "New Lead" });

        this.addContactsLocator = this.page.getByRole('button', { name: 'Add Contacts' });
        this.serchContacts = this.page.getByRole('combobox', { name: 'Search <Entity> Search <' })
        this.addNewContactsLocator = this.page.getByRole('option', { name: "New Contact" })

        this.nextButton = this.page.getByRole('button', { name: /Next/i });
        this.submitButton = this.page.getByRole('button', { name: /Submit/i });

        this.newServiceAppointment = this.list.filter({ hasText: /Service Appointments/i }).getByRole('button', { name: /New/i });

        this.contractCombobox = page.getByRole("combobox", { name: /Contract Number/i });
        this.newContract = page.getByRole("option", { name: /New Contract/i }).first();

        this.accountCombobox = page.getByRole("combobox", { name: /Account Name/i });
        this.newAccount = page.getByRole("option", { name: /New Account/i }).first();
    }

    async clickOnNewOpportunity() {
        await this.page.waitForTimeout(3000);
        await this.newOpportunities.click({ timeout: 10000 });
    }

    async clickOnNewCampaignOpportunity() {
        await this.page.waitForTimeout(3000);
        await this.newCampaignOpportunity.click({ timeout: 10000 });
    }

    async clickOnAddNewLeads() {
        await this.page.waitForTimeout(3000);
        await this.addLeads.click({ timeout: 10000 });
        await this.page.waitForTimeout(2000);
        await this.searchLeads.click({ timeout: 10000 });
        await this.page.waitForTimeout(1000);
        await this.searchLeads.click({ timeout: 10000 });
        await this.page.waitForTimeout(2000);
        await expect(this.addNewLeadsLocator).toBeVisible({ timeout: 10000 });
        await this.addNewLeadsLocator.click({ timeout: 10000 });
        await this.page.waitForTimeout(2000);
    }

    async clickOnAddNewContacts() {
        await this.page.waitForTimeout(3000);
        await this.addContactsLocator.click({ timeout: 10000 });
        await this.page.waitForTimeout(2000);
        await this.serchContacts.click({ timeout: 10000 });
        await this.page.waitForTimeout(1000);
        await this.serchContacts.click({ timeout: 10000 });
        await expect(this.addNewContactsLocator).toBeVisible({ timeout: 10000 });
        await this.addNewContactsLocator.click({ timeout: 10000 });
        await this.page.waitForTimeout(2000);
    }

    async savingCreatedleadsOrContacts() {
        await this.page.waitForTimeout(3000);
        await this.nextButton.first().click({ timeout: 10000 });
        await this.page.waitForTimeout(3000);
        await this.submitButton.first().click({ timeout: 10000 });
        console.log("Lead or Contact Adding done");
    }

    async addNewServiceAppointment() {
        await this.page.waitForTimeout(3000);
        await this.page.mouse.wheel(0, 1200);
        await this.page.waitForTimeout(3000);
        await expect(this.newServiceAppointment).toBeVisible({ timeout: 10000 });
        await this.newServiceAppointment.click({ timeout: 10000 });
    }

    async clickOnCreateNewContracts() {
        await this.page.waitForTimeout(3000);
        await this.contractCombobox.click({ timeout: 10000 });
        await this.newContract.click({ timeout: 10000 });
        await this.page.waitForTimeout(3000);
    }

    async clickOnCreateNewAccounts() {
        await this.page.waitForTimeout(3000);
        await this.accountCombobox.click({ timeout: 10000 });
        await this.newAccount.click({ timeout: 10000 });
        await this.page.waitForTimeout(3000);
    }
}
