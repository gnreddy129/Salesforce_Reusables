Feature: Salesforce Work Step Templates Creation
  As a Salesforce user
  I want to create new work step templates
  So that I can define standardized workflow steps efficiently

  @WorkStepTemplates @OtherFunctionality @Smoke
  Scenario Outline: Create a new work step template with basic details
    Given Open a browser and login to the sales force site
    When Search for "Work Step Templates" in app launcher
    Then Click on "New" button of "Work Step Templates"
    When I create a new work step template with the following details:
      | Field             | Value              |
      | Name              | <Name>             |
      | Active            | <Active>           |
      | Action Definition | <ActionDefinition> |
      | Description       | <Description>      |
    And I should see the work step template creation success
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                      | Active | ActionDefinition | Description                           |
      | Test Work Step Template   | true   | Log a Call       | Automated test work step template     |
      # | Sample Work Step Template | false  | New Account      | Sample work step template for testing |
