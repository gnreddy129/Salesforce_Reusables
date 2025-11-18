@mode:serial
Feature: Salesforce Authorization Form Data Use Management

  @customer @regression
  Scenario Outline: Create and Manage New Authorization Form Data Use with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Authorization Form Data Use" in app launcher
    Then Add new Authorization Form Data Use with following details
      | Field              | Value               |
      | Name               | <Name>              |
      | Authorization Form | <AuthorizationForm> |
      | Data Use Purpose   | <DataUsePurpose>    |
    Then Verify Authorization Form Data Use is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name          | AuthorizationForm       | DataUsePurpose    |
      | GDPR Data Use | GDPR Authorization Form | GDPR |
      # | Marketing Data Use          | Marketing Consent Form   | Analytics Purpose   |
