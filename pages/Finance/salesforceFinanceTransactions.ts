import { expect, Page, Locator, TestInfo } from '@playwright/test';
import { Helper } from '../../utils/helper';

export type FinanceTransactionData = {
  TransactionName?: string;
  Amount?: string;
  EventAction: string;
  EventType: string;
  TotalAmountWithTax: string;
  ChargeAmount: string;
  AdjustmentAmount: string;
  Subtotal: string;
  TaxAmount: string;
  ImpactAmount: string;
  Status: string;
  TransactionDate?: string; // MM/DD/YYYY
  TransactionTime?: string; // e.g. 10:00 AM
  Account: string;
  ReferenceEntityType: string;
  EffectiveDate: string; // MM/DD/YYYY
  EffectiveTime: string; // e.g. 10:00 AM
  ResultingBalance?: string;
  FinanceSystemName?: string;
  FinanceSystemTransactionNumber?: string;
  FinanceSystemIntegrationMode?: string;
  FinanceSystemIntegrationStatus?: string;
};

export default class SalesforceFinanceTransactionsPage {
  readonly page: Page;
  private testInfo?: TestInfo;
  readonly listbox: Locator;

  // Controls
  readonly newButton: Locator;
  readonly dialog: Locator;
  readonly transactionNameInput: Locator;
  readonly accountCombo: Locator;
  readonly referenceEntityTypeCombo: Locator;
  readonly eventActionCombo: Locator;
  readonly eventTypeCombo: Locator;
  readonly totalAmountWithTaxInput: Locator;
  readonly resultingBalanceInput: Locator;
  readonly chargeAmountInput: Locator;
  readonly adjustmentAmountInput: Locator;
  readonly subtotalAmountInput: Locator;
  readonly taxAmountInput: Locator;
  readonly impactAmountInput: Locator;
  readonly transactionDateInput: Locator;
  readonly transactionTimeCombo: Locator;
  readonly effectiveDateInput: Locator;
  readonly effectiveTimeCombo: Locator;
  readonly financeSystemNameInput: Locator;
  readonly financeSystemTransactionNumberInput: Locator;
  readonly financeSystemIntegrationModeInput: Locator;
  readonly financeSystemIntegrationStatusCombo: Locator;
  readonly saveButton: Locator;

  readonly amountLocator: Locator;

  constructor(page: Page, testInfo?: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.listbox = page.getByRole("listbox");

    this.newButton = this.page.getByRole('button', { name: /New/i }).first();
    // the dialog/title may vary; attempt to find by role dialog with 'New' and entity text
    this.dialog = this.page.getByRole('dialog', { name: /New Finance Transaction|New/i }).first();

    // fields: use tolerant locators by label / role
    this.transactionNameInput = this.dialog.getByRole('textbox', { name: /Transaction Name|Name|Subject/i }).first();
    this.accountCombo = this.dialog.getByPlaceholder("Search Accounts...");
    this.referenceEntityTypeCombo = this.dialog.getByRole('combobox', { name: 'Reference Entity Type' });
    this.eventActionCombo = this.dialog.getByRole('combobox', { name: 'Event Action' });
    this.eventTypeCombo = this.dialog.getByRole('combobox', { name: 'Event Type' });
    this.totalAmountWithTaxInput = this.dialog.locator('input[name="TotalAmountWithTax"]'); 
    //this.totalAmountWithTaxInput = this.dialog.getByRole('spinbutton', { name: 'TotalAmountWithTax'});
    this.resultingBalanceInput = this.dialog.locator('input[name="ResultingBalance"]');
    this.chargeAmountInput = this.dialog.locator('input[name="ChargeAmount"]');
    this.adjustmentAmountInput = this.dialog.locator('input[name="AdjustmentAmount"]');
    this.subtotalAmountInput = this.dialog.locator('input[name="Subtotal"]');
    this.taxAmountInput = this.dialog.locator('input[name="TaxAmount"]');
    this.impactAmountInput = this.dialog.locator('input[name="ImpactAmount"]');
    this.financeSystemNameInput = this.dialog.locator('input[name="FinanceSystemName"]').first();
    this.financeSystemTransactionNumberInput = this.dialog.locator('input[name="FinanceSystemTransactionNumber"]').first();
    this.financeSystemIntegrationModeInput = this.dialog.locator('input[name="FinanceSystemIntegrationMode"]').first();
    this.financeSystemIntegrationStatusCombo = this.dialog.getByRole('combobox', { name: 'Finance System Integration Status' }).first(); 
    this.transactionDateInput = this.dialog.locator('input[name="TransactionDate"]').first();
    this.transactionTimeCombo = this.dialog.getByRole('combobox', { name: 'TransactionDate' }).first();
    this.effectiveDateInput = this.dialog.locator('input[name="EffectiveDate"]').first();
    this.effectiveTimeCombo = this.dialog.getByRole('combobox', { name: 'EffectiveDate' }).first();
    
    // Save button
    this.saveButton = this.dialog.getByRole('button', { name: 'Save', exact: true });

    this.amountLocator = this.page.locator('records-highlights2');
  }

