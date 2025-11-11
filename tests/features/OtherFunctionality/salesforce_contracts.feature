@mode:serial
Feature: Salesforce Contract Management

  @contract @contracts @regression
  Scenario Outline: Create and Manage New Contracts with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Contracts" in app launcher
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
      | Status | ContractStartDate | AccountName | ContractTerm | CustomerSignedBy | OwnerExpirationNotice | CustomerSignedTitle | CompanySignedBy | CustomerSignedDate | CompanySignedDate | PriceBook | BillingStreet | BillingCity | BillingZip | BillingState | BillingCountry | SpecialTerms                  | Description             |
      | Draft  |        15/12/2024 | Testing     |           12 | --None--         |               15 Days | Sales Manager       | --None--        |         10/12/2024 |        12/12/2024 | --None--  |   123 Main St | New York    |      10001 | NY           | USA            | Standard contract terms apply | Annual service contract |
      # | Draft  |        01/01/2025 | Tech Solutions Inc 2025 |           24 | Sarah Johnson    |               30 Days | VP Sales            | Mike Brown      |         25/12/2024 |        30/12/2024 | Premium Price Book  | 456 Business Ave | Los Angeles |      90210 | CA           | USA            | Premium support included      | Two-year enterprise agreement  |
