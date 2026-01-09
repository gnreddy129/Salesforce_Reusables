Feature: Campaign Management in Salesforce and adding Lead, opportunity, Contact

  @campaign_leadContact
  Scenario Outline: Create a new marketing campaign with complete details
    Given Open a browser and login to the sales force site
    When Search for "Campaigns" in app launcher
    Then Click on "New" button of "Campaigns"
    And I create a new campaign with following details:
      | Field             | Value              |
      | Campaign Name     | <campaignName>     |
      | Type              | <type>             |
      | Status            | <status>           |
      | Active            | <isActive>         |
      | Start Date        | <startDate>        |
      | Expected Revenue  | <expectedRevenue>  |
      | Budgeted Cost     | <budgetedCost>     |
      | Actual Cost       | <actualCost>       |
      | Expected Response | <expectedResponse> |
      | Description       | <description>      |
    Then I should see the campaign created successfully
      | Field         | Value          |
      | Campaign Name | <campaignName> |
    When I click new opportunities in campaign page
    Then Add opportunity with following details
      | Field       | Value           |
      | Name        | <Name>          |
      | Type        | <Type_1>        |
      | Stage       | <Stage>         |
      | Amount      | <Amount>        |
      | CloseDate   | <CloseDate>     |
      | Private     | <Private>       |
      | NextStep    | <NextStep>      |
      | Description | <Description_1> |
    When I click Add Leads in campaign page
    And Fill all fields of lead with following details:
      | Field       | Value        |
      | First Name  | <firstName>  |
      | Last Name   | <lastName>   |
      | Company     | <company>    |
      | Email       | <email>      |
      | Phone       | <phone>      |
      | Lead Status | <leadStatus> |
      | Industry    | <industry>   |
    Then Click on Next then Submit button
    Then I click Add Contacts in campaign page
    Then Fill Contacts fields with following details:
      | Field          | Value            |
      | Salutation     | <Salutation>     |
      | FirstName      | <FirstName_1>    |
      | LastName       | <LastName_1>     |
      | AccountName    | <AccountName>    |
      | Title          | <Title>          |
      | Phone          | <Phone_1>        |
      | HomePhone      | <HomePhone>      |
      | Mobile         | <Mobile>         |
      | OtherPhone     | <OtherPhone>     |
      | Fax            | <Fax>            |
      | Email          | <Email_1>        |
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
      | Description    | <Description_2>  |
    Then Click on Next then Submit button

    Examples:
      | Name             | Type_1       | Stage       | Amount | CloseDate  | Private | NextStep        | Description_1                 | Salutation | FirstName_1 | LastName_1 | AccountName | Title         | Phone_1     | HomePhone   | Mobile      | OtherPhone  | Fax         | Email_1 | Assistant    | AssistantPhone | Department | LeadSource | Birthdate  | ReportsTo     | Languages      | Level   | MailingStreet | MailingCity | MailingState | MailingZip | MailingCountry | OtherStreet | OtherCity | OtherState | OtherZip | OtherCountry | Description_2         | campaignName              | type       | status  | isActive | startDate  | expectedRevenue | budgetedCost | actualCost | expectedResponse | description |                                                                                                         | firstName | lastName | company       | email | phone      | leadStatus           | industry   | leadName   |
      | New Business Opp | New Customer | Prospecting |  50000 | 10/10/2024 | Yes     | Initial Contact | New business opportunity test | Mr.        | Jhon        | Smith      | Testing     | Sales Manager | +1234567890 | +1234567891 | +1987654321 | +1234567892 | +1234567893 |         | Mary Johnson |    +1234567894 | Sales      | Web        | 10/10/2000 | Sarah Johnson | English,French | Primary |   123 Main St | New York    |              |      10001 |                | 456 Work St | Brooklyn  |            |    10002 |              | Primary sales contact | End of Year Campaign 2025 | Conference | Planned | true     | 11/01/2025 |      10/01/2026 |        50000 |      25000 |                0 |          10 | End of year promotional campaign targeting existing customers with special holiday offers and discounts | Johnny    | Deep     | Tech Corp Ltd |       | 9876543210 | Open - Not Contacted | Technology | John Smith |
