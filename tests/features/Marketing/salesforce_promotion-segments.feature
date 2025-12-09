@mode:serial
Feature: Salesforce Promotion Segments Management

  @promotion-segments @regression
  Scenario Outline: Add new promotion segment
    Given Open a browser and login to the sales force site
    When Search for "Promotion Segments" in app launcher
    Then Add new promotion segment with following details
      | Field | Value             |
      | Name  | <Name>            |
      | Code  | <Code>            |
      | Status | <Status>          |
    Then Verify promotion segment is created successfully with details
      | Field | Value             |
      | Name  | <Name>            |
      | Code  | <Code>            |
      | Status | <Status>          |

    Examples:
      | Name                          | Code           | Status |
      | Premium Q5 Promotion          | PREM_Q4_001    | Active |