Feature: Finance Transactions

  Scenario Outline: Create a new Finance Transaction and verify it is created
    Given Open a browser and login to the sales force site
    When Search for "Finance Transactions" in app launcher
    Then Click on "New" button of "Finance Transactions"
    Then Add new finance transaction with following details
      | Field                          | Value                            |
      | Account                        | <Account>                        |
      | LegalEntity                    | <LegalEntity>                    |
      | ReferenceEntityType            | <ReferenceEntityType>            |
      | EventAction                    | <EventAction>                    |
      | EventType                      | <EventType>                      |
      | TotalAmountWithTax             | <TotalAmountWithTax>             |
      | ResultingBalance               | <ResultingBalance>               |
      | ChargeAmount                   | <ChargeAmount>                   |
      | AdjustmentAmount               | <AdjustmentAmount>               |
      | Subtotal                       | <Subtotal>                       |
      | TaxAmount                      | <TaxAmount>                      |
      | ImpactAmount                   | <ImpactAmount>                   |
      | Status                         | <Status>                         |
      | TransactionDate                | <TransactionDate>                |
      | TransactionTime                | <TransactionTime>                |
      | EffectiveDate                  | <EffectiveDate>                  |
      | EffectiveTime                  | <EffectiveTime>                  |
      | ResultingBalance               | <ResultingBalance>               |
      | FinanceSystemName              | <FinanceSystemName>              |
      | FinanceSystemTransactionNumber | <FinanceSystemTransactionNumber> |
      | FinanceSystemIntegrationMode   | <FinanceSystemIntegrationMode>   |
      | FinanceSystemIntegrationStatus | <FinanceSystemIntegrationStatus> |
    Then Verify finance transaction is created successfully with details
      | Field               | Value                 |
      | ReferenceEntityType | <ReferenceEntityType> |

    Examples:
      | Account                             | LegalEntity | ReferenceEntityType | EventAction     | EventType | TotalAmountWithTax | ResultingBalance | ChargeAmount | AdjustmentAmount | Subtotal | TaxAmount | ImpactAmount | Status | TransactionDate | TransactionTime | EffectiveDate | EffectiveTime | ResultingBalance | FinanceSystemName | FinanceSystemTransactionNumber | FinanceSystemIntegrationMode | FinanceSystemIntegrationStatus |
      | Burlington Textiles Corp of America | LE001       | Invoice Line tax    | Post an invoice | Other     |               1001 |               10 |            2 |                2 |    10015 |        11 |            5 | New    |      11/12/2024 |        10:00 AM |    10/12/2024 |      10:00 AM |                0 | AdminSystem       | FS0000001                      | FSIM00A                      | In Process                     |
