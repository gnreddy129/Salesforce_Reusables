Feature: Salesforce Consumption Schedule Creation
  As a Salesforce user
  I want to create new consumption schedules
  So that I can manage billing and consumption configurations efficiently

  @ConsumptionSchedule @OtherFunctionality @Smoke
  Scenario Outline: Create a new consumption schedule with various field combinations
    Given Open a browser and login to the sales force site
    When Search for "Consumption Schedules" in app launcher
    When I create a new consumption schedule with the following details:
      | Field                     | Value                     |
      | Consumption Schedule Name | <ConsumptionScheduleName> |
      | Active                    | <Active>                  |
      | Description               | <Description>             |
      | Rating Method             | <RatingMethod>            |
      | Billing Term              | <BillingTerm>             |
      | Type                      | <Type>                    |
      | Billing Term Unit         | <BillingTermUnit>         |
    And I should see the consumption schedule details
      | Field                     | Value                     |
      | Consumption Schedule Name | <ConsumptionScheduleName> |

    Examples:
      | ConsumptionScheduleName | Active | Description               | RatingMethod | BillingTerm | Type | BillingTermUnit |
      | Test Schedule 001       | false  | Automated test schedule 1 | Tier         |          12 | Slab | Month           |