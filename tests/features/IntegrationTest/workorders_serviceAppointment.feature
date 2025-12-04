@mode:serial
Feature: Salesforce Work Orders Management

  @workOrders_serviceAppointment
  Scenario Outline: Create and Manage New Work Orders with Comprehensive Data
    Given Open a browser and login to the sales force site
    When Search for "Work Orders" in app launcher
    Then Click on "New" button of "Work Orders"
    Then Fill Work Orders fields with following details:
      | Field           | Value             |
      | Status          | <Status>          |
      | Priority        | <Priority>        |
      | ParentWorkOrder | <ParentWorkOrder> |
      | Contact         | <Contact>         |
      | Account         | <Account>         |
      | Asset           | <Asset>           |
      | Case            | <Case>            |
      | Entitlement     | <Entitlement>     |
      | ServiceContract | <ServiceContract> |
      | Description     | <Description>     |
      | Subject         | <Subject>         |
    Then Verify work order is created successfully with details
      | Field   | Value     |
      | Account | <Account> |
    Then Click on New button of Service Appointments in work Orders page
    Then Fill Service Appointments fields with following details:
      | Field                      | Value                        |
      | Description                | <Description_1>              |
      | Contact                    | <Contact_1>                  |
      | ParentRecordType           | <ParentRecordType>           |
      | ParentRecord               | <ParentRecord>               |
      | Status                     | <Status_1>                   |
      | Subject                    | <Subject_1>                  |
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
      | Description_1                                       | Contact_1 | ParentRecordType | ParentRecord | Status_1  | Subject_1               | WorkType    | AppointmentType | Duration | DurationType | AdditionalInformation                 | Comment                   | CancellationReason | EarliestStartPermittedDate | EarliestStartPermittedTime | DueDate    | DueTime | ArrivalWindowStartDate | ArrivalWindowStartTime | ArrivalWindowEndDate | ArrivalWindowEndTime | ScheduledStartDate | ScheduledStartTime | ScheduledEndDate | ScheduledEndTime | ActualStartDate | ActualStartTime | ActualEndDate | ActualEndTime | ActualDuration | Street          | City     | ZipPostalCode | StateProvince | Country       | Phone          | Email                | Status    | Priority | ParentWorkOrder | Contact  | Account                 | Asset | Case     | Entitlement | ServiceContract | Description                                   | Subject                 |
      | Regular HVAC system maintenance for office building | John doe  |                  |              | Scheduled | HVAC System Maintenance | Work Item A |                 |      120 | Hours        | Customer requests morning appointment | Bring standard HVAC tools | xyz                |                 11/12/2025 |                    8:00 am | 11/12/2025 | 7:00 pm |             11/12/2025 |                9:00 am |           11/12/2025 |             10:00 pm |         11/12/2025 |            9:30 am |       11/12/2025 |         11:00 pm |      11/12/2025 |        11:00 pm |    11/12/2025 |      11:00 pm |              1 | 123 Main Street | New York |         10001 | New York      | United States | (555) 123-4567 | maintenance@acme.com | Completed | Medium   |        00000001 | John Doe | Tech Solutions Inc 2025 |       | 00001036 |             |                 | HVAC system maintenance required for building | HVAC System Maintenance |
