@mode:serial
Feature: Salesforce Individual Management

  @individuals @regression
  Scenario Outline: Add new individual records
    Given Open a browser and login to the sales force site
    When Search for "Individuals" in app launcher
    Then Click on "New" button of "Individuals"
    Then Add new individual with following details
      | Field                          | Value                       |
      | Salutation                     | <Salutation>                |
      | FirstName                      | <FirstName>                 |
      | LastName                       | <LastName>                  |
      | BirthDate                      | <BirthDate>                 |
      | Individual's Age               | <IndividualAge>             |
      | Block Geolocation Tracking     | <BlockGeolocationTracking>  |
      | Don't Process                  | <DontProcess>               |
      | Don't Profile                  | <DontProfile>               |
      | Don't Market                   | <DontMarket>                |
      | Don't Track                    | <DontTrack>                 |
      | Export Individual's Data       | <ExportIndividualData>      |
      | Forget this Individual         | <ForgetIndividual>          |
      | OK to Store PII Data Elsewhere | <OKToStorePIIDataElsewhere> |
    Then Verify individual is created successfully with details
      | Field      | Value        |
      | Salutation | <Salutation> |
      | FirstName  | <FirstName>  |
      | LastName   | <LastName>   |

    Examples:
      | Salutation | FirstName | LastName       | BirthDate  | IndividualAge | BlockGeolocationTracking | DontProcess | DontProfile | DontMarket | DontTrack | ExportIndividualData | ForgetIndividual | OKToStorePIIDataElsewhere |
      | Mr.        | John      | TestIndividual | 01/01/1990 |   13 or Older | true                     | true        | true        | true       | true      | true                 | true             | true                      |