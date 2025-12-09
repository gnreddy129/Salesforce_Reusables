@mode:serial
Feature: Salesforce Communication Subscription Channel Types Management

  @customerdata @communication-subscription-channel-types @regression
  Scenario Outline: Create and Manage New Communication Subscription Channel Type with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Communication Subscription Channel Types" in app launcher
    Then Add new communication subscription channel type with following details
      | Field                      | Value                        |
      | Name                       | <Name>                       |
      | Engagement Channel Type    | <Engagement Channel Type>    |
      | Communication Subscription | <Communication Subscription> |
    And Verify Communication Subscription Channel Type is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                | Engagement Channel Type | Communication Subscription |
      | Test Channel Type 1 | Testing                 | Testing                    |