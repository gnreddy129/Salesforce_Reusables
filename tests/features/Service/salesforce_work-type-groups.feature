@mode:serial
Feature: Salesforce Work Type Groups Management

  @worktypegroups @regression
  Scenario Outline: Add new work type group
    Given Open a browser and login to the sales force site
    When Search for "Work Type Groups" in app launcher
    Then Add new work type group with following details
      | Work Type Group Name | <WorkTypeGroupName> |
      | Description         | <Description>       |
      | Group Type          | <GroupType>         |
      | Active              | <Active>            |
    Then Verify work type group is created successfully

    Examples:
      | WorkTypeGroupName          | Description                                    | GroupType | Active |
      | Field Service Team         | Work type group for field service operations   | Capacity  | true   |
    #   | Technical Support Group    | Technical support team work type group         | Capacity  | true   |
    #   | Development Team           | Software development work type group           | Capacity  | false  |
