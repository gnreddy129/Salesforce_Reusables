@mode:serial
Feature: Salesforce Service Contracts Management

  @service @contracts @regression
  Scenario Outline: Add new service contract
    Given Open a browser and login to the sales force site
    When Search for "Service Contracts" in app launcher
    Then Add new service contract with following details
      | Field                 | Value              |
      | Contract Name         | <ContractName>     |
      | Start Date            | <StartDate>        |
      | End Date              | <EndDate>          |
      | Term (months)         | <TermMonths>       |
      | Description           | <Description>      |
      | Special Terms         | <SpecialTerms>     |
      | Account Name          | <AccountName>      |
      | Contact Name          | <ContactName>      |
      | Shipping and Handling | <ShippingHandling> |
      | Tax                   | <Tax>              |
      | Billing Street        | <BillingStreet>    |
      | Billing City          | <BillingCity>      |
      | Billing Zip           | <BillingZip>       |
      | Billing State         | <BillingState>     |
      | Billing Country       | <BillingCountry>   |
      | Shipping Street       | <ShippingStreet>   |
      | Shipping City         | <ShippingCity>     |
      | Shipping Zip          | <ShippingZip>      |
      | Shipping State        | <ShippingState>    |
      | Shipping Country      | <ShippingCountry>  |
    Then Verify service contract is created successfully

    Examples:
      | ContractName | StartDate  | EndDate    | TermMonths | Description                      | SpecialTerms         | AccountName             | ContactName   | ShippingHandling | Tax | BillingStreet   | BillingCity | BillingZip | BillingState | BillingCountry | ShippingStreet | ShippingCity | ShippingZip | ShippingState | ShippingCountry |
      | SC-001-AUTO  | 31/12/2024 | 31/12/2025 |         12 | Automation test service contract | Standard terms apply | Tech Solutions Inc 2025 | Kartika Smith |               50 |  10 | 123 Test Street | New York    |      10001 | NY           | United States  |  456 Ship Lane | Los Angeles  |       90001 | CA            | United States   |
