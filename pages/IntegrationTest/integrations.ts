import { expect, Page, Locator, TestInfo } from "@playwright/test";

export default class Integrations {
    readonly page: Page;
    private testInfo?: TestInfo;

    readonly list: Locator;
    readonly newOpportunities: Locator;
    readonly newContacts: Locator;

    readonly newOrderOpportunity: Locator;
    readonly addLeads: Locator;
    readonly searchLeads: Locator;
    readonly addNewLeads: Locator;
    readonly addContacts: Locator;
    readonly serchContacts: Locator;
    readonly addNewContacts: Locator;

    readonly newContract: Locator;
    readonly newAccount: Locator;

    constructor(page: Page, testInfo?: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;

        this.list = page.locator("lst-list-view-manager-header");
        this.newOpportunities = this.list.filter({ hasText: "Opportunities" }).getByRole('button', { name: "New" });

        this.newOrderOpportunity = this.page.getByRole('button', { name: 'New', exact: true });
        this.addLeads = this.page.getByRole('button', { name: 'Add Leads' });
        this.searchLeads = this.page.getByRole('combobox', { name: 'Search <Entity> Search <' });
        this.addNewLeads = this.page.getByRole('option', { name: "New Lead" });

        this.addContacts = this.page.getByRole('button', { name: 'Add Contacts' });
        this.serchContacts = this.page.getByRole('combobox', { name: 'Search <Entity> Search <' })
        this.addNewContacts = this.page.getByRole('option', { name: "New Contact" })
    }

    async clickOnNewOpportunity() {
        await this.newOpportunities.click();
    }

    async clickOnNewOrderOpportunity() {
        await this.newOrderOpportunity.click();
    }

    async clickOnAddNewLeads() {
        await this.addLeads.click();
        await this.searchLeads.click();
        await this.searchLeads.click();
        await expect(this.addNewLeads).toBeVisible({ timeout: 10000 });
        await this.addNewLeads.click({ timeout: 10000 });
        await this.page.waitForTimeout(3000);
    }

    async clickOnAddNewContacts() {
        await this.addContacts.click();
        await this.serchContacts.click();
        await this.serchContacts.click();
        await expect(this.addNewContacts).toBeVisible({ timeout: 1000 });
        await this.addNewContacts.click();
        await this.page.waitForTimeout(3000);
    }

}