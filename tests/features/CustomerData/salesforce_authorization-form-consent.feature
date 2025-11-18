@mode:serial
Feature: Salesforce Authorization Form Consent Management

  @customer @regression
  Scenario Outline: Create and Manage New Authorization Form Consent with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Authorization Form Consent" in app launcher
    Then Add new Authorization Form Consent with following details
      | Field                        | Value                       |
      | Name                         | <Name>                      |
      | Consent Giver                | <ConsentGiver>              |
      | Choose an object             | <ChooseAnObject>            |
      | Authorization Form Text      | <AuthorizationFormText>     |
      | Consent Captured Source      | <ConsentCapturedSource>     |
      | Consent Captured Source Type | <ConsentCapturedSourceType> |
      | Status                       | <Status>                    |
      | Date                         | <Date>                      |
      | Time                         | <Time>                      |
      | Content Version              | <ContentVersion>            |
    Then Verify Authorization Form Consent is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                | ConsentGiver | ChooseAnObject | AuthorizationFormText | ConsentCapturedSource | ConsentCapturedSourceType | Status | Date       | Time     | ContentVersion |
      | GDPR Consent Record | John Doe     | Contact        | GDPR Auth Text        | Website Form          | Web                       | Seen   | 11/30/2025 | 12:15 AM | --None--       |
      # | Marketing Consent    | Jane Smith      | Lead           | Marketing Auth Text   | Email Campaign        | Email                     | Signed  | 11/29/2025 | 02:15 PM | --None--       |
