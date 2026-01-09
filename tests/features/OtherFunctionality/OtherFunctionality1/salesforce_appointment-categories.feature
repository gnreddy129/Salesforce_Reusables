@mode:serial
Feature: Appointment Categories Management

  @appointment @regression
  Scenario Outline: Create Appointment Category
    Given Open a browser and login to the sales force site
    When Search for "Appointment Categories" in app launcher
    Then Click on "New" button of "Appointment Categories"
    Then Add new appointment category with following details
      | Field   | Value     |
      | Name    | <Name>    |
      | Regular | <Regular> |
      | DropIn  | <DropIn>  |
      | Group   | <Group>   |
    Then Verify appointment category is created successfully
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name            | Regular | DropIn | Group |
      | Test Appt Dog A | Yes     | Yes    | Yes   |
