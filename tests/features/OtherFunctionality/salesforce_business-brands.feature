@mode:serial
Feature: Salesforce Business Brands Management

  @business-brands @regression
  Scenario Outline: Add new business brand
    Given Open a browser and login to the sales force site
    When Search for "Business Brands" in app launcher
    Then Add new business brand with following details
      | Field  | Value    |
      | Name   | <Name>   |
      | Org Id | <OrgId>  |
      | Parent | <Parent> |
    Then Verify business brand is created successfully with details
      | Name   | <Name>  |
      | Org Id | <OrgId> |

    Examples:
      | Name          | OrgId | Parent |
      | Premium Brand | ORG1  | pk     |
      # | Budget Brand  | ORG2  | pk     |
