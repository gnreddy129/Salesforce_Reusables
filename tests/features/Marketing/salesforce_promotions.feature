@mode:serial
Feature: Salesforce Promotions Management

  @promotions @regression
  Scenario Outline: Add new promotion
    Given Open a browser and login to the sales force site
    When Search for "Promotions" in app launcher
    Then Add new promotion with following details
      | Name                                             | <Name>                  |
      | Description                                      | <Description>           |
      | Objective                                        | <Objective>             |
      | Campaign                                         | <Campaign>              |
      | Active                                           | <Active>                |
      | Display Name                                     | <DisplayName>           |
      | Commerce Promotion                               | <CommercePromotion>     |
      | Qualifier Criteria                               | <QualifierCriteria>     |
      | Priority Number                                  | <PriorityNumber>        |
      | Target Criteria                                  | <TargetCriteria>        |
      | Exclude qualifying items from discounts          | <ExcludeItems>          |
      | Discount Order                                   | <DiscountOrder>         |
      | Discount Restriction                             | <DiscountRestriction>   |
      | Exclusivity Type                                 | <ExclusivityType>       |
      | Qualifying Criteria Not Required Per Application | <QualifyingNotRequired> |
      | Approaching Discount                             | <ApproachingDiscount>   |
      | Start Date                                       | <StartDate>             |
      | Start Time                                       | <StartTime>             |
      | End Date                                         | <EndDate>               |
      | End Time                                         | <EndTime>               |
      | Automatic                                        | <Automatic>             |
      | Tiered Promotion                                 | <TieredPromotion>       |
      | Maximum Applications Per Cart                    | <MaxApplications>       |
    Then Verify promotion is created successfully

    Examples:
      | Name              | Description                      | Objective                            | Campaign | Active | DisplayName            | CommercePromotion | QualifierCriteria | PriorityNumber | TargetCriteria | ExcludeItems | DiscountOrder   | DiscountRestriction                         | ExclusivityType | QualifyingNotRequired | ApproachingDiscount | StartDate  | StartTime | EndDate    | EndTime  | Automatic | TieredPromotion | MaxApplications |
      | Holiday Sale 2024 | Special holiday promotion for Q4 | Increase sales during holiday season | DM Campaign to Top Customers - Nov 12-23, 2001  | true   | Holiday 2024 - 15% Off | true              | All               |              1 | All            | true        | Least Expensive | Limit by Least Expensive Qualifying Product | Global          | true                 | true                | 12/01/2024 |  12:00 AM | 12/31/2024 | 11:59 PM | true      | true           |               5 |
