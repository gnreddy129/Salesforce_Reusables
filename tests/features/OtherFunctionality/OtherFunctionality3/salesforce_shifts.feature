@mode:serial
Feature: Salesforce Shifts Management

  @shifts @regression
  Scenario Outline: Add new shift
    Given Open a browser and login to the sales force site
    When Search for "Shifts" in app launcher
    Then Click on "New" button of "Shifts"
    Then Add new shift with following details
      | Start Date        | <StartDate>        |
      | Start Time        | <StartTime>        |
      | End Date          | <EndDate>          |
      | End Time          | <EndTime>          |
      | Status            | <Status>           |
      | Work Type Group   | <WorkTypeGroup>    |
      | Service Territory | <ServiceTerritory> |
      | Service Resource  | <ServiceResource>  |
      | Time Slot Type    | <TimeSlotType>     |
      | Label             | <Label>            |
    Then Verify shift is created successfully

    Examples:
      | StartDate  | StartTime | EndDate    | EndTime  | Status    | WorkTypeGroup | ServiceTerritory    | ServiceResource | TimeSlotType | Label         |
      | 10/12/2024 |  09:00 AM | 11/12/2024 | 05:00 PM | Published | Testing       | Service Territory A | testing         | Normal       | Holiday Shift |
