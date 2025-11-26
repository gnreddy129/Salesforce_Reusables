@mode:serial
Feature: Salesforce Coupons Management

  @coupons @regression
  Scenario Outline: Add new coupon
    Given Open a browser and login to the sales force site
    When Search for "Coupons" in app launcher
    Then Add new coupon with following details
      | Field                       | Value                      |
      | Code                        | <Code>                     |
      | Promotion                   | <Promotion>                |
      | Description                 | <Description>              |
      | Status                      | <Status>                   |
      | Redemption Limit All Buyers | <RedemptionLimitAllBuyers> |
      | Redemption Limit Per Buyer  | <RedemptionLimitPerBuyer>  |
      | Start Date                  | <StartDate>                |
      | Start Time                  | <StartTime>                |
      | End Date                    | <EndDate>                  |
      | End Time                    | <EndTime>                  |
    Then Verify coupon is created successfully

    Examples:
      | Code   | Promotion | Description          | Status | RedemptionLimitAllBuyers | RedemptionLimitPerBuyer | StartDate  | StartTime | EndDate    | EndTime  |
      | SAVE20 | testing   | Save 20% this summer | Active |                      100 |                       5 | 13/11/2024 |  12:00 AM | 25/12/2024 | 11:59 PM |
      # | WELCOME10 | testing | 10% off for new users | Active | 500                      | 1                       | 01/01/2025 | 12:00 AM  | 06/11/2025 | 11:59 PM|
