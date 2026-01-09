@mode:serial
Feature: Salesforce Refunds Management

  @platform @refunds @regression
  Scenario Outline: Add new refund with comprehensive details
    Given Open a browser and login to the sales force site
    When Search for "Refunds" in app launcher
    Then Click on "New" button of "Refunds"
    Then Add new refund with following details
      | Account                               | <Account>                            |
      | Status                                | <Status>                             |
      | Amount                                | <Amount>                             |
      | Type                                  | <Type>                               |
      | Payment Group                         | <PaymentGroup>                       |
      | Payment Method                        | <PaymentMethod>                      |
      | Processing Mode                       | <ProcessingMode>                     |
      | Effective Date                        | <EffectiveDate>                      |
      | Date                                  | <Date>                               |
      | Comments                              | <Comments>                           |
      | Cancellation Date                     | <CancellationDate>                   |
      | Cancellation Effective Date           | <CancellationEffectiveDate>          |
      | Salesforce Result Code                | <SalesforceResultCode>               |
      | Cancellation Salesforce Result Code   | <CancellationSalesforceResultCode>   |
      | Payment Gateway                       | <PaymentGateway>                     |
      | Gateway Date                          | <GatewayDate>                        |
      | Gateway Result Code                   | <GatewayResultCode>                  |
      | Gateway Result Code Description       | <GatewayResultCodeDescription>       |
      | Gateway Reference Number              | <GatewayReferenceNumber>             |
      | Cancellation Gateway Result Code      | <CancellationGatewayResultCode>      |
      | Cancellation Gateway Date             | <CancellationGatewayDate>            |
      | Cancellation Gateway Reference Number | <CancellationGatewayReferenceNumber> |
      | MAC Address                           | <MacAddress>                         |
      | IP Address                            | <IpAddress>                          |
      | Phone                                 | <Phone>                              |
      | Audit Email                           | <AuditEmail>                         |
    Then Verify refund is created successfully
    Examples:
      | Account | Status    | Amount | Type       | PaymentGroup | PaymentMethod | ProcessingMode | EffectiveDate | Date       | Comments               | CancellationDate | CancellationEffectiveDate | SalesforceResultCode | CancellationSalesforceResultCode | PaymentGateway | GatewayDate | GatewayResultCode   | GatewayResultCodeDescription  | GatewayReferenceNumber | CancellationGatewayResultCode | CancellationGatewayDate | CancellationGatewayReferenceNumber | MacAddress        | IpAddress     | Phone           | AuditEmail        |
      | Testing | Processed |   1500 | Referenced |              |               | External       |    11/11/2025 | 11/11/2025 | Automation test refund |       11/11/2025 |                11/11/2025 | Success              |                                  |                |  11/11/2025 | GATEWAY-SUCCESS-001 | Refund processed successfully | GWR-REFUND-2025-001    |                               |              11/11/2025 |                                    | 00:1A:2B:3C:4D:5E | 192.168.1.100 | +1-555-789-1234 | audit@testing.com |