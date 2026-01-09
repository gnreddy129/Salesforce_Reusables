@mode:serial
Feature: Salesforce Service Appointments Management

  @service-appointments @regression @comprehensive
  Scenario Outline: Create and Manage New Service Appointments with Comprehensive Data
    Given Open a browser and login to the sales force site
    When Search for "Service Appointments" in app launcher
    Then Click on "New" button of "Service Appointments"
    Then Fill Service Appointments fields with following details:
      | Field                      | Value                        |
      | Description                | <Description>                |
      | Contact                    | <Contact>                    |
      | ParentRecordType           | <ParentRecordType>           |
      | ParentRecord               | <ParentRecord>               |
      | Status                     | <Status>                     |
      | Subject                    | <Subject>                    |
      | WorkType                   | <WorkType>                   |
      | AppointmentType            | <AppointmentType>            |
      | Duration                   | <Duration>                   |
      | DurationType               | <DurationType>               |
      | AdditionalInformation      | <AdditionalInformation>      |
      | Comment                    | <Comment>                    |
      | CancellationReason         | <CancellationReason>         |
      | EarliestStartPermittedDate | <EarliestStartPermittedDate> |
      | EarliestStartPermittedTime | <EarliestStartPermittedTime> |
      | DueDate                    | <DueDate>                    |
      | DueTime                    | <DueTime>                    |
      | ArrivalWindowStartDate     | <ArrivalWindowStartDate>     |
      | ArrivalWindowStartTime     | <ArrivalWindowStartTime>     |
      | ArrivalWindowEndDate       | <ArrivalWindowEndDate>       |
      | ArrivalWindowEndTime       | <ArrivalWindowEndTime>       |
      | ScheduledStartDate         | <ScheduledStartDate>         |
      | ScheduledStartTime         | <ScheduledStartTime>         |
      | ScheduledEndDate           | <ScheduledEndDate>           |
      | ScheduledEndTime           | <ScheduledEndTime>           |
      | ActualStartDate            | <ActualStartDate>            |
      | ActualStartTime            | <ActualStartTime>            |
      | ActualEndDate              | <ActualEndDate>              |
      | ActualEndTime              | <ActualEndTime>              |
      | ActualDuration             | <ActualDuration>             |
      | Street                     | <Street>                     |
      | City                       | <City>                       |
      | ZipPostalCode              | <ZipPostalCode>              |
      | StateProvince              | <StateProvince>              |
      | Country                    | <Country>                    |
      | Phone                      | <Phone>                      |
      | Email                      | <Email>                      |
    Then Verify service appointment is created successfully with details
      | Field   | Value     |
      | Subject | <Subject> |

    Examples:
      | Description                                         | Contact  | ParentRecordType | ParentRecord | Status    | Subject                 | WorkType    | AppointmentType | Duration | DurationType | AdditionalInformation                 | Comment                   | CancellationReason | EarliestStartPermittedDate | EarliestStartPermittedTime | DueDate    | DueTime | ArrivalWindowStartDate | ArrivalWindowStartTime | ArrivalWindowEndDate | ArrivalWindowEndTime | ScheduledStartDate | ScheduledStartTime | ScheduledEndDate | ScheduledEndTime | ActualStartDate | ActualStartTime | ActualEndDate | ActualEndTime | ActualDuration | Street          | City     | ZipPostalCode | StateProvince   | Country   | Phone          | Email          |
      | Regular HVAC system maintenance for office building | John Doe | Account          | Testing      | Scheduled | HVAC System Maintenance | Work Item A |                 |      120 | Hours        | Customer requests morning appointment | Bring standard HVAC tools | xyz                |                 11/12/2025 |                    8:00 am | 11/12/2025 | 7:00 pm |             11/12/2025 |                9:00 am |           11/12/2025 |             10:00 pm |         11/12/2025 |            9:30 am |       11/12/2025 |         11:00 pm |      11/12/2025 |        11:00 pm |    11/12/2025 |      11:00 pm |              1 | 123 Main Street | New York |         10001 | South Australia | Australia | (555) 123-4567 | ance@gmail.com |
