@mode:serial
Feature: Salesforce Opportunity Management

  @sales @opportunities @regression
  Scenario Outline: Create and Manage New Opportunities with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Opportunities" in app launcher
    Then Click on "New" button of "Opportunities"
    Then Add opportunity with following details
      | Field       | Value         |
      | Name        | <Name>        |
      | Type        | <Type>        |
      | Stage       | <Stage>       |
      | Amount      | <Amount>      |
      | CloseDate   | <CloseDate>   |
      | Private     | <Private>     |
      | NextStep    | <NextStep>    |
      | Description | <Description> |
    Then Verify opportunity is created successfully
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name             | Type         | Stage       | Amount | CloseDate  | Private | NextStep        | Description                   |
      | New Business Opp | New Customer | Prospecting |  50000 | 10/10/2024 | Yes     | Initial Contact | New business opportunity test |