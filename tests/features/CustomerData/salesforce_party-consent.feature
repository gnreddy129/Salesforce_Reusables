@mode:serial
Feature: Salesforce Party Consent Management

  @customer @regression
  Scenario Outline: Create and Manage New Party Consent with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Party Consent" in app launcher
    Then Add new Party Consent with following details
      | Field                               | Value                             |
      | Name                                | <Name>                            |
      | Party                               | <Party>                           |
      | Business Brand                      | <BusinessBrand>                   |
      | Choose an object                    | <ChooseAnObject>                  |
      | Party Role                          | <PartyRole>                       |
      | Privacy Consent Status              | <PrivacyConsentStatus>            |
      | Action                              | <Action>                          |
      | Consent Captured Contact Point Type | <ConsentCapturedContactPointType> |
      | Consent Captured Source             | <ConsentCapturedSource>           |
      | Effective From                      | <EffectiveFrom>                   |
      | Effective To                        | <EffectiveTo>                     |
      | Double Consent Capture Date         | <DoubleConsentCaptureDate>        |
      | Double Consent Capture Time         | <DoubleConsentCaptureTime>        |
      | Consent Captured Date               | <ConsentCapturedDate>             |
      | Consent Captured Time               | <ConsentCapturedTime>             |
    Then Verify Party Consent is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name               | Party    | BusinessBrand | ChooseAnObject | PartyRole  | PrivacyConsentStatus | Action  | ConsentCapturedContactPointType | ConsentCapturedSource | EffectiveFrom | EffectiveTo | DoubleConsentCaptureDate | DoubleConsentCaptureTime | ConsentCapturedDate | ConsentCapturedTime |
      | GDPR Party Consent | John Doe | ABC Brand     | Customer       | John Doe  | Seen                 | Segment | Email                           | Website Form          |    10/10/2024 |  11/11/2025 |               12/05/2024 |                 10:30 AM |          07/10/2024 |            10:30 AM |
      # | Marketing Consent  | Jane Smith| XYZ Brand     | Lead           | Prospect  | Not Seen             | Target | Phone                           | Email Campaign        | 11/30/2024 | 02:15 PM |
