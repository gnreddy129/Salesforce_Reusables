@mode:serial
Feature: Salesforce Catalogue Management

  @catalogue @regression
  Scenario Outline: Add new catalogue items
    Given Open a browser and login to the sales force site
    When Search for "Catalogs" in app launcher
    Then Add new catalog item with following details
      | Field | Value  |
      | Name  | <Name> |
    Then Verify catalog item is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name          |
      | Sample Item A |
