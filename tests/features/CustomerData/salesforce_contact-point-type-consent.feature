@mode:serial
Feature: Salesforce Contact Point Type Consent Management

  @customer @regression @comprehensive
  Scenario Outline: Create and Manage New Contact Point Type Consent with Comprehensive Data
    Given Open a browser and login to the sales force site
    When Search for "Contact Point Type Consent" in app launcher
    Then Add new Contact Point Type Consent with following details
      | Field                            | Value                          |
      | Name                             | <Name>                         |
      | Contact Point Type               | <ContactPointType>             |
      | Party                            | <Party>                        |
      | Business Brand                   | <BusinessBrand>                |
      | Party Role Choose Object         | <PartyRoleChooseObject>        |
      | Party Role                       | <PartyRole>                    |
      | Privacy Consent Status           | <PrivacyConsentStatus>         |
      | Data Use Purpose                 | <DataUsePurpose>               |
      | Effective To Date                | <EffectiveToDate>              |
      | Effective To Time                | <EffectiveToTime>              |
      | Effective From Date              | <EffectiveFromDate>            |
      | Effective From Time              | <EffectiveFromTime>            |
      | Capture Contact Point Type       | <CaptureContactPointType>      |
      | Capture Source                   | <CaptureSource>                |
      | Double Consent Capture Date Date | <DoubleConsentCaptureDateDate> |
      | Double Consent Capture Date Time | <DoubleConsentCaptureDateTime> |
      | Capture Date Date                | <CaptureDateDate>              |
      | Capture Date Time                | <CaptureDateTime>              |
    Then Verify Contact Point Type Consent is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                         | ContactPointType | Party    | BusinessBrand | PartyRoleChooseObject | PartyRole | PrivacyConsentStatus | DataUsePurpose | EffectiveToDate | EffectiveToTime | EffectiveFromDate | EffectiveFromTime | CaptureContactPointType | CaptureSource | DoubleConsentCaptureDateDate | DoubleConsentCaptureDateTime | CaptureDateDate | CaptureDateTime |
      | Email Marketing Type Consent | Email            | John Doe | ABC Brand     | --None--              | --None--  | Opt In               | GDPR           |      12/12/2025 |        11:00 PM |        01/01/2024 |          12:00 AM | Email                   | Website       |                   12/05/2024 |                     09:30 AM |      01/05/2024 |        10:00 AM |
      # | SMS Marketing Type Consent        | Phone            | Jane Smith | XYZ Brand     | Lead                  | Jane Smith | Opt Out              | Advertising    | 06/30/2025      | 06:00 PM        | 07/01/2024        | 08:00 AM          | Phone                   | Mobile App    | 11/20/2024                   | 02:15 PM                     | 08/10/2024      | 03:45 PM        |
