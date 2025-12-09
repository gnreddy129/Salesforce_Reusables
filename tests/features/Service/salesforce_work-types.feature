@mode:serial
Feature: Salesforce Work Types Management

  @worktypes @regression
  Scenario Outline: Add new work type
    Given Open a browser and login to the sales force site
    When Search for "Work Types" in app launcher
    Then Add new work type with following details
      | Work Type Name                | <WorkTypeName>               |
      | Description                   | <Description>                |
      | Operating Hours               | <OperatingHours>             |
      | Estimated Duration            | <EstimatedDuration>          |
      | Duration Type                 | <DurationType>               |
      | Block Time Before Appointment | <BlockTimeBeforeAppointment> |
      | Block Time Before Unit        | <BlockTimeBeforeUnit>        |
      | Block Time After Appointment  | <BlockTimeAfterAppointment>  |
      | Block Time After Unit         | <BlockTimeAfterUnit>         |
      | Timeframe Start               | <TimeframeStart>             |
      | Time Frame Start Unit         | <TimeFrameStartUnit>         |
      | Timeframe End                 | <TimeframeEnd>               |
      | Time Frame End Unit           | <TimeFrameEndUnit>           |
    Then Verify work type is created successfully

    Examples:
      | WorkTypeName        | Description                      | OperatingHours    | EstimatedDuration | DurationType | BlockTimeBeforeAppointment | BlockTimeBeforeUnit | BlockTimeAfterAppointment | BlockTimeAfterUnit | TimeframeStart | TimeFrameStartUnit | TimeframeEnd | TimeFrameEndUnit |
      | Field Service Visit | Standard field service work type | Operating Hours A |                60 | Minutes      |                         15 | Hour(s)             |                        30 | Hour(s)            |              1 | Hour(s)            |           24 | Hour(s)          |
