@mode:serial
Feature: Salesforce Authorization Form Text Management

  @customer @regression
  Scenario Outline: Create and Manage New Authorization Form Text with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Authorization Form Text" in app launcher
    Then Click on "New" button of "Authorization Form Text"
    Then Add new Authorization Form Text with following details
      | Field                       | Value                 |
      | Name                        | <Name>                |
      | Summary Auth Form Text      | <SummaryAuthFormText> |
      | Full Authorization Form Url | <FullAuthFormUrl>     |
      | Locale                      | <Locale>              |
      | Content Document            | <ContentDocument>     |
      | Authorization Form          | <AuthorizationForm>   |
    Then Verify Authorization Form Text is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name           | SummaryAuthFormText       | FullAuthFormUrl               | Locale        | ContentDocument | AuthorizationForm |
      | GDPR Auth Text | GDPR consent summary text | https://example.com/gdpr-form | Hindi (India) |                 | Testing           |