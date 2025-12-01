@mode:serial
Feature: Salesforce Email Templates Management

  @platform @regression
  Scenario Outline: Create and Manage New Email Templates with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Email Templates" in app launcher
    Then Add new Email Template with following details
      | Field               | Value               |
      | Email Template Name | <EmailTemplateName> |
      | Related Entity Type | <RelatedEntityType> |
      | Description         | <Description>       |
      | Folder              | <Folder>            |
      | Letterhead          | <Letterhead>        |
      | Subject             | <Subject>           |
      | Body                | <Body>              |
    Then Verify Email Template is created successfully with details
      | Field               | Value               |
      | Email Template Name | <EmailTemplateName> |

    Examples:
      | EmailTemplateName | RelatedEntityType | Description                 | Folder                 | Letterhead | Subject    | Body                       |
      | Welcome Email     | Contact           | Welcome email for new users | Public Email Templates |            | Test Email | lorem ipsum dolor sit amet |
      # | Follow Up Email   | Account           | Follow-up email template    | Private Email Templates | --None--   | Test Email | lorem ipsum dolor sit amet, consectetur adipiscing elit. |
