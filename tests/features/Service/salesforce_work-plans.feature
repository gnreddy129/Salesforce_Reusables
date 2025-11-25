@mode:serial
Feature: Salesforce Work Plans Management

  @workplans @regression
  Scenario Outline: Add new work plan
    Given Open a browser and login to the sales force site
    When Search for "Work Plans" in app launcher
    Then Add new work plan with following details
      | Name             | <Name>             |
      | Execution Order  | <ExecutionOrder>   |
      | Parent Record    | <ParentRecord>     |
      | Description      | <Description>      |
    Then Verify work plan is created successfully

    Examples:
      | Name                    | ExecutionOrder | ParentRecord    | Description                                       |
      | QA Work Plan            | 1              | CHG-000000001   | Work plan for quality assurance testing activities |
    #   | Development Plan        | 2              | CHG-000000001   | Development and implementation work plan          |
    #   | Production Deployment   | 3              | CHG-000000001   | Production deployment and cutover plan            |
