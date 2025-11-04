@mode:serial
Feature: Salesforce Files Management

  @files @regression
  Scenario Outline: Upload different types of files in Salesforce
    Given Open a browser and login to the sales force site
    When Search for "Files" in app launcher
    And Upload file "<FileName>" with following details
      | Field       | Value         |
      | FileName    | <FileName>    |
      | Title       | <Title>       |
      | Description | <Description> |
    Then Verify file is uploaded successfully
      | Field | Value   |
      | Title | <Title> |

    Examples:
      | FileName  | Title            | Description               |
      | doc1.pdf  | Requirements Doc | Project requirements      |
      | doc2.xlsx | Project Timeline | Project schedule          |
      | doc3.txt  | Meeting Notes    | Notes from client meeting |
