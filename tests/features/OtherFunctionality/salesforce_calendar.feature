Feature: Salesforce Calendar Event Creation
  As a Salesforce user
  I want to create new calendar events
  So that I can manage appointments and meetings efficiently

  @Calendar @OtherFunctionality @Smoke
  Scenario Outline: Create a new calendar event with various field combinations
    Given Open a browser and login to the sales force site
    When Search for "Calendar" in app launcher
    When Add new calendar event with the following details:
      | Field         | Value         |
      | Subject       | <Subject>     |
      | Location      | <Location>    |
      | Start Date    | <StartDate>   |
      | Start Time    | <StartTime>   |
      | End Date      | <EndDate>     |
      | End Time      | <EndTime>     |
      | Name          | <Name>        |
      | Related To    | <RelatedTo>   |
      | All-Day Event | <AllDayEvent> |
      | Description   | <Description> |
    And Verify the calendar event is created successfully with details
      | Field   | Value     |
      | Subject | <Subject> |

    Examples:
      | Subject | Location        | StartDate   | StartTime | EndDate      | EndTime  | Name     | RelatedTo | AllDayEvent | Description                 |
      | Meeting | Conference Room | Dec 3, 2025 |  10:00 AM | Dec 10, 2025 | 11:00 AM | John Doe | Testing   | false       | Weekly team standup meeting |
