# @mode:serial
# Feature: Salesforce Orders Management

#   @regression @orders @create
#   Scenario Outline: Create a new order with different data sets
#     Given Open a browser and login to the sales force site
#     When Search for "Orders" in app launcher
#     Then Add new order with new Contracts and Account details
#       | Field                  | Value                  |
#       | Contract Number        | <ContractNumber>       |
#       | Order Number           | <OrderNumber>          |
#       | Account Name           | <AccountName>          |
#       | Status                 | <Status>               |
#       | Order Start Date       | <OrderStartDate>       |
#       | Customer Authorized By | <CustomerAuthorizedBy> |
#       | Company Authorized By  | <CompanyAuthorizedBy>  |
#       | Shipping Street        | <ShippingStreet>       |
#       | Shipping City          | <ShippingCity>         |
#       | Shipping Zip           | <ShippingZip>          |
#       | Shipping State         | <ShippingState>        |
#       | Shipping Country       | <ShippingCountry>      |
#       | Billing Street         | <BillingStreet>        |
#       | Billing City           | <BillingCity>          |
#       | Billing Zip            | <BillingZip>           |
#       | Billing State          | <BillingState>         |
#       | Billing Country        | <BillingCountry>       |
#       | Description            | <Description>          |
#     Then Add new Contracts in order page
#     Then Add new Account in order page
#     Then click on save in order creation page
#     Then Verify order is created successfully with details
#       | Field        | Value         |
#       | Account Name | <AccountName> |

#     Examples:
#       | ContractNumber | OrderType | AccountName | Status | OrderStartDate | CustomerAuthorizedBy | CompanyAuthorizedBy | ShippingStreet  | ShippingCity | ShippingZip | ShippingState | ShippingCountry | BillingStreet  | BillingCity | BillingZip | BillingState | BillingCountry | Description                |
#       |       00000104 | Standard  | Testing     | Draft  |     11/11/2025 | --None--             | --None--            | 123 Main Street | New York     |       10001 | NY            | United States           | 456 Oak Avenue | Los Angeles |      90210 | CA           | United States          | Standard order for testing |