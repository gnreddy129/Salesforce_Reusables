@mode:serial
Feature: Salesforce Data Use Purpose Management

  @customer @regression
  Scenario Outline: Create and Manage New Data Use Purpose with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Data Use Purpose" in app launcher
    Then Click on "New" button of "Data Use Purpose"
    Then Add new Data Use Purpose with following details
      | Field                    | Value                  |
      | Name                     | <Name>                 |
      | Description              | <Description>          |
      | Legal Basis              | <LegalBasis>           |
      | Can Data Subject Opt Out | <CanDataSubjectOptOut> |
    Then Verify Data Use Purpose is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name | Description                 | LegalBasis | CanDataSubjectOptOut |
      | GDPR | Purpose for GDPR compliance | Test       | true                 |