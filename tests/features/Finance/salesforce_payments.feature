@mode:serial
Feature: Salesforce Payments Management

  @platform @payments @regression
  Scenario: Add new payment with comprehensive details
    Given Open a browser and login to the sales force site
    When Search for "Payments" in app launcher
    Then Add new payment with following details
      | Account                               | Tech Solutions Inc 2025        |
      | Status                                | Draft                          |
      | Amount                                |                           1000 |
      | Type                                  | Sale                           |
      | Payment Authorization                 |                                |
      | Payment Group                         |                                |
      | Payment Method                        |                                |
      | Processing Mode                       | External                       |
      | Comments                              | Automation test payment        |
      | Salesforce Result Code                | Success                        |
      | Cancellation Salesforce Result Code   | ABC123                         |
      | Payment Gateway                       |                                |
      | Gateway Result Code                   | GW-SUCCESS-001                 |
      | Gateway Result Code Description       | Payment processed successfully |
      | Gateway Reference Number              | GWR-2025-11-001                |
      | Gateway Reference Details             | Transaction ID: TXN12345       |
      | Cancellation Gateway Result Code      | CANCEL-001                     |
      | Cancellation Gateway Reference Number | CANCEL-GWR-001                 |
      | MAC Address                           |              00:1A:2B:3C:4D:5E |
      | IP Address                            |                  192.168.1.100 |
      | Phone                                 |                +1-555-123-4567 |
      | Audit Email                           | audit@techsolutions.com        |
      | Effective Date                        |                     11/11/2024 |
      | Effective Time                        |                       12:00 AM |
      | Date                                  |                     11/11/2024 |
      | Time                                  |                       01:30 PM |
      | Cancellation Date                     |                     10/11/2024 |
      | Cancellation Time                     |                       02:45 PM |
      | Cancellation Effective Date           |                     10/11/2024 |
      | Cancellation Effective Time           |                       03:15 AM |
      | Gateway Date                          |                     10/11/2024 |
      | Gateway Time                          |                       12:30 PM |
      | Cancellation Gateway Date             |                     10/11/2024 |
      | Cancellation Gateway Time             |                       03:00 PM |
    Then Verify payment is created successfully
