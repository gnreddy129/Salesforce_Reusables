@mode:serial
Feature: Salesforce Coupons Management

  @coupons @regression
  Scenario Outline: Add new coupon
    Given Open a browser and login to the sales force site
    When Search for "Coupons" in app launcher
    Then Click on "New" button of "Coupons"
    Then Add new coupon with following details
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
      | SAVE40 | Testing   | Save 34% this summer | Active |                      100 |                       5 | 11/11/2024 |  12:00 AM | 12/12/2024 | 11:59 PM |
