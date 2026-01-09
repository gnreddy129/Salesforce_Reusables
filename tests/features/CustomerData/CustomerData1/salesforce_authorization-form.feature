@mode:serial
Feature: Salesforce Authorization Form Management

  @customer @regression @salesforce_authorization-form1
  Scenario Outline: Create and Manage New Authorization Form with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Authorization Form" in app launcher
    Then Click on "New" button of "Authorization Form"
    Then Add new Authorization Form with following details
      | Field                  | Value                 |
      | Name                   | <Name>                |
      | Revision Number        | <RevisionNumber>      |
      | Effective From Date    | <EffectiveFromDate>   |
      | Effective To Date      | <EffectiveToDate>     |
      | Default Auth Form Text | <DefaultAuthFormText> |
      | Is Signature Required  | <IsSignatureRequired> |
    Then Verify Authorization Form is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                    | RevisionNumber | EffectiveFromDate | EffectiveToDate | DefaultAuthFormText | IsSignatureRequired |
      | GDPR Authorization Form |            1.0 |        10/11/2025 |      11/12/2024 | Testing             | true                |
