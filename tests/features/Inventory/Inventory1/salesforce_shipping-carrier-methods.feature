@mode:serial
Feature: Salesforce Shipping Carrier Methods Management

  @inventory @shipping-carrier-methods @regression
  Scenario Outline: Create and Manage New Shipping Carrier Method with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Shipping Carrier Methods" in app launcher
    Then Click on "New" button of "Shipping Carrier Methods"
    Then Add new shipping carrier method with following details
      | Field              | Value                |
      | Name               | <Name>               |
      | ShippingCarrier    | <ShippingCarrier>    |
      | ExternalReference  | <ExternalReference>  |
      | MinimumTransitTime | <MinimumTransitTime> |
      | MaximumTransitTime | <MaximumTransitTime> |
      | TransitTimeUnit    | <TransitTimeUnit>    |
    And Verify Shipping Carrier Method is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name             | ShippingCarrier | ExternalReference | MinimumTransitTime | MaximumTransitTime | TransitTimeUnit |
      | Express Delivery | Test Carrier 1  | FEDEX-EXP-001     |                  1 |                  2 | Days            |
