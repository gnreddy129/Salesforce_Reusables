@mode:serial
Feature: Salesforce Dashboards Management

  @dashboards @regression
  Scenario Outline: Create and Manage Dashboards with Different Components
    Given Open a browser and login to the sales force site
    When Search for "Dashboards" in app launcher
    Then Create new dashboard with following details
      | Field         | Value           |
      | DashboardName | <DashboardName> |
      | Description   | <Description>   |
      | Folder        | <Folder>        |
    And Save the dashboard
    Then Verify dashboard is created successfully

    Examples:
      | DashboardName    | Description                | Folder        |
      | Sales            | Sales performance tracking | Sales Reports |
      | Account Health   | Account status dashboard   | Accounts      |
      | Team Performance | Team metrics overview      | Team Reports  |
