@mode:serial
Feature: Salesforce Engagement Channel Types Management

  @marketing @engagement-channel-types @regression
  Scenario Outline: Create and Manage New Engagement Channel Type with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Engagement Channel Types" in app launcher
    Then Add new engagement channel type with following details
      | Field              | Value                |
      | Name               | <Name>               |
      | Contact Point Type | <Contact Point Type> |
      | Active             | <Active>             |
      | Usage Type         | <Usage Type>         |
    And Verify Engagement Channel Type is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name           | Contact Point Type | Active | Usage Type           |
      | Test Channel 1 | Person              | true   | Salesforce Scheduler |
      # | Demo Channel 2  | SMS                | false  | Salesforce Scheduler  |
