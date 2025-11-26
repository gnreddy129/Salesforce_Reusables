@mode:serial
Feature: Salesforce List Emails Management

  @list-emails @regression
  Scenario Outline: Send email to list
    Given Open a browser and login to the sales force site
    When Search for "List Emails" in app launcher
    Then Send email with following details
      | Field      | Value        |
      | Recipients | <Recipients> |
      | Subject    | <Subject>    |
    Then Verify email is sent successfully with details
      | Recipients | <Recipients> |
      | Subject    | <Subject>    |

    Examples:
      | Recipients      | Subject               |
      | My Unread Leads | Q4 Marketing Campaign |
      # | User Conference - Jun 17-19, 2002   | Holiday Sale Announcement |
