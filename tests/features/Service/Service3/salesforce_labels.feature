@mode:serial
Feature: Salesforce Label Management

  @labels @regression
  Scenario Outline: Add new label
    Given Open a browser and login to the sales force site
    When Search for "Labels" in app launcher
    Then Click on "New" button of "Labels"
    Then Add new label with following details
      | Field | Value  |
      | Name  | <Name> |
    Then Verify label is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name          |
      | AutoCgLebel1  |
