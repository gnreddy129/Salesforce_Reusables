@mode:serial
Feature: Salesforce Price Books Management

  @sales @regression
  Scenario Outline: Create and Manage New Price Books with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Price Books" in app launcher
    Then Add new Price Book with following details
      | Field           | Value           |
      | Price Book Name | <PriceBookName> |
      | Active          | <Active>        |
      | Description     | <Description>   |
    Then Verify Price Book is created successfully with details
      | Field           | Value           |
      | Price Book Name | <PriceBookName> |

    Examples:
      | PriceBookName      | Active | Description                  |
      | Standard Pricebook | true   | Standard price book for test |
      # | Custom Pricebook   | false  | --None--                     |
