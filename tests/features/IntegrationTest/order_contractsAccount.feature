@mode:serial
Feature: Salesforce Orders Management

  @order_contractsAccount
  Scenario Outline: Create a new order with different data sets
    Given Open a browser and login to the sales force site
    When Search for "Orders" in app launcher
    Then Click on "New" button of "Orders"
    Then Fill Orders fields with following details:
      | Field                  | Value                  |
      | Status                 | <Status>               |
      | Order Start Date       | <OrderStartDate>       |
      | Customer Authorized By | <CustomerAuthorizedBy> |
      | Company Authorized By  | <CompanyAuthorizedBy>  |
      | Shipping Street        | <ShippingStreet>       |
      | Shipping City          | <ShippingCity>         |
      | Shipping Zip           | <ShippingZip>          |
      | Shipping State         | <ShippingState>        |
      | Shipping Country       | <ShippingCountry>      |
      | Billing Street         | <BillingStreet>        |
      | Billing City           | <BillingCity>          |
      | Billing Zip            | <BillingZip>           |
      | Billing State          | <BillingState>         |
      | Billing Country        | <BillingCountry>       |
      | Description            | <Description>          |
    #   | Contract Number        | <ContractNumber>       |
    #   | Account Name           | <AccountName_0>        |
    Then Click on Add new Account in order page
    And Fill Accounts fields with following details:
      | Field Name     | Value           |
      | Account Name   | <accountName>   |
      | Phone          | <phone>         |
      | Industry       | <industry>      |
      | Type           | <type>          |
      | Website        | <website>       |
      | Employees      | <employees>     |
      | Description    | <description>   |
      | Rating         | <rating>        |
      | Account Site   | <accountSite>   |
      | Account Number | <accountNumber> |
      | Annual Revenue | <revenue>       |
    Then Click on Add new Contracts in order page
    Then Add new contract with following details
      | Field                   | Value                   |
      | Status                  | <Status_1>              |
      | Contract Start Date     | <ContractStartDate>     |
      | Account Name            | <AccountName_1>         |
      | Contract Term           | <ContractTerm>          |
      | Customer Signed By      | <CustomerSignedBy>      |
      | Owner Expiration Notice | <OwnerExpirationNotice> |
      | Customer Signed Title   | <CustomerSignedTitle>   |
      | Company Signed By       | <CompanySignedBy>       |
      | Customer Signed Date    | <CustomerSignedDate>    |
      | Company Signed Date     | <CompanySignedDate>     |
      | Price Book              | <PriceBook>             |
      | Billing Street          | <BillingStreet_1>       |
      | Billing City            | <BillingCity_1>         |
      | Billing Zip             | <BillingZip_1>          |
      | Billing State           | <BillingState_1>        |
      | Billing Country         | <BillingCountry_1>      |
      | Special Terms           | <SpecialTerms>          |
      | Description             | <Description_1>         |
    Then Click on Save button of "Orders"
    Then Verify order is created successfully with details
      | Field        | Value         |
      | Account Name | <accountName> |

    Examples:
      | ContractNumber | OrderType | AccountName_0 | Status_1 | OrderStartDate | CustomerAuthorizedBy | CompanyAuthorizedBy | ShippingStreet  | ShippingCity | ShippingZip | ShippingState | ShippingCountry | BillingStreet_1 | BillingCity_1 | BillingZip_1 | BillingState_1 | BillingCountry_1 | Description_1              | Status | ContractStartDate | AccountName_1 | ContractTerm | CustomerSignedBy | OwnerExpirationNotice | CustomerSignedTitle | CompanySignedBy | CustomerSignedDate | CompanySignedDate | PriceBook | BillingStreet | BillingCity | BillingZip | BillingState | BillingCountry | SpecialTerms                  | Description             | accountName | phone    | industry   | type               | website             | employees | description                                                       | rating | accountSite  | accountNumber | revenue |
      |       00000100 | Standard  | Testing       | Draft    |     11/11/2025 |                      |                     | 123 Main Street | New York     |       10001 |               |                 |  456 Oak Avenue | Los Angeles   |        90210 |                |                  | Standard order for testing | Draft  |        11/11/2025 | Testing       |           12 |                  |               15 Days | Sales Manager       |                 |         10/12/2024 |        11/11/2025 |           |   123 Main St | New York    |      10001 |              |                | Standard contract terms apply | Annual service contract | Testing     | 555-0123 | Technology | Technology Partner | www.techsol2025.com |       500 | A leading technology company specializing in enterprise solutions | Hot    | Headquarters | ACC2025       | 5000000 |
