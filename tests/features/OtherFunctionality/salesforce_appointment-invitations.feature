@mode:serial
Feature: Appointment Invitations

  @appointment @regression
  Scenario Outline: Create an appointment invitation
    Given Open a browser and login to the sales force site
    When Search for "Appointment Invitations" in app launcher
    Then Add new appointment invitation with following details
      | Field             | Value               |
      | BookingStartDate  | <BookingStartDate>  |
      | BookingEndDate    | <BookingEndDate>    |
      | URLExpirationDate | <URLExpirationDate> |
      | Active            | <Active>            |
      | AppointmentTopic  | <AppointmentTopic>  |
      | ServiceTerritory  | <ServiceTerritory>  |
    Then Verify appointment invitation is created successfully with details
      | Field            | Value              |
      | BookingStartDate | <BookingStartDate> |

    Examples:
      | BookingStartDate | BookingEndDate | URLExpirationDate | Active | AppointmentTopic | ServiceTerritory    |
      |       10/10/2025 |     11/11/2025 |        11/12/2025 | true   | Work Item A      | Service Territory A |