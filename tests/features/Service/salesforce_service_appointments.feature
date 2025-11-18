@mode:serial
Feature: Salesforce Service Appointments Management

  @service-appointments @regression
  Scenario Outline: Create and Manage New Service Appointments with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Service Appointments" in app launcher
    Then Add new service appointment with following details
      | Field                  | Value                   |
      | Subject                | <Subject>               |
      | Status                 | <Status>                |
      | Work Type              | <WorkType>              |
      | Parent Record          | <ParentRecord>          |
      | Account                | <Account>               |
      | Contact                | <Contact>               |
      | Service Resource       | <ServiceResource>       |
      | Service Territory      | <ServiceTerritory>      |
      | Priority               | <Priority>              |
      | Scheduled Start        | <ScheduledStart>        |
      | Scheduled End          | <ScheduledEnd>          |
      | Due Date               | <DueDate>               |
      | Duration               | <Duration>              |
      | Duration Type          | <DurationType>          |
      | Street                 | <Street>                |
      | City                   | <City>                  |
      | State                  | <State>                 |
      | Postal Code            | <PostalCode>            |
      | Country                | <Country>               |
      | Description            | <Description>           |
      | Additional Information | <AdditionalInformation> |
      | Emergency              | <Emergency>             |
    Then Verify service appointment is created successfully with details
      | Field   | Value     |
      | Subject | <Subject> |

    Examples:
      | Subject                   | Status     | WorkType     | ParentRecord | Account | Contact  | ServiceResource | ServiceTerritory | Priority | ScheduledStart      | ScheduledEnd        | DueDate    | Duration | DurationType | Street         | City        | State    | PostalCode | Country  | Description                       | AdditionalInformation          | Emergency |
      | HVAC System Maintenance   | Scheduled  | Maintenance  | --None--     | Testing | --None-- | --None--        | --None--         | Medium   | 15/11/2024 09:00 AM | 15/11/2024 11:00 AM | 15/11/2024 |        2 | Hours        |    123 Main St | New York    | NY       |      10001 | USA      | Regular HVAC system maintenance   | Customer requests morning slot | false     |
      # | Emergency Repair Service  | Dispatched | Repair       | --None--     | Testing | --None-- | --None--        | --None--         | High     | 16/11/2024 02:00 PM | 16/11/2024 05:00 PM | 16/11/2024 |        3 | Hours        |    456 Oak Ave | Los Angeles | CA       |      90210 | USA      | Emergency equipment repair needed | Urgent - equipment down        | true      |
      