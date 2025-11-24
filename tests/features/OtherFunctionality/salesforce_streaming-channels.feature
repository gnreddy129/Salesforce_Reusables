@mode:serial
Feature: Salesforce Streaming Channels Management

  @otherfunctionality @streaming-channels @regression
  Scenario Outline: Create and Manage New Streaming Channel with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Streaming Channels" in app launcher
    Then Add new streaming channel with following details
      | Field                  | Value                    |
      | Streaming Channel Name | <Streaming Channel Name> |
      | Description            | <Description>            |
    And Verify Streaming Channel is created successfully with details
      | Field                  | Value                    |
      | Streaming Channel Name | <Streaming Channel Name> |

    Examples:
      | Streaming Channel Name | Description                 |
      | /u/TestChannel1         | Test streaming channel data |
      # | Demo Channel 2         | Demo streaming channel data    |
