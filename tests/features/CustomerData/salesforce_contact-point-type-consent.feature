@customer @regression @mode:serial
Feature: Salesforce Contact Point Type Consent Management

  Scenario Outline: Create and Manage New Contact Point Type Consent with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Contact Point Type Consent" in app launcher
    Then Add new Contact Point Type Consent with following details
      | Field                            | Value                          |
      | Name                             | <Name>                         |
      | Contact Point Type               | <ContactPointType>             |
      | Data Use Purpose                 | <DataUsePurpose>               |
      | Privacy Consent Status           | <PrivacyConsentStatus>         |
      | Party Role Choose Object         | <PartyRoleChooseObject>        |
      | Party Role                       | <PartyRole>                    |
      | Business Brand                   | <BusinessBrand>                |
      | Effective From Date              | <EffectiveFromDate>            |
      | Effective From Time              | <EffectiveFromTime>            |
      | Effective To Date                | <EffectiveToDate>              |
      | Effective To Time                | <EffectiveToTime>              |
      | Capture Source                   | <CaptureSource>                |
      | Capture Date Date                | <CaptureDateDate>              |
      | Capture Date Time                | <CaptureDateTime>              |
      | Double Consent Capture Date Date | <DoubleConsentCaptureDateDate> |
      | Double Consent Capture Date Time | <DoubleConsentCaptureDateTime> |
    Then Verify Contact Point Type Consent is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                       | ContactPointType | DataUsePurpose | PrivacyConsentStatus | PartyRoleChooseObject | PartyRole | BusinessBrand | EffectiveFromDate | EffectiveFromTime | EffectiveToDate | EffectiveToTime | CaptureSource | CaptureDateDate | CaptureDateTime | DoubleConsentCaptureDateDate | DoubleConsentCaptureDateTime |
      | Email Consent Type Example | Email            | GDPR           | Opt In               | Customer              | John Doe  | ABC Brand     |        10/10/2024 |          10:30 AM |      11/11/2025 |        10:30 AM | Website Form  |      07/10/2024 |        10:30 AM |                   12/05/2024 |                     10:30 AM |
      # | Phone Consent Type Example            | Marketing Phone  | Advertising    | Opt Out              | Lead                  | Jane Smith | XYZ Brand     |        11/30/2024 |          02:15 PM |      12/31/2025 |        02:15 PM | Mobile App    |      08/15/2024 |        02:15 PM |                   01/10/2025 |                     02:15 PM |
