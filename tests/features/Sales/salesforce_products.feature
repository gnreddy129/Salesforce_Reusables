@mode:serial
Feature: Salesforce Products Management

  @regression @products @create
  Scenario Outline: Create and Manage New Products with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Products" in app launcher
    Then Add new product with following details
      | Field               | Value                |
      | Product Name        | <ProductName>        |
      | Active              | <Active>             |
      | Product Code        | <ProductCode>        |
      | Product Family      | <ProductFamily>      |
      | Product Description | <ProductDescription> |
    Then Verify product is created successfully with details
      | Field        | Value         |
      | Product Name | <ProductName> |

    Examples:
      | ProductName      | Active | ProductCode | ProductFamily | ProductDescription                    |
      | Standard Product | true   | PROD-001    | None          | Standard hardware product for testing |
      # | Software License | true   | SOFT-002    | --None--      | Software license product              |
