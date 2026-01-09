Feature: Create Inventory Reservations in Salesforce

  Scenario: Create a new Inventory Reservations and verify it is created
    Given Open a browser and login to the sales force site
    When Search for "Inventory Reservations" in app launcher
    Then Click on "New" button of "Inventory Reservations"
    Then Add new inventory reservations with following details
      | Field                 | Value                   |
      | ReservationIdentifier | <ReservationIdentifier> |
      | ReservationDuration   | <ReservationDuration>   |
      | ReservationDate       | <ReservationDate>       |
      | ReservationTime       | <ReservationTime>       |
      | AsyncOperation        | <AsyncOperation>        |
      | LatestOperation       | <LatestOperation>       |
    Then Verify inventory reservations is created successfully with details
      | Field                 | Value                   |
      | ReservationIdentifier | <ReservationIdentifier> |

    Examples:
      | ReservationIdentifier | ReservationDuration | ReservationDate | ReservationTime | AsyncOperation | LatestOperation |
      | Incident           |                 120 |        11/11/2023 |        10:00 AM | True          |        True |
