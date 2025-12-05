Feature: Create account module then click on first account on list and add opportunities on it.

  @account-opportunities
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
    When I click new opportunities on Accounts page
    Then Add opportunity with following details
      | Field       | Value         |
      | Name        | <Name>        |
      | Type        | <Type>        |
      | Stage       | <Stage>       |
      | Amount      | <Amount>      |
      | CloseDate   | <CloseDate>   |
      | Private     | <Private>     |
      | NextStep    | <NextStep>    |
      | Description | <Description> |

    Examples:
      | accountName | phone    | industry   | type               | website             | employees | description                                                       | rating | accountSite  | accountNumber | revenue | Name             | Type         | Stage       | Amount | CloseDate  | Private | NextStep        | Description                   |
      | Testing     | 555-0123 | Technology | Technology Partner | www.techsol2025.com |       500 | A leading technology company specializing in enterprise solutions | Hot    | Headquarters | ACC2025       | 5000000 | New Business Opp | New Customer | Prospecting |  50000 | 10/10/2024 | Yes     | Initial Contact | New business opportunity test |
