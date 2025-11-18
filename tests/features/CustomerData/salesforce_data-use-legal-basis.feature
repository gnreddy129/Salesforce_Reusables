@mode:serial
Feature: Salesforce Data Use Legal Basis Management

  @customer @regression
  Scenario Outline: Create and Manage New Data Use Legal Basis with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Data Use Legal Basis" in app launcher
    Then Add new Data Use Legal Basis with following details
      | Field       | Value         |
      | Name        | <Name>        |
      | Source      | <Source>      |
      | Description | <Description> |
    Then Verify Data Use Legal Basis is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name         | Source           | Description                     |
      | GDPR Consent | Customer Website | Legal basis for GDPR compliance |
      # | Marketing Consent       | Email Subscription   | Consent for marketing communications     |
