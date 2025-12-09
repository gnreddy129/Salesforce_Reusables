@mode:serial
Feature: Salesforce Legal Entities Management

  @customer @regression
  Scenario Outline: Create and Manage New Legal Entity with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Legal Entities" in app launcher
    Then Add new Legal Entities with following details
      | Field             | Value         |
      | Legal Entity Name | <EntityName>  |
      | Company Name      | <CompanyName> |
      | Country           | <Country>     |
      | Street            | <Street>      |
      | City              | <City>        |
      | State             | <State>       |
      | Postal Code       | <PostalCode>  |
      | Description       | <Description> |
      | Status            | <Status>      |
    Then Verify Legal Entities are created successfully with details
      | Field             | Value        |
      | Legal Entity Name | <EntityName> |

    Examples:
      | EntityName     | CompanyName     | Country       | Street          | City     | State    | PostalCode | Description       | Status |
      | ABC Corp Legal | ABC Corporation | United States | 123 Business St | New York | New York |      10001 | Main legal entity | Active |