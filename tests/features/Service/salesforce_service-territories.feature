@mode:serial
Feature: Salesforce Service Territories Management

  @service @regression
  Scenario Outline: Create and Manage New Service Territory with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Service Territories" in app launcher
    Then Add new Service Territory with following details
      | Field            | Value             |
      | Name             | <Name>            |
      | Parent Territory | <ParentTerritory> |
      | Operating Hours  | <OperatingHours>  |
      | Active           | <Active>          |
      | Country          | <Country>         |
      | Address          | <Address>         |
      | City             | <City>            |
      | State/Province   | <StateProvince>   |
      | Zip/Postal Code  | <ZipPostalCode>   |
      | Description      | <Description>     |
    Then Verify Service Territory is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                 | ParentTerritory     | OperatingHours   | Active | Country       | Address         | City     | StateProvince | ZipPostalCode | Description                                |
      | North Region Service | --None-- | Operating Hour A | true   | United States | 123 Main Street | New York | New York      |         10001 | Primary service territory for north region |
      # | South Region Service  | North Region    | Extended Hours    | false  | Canada        | 456 Elm Avenue        | Toronto     | Ontario       | M5V 3A8       | Secondary service territory for south region |
