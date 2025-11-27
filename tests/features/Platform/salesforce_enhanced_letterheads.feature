@mode:serial
Feature: Salesforce Enhanced Letterheads Management

  @enhanced-letterheads @regression
  Scenario Outline: Add new enhanced letterhead
    Given Open a browser and login to the sales force site
    When Search for "Enhanced Letterheads" in app launcher
    Then Add new enhanced letterhead with following details
      | Name        | <Name>        |
      | Description | <Description> |
      | Header      | <Header>      |
      | Footer      | <Footer>      |
    Then Verify enhanced letterhead is created successfully

    Examples:
      | Name                                  | Description                                                   | Header                                                                                                                       | Footer                                                                                                     |
      | Professional Corporate Letterhead     | Enhanced letterhead template for corporate communications      | ACME Corporation\n123 Business Avenue\nNew York, NY 10001\nPhone: (555) 123-4567\nEmail: contact@acme.com                  | This document is confidential and intended for authorized recipients only.\nACME Corporation © 2024   |
      