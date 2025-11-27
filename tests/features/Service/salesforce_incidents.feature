Feature: Create Incident

  Scenario: Create a new Incident and verify it is created
    Given Open a browser and login to the sales force site
    When Search for "Incidents" in app launcher
    Then Add new incident with following details
      | Field            | Value              |
      | ShortDescription | <ShortDescription> |
      | Description      | <Description>      |
      | Status           | <Status>           |
      | Urgency          | <Urgency>          |
      | Impact           | <Impact>           |
      | Priority         | <Priority>         |
      | DetectedDate     | <DetectedDate>     |
      | DetectedTime     | <DetectedTime>     |
      | StartDate        | <StartDate>        |
      | StartTime        | <StartTime>        |
    Then Verify incident is created successfully with details
      | Field            | Value              |
      | ShortDescription | <ShortDescription> |

    Examples:
      | ShortDescription | Description                       | Status | Urgency | Impact | Priority | DetectedDate | DetectedTime | StartDate | StartTime |
      | Incident00A      | Incident00A: New sample incidents | New    | Medium  | Medium | Moderate | Today        |     10:00 AM | Today     |  10:00 AM |