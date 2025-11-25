@mode:serial
Feature: Salesforce Entitlements Management

  @entitlements @regression
  Scenario Outline: Add new entitlement with comprehensive details
    Given Open a browser and login to the sales force site
    When Search for "Entitlements" in app launcher
    Then Add new entitlement with following details
      | Entitlement Name      | <EntitlementName>     |
      | Type                  | <Type>                |
      | Start Date            | <StartDate>           |
      | Account Name          | <Account>             |
      | End Date              | <EndDate>             |
      | Service Contract      | <ServiceContract>     |
      | Business Hours        | <BusinessHours>       |
      | Asset Name            | <AssetName>           |
      | SLA Policy            | <SLAPolicy>           |
      | Per Incident          | <PerIncident>         |
      | Remaining Cases       | <RemainingCases>      |
      | Cases Per Entitlement | <CasesPerEntitlement> |
    Then Verify entitlement is created successfully
      | Entitlement Name | <EntitlementName> |
      | Type             | <Type>            |
      | Account          | <Account>         |

    Examples:
      | EntitlementName | Type        | StartDate  | Account                 | EndDate    | ServiceContract | BusinessHours | AssetName | SLAPolicy | PerIncident | RemainingCases | CasesPerEntitlement |
      | Web Support ENT | Web Support | 11/10/2025 | Tech Solutions Inc 2025 | 11/10/2025 |                 |               |           |           | true        |              5 |                  10 |
