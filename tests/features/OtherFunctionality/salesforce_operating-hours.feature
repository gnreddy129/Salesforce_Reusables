@mode:serial
Feature: Salesforce Operating Hours Management

  @operatinghours @regression
  Scenario Outline: Add new operating hours
    Given Open a browser and login to the sales force site
    When Search for "Operating Hours" in app launcher
    Then Add new operating hours with following details
      | Name        | <Name>        |
      | Description | <Description> |
      | Time Zone   | <TimeZone>    |
    And I add rows to the operating hours with the following details:
      | Day    | Start Time | End Time | Work Type Group |
      | <Day1> | <StartT1>  | <EndT1>  | <WorkType1>     |
    Then Verify operating hours is created successfully

    Examples:
      | Name           | Description           | TimeZone                                                   | Day1   | StartT1 | EndT1   | WorkType1 |
      | Business Hours | Standard business hrs | (GMT+13:00) New Zealand Daylight Time (Antarctica/McMurdo) | Monday | 1:00 AM | 1:15 AM |           |
    #   | IST Hours      | India time operations | (GMT+05:30) India Standard Time (Asia/Kolkata)              | Monday | 8:00 AM  | 6:00 PM |    |
