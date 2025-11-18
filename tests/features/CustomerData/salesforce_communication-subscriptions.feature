@mode:serial
Feature: Salesforce Communication Subscriptions Management

  @customer @regression
  Scenario Outline: Create and Manage New Communication Subscriptionss with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Communication Subscriptions" in app launcher
    Then Add new Communication Subscriptions with following details
      | Field | Value  |
      | Name  | <Name> |
    Then Verify Communication Subscriptions is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name               |
      | Monthly Newsletter |
      # | Product Updates    |
