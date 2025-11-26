@mode:serial
Feature: Salesforce Work Plan Templates Management

  @workplantemplates @regression
  Scenario Outline: Add new work plan template
    Given Open a browser and login to the sales force site
    When Search for "Work Plan Templates" in app launcher
    Then Add new work plan template with following details
      | Field                    | Value                    |
      | Name                     | <Name>                   |
      | Active                   | <Active>                 |
      | Relative Execution Order | <RelativeExecutionOrder> |
      | Description              | <Description>            |
    Then Verify work plan template is created successfully

    Examples:
      | Name                    | Active | RelativeExecutionOrder | Description                                       |
      | Standard Implementation | true   |                      1 | Standard implementation template for new projects |
    #   | Agile Development Template | true   | 2                      | Agile development methodology template                |
    #   | Support Template           | false  | 3                      | Support and maintenance template (inactive)           |
