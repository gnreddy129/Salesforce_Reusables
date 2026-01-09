Feature: Account Management in Salesforce
    As a sales user
    I want to create and manage business accounts
    So that I can track and organize customer relationships effectively

  Scenario Outline: Create a new business account with complete details
    Given Open a browser and login to the sales force site
    When Search for "Accounts" in app launcher
    Then Click on "New" button of "Accounts"
    And Fill Accounts fields with following details:
      | Field Name     | Value           |
      | Account Name   | <accountName>   |
      | Phone          | <phone>         |
      | Industry       | <industry>      |
      | Type           | <type>          |
      | Website        | <website>       |
      | Employees      | <employees>     |
      | Description    | <description>   |
      | Rating         | <rating>        |
      | Account Site   | <accountSite>   |
      | Account Number | <accountNumber> |
      | Annual Revenue | <revenue>       |
    Then I should see the account created successfully
      | Field Name   | Value         |
      | Account Name | <accountName> |

    Examples:
      | accountName             | phone    | industry   | type               | website             | employees | description                                                       | rating | accountSite  | accountNumber | revenue |
      | Tech Solutions Inc 2025 | 555-0123 | Technology | Technology Partner | www.techsol2025.com |       500 | A leading technology company specializing in enterprise solutions | Hot    | Headquarters | ACC2025       | 5000000 |