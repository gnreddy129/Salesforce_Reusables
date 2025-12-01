@mode:serial
Feature: Salesforce Contact Management

  @customer @contacts @regression
  Scenario Outline: Create and Manage New Contacts with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Contacts" in app launcher
    Then Add new contact with following details
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

    Examples:
      | Salutation | FirstName | LastName | AccountName    | Title         | Phone       | HomePhone   | Mobile      | OtherPhone  | Fax         | Email               | Assistant    | AssistantPhone | Department | LeadSource    | Birthdate  | ReportsTo     | Languages      | Level     | MailingStreet | MailingCity | MailingState | MailingZip | MailingCountry | OtherStreet  | OtherCity | OtherState | OtherZip | OtherCountry | Description             |
      # | Mr.        | Kartik   | Smith    | Test Account 1 | Sales Manager | +1234567890 | +1234567891 | +1987655321 | +1234367892 | +1234787893 | john.smih@test.com | Mary Johnson |    +1234587894 | Sales      | Web           | 1985-06-15 | Sarah Johnson | English,French | Primary   |   123 Main St | New York    | NY           |      10001 | USA            |  456 Work St | Brooklyn  | NY         |    10002 | USA          | Primary sales contact   |
      | Ms.        | TEst      | Johnson  | Test Account 2 | IT Director   | +1234567895 | +1234567896 | +1987654322 | +1234567897 | +1234567898 | sarah.j@test.com    | John Davis   |    +1234567899 | IT         | Phone Inquiry | 1990-03-22 | Michael Brown | English,German | Secondary |  456 Park Ave | Los Angeles | CA           |      90001 | USA            | 789 Home Ave | Pasadena  | CA         |    90002 | USA          | Technology project lead |
      # | Dr.        | Michael   | Brown    | Test Account 3 | Tech Lead     | +1234567900 | +1234567901 | +1987654323 | +1234567902 | +1234567903 | michael.b@test.com  | Lisa Smith   |    +1234567904 | Engineering | Partner Referral   | 1982-11-30 | John Smith    | English,Spanish | Secondary | 789 Tech Blvd | San Jose    | CA           |      95001 | USA            |   321 Lab St | Mountain V | CA         |    95002 | USA          | Senior technical advisor |

