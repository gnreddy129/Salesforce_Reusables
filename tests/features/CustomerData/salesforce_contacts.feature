@mode:serial
Feature: Salesforce Contact Management

  @customer @contacts @regression
  Scenario Outline: Create and Manage New Contacts with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Contacts" in app launcher
    Then Click on "New" button of "Contacts"
    Then Fill Contacts fields with following details:
      | Field          | Value            |
      | Salutation     | <Salutation>     |
      | FirstName      | <FirstName>      |
      | LastName       | <LastName>       |
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
      | Salutation | FirstName | LastName | Title         | Phone       | HomePhone   | Mobile      | OtherPhone  | Fax         | Email               | Assistant    | AssistantPhone | Department | LeadSource | Birthdate  | ReportsTo     | Languages      | Level   | MailingStreet | MailingCity | MailingState    | MailingZip | MailingCountry | OtherStreet | OtherCity | OtherState | OtherZip | OtherCountry | Description           |
      | Mr.        | John      | Smith    | Sales Manager | +1234567890 | +1234567891 | +1987654321 | +1234567892 | +1234567893 | john.smith@test.com | Mary Johnson |    +1234567894 | Sales      | Web        | 10/10/2000 | Sarah Johnson | English,French | Primary |   123 Main St | New York    | South Australia |      10001 | Australia      | 456 Work St | Brooklyn  | --None--   |    10002 | Uruguay      | Primary sales contact |
