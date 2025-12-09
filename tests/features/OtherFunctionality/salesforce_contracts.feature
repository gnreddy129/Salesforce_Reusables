@mode:serial
Feature: Salesforce Contract Management

  @contract @contracts @regression
  Scenario Outline: Create and Manage New Contracts with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Contracts" in app launcher
    Then Click on "New" button of "Accounts"
    Then Add new contract with following details
      | Field                   | Value                   |
      | Status                  | <Status>                |
      | Contract Start Date     | <ContractStartDate>     |
      | Account Name            | <AccountName>           |
      | Contract Term           | <ContractTerm>          |
      | Customer Signed By      | <CustomerSignedBy>      |
      | Owner Expiration Notice | <OwnerExpirationNotice> |
      | Customer Signed Title   | <CustomerSignedTitle>   |
      | Company Signed By       | <CompanySignedBy>       |
      | Customer Signed Date    | <CustomerSignedDate>    |
      | Company Signed Date     | <CompanySignedDate>     |
      | Price Book              | <PriceBook>             |
      | Billing Street          | <BillingStreet>         |
      | Billing City            | <BillingCity>           |
      | Billing Zip             | <BillingZip>            |
      | Billing State           | <BillingState>          |
      | Billing Country         | <BillingCountry>        |
      | Special Terms           | <SpecialTerms>          |
      | Description             | <Description>           |
    Then Verify contract is created successfully with details
      | Field        | Value         |
      | Account Name | <AccountName> |

    Examples:
      | Status | ContractStartDate | AccountName | ContractTerm | CustomerSignedBy | OwnerExpirationNotice | CustomerSignedTitle | CompanySignedBy | CustomerSignedDate | CompanySignedDate | PriceBook | BillingStreet | BillingCity | BillingZip | BillingState    | BillingCountry | SpecialTerms                  | Description             |
      | Draft  |        12/12/2024 | Testing     |           12 |                  |               15 Days | Sales Manager       |                 |         10/12/2024 |        12/12/2024 |           |   123 Main St | New York    |      10001 | South Australia | Australia      | Standard contract terms apply | Annual service contract |
