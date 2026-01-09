Feature: Salesforce Location Groups Management
  As a Salesforce administrator
  I want to create and manage Location Groups
  So that I can organize locations effectively in the system

  @mode:serial @inventory @location-groups @regression
  Scenario Outline: Create and Manage New Location Group with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Location Groups" in app launcher
    Then Click on "New" button of "Location Groups"
    And Add new Location Group with following details
      | Field                 | Value                   |
      | Location Group Number | <Location Group Number> |
      | Description           | <Description>           |
      | External Reference    | <External Reference>    |
      | Sync with OCI         | <Sync with OCI>         |
      | Enabled               | <Enabled>               |
    Then Verify Location Group is created successfully with details
      | Field                 | Value                   |
      | Location Group Number | <Location Group Number> |

    Examples:
      | Location Group Number | Description          | External Reference | Sync with OCI | Enabled |
      | LG-001                | Main Warehouse Group | EXT-WH-001         | true          | true    |
