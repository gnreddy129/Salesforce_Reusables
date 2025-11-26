@mode:serial
Feature: Salesforce Payments Management

  @platform @payments @regression
  Scenario Outline: Add new payment with comprehensive details
    Given Open a browser and login to the sales force site
    When Search for "Payments" in app launcher
    Then Add new payment with following details
      | Field                                 | Value                                |
      | Account                               | <Account>                            |
      | Status                                | <Status>                             |
      | Amount                                | <Amount>                             |
      | Type                                  | <Type>                               |
      | Payment Authorization                 | <PaymentAuthorization>               |
      | Payment Group                         | <PaymentGroup>                       |
      | Payment Method                        | <PaymentMethod>                      |
      | Processing Mode                       | <ProcessingMode>                     |
      | Comments                              | <Comments>                           |
      | Salesforce Result Code                | <SalesforceResultCode>               |
      | Cancellation Salesforce Result Code   | <CancellationSalesforceResultCode>   |
      | Payment Gateway                       | <PaymentGateway>                     |
      | Gateway Result Code                   | <GatewayResultCode>                  |
      | Gateway Result Code Description       | <GatewayResultCodeDescription>       |
      | Gateway Reference Number              | <GatewayReferenceNumber>             |
      | Gateway Reference Details             | <GatewayReferenceDetails>            |
      | Cancellation Gateway Result Code      | <CancellationGatewayResultCode>      |
      | Cancellation Gateway Reference Number | <CancellationGatewayReferenceNumber> |
      | MAC Address                           | <MacAddress>                         |
      | IP Address                            | <IpAddress>                          |
      | Phone                                 | <Phone>                              |
      | Audit Email                           | <AuditEmail>                         |
      | Effective Date                        | <EffectiveDate>                      |
      | Effective Time                        | <EffectiveTime>                      |
      | Date                                  | <Date>                               |
      | Time                                  | <Time>                               |
      | Cancellation Date                     | <CancellationDate>                   |
      | Cancellation Time                     | <CancellationTime>                   |
      | Cancellation Effective Date           | <CancellationEffectiveDate>          |
      | Cancellation Effective Time           | <CancellationEffectiveTime>          |
      | Gateway Date                          | <GatewayDate>                        |
      | Gateway Time                          | <GatewayTime>                        |
      | Cancellation Gateway Date             | <CancellationGatewayDate>            |
      | Cancellation Gateway Time             | <CancellationGatewayTime>            |
    Then Verify payment is created successfully

    Examples:
      | Account                 | Status | Amount | Type | PaymentAuthorization | PaymentGroup | PaymentMethod | ProcessingMode | Comments                | SalesforceResultCode | CancellationSalesforceResultCode | PaymentGateway | GatewayResultCode | GatewayResultCodeDescription   | GatewayReferenceNumber | GatewayReferenceDetails  | CancellationGatewayResultCode | CancellationGatewayReferenceNumber | MacAddress     | IpAddress     | Phone           | AuditEmail              | EffectiveDate | EffectiveTime | Date       | Time     | CancellationDate | CancellationTime | CancellationEffectiveDate | CancellationEffectiveTime | GatewayDate | GatewayTime | CancellationGatewayDate | CancellationGatewayTime |
      | Tech Solutions Inc 2025 | Draft  |   1000 | Sale |                      |              |               | External       | Automation test payment | Success              | ABC123                           |                | GW-SUCCESS-001    | Payment processed successfully | GWR-2025-11-001        | Transaction ID: TXN12345 | CANCEL-001                    | CANCEL-GWR-001                     | 00:1A:2B:3C:4D | 192.168.1.100 | +1-555-123-4567 | audit@techsolutions.com |    11/11/2024 |      12:00 AM | 11/11/2024 | 01:30 PM |       10/11/2024 |         02:45 PM |                10/11/2024 |                  03:15 AM |  10/11/2024 |    12:30 PM |              10/11/2024 |                03:00 PM |
