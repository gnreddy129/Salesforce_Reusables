import { createBdd, DataTable } from 'playwright-bdd';
import SalesforceFinanceTransactionsPage from '../../pages/Finance/salesforceFinanceTransactions';

const { Given, When, Then } = createBdd();

When('Add new finance transaction with following details', async ({ page }, table: DataTable) => {
  const details = table.rowsHash();
  const finance = new SalesforceFinanceTransactionsPage(page);

  // normalize dates
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();
  const dateStr = `${mm}/${dd}/${yyyy}`;

  const data = {
    Amount: details.Amount,
    LegalEntity: details.LegalEntity,
    EventAction: details.EventAction,
    EventType: details.EventType,
    TotalAmountWithTax: details.TotalAmountWithTax,
    ChargeAmount: details.ChargeAmount,
    AdjustmentAmount: details.AdjustmentAmount,
    Subtotal: details.Subtotal,
    TaxAmount: details.TaxAmount,
    ImpactAmount: details.ImpactAmount,
    Status: details.Status,
    Account: details.Account,
    TransactionDate: details.TransactionDate === 'Today' || details.TransactionDate === 'today' ? dateStr : details.TransactionDate,
    TransactionTime: details.TransactionTime || details.StartTime,
    EffectiveDate: details.EffectiveDate === 'Today' || details.EffectiveDate === 'today' ? dateStr : details.EffectiveDate,
    EffectiveTime: details.EffectiveTime,
    ResultingBalance: details.ResultingBalance,
    FinanceSystemName: details.FinanceSystemName,
    FinanceSystemTransactionNumber: details.FinanceSystemTransactionNumber,
    FinanceSystemIntegrationMode: details.FinanceSystemIntegrationMode,
    FinanceSystemIntegrationStatus: details.FinanceSystemIntegrationStatus,
    ReferenceEntityType: details.ReferenceEntityType,
    TransactionName: details.TransactionName,
  };

  await finance.addNewFinanceTransaction(data);
});

Then('Verify finance transaction is created successfully with details', async ({ page }, table: DataTable) => {
  const details = table.rowsHash();
  const finance = new SalesforceFinanceTransactionsPage(page);
  const name = details.TransactionName || details.ShortDescription;
  await finance.verifyNewlyCreatedFinanceTransaction(name);
});