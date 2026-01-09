@mode:serial
Feature: Salesforce Promotion Segments Management

  @promotion-segments @regression
  Scenario Outline: Add new promotion segment
    Given Open a browser and login to the sales force site
    When Search for "Promotion Segments" in app launcher
    Then Click on "New" button of "Promotion Segments"
    Then Add new promotion segment with following details
      | Field | Value  |
      | Name  | <Name> |
    Then Verify promotion segment is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                 |
      | Premium Q5 Promotion |
