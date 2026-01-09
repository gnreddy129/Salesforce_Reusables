@mode:serial
Feature: Salesforce Custom Libraries Management

  @platform @custom-libraries @regression
  Scenario Outline: Create and Manage New Custom Library with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Custom Libraries" in app launcher
    Then Click on "New" button of "Custom Libraries"
    Then Add new custom library with following details
      | Field        | Value          |
      | Name         | <Name>         |
      | Description  | <Description>  |
      | Content Type | <Content Type> |
      | Active       | <Active>       |
    And Verify Custom Library is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name           | Description              | Content Type | Active |
      | Test Library 1 | Test custom library data | String       | true   |