@mode:serial
Feature: Salesforce Work Orders Management

  @work-orders @regression @comprehensive
  Scenario Outline: Create and Manage New Work Orders with Comprehensive Data
    Given Open a browser and login to the sales force site
    When Search for "Work Orders" in app launcher
    Then Add new work order with following details
      | Field           | Value             |
      | Status          | <Status>          |
      | Priority        | <Priority>        |
      | ParentWorkOrder | <ParentWorkOrder> |
      | Contact         | <Contact>         |
      | Account         | <Account>         |
      | Asset           | <Asset>           |
      | Case            | <Case>            |
      | Entitlement     | <Entitlement>     |
      | ServiceContract | <ServiceContract> |
      | Description     | <Description>     |
      | Subject         | <Subject>         |
    Then Verify work order is created successfully with details
      | Field   | Value     |
      | Account | <Account> |

    Examples:
      | Status | Priority | ParentWorkOrder | Contact    | Account | Asset    | Case     | Entitlement | ServiceContract | Description                                   | Subject                 |
      | New    | Medium   | --None--        | John Smith | Testing | --None-- | --None-- | --None--    | --None--        | HVAC system maintenance required for building | HVAC System Maintenance |
      # | New    | High     | --None--        | --None-- | Testing | --None-- | --None-- | --None--    | --None--        | Emergency repair for critical equipment failure | Emergency Equipment Repair |
