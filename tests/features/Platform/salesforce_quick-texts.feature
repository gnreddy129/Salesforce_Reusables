@mode:serial
Feature: Salesforce Quick Texts Management

  @service @quick-texts @regression
  Scenario Outline: Create and Manage New Quick Texts with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Quick Text" in app launcher
    Then Add new quick text with following details
      | Field                      | Value                    |
      | QuickTextName              | <QuickTextName>          |
      | Message                    | <Message>                |
      | Category                   | <Category>               |
      | RelatedTo                  | <RelatedTo>              |
      | Field                      | <Field>                  |
      | IncludeInSelectedChannels  | <IncludeInSelectedChannels> |
    Then Verify quick text is created successfully with details
      | Field          | Value          |
      | QuickTextName  | <QuickTextName> |

    Examples:
      | QuickTextName             | Message                                                                 | Category            | RelatedTo | Field                     | IncludeInSelectedChannels |
      | Order Confirmation        | Your order has been confirmed and will be shipped within 24 hours      | Greetings           | Account   | Account Description       | true                      |