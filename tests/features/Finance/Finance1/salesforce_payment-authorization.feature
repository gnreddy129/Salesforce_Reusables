@mode:serial
Feature: Salesforce Payment Authorizations Management

  @paymentauthorizations @regression
  Scenario Outline: Create new Payment Authorization with different data
    Given Open a browser and login to the sales force site
    When Search for "Payment Authorizations" in app launcher
    Then Click on "New" button of "Payment Authorizations"
    Then Add new payment authorization with following details
      | Field                           | Value                          |
      | Account                         | <Account>                      |
      | Status                          | <Status>                       |
      | Amount                          | <Amount>                       |
      | Date                            | <Date>                         |
      | Time                            | <Time>                         |
      | Payment Method                  | <PaymentMethod>                |
      | Payment Group                   | <PaymentGroup>                 |
      | Expiration Date                 | <ExpirationDate>               |
      | Expiration Time                 | <ExpirationTime>               |
      | Effective Date                  | <EffectiveDate>                |
      | Effective Time                  | <EffectiveTime>                |
      | Processing Mode                 | <ProcessingMode>               |
      | Comments                        | <Comments>                     |
      | Payment Gateway                 | <PaymentGateway>               |
      | Gateway Date                    | <GatewayDate>                  |
      | Gateway Time                    | <GatewayTime>                  |
      | Gateway Auth Code               | <GatewayAuthCode>              |
      | Gateway Result Code Description | <GatewayResultCodeDescription> |
      | Gateway Result Code             | <GatewayResultCode>            |
      | Gateway Reference Details       | <GatewayReferenceDetails>      |
      | Gateway Reference Number        | <GatewayReferenceNumber>       |
      | MAC Address                     | <MACAddress>                   |
      | IP Address                      | <IPAddress>                    |
      | Phone                           | <Phone>                        |
      | Audit Email                     | <AuditEmail>                   |
    Then Verify payment authorization is created successfully with details
      | Field   | Value     |
      | Account | <Account> |
      | Status  | <Status>  |
      | Amount  | <Amount>  |

    Examples:
      | Account | Status    | Amount | Date       | Time    | PaymentMethod | PaymentGroup | ExpirationDate | ExpirationTime | EffectiveDate | EffectiveTime | ProcessingMode | Comments               | PaymentGateway | GatewayDate | GatewayTime | GatewayAuthCode | GatewayResultCodeDescription | GatewayResultCode | GatewayReferenceDetails | GatewayReferenceNumber | MACAddress        | IPAddress     | Phone          | AuditEmail        |
      | Testing | Processed |    500 | 11/10/2025 | 2:22 AM |               |              |     11/11/2025 |        3:00 AM |    11/04/2025 |       2:00 AM | External       | Online payment renewal |                |  11/08/2025 |     2:05 AM | AUTH123456      | Success                      |               200 | REF001-STR              | PA-REF-001             | AA:BB:CC:DD:EE:FF | 192.168.1.100 | +91-9876543210 | audit@company.com |