  // Add a new Finance Transaction record
  async addNewFinanceTransaction(details: FinanceTransactionData) {
    await expect(this.newButton).toBeVisible({ timeout: 10000 });
    await Helper.takeScreenshotToFile(this.page, 'ft-start', this.testInfo, 'Service/finance-transactions/');

    await this.newButton.click({ timeout: 10000 });
    await this.page.waitForTimeout(600);

    // Account (combobox)
    if (details.Account) {
      //await this.selectFromList(this.accountCombo, details.Account);

      console.log("🔍 Handling Account lookup...");
      await this.accountCombo.click({ timeout: 10000 });
      await this.accountCombo.fill(details.Account, { timeout: 10000 });
      // Wait for the dropdown and select first available contact
      try {
        const contactsList = this.page.getByRole("listbox").locator("li");
        await contactsList.filter({ hasText: details.Account }).click();
        console.log("✅ Account selected");
      } catch (error) {
        console.log("No Account available or error selecting account:", error);
      }
    }

    // Reference Entity Type (required in many orgs)
    if (details.ReferenceEntityType.length > 1 && details.ReferenceEntityType !== "--None--") {
      await this.selectFromList(this.referenceEntityTypeCombo, details.ReferenceEntityType);
    }

    // Event Action (required in many orgs)
    if (details.EventAction.length > 1 && details.EventAction !== "--None--") {
      await this.selectFromList(this.eventActionCombo, details.EventAction);
    }

    // Event Type (required in many orgs)
    if (details.EventType.length > 1 && details.EventType !== "--None--") {
      await this.selectFromList(this.eventTypeCombo, details.EventType);
    }

    // Total Amount With Tax
    if (details.TotalAmountWithTax) {
      await this.totalAmountWithTaxInput.click();
      await this.totalAmountWithTaxInput.fill(details.TotalAmountWithTax);
    }

    // Resulting Balance
    if (details.ResultingBalance) {
      await this.resultingBalanceInput.click();
      await this.resultingBalanceInput.fill(details.ResultingBalance);
    }

    //Charge Amount
    if (details.ChargeAmount) {
      await this.chargeAmountInput.click();
      await this.chargeAmountInput.fill(details.ChargeAmount);
    }

    //Adjustment Amount
    if (details.AdjustmentAmount) {
      await this.adjustmentAmountInput.click();
      await this.adjustmentAmountInput.fill(details.AdjustmentAmount);
    }

    //Subtotal Amount
    if (details.Subtotal) {
      await this.subtotalAmountInput.click();
      await this.subtotalAmountInput.fill(details.Subtotal);
    }

    //Tax Amount
    if (details.TaxAmount) {
      await this.taxAmountInput.click();
      await this.taxAmountInput.fill(details.TaxAmount);
    }

    //Impact Amount
    if (details.ImpactAmount) {
      await this.impactAmountInput.click();
      await this.impactAmountInput.fill(details.ImpactAmount);
    }

    // Transaction Date/Time
    if (details.TransactionDate && await this.transactionDateInput.isVisible()) {
      await this.setDate(this.transactionDateInput, details.TransactionDate).catch(() => {});
    }
    if (details.TransactionTime && await this.transactionTimeCombo.isVisible()) {
      // time control is often a combobox
        await this.setTime(this.transactionTimeCombo, details.TransactionTime).catch(() => {});
    }

    // Effective Date/Time
    if (details.EffectiveDate.length > 1) {
      await this.setDate(this.effectiveDateInput, details.EffectiveDate).catch(() => {});
    }
    if (details.EffectiveTime.length > 1) {
      await this.setTime(this.effectiveTimeCombo, details.EffectiveTime).catch(() => {});
    }

    //Finance System Name
    if (details.FinanceSystemName && await this.financeSystemNameInput.isVisible()) {
      await this.financeSystemNameInput.fill(details.FinanceSystemName);
    }

    //Finance System Transaction Number
    if (details.FinanceSystemTransactionNumber && await this.financeSystemTransactionNumberInput.isVisible({ timeout: 10000 })) {
      await this.financeSystemTransactionNumberInput.fill(details.FinanceSystemTransactionNumber);
    }

    //Finance System Integration Mode
    if (details.FinanceSystemIntegrationMode && await this.financeSystemIntegrationModeInput.isVisible({ timeout: 10000 })) {
      await this.financeSystemIntegrationModeInput.fill(details.FinanceSystemIntegrationMode);
    }

    //Finance System Integration Status
    if (details.FinanceSystemIntegrationStatus && await this.financeSystemIntegrationStatusCombo.isVisible({ timeout: 10000 })) {
      await this.selectFromList(this.financeSystemIntegrationStatusCombo, details.FinanceSystemIntegrationStatus);
    }

    // Screenshot before save
    await Helper.takeScreenshotToFile(this.page, 'ft-filled', this.testInfo, 'Service/finance-transactions/');

    // Save the record
    await this.saveButton.click({ timeout: 10000 });
    await this.page.waitForTimeout(1000);

    // Screenshot after save
    await Helper.takeScreenshotToFile(this.page, 'ft-saved', this.testInfo, 'Service/finance-transactions/');
  }

