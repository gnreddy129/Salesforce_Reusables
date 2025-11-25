@mode:serial
Feature: Salesforce Payment Authorization Adjustments Management

  @paymentauthorizationadjustment @regression
  Scenario Outline: Add new payment authorization adjustment
    Given Open a browser and login to the sales force site
    When Search for "Payment Authorization Adjustments" in app launcher
    Then Add new payment authorization adjustment with following details
      | Account                         | <Account>                      |
      | Status                          | <Status>                       |
      | Amount                          | <Amount>                       |
      | Payment Authorization           | <PaymentAuthorization>         |
      | Adjustment Type                 | <AdjustmentType>               |
      | Processing Mode                 | <ProcessingMode>               |
      | Effective Date                  | <EffectiveDate>                |
      | Effective Time                  | <EffectiveTime>                |
      | Date                            | <Date>                         |
      | Date Time                       | <DateTime>                     |
      | Comments                        | <Comments>                     |
      | Gateway Date                    | <GatewayDate>                  |
      | Gateway Time                    | <GatewayTime>                  |
      | Gateway Result Code Description | <GatewayResultCodeDescription> |
      | Gateway Result Code             | <GatewayResultCode>            |
      | Gateway Reference Details       | <GatewayReferenceDetails>      |
      | Gateway Reference Number        | <GatewayReferenceNumber>       |
      | MAC Address                     | <MACAddress>                   |
      | IP Address                      | <IPAddress>                    |
      | Phone                           | <Phone>                        |
      | Audit Email                     | <AuditEmail>                   |
    Then Verify payment authorization adjustment is created successfully

    Examples:
      | Account | Status    | Amount | PaymentAuthorization | AdjustmentType | ProcessingMode | EffectiveDate | EffectiveTime | Date       | DateTime | Comments           | GatewayDate | GatewayTime | GatewayResultCodeDescription | GatewayResultCode | GatewayReferenceDetails | GatewayReferenceNumber | MACAddress        | IPAddress   | Phone      | AuditEmail     |
      | Testing | Processed |   1000 | PA-000000001         | Reversal       | External       |    11/12/2024 |       9:30 AM | 01/12/2024 | 10:30 AM | Test authorization |  01/01/2025 |    10:00 AM | Success                      | GW001             | Gateway processed       | REF-12345-001          | AA:BB:CC:DD:EE:FF | 192.168.1.1 | 9876543210 | admin@test.com |
