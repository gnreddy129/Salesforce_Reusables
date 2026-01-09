Feature: Create account module then click on first account on list and add opportunities on it.

  @Contacts-opportunities
  Scenario Outline: Create a new business account with complete details
    Given Open a browser and login to the sales force site
    When Search for "Contacts" in app launcher
    Then Click on "New" button of "Contacts"
    Then Fill Contacts fields with following details:
      | Field          | Value            |
      | Salutation     | <Salutation>     |
      | FirstName      | <FirstName>      |
      | LastName       | <LastName>       |
      | AccountName    | <AccountName>    |
      | Title          | <Title>          |
      | Phone          | <Phone>          |
      | HomePhone      | <HomePhone>      |
      | Mobile         | <Mobile>         |
      | OtherPhone     | <OtherPhone>     |
      | Fax            | <Fax>            |
      | Email          | <Email>          |
      | Assistant      | <Assistant>      |
      | AssistantPhone | <AssistantPhone> |
      | Department     | <Department>     |
      | LeadSource     | <LeadSource>     |
      | Birthdate      | <Birthdate>      |
      | ReportsTo      | <ReportsTo>      |
      | Languages      | <Languages>      |
      | Level          | <Level>          |
      | MailingStreet  | <MailingStreet>  |
      | MailingCity    | <MailingCity>    |
      | MailingState   | <MailingState>   |
      | MailingZip     | <MailingZip>     |
      | MailingCountry | <MailingCountry> |
      | OtherStreet    | <OtherStreet>    |
      | OtherCity      | <OtherCity>      |
      | OtherState     | <OtherState>     |
      | OtherZip       | <OtherZip>       |
      | OtherCountry   | <OtherCountry>   |
      | Description    | <Description>    |
    Then I click new opportunities on Contacts page
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
      | Salutation | FirstName | LastName | AccountName | Title          | Phone       | HomePhone   | Mobile      | OtherPhone  | Fax         | Email | Assistant    | AssistantPhone | Department | LeadSource | Birthdate  | ReportsTo      | Languages | Level   | MailingStreet | MailingCity | MailingState | MailingZip | MailingCountry | OtherStreet | OtherCity | OtherState | OtherZip | OtherCountry | Description           | accountName             | phone    | industry   | type               | website             | employees | description                                                       | rating | accountSite | accountNumber | revenue | Name             | Type         | Stage       | Amount | CloseDate  | Private | NextStep        | Description                   |
      | Mr.        | Jhonnny   | Smitth   | Testing     | Sales Maneager | +123r456789 | +1234456789 | +1985654321 | +1274567892 | +1234767893 |       | Mary Johtson |    +1236567894 | Salles     | Web        | 12/10/2025 | Sarah Johdnson | English   | Primary |   123 Main St | New York    |              |      10001 |                | 456 Work St | Brooklyn  |            |    10002 |              | Primary sales contact | Tech Solutions Inc 2025 | 555-0123 | Technology | Technology Partner | www.techsol2025.com |       500 | A leading technology company specializing in enterprise solutions | Hot    | Headquarter | ACC2026       |  500000 | New Business Opp | New Customer | Prospecting |  50000 | 10/10/2024 | Yes     | Initial Contact | New business opportunity test |
