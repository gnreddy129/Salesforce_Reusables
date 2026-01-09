@mode:serial
Feature: Salesforce Scorecards Management

  @otherfunctionality @scorecards @regression
  Scenario Outline: Create and Manage New Scorecard with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Scorecards" in app launcher
    Then Click on "New" button of "Scorecards"
    Then Add new scorecard with following details
      | Field       | Value         |
      | Name        | <Name>        |
      | Description | <Description> |
    And Verify Scorecard is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name             | Description                |
      | Test Scorecard 1 | Test scorecard description |
      # | Demo Scorecard 2 | Demo scorecard description |