  // Verify newly created finance transaction by name
  async verifyNewlyCreatedFinanceTransaction(name: string) {
    // If we're on the record view, assert key values
    if (await this.amountLocator.count()) {
      await expect(await expect(this.amountLocator).toBeVisible({ timeout: 10000 }));
      expect(this.amountLocator).toContainText(name);
      // try to capture a few fields if present
      await Helper.takeScreenshotToFile(this.page, 'ft-verify-record', this.testInfo, 'Service/finance-transactions/');
      return true;
    }
  }

  // Helper function to select from listbox / non-auto-complete dropdown
  private async selectFromList(combo: Locator, value: string) {
    // Helper function to handle dropdown/combobox selections
      await combo.click({ timeout: 10000 });
      await this.listbox
        .getByRole("option", { name: value })
        .first()
        .click({ timeout: 10000 });
  }

  // Helper function to select from auto-complete combo box
  private async selectFromAutoCompleteCombo(combo: Locator, value: string){
      console.log(`🔍 Handling ${value} lookup...`);
      await this.accountCombo.click({ timeout: 10000 });
      await this.accountCombo.fill(value, { timeout: 10000 });
      // Wait for the dropdown and select first available contact
      try {
        const contactsList = this.page.getByRole("listbox").locator("li");
        await contactsList.filter({ hasText: value }).click();
        console.log(`✅ ${value} combobox selected`);
      } catch (error) {
        console.log(`No ${value} available or error selecting ${value}:`, error);
      }
  }

    // Additional methods for incident management can be added here
  // Helper method to set date fields
  private async setDate(element: Locator, dateValue: string) {
    if(dateValue.toLowerCase() === 'today') {
        const now = new Date();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const yyyy = now.getFullYear();
        dateValue = `${mm}/${dd}/${yyyy}`;

        await element.first().click({ force: true });
        await element.first().fill(dateValue);
    }
    else {  
        await element.first().click({ force: true });
        await element.first().fill(dateValue);
    }
  }

  // Helper method to set time fields
  private async setTime(element: Locator, timeValue: string) {
      await this.selectFromList(element, timeValue);
  }
}