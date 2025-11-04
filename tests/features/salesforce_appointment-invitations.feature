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
      |       28/10/2025 |     28/11/2025 |        30/12/2025 | true   | Work Item A      | Service Territory A |
      |       29/11/2025 |     29/12/2025 |        30/12/2025 | false  | Work Item A      | Service Territory A |
