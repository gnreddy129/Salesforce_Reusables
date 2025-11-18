@mode:serial
Feature: Salesforce Contact Point Consent Management

  @customer @regression
  Scenario Outline: Create and Manage New Contact Point Consent with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Contact Point Consent" in app launcher
    Then Add new Contact Point Consent with following details
      | Field                            | Value                          |
      | Name                             | <Name>                         |
      | Contact Point Choose Object      | <ContactPointChooseObject>     |
      | Contact Point                    | <ContactPoint>                 |
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
      | Capture Contact Point Type       | <CaptureContactPointType>      |
      | Capture Date Date                | <CaptureDateDate>              |
      | Capture Date Time                | <CaptureDateTime>              |
      | Double Consent Capture Date Date | <DoubleConsentCaptureDateDate> |
      | Double Consent Capture Date Time | <DoubleConsentCaptureDateTime> |
    Then Verify Contact Point Consent is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                    | ContactPointChooseObject | ContactPoint | DataUsePurpose | PrivacyConsentStatus | PartyRoleChooseObject | PartyRole | BusinessBrand | EffectiveFromDate | EffectiveFromTime | EffectiveToDate | EffectiveToTime | CaptureSource | CaptureContactPointType | CaptureDateDate | CaptureDateTime | DoubleConsentCaptureDateDate | DoubleConsentCaptureDateTime |
      | Email Marketing Consent | Contact Point Address    | John Doe     | GDPR      | Opt In               | Customer              | John Doe  | ABC Brand     |        10/10/2024 |          10:30 AM |      11/11/2025 |        10:30 AM | Website Form  | Email                   |      07/10/2024 |        10:30 AM |                   12/05/2024 |                     10:30 AM |
      # | SMS Marketing Consent          | Contact Point Phone      | Jane Smith   | Advertising    | Opt Out              | Lead                  | Jane Smith | XYZ Brand     | 11/30/2024        | 02:15 PM          | 12/31/2025      | 02:15 PM        | Mobile App    | Phone                   | 08/15/2024      | 02:15 PM        | 01/10/2025                   | 02:15 PM                     |
