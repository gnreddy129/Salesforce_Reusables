@mode:serial
Feature: Salesforce Payment Gateway Logs Management

  @paymentgatewaylogs @regression
  Scenario Outline: Add new payment gateway log with comprehensive details
    Given Open a browser and login to the sales force site
    When Search for "Payment Gateway Logs" in app launcher
    Then Add new payment gateway log with following details
      | Interaction Type                | <InteractionType>              |
      | Object Type                     | <ObjectType>                   |
      | Referenced Entity               | <ReferencedEntity>             |
      | Payment Gateway                 | <PaymentGateway>               |
      | Status                          | <Status>                       |
      | Gateway Date                    | <GatewayDate>                  |
      | Gateway Time                    | <GatewayTime>                  |
      | Gateway Reference Number        | <GatewayReferenceNumber>       |
      | Gateway Result Code             | <GatewayResultCode>            |
      | Gateway Result Code Description | <GatewayResultCodeDescription> |
      | Gateway Auth Code               | <GatewayAuthCode>              |
      | Gateway Avs Code                | <GatewayAvsCode>               |
      | Gateway Message                 | <GatewayMessage>               |
      | Salesforce Result Code          | <SalesforceResultCode>         |
      | Salesforce Reference Number     | <SalesforceReferenceNumber>    |
      | Request                         | <Request>                      |
      | Response                        | <Response>                     |
    Then Verify payment gateway log is created successfully

    Examples:
      | InteractionType | ObjectType                 | ReferencedEntity | PaymentGateway | Status  | GatewayDate | GatewayTime | GatewayReferenceNumber | GatewayResultCode | GatewayResultCodeDescription  | GatewayAuthCode | GatewayAvsCode | GatewayMessage       | SalesforceResultCode | SalesforceReferenceNumber | Request                                                | Response                                              |
      | Authorization   | Alternative Payment Method | PM_APM-000000001 |                | Success |  11/12/2024 |     9:30 AM | REF-2024-001           |               200 | Request approved successfully | AUTH-12345      | M              | Transaction Approved | Success              | SF-REF-001                | {"amount": 1000, "currency": "USD", "card": "4111111"} | {"status": "approved", "id": "TXN-001", "code": "00"} |
