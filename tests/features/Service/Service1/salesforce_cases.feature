@mode:serial
Feature: Salesforce Case Management

  @service @cases @regression
  Scenario Outline: Add new case
    Given Open a browser and login to the sales force site
    When Search for "Cases" in app launcher
    Then Click on "New" button of "Cases"
    Then Add new case with following details
      | Field                | Value                  |
      | Status               | <Status>               |
      | CaseOrigin           | <CaseOrigin>           |
      | Priority             | <Priority>             |
      | Type                 | <Type>                 |
      | CaseReason           | <CaseReason>           |
      | Product              | <Product>              |
      | PotentialLiability   | <PotentialLiability>   |
      | SLA                  | <SLA>                  |
      | EngineeringReqNumber | <EngineeringReqNumber> |
      | Subject              | <Subject>              |
      | Description          | <Description>          |
      | InternalComments     | <InternalComments>     |
      | WebEmail             | <WebEmail>             |
      | WebCompany           | <WebCompany>           |
      | WebName              | <WebName>              |
      | WebPhone             | <WebPhone>             |
    Then Verify case is created successfully with details
      | Field   | Value     |
      | Subject | <Subject> |

    Examples:
      | Status | CaseOrigin | Priority | Type       | CaseReason   | Product | PotentialLiability | SLA | EngineeringReqNumber | Subject          | Description                | InternalComments    | WebEmail | WebCompany       | WebName   | WebPhone    |
      | New    | Phone      | Medium   | Mechanical | Installation | GC1040  | No                 | Yes |                12345 | AutoTest Case 01 | Created by automation test | For internal review |          | TestCompany Ltd. | Test User | +1-555-0100 |
