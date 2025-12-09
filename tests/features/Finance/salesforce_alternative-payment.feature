Feature: Alternative Payment Method Management in Salesforce
    As a financial user
    I want to create and manage alternative payment methods
    So that I can track and organize payment methods effectively

  Scenario Outline: Create a new alternative payment method with complete details
    Given Open a browser and login to the sales force site
    When Search for "Alternative Payment Methods" in app launcher
    And I create a new alternative payment method with following details:
      | Field Name       | Value            |
      | Nickname         | <nickname>       |
      | Registered Email | <email>          |
      | Account          | <account>        |
      | Status           | <status>         |
      | Processing Mode  | <processingMode> |
      | Auto Pay         | <autoPay>        |
      | Company Name     | <companyName>    |
      | Street           | <street>         |
      | City             | <city>           |
      | State            | <state>          |
      | Country          | <country>        |
      | Postal Code      | <postalCode>     |
      | Comments         | <comments>       |
      | MAC Address      | <macAddress>     |
      | IP Address       | <ipAddress>      |
      | Phone            | <phone>          |
      | Audit Email      | <auditEmail>     |
    Then I should see the alternative payment method created successfully
      | Field Name | Value      |
      | Nickname   | <nickname> |

    Examples:
      | nickname            | email                | account | status | processingMode | autoPay | companyName | street      | city     | state           | country   | postalCode | comments                         | macAddress        | ipAddress     | phone      | auditEmail         |
      | Corporate Card 2025 | corp2025@example.com | Testing | Active | External       | true    | Corp Inc    | 123 Main St | New York | South Australia | Australia |      10001 | Primary corporate payment method | 00:11:22:33:44:55 | 192.168.1.100 | 2125551234 | audit1@example.com |
