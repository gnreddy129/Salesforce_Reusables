@mode:serial
Feature: Salesforce Return Orders Management

  @returnorder @regression
  Scenario Outline: Create new Return Order with different data
    Given Open a browser and login to the sales force site
    When Search for "Return Orders" in app launcher
    Then Click on "New" button of "Return Orders"
    Then Add new return order with following details
      | Field                     | Value                   |
      | Case                      | <Case>                  |
      | Returned By               | <ReturnedBy>            |
      | Account                   | <Account>               |
      | Status                    | <Status>                |
      | Contact                   | <Contact>               |
      | Source Location           | <SourceLocation>        |
      | Destination Location      | <DestinationLocation>   |
      | Shipment Type             | <ShipmentType>          |
      | Ship Address              | <ShipAddress>           |
      | Ship From City            | <ShipFromCity>          |
      | Ship From Zip/Postal Code | <ShipFromZipPostalCode> |
      | Ship From State/Province  | <ShipFromStateProvince> |
      | Ship From Country         | <ShipFromCountry>       |
      | Expected Arrival Date     | <ExpectedArrivalDate>   |
      | Expected Arrival Time     | <ExpectedArrivalTime>   |
      | Description               | <Description>           |
    Then Verify return order is created successfully with details
      | Field  | Value    |
      | Status | <Status> |

    Examples:
      | Case     | ReturnedBy      | Account | Status   | Contact  | SourceLocation | DestinationLocation | ShipmentType | ShipAddress     | ShipFromCity | ShipFromZipPostalCode | ShipFromStateProvince | ShipFromCountry | ExpectedArrivalDate | ExpectedArrivalTime | Description                                              |
      | 00001026 | Salesforce demo | Testing | Approved | John Doe |                |                     | Standard     | 123 Main Street | New York     |                 10001 |                       |                 |          11/02/2025 |            10:00 AM | Return order for defective merchandise in good condition |
