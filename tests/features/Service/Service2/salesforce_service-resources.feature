@mode:serial
Feature: Salesforce Service Resources Management

  @service @regression
  Scenario Outline: Create and Manage New Service Resource with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Service Resources" in app launcher
    Then Click on "New" button of "Service Resources"
    Then Add new Service Resource with following details
      | Field         | Value          |
      | Name          | <Name>         |
      | Active        | <Active>       |
      | User          | <User>         |
      | Resource Type | <ResourceType> |
      | Description   | <Description>  |
    Then Verify Service Resource is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                   | Active | User            | ResourceType | Description            |
      | Technical Support Lead | true   | Salesforce demo | Asset        | Lead technical support |
      # | Technical Support | true   | Salesforce demo | Technician   | Lead technical support agent |
