@mode:serial
Feature: Salesforce Groups Management

  @groups @regression
  Scenario Outline: Add new group with comprehensive details
    Given Open a browser and login to the sales force site
    When Search for "Groups" in app launcher
    Then Click on "New" button of "Groups"
    Then Add new group with following details
      | Name                        | <Name>                      |
      | Description                 | <Description>               |
      | Information                 | <Information>               |
      | Disable automatic archiving | <DisableAutomaticArchiving> |
      | Access Type                 | <AccessType>                |
      | Allow customers             | <AllowCustomers>            |
      | Broadcast Only              | <BroadcastOnly>             |
      | image                       | <image>                     |
    Then Verify group is created successfully
      | Name        | <Name>        |
      | Description | <Description> |
      | Access Type | <AccessType>  |

    Examples:
      | Name            | Description                 | Information          | DisableAutomaticArchiving | AccessType | AllowCustomers | BroadcastOnly | image    |
      | Test Group12345 | A test group for automation | Automated group info | true                      | Public     | false          | true          | img1.jpg |
