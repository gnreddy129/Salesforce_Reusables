@mode:serial
Feature: Salesforce Shipping Carriers Management

  @inventory @shipping-carriers @regression
  Scenario Outline: Create and Manage New Shipping Carrier with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Shipping Carriers" in app launcher
    Then Click on "New" button of "Shipping Carriers"
    Then Add new shipping carrier with following details
      | Field             | Value               |
      | Name              | <Name>              |
      | ExternalReference | <ExternalReference> |
    And Verify Shipping Carrier is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name           | ExternalReference |
      | Test Carrier 1 | EXT-001           |