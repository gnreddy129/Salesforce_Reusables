@mode:serial
Feature: Salesforce Task Management

  @tasks @regression
  Scenario Outline: Create and Manage New Tasks with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Tasks" in app launcher
    Then Add new task with following details
      | Field       | Value         |
      | Subject     | <Subject>     |
      | AssignedTo  | <AssignedTo>  |
      | RelatedTo   | <RelatedTo>   |
      | DueDate     | <DueDate>     |
      | Priority    | <Priority>    |
      | Status      | <Status>      |
      | Description | <Description> |

    Examples:
      | Subject            | AssignedTo    | RelatedTo      | DueDate    | Priority | Status      | Description                   |
      | Call     | John Smith    | Test Account 1 | 2024-12-31 | High     | Not Started | Schedule follow-up sales call |
      | Email    | Sarah Johnson | Test Account 2 | 2024-11-30 | Normal   | In Progress | Review client proposal draft  |
      | Send Letter | Michael Brown | Test Account 3 | 2024-10-31 | Low      | Completed   | Send technical documentation  |

  @tasks @smoke
  Scenario: Create Task with Minimum Required Fields
    Given Open a browser and login to the sales force site
    When Search for "tasks" in app launcher
    Then Add new task with following details
      | Field   | Value      |
      | Subject | Call |
      | DueDate | 2024-12-31 |
